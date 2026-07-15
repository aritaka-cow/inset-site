import announcements from "../../announcements.json";

export const prerender = true;
export function GET() {
  return new Response(`${JSON.stringify(announcements, null, 2)}\n`, { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=600" } });
}
