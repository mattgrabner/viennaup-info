import { getPublicOpenClawBaseUrl } from "@/lib/public-urls";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);
  const baseUrl = getPublicOpenClawBaseUrl({ fallbackOrigin: url.origin });

  return Response.json({
    name: "viennaup-events-openclaw-api",
    description: "OpenClaw-friendly HTTP API for the ViennaUP 2026 programme.",
    baseUrl,
    endpoints: {
      overview: `${baseUrl}/overview`,
      events: `${baseUrl}/events`,
      event: `${baseUrl}/event`,
      date: `${baseUrl}/date`,
      near: `${baseUrl}/near`,
      recommend: `${baseUrl}/recommend`,
      venues: `${baseUrl}/venues`
    },
    openclawConfigExample: {
      skills: {
        entries: {
          "viennaup-events": {
            enabled: true,
            env: {
              VIENNAUP_API_BASE_URL: baseUrl
            }
          }
        }
      }
    }
  });
}
