import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const announcements = JSON.parse(await readFile(join(root, "announcements.json"), "utf8"));
const roadmap = JSON.parse(await readFile(join(root, "roadmap.json"), "utf8"));
const errors = [];

if (announcements.version !== 1) errors.push("announcements.version must remain 1");
if (!Array.isArray(announcements.announcements) || announcements.announcements.length === 0) errors.push("announcements must be a non-empty array");

const ids = new Set();
for (const item of announcements.announcements ?? []) {
  if (!item.id || ids.has(item.id)) errors.push(`announcement id is missing or duplicated: ${item.id ?? "(missing)"}`);
  ids.add(item.id);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date ?? "")) errors.push(`invalid announcement date: ${item.id}`);
  if (!item.title?.en || !item.body?.en) errors.push(`English title/body required: ${item.id}`);
  if (item.type === "release" && !item.appVersion) errors.push(`appVersion required for release: ${item.id}`);
  if (item.url && !item.url.startsWith("https://")) errors.push(`announcement URL must use HTTPS: ${item.id}`);
}

if (roadmap.status !== "retired" || !roadmap.message?.en || !roadmap.message?.ja) errors.push("roadmap.json retired wire contract changed");

const expectedVersions = ["1.0.0", "1.1.0", "1.2.0", "1.2.1"];
const announcementVersions = new Set((announcements.announcements ?? []).filter((item) => item.type === "release").map((item) => item.appVersion));
for (const version of expectedVersions) {
  if (!announcementVersions.has(version)) errors.push(`missing release announcement: ${version}`);
  try { await stat(join(root, `releases/${version}.html`)); } catch { errors.push(`missing legacy release source: ${version}.html`); }
}

async function walk(directory) {
  const paths = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await walk(path));
    else paths.push(path);
  }
  return paths;
}

for (const path of await walk(join(root, "src"))) {
  if (![".ts", ".astro", ".mjs", ".css"].includes(extname(path))) continue;
  const source = await readFile(path, "utf8");
  if (source.includes("1.2.2")) errors.push(`unpublished 1.2.2 appears in production source: ${path.slice(root.length + 1)}`);
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`Content contract valid: ${announcements.announcements.length} announcements, ${expectedVersions.length} public releases.`);
