import { buildSkillFile, getSkillFileName } from "@/lib/skill-files";
import { loadEvents } from "@/lib/events-query";

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
  const markdown = buildSkillFile(target, events, {
    mcpUrl: `${url.origin}/api/mcp`
  });

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store"
    }
  });
}
