---
schema_version: 1
initiative: inset-web
revision: HD-0004
status: implemented
product_definition_revision: PD-0001
experience_spec_revision: EX-0004
visual_revision: VD-0004
updated: 2026-07-16
---

# Inset Web Design Handoff

## Visual source of truth

- Pencil: `/Users/aritakakanazawa/projects/App/Inset/inset-site/design/inset-web.pen`
- Desktop Home: `L6sy4u` — `SELECTED · VD-0004 · SCR-001 FLOW-001 · JA Home Desktop · Quiet Gallery Refined`
- Mobile Home: `zyzpR` — `SELECTED · VD-0004 · SCR-001 FLOW-001 · JA Home Mobile · Quiet Gallery Refined`
- Save confirmed: 2026-07-15 20:19:13 JST through Pencil `File > Save`; the title no longer showed `Edited`, and the file was 283254 bytes.

## Approved design inputs

- Product Definition: `PD-0001`
- Experience Specification: `EX-0004`
- Visual direction: Quiet Gallery Refined
- Dials: `DESIGN_VARIANCE 6 / MOTION_INTENSITY 4 / VISUAL_DENSITY 3`
- External skill snapshots: `design-taste-frontend` current at `b17742737e796305d829b3ad39eda3add0d79060`; `design-system-auditor` current at `0872b4a7763145fc0e5847d8357fb446a857c683`.

## Home sequence

1. Header
2. Hero with App Store and disabled Google Play `Coming Soon`
3. Layers and full-resolution block with real iOS screen in the official iPhone 17 bezel and a black-white-photo result mat
4. Presets and batch block with direct functional copy and three distinct photographs
5. Creative Frames block with approved 35mm, polaroid, white film, and black film outputs and no product UI screenshot
6. FAQ, including free-versus-Lab and Android status
7. Inset icon plus store actions, without a closing marketing headline
8. Footer

## Asset provenance

- App icon: public Inset app icon asset.
- Device proof: `design/assets/inset-web-vd0004-device-composite.png`, built from the official Apple iPhone 17 bezel and `docs/design-reference/ios/v1.2.1/ios-ja-stack.png`. The screenshot uses the center-connected transparent screen region as its exact mask at the official `1206 × 2622` geometry, so no rectangular screenshot corner crosses the bezel.
- Water proof: `design/assets/inset-web-vd0004-water-glass-raw.png`, cropped only to the verified photo window from the approved real app-render `letterbox-original-3x2-paywall8.png`; a second app-render of the same photo validated the crop. Pencil adds an outer black mat and inner white mat as separate layers.
- Creative Frames: four approved real outputs recreated with the product's actual frame assets and the approved v1.2 renderer geometry: 35mm Black 2:3, Polaroid White 3:2, Film White 9:16, and Film Black 1:1.
- Other photographs match the user-approved concept and remain separate across each rendered Home page.

## Validation performed

- Exact active Pencil path verified before editing.
- Desktop and mobile root frames completed with `placeholder:false`.
- `snapshot_layout` returned no layout, clipping, or overflow problems for either selected frame after the revision.
- Representative screenshots reviewed for the full desktop and mobile pages plus the official-screen-mask iPhone composite, black-white-photo output mat, and four-type Creative Frames gallery.
- Contrast: `#1A1A18` on `#FBFAF6` = 16.688:1; `#74726B` on `#FBFAF6` = 4.61:1; `#74726B` on white = 4.814:1. Small visible labels were moved off `#AAA69D`; disabled Google Play text remains intentionally disabled.
- Mobile menu and language targets are 44 × 44; store controls and FAQ rows exceed 44px height. Desktop navigation target frames are 44px high.

## Implementation notes

- The Google Play treatment is a disabled status, not a link or install action. It must have no `href`, no click handler, and no Android availability structured-data claim.
- Do not reintroduce a standalone Home pricing summary. The Home answer belongs in FAQ; the dedicated Pricing route remains in scope.
- Do not add copy above the final store actions.
- Keep the three capability blocks in this order and preserve their benefit-plus-function explanations.
- Do not reintroduce the standalone chandelier/window photograph between the Hero and the first capability block on either viewport.
- Keep the finished water photograph in three visible layers on both desktop and mobile: black outer mat, white inner mat, approved photo.
- Build the Creative Frames block from the approved 35mm, polaroid, white film, and black film outputs, not the previous Letterbox-only gallery or product UI screenshots.
- Use static semantic HTML for headings, explanations, FAQ, store links, and language navigation.
- Motion is optional and must reduce to the same static composition under `prefers-reduced-motion`.

## Implementation status

- Astro 7 static output now owns the bilingual Home, Features, How it works, Frames, Pricing, FAQ, Support, Privacy, Terms, Releases index/detail, and locale-aware 404 routes.
- All visible Home photographs are unique. The four Creative Frame examples are deterministic renders using published Inset frame assets and product parameters, generated by `scripts/render-site-frame-assets.swift`.
- The iPhone proof uses the approved exact-mask composite; no screenshot corner crosses the device bezel.
- Store, menu, and FAQ icons are inline SVG, so the site ships no icon font and no executable JavaScript on the primary pages.
- `wrangler.jsonc`, `wrangler.www.jsonc`, `_headers`, and `_redirects` implement Workers Static Assets, a dedicated `www` 301 Worker, security and cache headers, preview noindex, true 404s, and exact legacy `.html` compatibility.
- `docs/cloudflare-tooling.md` records the installed toolchain and the intentionally deferred tools.

## Implementation validation

- Production and GitHub Pages builds completed with 47 checked source files, zero errors/warnings/hints, 38 generated HTML files, and 28 canonical routes.
- Wrangler dry-runs validated 130 static assets and the 0.45 KiB `www` redirect Worker before deployment.
- Exact legacy HTML and JSON URLs returned 200; missing English and Japanese routes returned locale-correct 404 pages with `noindex`.
- Live `inset.page` routes now serve from `inset-site`; `www.inset.page` returns a one-hop 301 while preserving path and query. Cloudflare created active Custom Domains, DNS records, and TLS certificates for both hosts.
- Browser QA covered 390px, 430px, 1280px, and 1440px layouts, with no horizontal overflow, repeated Home image source, or executable page script.
- Approved Pencil and implementation screenshots were compared for Hero composition, capability order, typography, spacing, imagery, and mobile behavior.

## Known limitations

- `export_nodes` failed for the tall selected frames with Pencil's generic `probably referencing the wrong .pen file` error even while the correct editor was active. Structural and visual QA used `snapshot_layout` and `get_screenshot` instead.
- After the final save, Computer Use still showed the project-owned `inset-web.pen` window while Pencil MCP `get_editor_state` reported another Pencil window. Every edit and QA call used the absolute approved `filePath`; the foreground Inset window lost its `Edited` marker and the project file mtime/size were confirmed independently.
- AI Crawl Control, Web Analytics, and Google Search Console still require their production follow-up configuration.
- The original local main worktree still contains unrelated or pre-existing changes and remains untouched. Domain work is isolated on `codex/inset-page-domain` from the latest remote main.

## Next launch checkpoint

- Enable Web Analytics, align AI Crawl Control with `robots.txt`, create the Search Console Domain property, and submit `https://inset.page/sitemap.xml`.
