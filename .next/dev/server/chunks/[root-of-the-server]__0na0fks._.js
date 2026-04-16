module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/lib/scraper.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readStoredEvents",
    ()=>readStoredEvents,
    "scrapeAndStoreEvents",
    ()=>scrapeAndStoreEvents
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const PROGRAMME_URL = "https://viennaup.com/?type=1452982642";
const EVENTS_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "events.json");
const GEOCODE_CACHE_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "geocode-cache.json");
async function readJson(filePath, fallback) {
    try {
        const content = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(filePath, "utf8");
        return JSON.parse(content);
    } catch  {
        return fallback;
    }
}
async function writeJson(filePath, payload) {
    await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
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
        value.forEach((item)=>collectSearchTerms(item, bucket));
        return bucket;
    }
    if (typeof value === "object") {
        Object.values(value).forEach((item)=>collectSearchTerms(item, bucket));
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
        ...normalizedEvent.type || [],
        ...normalizedEvent.format || [],
        ...normalizedEvent.tracks || [],
        ...normalizedEvent.targetGroups || [],
        ...normalizedEvent.admission || [],
        ...normalizedEvent.registrationType || [],
        ...normalizedEvent.accessibility || []
    ];
    return [
        ...new Set([
            ...normalizedTerms,
            ...rawTerms
        ].filter(Boolean))
    ].join(" ");
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
    const response = await fetch(endpoint, {
        next: {
            revalidate: 0
        }
    });
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
async function scrapeAndStoreEvents() {
    const res = await fetch(PROGRAMME_URL, {
        next: {
            revalidate: 0
        }
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch programme endpoint: ${res.status}`);
    }
    const events = await res.json();
    const geocodeCache = await readJson(GEOCODE_CACHE_FILE, {});
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const normalized = [];
    for (const event of events){
        if (!event || event.hidden) {
            continue;
        }
        const geo = await geocodeAddress(event.location, apiKey, geocodeCache);
        normalized.push(simplifyEvent(event, geo));
    }
    normalized.sort((a, b)=>{
        const byDate = a.date.localeCompare(b.date);
        if (byDate !== 0) return byDate;
        return a.starttime.localeCompare(b.starttime);
    });
    await writeJson(EVENTS_FILE, normalized);
    await writeJson(GEOCODE_CACHE_FILE, geocodeCache);
    return {
        count: normalized.length,
        withCoordinates: normalized.filter((item)=>item.geo).length,
        dates: [
            ...new Set(normalized.map((item)=>item.date))
        ]
    };
}
async function readStoredEvents() {
    return readJson(EVENTS_FILE, []);
}
}),
"[project]/app/api/events/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scraper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/scraper.js [app-route] (ecmascript)");
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get("refresh") === "1";
    if (refresh) {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scraper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scrapeAndStoreEvents"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            refreshed: true,
            ...result
        });
    }
    const events = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scraper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readStoredEvents"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        events
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0na0fks._.js.map