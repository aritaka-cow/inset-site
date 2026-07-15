import type { APIRoute } from "astro";
import { renderLegacyLegal } from "@/data/legacy";
export const prerender = true;
export const GET: APIRoute = () => new Response(renderLegacyLegal("terms"), { headers: { "Content-Type": "text/html; charset=utf-8" } });
