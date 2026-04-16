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

/**
 * Load the modern async Google Maps bootstrap. Exposes `google.maps.importLibrary`, which callers
 * must use to pull in specific libraries (e.g. `maps`, `marker`).
 *
 * With `loading=async`, the plain `script.onload` event fires BEFORE `google.maps.importLibrary`
 * is attached, so we use the `callback` query parameter (the documented async-ready signal) and
 * cache the promise on `window` to survive React Strict Mode's double-invoked effects in dev.
 */
function loadGoogleMaps(key) {
  if (!key) throw new Error("Missing Google Maps API key");

  if (window.google?.maps?.importLibrary) {
    return Promise.resolve(window.google);
  }

  if (window.__viennaUpGmapsPromise) {
    return window.__viennaUpGmapsPromise;
  }

  window.__viennaUpGmapsPromise = new Promise((resolve, reject) => {
    window.__viennaUpGmapsReady = () => {
      resolve(window.google);
    };

    const existing = document.querySelector('script[data-gmaps-loader="1"]');
    if (existing) {
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google Maps script")),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.dataset.gmapsLoader = "1";
    const params = new URLSearchParams({
      key,
      v: "weekly",
      loading: "async",
      libraries: "maps,marker",
      callback: "__viennaUpGmapsReady"
    });
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Failed to load Google Maps script"));
    document.head.appendChild(script);
  });

  return window.__viennaUpGmapsPromise;
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
  const events = initialEvents;
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEventUid, setSelectedEventUid] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [mapState, setMapState] = useState({ map: null, markers: [], initialized: false });
  const markersRef = useRef([]);
  const eventRefs = useRef(new NativeMap());

  const filters = useMemo(() => {
    const dates = unique(events.map((event) => event.date));
    const types = unique(events.flatMap((event) => event.type || []));
    const formats = unique(events.flatMap((event) => event.format || []));
    return { dates, types, formats };
  }, [events]);

  const filteredEvents = useMemo(() => {
    const query = searchText.toLowerCase().trim();

    const matches = events.filter((event) => {
      if (!event.geo) return false;
      if (selectedDate !== "all" && event.date !== selectedDate) return false;
      if (selectedType !== "all" && !(event.type || []).includes(selectedType)) return false;
      if (selectedFormat !== "all" && !(event.format || []).includes(selectedFormat)) return false;
      if (!query) return true;

      const haystack = getSearchableText(event).toLowerCase();

      return haystack.includes(query);
    });

    return matches.slice().sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return (a.starttime || "").localeCompare(b.starttime || "");
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

  const selectedEvent = useMemo(() => {
    if (!selectedEventUid) return null;
    return filteredEvents.find((event) => event.uid === selectedEventUid) || null;
  }, [filteredEvents, selectedEventUid]);

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

      const { Map: MapCtor } = await window.google.maps.importLibrary("maps");
      // Preload the marker library too so the later effect can instantiate AdvancedMarkerElement without a race.
      await window.google.maps.importLibrary("marker");

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
        // AdvancedMarkerElement requires a mapId; DEMO_MAP_ID keeps local dev working without a real one.
        mapOptions.mapId = "DEMO_MAP_ID";
        mapOptions.styles = styleRules;
      }

      const map = new MapCtor(el, mapOptions);

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
    if (!mapState.map || !window.google?.maps?.importLibrary) return;
    let cancelled = false;

    async function renderMarkers() {
      const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker");
      if (cancelled) return;

      markersRef.current.forEach((marker) => {
        marker.map = null;
      });
      markersRef.current = [];

      const markers = groupedByLocation.map((group) => {
        const pin = new PinElement({
          background: "#47b5e5",
          borderColor: "#f5e100",
          glyphColor: "#0c0c1e",
          glyph: String(group.events.length),
          scale: 1.2
        });

        const marker = new AdvancedMarkerElement({
          position: group.geo,
          map: mapState.map,
          title: `${group.location} (${group.events.length})`,
          content: pin.element,
          gmpClickable: true
        });

        marker.addListener("click", () => {
          setSelectedLocation(group.key);
          setSelectedEventUid(group.events[0]?.uid ?? null);
        });

        return marker;
      });

      markersRef.current = markers;

      if (markers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        groupedByLocation.forEach((group) => bounds.extend(group.geo));

        const mapDiv = mapState.map.getDiv();
        const runFit = () => {
          mapState.map.fitBounds(bounds, 70);
        };

        if (mapDiv && mapDiv.offsetWidth > 0 && mapDiv.offsetHeight > 0) {
          runFit();
        } else {
          window.google.maps.event.addListenerOnce(mapState.map, "idle", runFit);
        }
      }

      setMapState((prev) => ({ ...prev, markers }));

      if (selectedLocation && !groupedByLocation.find((group) => group.key === selectedLocation)) {
        setSelectedLocation(null);
      }
      if (selectedEventUid && !filteredEvents.find((event) => event.uid === selectedEventUid)) {
        setSelectedEventUid(null);
      }
    }

    renderMarkers().catch(console.error);

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => {
        marker.map = null;
      });
      markersRef.current = [];
    };
  }, [groupedByLocation, mapState.map, filteredEvents]);

  useEffect(() => {
    if (!selectedEvent) return;
    const node = eventRefs.current.get(selectedEvent.uid);
    if (node && typeof node.scrollIntoView === "function") {
      node.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedEvent]);

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
        </div>

        <div className={styles.resultMeta}>
          <strong>{filteredEvents.length}</strong> filtered events across <strong>{groupedByLocation.length}</strong> locations
        </div>

        <div className={styles.listSection}>
          {filteredEvents.length === 0 ? (
            <p className={styles.hint}>No events match the current filters.</p>
          ) : (
            <ul className={styles.eventList}>
              {filteredEvents.map((event) => {
                const googleMapsUrl = getGoogleMapsUrl(event);
                const isSelected = event.uid === selectedEventUid;
                const isInSelectedLocation =
                  selectedLocation && geoGroupKey(event) === selectedLocation;
                const itemClass = [
                  styles.eventItem,
                  isSelected ? styles.eventItemActive : "",
                  !isSelected && isInSelectedLocation ? styles.eventItemLocationActive : ""
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <li
                    key={event.uid}
                    ref={(node) => {
                      if (node) eventRefs.current.set(event.uid, node);
                      else eventRefs.current.delete(event.uid);
                    }}
                    className={itemClass}
                    onClick={() => {
                      setSelectedLocation(geoGroupKey(event));
                      setSelectedEventUid(event.uid);
                    }}
                  >
                    <h3>{event.title}</h3>
                    <p>
                      {toDateLabel(event.date)} | {toTimeRange(event.starttime, event.endtime)}
                    </p>
                    <p>{event.location}</p>
                    <p>{event.companyName}</p>
                    <div className={styles.links}>
                      {event.website ? (
                        <a href={event.website} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                          Event page
                        </a>
                      ) : null}
                      {event.ticketUrl ? (
                        <a href={event.ticketUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                          Tickets
                        </a>
                      ) : null}
                      {googleMapsUrl ? (
                        <a href={googleMapsUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                          Google Maps
                        </a>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
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
