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

4. In the UI, click **Re-scrape events** to fetch and geocode the latest programme data.

## API

- `GET /api/events` - returns stored events
- `GET /api/events?refresh=1` - scrape + store then return refresh stats
- `POST /api/scrape` - trigger scrape + geocode refresh
- `GET /api/maps-key` - returns map key for script loading

## Data files

- `data/events.json` - normalized events used by frontend
- `data/geocode-cache.json` - address-to-coordinates cache
