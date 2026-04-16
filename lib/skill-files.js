import fs from "node:fs/promises";
import path from "node:path";
import { programmeOverview } from "./events-query.js";
import { getPublicMcpUrl } from "./public-urls.js";
import { buildZip } from "./zip.js";

const SKILL_DIR = path.join(process.cwd(), "data", "skills");
const SKILL_FOLDER = "viennaup-events";
const BUNDLE_META = {
  claude: {
    slug: "claude",
    zipName: "viennaup-events-claude-skill.zip"
  },
  openclaw: {
    slug: "openclaw",
    zipName: "viennaup-events-openclaw-skill.zip"
  }
};

function stripHtml(text) {
  return (text || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatList(items) {
  if (!Array.isArray(items) || items.length === 0) return "None";
  return items.join(", ");
}

function formatOptional(value) {
  return value ? String(value) : "None";
}

function formatCoordinates(geo) {
  if (!geo || typeof geo.lat !== "number" || typeof geo.lng !== "number") {
    return "None";
  }
  const base = `${geo.lat}, ${geo.lng}`;
  return geo.formattedAddress ? `${base} (${geo.formattedAddress})` : base;
}

function buildCountsByDate(countsByDate) {
  return Object.entries(countsByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => `- ${date}: ${count} events`)
    .join("\n");
}

function buildOverviewDoc(events, mcpUrl) {
  const overview = programmeOverview(events);

  return `# ViennaUP 2026 Programme Overview

This file is generated from \`data/events.json\`.

## Snapshot

- Total events: ${overview.totalEvents}
- Dates covered: ${formatList(overview.dates)}
- Formats: ${formatList(overview.formats)}
- Tracks: ${formatList(overview.tracks)}
- Target groups: ${formatList(overview.targetGroups)}
- Types: ${formatList(overview.types)}
- Admission labels: ${formatList(overview.admission)}
- Preferred live integration: streamable HTTP MCP
- MCP URL: ${mcpUrl}

## Event counts by date

${buildCountsByDate(overview.countsByDate)}
`;
}

function buildVenuesDoc(events) {
  const seen = new Map();
  for (const event of events) {
    if (!event.location) continue;
    const key = event.location;
    const current = seen.get(key) || { count: 0, geo: event.geo || null };
    current.count += 1;
    if (!current.geo && event.geo) current.geo = event.geo;
    seen.set(key, current);
  }

  const rows = [...seen.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([location, value], index) => `### ${index + 1}. ${location}

- Event count: ${value.count}
- Coordinates: ${formatCoordinates(value.geo)}`
    )
    .join("\n\n");

  return `# ViennaUP 2026 Venues

Distinct venues extracted from the generated event catalogue.

${rows}
`;
}

function buildEventCatalogDoc(events) {
  const eventSections = events
    .map((event, index) => {
      const description = stripHtml(event.descriptionFull);
      const sources = Array.isArray(event.enrichmentSources) && event.enrichmentSources.length
        ? event.enrichmentSources.map((url) => `  - ${url}`).join("\n")
        : "  - None";

      return `## ${index + 1}. ${event.title}

- UID: ${event.uid}
- Slug: ${formatOptional(event.slug)}
- Date: ${formatOptional(event.date)}
- Time: ${formatOptional(event.starttime)} to ${formatOptional(event.endtime)}
- Venue: ${formatOptional(event.location)}
- Organizer: ${formatOptional(event.companyName)}
- Website: ${formatOptional(event.website)}
- Ticket URL: ${formatOptional(event.ticketUrl)}
- Type: ${formatList(event.type)}
- Format: ${formatList(event.format)}
- Tracks: ${formatList(event.tracks)}
- Target groups: ${formatList(event.targetGroups)}
- Admission: ${formatList(event.admission)}
- Registration: ${formatList(event.registrationType)}
- Accessibility: ${formatList(event.accessibility)}
- Coordinates: ${formatCoordinates(event.geo)}
- Description: ${description || "None"}
- Enrichment sources:
${sources}`;
    })
    .join("\n\n");

  return `# ViennaUP 2026 Event Catalogue

Full generated event catalogue.

${eventSections}
`;
}

function buildRecommendationGuideDoc() {
  return `# Recommendation Guide

When recommending ViennaUP events from this bundle:

1. Start with \`references/programme-overview.md\` to confirm valid dates,
   tracks, formats, and target groups.
2. Use \`references/event-catalog.md\` for exact event facts.
3. Match the user's persona against tracks, formats, target groups, admission,
   and venue convenience.
4. Prefer concise shortlists over dumping all events.
5. Always include title, date, time, venue, and a URL when available.
6. If the bundle does not contain enough evidence, say that clearly instead of
   inventing details.
7. Treat MCP-style text search as fuzzy discovery. For exact event facts, rely
   on a specific event record rather than a loose text match alone.
`;
}

function buildClaudeSkillDoc() {
  return `---
name: viennaup-events
description: Answer questions about the ViennaUP 2026 programme using the bundled reference files. Use for schedules, recommendations, venues, and event lookups.
---

# ViennaUP Events

Use this skill for questions about ViennaUP 2026.

## How to use this bundle

1. Read \`references/programme-overview.md\` first for the high-level
   vocabulary and counts.
2. Read \`references/event-catalog.md\` for exact event facts and URLs.
3. Read \`references/recommendation-guide.md\` when building shortlists or
   itineraries.
4. Read \`references/venues.md\` for venue-specific questions.
5. Answer only from the bundled files unless the user explicitly provides
   another trusted source.

## Output rules

- Do not invent dates, venues, or availability.
- Mention uncertainty when the bundled data is incomplete.
- Prefer concise summaries with the most relevant options first.
`;
}

function buildOpenClawSkillDoc() {
  return `---
name: viennaup-events
description: Answer questions about the ViennaUP 2026 programme using the bundled reference files. Use for schedules, recommendations, venues, and event lookups.
version: 1.0.0
license: MIT
---

# ViennaUP Events

Use this skill for questions about ViennaUP 2026.

## How to use this bundle

1. Start with \`references/programme-overview.md\` to learn the valid dates,
   tracks, formats, and target groups.
2. Read \`references/event-catalog.md\` for exact event facts and URLs.
3. Use \`references/recommendation-guide.md\` when the user wants a shortlist,
   itinerary, or persona-based recommendations.
4. Use \`references/venues.md\` for location-specific questions.
5. Answer from the bundle contents and avoid inventing unsupported details.

## Output rules

- Include title, date, time, venue, and a URL when available.
- If multiple events fit, rank them briefly and explain why.
- If the bundle is insufficient, say so directly.
`;
}

function buildReadme(target, mcpUrl) {
  const product = target === "claude" ? "Claude" : "OpenClaw";
  return `# ViennaUP Events Skill Bundle for ${product}

This bundle is generated from the normalized programme data in \`data/events.json\`.

## Contents

- \`SKILL.md\` - skill metadata and activation instructions
- \`references/programme-overview.md\` - dates, tracks, formats, counts
- \`references/event-catalog.md\` - full event catalogue
- \`references/recommendation-guide.md\` - recommendation heuristics
- \`references/venues.md\` - distinct venues and coordinates

## Live MCP

The canonical live integration remains streamable HTTP MCP:

\`\`\`
${mcpUrl}
\`\`\`

Use a stable production domain here, not a disposable preview deployment URL.
`;
}

function getBundleFiles(target, events, mcpUrl) {
  if (!BUNDLE_META[target]) return null;

  const skillDoc = target === "claude" ? buildClaudeSkillDoc() : buildOpenClawSkillDoc();

  return [
    {
      name: `${SKILL_FOLDER}/SKILL.md`,
      content: skillDoc
    },
    {
      name: `${SKILL_FOLDER}/README.md`,
      content: buildReadme(target, mcpUrl)
    },
    {
      name: `${SKILL_FOLDER}/references/programme-overview.md`,
      content: buildOverviewDoc(events, mcpUrl)
    },
    {
      name: `${SKILL_FOLDER}/references/event-catalog.md`,
      content: buildEventCatalogDoc(events)
    },
    {
      name: `${SKILL_FOLDER}/references/recommendation-guide.md`,
      content: buildRecommendationGuideDoc()
    },
    {
      name: `${SKILL_FOLDER}/references/venues.md`,
      content: buildVenuesDoc(events)
    }
  ];
}

export function getSkillFileName(target) {
  return BUNDLE_META[target]?.zipName || null;
}

export function buildSkillBundle(target, events, { mcpUrl = getPublicMcpUrl() } = {}) {
  const files = getBundleFiles(target, events, mcpUrl);
  if (!files) return null;

  return {
    filename: getSkillFileName(target),
    files,
    bytes: buildZip(files)
  };
}

export async function writeSkillFiles(events, { mcpUrl = getPublicMcpUrl() } = {}) {
  await fs.mkdir(SKILL_DIR, { recursive: true });

  const writes = Object.entries(BUNDLE_META).map(async ([target, meta]) => {
    const files = getBundleFiles(target, events, mcpUrl);
    const targetDir = path.join(SKILL_DIR, meta.slug);

    await fs.rm(targetDir, { recursive: true, force: true });

    for (const file of files) {
      const filePath = path.join(targetDir, file.name);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, file.content, "utf8");
    }

    return targetDir;
  });

  return Promise.all(writes);
}
