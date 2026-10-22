---
covers: ["src/utils/axiosCalls.js", "next.config.js", "src/middleware.js", "src/app/lib/**", "src/utils/getVariant.js"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# 14 Performance

Home of the caching, rendering and bundle facts. The request path these apply to is in [ARCHITECTURE](ARCHITECTURE.md#request-path-cloudflare-pages).

## Budgets

> [!TODO]
> No performance budgets exist. Nothing in the repo sets one: no budget config, no bundle-size check, no Lighthouse config, no CI. The observed numbers under [Known Hot Paths](#known-hot-paths) are the only baseline. A human needs to set the targets, such as First Load JS per route or a response-time goal.

Until targets exist, treat a change that raises a route's First Load JS in the `npm run build` route table as a regression to explain ([DEVELOPMENT](DEVELOPMENT.md#build--preview-verification)).

## Fetching Strategy

- **Parallel loaders.** Each page awaits one `src/app/lib/*-data.js` loader, and the loader starts its getters together with `Promise.all`. For example, `src/app/lib/pricing-data.js:getPricingPageData` starts eight. Dependent calls run in a second `Promise.all` after the first: `src/app/lib/integration-data.js:getIntegrationsPageData` needs the app details before it can ask for blogs, videos and templates. Keep new requests inside the existing `Promise.all`, and don't add a sequential `await`.
- **No streaming or pagination of page data.** A page renders only after every request in its loader has settled. The only paging is the app grid: `src/utils/axiosCalls.js:getApps` sends `limit`/`offset` with `APPERPAGE` (45, `src/const/integrations.js`), driven by `/integrations[/category/<c>]/page/<n>`. <!-- verify:ignore -->

### Cache layers

| Layer | Where | TTL / rule |
|---|---|---|
| Cloudflare zone cache | Cloudflare dashboard (not in the repo) | Observed `max-age=10800` (3 h) on `/`, `/sitemap.xml` and `/llms.txt` on production on 2026-10-21. Local and test have no such rule, so check changes on production ([current-infrastructure/cloudflare](current-infrastructure/cloudflare.md)). |
| `axios-cache-interceptor` | `src/utils/axiosCalls.js` (`setupCache(axios)` at module scope, as `axiosWithCache`) | In memory, per worker isolate, so each isolate keeps its own copy and a cold isolate always fetches. Every call sets `interpretHeader: false`, which means upstream `cache-control` headers are ignored. Nothing invalidates entries early: a table edit shows up after the TTL or a redeploy. |
| `fetch` cache / ISR | none | There are no `revalidate` exports, `next: {}` fetch options or `unstable_cache` calls. <!-- verify:ignore --> Don't assume Next.js data caching. |
| React `cache()` | `src/utils/getVariant.js:getVariant` | Lasts one request, so `generateMetadata` and the page agree on the variant. |

TTLs in `src/utils/axiosCalls.js`:

| TTL | Functions |
|---|---|
| 20 min | `getDataFromTable` (every table getter in `src/utils/getData.js`), `getIndustries`, `getDepartments`, `getApps`, `getUsecases`, `getCombos`, `fetchPluginData`, `getMeta`, `getFaq`, `getAppCount`, `getClientStories` |
| 1 h | `getBlogs`, `getVideos`, `getActionLayerBlogs` (both the RSS feed and each post page) |
| library default (no `ttl` passed) | `getLiveSupportData` |
| **not cached** (plain `axios`) | `getTemplates`, and the A/B calls `getAbTestVisitorRows`, `saveAbTestVisit` and `updateAbTestVisit`. The A/B calls skip the cache on purpose, because they read and write per-visitor rows. |

> [!WARNING]
> `getTemplates` fetches the whole `templates/all` list from the plug service on **every** request, with no cache. The `/automations` and `/automations/[...slug]` loaders call it (`src/app/lib/automation-data.js`), and so do `/departments/[slug]` (`src/app/lib/department-data.js`), the app and app-pair branches of `src/app/lib/integration-data.js`, and `src/app/lib/data.js:getHomePageData`. `src/app/lib/automationSlugResolver.js:resolveAutomationSlug` then filters the list in memory. If you add a caller, expect one full template download per page view. Adding a cache would change how fast template edits appear, so that is a behaviour change, not a cleanup.

## Rendering

- **Edge SSR on every request.** Every route is `ƒ` (dynamic) in the build route table, and every dynamic `page.js` exports `runtime = 'edge'` ([ARCHITECTURE](ARCHITECTURE.md#why-export-const-runtime--edge-is-everywhere)). Nothing is statically generated except the two `success` pages and `/_not-found` (`○`). <!-- verify:ignore --> The `cookies()` reads in `NavbarServer` and `getHasToken` would keep pages dynamic even without the runtime export.
- **Full page loads.** `src/app/providers.js:AppProvider` turns every internal link click into `window.location.href`, so there is no `next/link` prefetch and no client-side transition. The visitor sees the full-page `Skeleton` while the next page renders on the server. Route-level code-splitting only affects the first load.
- **The static homepage.** `/` is `public/new-home/index.html` with one stylesheet and one script (`styles.css?v=…`, `main.js?v=…`). It loads no React, Tailwind or `global.scss`. Bump the `?v=` query when you change those files, or Cloudflare and browsers keep serving the old copy.
- **Images are unoptimized.** `next.config.js` sets `images.unoptimized: true`, so `next/image` serves the original file with no resizing or format conversion. Size and compress images before you add them to `public/`.
- **Little streaming.** There is no `loading.js`, and the only `<Suspense>` boundaries wrap the `useSearchParams` readers in `AddToProductPage.js` and `IntegrationsIndexPage.js`. About 180 files are `'use client'` ([ARCHITECTURE](ARCHITECTURE.md#rendering-strategy--boundaries)). <!-- verify:ignore -->

## Known Hot Paths

First Load JS from the `npm run build` route table at `17b99cd8` plus the working-tree cleanup. Shared by all routes: **102 kB**.

| Route | First Load JS | Note |
|---|---|---|
| `/` (`src/app/page.js`) | 373 kB | Built but never served: the rewrite serves the static homepage instead |
| `/home` | 309 kB | Unreachable (middleware 307s to `/`) |
| `/automations/[...slug]`, `/integrations`, `/integrations/[...slug]` | 289 kB | Heaviest live routes |
| `/automations` | 286 kB | |
| `/integrations-script` | 281 kB | |
| most legacy pages (pricing, experts, embed, mcp, migration, legal) | 246–257 kB | Shared navbar, footer and legacy component trees |
| `/features`, `/use-cases`, `/new-direction`, `/feedback`, `/signup` | 110–113 kB | The homepage-design pages and the minimal pages |
| `/developers/*` | 107–144 kB | Self-contained sub-app |

- **Lesson (the 105 kB import):** one unused `require('date-fns/locale')` in `src/components/flowComp/iconWrapper.js` added about 105 kB of first-load JS. Removing it took `/` from 480 to 373 kB, `/home` from 416 to 309 kB and `/automations/[...slug]` from 397 to 289 kB ([DECISIONS ADR-014](DECISIONS.md#adr-014-evidence-based-dead-code-cleanup)). Check the route table after you add any import to a shared client component.
- **Production `/` is cached for 3 hours** (`cache-control: public, max-age=10800`), even though middleware sends `no-store` for `/` ([ARCHITECTURE](ARCHITECTURE.md#request-path-cloudflare-pages)). A homepage change can take up to 3 hours to reach visitors unless the Cloudflare cache is purged.
- **`/automations/[...slug]`** combines the heaviest bundle with the uncached `getTemplates` download described above.
