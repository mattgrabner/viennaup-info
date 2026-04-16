import { NextResponse } from "next/server";
import { readStoredEvents, scrapeAndStoreEvents } from "@/lib/scraper";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const refresh = searchParams.get("refresh") === "1";

  if (refresh) {
    const result = await scrapeAndStoreEvents();
    return NextResponse.json({ refreshed: true, ...result });
  }

  const events = await readStoredEvents();
  return NextResponse.json({ events });
}
