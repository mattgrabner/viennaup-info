import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const mapId = process.env.GOOGLE_MAPS_MAP_ID || process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "";
  return NextResponse.json({ key, mapId: mapId.trim() || null });
}
