# ViennaUP Events Skill Bundle for Claude

This bundle is generated from the normalized programme data in `data/events.json`.

## Contents

- `SKILL.md` - skill metadata and activation instructions
- `references/programme-overview.md` - dates, tracks, formats, counts
- `references/event-catalog.md` - full event catalogue
- `references/recommendation-guide.md` - recommendation heuristics
- `references/venues.md` - distinct venues and coordinates

## Live MCP

The canonical live integration remains streamable HTTP MCP:

```
https://<your-deployment>.vercel.app/api/mcp
```

Use a stable production domain here, not a disposable preview deployment URL.
