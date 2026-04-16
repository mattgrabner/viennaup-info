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
"[project]/data/viennaup-map-style.json.[json].cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b8b6ac"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#474750"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#d6d6dd"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b9b8b2"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b2b0a9"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#bebdb6"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#666670"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d46"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#9a9aa3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e4d36b"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#adacb4"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b7b6bf"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#bdbcc4"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b1b0b9"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b9b8c0"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#5b4f1b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#db5665"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#bf2c40"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d94857"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e89464"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#cf58d4"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#de7ae0"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#8f8f99"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#efd64f"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#8a8a95"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#54545e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#4d4d57"
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
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$viennaup$2d$map$2d$style$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/viennaup-map-style.json.[json].cjs [app-ssr] (ecmascript)");
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
/**
 * Legacy JSON styling cannot be passed as `styles` when `mapId` is set (cloud tooling owns the basemap).
 * Registering a StyledMapType and switching `mapTypeId` restores the same palette while keeping advanced markers.
 * @see https://developers.google.com/maps/documentation/javascript/examples/maptype-styled-simple
 */ function applyProgrammaticPaletteRoadmap(google, map, styles) {
    if (typeof google.maps.StyledMapType !== "function") return;
    const mapTypeId = "viennaup_palette_roadmap";
    const styled = new google.maps.StyledMapType(styles, {
        name: "ViennaUP palette"
    });
    map.mapTypes.set(mapTypeId, styled);
    map.setMapTypeId(mapTypeId);
}
function getGoogleMapsApiScripts() {
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
        if (!libs.includes("marker")) return false;
        return url.searchParams.get("loading") === "async";
    } catch  {
        return false;
    }
}
function advancedMarkersAvailable() {
    return Boolean(window.google?.maps?.marker?.AdvancedMarkerElement);
}
/** True when `window.google.maps` is from an old bootstrap (e.g. visualization-only) we must replace. */ function isStaleMapsRuntime() {
    if (!window.google?.maps) return false;
    if (advancedMarkersAvailable()) return false;
    if (window.google.maps.visualization?.HeatmapLayer) return true;
    if (typeof window.google.maps.importLibrary !== "function") return true;
    return false;
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
async function waitForAdvancedMarkers(timeoutMs = 20000) {
    const start = Date.now();
    while(!advancedMarkersAvailable()){
        if (Date.now() - start > timeoutMs) {
            throw new Error("Timed out waiting for Google Maps marker library");
        }
        if (typeof window.google?.maps?.importLibrary === "function") {
            try {
                await window.google.maps.importLibrary("marker");
            } catch  {
            /* marker may already be attached from script URL */ }
        }
        await new Promise((resolve)=>setTimeout(resolve, 50));
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
    let hasCompatibleScript = scripts.some((s)=>mapsScriptSrcIsCompatible(s.src));
    if (advancedMarkersAvailable() && hasCompatibleScript) {
        return window.google;
    }
    for (const s of scripts){
        if (!mapsScriptSrcIsCompatible(s.src)) {
            s.remove();
        }
    }
    scripts = getGoogleMapsApiScripts();
    hasCompatibleScript = scripts.some((s)=>mapsScriptSrcIsCompatible(s.src));
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
                v: "weekly",
                loading: "async",
                libraries: "marker"
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
    await waitForAdvancedMarkers();
    return window.google;
}
async function ensureMarkerConstructorsLoaded() {
    if (advancedMarkersAvailable()) return;
    if (typeof window.google?.maps?.importLibrary === "function") {
        await window.google.maps.importLibrary("marker");
    }
}
/** Canvas density layer (replaces deprecated google.maps.visualization.HeatmapLayer). */ function createEventDensityOverlay(google, points) {
    class EventDensityOverlay extends google.maps.OverlayView {
        constructor(data){
            super();
            this.data = data;
            this.canvas = null;
        }
        onAdd() {
            this.canvas = document.createElement("canvas");
            this.canvas.style.position = "absolute";
            this.canvas.style.inset = "0";
            this.canvas.style.pointerEvents = "none";
            this.getPanes().overlayLayer.appendChild(this.canvas);
        }
        draw() {
            const map = this.getMap();
            const projection = this.getProjection();
            if (!this.canvas || !projection || !map) return;
            const div = map.getDiv();
            const w = div.clientWidth;
            const h = div.clientHeight;
            if (w === 0 || h === 0) return;
            const dpr = window.devicePixelRatio || 1;
            this.canvas.width = w * dpr;
            this.canvas.height = h * dpr;
            this.canvas.style.width = `${w}px`;
            this.canvas.style.height = `${h}px`;
            const ctx = this.canvas.getContext("2d");
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);
            ctx.globalCompositeOperation = "lighter";
            const radius = 52;
            for (const p of this.data){
                const pixel = projection.fromLatLngToDivPixel(new google.maps.LatLng(p.lat, p.lng));
                if (!pixel) continue;
                if (pixel.x < -radius || pixel.y < -radius || pixel.x > w + radius || pixel.y > h + radius) {
                    continue;
                }
                const a = 0.085 * (p.weight || 1);
                const grd = ctx.createRadialGradient(pixel.x, pixel.y, 0, pixel.x, pixel.y, radius);
                grd.addColorStop(0, `rgba(62, 197, 255, ${a})`);
                grd.addColorStop(0.4, `rgba(46, 189, 255, ${a * 0.55})`);
                grd.addColorStop(0.75, `rgba(23, 116, 255, ${a * 0.28})`);
                grd.addColorStop(1, "rgba(12, 57, 214, 0)");
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(pixel.x, pixel.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalCompositeOperation = "source-over";
        }
        onRemove() {
            if (this.canvas?.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
            this.canvas = null;
        }
    }
    const overlay = new EventDensityOverlay(points);
    return overlay;
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
    const densityOverlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
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
            const { key, mapId } = await keyResponse.json();
            const google = await loadGoogleMaps(key);
            // mapId is required for advanced markers; basemap colours come from StyledMapType (not `styles`, which conflicts with mapId).
            const map = new google.maps.Map(document.getElementById("viennaup-map"), {
                mapId: mapId || "DEMO_MAP_ID",
                center: VIENNA_CENTER,
                zoom: 12,
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
            });
            applyProgrammaticPaletteRoadmap(google, map, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$viennaup$2d$map$2d$style$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
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
        markersRef.current.forEach((marker)=>{
            marker.map = null;
        });
        markersRef.current = [];
        if (densityOverlayRef.current) {
            densityOverlayRef.current.setMap(null);
            densityOverlayRef.current = null;
        }
        let cancelled = false;
        (async ()=>{
            await ensureMarkerConstructorsLoaded();
            if (cancelled) return;
            const { AdvancedMarkerElement, PinElement } = window.google.maps.marker;
            if (!AdvancedMarkerElement || !PinElement) {
                console.error("Advanced markers library not available");
                return;
            }
            const markers = groupedByLocation.map((group)=>{
                const pin = new PinElement({
                    background: "#3ec5ff",
                    borderColor: "#f2d84f",
                    glyphText: String(group.events.length),
                    glyphColor: "#0f1226"
                });
                const marker = new AdvancedMarkerElement({
                    map: mapState.map,
                    position: group.geo,
                    title: `${group.location} (${group.events.length})`,
                    content: pin.element,
                    gmpClickable: true
                });
                marker.addListener("click", ()=>{
                    setSelectedLocation(group.key);
                    setSelectedEventUids(group.events.map((event)=>event.uid));
                });
                return marker;
            });
            if (cancelled) {
                markers.forEach((m)=>{
                    m.map = null;
                });
                return;
            }
            markersRef.current = markers;
            if (markers.length > 0) {
                const bounds = new window.google.maps.LatLngBounds();
                groupedByLocation.forEach((group)=>bounds.extend(group.geo));
                mapState.map.fitBounds(bounds, 70);
            }
            if (cancelled) {
                markers.forEach((m)=>{
                    m.map = null;
                });
                markersRef.current = [];
                return;
            }
            const heatPoints = filteredEvents.map((event)=>({
                    lat: event.geo.lat,
                    lng: event.geo.lng,
                    weight: 1
                }));
            if (heatPoints.length > 0) {
                const overlay = createEventDensityOverlay(window.google, heatPoints);
                overlay.setMap(mapState.map);
                if (cancelled) {
                    overlay.setMap(null);
                    markers.forEach((m)=>{
                        m.map = null;
                    });
                    markersRef.current = [];
                    return;
                }
                densityOverlayRef.current = overlay;
            }
            if (!cancelled) {
                setMapState((prev)=>({
                        ...prev,
                        markers
                    }));
                if (selectedLocation && !groupedByLocation.find((group)=>group.key === selectedLocation)) {
                    setSelectedLocation(null);
                    setSelectedEventUids([]);
                }
            }
        })().catch(console.error);
        return ()=>{
            cancelled = true;
            markersRef.current.forEach((marker)=>{
                marker.map = null;
            });
            markersRef.current = [];
            if (densityOverlayRef.current) {
                densityOverlayRef.current.setMap(null);
                densityOverlayRef.current = null;
            }
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
                                lineNumber: 514,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        children: "ViennaUP Live Map"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 516,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "unofficial map guide to ViennaUp 2026 events"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 517,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 515,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 513,
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
                                                lineNumber: 525,
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
                                                    lineNumber: 527,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 524,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 522,
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
                                                lineNumber: 537,
                                                columnNumber: 15
                                            }, this),
                                            filters.types.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: type,
                                                    children: type
                                                }, type, false, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 539,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 536,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 534,
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
                                                lineNumber: 549,
                                                columnNumber: 15
                                            }, this),
                                            filters.formats.map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: format,
                                                    children: format
                                                }, format, false, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 551,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 548,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 546,
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
                                        lineNumber: 560,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 558,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: refreshData,
                                disabled: isRefreshing,
                                children: isRefreshing ? "Refreshing data..." : "Re-scrape events"
                            }, void 0, false, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 568,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 521,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultMeta,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: filteredEvents.length
                            }, void 0, false, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 574,
                                columnNumber: 11
                            }, this),
                            " filtered events across ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: groupedByLocation.length
                            }, void 0, false, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 574,
                                columnNumber: 75
                            }, this),
                            " locations"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 573,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listSection,
                        children: !selectedLocationData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hint,
                            children: "Click a map marker to list events at that location (with active filters)."
                        }, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 579,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: selectedLocationData.location
                                }, void 0, false, {
                                    fileName: "[project]/components/MapApp.js",
                                    lineNumber: 582,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        selectedLocationData.events.length,
                                        " event(s)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/MapApp.js",
                                    lineNumber: 583,
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
                                                    lineNumber: 589,
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
                                                    lineNumber: 590,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: event.companyName
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 593,
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
                                                            lineNumber: 596,
                                                            columnNumber: 27
                                                        }, this) : null,
                                                        event.ticketUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: event.ticketUrl,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            children: "Tickets"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MapApp.js",
                                                            lineNumber: 601,
                                                            columnNumber: 27
                                                        }, this) : null,
                                                        googleMapsUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: googleMapsUrl,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            children: "Google Maps"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MapApp.js",
                                                            lineNumber: 606,
                                                            columnNumber: 27
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 594,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, event.uid, true, {
                                            fileName: "[project]/components/MapApp.js",
                                            lineNumber: 588,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/MapApp.js",
                                    lineNumber: 584,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 577,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapApp.js",
                lineNumber: 512,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mapSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "viennaup-map",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].map
                }, void 0, false, {
                    fileName: "[project]/components/MapApp.js",
                    lineNumber: 621,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MapApp.js",
                lineNumber: 620,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Created with 💛 in Vienna by Matthias Grabner",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 627,
                            columnNumber: 11
                        }, this),
                        "Matthias Grabner e.U -",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "mailto:office@grabner.tech",
                            children: "office@grabner.tech"
                        }, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 629,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 630,
                            columnNumber: 11
                        }, this),
                        "ATU66965000"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MapApp.js",
                    lineNumber: 625,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MapApp.js",
                lineNumber: 624,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MapApp.js",
        lineNumber: 511,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_0m.d67o._.js.map