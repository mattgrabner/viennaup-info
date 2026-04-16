import {
  loadEvents,
  filterEvents,
  findEvent,
  eventsNear,
  resolveLocation,
  recommendEvents,
  summarizeEvent,
  programmeOverview
} from "@/lib/events-query";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function parseList(searchParams, key) {
  return searchParams
    .getAll(key)
    .flatMap((value) => String(value).split(","))
    .map((value) => value.trim())
    .filter(Boolean);
}

function parseBoolean(searchParams, key, defaultValue = false) {
  const value = searchParams.get(key);
  if (value == null) return defaultValue;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function parseNumber(searchParams, key) {
  const value = searchParams.get(key);
  if (value == null || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function badRequest(message) {
  return Response.json({ error: message }, { status: 400 });
}

function eventsFilters(searchParams) {
  return {
    query: searchParams.get("query") || undefined,
    date: searchParams.get("date") || undefined,
    dateFrom: searchParams.get("dateFrom") || undefined,
    dateTo: searchParams.get("dateTo") || undefined,
    formats: parseList(searchParams, "formats"),
    tracks: parseList(searchParams, "tracks"),
    targetGroups: parseList(searchParams, "targetGroups"),
    types: parseList(searchParams, "types"),
    admission: parseList(searchParams, "admission"),
    location: searchParams.get("location") || undefined,
    matchAllTags: parseBoolean(searchParams, "matchAllTags", false)
  };
}

export async function GET(request, { params }) {
  const { action } = await params;
  const { searchParams } = new URL(request.url);

  if (action === "overview") {
    const events = await loadEvents();
    return Response.json(programmeOverview(events));
  }

  if (action === "events") {
    const all = await loadEvents();
    const limit = parseNumber(searchParams, "limit") ?? 25;
    const full = parseBoolean(searchParams, "full", false);
    const filtered = filterEvents(all, eventsFilters(searchParams));
    const trimmed = filtered.slice(0, Math.max(1, Math.min(100, Math.trunc(limit))));

    return Response.json({
      totalMatching: filtered.length,
      returned: trimmed.length,
      events: trimmed.map((event) => summarizeEvent(event, { full }))
    });
  }

  if (action === "event") {
    const slug = searchParams.get("slug") || undefined;
    const uid = parseNumber(searchParams, "uid");
    if (!slug && uid == null) {
      return badRequest("Provide either `slug` or `uid`.");
    }

    const events = await loadEvents();
    const event = findEvent(events, { slug, uid });
    if (!event) {
      return Response.json({ error: `No event found for ${slug ?? uid}` }, { status: 404 });
    }

    return Response.json(summarizeEvent(event, { full: true }));
  }

  if (action === "date") {
    const date = searchParams.get("date");
    if (!date) return badRequest("Provide `date` in YYYY-MM-DD format.");

    const events = await loadEvents();
    const onDay = filterEvents(events, { date });
    const full = parseBoolean(searchParams, "full", false);

    return Response.json({
      date,
      count: onDay.length,
      events: onDay.map((event) => summarizeEvent(event, { full }))
    });
  }

  if (action === "near") {
    const lat = parseNumber(searchParams, "lat");
    const lng = parseNumber(searchParams, "lng");
    const address = searchParams.get("address") || undefined;
    const radiusKm = parseNumber(searchParams, "radiusKm") ?? 1.5;
    const date = searchParams.get("date") || undefined;
    const limit = parseNumber(searchParams, "limit") ?? 20;
    const excludeSlug = searchParams.get("excludeSlug") || undefined;
    const excludeUid = parseNumber(searchParams, "excludeUid");

    const origin = await resolveLocation({ lat, lng, address });
    if (!origin) {
      return badRequest(
        "Could not resolve the location. Provide lat/lng or a known Vienna address."
      );
    }

    const events = await loadEvents();
    const filtered = date ? filterEvents(events, { date }) : events;
    const near = eventsNear(
      filtered,
      origin.lat,
      origin.lng,
      Math.max(0.1, Math.min(50, radiusKm)),
      { excludeSlug, excludeUid }
    ).slice(0, Math.max(1, Math.min(50, Math.trunc(limit))));

    return Response.json({
      origin,
      radiusKm,
      date: date || null,
      count: near.length,
      events: near.map((event) => summarizeEvent(event))
    });
  }

  if (action === "recommend") {
    const events = await loadEvents();
    const interests = parseList(searchParams, "interests");
    const tracks = parseList(searchParams, "tracks");
    const formats = parseList(searchParams, "formats");
    const targetGroups = parseList(searchParams, "targetGroups");
    const date = searchParams.get("date") || undefined;
    const limit = parseNumber(searchParams, "limit") ?? 8;

    const recommendations = recommendEvents(
      events,
      { interests, tracks, formats, targetGroups, date },
      Math.max(1, Math.min(25, Math.trunc(limit)))
    );

    return Response.json({
      criteria: { interests, tracks, formats, targetGroups, date: date || null },
      recommendations: recommendations.map((event) => summarizeEvent(event))
    });
  }

  if (action === "venues") {
    const events = await loadEvents();
    const byVenue = new Map();

    for (const event of events) {
      const key = event.location || "Unknown";
      if (!byVenue.has(key)) {
        byVenue.set(key, {
          location: key,
          count: 0,
          coordinates: event.geo ? { lat: event.geo.lat, lng: event.geo.lng } : null,
          formattedAddress: event.geo?.formattedAddress || null,
          eventSlugs: []
        });
      }

      const entry = byVenue.get(key);
      entry.count += 1;
      entry.eventSlugs.push(event.slug);
    }

    const venues = [...byVenue.values()].sort((a, b) => b.count - a.count);
    return Response.json({ count: venues.length, venues });
  }

  return Response.json(
    {
      error: `Unknown OpenClaw action: ${action}`,
      validActions: ["overview", "events", "event", "date", "near", "recommend", "venues"]
    },
    { status: 404 }
  );
}
