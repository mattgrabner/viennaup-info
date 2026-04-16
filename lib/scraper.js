import fs from "node:fs/promises";
import path from "node:path";

const PROGRAMME_URL = "https://viennaup.com/?type=1452982642";
const EVENTS_FILE = path.join(process.cwd(), "data", "events.json");
const GEOCODE_CACHE_FILE = path.join(process.cwd(), "data", "geocode-cache.json");

async function readJson(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, payload) {
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
}

function normalizeTags(mapping) {
  if (!mapping || typeof mapping !== "object") {
    return [];
  }
  return Object.values(mapping).filter(Boolean);
}

function stripHtml(text) {
  return (text || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function collectSearchTerms(value, bucket = []) {
  if (value == null) return bucket;

  if (typeof value === "string") {
    const normalized = value.replace(/\s+/g, " ").trim();
    if (normalized) bucket.push(normalized);
    return bucket;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    bucket.push(String(value));
    return bucket;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectSearchTerms(item, bucket));
    return bucket;
  }

  if (typeof value === "object") {
    Object.values(value).forEach((item) => collectSearchTerms(item, bucket));
  }

  return bucket;
}

function buildSearchableText(rawEvent, normalizedEvent) {
  const rawTerms = collectSearchTerms(rawEvent);
  const normalizedTerms = [
    normalizedEvent.title,
    normalizedEvent.slug,
    normalizedEvent.location,
    normalizedEvent.companyName,
    normalizedEvent.website,
    normalizedEvent.ticketUrl,
    stripHtml(normalizedEvent.descriptionFull),
    ...(normalizedEvent.type || []),
    ...(normalizedEvent.format || []),
    ...(normalizedEvent.tracks || []),
    ...(normalizedEvent.targetGroups || []),
    ...(normalizedEvent.admission || []),
    ...(normalizedEvent.registrationType || []),
    ...(normalizedEvent.accessibility || [])
  ];

  return [...new Set([...normalizedTerms, ...rawTerms].filter(Boolean))].join(" ");
}

async function geocodeAddress(address, apiKey, cache) {
  if (!address) {
    return null;
  }
  if (cache[address]) {
    return cache[address];
  }

  if (!apiKey) {
    return null;
  }

  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  const response = await fetch(endpoint, { next: { revalidate: 0 } });
  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  const location = payload?.results?.[0]?.geometry?.location;
  if (!location) {
    return null;
  }

  const result = {
    lat: location.lat,
    lng: location.lng,
    formattedAddress: payload?.results?.[0]?.formatted_address || address
  };

  cache[address] = result;
  return result;
}

function simplifyEvent(rawEvent, geo) {
  const simplified = {
    uid: rawEvent.uid,
    title: rawEvent.title,
    slug: rawEvent.pathSegment,
    date: rawEvent.date,
    starttime: rawEvent.starttime,
    endtime: rawEvent.endtime,
    location: rawEvent.location,
    website: rawEvent.website,
    ticketUrl: rawEvent.ticketUrl,
    companyName: rawEvent.companyName,
    descriptionFull: rawEvent.descriptionFull,
    type: normalizeTags(rawEvent.typeTranslated),
    format: normalizeTags(rawEvent.formatTranslated),
    tracks: normalizeTags(rawEvent.curatedExperienceTranslated),
    targetGroups: normalizeTags(rawEvent.targetGroupsTranslated),
    admission: normalizeTags(rawEvent.admissionTranslated),
    registrationType: normalizeTags(rawEvent.registrationTypeTranslated),
    accessibility: normalizeTags(rawEvent.accessibilityTranslated),
    geo
  };

  return {
    ...simplified,
    searchableText: buildSearchableText(rawEvent, simplified)
  };
}

export async function scrapeAndStoreEvents() {
  const res = await fetch(PROGRAMME_URL, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch programme endpoint: ${res.status}`);
  }

  const events = await res.json();
  const geocodeCache = await readJson(GEOCODE_CACHE_FILE, {});
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const normalized = [];
  for (const event of events) {
    if (!event || event.hidden) {
      continue;
    }

    const geo = await geocodeAddress(event.location, apiKey, geocodeCache);
    normalized.push(simplifyEvent(event, geo));
  }

  normalized.sort((a, b) => {
    const byDate = a.date.localeCompare(b.date);
    if (byDate !== 0) return byDate;
    return a.starttime.localeCompare(b.starttime);
  });

  await writeJson(EVENTS_FILE, normalized);
  await writeJson(GEOCODE_CACHE_FILE, geocodeCache);

  return {
    count: normalized.length,
    withCoordinates: normalized.filter((item) => item.geo).length,
    dates: [...new Set(normalized.map((item) => item.date))]
  };
}

export async function readStoredEvents() {
  return readJson(EVENTS_FILE, []);
}
