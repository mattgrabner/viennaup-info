import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
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

function jsonPayload(data) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2)
      }
    ]
  };
}

function errorPayload(message) {
  return {
    isError: true,
    content: [{ type: "text", text: message }]
  };
}

const TAG_ENUM_HINT =
  "Values are case-insensitive and must match the programme vocabulary. Use `programme_overview` to list valid values.";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "programme_overview",
      "High-level overview of the ViennaUP programme: dates, number of events per day, plus the full vocabulary for formats, tracks, target groups, types, admission categories and venues. Use this first to understand the filter values available.",
      {},
      async () => {
        const events = await loadEvents();
        return jsonPayload(programmeOverview(events));
      }
    );

    server.tool(
      "list_events",
      "List ViennaUP events with optional filters. All filters are AND-combined; values inside a single filter (e.g. multiple tracks) are OR-combined unless `matchAllTags` is true.",
      {
        query: z.string().optional().describe("Free text query matched against title, description, organizer, tags and enriched content"),
        date: z.string().optional().describe("Exact date YYYY-MM-DD (e.g. 2026-05-18)"),
        dateFrom: z.string().optional().describe("Inclusive start date YYYY-MM-DD"),
        dateTo: z.string().optional().describe("Inclusive end date YYYY-MM-DD"),
        formats: z.array(z.string()).optional().describe(`Formats like Workshop, Conference, Hackathon/bootcamp, Pitch competition, Panel discussion, Matchmaking, Meet-the-experts session, Fair/showcase/tech demo, Networking & gathering only. ${TAG_ENUM_HINT}`),
        tracks: z.array(z.string()).optional().describe(`Tracks like WarmUP, Founders, Tech, Impact, Investment, Exploration. ${TAG_ENUM_HINT}`),
        targetGroups: z.array(z.string()).optional().describe(`Target groups like Startups, Investors, Creatives, Talents, Corporates, Ecosystem representatives. ${TAG_ENUM_HINT}`),
        types: z.array(z.string()).optional().describe("Event types, typically Onsite or Hybrid"),
        admission: z.array(z.string()).optional().describe("Admission categories"),
        location: z.string().optional().describe("Case-insensitive substring match against the venue address"),
        matchAllTags: z.boolean().optional().describe("If true, an event must match ALL provided tags within a filter, not just one"),
        limit: z.number().int().min(1).max(100).optional().describe("Max events to return (default 25)"),
        full: z.boolean().optional().describe("If true, include full descriptions instead of a short summary")
      },
      async (args) => {
        const all = await loadEvents();
        const filtered = filterEvents(all, args);
        const limit = args.limit ?? 25;
        const trimmed = filtered.slice(0, limit);
        return jsonPayload({
          totalMatching: filtered.length,
          returned: trimmed.length,
          events: trimmed.map((e) => summarizeEvent(e, { full: !!args.full }))
        });
      }
    );

    server.tool(
      "search_events",
      "Broad full-text search across the ViennaUP programme. Matches title, description, organizer, format, track, target group and enriched page text using fuzzy term matching, so it is better for discovery than for exact title lookups.",
      {
        query: z.string().min(1).describe("What to look for, e.g. 'AI' or 'sustainability pitch'. This is fuzzy term matching, not exact title matching."),
        limit: z.number().int().min(1).max(50).optional().describe("Max events to return (default 15)"),
        full: z.boolean().optional().describe("Include full descriptions")
      },
      async ({ query, limit = 15, full = false }) => {
        const all = await loadEvents();
        const matches = filterEvents(all, { query });
        return jsonPayload({
          query,
          totalMatching: matches.length,
          events: matches.slice(0, limit).map((e) => summarizeEvent(e, { full }))
        });
      }
    );

    server.tool(
      "get_event",
      "Return the full details of a single event, looked up by slug or uid.",
      {
        slug: z.string().optional().describe("Event slug, e.g. startuplive26-viennaup"),
        uid: z.number().int().optional().describe("Numeric event UID")
      },
      async ({ slug, uid }) => {
        if (!slug && uid == null) {
          return errorPayload("Provide either `slug` or `uid`.");
        }
        const events = await loadEvents();
        const event = findEvent(events, { slug, uid });
        if (!event) return errorPayload(`No event found for ${slug ?? uid}`);
        return jsonPayload(summarizeEvent(event, { full: true }));
      }
    );

    server.tool(
      "events_on_date",
      "List all events happening on a specific date, sorted by start time.",
      {
        date: z.string().describe("Date in YYYY-MM-DD format, e.g. 2026-05-18"),
        full: z.boolean().optional().describe("Include full descriptions")
      },
      async ({ date, full = false }) => {
        const events = await loadEvents();
        const onDay = filterEvents(events, { date });
        return jsonPayload({
          date,
          count: onDay.length,
          events: onDay.map((e) => summarizeEvent(e, { full }))
        });
      }
    );

    server.tool(
      "events_near",
      "Find events within a given radius of coordinates or an address. Useful for questions like 'what's close to X' or 'what's near my hotel'. Existing ViennaUP venues are geocoded from the cache; arbitrary addresses fall back to Google Geocoding (requires GOOGLE_MAPS_API_KEY). Use `excludeSlug` or `excludeUid` when you want nearby alternatives instead of including the origin event itself.",
      {
        lat: z.number().optional().describe("Latitude in decimal degrees"),
        lng: z.number().optional().describe("Longitude in decimal degrees"),
        address: z.string().optional().describe("Address or venue name to resolve, e.g. 'Stephansplatz, Vienna'"),
        radiusKm: z.number().positive().max(50).optional().describe("Search radius in kilometers (default 1.5)"),
        date: z.string().optional().describe("Restrict to a single date YYYY-MM-DD"),
        limit: z.number().int().min(1).max(50).optional().describe("Max events to return (default 20)"),
        excludeSlug: z.string().optional().describe("Event slug to exclude from the results, useful when asking for events near a known event"),
        excludeUid: z.number().int().optional().describe("Numeric event UID to exclude from the results")
      },
      async ({ lat, lng, address, radiusKm = 1.5, date, limit = 20, excludeSlug, excludeUid }) => {
        const location = await resolveLocation({ lat, lng, address });
        if (!location) {
          return errorPayload(
            "Could not resolve the location. Provide lat/lng or a known Vienna address (GOOGLE_MAPS_API_KEY enables arbitrary-address geocoding)."
          );
        }
        const events = await loadEvents();
        const filtered = date ? filterEvents(events, { date }) : events;
        const near = eventsNear(filtered, location.lat, location.lng, radiusKm, {
          excludeSlug,
          excludeUid
        }).slice(0, limit);
        return jsonPayload({
          origin: location,
          radiusKm,
          date: date || null,
          count: near.length,
          events: near.map((e) => summarizeEvent(e))
        });
      }
    );

    server.tool(
      "recommend_events",
      "Recommend ViennaUP events based on a visitor's interests, preferred tracks, formats and target groups. Returns events ranked by a simple match score.",
      {
        interests: z.array(z.string()).optional().describe("Free-form interest keywords, e.g. ['climate tech', 'biotech', 'AI agents']"),
        tracks: z.array(z.string()).optional().describe("Preferred tracks, e.g. ['Impact', 'Investment']"),
        formats: z.array(z.string()).optional().describe("Preferred formats, e.g. ['Workshop', 'Pitch competition']"),
        targetGroups: z.array(z.string()).optional().describe("Visitor profile, e.g. ['Investors'] or ['Startups']"),
        date: z.string().optional().describe("Restrict to a single date YYYY-MM-DD"),
        limit: z.number().int().min(1).max(25).optional().describe("Max recommendations (default 8)")
      },
      async ({ interests, tracks, formats, targetGroups, date, limit = 8 }) => {
        const events = await loadEvents();
        const recs = recommendEvents(
          events,
          { interests, tracks, formats, targetGroups, date },
          limit
        );
        if (recs.length === 0) {
          return jsonPayload({
            recommendations: [],
            note:
              "No events scored above zero. Try broader interests or call `programme_overview` to see the available tracks, formats and target groups."
          });
        }
        return jsonPayload({
          criteria: { interests, tracks, formats, targetGroups, date },
          recommendations: recs.map((e) => summarizeEvent(e))
        });
      }
    );

    server.tool(
      "list_venues",
      "List the distinct ViennaUP venues with how many events each hosts and their coordinates (when available).",
      {},
      async () => {
        const events = await loadEvents();
        const byVenue = new Map();
        for (const e of events) {
          const key = e.location || "Unknown";
          if (!byVenue.has(key)) {
            byVenue.set(key, {
              location: key,
              count: 0,
              coordinates: e.geo ? { lat: e.geo.lat, lng: e.geo.lng } : null,
              formattedAddress: e.geo?.formattedAddress || null,
              eventSlugs: []
            });
          }
          const entry = byVenue.get(key);
          entry.count += 1;
          entry.eventSlugs.push(e.slug);
        }
        const venues = [...byVenue.values()].sort((a, b) => b.count - a.count);
        return jsonPayload({ count: venues.length, venues });
      }
    );
  },
  {
    serverInfo: {
      name: "viennaup-events",
      version: "0.1.0"
    }
  },
  {
    basePath: "/api",
    maxDuration: 60,
    verboseLogs: process.env.NODE_ENV !== "production"
  }
);

export { handler as GET, handler as POST, handler as DELETE };
