# ViennaUP Maps

Unofficial interactive map of [ViennaUP](https://viennaup.com) programme events: scraped data, Google Maps markers, filters, and a side panel. The same app hosts a remote **MCP** server so assistants can answer questions about the programme.

**Stack:** Next.js 16, React 19, Google Maps (advanced markers + optional cloud Map ID).

## Features

- Scrapes the public programme JSON from `https://viennaup.com/?type=1452982642`
- Geocodes venues via the Google Geocoding API (with a local cache in `data/geocode-cache.json`)
- Enriches search from linked event / ticket pages (cached in `data/page-cache.json`)
- Responsive sidebar + map for desktop and mobile
- Filters by day, event type, format, and free-text search
- Clicking a marker focuses events at that pin
- **Daily data refresh** via GitHub Actions (commits updated `data/*.json` and `data/skills/*.md`; Vercel redeploys on push)
- **MCP** at `/api/mcp` for ChatGPT, Claude, Cursor, etc.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GOOGLE_MAPS_API_KEY` | Yes for map + geocoding | Maps JavaScript API, Geocoding API, and server-side geocode during scrape |
| `GOOGLE_MAPS_MAP_ID` | No | If set, the map uses [cloud-based map styles](https://developers.google.com/maps/documentation/javascript/map-ids) instead of bundled `viennamapstyle.json` |

The maps key route also reads `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` / `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID` if the non-public names are unset (handy for some hosting setups). Prefer server-only names when possible.

## Setup

1. Create `.env` in the project root (it is gitignored). Minimal contents:

```bash
GOOGLE_MAPS_API_KEY=your_key
# optional:
# GOOGLE_MAPS_MAP_ID=your_map_id
```

2. Install and run:

```bash
npm install
npm run dev
```

3. Open `http://localhost:3000`

4. Refresh programme data locally (writes under `data/`):

```bash
node scripts/scrape.mjs
```

In production, data is updated by the **Automated daily refresh** workflow below—not by the UI.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |
| `node scripts/scrape.mjs` | Scrape, geocode, enrich -> update `data/*.json` and `data/skills/*.md` |

## Repository notes

- **`node_modules/`** and **`.next/`** are gitignored. Do not commit `.next`; Vercel (and CI) run `next build` themselves.
- **`data/events.json`** (and related caches) are committed so the site and MCP work without a database. The scheduled workflow also regenerates portable markdown skill files under `data/skills/`.

## Automated daily refresh

`.github/workflows/refresh-events.yml`:

- Cron: **22:00 UTC** (midnight in Vienna during **CEST**). Tweak the cron in the workflow if you want a different wall-clock time in winter (**CET**).
- Runs `npm ci`, then `node scripts/scrape.mjs`.
- Commits changes to `data/events.json`, `data/geocode-cache.json`, `data/page-cache.json`, and `data/skills/*.md` with message `chore(data): refresh ViennaUP events [skip ci]` when there are diffs (`[skip ci]` avoids re-triggering heavy GitHub workflows on that commit; Vercel still deploys from the push if connected to the branch).
- **Manual run:** GitHub → Actions → *Refresh ViennaUP events* → *Run workflow*.

**Repository secret (required for new addresses):**

- `GOOGLE_MAPS_API_KEY` — same capability as local scrape; new venues get geocoded and merged into the cache.

## API

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/api/events` | Stored events JSON |
| `GET` | `/api/events?refresh=1` | Scrape + store, then stats (**local / writable filesystem only**; on Vercel the filesystem is read-only—use the GitHub Action) |
| `POST` | `/api/scrape` | Same as refresh (**local only** on Vercel) |
| `GET` | `/api/maps-key` | `{ key, mapId }` for the browser loader |
| `GET` | `/api/map-style` | Map style JSON rules (used when no Map ID) |
| `GET`, `POST`, `DELETE` | `/api/mcp` | MCP Streamable HTTP endpoint |
| `GET` | `/api/skill-file/claude` | Download Claude-oriented markdown skill snapshot |
| `GET` | `/api/skill-file/openclaw` | Download OpenClaw-oriented markdown skill snapshot |
| `GET` | `/api/openclaw` | OpenClaw-friendly API index + config example |
| `GET` | `/api/openclaw/:action` | JSON endpoints for the OpenClaw skill (`overview`, `events`, `event`, `date`, `near`, `recommend`, `venues`) |

## MCP server

Remote MCP at **`/api/mcp`** (Streamable HTTP). Example questions:

- What is on at ViennaUP on a given date?
- Recommend events for investors / founders / a topic.
- What is near a coordinate or address?
- Details for a specific event slug.

### Tools

| Tool | Purpose |
| --- | --- |
| `programme_overview` | Dates, counts per day, vocabulary (tracks, formats, venues, …) |
| `list_events` | Filter by date range, format, track, target group, type, venue substring, text |
| `search_events` | Full-text search over programme + enrichment |
| `get_event` | Full record by `slug` or `uid` |
| `events_on_date` | All events on one `YYYY-MM-DD` |
| `events_near` | Radius around `lat`/`lng` or resolved address |
| `recommend_events` | Scored picks from interests / tracks / formats / target groups |
| `list_venues` | Distinct venues with counts and coordinates |

### Client config

Replace `<your-deployment>` with your Vercel hostname.

**Streamable HTTP URL:**

```
https://<your-deployment>.vercel.app/api/mcp
```

**Cursor / Claude Code:**

```json
{
  "mcpServers": {
    "viennaup-events": {
      "url": "https://<your-deployment>.vercel.app/api/mcp"
    }
  }
}
```

**Claude Desktop:**

- Preferred: open **Settings -> Connectors** and add the remote MCP URL directly there.
- Do **not** put a remote HTTP entry with `url` or `type: "http"` into `claude_desktop_config.json`; Claude Desktop skips those as invalid.

**Claude Desktop bridge fallback** (`claude_desktop_config.json`):

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

### Vercel checklist

- Set **`GOOGLE_MAPS_API_KEY`** (and optionally **`GOOGLE_MAPS_MAP_ID`**) in the Vercel project environment.
- Enable **Fluid compute** if you want snappier cold starts (especially for MCP).
- MCP reads **`data/events.json` from the deployment bundle**—no Redis required. After ViennaUP updates the programme, rely on the **GitHub Action** (or a local scrape + PR) so a new commit redeploys with fresh JSON.
- For **`events_near`** on arbitrary addresses, the API key enables live Geocoding; cached ViennaUP venues work from `data/geocode-cache.json` alone.

## Portable skill files

If you want a static context file instead of a live MCP connection, the app also
offers downloadable markdown skill snapshots generated from the latest
`data/events.json`.

- Claude-oriented markdown: `/api/skill-file/claude`
- OpenClaw-oriented markdown: `/api/skill-file/openclaw`
- Generated repo copies: `data/skills/viennaup-events-claude.md` and `data/skills/viennaup-events-openclaw.md`

These files are snapshots, so streamable HTTP MCP at `/api/mcp` remains the
canonical live integration. The markdown downloads are best used as portable
fallback context or local skill docs.

## Data files

| File | Role |
| --- | --- |
| `data/events.json` | Normalized events for the UI and MCP |
| `data/geocode-cache.json` | Address → lat/lng (+ formatted address) |
| `data/page-cache.json` | Fetched HTML summaries for search enrichment |
| `data/skills/*.md` | Generated portable markdown skill snapshots for Claude / OpenClaw |

## Licence / attribution

Map and event data are derived from public ViennaUP sources; see website here: https://viennaup.com/
This project is not affiliated with ViennaUP. 
