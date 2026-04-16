import { NextResponse } from "next/server";
import { scrapeAndStoreEvents } from "@/lib/scraper";

export async function POST() {
  try {
    const result = await scrapeAndStoreEvents();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
