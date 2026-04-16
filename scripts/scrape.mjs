import { scrapeAndStoreEvents } from "../lib/scraper.js";

async function main() {
  const result = await scrapeAndStoreEvents();
  console.log("Scraped events:", result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
