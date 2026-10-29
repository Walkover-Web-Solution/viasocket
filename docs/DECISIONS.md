---
covers: ["*"]
verified_at: 17b99cd8
verified_on: 2026-10-29
---
# Architectural & Design Decisions (ADRs)

Decisions recovered from git history (3,477 commits, 2024-03-12 to 2026-10-15) and from the maintainer's own working notes, cited as **maintainer guidance (2026)**. Read this before you touch hosting, caching, the homepage, tracking or UTM attribution. Each of those areas has already had at least one change shipped and then reverted.

Status values: **Accepted** (current, keep it), **Superseded** (code may remain, but it no longer holds at runtime), **Rejected** (tried and reverted, so do not retry it casually).

## Decision Index

| Date | Decision Record | Status | Area | Key Rationale |
|---|---|---|---|---|
| 2025-02-24 | [ADR-001: Cloudflare Pages + edge runtime](#adr-001-cloudflare-pages-via-next-on-pages-with-the-edge-runtime) | Accepted | Hosting | Production and test both deploy through `@cloudflare/next-on-pages` |
| 2026-01-07 | [ADR-002: Stay on Next 15 / React 18 / next-on-pages](#adr-002-stay-on-next-15--react-18--next-on-pages-reject-next-16-and-opennextjscloudflare) | Accepted | Hosting / deps | Two Next 16 attempts and two OpenNext attempts were reverted |
| 2026-01-06 | [ADR-003: App Router](#adr-003-migrate-from-the-pages-router-to-the-app-router) | Accepted | Routing | It took three tries to land |
| 2025-06-03 | [ADR-004: Content from table-api](#adr-004-site-content-lives-in-table-api-not-in-the-repo) | Accepted | Data | Non-developers edit content; requests go through `axiosCalls.js` |
| 2025-02-24 | [ADR-005: Blog from a table, not `_posts`](#adr-005-blog-content-from-a-table-not-from-_posts-mdx) | Accepted | Content | The `fs`-based blog pages were deleted during the edge move |
| 2026-07-21 | [ADR-006: Homepage A/B test](#adr-006-ab-test-the-homepage-with-a-variant-cookie) | Superseded by ADR-008 at `/` | Growth | Split the homepage between variants A and B |
| 2026-09-25 | [ADR-007: Browser-written tracking cookies, `/` sent no-store](#adr-007-tracking-cookies-are-written-by-the-browser-and--is-sent-no-store) | Accepted | Caching / tracking | Cloudflare strips `Set-Cookie` and caches HTML |
| 2026-10-13 | [ADR-008: `/` is the static `public/new-home` site](#adr-008-serve--from-the-static-site-in-publicnew-home) | Accepted | Homepage | The new homepage renders without the old route, its variants or the global CSS |
| 2026-08-18 | [ADR-009: Tracking runs in every environment](#adr-009-tracking-runs-in-local-test-and-production) | Accepted | Analytics | "Only production hits" was reverted |
| 2026-09-30 | [ADR-010: Native sitemap; robots from env flag](#adr-010-native-app-router-sitemap-robots-decided-by-the-env-flag) | Accepted | SEO | next-sitemap never ran |
| 2026-10-01 | [ADR-011: `/embed` and `/mcp` redirects](#adr-011-embed--developers-and-mcp--mushroomsviasocketcom) | Accepted | Routing / SEO | Products moved; sitemap lists final URLs only |
| 2025-02-26 | [ADR-012: UTM attribution conventions](#adr-012-utm-attribution-conventions) | Accepted | Signup attribution | Keeps paid and external attribution intact |
| 2026 | [ADR-013: Working conventions](#adr-013-working-conventions-maintainer-guidance) | Accepted | Process | Diffs are reviewed closely and out-of-scope edits get reverted |
| 2026-10-21 | [ADR-014: Evidence-based dead-code cleanup](#adr-014-evidence-based-dead-code-cleanup) | Accepted | Maintenance | Unreachable code misled agents and shipped unused bytes |
| 2026-10-22 | [ADR-015: The integration layer is the canonical positioning](#adr-015-the-integration-layer-is-the-canonical-positioning) | Accepted | Product / copy | One story across the site; automation copy is out of date |
| 2026-10-22 | [ADR-016: The static homepage's design system is the site-wide target](#adr-016-the-static-homepages-design-system-is-the-site-wide-target) | Accepted | Design | One visual system instead of five |

---

## ADR-001: Cloudflare Pages via next-on-pages with the edge runtime

### Status
Accepted. The human confirmed on 2026-10-21 that Cloudflare Pages hosts both test and production.

### Context & Problem Statement
Until February 2025 the site had no Cloudflare tooling. Nothing deploys to Vercel hosting (the human confirmed this), but the `vercel` devDependency is **not** leftover: `@cloudflare/next-on-pages` lists it as a peerDependency and runs `vercel build`, writing `.vercel/output/` (see [DEVELOPMENT](DEVELOPMENT.md#pr-workflow--deployment-pipeline)).

### Decision & Implementation
- `package.json` scripts `pages:build` (`npx @cloudflare/next-on-pages`), `preview` and `deploy` use `wrangler pages`, and `wrangler.toml` sets `nodejs_compat`.
- Every server-rendered route and route handler declares `export const runtime = 'edge'`. That is 50 files, for example `src/app/page.js`, `src/app/sitemap.js`, `src/app/robots.txt/route.js` and `src/app/api/track-variant/route.js`.
- `next.config.js` sets `images.unoptimized` and stubs `fs: false` in webpack, because there is no Node filesystem at runtime.

### Supporting Evidence & Past Incidents
- `d552ed0f` (2025-02-24) "THE COMMIT" adds `@cloudflare/next-on-pages`. `3ec3338c`, `1afe3aef` and `c990f146` (same day) introduce `experimental-edge`.
- `3fb42a4d` (2025-02-26) "286 | export const runtime = 'experimental-edge'".
- `279ee030` (2026-01-06) "page to app changes from experimental edge to edge".

### Consequences & Trade-offs
- **Positive:** one hosting platform for test and production, with a Cloudflare zone in front of both.
- **Constraints:** follow the convention that every server-rendered page and route handler exports `runtime = 'edge'`. The only pages without it are `src/app/lifetime-deal/success/page.js` and `src/app/agency-partner/success/page.js`: server components with no request-time data, which the build prerenders as static (`○`). Request code has no Node APIs (`fs`, `path`). The production zone also has cache rules that are not in the repo (see [Incidents](#lessons-learned--incident-log)).

### Superseded / Rejected Alternatives
1. **Vercel hosting:** nothing deploys there (human-confirmed). Keep the `vercel` package; the Cloudflare adapter needs it.
2. **@opennextjs/cloudflare:** see ADR-002.

---

## ADR-002: Stay on Next 15 / React 18 / next-on-pages; reject Next 16 and @opennextjs/cloudflare

### Status
Accepted (the current pins are `next ^15.5.9`, `react ^18.3.1` and `@cloudflare/next-on-pages ^1.13.16`).

### Context & Problem Statement
Between December 2025 and January 2026 the team tried several times to move to Next 16 / React 19, and once to replace next-on-pages with OpenNext. Every attempt was reverted.

### Supporting Evidence & Past Incidents
- `703aff93` / `ac2b7db2` (2025-12-15) "next js upgradation from 14 to 16" was reverted by `f26ecd78` (2025-12-19).
- `5125e708` (2025-12-23) "upgradation to nextjs 16 version" was reverted the same day by `de702203`.
- `bf40a045` (2026-01-07) "debug" switched to `@opennextjs/cloudflare`, `next ^16`, `react ^19`, `output: 'standalone'` and `.open-next/worker`, and added `open-next.config.ts`. `90e5fc7b` "revert to next 15" undid it 15 minutes later but **left `open-next.config.ts` behind**. That file was dead (nothing in `package.json` references OpenNext) and was removed on 2026-10-21. <!-- verify:ignore -->
- Maintainer guidance (2026): in a later session, migrating to `@opennextjs/cloudflare` was proposed as the durable fix for a cookie bug. It touched 43 files to remove the runtime directive and ran Prettier repo-wide, so the maintainer reverted everything except the narrow cookie fix (see ADR-007 and ADR-013).

### Consequences & Trade-offs
- Do not upgrade Next or React, and do not change the adapter, as a side effect of other work. Treat it as its own scoped project and show the size of the diff before starting.
- `c5184b03` (2026-01-07) "bugs fixed (After Next upgradation to 15)" shows that the 14→15 step itself needed follow-up fixes.

> [!TODO]
> No commit records *why* the Next 16 / OpenNext attempts failed. This is listed in [OPEN_QUESTIONS](OPEN_QUESTIONS.md).

---

## ADR-003: Migrate from the Pages Router to the App Router

### Status
Accepted. `src/pages/` no longer exists, and every route is under `src/app/`. <!-- verify:ignore -->

### Supporting Evidence & Past Incidents
- `9a178617` (2025-12-31) was merged in #1286 and reverted by `67c423e2`. `558df1b9` and `279ee030` were merged in #1291 and reverted by `b14233ad`. `f5d90daa` and `d0f84519` (2026-01-06) finally landed.

### Consequences & Trade-offs
- Data loading happens in server components (for example `src/app/lib/data.js:getHomePageData`) instead of `getServerSideProps`. <!-- verify:ignore -->
- Lesson: large migrations here have been merged and reverted several times in one day, so prove the change on `test` before raising the `main` PR.

---

## ADR-004: Site content lives in table-api, not in the repo

### Status
Accepted.

### Decision & Implementation
- Pages, FAQs, footer, navbar, features, testimonials and other content are rows in `table-api.viasocket.com`. Table ids are constants in `src/const/tables.js`. Requests are functions in `src/utils/axiosCalls.js`, for example `src/utils/axiosCalls.js:getDataFromTable`, `getBlogs` and `getFaq`. They are wrapped by `src/utils/getData.js` (for example `getPageData`).
- Responses are memoised in-process with `axios-cache-interceptor` (`setupCache(axios)` in `src/utils/axiosCalls.js`), with fixed TTLs and `interpretHeader: false`.
- Failures are reported through `src/utils/SendErrorMessage.js:sendErrorMessage`.

### Supporting Evidence & Past Incidents
- `ca184ff0` (2025-06-03) "caching and code clean up" collapsed the per-type `getApps.js`, `getCombos.js` and other fetch helpers into `src/utils/axiosCalls.js`. <!-- verify:ignore -->
- `9e452297` (2025-06-04) added `interpretHeader: false` everywhere so that the table's own cache headers do not override the TTLs.
- Maintainer guidance (2026): new table calls must follow this flow, with an id in `src/const/tables.js`, a function in `axiosCalls.js` and `sendErrorMessage`. Base URL, database id and key come from env vars (`NEXT_PUBLIC_DB_ID_<NAME>` / `NEXT_PUBLIC_DB_KEY_<NAME>`), so that each environment can point at a different database. Variable list: [DEVELOPMENT](DEVELOPMENT.md). Endpoints: [CONTRACTS](CONTRACTS.md).

### Consequences & Trade-offs
- Content changes do not need a deploy, but a page is only as fresh as the in-process TTL (20 to 60 minutes) plus any Cloudflare caching.

> [!WARNING]
> `src/utils/axiosCalls.js:abTestTableUrl` hardcodes the tracking database id in the URL. This breaks the "no hardcoded endpoints" rule. Do not copy it; read the id from an env var instead.

---

## ADR-005: Blog content from a table, not from `_posts` MDX

### Status
Accepted.

### Context & Decision
- The original blog was rendered from `_posts/blog/*.mdx` through `fs` (`src/pages/blog/[slug].js` imported `fs`, `gray-matter` and `next-mdx-remote`). <!-- verify:ignore -->
- `08b008a1` (2025-02-24, the same day as the Cloudflare move) deleted all four `src/pages/blog/*` routes. Two days later, "240 | blogs back" (`ba760363`) and "get blog data" (`b9d82e77`) brought back blog *cards* sourced from a table. <!-- verify:ignore -->
- Today `src/utils/getBlogData.js:getBlogData` filters the rows from `src/utils/axiosCalls.js:getBlogs` (key `NEXT_PUBLIC_BLOG_DB_KEY`) by tag. The `/discovery/api/blog` search helper (`getCategoryBlogs`) lost its last caller in `18420492` and was removed on 2026-10-21. <!-- verify:ignore --> Since October 2026, `/integrations`, `/integrations/{app}` and `/features` read the latest "Action Layer for AI Products" posts from the blog's RSS feed instead (`src/utils/axiosCalls.js:getActionLayerBlogs`). There is no `/blog` route in this repo.

### Consequences & Trade-offs
- The commit gives no reason. The most likely one is that the edge runtime cannot use `fs` (ADR-001), but that is an inference.
- The `fs`-based loaders (`src/components/lib/posts.js`, `getPost.js`) had no importer and were removed on 2026-10-21. `_posts/blog/` (37 MDX files) and `public/admin/` remain; do not delete them without confirmation, see [OPEN_QUESTIONS](OPEN_QUESTIONS.md). <!-- verify:ignore -->

---

## ADR-006: A/B test the homepage with a variant cookie

### Status
Superseded by ADR-008 at `/`. The code is still present but is not reached at `/`.

### Decision & Implementation
- `src/const/abTest.js`: `VARIANT_COOKIE = 'variant'`, `VARIANTS = ['A','B']` (30 days). `VISITOR_ID_COOKIE = 'visitor_id'` lasts one year, deliberately longer than the variant.
- `src/utils/getVariant.js:getVariant` reads the cookie, flips a coin if the cookie is missing, and is cached per request so that `generateMetadata` and the page agree. In `src/app/page.js`, variant B renders `src/app/front-page/IndexPageContent.js` with `utmSource="home-B"`.
- Visits and clicks are posted by `src/utils/trackVisitor.js` to `POST /api/track-variant` (`src/app/api/track-variant/route.js`). That route merges a per-visitor profile (`src/utils/abTestVisitor.js`) into one table row.

### Supporting Evidence & Past Incidents
- `22188a01` (2026-07-21) "home banner ab testing". On 2026-07-25, `a29af3b1` removed the variants (#1695 "revert-ab-testing") and `83309272` restored them the same day.
- `753d13ac` (2026-07-29) set the cookie domain to the root domain. `9fc06e52` reverted "Prevent variant cookie overwrite if valid variant already exists".
- `76a3f1f5` / `4a4dd539` / `e2505099` (August 2026) built the visitor-count table, profile merging and bot filtering (`src/utils/isBot.js`).

### Consequences & Trade-offs
- The homepage depended on a per-visitor cookie, so `/` cannot be shared-cached (ADR-007).
- Since ADR-008, nothing at `/` renders a variant. `TrackingCookies` and `VariantTracker` in `src/app/layout.js` still run on every other App Router page.

---

## ADR-007: Tracking cookies are written by the browser, and `/` is sent no-store

### Status
Accepted for the cookies. The `/` cache headers are **ineffective today**: since ADR-008, `/` is the static homepage, and on 2026-10-21 production served it `max-age=10800` from the Cloudflare zone rule regardless of the middleware headers (OPEN_QUESTIONS C-05).

### Context & Problem Statement
In production, `viasocket.com/` came back with `cache-control: max-age=10800` and `cf-cache-status: HIT`. Test returned `DYNAMIC` with no `cache-control`. The cached copies had their `Set-Cookie` stripped, so visitors never received `variant` or `visitor_id`, and one visitor's variant was replayed to everyone. The value `10800` appears nowhere in the repo; it is a Cloudflare zone rule (maintainer guidance, 2026). <!-- verify:ignore -->

### Decision & Implementation
- `src/middleware.js:middleware` sets `Cache-Control: private, no-store, must-revalidate` and `CDN-Cache-Control: no-store` on `/`. Cloudflare honours the second header for its own edge cache.
- Middleware no longer mints the variant or visitor cookies. `src/app/components/VariantTracker/TrackingCookies.js:TrackingCookies` is an inline ES5 script that runs before React and writes both cookies through `document.cookie`, scoped to `.viasocket.com`. It restores a lost `visitor_id` from the `vs_visitor` localStorage mirror. The homepage passes `renderedVariant` so the recorded cookie matches what the visitor saw.

### Supporting Evidence & Past Incidents
- `8caac1f0` (2026-08-24) "bug solve" added the `/` cache headers.
- `588cad8f` (2026-09-25) "cookie handling fixed" deleted the middleware variant/visitor logic (`withCookie` header forwarding, `getVariantCookieDomain`, `mintedCookie` no-store) and added `TrackingCookies`. <!-- verify:ignore -->

### Consequences & Trade-offs
- Cookies now survive any cache in front of the origin. The trade-off is that they do not exist until client JS runs, so server code sees them only from the second request onward.
- The comment in `src/middleware.js` still says the homepage "is still rendered from the variant cookie". Since ADR-008 that is no longer true at `/`.

### Superseded / Rejected Alternatives
1. **Minting cookies in middleware** (July to September 2026) failed because Cloudflare strips `Set-Cookie` from the HTML responses it handles.
2. **Switching adapter to OpenNext to fix it** was rejected as out of scope (ADR-002).

---

## ADR-008: Serve `/` from the static site in `public/new-home`

### Status
Accepted (in production since `12b97eb9`, which merged PR #1831).

### Decision & Implementation
- In `next.config.js`, a `beforeFiles` rewrite maps `/` to `/new-home/index.html`. `public/new-home/` holds `index.html`, `main.js` and `styles.css` (plain HTML, CSS and JS), and it loads the same GTM container as the rest of the site.
- `src/app/page.js`, its A/B variants and `src/app/front-page/*` are therefore **not rendered at `/`**. They are kept on purpose as the rollback path: reverting merge `cfdae23e` on `main` restores the A/B homepage. Retire them once the new homepage has run stably for a few weeks (C-01, decided for now, Team answers to OPEN_QUESTIONS, 2026-10-22).
- **The source of `public/new-home/` is the `viasocket-site` repo** (`variants/simple-bento`). `deploy/export-to-viasocket-repo.py --prod` exports it into this repo and the result is pushed to `test` (D-03, decided). Since 14 October the export runs in production mode for test too, so the page itself carries no `noindex`. <!-- verify:ignore -->

### Supporting Evidence & Past Incidents
- `1f911f58` (2026-10-13) explains the choice: the static site "renders on its own: the old homepage route (src/app/page.js), its A/B variants and the site's global CSS are not involved."
- `a8f48657` (2026-10-14) removed the page-level `noindex` and added a canonical to `https://viasocket.com/`. Test was expected to stay out of search through `src/app/robots.txt/route.js` and Cloudflare's preview noindex header; in fact only the `*.pages.dev` host sends `x-robots-tag: noindex`, and test.viasocket.com does not (D-09, see [current-infrastructure/cloudflare](current-infrastructure/cloudflare.md)).
- Earlier attempts: the redesign was first built in App Router at `src/app/index` (`a2d0e415`, then `5693d3db` reverted the same day, then `dd4d76e1` re-landed it). It was moved to `/front-page` because `index` is reserved (see Incidents), and the `/index` → `/front-page` redirect was removed in `49401a1c`. <!-- verify:ignore -->

### Consequences & Trade-offs
- The static homepage is outside the root layout. It has no `TrackingCookies`, no `VariantTracker`, no `utmData` stamping and no A/B split. Its CTAs link straight to `flow.viasocket.com` and to absolute `viasocket.com` URLs.
- Homepage edits are made in the `viasocket-site` source and exported into `public/new-home/*`, not in React components. A hand edit to `public/new-home/*` is overwritten by the next export unless it is also made in `viasocket-site`. Maintainer guidance from 2026-09 says the redesign lives in `/index` and the old Home is untouched; both pages that guidance names have since been replaced by this site.
- This runs opposite to `d0dff32c` (2026-09-28), which *rebuilt* `/developers` from static `public/developers/*.html` into a native App Router route "so it matches this codebase's own conventions". <!-- verify:ignore -->

- The static homepage is the long-term shape, and its design system is the site-wide target ([ADR-016](#adr-016-the-static-homepages-design-system-is-the-site-wide-target)). Server-side A/B testing of `/` stays off; GTM carries analytics (T-01, recommended).

---

## ADR-009: Tracking runs in local, test and production

### Status
Accepted.

### Decision & Implementation
- Tracking is not gated on production. Every row carries an `environment` column, computed by `getEnvironment` in `src/app/api/track-variant/route.js` from `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT`. If the flag is unset, it falls back to the hostname.
- Maintainer guidance (2026): because all three environments write to the same tables, and test and production share `visitor_id` (scoped to `.viasocket.com`), any read-back must filter on the current environment.
- The exceptions are deliberate: Reddit CAPI only fires in production (`src/utils/axiosCalls.js:trackRedditEvent`, the Reddit block in `src/middleware.js`). Do not copy that gate onto new tracking.

### Supporting Evidence & Past Incidents
- `0b12d4b2` (2026-08-18) "Only production hits" made the route reject non-production events and used an exact `hostname === 'viasocket.com'` fallback. `8ca11b93` reverted it the same day.

### Consequences & Trade-offs
> [!WARNING]
> The revert also undid the exact-hostname check. When the env flag is missing, `getEnvironment` labels **any** `*.viasocket.com` host (including `test.viasocket.com`) as `production`. Maintainer guidance says production must be matched as exactly `viasocket.com`.

> [!WARNING]
> `src/utils/axiosCalls.js:getAbTestVisitorRows` filters by visitor id only, not by environment. Since `77b3dec5` (2026-10-10, "stop get call") it also starts with `return null;`, so `POST /api/track-variant` drops every event with `reason: 'lookup failed'`. **A/B and visit tracking writes are currently off.** The commit gives no reason; see [OPEN_QUESTIONS](OPEN_QUESTIONS.md).

---

## ADR-010: Native App Router sitemap; robots decided by the env flag

### Status
Accepted.

### Decision & Implementation
- `src/app/sitemap.js` lists every statically routed page. Dynamic pages (integrations, MCP, departments and others) are covered by the backend sitemap at `plugservice-api.viasocket.com`.
- robots.txt allows crawling only when `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod'` and the host is not an integration subdomain. The same logic exists twice: `src/app/robots.txt/route.js:GET` and the `prebuild` script `build-utilities/generate-robots-txt.js`, which writes an untracked `public/robots.txt`. <!-- verify:ignore -->

### Supporting Evidence & Past Incidents
- `47f7a5b3` (2026-02-23) "sitemap auto generate with next-sitemap" replaced `build-utilities/generate-sitemap-xml.js`. `a4cf9508` (2026-09-30) found that the next-sitemap CLI never ran (it was not even a dependency), deleted `next-sitemap.config.js` and added the native sitemap. <!-- verify:ignore -->
- On 2026-04-28, the move from build-time to runtime robots (`001eeab1`, `d23b6956`, `6c7f7549`, `1402b2b4`, `d5cbab67`, `dd4abb21`, `b95a3aef`, `46387eac`, `d4b404ce`) was merged and reverted at least six times. `a1a9e1d7` (2026-04-29) "revert the script and robot and route.js" settled on keeping both generators.

### Consequences & Trade-offs
- If you change robots content, change both files. Which of the two wins on Cloudflare is documented in [ARCHITECTURE](ARCHITECTURE.md) and [OPEN_QUESTIONS](OPEN_QUESTIONS.md).

---

## ADR-011: `/embed` → `/developers` and `/mcp` → mushrooms.viasocket.com

### Status
Accepted.

### Decision & Implementation
- In `next.config.js` `redirects()`: `/embed` → `/developers` and `/mcp` → `https://mushrooms.viasocket.com/` are permanent. `/login` → `https://flow.viasocket.com/` is not permanent. Only the bare paths redirect; sub-pages such as `/embed/app-integration` and `/mcp/aiagent` are still served here.
- Since `40bbd9bd` those rules are applied by `src/middleware.js` from the admin redirect list, with `src/data/redirects.json` as the fallback. `next.config.js` no longer defines `redirects()`.
- **Production check, 2026-10-29.** The live admin list does not match this decision for `/embed`. On the production host and on the test host, `GET /embed` returns **301** to `/` with an empty body (not 302, not 308, not an alias). The same list 301s bare `/developers` to `/`. The fallback file still has `/embed` → `/developers` with 308, so an admin outage would serve the decision again. Whether to restore the admin rules or accept the homepage as the target is [OPEN_QUESTIONS P-06](OPEN_QUESTIONS.md). Until that is decided, this ADR stays Accepted as the recorded intent, and [05-navigation](05-navigation.md) records what the hosts actually return.
- `src/app/sitemap.js` leaves out the bare `/embed` and `/mcp`, so that the sitemap points at final destinations only.
- `/help` and every `/help/*` path except `FOOTER_HELP_PAGES` (and pages under them) → `/new-direction`, permanent (301), because "The help centre is retired" (`next.config.js` comment, `b3a7ab32`, 2026-10-20). On production only requests that reach this project are redirected ([OPEN_QUESTIONS P-05](OPEN_QUESTIONS.md#p-05-paths-served-by-other-deployments)).

### Supporting Evidence & Past Incidents
- `791e7c72` (2026-04-06) "/mcp redirection to mashrooms site". The slug-level version (`/mcp/*` → mushrooms) was reverted in `1495613a` (2026-03-30).
- `7fd1dc19` (2026-10-01) "Redirect /embed to /developers, keep sitemap in sync". `d0dff32c` and `057b544f`, `84580df1` and `71439c73` built `/developers`, `/developers/auth`, `/developers/pricing` and `/developers/docs` natively.

---

## ADR-012: UTM attribution conventions

### Status
Accepted (maintainer guidance, 2026; the code paths are verified below).

### Decision & Implementation
- **`utm_source` is the page path** (for example `/integrations` or `/embed`). `src/utils/handleUtmSource.js:isInternalUtmSource` treats empty values, values starting with `/` and the `INTERNAL_UTM_SOURCES` list (`home-A`, `home-B`, `relay-switch-google-ads`) as the site's own. `savePageUtmSource` only overwrites those, so an ad or referral source in the cookie survives. Section-level detail belongs in the CTA tracking event, not in `utm_source`.
- **Attribution travels in the `utmData` cookie** (one day, set by `setCookie`). `setUtmSource` captures `utm_*`, `affiliate_*` and `ref` from the URL into it. A prompt typed on a marketing page goes in `utmData.prompt`, never in `?prompt=`, because the query string leaks it into referrers and analytics.
- **Campaign pages keep their own tag**, for example `relay-switch-google-ads` on `/migration/relay`. `utm_source` must appear once in the signup URL. `src/utils/handleRedirection.js:handleRedirect` with a `customSource` emits it twice (`state={…}&utm_source=…`), so such CTAs should stamp `utmData` and navigate to `/signup?utm_source=<tag>` directly. Keep `handleRedirect` for external apps such as `flow.viasocket.com`.
- **No `www`:** match `viasocket.com` exactly, with no `www.` branch anywhere.

### Supporting Evidence & Past Incidents
- `101b579a` / `c21979b7` (2025-02-26) "291 | utm in cookies". `bc990b27` (2025-04-17) reverted "MAIN | 330 | utm data handling". `6427775c` (2024-11-08) reverted a `fix/utm` change.

---

## ADR-013: Working conventions (maintainer guidance)

| Rule | Why |
|---|---|
| Make the smallest change that does the job. Never run a repo-wide formatter. | Diffs are reviewed line by line. A 43-file Prettier sweep got a whole session reverted (ADR-002). |
| Work on the branch that is checked out; never create or switch branches. | Maintainer instruction. Read other refs with `git show <ref>:<path>`. |
| Keep copy as module constants in the component, shaped like `src/components/footer/NewFooter.js`. | One file to open per section. Do not add a central `content.js`. |
| Use Tailwind utilities; custom CSS only for what Tailwind cannot express. | Details in [DESIGN](DESIGN.md). |
| When porting from another repo, port the design, content and behaviour, not the code. | Keeps the codebase consistent. |
| For tracking bugs, prove the failing layer before editing, and verify with a real write and a cache-busted read. Check production headers too. | See Incidents 1 to 3. |

---

## ADR-014: Evidence-based dead-code cleanup

### Status
Accepted (2026-10-21, during AI-docs preparation; human-approved scope).

### Context & Problem Statement
Agents reading the tree could not tell live code from leftovers: 66 source files had no importer, an unused `date-fns/locale` import added about 105 kB to first-load JS, and two head components rendered nothing.

### Decision & Implementation
- Removed only what had zero references across all seven checks (import graph from every Next entry point, string/registry refs, dynamic imports, routing, flags, CSS, build/static, external consumers): the hire-modal steps, the old integrations section components, the pricing-tabs chain, the `fs`-based blog loaders, unused utils, unimported SCSS modules, the Times Now fonts, root `config.js`, `open-next.config.ts`, and the packages `color`, `fs`, `path`, `gray-matter`, `js-yaml`, `react-google-recaptcha-v3`, `date-fns`. <!-- verify:ignore -->
- Approved refactors: one copy of `LinkButton`/`LinkText` (`src/components/uiComponents/buttons.js`); removed the no-op `next/head` components; removed the unused Open Sans/Rajdhani font imports; `getCountries()` is called without its ignored arguments.
- Verified: build and route list unchanged; 20 routes identical in head tags, JSON-LD, visible text and element/class structure against a pristine checkout; the only CSS change is the two font imports plus 96 utilities that only the deleted files used.

### Consequences & Trade-offs
- Tailwind generates only classes found in `src/**`, so deleting a file can drop utilities. That is safe here because no CMS HTML is injected (every `dangerouslySetInnerHTML` is a script or JSON-LD) and no class names are built from template strings.
- Deliberately kept: the old homepage tree (the rollback path, C-01, decided for now), plus the Decap CMS blog, unreferenced `public/assets/**` and `husky`/`lint-staged`/`prettier`, whose removal the team recommended on 2026-10-22 but has not yet done ([OPEN_QUESTIONS](OPEN_QUESTIONS.md) C-02, C-03, D-08).

---

## ADR-015: The integration layer is the canonical positioning

### Status
Accepted (Team answers to OPEN_QUESTIONS, 2026-10-22: P-01, decided).

### Context & Problem Statement
After the October relaunch the site told two stories: the homepage, `/developers`, `/integrations`, `/features`, `/use-cases` and `/new-direction` said "integration layer for products and AI agents", while the root metadata, `public/llms.txt`, `/pricing` and the campaign pages still sold no-code workflow automation.

### Decision & Implementation
- The integration layer is canonical everywhere. Positioning line: "Integration Layer for your products & agents." Boundary line: "You build the app or agent. viaSocket handles the connections and actions."
- Shipped on `/`, `/features`, `/integrations` and `/use-cases`. Pending: `src/app/layout.js` root `metadata`, `public/llms.txt` and `/pricing` must be updated to match (and `/pricing` may redirect to `/developers/pricing`, P-03, proposed).

### Supporting Evidence & Past Incidents
- The founders' letter at `/new-direction` (`b3a7ab32`) and the homepage and redesign commits (`1f911f58`, `18420492`, `0705e2f0`).

### Consequences & Trade-offs
- Copy that still says "workflow automation" is a bug to fix when touched, not an alternative positioning to preserve. Agents should flag it rather than extend it.
- ICP and success metrics are proposed, not approved ([VISION](VISION.md#target-audience--ideal-customer-profile-icp)).

---

## ADR-016: The static homepage's design system is the site-wide target

### Status
Accepted (Team answers to OPEN_QUESTIONS, 2026-10-22: U-01, decided). U-07 (accepting the `addToProduct` `copy.js` and SCSS module for now) is proposed, pending the maintainer.

### Context & Problem Statement
The site had five visual systems ([DESIGN](DESIGN.md)): legacy daisyUI + SCSS, the static homepage, `/developers`, the dormant front-page and the `addToProduct` pages.

### Decision & Implementation
- The static homepage's system is the target for the rest of the site: Geist and Geist Mono, its colour tokens, square corners, and light/dark following the OS. The full rules live in the external "viaSocket Brand Guidelines" doc.
- The `addToProduct` pages carried that design into Next quickly through a shared `copy.js` and a SCSS module; that is accepted for now (proposed) and revisited when the design system becomes Tailwind tokens.

### Consequences & Trade-offs
- New or reworked pages should converge on these tokens (expressed as Tailwind tokens per [DESIGN](DESIGN.md)), not on legacy daisyUI styling.
- This settles the tension noted in ADR-008 between the static homepage and the native `/developers` rebuild: the direction is the homepage look, built natively.

---

## Lessons Learned & Incident Log

1. **The production cache replayed one visitor's homepage.**
   - **Root cause:** a Cloudflare zone rule (`max-age=10800`) cached `/` on production only and stripped `Set-Cookie`. Local and test behaved correctly.
   - **Prevention:** keep the `/` headers in `src/middleware.js` and browser-written cookies (ADR-007). Before you call cookie or variant behaviour correct, run `curl -D -` against `https://viasocket.com/` and compare `cache-control`, `cf-cache-status`, `vary` and `set-cookie` with test.
2. **Analytics writes were rejected by the table schema.**
   - **Root cause:** the code passed review and the build, but every write failed. The column is `varient`, not `variant`. There is no `user_info` column (the summary lives in `name`) and no `referrer` column. `first_url` and `last_url` are linked-record columns that reject a plain URL and fail the whole row.
   - **Prevention:** `src/utils/abTestVisitor.js:toRowFields` documents the real names and strips `LINKED_RECORD_COLUMNS`. Verify any new column with a real write and read. Reads need a unique cache-buster (`_` param), and the table API has no DELETE, so test rows can only be told apart by `environment`.
3. **The table API returned silently empty pages.**
   - **Root cause:** with `limit=500` it returns zero rows (400 still works).
   - **Prevention:** `ABTEST_LOOKUP_LIMIT = 200` in `src/utils/axiosCalls.js`.
4. **`src/app/index` cannot serve `/index`.** <!-- verify:ignore -->
   - **Root cause:** the App Router names the root route `/index` internally, and the edge routing rewrites `/index` to `/` (this explanation was in the comment removed by `49401a1c`).
   - **Prevention:** never create a route folder named `index`.
5. **First-visit variant mismatch.**
   - **Root cause:** a `Set-Cookie` minted in middleware only reaches the *next* request, so the first render fell back to `VARIANTS[0]` (from the comment removed by `588cad8f`).
   - **Prevention:** `getVariant` flips the coin at render time and `TrackingCookies` records the variant that was rendered.
6. **Revert storms on infrastructure.**
   - **Root cause:** robots.txt (2026-04-28, at least six revert PRs), ConditionalNavbar/Footer flicker (`153e105c`, `99b9c2f4`, `c093ac7b`, April to May 2026), Next 16 (December 2025) and the App Router migration were iterated through merge-and-revert PRs against `test` and `main`, because the behaviour could only be seen on a deployed Cloudflare build.
   - **Prevention:** verify on `test.viasocket.com` before raising the `test`→`main` PR, and keep each infra change in its own PR.
7. **Invented UTM tags poisoned attribution.**
   - **Root cause:** non-path tags such as `index-hero` fail `isInternalUtmSource`. The first click of the day wins and later internal CTAs are refused.
   - **Prevention:** use path-shaped sources only (ADR-012).
8. **Tracking is switched off without a recorded reason.**
   - **Root cause:** `77b3dec5` short-circuits `getAbTestVisitorRows` (ADR-009).
   - **Prevention:** do not assume `/api/track-variant` is recording anything until a live write and read proves it.
