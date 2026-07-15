import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { HtmlValidate } from "html-validate";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, process.env.OUT_DIR || "dist");
const base = (process.env.SITE_BASE || "/").replace(/\/$/, "");
const errors = [];
const pageKeys = ["features", "how-it-works", "frames", "pricing", "faq", "support", "privacy", "terms", "releases"];
const versions = ["1.0.0", "1.1.0", "1.2.0", "1.2.1"];
const canonicalRoutes = ["/", "/ja/", ...pageKeys.flatMap((page) => [`/${page}/`, `/ja/${page}/`]), ...versions.flatMap((version) => [`/releases/${version}/`, `/ja/releases/${version}/`])];
const expectedFiles = [
  "index.html", "ja/index.html", "404.html", "ja/404.html", "ja/404/index.html", "announcements.json", "roadmap.json", "roadmap.html", "privacy.html", "terms.html", "robots.txt", "sitemap.xml",
  ...pageKeys.flatMap((page) => [`${page}/index.html`, `ja/${page}/index.html`]),
  ...versions.flatMap((version) => [`releases/${version}/index.html`, `ja/releases/${version}/index.html`, `releases/${version}.html`]),
  "images/app-icon.png", "images/hero-finished.webp", "images/device-composite.webp", "images/water-glass.webp",
  "images/batch-branch.webp", "images/batch-lamp.webp", "images/batch-chair.webp",
  "images/frame-35mm-black.webp", "images/frame-polaroid-black.webp", "images/frame-polaroid-white.webp", "images/frame-film-white.webp"
];

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
for (const route of canonicalRoutes) {
  const file = route === "/" ? join(output, "index.html") : fileForRoute(route);
  if (!await exists(file)) { errors.push(`canonical route is missing: ${route}`); continue; }
  const html = await readFile(file, "utf8");
  const locale = route.startsWith("/ja/") ? "ja" : "en";
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`title missing: ${route}`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`description missing: ${route}`);
  if (!/<h1[\s>]/.test(html)) errors.push(`H1 missing: ${route}`);
  const canonical = `https://inset.app${route}`;
  if (!html.includes(`rel="canonical" href="${canonical}"`)) errors.push(`canonical mismatch: ${route}`);
  if (!html.includes('hreflang="x-default"')) errors.push(`x-default missing: ${route}`);
  if (!html.includes(`lang="${locale}"`)) errors.push(`document language mismatch: ${route}`);
  if (html.includes("1.2.2")) errors.push(`unpublished version appears: ${route}`);
}

const announcementsSource = JSON.parse(await readFile(join(root, "announcements.json"), "utf8"));
const announcementsBuild = JSON.parse(await readFile(join(output, "announcements.json"), "utf8"));
if (JSON.stringify(announcementsSource) !== JSON.stringify(announcementsBuild)) errors.push("announcements.json build output changed wire values");
const roadmapSource = JSON.parse(await readFile(join(root, "roadmap.json"), "utf8"));
const roadmapBuild = JSON.parse(await readFile(join(output, "roadmap.json"), "utf8"));
if (JSON.stringify(roadmapSource) !== JSON.stringify(roadmapBuild)) errors.push("roadmap.json build output changed wire values");

const sitemap = await readFile(join(output, "sitemap.xml"), "utf8");
for (const route of canonicalRoutes) if (!sitemap.includes(`https://inset.app${route}`)) errors.push(`sitemap route missing: ${route}`);

function localTarget(href) {
  if (!href || /^(?:https?:|mailto:|tel:|#|data:)/.test(href)) return null;
  const path = href.split(/[?#]/, 1)[0];
  let normalized = path;
  if (base && normalized.startsWith(`${base}/`)) normalized = normalized.slice(base.length);
  if (!normalized.startsWith("/")) return null;
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
