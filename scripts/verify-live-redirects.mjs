import { criticalRedirects, siteOrigin } from "./redirect-contracts.mjs";

const attempts = Number(process.env.REDIRECT_VERIFY_ATTEMPTS || 6);
const retryDelayMs = Number(process.env.REDIRECT_VERIFY_DELAY_MS || 5_000);
const origin = process.env.LIVE_SITE_ORIGIN || siteOrigin;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyRedirect(redirect) {
  const url = new URL(redirect.source, origin);
  const response = await fetch(url, {
    method: "HEAD",
    redirect: "manual",
    headers: { "user-agent": "inset-site-deploy-smoke/1.0" }
  });
  const location = response.headers.get("location");

  if (response.status !== redirect.status) {
    throw new Error(`${redirect.source} returned ${response.status}; expected ${redirect.status}`);
  }
  if (location !== redirect.target) {
    throw new Error(`${redirect.source} Location mismatch: ${location ?? "<missing>"}`);
  }
}

let lastErrors = [];
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  const results = await Promise.allSettled(criticalRedirects.map(verifyRedirect));
  lastErrors = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason instanceof Error ? result.reason.message : String(result.reason));

  if (lastErrors.length === 0) {
    console.log(`Live redirects valid: ${criticalRedirects.length} routes on ${origin}`);
    process.exit(0);
  }

  if (attempt < attempts) {
    console.warn(`Live redirect check ${attempt}/${attempts} failed; retrying in ${retryDelayMs}ms.`);
    await wait(retryDelayMs);
  }
}

console.error(lastErrors.map((error) => `- ${error}`).join("\n"));
process.exit(1);
