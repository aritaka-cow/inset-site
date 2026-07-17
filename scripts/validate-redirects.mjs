import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { validateCriticalRedirects } from "./redirect-contracts.mjs";

const file = resolve(process.cwd(), process.argv[2] || "public/_redirects");
const errors = validateCriticalRedirects(await readFile(file, "utf8"));

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Critical redirects valid: ${file}`);
