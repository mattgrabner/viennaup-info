import fs from "node:fs/promises";
import path from "node:path";
import { programmeOverview } from "./events-query.js";

const SKILL_DIR = path.join(process.cwd(), "data", "skills");
const DEFAULT_MCP_URL = "https://<your-deployment>.vercel.app/api/mcp";
const FILE_NAMES = {
  claude: "viennaup-events-claude.md",
  openclaw: "viennaup-events-openclaw.md"
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

function buildCommonSections(events, mcpUrl) {
  const overview = programmeOverview(events);
  const eventSections = events
    .map((event, index) => {
      const description = stripHtml(event.descriptionFull);
      const sources = Array.isArray(event.enrichmentSources) && event.enrichmentSources.length
        ? event.enrichmentSources.map((url) => `  - ${url}`).join("\n")
        : "  - None";

      return `### ${index + 1}. ${event.title}

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

  return `## Programme snapshot

- Total events: ${overview.totalEvents}
- Dates covered: ${formatList(overview.dates)}
- Formats: ${formatList(overview.formats)}
- Tracks: ${formatList(overview.tracks)}
- Target groups: ${formatList(overview.targetGroups)}
- Types: ${formatList(overview.types)}
- Admission labels: ${formatList(overview.admission)}

## Event counts by date

${buildCountsByDate(overview.countsByDate)}

## Live integration

- Preferred live integration: streamable HTTP MCP
- MCP URL: ${mcpUrl}
- This markdown file is a static snapshot generated from \`data/events.json\`

## Full event catalogue

${eventSections}
`;
}

function buildClaudeSkill(events, mcpUrl) {
  return `# Claude Skill: ViennaUP Events

This file is a portable ViennaUP 2026 context pack generated from the normalized
programme data in \`data/events.json\`.

## How Claude should use this file

1. Use this file for questions about ViennaUP events, schedules, venues, tracks,
   audiences, and recommendations.
2. Answer from the event data in this document. If something is missing or
   ambiguous, say so instead of inventing details.
3. When a live tool connection is available, prefer the streamable HTTP MCP
   server for fresh filtering and search. Otherwise use this markdown snapshot.
4. For recommendations, match the user's interests against tracks, formats,
   target groups, admission, and the event descriptions below.
5. Include title, date, time, venue, and URL when recommending or summarizing
   events.

${buildCommonSections(events, mcpUrl)}
`;
}

function buildOpenClawSkill(events, mcpUrl) {
  return `---
name: viennaup-events
description: Portable ViennaUP 2026 skill generated from normalized event data.
version: 1.0.0
license: MIT
---

# ViennaUP Events for OpenClaw

This markdown file is a portable ViennaUP 2026 context pack generated from
\`data/events.json\`.

## How OpenClaw should use this file

1. Use this file as the default local knowledge source for ViennaUP 2026
   programme questions.
2. Answer only from the facts in this file unless the user also provides another
   trusted source.
3. If a live MCP connection is available, prefer the streamable HTTP MCP server
   for fresh filtering or exact lookups, but keep this file as fallback context.
4. For itinerary and recommendation requests, rank events using track, format,
   target group, timing, and venue relevance.
5. Include title, date, time, venue, and URL when presenting suggestions.

${buildCommonSections(events, mcpUrl)}
`;
}

export function getSkillFileName(target) {
  return FILE_NAMES[target] || null;
}

export function buildSkillFile(target, events, { mcpUrl = DEFAULT_MCP_URL } = {}) {
  if (target === "claude") return buildClaudeSkill(events, mcpUrl);
  if (target === "openclaw") return buildOpenClawSkill(events, mcpUrl);
  return null;
}

export async function writeSkillFiles(events, options = {}) {
  await fs.mkdir(SKILL_DIR, { recursive: true });

  const writes = Object.keys(FILE_NAMES).map(async (target) => {
    const content = buildSkillFile(target, events, options);
    const filePath = path.join(SKILL_DIR, FILE_NAMES[target]);
    await fs.writeFile(filePath, content, "utf8");
    return filePath;
  });

  return Promise.all(writes);
}
