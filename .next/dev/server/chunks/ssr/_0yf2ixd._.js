module.exports = [
"[project]/lib/date.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toDateLabel",
    ()=>toDateLabel,
    "toTimeRange",
    ()=>toTimeRange
]);
function toDateLabel(dateString) {
    const date = new Date(`${dateString}T00:00:00`);
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short"
    }).format(date);
}
function toTimeRange(start, end) {
    return `${start?.slice(0, 5) || ""} - ${end?.slice(0, 5) || ""}`;
}
}),
"[project]/viennamapstyle.json.[json].cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c0c1e"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e8d840"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#0c0c1e"
            },
            {
                "weight": 2
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#071440"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#47b5e5"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#071440"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#12122a"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#13132e"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0b1613"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0d1a14"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0a1c10"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#1e8050"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#0a1c10"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#18183a"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9070c0"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#0c0c1e"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e8186e"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1a1040"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1a0f38"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1a1235"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b06800"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e8a000"
            },
            {
                "weight": 1.5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f5e100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#2a1800"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c87800"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f5a000"
            },
            {
                "weight": 2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7a0840"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c81060"
            },
            {
                "weight": 1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f090c0"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#2a0020"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#1c0a2c"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#3a1058"
            },
            {
                "weight": 0.5
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7050a0"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#0c0c1e"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#10082e"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#1a0a40"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#47b5e5"
            },
            {
                "weight": 1
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1a1040"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#47b5e5"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f5e100"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e8186e"
            },
            {
                "weight": 1.5
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e8186e"
            },
            {
                "weight": 2
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c01058"
            },
            {
                "weight": 1.5
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f5e100"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#0c0c1e"
            },
            {
                "weight": 3
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#c8a830"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1e1040"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#5040a0"
            }
        ]
    }
];
}),
"[project]/components/MapApp.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "brandWrap": "MapApp-module__d1azJq__brandWrap",
  "eventList": "MapApp-module__d1azJq__eventList",
  "filters": "MapApp-module__d1azJq__filters",
  "footer": "MapApp-module__d1azJq__footer",
  "hint": "MapApp-module__d1azJq__hint",
  "links": "MapApp-module__d1azJq__links",
  "listSection": "MapApp-module__d1azJq__listSection",
  "logo": "MapApp-module__d1azJq__logo",
  "map": "MapApp-module__d1azJq__map",
  "mapSection": "MapApp-module__d1azJq__mapSection",
  "page": "MapApp-module__d1azJq__page",
  "resultMeta": "MapApp-module__d1azJq__resultMeta",
  "sidebar": "MapApp-module__d1azJq__sidebar",
});
}),
"[project]/components/MapApp.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MapApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$date$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/date.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$viennamapstyle$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/viennamapstyle.json.[json].cjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/MapApp.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
const VIENNA_CENTER = {
    lat: 48.2082,
    lng: 16.3738
};
/** Plain deep copy so the Maps API gets real objects, not bundled JSON proxies. */ function normalizeMapStyles(raw) {
    const arr = Array.isArray(raw) ? raw : raw?.default;
    if (!Array.isArray(arr)) return [];
    return JSON.parse(JSON.stringify(arr));
}
const MAP_STYLE_RULES = normalizeMapStyles(__TURBOPACK__imported__module__$5b$project$5d2f$viennamapstyle$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
/**
 * Basemap colours from `viennamapstyle.json` via `styles` (no `mapId`, so classic `google.maps.Marker` works).
 * We load the script without `loading=async` so `google.maps.Map` exists after onload (avoids flaky importLibrary merge).
 */ function getGoogleMapsApiScripts() {
    return [
        ...document.querySelectorAll('script[src*="maps.googleapis.com/maps/api/js"]')
    ];
}
function mapsScriptSrcIsCompatible(scriptSrc) {
    try {
        const url = new URL(scriptSrc, "https://maps.googleapis.com");
        if (!url.pathname.includes("/maps/api/js")) return false;
        const libs = (url.searchParams.get("libraries") || "").split(",").map((s)=>s.trim()).filter(Boolean);
        if (libs.includes("visualization")) return false;
        if (url.searchParams.get("loading") === "async") return false;
        return true;
    } catch  {
        return false;
    }
}
function isStaleMapsRuntime() {
    return Boolean(window.google?.maps?.visualization?.HeatmapLayer);
}
async function waitForGoogleMapsReady(timeoutMs = 20000) {
    const start = Date.now();
    while(!window.google?.maps){
        if (Date.now() - start > timeoutMs) {
            throw new Error("Timed out waiting for Google Maps JavaScript API");
        }
        await new Promise((resolve)=>setTimeout(resolve, 50));
    }
}
async function waitForMapConstructor(timeoutMs = 20000) {
    const start = Date.now();
    while(typeof window.google?.maps?.Map !== "function"){
        if (Date.now() - start > timeoutMs) {
            throw new Error("Timed out waiting for google.maps.Map");
        }
        await new Promise((resolve)=>setTimeout(resolve, 40));
    }
}
async function loadGoogleMaps(key) {
    if (!key) throw new Error("Missing Google Maps API key");
    for (const s of getGoogleMapsApiScripts()){
        if (mapsScriptSrcIsCompatible(s.src) && !window.google?.maps) {
            s.remove();
        }
    }
    let scripts = getGoogleMapsApiScripts();
    const hasCompatibleScript = scripts.some((s)=>mapsScriptSrcIsCompatible(s.src));
    if (window.google?.maps && hasCompatibleScript && !isStaleMapsRuntime()) {
        try {
            await waitForMapConstructor();
            return window.google;
        } catch  {
        /* fall through to reinject / repair */ }
    }
    for (const s of scripts){
        if (!mapsScriptSrcIsCompatible(s.src)) {
            s.remove();
        }
    }
    if (isStaleMapsRuntime()) {
        try {
            delete window.google;
        } catch  {
            window.google = undefined;
        }
    }
    if (!getGoogleMapsApiScripts().some((s)=>mapsScriptSrcIsCompatible(s.src))) {
        await new Promise((resolve, reject)=>{
            const script = document.createElement("script");
            const params = new URLSearchParams({
                key,
                v: "weekly"
            });
            script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
            script.async = true;
            script.defer = true;
            script.onload = ()=>resolve();
            script.onerror = ()=>reject(new Error("Failed to load Google Maps script"));
            document.head.appendChild(script);
        });
    }
    await waitForGoogleMapsReady();
    await waitForMapConstructor();
    return window.google;
}
function unique(values) {
    return [
        ...new Set(values.filter(Boolean))
    ].sort();
}
function stripHtml(text) {
    return (text || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function getSearchableText(event) {
    if (event.searchableText) return event.searchableText;
    return [
        event.title,
        event.location,
        event.companyName,
        event.website,
        event.ticketUrl,
        stripHtml(event.descriptionFull),
        ...event.type || [],
        ...event.format || [],
        ...event.tracks || [],
        ...event.targetGroups || [],
        ...event.admission || [],
        ...event.registrationType || [],
        ...event.accessibility || []
    ].filter(Boolean).join(" ");
}
function getGoogleMapsUrl(event) {
    const hasGeo = Number.isFinite(event?.geo?.lat) && Number.isFinite(event?.geo?.lng);
    const query = hasGeo ? `${event.geo.lat},${event.geo.lng} (${event.location || event.title || "Event location"})` : event?.location || event?.title;
    if (!query) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
function geoGroupKey(event) {
    return `${event.geo.lat.toFixed(5)}::${event.geo.lng.toFixed(5)}`;
}
/** Same venue often appears with different spelling in source data; pick a stable label for the pin heading. */ function pickRepresentativeLocation(events) {
    const counts = new Map();
    for (const e of events){
        const loc = e.location || "";
        counts.set(loc, (counts.get(loc) || 0) + 1);
    }
    let best = "";
    let bestCount = 0;
    for (const [loc, c] of counts){
        if (c > bestCount || c === bestCount && loc.length > best.length) {
            best = loc;
            bestCount = c;
        }
    }
    return best || events[0]?.location || "";
}
function MapApp({ initialEvents }) {
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialEvents);
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [selectedType, setSelectedType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [selectedFormat, setSelectedFormat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [selectedLocation, setSelectedLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedEventUids, setSelectedEventUids] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchText, setSearchText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isRefreshing, setIsRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mapState, setMapState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        map: null,
        markers: [],
        initialized: false
    });
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const filters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const dates = unique(events.map((event)=>event.date));
        const types = unique(events.flatMap((event)=>event.type || []));
        const formats = unique(events.flatMap((event)=>event.format || []));
        return {
            dates,
            types,
            formats
        };
    }, [
        events
    ]);
    const filteredEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = searchText.toLowerCase().trim();
        return events.filter((event)=>{
            if (!event.geo) return false;
            if (selectedDate !== "all" && event.date !== selectedDate) return false;
            if (selectedType !== "all" && !(event.type || []).includes(selectedType)) return false;
            if (selectedFormat !== "all" && !(event.format || []).includes(selectedFormat)) return false;
            if (!query) return true;
            const haystack = getSearchableText(event).toLowerCase();
            return haystack.includes(query);
        });
    }, [
        events,
        selectedDate,
        selectedType,
        selectedFormat,
        searchText
    ]);
    const groupedByLocation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const grouped = new Map();
        for (const event of filteredEvents){
            const key = geoGroupKey(event);
            if (!grouped.has(key)) {
                grouped.set(key, {
                    key,
                    geo: event.geo,
                    events: []
                });
            }
            grouped.get(key).events.push(event);
        }
        return [
            ...grouped.values()
        ].map((group)=>({
                ...group,
                location: pickRepresentativeLocation(group.events)
            }));
    }, [
        filteredEvents
    ]);
    const selectedLocationData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedLocation || selectedEventUids.length === 0) return null;
        const locationEvents = filteredEvents.filter((event)=>selectedEventUids.includes(event.uid));
        if (locationEvents.length === 0) return null;
        return {
            key: selectedLocation,
            location: pickRepresentativeLocation(locationEvents),
            events: locationEvents
        };
    }, [
        filteredEvents,
        selectedEventUids,
        selectedLocation
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let mounted = true;
        async function initMap() {
            if (mapState.initialized) return;
            const keyResponse = await fetch("/api/maps-key");
            const { key } = await keyResponse.json();
            const google = await loadGoogleMaps(key);
            const map = new google.maps.Map(document.getElementById("viennaup-map"), {
                center: VIENNA_CENTER,
                zoom: 12,
                styles: MAP_STYLE_RULES,
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
            });
            if (mounted) {
                setMapState({
                    map,
                    markers: [],
                    initialized: true
                });
            }
        }
        initMap().catch(console.error);
        return ()=>{
            mounted = false;
        };
    }, [
        mapState.initialized
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mapState.map || !window.google?.maps) return;
        markersRef.current.forEach((marker)=>marker.setMap(null));
        markersRef.current = [];
        const markers = groupedByLocation.map((group)=>{
            const marker = new window.google.maps.Marker({
                position: group.geo,
                map: mapState.map,
                title: `${group.location} (${group.events.length})`,
                label: {
                    text: String(group.events.length),
                    color: "#0c0c1e",
                    fontWeight: "700"
                },
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    fillColor: "#47b5e5",
                    fillOpacity: 1,
                    strokeColor: "#f5e100",
                    strokeWeight: 4,
                    scale: 18
                }
            });
            marker.addListener("click", ()=>{
                setSelectedLocation(group.key);
                setSelectedEventUids(group.events.map((event)=>event.uid));
            });
            return marker;
        });
        markersRef.current = markers;
        if (markers.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            groupedByLocation.forEach((group)=>bounds.extend(group.geo));
            mapState.map.fitBounds(bounds, 70);
        }
        setMapState((prev)=>({
                ...prev,
                markers
            }));
        if (selectedLocation && !groupedByLocation.find((group)=>group.key === selectedLocation)) {
            setSelectedLocation(null);
            setSelectedEventUids([]);
        }
        return ()=>{
            markersRef.current.forEach((marker)=>marker.setMap(null));
            markersRef.current = [];
        };
    }, [
        groupedByLocation,
        mapState.map,
        filteredEvents
    ]);
    async function refreshData() {
        setIsRefreshing(true);
        try {
            await fetch("/api/scrape", {
                method: "POST"
            });
            const res = await fetch("/api/events");
            const payload = await res.json();
            setEvents(payload.events || []);
        } finally{
            setIsRefreshing(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sidebar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].brandWrap,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logo,
                                children: "V↑"
                            }, void 0, false, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        children: "ViennaUP Live Map"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 359,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "unofficial map guide to ViennaUp 2026 events"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 360,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 358,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filters,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Day",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedDate,
                                        onChange: (e)=>setSelectedDate(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "All days"
                                            }, void 0, false, {
                                                fileName: "[project]/components/MapApp.js",
                                                lineNumber: 368,
                                                columnNumber: 15
                                            }, this),
                                            filters.dates.map((date)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: date,
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$date$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toDateLabel"])(date),
                                                        " (",
                                                        date,
                                                        ")"
                                                    ]
                                                }, date, true, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 370,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 367,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Event type",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedType,
                                        onChange: (e)=>setSelectedType(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "All types"
                                            }, void 0, false, {
                                                fileName: "[project]/components/MapApp.js",
                                                lineNumber: 380,
                                                columnNumber: 15
                                            }, this),
                                            filters.types.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: type,
                                                    children: type
                                                }, type, false, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 382,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 379,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Format",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedFormat,
                                        onChange: (e)=>setSelectedFormat(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "All formats"
                                            }, void 0, false, {
                                                fileName: "[project]/components/MapApp.js",
                                                lineNumber: 392,
                                                columnNumber: 15
                                            }, this),
                                            filters.formats.map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: format,
                                                    children: format
                                                }, format, false, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 394,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 389,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    "Search",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Title, host, keyword...",
                                        value: searchText,
                                        onChange: (e)=>setSearchText(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 403,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 401,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: refreshData,
                                disabled: isRefreshing,
                                children: isRefreshing ? "Refreshing data..." : "Re-scrape events"
                            }, void 0, false, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 364,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultMeta,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: filteredEvents.length
                            }, void 0, false, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 417,
                                columnNumber: 11
                            }, this),
                            " filtered events across ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: groupedByLocation.length
                            }, void 0, false, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 417,
                                columnNumber: 75
                            }, this),
                            " locations"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 416,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listSection,
                        children: !selectedLocationData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hint,
                            children: "Click a map marker to list events at that location (with active filters)."
                        }, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 422,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: selectedLocationData.location
                                }, void 0, false, {
                                    fileName: "[project]/components/MapApp.js",
                                    lineNumber: 425,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        selectedLocationData.events.length,
                                        " event(s)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/MapApp.js",
                                    lineNumber: 426,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].eventList,
                                    children: selectedLocationData.events.map((event)=>{
                                        const googleMapsUrl = getGoogleMapsUrl(event);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: event.title
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 432,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$date$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toDateLabel"])(event.date),
                                                        " | ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$date$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTimeRange"])(event.starttime, event.endtime)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 433,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: event.companyName
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 436,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].links,
                                                    children: [
                                                        event.website ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: event.website,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            children: "Event page"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MapApp.js",
                                                            lineNumber: 439,
                                                            columnNumber: 27
                                                        }, this) : null,
                                                        event.ticketUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: event.ticketUrl,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            children: "Tickets"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MapApp.js",
                                                            lineNumber: 444,
                                                            columnNumber: 27
                                                        }, this) : null,
                                                        googleMapsUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: googleMapsUrl,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            children: "Google Maps"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MapApp.js",
                                                            lineNumber: 449,
                                                            columnNumber: 27
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 437,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, event.uid, true, {
                                            fileName: "[project]/components/MapApp.js",
                                            lineNumber: 431,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/MapApp.js",
                                    lineNumber: 427,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 420,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapApp.js",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mapSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "viennaup-map",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].map
                }, void 0, false, {
                    fileName: "[project]/components/MapApp.js",
                    lineNumber: 464,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MapApp.js",
                lineNumber: 463,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Created with 💛 in Vienna by Matthias Grabner",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 470,
                            columnNumber: 11
                        }, this),
                        "Matthias Grabner e.U -",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "mailto:office@grabner.tech",
                            children: "office@grabner.tech"
                        }, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 472,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 473,
                            columnNumber: 11
                        }, this),
                        "ATU66965000"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MapApp.js",
                    lineNumber: 468,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MapApp.js",
                lineNumber: 467,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MapApp.js",
        lineNumber: 354,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_0yf2ixd._.js.map