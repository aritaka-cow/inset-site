import { readFile, readdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { HtmlValidate } from "html-validate";

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
const appStoreCampaignUrl = "https://apps.apple.com/app/apple-store/id6776488290?pt=128992117&ct=inset_web_202607&mt=8";
const errors = [];
const pageKeys = ["features", "how-it-works", "frames", "pricing", "faq", "support", "privacy", "terms", "releases"];
const versions = ["1.0.0", "1.1.0", "1.2.0", "1.2.1"];
const canonicalRoutes = ["/", "/ja/", ...pageKeys.flatMap((page) => [`/${page}/`, `/ja/${page}/`]), ...versions.flatMap((version) => [`/releases/${version}/`, `/ja/releases/${version}/`])];
const expectedFiles = [
  "index.html", "ja/index.html", "404.html", "ja/404.html", "ja/404/index.html", "announcements.json", "roadmap.json", "roadmap.html", "privacy.html", "terms.html", "robots.txt", "sitemap.xml", "_redirects",
  ...pageKeys.flatMap((page) => [`${page}/index.html`, `ja/${page}/index.html`]),
  ...versions.flatMap((version) => [`releases/${version}/index.html`, `ja/releases/${version}/index.html`, `releases/${version}.html`]),
  "images/app-icon.png", "images/hero-finished.webp", "images/device-composite.webp", "images/water-glass.webp",
  "images/og-home-en.png", "images/og-home-ja.png",
  "images/batch-branch.webp", "images/batch-lamp.webp", "images/batch-chair.webp",
  "images/frame-35mm-black.webp", "images/frame-polaroid-black.webp", "images/frame-polaroid-white.webp", "images/frame-film-white.webp",
  "images/frame-letterbox-round-border.webp", "images/frame-letterbox-original.webp",
  "store-badges/app-store-en.svg", "store-badges/app-store-ja.svg"
];

const homeSocialMeta = new Map([
  ["/", {
    image: `${siteOrigin}/images/og-home-en.png?v=a73844c8`,
    alt: "Inset's frame-layer editor shown in an iPhone beside the headline ‘Frames, layered your way.’"
  }],
  ["/ja/", {
    image: `${siteOrigin}/images/og-home-ja.png?v=983a897f`,
    alt: "iPhoneに表示したInsetの余白レイヤー編集画面と「フレームを、思いのままに。」という見出し"
  }]
]);

const approvedSocialAssetHashes = new Map([
  ["images/og-home-en.png", "a73844c809866229559d60aa9e346c5fc3195a4f4d7b39c8dc9b25a767ad36e5"],
  ["images/og-home-ja.png", "983a897f0878b2933469d36602a0e22a5c518d8486ea04ae583675823d547491"]
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
const expectedTrackingRedirects = ["en", "ja"].flatMap((locale) => ["hero", "closing", "pricing", "support"].map((placement) => `/go/app-store/${locale}/${placement} ${appStoreCampaignUrl} 302`));
const trackingRedirects = redirects.split(/\r?\n/).filter((line) => line.startsWith("/go/app-store/"));
if (trackingRedirects.length !== expectedTrackingRedirects.length) errors.push(`App Store redirect count mismatch: expected ${expectedTrackingRedirects.length}, received ${trackingRedirects.length}`);
for (const redirect of expectedTrackingRedirects) if (!trackingRedirects.includes(redirect)) errors.push(`App Store redirect missing: ${redirect.split(" ")[0]}`);

const legacyCanonicals = new Map([
  ["privacy.html", `${siteOrigin}/privacy/`],
  ["terms.html", `${siteOrigin}/terms/`],
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
