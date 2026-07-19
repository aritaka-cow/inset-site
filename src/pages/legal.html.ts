import type { APIRoute } from "astro";
import { renderLegacyLegal } from "@/data/legacy";

export const GET: APIRoute = () => new Response(renderLegacyLegal("legal"), { headers: { "Content-Type": "text/html; charset=utf-8" } });
