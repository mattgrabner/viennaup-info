"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toDateLabel, toTimeRange } from "@/lib/date";
import styles from "./MapApp.module.css";

const VIENNA_CENTER = { lat: 48.2082, lng: 16.3738 };

/** Native ES `Map` (avoid name clash with `google.maps.Map` in some bundles). */
const NativeMap = globalThis.Map;

/**
 * Load `viennamapstyle.json` over HTTP so rules are plain JSON (not bundler proxies), then deep-clone for the Maps API.
 */
async function fetchMapStyleRules() {
  const res = await fetch("/api/map-style");
  if (!res.ok) throw new Error(`Map style fetch failed: ${res.status}`);
  const data = await res.json();
  const arr = Array.isArray(data) ? data : [];
  return JSON.parse(JSON.stringify(arr));
}

/**
 * Basemap styling: either cloud Map Styles (`mapId` from env, no `styles` option — see Google docs) or
 * legacy JSON from `/api/map-style` as `styles`. Do not pass both; that conflicts with vector Map + styling.
 */

function getGoogleMapsApiScripts() {
  return [...document.querySelectorAll('script[src*="maps.googleapis.com/maps/api/js"]')];
}

function mapsScriptSrcIsCompatible(scriptSrc) {
  try {
    const url = new URL(scriptSrc, "https://maps.googleapis.com");
    if (!url.pathname.includes("/maps/api/js")) return false;
    const libs = (url.searchParams.get("libraries") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (libs.includes("visualization")) return false;
    if (url.searchParams.get("loading") === "async") return false;
    return true;
  } catch {
    return false;
  }
}

function isStaleMapsRuntime() {
  return Boolean(window.google?.maps?.visualization?.HeatmapLayer);
}

async function waitForGoogleMapsReady(timeoutMs = 20000) {
  const start = Date.now();
  while (!window.google?.maps) {
    if (Date.now() - start > timeoutMs) {
      throw new Error("Timed out waiting for Google Maps JavaScript API");
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

async function waitForMapConstructor(timeoutMs = 20000) {
  const start = Date.now();
  while (typeof window.google?.maps?.Map !== "function") {
    if (Date.now() - start > timeoutMs) {
      throw new Error("Timed out waiting for google.maps.Map");
    }
    await new Promise((resolve) => setTimeout(resolve, 40));
  }
}

async function loadGoogleMaps(key) {
  if (!key) throw new Error("Missing Google Maps API key");

  for (const s of getGoogleMapsApiScripts()) {
    if (mapsScriptSrcIsCompatible(s.src) && !window.google?.maps) {
      s.remove();
    }
  }

  let scripts = getGoogleMapsApiScripts();
  const hasCompatibleScript = scripts.some((s) => mapsScriptSrcIsCompatible(s.src));

  if (window.google?.maps && hasCompatibleScript && !isStaleMapsRuntime()) {
    try {
      await waitForMapConstructor();
      return window.google;
    } catch {
      /* fall through to reinject / repair */
    }
  }

  for (const s of scripts) {
    if (!mapsScriptSrcIsCompatible(s.src)) {
      s.remove();
    }
  }

  if (isStaleMapsRuntime()) {
    try {
      delete window.google;
    } catch {
      window.google = undefined;
    }
  }

  if (!getGoogleMapsApiScripts().some((s) => mapsScriptSrcIsCompatible(s.src))) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const params = new URLSearchParams({
        key,
        v: "weekly"
      });
      script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Google Maps script"));
      document.head.appendChild(script);
    });
  }

  await waitForGoogleMapsReady();
  await waitForMapConstructor();

  return window.google;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort();
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
    ...(event.type || []),
    ...(event.format || []),
    ...(event.tracks || []),
    ...(event.targetGroups || []),
    ...(event.admission || []),
    ...(event.registrationType || []),
    ...(event.accessibility || [])
  ]
    .filter(Boolean)
    .join(" ");
}

function getGoogleMapsUrl(event) {
  const hasGeo = Number.isFinite(event?.geo?.lat) && Number.isFinite(event?.geo?.lng);
  const query = hasGeo
    ? `${event.geo.lat},${event.geo.lng} (${event.location || event.title || "Event location"})`
    : event?.location || event?.title;

  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function geoGroupKey(event) {
  return `${event.geo.lat.toFixed(5)}::${event.geo.lng.toFixed(5)}`;
}

/** Same venue often appears with different spelling in source data; pick a stable label for the pin heading. */
function pickRepresentativeLocation(events) {
  const counts = new NativeMap();
  for (const e of events) {
    const loc = e.location || "";
    counts.set(loc, (counts.get(loc) || 0) + 1);
  }
  let best = "";
  let bestCount = 0;
  for (const [loc, c] of counts) {
    if (c > bestCount || (c === bestCount && loc.length > best.length)) {
      best = loc;
      bestCount = c;
    }
  }
  return best || events[0]?.location || "";
}

export default function MapApp({ initialEvents }) {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEventUids, setSelectedEventUids] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mapState, setMapState] = useState({ map: null, markers: [], initialized: false });
  const markersRef = useRef([]);

  const filters = useMemo(() => {
    const dates = unique(events.map((event) => event.date));
    const types = unique(events.flatMap((event) => event.type || []));
    const formats = unique(events.flatMap((event) => event.format || []));
    return { dates, types, formats };
  }, [events]);

  const filteredEvents = useMemo(() => {
    const query = searchText.toLowerCase().trim();

    return events.filter((event) => {
      if (!event.geo) return false;
      if (selectedDate !== "all" && event.date !== selectedDate) return false;
      if (selectedType !== "all" && !(event.type || []).includes(selectedType)) return false;
      if (selectedFormat !== "all" && !(event.format || []).includes(selectedFormat)) return false;
      if (!query) return true;

      const haystack = getSearchableText(event).toLowerCase();

      return haystack.includes(query);
    });
  }, [events, selectedDate, selectedType, selectedFormat, searchText]);

  const groupedByLocation = useMemo(() => {
    const grouped = new NativeMap();
    for (const event of filteredEvents) {
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
    return [...grouped.values()].map((group) => ({
      ...group,
      location: pickRepresentativeLocation(group.events)
    }));
  }, [filteredEvents]);

  const selectedLocationData = useMemo(() => {
    if (!selectedLocation || selectedEventUids.length === 0) return null;

    const locationEvents = filteredEvents.filter((event) => selectedEventUids.includes(event.uid));
    if (locationEvents.length === 0) return null;

    return {
      key: selectedLocation,
      location: pickRepresentativeLocation(locationEvents),
      events: locationEvents
    };
  }, [filteredEvents, selectedEventUids, selectedLocation]);

  useEffect(() => {
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
        for (const [k, v] of Object.entries(lib)) {
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
        setMapState({ map, markers: [], initialized: true });
      }
    }

    initMap().catch(console.error);

    return () => {
      mounted = false;
    };
  }, [mapState.initialized]);

  useEffect(() => {
    if (!mapState.map || !window.google?.maps) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const markers = groupedByLocation.map((group) => {
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

      marker.addListener("click", () => {
        setSelectedLocation(group.key);
        setSelectedEventUids(group.events.map((event) => event.uid));
      });

      return marker;
    });

    markersRef.current = markers;

    if (markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      groupedByLocation.forEach((group) => bounds.extend(group.geo));
      mapState.map.fitBounds(bounds, 70);
    }

    setMapState((prev) => ({ ...prev, markers }));

    if (selectedLocation && !groupedByLocation.find((group) => group.key === selectedLocation)) {
      setSelectedLocation(null);
      setSelectedEventUids([]);
    }

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [groupedByLocation, mapState.map, filteredEvents]);

  async function refreshData() {
    setIsRefreshing(true);
    try {
      await fetch("/api/scrape", { method: "POST" });
      const res = await fetch("/api/events");
      const payload = await res.json();
      setEvents(payload.events || []);
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.sidebar}>
        <div className={styles.brandWrap}>
          <div className={styles.logo}>V↑</div>
          <div>
            <h1>ViennaUP Live Map</h1>
            <p>unofficial map guide to ViennaUp 2026 events</p>
          </div>
        </div>

        <div className={styles.filters}>
          <label>
            Day
            <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
              <option value="all">All days</option>
              {filters.dates.map((date) => (
                <option value={date} key={date}>
                  {toDateLabel(date)} ({date})
                </option>
              ))}
            </select>
          </label>

          <label>
            Event type
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="all">All types</option>
              {filters.types.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label>
            Format
            <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
              <option value="all">All formats</option>
              {filters.formats.map((format) => (
                <option value={format} key={format}>
                  {format}
                </option>
              ))}
            </select>
          </label>

          <label>
            Search
            <input
              type="text"
              placeholder="Title, host, keyword..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>

          <button type="button" onClick={refreshData} disabled={isRefreshing}>
            {isRefreshing ? "Refreshing data..." : "Re-scrape events"}
          </button>
        </div>

        <div className={styles.resultMeta}>
          <strong>{filteredEvents.length}</strong> filtered events across <strong>{groupedByLocation.length}</strong> locations
        </div>

        <div className={styles.listSection}>
          {!selectedLocationData ? (
            <p className={styles.hint}>Click a map marker to list events at that location (with active filters).</p>
          ) : (
            <>
              <h2>{selectedLocationData.location}</h2>
              <p>{selectedLocationData.events.length} event(s)</p>
              <ul className={styles.eventList}>
                {selectedLocationData.events.map((event) => {
                  const googleMapsUrl = getGoogleMapsUrl(event);
                  return (
                    <li key={event.uid}>
                      <h3>{event.title}</h3>
                      <p>
                        {toDateLabel(event.date)} | {toTimeRange(event.starttime, event.endtime)}
                      </p>
                      <p>{event.companyName}</p>
                      <div className={styles.links}>
                        {event.website ? (
                          <a href={event.website} target="_blank" rel="noreferrer">
                            Event page
                          </a>
                        ) : null}
                        {event.ticketUrl ? (
                          <a href={event.ticketUrl} target="_blank" rel="noreferrer">
                            Tickets
                          </a>
                        ) : null}
                        {googleMapsUrl ? (
                          <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                            Google Maps
                          </a>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className={styles.mapSection}>
        <div id="viennaup-map" className={styles.map} />
      </section>

      <footer className={styles.footer}>
        <p>
          Created with 💛 in Vienna by Matthias Grabner
          <br />
          Matthias Grabner e.U -{" "}
          <a href="mailto:office@grabner.tech">office@grabner.tech</a>
          <br />
          ATU66965000
        </p>
      </footer>
    </main>
  );
}
