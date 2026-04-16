import MapApp from "@/components/MapApp";
import { readStoredEvents } from "@/lib/scraper";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let events = await readStoredEvents();

  if (!events.length) {
    events = [];
  }

  return <MapApp initialEvents={events} />;
}
