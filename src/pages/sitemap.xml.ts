import { releases } from "@/data/releases";
import { releasePath, routeKeys, pathFor, siteOrigin } from "@/data/site";

export const prerender = true;
const escapeXml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
export function GET() {
  const routes = routeKeys.flatMap((key) => [pathFor(key, "en"), pathFor(key, "ja")]);
  const releaseRoutes = releases.flatMap((release) => [releasePath(release.version, "en"), releasePath(release.version, "ja")]);
  const urls = [...routes, ...releaseRoutes].map((path) => `  <url><loc>${escapeXml(new URL(path, siteOrigin).href)}</loc></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
