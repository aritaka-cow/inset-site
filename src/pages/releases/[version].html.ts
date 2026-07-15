import type { APIRoute, GetStaticPaths } from "astro";
import { releases, type ReleaseEntry } from "@/data/releases";
import { renderLegacyRelease } from "@/data/legacy";
export const prerender = true;
export const getStaticPaths = (() => releases.map((release) => ({ params: { version: release.version }, props: { release } }))) satisfies GetStaticPaths;
export const GET: APIRoute<{ release: ReleaseEntry }> = ({ props }) => new Response(renderLegacyRelease(props.release), { headers: { "Content-Type": "text/html; charset=utf-8" } });
