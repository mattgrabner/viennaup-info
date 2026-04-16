import { buildSkillBundle, getSkillFileName } from "@/lib/skill-files";
import { loadEvents } from "@/lib/events-query";
import { getPublicMcpUrl } from "@/lib/public-urls";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { target } = await params;
  const filename = getSkillFileName(target);

  if (!filename) {
    return new Response("Unknown skill target.", { status: 404 });
  }

  const events = await loadEvents();
  const url = new URL(request.url);
  const bundle = buildSkillBundle(target, events, {
    mcpUrl: getPublicMcpUrl({ fallbackOrigin: url.origin })
  });

  return new Response(bundle.bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(bundle.bytes.byteLength),
      "Cache-Control": "no-store"
    }
  });
}
