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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/MapApp.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
const VIENNA_CENTER = {
    lat: 48.2082,
    lng: 16.3738
};
/** Native ES `Map` (avoid name clash with `google.maps.Map` in some bundles). */ const NativeMap = globalThis.Map;
/**
 * Load `viennamapstyle.json` over HTTP so rules are plain JSON (not bundler proxies), then deep-clone for the Maps API.
 */ async function fetchMapStyleRules() {
    const res = await fetch("/api/map-style");
    if (!res.ok) throw new Error(`Map style fetch failed: ${res.status}`);
    const data = await res.json();
    const arr = Array.isArray(data) ? data : [];
    return JSON.parse(JSON.stringify(arr));
}
/**
 * Basemap styling: either cloud Map Styles (`mapId` from env, no `styles` option — see Google docs) or
 * legacy JSON from `/api/map-style` as `styles`. Do not pass both; that conflicts with vector Map + styling.
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
    const counts = new NativeMap();
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
        const grouped = new NativeMap();
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
            const useCloudStyle = Boolean(mapId && String(mapId).trim());
            const styleRules = useCloudStyle ? null : await fetchMapStyleRules();
            await loadGoogleMaps(key);
            const el = document.getElementById("viennaup-map");
            if (!el) return;
            const mapsNs = window.google.maps;
            let GoogleMapCtor = mapsNs.Map;
            if (typeof mapsNs.importLibrary === "function") {
                const lib = await mapsNs.importLibrary("maps");
                if (typeof lib.Map === "function") {
                    GoogleMapCtor = lib.Map;
                }
                for (const [k, v] of Object.entries(lib)){
                    if (k === "importLibrary" || v == null) continue;
                    mapsNs[k] = v;
                }
            }
            if (typeof GoogleMapCtor !== "function") {
                throw new Error("Google Maps Map constructor not available");
            }
            const mapOptions = {
                center: VIENNA_CENTER,
                zoom: 12,
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
            };
            if (useCloudStyle) {
                mapOptions.mapId = String(mapId).trim();
            } else {
                mapOptions.styles = styleRules;
            }
            const map = new GoogleMapCtor(el, mapOptions);
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
                                lineNumber: 389,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        children: "ViennaUP Live Map"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "unofficial map guide to ViennaUp 2026 events"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 392,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 390,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 388,
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
                                                lineNumber: 400,
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
                                                    lineNumber: 402,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 399,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 397,
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
                                                lineNumber: 412,
                                                columnNumber: 15
                                            }, this),
                                            filters.types.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: type,
                                                    children: type
                                                }, type, false, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 414,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 411,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 409,
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
                                                lineNumber: 424,
                                                columnNumber: 15
                                            }, this),
                                            filters.formats.map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: format,
                                                    children: format
                                                }, format, false, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 426,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MapApp.js",
                                        lineNumber: 423,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 421,
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
                                        lineNumber: 435,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: refreshData,
                                disabled: isRefreshing,
                                children: isRefreshing ? "Refreshing data..." : "Re-scrape events"
                            }, void 0, false, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 443,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultMeta,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: filteredEvents.length
                            }, void 0, false, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 449,
                                columnNumber: 11
                            }, this),
                            " filtered events across ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: groupedByLocation.length
                            }, void 0, false, {
                                fileName: "[project]/components/MapApp.js",
                                lineNumber: 449,
                                columnNumber: 75
                            }, this),
                            " locations"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 448,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listSection,
                        children: !selectedLocationData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hint,
                            children: "Click a map marker to list events at that location (with active filters)."
                        }, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 454,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: selectedLocationData.location
                                }, void 0, false, {
                                    fileName: "[project]/components/MapApp.js",
                                    lineNumber: 457,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        selectedLocationData.events.length,
                                        " event(s)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/MapApp.js",
                                    lineNumber: 458,
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
                                                    lineNumber: 464,
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
                                                    lineNumber: 465,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: event.companyName
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 468,
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
                                                            lineNumber: 471,
                                                            columnNumber: 27
                                                        }, this) : null,
                                                        event.ticketUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: event.ticketUrl,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            children: "Tickets"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MapApp.js",
                                                            lineNumber: 476,
                                                            columnNumber: 27
                                                        }, this) : null,
                                                        googleMapsUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: googleMapsUrl,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            children: "Google Maps"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/MapApp.js",
                                                            lineNumber: 481,
                                                            columnNumber: 27
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/MapApp.js",
                                                    lineNumber: 469,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, event.uid, true, {
                                            fileName: "[project]/components/MapApp.js",
                                            lineNumber: 463,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/MapApp.js",
                                    lineNumber: 459,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/MapApp.js",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapApp.js",
                lineNumber: 387,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mapSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "viennaup-map",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].map
                }, void 0, false, {
                    fileName: "[project]/components/MapApp.js",
                    lineNumber: 496,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MapApp.js",
                lineNumber: 495,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MapApp$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Created with 💛 in Vienna by Matthias Grabner",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 502,
                            columnNumber: 11
                        }, this),
                        "Matthias Grabner e.U -",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "mailto:office@grabner.tech",
                            children: "office@grabner.tech"
                        }, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 504,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/MapApp.js",
                            lineNumber: 505,
                            columnNumber: 11
                        }, this),
                        "ATU66965000"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MapApp.js",
                    lineNumber: 500,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MapApp.js",
                lineNumber: 499,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MapApp.js",
        lineNumber: 386,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_057-tju._.js.map