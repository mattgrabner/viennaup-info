---
name: viennaup-events
description: Answer questions about the ViennaUP 2026 programme using the bundled reference files. Use for schedules, recommendations, venues, and event lookups.
version: 1.0.0
license: MIT
---

# ViennaUP Events

Use this skill for questions about ViennaUP 2026.

## How to use this bundle

1. Start with `references/programme-overview.md` to learn the valid dates,
   tracks, formats, and target groups.
2. Read `references/event-catalog.md` for exact event facts and URLs.
3. Use `references/recommendation-guide.md` when the user wants a shortlist,
   itinerary, or persona-based recommendations.
4. Use `references/venues.md` for location-specific questions.
5. Answer from the bundle contents and avoid inventing unsupported details.

## Output rules

- Include title, date, time, venue, and a URL when available.
- If multiple events fit, rank them briefly and explain why.
- If the bundle is insufficient, say so directly.
