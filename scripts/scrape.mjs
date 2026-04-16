import { scrapeAndStoreEvents } from "../lib/scraper.js";

async function main() {
  const result = await scrapeAndStoreEvents({
    onProgress: ({ phase, done, total, url }) => {
      if (phase === "page" && (done === total || done % 10 === 0)) {
        console.log(`  [${phase}] ${done}/${total} - ${url}`);
      }
    }
  });
  console.log("Scraped events:", result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
