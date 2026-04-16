import { buildSkillZip } from "@/lib/agent-skill";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);
  const apiBaseUrl = `${url.origin}/api/openclaw`;
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
