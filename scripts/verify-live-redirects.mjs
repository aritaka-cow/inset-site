import { criticalRedirects, siteOrigin } from "./redirect-contracts.mjs";

const attempts = Number(process.env.REDIRECT_VERIFY_ATTEMPTS || 6);
const retryDelayMs = Number(process.env.REDIRECT_VERIFY_DELAY_MS || 5_000);
const origin = process.env.LIVE_SITE_ORIGIN || siteOrigin;
const verifyLandingCandidates = process.env.VERIFY_LIVE_LANDING_CANDIDATES === "1";
const landingCandidates = [
  {
    source: "/go/instagram-fr-202608-r3/",
    cta: "https://apps.apple.com/app/apple-store/id6776488290?pt=128992117&ct=instagram_fr_202608&mt=8",
    headers: {
      "cache-control": "no-store",
      "content-language": "fr",
      "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; script-src 'none'; connect-src 'none'; img-src 'none'; font-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      "referrer-policy": "no-referrer",
      "x-robots-tag": "noindex, nofollow"
    }
  }
];

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

function attribute(markup, name) {
  return markup.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]?.replaceAll("&amp;", "&") ?? null;
}

async function verifyLanding(landing) {
  const url = new URL(landing.source, origin);
  const response = await fetch(url, {
    method: "GET",
    redirect: "manual",
    headers: { "user-agent": "inset-site-deploy-smoke/1.0" }
  });
  const html = await response.text();
  const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map((match) => match[0]);

  if (response.status !== 200) {
    throw new Error(`${landing.source} returned ${response.status}; expected 200`);
  }
  if (response.headers.get("location") !== null) {
    throw new Error(`${landing.source} unexpectedly returned a Location header`);
  }
  if (!response.headers.get("content-type")?.toLowerCase().includes("text/html")) {
    throw new Error(`${landing.source} did not return HTML`);
  }
  for (const [name, expected] of Object.entries(landing.headers)) {
    const actual = response.headers.get(name);
    const matches = name === "referrer-policy"
      ? actual?.split(",").map((value) => value.trim()).at(-1) === expected
      : actual === expected;
    if (!matches) {
      throw new Error(`${landing.source} ${name} mismatch: ${actual ?? "<missing>"}`);
    }
  }
  if (anchors.length !== 1) {
    throw new Error(`${landing.source} anchor count mismatch: ${anchors.length}; expected 1`);
  }
  if (attribute(anchors[0], "href") !== landing.cta) {
    throw new Error(`${landing.source} CTA href mismatch`);
  }
  if (attribute(anchors[0], "target") !== null) {
    throw new Error(`${landing.source} CTA must remain in the same browsing context`);
  }
  const ctaRel = new Set((attribute(anchors[0], "rel") ?? "").split(/\s+/).filter(Boolean));
  for (const token of ["external", "nofollow", "noreferrer"]) {
    if (!ctaRel.has(token)) throw new Error(`${landing.source} CTA rel is missing ${token}`);
  }
  if (attribute(anchors[0], "referrerpolicy") !== "no-referrer") {
    throw new Error(`${landing.source} CTA referrer policy mismatch`);
  }
  const forbiddenPatterns = new Map([
    ["script", /<script\b/i],
    ["meta refresh", /<meta\b[^>]*http-equiv=["']?refresh/i],
    ["iframe", /<iframe\b/i],
    ["form", /<form\b/i],
    ["image", /<img\b/i],
    ["external resource link", /<link\b/i],
    ["automatic navigation", /\b(?:window\.open|location\s*=|location\.(?:assign|replace)\s*\()/i],
    ["network API", /\b(?:fetch\s*\(|XMLHttpRequest|WebSocket)\b/i],
    ["cookie or storage", /\b(?:document\.cookie|localStorage|sessionStorage|indexedDB)\b/i],
    ["CSS external request", /@import\b|url\s*\(/i]
  ]);
  for (const [label, pattern] of forbiddenPatterns) {
    if (pattern.test(html)) throw new Error(`${landing.source} contains forbidden ${label}`);
  }
}

const liveChecks = [
  ...criticalRedirects.map((redirect) => () => verifyRedirect(redirect)),
  ...(verifyLandingCandidates ? landingCandidates.map((landing) => () => verifyLanding(landing)) : [])
];

let lastErrors = [];
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  const results = await Promise.allSettled(liveChecks.map((verify) => verify()));
  lastErrors = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason instanceof Error ? result.reason.message : String(result.reason));

  if (lastErrors.length === 0) {
    const landingSummary = verifyLandingCandidates
      ? ` and ${landingCandidates.length} landing candidate`
      : "; landing candidates skipped (set VERIFY_LIVE_LANDING_CANDIDATES=1 after publication)";
    console.log(`Live redirects valid: ${criticalRedirects.length} routes${landingSummary} on ${origin}`);
    process.exit(0);
  }

  if (attempt < attempts) {
    console.warn(`Live redirect check ${attempt}/${attempts} failed; retrying in ${retryDelayMs}ms.`);
    await wait(retryDelayMs);
  }
}

console.error(lastErrors.map((error) => `- ${error}`).join("\n"));
process.exit(1);
