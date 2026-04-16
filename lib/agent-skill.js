import { buildZip } from "./zip.js";

const SKILL_NAME = "viennaup-events";
const VERSION = "1.1.0";

function skillMd(apiBaseUrl) {
  return `---
name: ${SKILL_NAME}
description: >-
  Answer questions about the ViennaUP 2026 programme in Vienna. Use when the
  user asks what is happening on a date, wants recommendations for a persona or
  topic, needs event details, or wants venues / nearby sessions during ViennaUP.
version: ${VERSION}
license: MIT
authors:
  - Matthias Grabner <office@grabner.tech>
metadata:
  openclaw:
    requires:
      bins:
        - curl
      env:
        - VIENNAUP_API_BASE_URL
---

# ViennaUP Events

This skill uses the ViennaUP HTTP API exposed by this project. Do not ask the
user to wire up an MCP server for OpenClaw.

## Runtime contract

OpenClaw injects the environment variable \`VIENNAUP_API_BASE_URL\` for this
skill. In this bundle's example config it points to:

\`\`\`
${apiBaseUrl}
\`\`\`

Use shell commands with \`curl -fsSL\` against that base URL.

## Endpoints

- \`GET $VIENNAUP_API_BASE_URL/overview\`
  First call when you need the valid vocabulary for dates, formats, tracks,
  target groups, admission categories, or venues.
- \`GET $VIENNAUP_API_BASE_URL/events\`
  General filtering endpoint. Supports \`query\`, \`date\`, \`dateFrom\`,
  \`dateTo\`, repeated \`formats\`, \`tracks\`, \`targetGroups\`, \`types\`,
  \`admission\`, plus \`location\`, \`matchAllTags\`, \`limit\`, and \`full\`.
- \`GET $VIENNAUP_API_BASE_URL/event\`
  Fetch one event by \`slug\` or \`uid\`.
- \`GET $VIENNAUP_API_BASE_URL/date\`
  All events on a single \`date=YYYY-MM-DD\`.
- \`GET $VIENNAUP_API_BASE_URL/near\`
  Nearby events using \`lat\` and \`lng\`, or \`address\`, plus optional
  \`radiusKm\`, \`date\`, and \`limit\`.
- \`GET $VIENNAUP_API_BASE_URL/recommend\`
  Ranked recommendations for free-form \`interests\`, preferred \`tracks\`,
  \`formats\`, \`targetGroups\`, and optional \`date\`.
- \`GET $VIENNAUP_API_BASE_URL/venues\`
  Distinct venues, event counts, and coordinates.

Repeat list filters as separate query params, e.g. \`tracks=Impact&tracks=Investment\`.

## How to work

1. If you are unsure which filter values are valid, call \`/overview\` first and
   reuse that vocabulary for the rest of the conversation.
2. Prefer \`/recommend\` when the user describes a persona or intent, such as
   "I'm an investor interested in climate tech".
3. Prefer \`/near\` for location questions. Use \`radiusKm=1.5\` for walking
   distance and \`radiusKm=5\` for a broader area.
4. For exact event lookups, use \`/event\` with \`slug\` if you have it;
   otherwise narrow down with \`/events?query=...\`.
5. Summarize the JSON in natural language. Always include title, date, start
   time, venue, and the event page when available.
6. Do not use this skill for questions unrelated to the ViennaUP 2026 programme.

## Curl patterns

Overview:

\`\`\`bash
curl -fsSL "$VIENNAUP_API_BASE_URL/overview"
\`\`\`

Events on a date:

\`\`\`bash
curl -fsSL --get \\
  --data-urlencode "date=2026-05-19" \\
  "$VIENNAUP_API_BASE_URL/date"
\`\`\`

Filter by track and format:

\`\`\`bash
curl -fsSL --get \\
  --data-urlencode "date=2026-05-19" \\
  --data-urlencode "tracks=Impact" \\
  --data-urlencode "formats=Workshop" \\
  "$VIENNAUP_API_BASE_URL/events"
\`\`\`

Recommendations for a persona:

\`\`\`bash
curl -fsSL --get \\
  --data-urlencode "interests=climate tech" \\
  --data-urlencode "targetGroups=Investors" \\
  --data-urlencode "limit=6" \\
  "$VIENNAUP_API_BASE_URL/recommend"
\`\`\`

Nearby events:

\`\`\`bash
curl -fsSL --get \\
  --data-urlencode "address=Stephansplatz, Vienna" \\
  --data-urlencode "radiusKm=2" \\
  "$VIENNAUP_API_BASE_URL/near"
\`\`\`

## Example prompts for the user

- "Build me a 3-day ViennaUP itinerary for an early-stage impact investor."
- "What's on the afternoon of 19 May near Museumsquartier?"
- "Give me every matchmaking format across the week."
- "Any pitch competitions on 20 May that founders can attend?"

## Troubleshooting

- If \`VIENNAUP_API_BASE_URL\` is missing, the skill will not load. Configure it in
  \`~/.openclaw/openclaw.json\` under \`skills.entries["${SKILL_NAME}"].env\`.
- Address-based proximity lookups use server-side geocoding when
  \`GOOGLE_MAPS_API_KEY\` is present. Known ViennaUP venues still work from the
  cached coordinates.

## License

MIT. Event data is derived from public ViennaUP sources; this skill is not
affiliated with ViennaUP.
`;
}

function readme(apiBaseUrl) {
  return `# ViennaUP Events — OpenClaw Skill

Drop this folder into \`~/.openclaw/skills/\` (or your workspace \`.openclaw/skills/\`).
This is a native OpenClaw skill bundle, not an MCP registration helper.

## 1. Install the skill

\`\`\`bash
# macOS / Linux
mkdir -p ~/.openclaw/skills
unzip viennaup-events.skill.zip -d ~/.openclaw/skills/
\`\`\`

The skill files should end up at \`~/.openclaw/skills/viennaup-events/SKILL.md\`.

## 2. Configure the runtime env for the skill

Add the following block to \`~/.openclaw/openclaw.json\` under \`skills.entries\`
(or merge with the existing file — see \`openclaw.example.json\`):

\`\`\`json
{
  "skills": {
    "entries": {
      "viennaup-events": {
        "enabled": true,
        "env": {
          "VIENNAUP_API_BASE_URL": "${apiBaseUrl}"
        }
      }
    }
  }
}
\`\`\`

No \`mcpServers\` entry is required for OpenClaw.

## 3. Refresh skills

\`\`\`bash
openclaw skills list
\`\`\`

If the skill does not show up immediately, start a new turn or restart the
gateway.

## 4. Use it

Ask your agent: *"Using the viennaup-events skill, recommend sessions on 18 May
for an impact investor."*

---

## Sources

- OpenClaw API base URL: ${apiBaseUrl}
- Map & source repo: https://github.com/matthiasgrabner/viennaup-maps
`;
}

function openclawExample(apiBaseUrl) {
  return (
    JSON.stringify(
      {
        skills: {
          entries: {
            [SKILL_NAME]: {
              enabled: true,
              env: {
                VIENNAUP_API_BASE_URL: apiBaseUrl
              }
            }
          }
        }
      },
      null,
      2
    ) + "\n"
  );
}

/**
 * @param {string} apiBaseUrl - Absolute URL of the OpenClaw API base, e.g. `https://app.example.com/api/openclaw`.
 * @returns {{ filename: string, bytes: Uint8Array }}
 */
export function buildSkillZip(apiBaseUrl) {
  const files = [
    {
      name: `${SKILL_NAME}/SKILL.md`,
      content: skillMd(apiBaseUrl)
    },
    {
      name: `${SKILL_NAME}/README.md`,
      content: readme(apiBaseUrl)
    },
    {
      name: `${SKILL_NAME}/openclaw.example.json`,
      content: openclawExample(apiBaseUrl)
    }
  ];
  return {
    filename: `${SKILL_NAME}.skill.zip`,
    bytes: buildZip(files)
  };
}
