# ViennaUP Maps

Interactive local website that scrapes ViennaUP programme events and shows them on Google Maps with filters and a side panel.

## Features

- Scrapes all programme events from `https://viennaup.com/?type=1452982642`
- Geocodes event locations via Google Geocoding API and caches coordinates
- Responsive sidepanel + map UI for desktop and mobile
- Filters by day, event type, format, plus search
- Clicking a location marker shows all filtered events at that location
- Backend re-scrape endpoint for refreshing event data

## Setup

1. Ensure `.env` contains:

```bash
GOOGLE_MAPS_API_KEY=your_key
```

2. Install and run:

```bash
npm install
npm run dev
```

3. Open `http://localhost:3000`

4. To fetch the latest programme data locally, run:

```bash
node scripts/scrape.mjs
```

This updates `data/events.json`, `data/geocode-cache.json` and `data/page-cache.json`. In production these files are refreshed automatically by the daily GitHub Actions workflow — see below.

## Automated daily refresh

Programme data is refreshed nightly by `.github/workflows/refresh-events.yml`:

- Runs every day at **22:00 UTC** (= 00:00 Vienna time during CEST, which covers the ViennaUP week). Adjust the cron expression if you want strict midnight year-round.
- Runs `node scripts/scrape.mjs`, which re-scrapes the programme endpoint, geocodes any new venues and re-fetches enriched page content.
- Commits the updated `data/*.json` files back to the default branch with `[skip ci]`, which triggers a Vercel production redeploy serving the fresh data to both the map UI and the MCP server.
- Can also be triggered manually from the Actions tab (`workflow_dispatch`).

**Required repository secret:**

- `GOOGLE_MAPS_API_KEY` — needed to geocode any brand-new addresses. Known ViennaUP venues are already in `data/geocode-cache.json`, so geocoding only runs for new ones.

## API

- `GET /api/events` - returns stored events
- `GET /api/events?refresh=1` - scrape + store then return refresh stats (local only — Vercel filesystem is read-only, use the GitHub Action for production refreshes)
- `POST /api/scrape` - trigger scrape + geocode refresh (local only, same caveat)
- `GET /api/maps-key` - returns map key for script loading
- `GET|POST /api/mcp` - MCP (Model Context Protocol) server, see below

## MCP server

The same deployment also exposes a remote MCP server at `/api/mcp` (Streamable HTTP transport). Point ChatGPT, Claude, Cursor or any other MCP-compatible client at it to ask questions like:

- "What's on at ViennaUP on May 18?"
- "Recommend three investor events about climate tech."
- "Which sessions are within 2 km of Stephansplatz?"
- "Give me the details for `startuplive26-viennaup`."

### Tools exposed

| Tool | Purpose |
| --- | --- |
| `programme_overview` | Dates, counts per day and the vocabulary (tracks, formats, target groups, venues) |
| `list_events` | Filter the programme by date range, format, track, target group, type, venue substring, free-text query |
| `search_events` | Ranked full-text search across titles, descriptions, tags and enriched page content |
| `get_event` | Full details for a single event (by `slug` or `uid`) |
| `events_on_date` | Everything happening on a given `YYYY-MM-DD`, sorted by start time |
| `events_near` | Events within a radius of `lat/lng` or a resolved address (uses cached geocoding; falls back to Google Geocoding if `GOOGLE_MAPS_API_KEY` is set) |
| `recommend_events` | Ranked recommendations from `interests`, `tracks`, `formats`, `targetGroups` and optional `date` |
| `list_venues` | Venues with event counts and coordinates |

### Connect a client

Streamable HTTP URL (works with ChatGPT custom connectors, Claude, Cursor, Windsurf, etc.):

```
https://<your-deployment>.vercel.app/api/mcp
```

Cursor / Claude Desktop config snippet:

```json
{
  "mcpServers": {
    "viennaup-events": {
      "url": "https://<your-deployment>.vercel.app/api/mcp"
    }
  }
}
```

For stdio-only clients, bridge via `mcp-remote`:

```json
{
  "mcpServers": {
    "viennaup-events": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://<your-deployment>.vercel.app/api/mcp"]
    }
  }
}
```

### Vercel deployment notes

- The MCP route is stateless and relies on the bundled `data/events.json`, so no Redis or KV store is required.
- Enable **Fluid compute** on the Vercel project for better cold-start behavior with MCP.
- `GOOGLE_MAPS_API_KEY` is optional for MCP — `events_near` will still work for the 52 ViennaUP venues (their geocodes live in `data/geocode-cache.json`); the key is only needed for ad-hoc addresses outside the cache.
- Re-run the scrape (via `/api/events?refresh=1` or the UI button) after programme updates and commit `data/events.json` so the MCP server serves the latest content.

## Data files

- `data/events.json` - normalized events used by frontend and MCP server
- `data/geocode-cache.json` - address-to-coordinates cache used for `events_near`
