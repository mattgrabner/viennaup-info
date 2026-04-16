import { buildSkillZip } from "@/lib/agent-skill";
import { getPublicOpenClawBaseUrl } from "@/lib/public-urls";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);
  const apiBaseUrl = getPublicOpenClawBaseUrl({ fallbackOrigin: url.origin });
  const { filename, bytes } = buildSkillZip(apiBaseUrl);

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(bytes.byteLength),
      "Cache-Control": "no-store"
    }
  });
}
