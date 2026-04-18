import fs from "node:fs/promises";
import path from "node:path";
import { writeSkillFiles } from "./skill-files.js";

const PROGRAMME_URL = "https://viennaup.com/?type=1452982642";
const EVENTS_FILE = path.join(process.cwd(), "data", "events.json");
const GEOCODE_CACHE_FILE = path.join(process.cwd(), "data", "geocode-cache.json");
const PAGE_CACHE_FILE = path.join(process.cwd(), "data", "page-cache.json");

const PAGE_FETCH_TIMEOUT_MS = 12000;
const PAGE_FETCH_CONCURRENCY = 6;
const PAGE_TEXT_LIMIT = 8000;
const PAGE_USER_AGENT =
  "Mozilla/5.0 (compatible; ViennaUPMapsBot/1.0; +https://viennaup-maps.local)";
// Cache entries older than this are refetched; keeps data fresh without re-scraping on every run.
const PAGE_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;

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

/**
 * Programme JSON sometimes omits the scheme (e.g. "creativedaysvienna.at").
 * In HTML, that becomes a relative URL on the current origin. Prepend https://
 * when the value looks like a host or host+path.
 */
function normalizeProgrammeUrl(value) {
  if (value == null) return "";
  const s = String(value).trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  if (/^\/\//.test(s)) return `https:${s}`;
  if (s.startsWith("/")) return s;
  if (/^[\w.-]+\.[a-zA-Z]{2,}([/?#][^\s]*)?$/i.test(s)) {
    return `https://${s}`;
  }
  return s;
}

function stripHtml(text) {
  return (text || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

const HTML_ENTITY_MAP = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  ndash: "–",
  mdash: "—",
  hellip: "…"
};

function decodeEntities(text) {
  if (!text) return "";
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => HTML_ENTITY_MAP[name.toLowerCase()] ?? match);
}

function extractMeta(html, names) {
  const values = [];
  const metaRegex = /<meta\b[^>]*>/gi;
  const matches = html.match(metaRegex) || [];
  for (const tag of matches) {
    const nameMatch = tag.match(/\b(?:name|property)\s*=\s*["']([^"']+)["']/i);
    if (!nameMatch) continue;
    if (!names.includes(nameMatch[1].toLowerCase())) continue;
    const contentMatch = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i);
    if (contentMatch && contentMatch[1]) values.push(contentMatch[1]);
  }
  return values;
}

function htmlToText(html) {
  if (!html) return "";
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i);
  const source = body ? body[1] : html;
  const stripped = source
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(stripped).replace(/\s+/g, " ").trim();
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": PAGE_USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en,en-US;q=0.9,de;q=0.8"
      },
      redirect: "follow",
      next: { revalidate: 0 }
    });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (contentType && !/html|xml|text\/plain/i.test(contentType)) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function extractPageContent(url, cache) {
  if (!url || typeof url !== "string" || !/^https?:\/\//i.test(url)) return null;

  const cached = cache[url];
  if (cached && typeof cached === "object" && cached.fetchedAt) {
    if (Date.now() - cached.fetchedAt < PAGE_CACHE_TTL_MS) {
      return cached;
    }
  }

  const html = await fetchWithTimeout(url, PAGE_FETCH_TIMEOUT_MS);
  if (!html) {
    const failure = { url, fetchedAt: Date.now(), ok: false };
    cache[url] = failure;
    return failure;
  }

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeEntities(stripHtml(titleMatch[1])) : "";

  const metaValues = extractMeta(html, [
    "description",
    "keywords",
    "og:title",
    "og:description",
    "og:site_name",
    "twitter:title",
    "twitter:description"
  ]).map((value) => decodeEntities(value));

  const bodyText = htmlToText(html).slice(0, PAGE_TEXT_LIMIT);

  const entry = {
    url,
    fetchedAt: Date.now(),
    ok: true,
    title,
    meta: metaValues,
    text: bodyText
  };
  cache[url] = entry;
  return entry;
}

function pageEntryToTerms(entry) {
  if (!entry || !entry.ok) return [];
  const terms = [];
  if (entry.title) terms.push(entry.title);
  if (Array.isArray(entry.meta)) terms.push(...entry.meta);
  if (entry.text) terms.push(entry.text);
  return terms;
}

async function runWithConcurrency(tasks, limit) {
  const results = new Array(tasks.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, async () => {
    while (cursor < tasks.length) {
      const index = cursor++;
      try {
        results[index] = await tasks[index]();
      } catch {
        results[index] = null;
      }
    }
  });
  await Promise.all(workers);
  return results;
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

function buildSearchableText(rawEvent, normalizedEvent, externalTerms = []) {
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

  return [...new Set([...normalizedTerms, ...rawTerms, ...externalTerms].filter(Boolean))].join(" ");
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

function simplifyEvent(rawEvent, geo, enrichmentEntries = []) {
  const simplified = {
    uid: rawEvent.uid,
    title: rawEvent.title,
    slug: rawEvent.pathSegment,
    date: rawEvent.date,
    starttime: rawEvent.starttime,
    endtime: rawEvent.endtime,
    location: rawEvent.location,
    website: normalizeProgrammeUrl(rawEvent.website),
    ticketUrl: normalizeProgrammeUrl(rawEvent.ticketUrl),
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

  const externalTerms = enrichmentEntries.flatMap(pageEntryToTerms);
  const enrichmentSources = enrichmentEntries
    .filter((entry) => entry && entry.ok)
    .map((entry) => entry.url);

  const rawForSearch = {
    ...rawEvent,
    website: simplified.website,
    ticketUrl: simplified.ticketUrl,
    companyWebsite: normalizeProgrammeUrl(rawEvent.companyWebsite)
  };

  return {
    ...simplified,
    enrichmentSources,
    searchableText: buildSearchableText(rawForSearch, simplified, externalTerms)
  };
}

export async function scrapeAndStoreEvents({ onProgress } = {}) {
  const res = await fetch(PROGRAMME_URL, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch programme endpoint: ${res.status}`);
  }

  const events = await res.json();
  const geocodeCache = await readJson(GEOCODE_CACHE_FILE, {});
  const pageCache = await readJson(PAGE_CACHE_FILE, {});
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const visibleEvents = events.filter((event) => event && !event.hidden);

  for (const event of visibleEvents) {
    await geocodeAddress(event.location, apiKey, geocodeCache);
  }

  const urlSet = new Set();
  for (const event of visibleEvents) {
    const ticket = normalizeProgrammeUrl(event.ticketUrl);
    const web = normalizeProgrammeUrl(event.website);
    const company = normalizeProgrammeUrl(event.companyWebsite);
    if (ticket) urlSet.add(ticket);
    if (web) urlSet.add(web);
    if (company) urlSet.add(company);
  }

  const urls = [...urlSet];
  let fetchedCount = 0;
  const pageTasks = urls.map((url) => async () => {
    const result = await extractPageContent(url, pageCache);
    fetchedCount += 1;
    if (typeof onProgress === "function") {
      onProgress({ phase: "page", url, done: fetchedCount, total: urls.length });
    }
    return result;
  });

  await runWithConcurrency(pageTasks, PAGE_FETCH_CONCURRENCY);

  const normalized = visibleEvents.map((event) => {
    const geo = geocodeCache[event.location] || null;
    const enrichmentEntries = [
      normalizeProgrammeUrl(event.ticketUrl),
      normalizeProgrammeUrl(event.website),
      normalizeProgrammeUrl(event.companyWebsite)
    ]
      .filter(Boolean)
      .map((url) => pageCache[url])
      .filter(Boolean);
    return simplifyEvent(event, geo, enrichmentEntries);
  });

  normalized.sort((a, b) => {
    const byDate = a.date.localeCompare(b.date);
    if (byDate !== 0) return byDate;
    return a.starttime.localeCompare(b.starttime);
  });

  await writeJson(EVENTS_FILE, normalized);
  await writeJson(GEOCODE_CACHE_FILE, geocodeCache);
  await writeJson(PAGE_CACHE_FILE, pageCache);
  await writeSkillFiles(normalized);

  const successfulPages = Object.values(pageCache).filter((entry) => entry && entry.ok).length;

  return {
    count: normalized.length,
    withCoordinates: normalized.filter((item) => item.geo).length,
    dates: [...new Set(normalized.map((item) => item.date))],
    enrichedUrls: successfulPages,
    totalUrls: urls.length
  };
}

export async function readStoredEvents() {
  return readJson(EVENTS_FILE, []);
}
