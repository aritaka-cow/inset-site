# Cloudflare tooling for inset.app

Updated: 2026-07-15

## Installed and recommended now

| Tool | Role | Decision |
|---|---|---|
| Node.js 24.14.0 + npm | Reproducible local and CI runtime | Pinned with `.nvmrc` and `.node-version` |
| Astro 7 | Static, crawlable HTML generation | Installed locally |
| TypeScript + `astro check` | Source and content type checks | Installed locally |
| Wrangler 4 | Local Cloudflare runtime, dry runs, preview versions, production deploys | Installed locally and version-pinned |
| html-validate | Generated HTML and basic accessibility checks | Installed locally |
| `cwebp` + ImageMagick | Deterministic product-image compositing, WebP conversion, and visual contact sheets | Already available locally; the frame renderer uses `cwebp` |
| Cloudflare MCP | Documentation lookup and account-level investigation from Codex | Keep the existing integration; it complements Wrangler |

Use the project-local binaries through npm scripts. A global Wrangler install is not required.

```sh
nvm use
npm ci
npm run build
npm run preview
npm run deploy:dry-run
```

`npm run preview` builds a noindex preview and serves the same Workers Static Assets configuration used in production. `npm run deploy` changes Cloudflare state and should be run only for an intentional release.

## Useful later, but not needed for the initial static site

| Tool or service | Add when | Why it is deferred |
|---|---|---|
| `cloudflared` | A phone or external reviewer needs temporary access to a local build | Wrangler already covers accurate local runtime testing; a tunnel adds no value to normal development |
| Cloudflare Observatory | The production hostname is live | Measures Lighthouse and field-oriented performance without adding a package to the repository |
| Cloudflare Web Analytics | Immediately after the production domain is connected | Gives privacy-oriented traffic and Core Web Vitals measurement; no PostHog web SDK is needed initially |
| Lighthouse CI | Performance regressions need a hard CI budget | Browser availability and network variation make it better as a second-stage CI gate |
| `@cloudflare/vitest-pool-workers` | Worker code, bindings, or APIs are added | The current site has no Worker runtime logic to test |
| `cloudflare:test` / Miniflare APIs | Low-level Worker behavior needs direct tests | Wrangler already includes the local runtime required by this static site |

Do not add `@astrojs/cloudflare`, the Cloudflare Vite plugin, direct Miniflare, or C3 for the current architecture. Those are useful for SSR or Worker-backed applications, while this site deliberately outputs static HTML.

## Cloudflare Workers Builds setup

Create or connect a Worker named `inset-site`; its name must match `wrangler.jsonc`.

- Production branch: `main`
- Root directory: repository root
- Build command: `npm run build`
- Production deploy command: `npx wrangler deploy`
- Non-production deploy command: `npx wrangler versions upload`
- Preview URLs: enabled

The `_headers` file applies `X-Robots-Tag: noindex, nofollow` to `workers.dev` version URLs. Preview builds also use a noindex meta tag when run through `npm run build:preview`.

Before production launch:

1. Deploy with the `inset.app` Custom Domain declared in `wrangler.jsonc`; Cloudflare creates the required DNS record and certificate.
2. Add a permanent redirect from `www.inset.app` to the apex domain.
3. Keep the ordinary `workers.dev` alias disabled; retain version preview URLs for review.
4. Configure AI Crawl Control to allow search and user-invoked agents, and block training-only crawlers according to the launch policy.
5. Enable Web Analytics, then add the domain property and sitemap in Google Search Console.

## Compatibility contract

Workers Static Assets normally redirects `/file.html` to `/file`. The app and old public links require the exact `.html` URLs to remain usable, so `public/_redirects` internally proxies each known legacy URL with status 200. The clean canonical pages remain under `/privacy/`, `/terms/`, and `/releases/<version>/`.

The following must remain regression-tested:

- `/announcements.json`
- `/roadmap.json`
- `/privacy.html`
- `/terms.html`
- `/roadmap.html`
- `/releases/1.0.0.html` through `/releases/1.2.1.html`

## Official references

- [Workers Static Assets best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)
- [Astro on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
- [Install and update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/)
- [Preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/)
- [Static HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
- [Static redirects and proxying](https://developers.cloudflare.com/workers/static-assets/redirects/)
- [Static response headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/)
- [Web Analytics](https://developers.cloudflare.com/web-analytics/get-started/)
- [Observatory](https://developers.cloudflare.com/speed/observatory/)
- [Workers testing](https://developers.cloudflare.com/workers/testing/)
