import { readFile, readdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { HtmlValidate } from "html-validate";
import { validateCriticalRedirects } from "./redirect-contracts.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, process.env.OUT_DIR || "dist");
const base = (process.env.SITE_BASE || "/").replace(/\/$/, "");
const siteOrigin = "https://inset.page";
const isPreview = process.env.PUBLIC_SITE_ENV === "preview";
const tracksAppStoreClicks = !isPreview && base === "";
const appStoreUrls = {
  en: "https://apps.apple.com/us/app/inset-photo-frames/id6776488290",
  ja: "https://apps.apple.com/jp/app/inset/id6776488290"
};
const franceLandingRoute = "/go/instagram-fr-202608-r3/";
const franceCampaignUrl = "https://apps.apple.com/app/apple-store/id6776488290?pt=128992117&ct=instagram_fr_202608&mt=8";
const errors = [];
const pageKeys = ["features", "how-it-works", "frames", "pricing", "faq", "support", "privacy", "terms", "legal", "releases"];
const versions = ["1.0.0", "1.1.0", "1.2.0", "1.2.1"];
const canonicalRoutes = ["/", "/ja/", ...pageKeys.flatMap((page) => [`/${page}/`, `/ja/${page}/`]), ...versions.flatMap((version) => [`/releases/${version}/`, `/ja/releases/${version}/`])];
const expectedFiles = [
  "index.html", "ja/index.html", "404.html", "ja/404.html", "ja/404/index.html", "announcements.json", "roadmap.json", "roadmap.html", "privacy.html", "terms.html", "legal.html", "robots.txt", "sitemap.xml", "_redirects",
  ...pageKeys.flatMap((page) => [`${page}/index.html`, `ja/${page}/index.html`]),
  ...versions.flatMap((version) => [`releases/${version}/index.html`, `ja/releases/${version}/index.html`, `releases/${version}.html`]),
  "images/app-icon.png", "images/hero-finished.webp", "images/device-composite.webp", "images/water-glass.webp",
  "images/og-home-en.png", "images/og-home-ja.png",
  "images/batch-branch.webp", "images/batch-lamp.webp", "images/batch-chair.webp",
  "images/frame-35mm-black.webp", "images/frame-polaroid-black.webp", "images/frame-polaroid-white.webp", "images/frame-film-white.webp",
  "images/frame-letterbox-round-border.webp", "images/frame-letterbox-original.webp",
  "store-badges/app-store-en.svg", "store-badges/app-store-ja.svg",
  "go/instagram-fr-202608-r3/index.html", "_headers"
];

const homeSocialMeta = new Map([
  ["/", {
    image: `${siteOrigin}/images/og-home-en.png?v=ea4ec019`,
    alt: "Inset's frame-layer editor shown in an iPhone beside the headline ‘Frames, layered your way.’"
  }],
  ["/ja/", {
    image: `${siteOrigin}/images/og-home-ja.png?v=c2b7a494`,
    alt: "iPhoneに表示したInsetの余白レイヤー編集画面と「フレームを、思いのままに。」という見出し"
  }]
]);

const approvedSocialAssetHashes = new Map([
  ["images/og-home-en.png", "ea4ec019eae46c168435b3d7f88e8305c6be64e7350637dc601fb771936d80a5"],
  ["images/og-home-ja.png", "c2b7a494b63307fde05149b73ec710f086ef809ebcc7eedfc7e1bbb161aae067"]
]);

async function exists(path) { try { await stat(path); return true; } catch { return false; } }
for (const file of expectedFiles) if (!await exists(join(output, file))) errors.push(`missing build artifact: ${file}`);

async function walk(directory) {
  const paths = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await walk(path)); else paths.push(path);
  }
  return paths;
}
const allFiles = await walk(output);
const htmlFiles = allFiles.filter((path) => extname(path) === ".html");
const validator = new HtmlValidate();
for (const htmlFile of htmlFiles) {
  const report = await validator.validateFile(htmlFile);
  if (!report.valid) {
    for (const result of report.results) for (const message of result.messages) errors.push(`${relative(output, htmlFile)}:${message.line}:${message.column} ${message.ruleId} ${message.message}`);
  }
}

function fileForRoute(route) {
  const clean = route.replace(/^\//, "");
  return join(output, clean, "index.html");
}
const expectedCtaPlacements = new Map([
  ["/", ["hero", "closing"]],
  ["/ja/", ["hero", "closing"]],
  ["/pricing/", ["pricing"]],
  ["/ja/pricing/", ["pricing"]],
  ["/support/", ["support"]],
  ["/ja/support/", ["support"]]
]);
function attribute(markup, name) {
  return markup.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? null;
}
function decodeAttribute(value) {
  return value?.replaceAll("&amp;", "&") ?? null;
}
function appStoreCtas(html) {
  return [...html.matchAll(/<a\b[^>]*>/g)]
    .map((match) => match[0])
    .filter((anchor) => /\bclass="[^"]*\bstore-badge--app-store\b[^"]*"/.test(anchor));
}
for (const route of canonicalRoutes) {
  const file = route === "/" ? join(output, "index.html") : fileForRoute(route);
  if (!await exists(file)) { errors.push(`canonical route is missing: ${route}`); continue; }
  const html = await readFile(file, "utf8");
  const locale = route.startsWith("/ja/") ? "ja" : "en";
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`title missing: ${route}`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`description missing: ${route}`);
  if (!/<h1[\s>]/.test(html)) errors.push(`H1 missing: ${route}`);
  const canonical = `${siteOrigin}${route}`;
  const englishRoute = route.startsWith("/ja/") ? route.replace(/^\/ja/, "") : route;
  const japaneseRoute = route.startsWith("/ja/") ? route : route === "/" ? "/ja/" : `/ja${route}`;
  const englishUrl = `${siteOrigin}${englishRoute}`;
  const japaneseUrl = `${siteOrigin}${japaneseRoute}`;
  if (!html.includes(`rel="canonical" href="${canonical}"`)) errors.push(`canonical mismatch: ${route}`);
  if (!html.includes(`hreflang="en" href="${englishUrl}"`)) errors.push(`English hreflang mismatch: ${route}`);
  if (!html.includes(`hreflang="ja" href="${japaneseUrl}"`)) errors.push(`Japanese hreflang mismatch: ${route}`);
  if (!html.includes(`hreflang="x-default" href="${englishUrl}"`)) errors.push(`x-default mismatch: ${route}`);
  if (!html.includes(`property="og:url" content="${canonical}"`)) errors.push(`Open Graph URL mismatch: ${route}`);
  if (!html.includes(`property="og:image" content="${siteOrigin}/`)) errors.push(`Open Graph image host mismatch: ${route}`);
  if (!html.includes(`name="twitter:image" content="${siteOrigin}/`)) errors.push(`X Card image host mismatch: ${route}`);
  const socialMeta = homeSocialMeta.get(route);
  if (socialMeta) {
    if (!html.includes(`property="og:image" content="${socialMeta.image}"`)) errors.push(`localized Open Graph image mismatch: ${route}`);
    if (!html.includes(`property="og:image:secure_url" content="${socialMeta.image}"`)) errors.push(`localized secure Open Graph image mismatch: ${route}`);
    if (!html.includes('property="og:image:type" content="image/png"')) errors.push(`localized Open Graph image type mismatch: ${route}`);
    if (!html.includes('property="og:image:width" content="1200"')) errors.push(`localized Open Graph image width mismatch: ${route}`);
    if (!html.includes('property="og:image:height" content="630"')) errors.push(`localized Open Graph image height mismatch: ${route}`);
    if (!html.includes(`property="og:image:alt" content="${socialMeta.alt}"`)) errors.push(`localized Open Graph image alt mismatch: ${route}`);
    if (!html.includes(`name="twitter:image" content="${socialMeta.image}"`)) errors.push(`localized X Card image mismatch: ${route}`);
    if (!html.includes(`name="twitter:image:alt" content="${socialMeta.alt}"`)) errors.push(`localized X Card image alt mismatch: ${route}`);
  }
  if (!html.includes(`lang="${locale}"`)) errors.push(`document language mismatch: ${route}`);
  if (html.includes("1.2.2")) errors.push(`unpublished version appears: ${route}`);
  if (html.includes("https://inset.app")) errors.push(`old domain remains: ${route}`);

  const ctas = appStoreCtas(html);
  const placements = expectedCtaPlacements.get(route) ?? [];
  if (ctas.length !== placements.length) errors.push(`App Store CTA count mismatch: ${route}; expected ${placements.length}, received ${ctas.length}`);
  for (const [index, placement] of placements.entries()) {
    const cta = ctas[index] ?? "";
    const expectedHref = tracksAppStoreClicks ? `/go/app-store/${locale}/${placement}` : appStoreUrls[locale];
    if (attribute(cta, "href") !== expectedHref) errors.push(`App Store CTA href mismatch: ${route} ${placement}`);
    if (attribute(cta, "data-app-store-placement") !== placement) errors.push(`App Store CTA placement mismatch: ${route} ${placement}`);
    if (!(attribute(cta, "rel") ?? "").split(/\s+/).includes("nofollow")) errors.push(`App Store CTA must be nofollow: ${route} ${placement}`);
  }

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map((match) => {
    try { return JSON.parse(match[1]); } catch { errors.push(`invalid JSON-LD: ${route}`); return null; }
  }).filter(Boolean);
  const pageSchema = schemas.find((schema) => schema["@type"] === "WebPage" || schema["@type"] === "Article");
  if (pageSchema?.url !== canonical) errors.push(`JSON-LD page URL mismatch: ${route}`);
  if (pageSchema?.isPartOf?.url !== siteOrigin) errors.push(`JSON-LD website URL mismatch: ${route}`);
}

const franceLandingFile = fileForRoute(franceLandingRoute);
if (await exists(franceLandingFile)) {
  const html = await readFile(franceLandingFile, "utf8");
  const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map((match) => match[0]);
  const forbiddenPatterns = new Map([
    ["script", /<script\b/i],
    ["meta refresh", /<meta\b[^>]*http-equiv=["']?refresh/i],
    ["iframe", /<iframe\b/i],
    ["form", /<form\b/i],
    ["image", /<img\b/i],
    ["external resource link", /<link\b/i],
    ["base element", /<base\b/i],
    ["automatic navigation", /\b(?:window\.open|location\s*=|location\.(?:assign|replace)\s*\()/i],
    ["network API", /\b(?:fetch\s*\(|XMLHttpRequest|WebSocket)\b/i],
    ["cookie or storage", /\b(?:document\.cookie|localStorage|sessionStorage|indexedDB)\b/i],
    ["CSS external request", /@import\b|url\s*\(/i]
  ]);

  if (!/<html\b[^>]*\blang="fr"/.test(html)) errors.push(`${franceLandingRoute} document language must be fr`);
  if (anchors.length !== 1) errors.push(`${franceLandingRoute} must contain exactly one anchor; received ${anchors.length}`);
  const cta = anchors[0] ?? "";
  if (decodeAttribute(attribute(cta, "href")) !== franceCampaignUrl) errors.push(`${franceLandingRoute} CTA href mismatch`);
  if (attribute(cta, "target") !== null) errors.push(`${franceLandingRoute} CTA must remain in the same browsing context`);
  const ctaRel = new Set((attribute(cta, "rel") ?? "").split(/\s+/).filter(Boolean));
  for (const token of ["external", "nofollow", "noreferrer"]) {
    if (!ctaRel.has(token)) errors.push(`${franceLandingRoute} CTA rel must include ${token}`);
  }
  if (attribute(cta, "referrerpolicy") !== "no-referrer") errors.push(`${franceLandingRoute} CTA referrer policy mismatch`);
  if (!/\.cta\s*\{[^}]*\bmin-height:\s*(?:5[2-9]|[6-9]\d|\d{3,})px\b/s.test(html)) errors.push(`${franceLandingRoute} CTA minimum height must be at least 52px`);
  for (const [label, pattern] of forbiddenPatterns) {
    if (pattern.test(html)) errors.push(`${franceLandingRoute} contains forbidden ${label}`);
  }
}

const builtHeaders = await readFile(join(output, "_headers"), "utf8");
function headersForRoute(text, route) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === route);
  if (start === -1) return null;
  const headers = new Map();
  for (const line of lines.slice(start + 1)) {
    if (!/^\s+/.test(line)) break;
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    headers.set(line.slice(0, separator).trim(), line.slice(separator + 1).trim());
  }
  return headers;
}
const franceLandingHeaders = headersForRoute(builtHeaders, franceLandingRoute);
const requiredFranceLandingHeaders = new Map([
  ["Cache-Control", "no-store"],
  ["Content-Language", "fr"],
  ["Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; script-src 'none'; connect-src 'none'; img-src 'none'; font-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"],
  ["Referrer-Policy", "no-referrer"],
  ["X-Robots-Tag", "noindex, nofollow"]
]);
if (!franceLandingHeaders) {
  errors.push(`${franceLandingRoute} route-specific headers missing`);
} else {
  for (const [name, value] of requiredFranceLandingHeaders) {
    if (franceLandingHeaders.get(name) !== value) errors.push(`${franceLandingRoute} ${name} header mismatch`);
  }
  if (franceLandingHeaders.has("Location")) errors.push(`${franceLandingRoute} must not set a Location header`);
}

for (const [file, expectedHash] of approvedSocialAssetHashes) {
  const png = await readFile(join(output, file));
  const signature = png.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    errors.push(`Open Graph asset is not a PNG: ${file}`);
    continue;
  }
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  if (width !== 1200 || height !== 630) errors.push(`Open Graph asset dimensions mismatch: ${file}; received ${width}x${height}`);
  const hash = createHash("sha256").update(png).digest("hex");
  if (hash !== expectedHash) errors.push(`Open Graph asset approval hash mismatch: ${file}`);
}

const announcementsSource = JSON.parse(await readFile(join(root, "announcements.json"), "utf8"));
const announcementsBuild = JSON.parse(await readFile(join(output, "announcements.json"), "utf8"));
if (JSON.stringify(announcementsSource) !== JSON.stringify(announcementsBuild)) errors.push("announcements.json build output changed wire values");
const roadmapSource = JSON.parse(await readFile(join(root, "roadmap.json"), "utf8"));
const roadmapBuild = JSON.parse(await readFile(join(output, "roadmap.json"), "utf8"));
if (JSON.stringify(roadmapSource) !== JSON.stringify(roadmapBuild)) errors.push("roadmap.json build output changed wire values");

const sitemap = await readFile(join(output, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
for (const route of canonicalRoutes) if (!sitemapUrls.includes(`${siteOrigin}${route}`)) errors.push(`sitemap route missing: ${route}`);
if (sitemapUrls.length !== canonicalRoutes.length) errors.push(`sitemap URL count mismatch: expected ${canonicalRoutes.length}, received ${sitemapUrls.length}`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push("sitemap contains duplicate URLs");
if (sitemap.includes("https://inset.app")) errors.push("old domain remains in sitemap");

const robots = await readFile(join(output, "robots.txt"), "utf8");
if (isPreview) {
  if (!robots.includes("User-agent: *\nDisallow: /")) errors.push("preview robots must block indexing");
} else {
  if (!robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) errors.push("robots sitemap host mismatch");
  if (!robots.includes("Disallow: /go/")) errors.push("robots must exclude tracking redirects");
}
if (robots.includes("https://inset.app")) errors.push("old domain remains in robots.txt");

const redirects = await readFile(join(output, "_redirects"), "utf8");
errors.push(...validateCriticalRedirects(redirects));

const legacyCanonicals = new Map([
  ["privacy.html", `${siteOrigin}/privacy/`],
  ["terms.html", `${siteOrigin}/terms/`],
  ["legal.html", `${siteOrigin}/legal/`],
  ["roadmap.html", `${siteOrigin}/releases/`],
  ...versions.map((version) => [`releases/${version}.html`, `${siteOrigin}/releases/${version}/`])
]);
for (const [file, canonical] of legacyCanonicals) {
  const html = await readFile(join(output, file), "utf8");
  if (!html.includes('content="noindex, follow"')) errors.push(`legacy page is indexable: ${file}`);
  if (!html.includes(`rel="canonical" href="${canonical}"`)) errors.push(`legacy canonical mismatch: ${file}`);
  if (html.includes("https://inset.app")) errors.push(`old domain remains in legacy page: ${file}`);
}

function localTarget(href) {
  if (!href || /^(?:https?:|mailto:|tel:|#|data:)/.test(href)) return null;
  const path = href.split(/[?#]/, 1)[0];
  let normalized = path;
  if (base && normalized.startsWith(`${base}/`)) normalized = normalized.slice(base.length);
  if (!normalized.startsWith("/")) return null;
  if (normalized.startsWith("/go/app-store/")) return null;
  const rel = normalized.replace(/^\//, "");
  if (!rel) return join(output, "index.html");
  if (rel.endsWith("/")) return join(output, rel, "index.html");
  return join(output, rel);
}
for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const target = localTarget(match[1]);
    if (target && !await exists(target)) errors.push(`broken local reference in ${relative(output, htmlFile)}: ${match[1]}`);
  }
}

if (errors.length > 0) {
  console.error(errors.slice(0, 200).map((error) => `- ${error}`).join("\n"));
  if (errors.length > 200) console.error(`...and ${errors.length - 200} more errors`);
  process.exit(1);
}
console.log(`Build valid: ${htmlFiles.length} HTML files, ${canonicalRoutes.length} canonical routes, legacy JSON preserved.`);
