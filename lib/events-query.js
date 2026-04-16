import fs from "node:fs/promises";
import path from "node:path";

const EVENTS_FILE = path.join(process.cwd(), "data", "events.json");
const GEOCODE_CACHE_FILE = path.join(process.cwd(), "data", "geocode-cache.json");

let eventsCache = null;
let geocodeCache = null;
let cachedAt = 0;
const CACHE_TTL_MS = 60 * 1000;

async function readJson(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

export async function loadEvents() {
  const now = Date.now();
  if (eventsCache && now - cachedAt < CACHE_TTL_MS) return eventsCache;
  eventsCache = await readJson(EVENTS_FILE, []);
  cachedAt = now;
  return eventsCache;
}

export async function loadGeocodeCache() {
  if (geocodeCache) return geocodeCache;
  geocodeCache = await readJson(GEOCODE_CACHE_FILE, {});
  return geocodeCache;
}

function stripHtml(text) {
  return (text || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(text, max = 400) {
  const clean = stripHtml(text);
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

function normalizeList(value) {
  if (value == null) return [];
  return (Array.isArray(value) ? value : [value])
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function containsAnyCI(haystack, needles) {
  if (!needles || needles.length === 0) return true;
  const h = (haystack || []).map((v) => String(v).toLowerCase());
  return needles.some((n) => h.includes(String(n).toLowerCase()));
}

function containsAllCI(haystack, needles) {
  if (!needles || needles.length === 0) return true;
  const h = (haystack || []).map((v) => String(v).toLowerCase());
  return needles.every((n) => h.includes(String(n).toLowerCase()));
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function termMatches(hay, term) {
  // Short acronyms (<= 3 chars) use word-boundary regex to avoid matching
  // "ai" inside "available" or "said". Longer terms use substring.
  if (term.length <= 3) {
    const re = new RegExp(`(^|[^a-z0-9])${escapeRegex(term)}(?=$|[^a-z0-9])`, "i");
    return re.test(hay);
  }
  return hay.includes(term);
}

function textMatches(event, query) {
  if (!query) return true;
  const terms = String(query)
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
  if (terms.length === 0) return true;
  const hay = (event.searchableText || "").toLowerCase();
  return terms.every((term) => termMatches(hay, term));
}

export function filterEvents(events, filters = {}) {
  const {
    query,
    date,
    dateFrom,
    dateTo,
    formats,
    tracks,
    targetGroups,
    types,
    admission,
    location,
    matchAllTags = false
  } = filters;

  const formatList = normalizeList(formats);
  const trackList = normalizeList(tracks);
  const targetList = normalizeList(targetGroups);
  const typeList = normalizeList(types);
  const admissionList = normalizeList(admission);

  const matchTags = matchAllTags ? containsAllCI : containsAnyCI;

  return events.filter((event) => {
    if (date && event.date !== date) return false;
    if (dateFrom && event.date < dateFrom) return false;
    if (dateTo && event.date > dateTo) return false;
    if (!matchTags(event.format, formatList)) return false;
    if (!matchTags(event.tracks, trackList)) return false;
    if (!matchTags(event.targetGroups, targetList)) return false;
    if (!matchTags(event.type, typeList)) return false;
    if (!matchTags(event.admission, admissionList)) return false;
    if (location) {
      const loc = String(event.location || "").toLowerCase();
      if (!loc.includes(String(location).toLowerCase())) return false;
    }
    if (!textMatches(event, query)) return false;
    return true;
  });
}

export function haversineKm(lat1, lng1, lat2, lng2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

export function eventsNear(events, lat, lng, radiusKm = 2, { excludeSlug, excludeUid } = {}) {
  const results = [];
  const excludedSlug = excludeSlug ? String(excludeSlug).toLowerCase() : null;
  const excludedUid = excludeUid != null ? Number(excludeUid) : null;

  for (const event of events) {
    if (excludedSlug && String(event.slug || "").toLowerCase() === excludedSlug) continue;
    if (excludedUid != null && Number(event.uid) === excludedUid) continue;

    const geo = event.geo;
    if (!geo || typeof geo.lat !== "number" || typeof geo.lng !== "number") continue;
    const distanceKm = haversineKm(lat, lng, geo.lat, geo.lng);
    if (distanceKm <= radiusKm) {
      results.push({ ...event, distanceKm: Number(distanceKm.toFixed(3)) });
    }
  }
  results.sort((a, b) => a.distanceKm - b.distanceKm);
  return results;
}

export async function resolveLocation({ lat, lng, address }) {
  if (typeof lat === "number" && typeof lng === "number") {
    return { lat, lng, source: "coordinates" };
  }
  if (!address) return null;

  const cache = await loadGeocodeCache();
  const cached = cache[address];
  if (cached && typeof cached.lat === "number" && typeof cached.lng === "number") {
    return { lat: cached.lat, lng: cached.lng, source: "cache", formattedAddress: cached.formattedAddress };
  }

  const needle = String(address).toLowerCase();
  for (const [key, value] of Object.entries(cache)) {
    if (!value || typeof value.lat !== "number") continue;
    if (key.toLowerCase().includes(needle) || needle.includes(key.toLowerCase())) {
      return { lat: value.lat, lng: value.lng, source: "cache-fuzzy", formattedAddress: value.formattedAddress || key };
    }
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) return null;
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const payload = await res.json();
    const loc = payload?.results?.[0]?.geometry?.location;
    if (!loc) return null;
    return {
      lat: loc.lat,
      lng: loc.lng,
      source: "google",
      formattedAddress: payload?.results?.[0]?.formatted_address || address
    };
  } catch {
    return null;
  }
}

export function recommendEvents(events, prefs = {}, limit = 8) {
  const interests = normalizeList(prefs.interests).map((s) => s.toLowerCase());
  const tracks = normalizeList(prefs.tracks).map((s) => s.toLowerCase());
  const formats = normalizeList(prefs.formats).map((s) => s.toLowerCase());
  const targetGroups = normalizeList(prefs.targetGroups).map((s) => s.toLowerCase());
  const date = prefs.date || null;

  const scored = events
    .filter((event) => (date ? event.date === date : true))
    .map((event) => {
      let score = 0;
      const eventTracks = (event.tracks || []).map((v) => v.toLowerCase());
      const eventFormats = (event.format || []).map((v) => v.toLowerCase());
      const eventTargets = (event.targetGroups || []).map((v) => v.toLowerCase());
      const hay = (event.searchableText || "").toLowerCase();

      for (const t of tracks) if (eventTracks.includes(t)) score += 4;
      for (const f of formats) if (eventFormats.includes(f)) score += 3;
      for (const g of targetGroups) if (eventTargets.includes(g)) score += 3;
      for (const kw of interests) {
        if (!kw) continue;
        if (hay.includes(kw)) score += 2;
        if ((event.title || "").toLowerCase().includes(kw)) score += 3;
      }

      return { event, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const byDate = (a.event.date || "").localeCompare(b.event.date || "");
      if (byDate !== 0) return byDate;
      return (a.event.starttime || "").localeCompare(b.event.starttime || "");
    });

  return scored.slice(0, limit).map(({ event, score }) => ({ ...event, matchScore: score }));
}

export function summarizeEvent(event, { full = false } = {}) {
  if (!event) return null;
  const base = {
    uid: event.uid,
    title: event.title,
    slug: event.slug,
    date: event.date,
    startTime: event.starttime,
    endTime: event.endtime,
    location: event.location,
    coordinates: event.geo ? { lat: event.geo.lat, lng: event.geo.lng } : null,
    formats: event.format || [],
    tracks: event.tracks || [],
    targetGroups: event.targetGroups || [],
    types: event.type || [],
    admission: event.admission || [],
    website: event.website,
    ticketUrl: event.ticketUrl,
    organizer: event.companyName,
    summary: truncate(event.descriptionFull, 280)
  };
  if (typeof event.distanceKm === "number") base.distanceKm = event.distanceKm;
  if (typeof event.matchScore === "number") base.matchScore = event.matchScore;
  if (full) {
    base.description = stripHtml(event.descriptionFull);
    base.registrationType = event.registrationType || [];
    base.accessibility = event.accessibility || [];
  }
  return base;
}

export function programmeOverview(events) {
  const dates = [...new Set(events.map((e) => e.date))].sort();
  const formats = [...new Set(events.flatMap((e) => e.format || []))].sort();
  const tracks = [...new Set(events.flatMap((e) => e.tracks || []))].sort();
  const targetGroups = [...new Set(events.flatMap((e) => e.targetGroups || []))].sort();
  const types = [...new Set(events.flatMap((e) => e.type || []))].sort();
  const admission = [...new Set(events.flatMap((e) => e.admission || []))].sort();
  const locations = [...new Set(events.map((e) => e.location).filter(Boolean))].sort();

  const countsByDate = {};
  for (const e of events) {
    countsByDate[e.date] = (countsByDate[e.date] || 0) + 1;
  }

  return {
    totalEvents: events.length,
    dates,
    countsByDate,
    formats,
    tracks,
    targetGroups,
    types,
    admission,
    locations
  };
}

export function findEvent(events, { uid, slug } = {}) {
  if (uid != null) {
    const n = Number(uid);
    return events.find((e) => e.uid === n) || null;
  }
  if (slug) {
    const s = String(slug).toLowerCase();
    return events.find((e) => String(e.slug).toLowerCase() === s) || null;
  }
  return null;
}
