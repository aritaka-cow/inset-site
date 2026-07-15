import roadmap from "../../roadmap.json";

export const prerender = true;
export function GET() {
  return new Response(`${JSON.stringify(roadmap, null, 2)}\n`, { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=600" } });
}
