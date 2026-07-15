import redirectWorker from "../workers/www-redirect.js";

const cases = [
  ["https://www.inset.page/", "https://inset.page/"],
  [
    "https://www.inset.page/ja/releases/1.2.1/?utm_source=domain-check&ref=home",
    "https://inset.page/ja/releases/1.2.1/?utm_source=domain-check&ref=home"
  ]
];

for (const [source, expected] of cases) {
  const response = redirectWorker.fetch(new Request(source));
  if (response.status !== 301) {
    throw new Error(`www redirect returned ${response.status} for ${source}`);
  }
  if (response.headers.get("location") !== expected) {
    throw new Error(`www redirect mismatch for ${source}: ${response.headers.get("location")}`);
  }
}

console.log(`WWW redirect valid: ${cases.length} cases.`);
