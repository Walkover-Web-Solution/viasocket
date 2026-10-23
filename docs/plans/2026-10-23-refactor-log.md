# Refactor and cleanup log: 2026-10-23

Branch `feat/ai-ready-admin`, based on `origin/test` at `dbc4292c`. This log covers a safe refactor: fixes for confirmed defects, cleanup backed by evidence, and a new route regression check. Nothing was pushed or deployed, and no form was submitted to a production endpoint. The docs agent will update `docs/OPEN_QUESTIONS.md` and the module docs from this log.

## Baseline (before any change)

- **Build:** `npm run build` exit 0 in 33 s (21.5 s on an earlier run). It reports "Compiled with warnings", but the only warnings are the known Sass `@import` deprecations and Node's `url.parse` DEP0169. There are 53 app routes (50 `ƒ`, 3 `○`). Shared First Load JS is 102 kB. Largest routes: `/` 373 kB (the unused rollback page), `/home` 309 kB, `/automations/[...slug]` 290 kB, `/integrations` 289 kB.
- **Route inventory:** 84 URLs, taken from the `src/app` routes plus samples from the production sitemaps. For each URL it records status, location, title, canonical, robots and h1. It ran against a clean `dbc4292c` checkout (`next dev`) and against https://viasocket.com for comparison. Pre-existing findings:
  - **Soft 404s (C-09):** these returned 200 with an error body: `/find-apps/a/slack`, `/find-apps/zz/zz`, `/mcp/<unknown>`, `/mcp/category/<unknown>`, `/integrations/category/<unknown>` and `/features/<unknown>`.
  - **Bad sitemap entries:** the sitemap listed `/home` (a 307 to `/`) and bare `/feedback` (a 404). `/use-cases` and `/new-direction` were missing.
  - **Redirecting sitemap entries:** on production, `/developers` 301s to `/` and `/data-deletion-policy` 301s to `/data-retention-deletion`, both through admin-managed redirects. The sitemap still lists both (not changed, see Gaps).
  - **Client-side canonicals:** most pages have no server-rendered canonical, so it is set on the client (U-03, unchanged).
- **Browser (headless Chrome, 13 key pages):** no page errors. Pre-existing problems:
  - **/experts:** 24 identical `meeting_request_form` dialogs, so every "Schedule a meet" opened the first card's form (U-09). It also sent 24 `ipapi.co` lookups, which answered 429 and logged CORS errors.
  - **/mcp/category/\*:** React logged a missing-key warning.
  - **/signup:** the widget never started when the `utmData` cookie held a `;` (S-11).
  - **Local-only noise:** `/cdn-cgi/zaraz/i.js` 404 (Cloudflare Zaraz exists only in production).
  - **Third-party failures:** `app.10xlaunch.ai` does not resolve, `cr-relay` is blocked by ORB, the interface embed's `flow-api…/interfaces/loginuser` returns 404, and the MSG91 widget requests `/media/Inter-Bold-*.ttf`, which is also a 404 on production. None of these come from this repo's code.
- **Outage simulation:** `NEXT_PUBLIC_DB_BASE_URL` and `NEXT_PUBLIC_INTEGRATION_URL` were pointed at an unreachable host. `/departments`, `/embed/app-integration`, `/embed/actions-for-ai` and `/embed/actions-via-webhook` then answered **500**. An invalid `NEXT_PUBLIC_DB_KEY` did not cause failures, because table-api reads do not check the key.

## Safety net: `npm run check:routes`

`scripts/check-routes.mjs` is new and has no dependencies; it uses Node's `fetch`.

- **What it checks:** 66 curated routes plus `robots.txt` and `sitemap.xml`. For each route it compares status, redirect target, title (exact for titles written in this repo, a substring for titles from the CMS), server canonical (or its absence), robots meta and h1 presence. A 404 must have the 404 title and `noindex`.
- **Sitemap rules:** the sitemap must list `/`, `/integrations`, `/pricing`, `/features`, `/blogs`, `/use-cases` and `/new-direction`, and must not list `/home` or `/feedback`.
- **Indexing:** noindex is expected on every host except viasocket.com. Override with `EXPECT_INDEXABLE=1|0`.
- **Options:** `BASE_URL` (default `http://localhost:1151`), `ONLY=/a,/b`, `CONCURRENCY`, `TIMEOUT_MS`. A failed request is retried once, because `next dev` can stall a request while another route is compiling the not-found page.
- **Results:** passed 66/66 on the baseline. After the changes it passed 71/71 (the 5 new rows are the C-09 404s). A warm dev server takes about 80 s; most of that is `/automations` downloading every template (C-11).

## Changes (one commit each)

| Commit | ID | What and why | Evidence | Verification |
|---|---|---|---|---|
| `6c31ae45` | – | Adds `check:routes` (above) | – | 66/66 on baseline |
| `d20e74df` | S-09 | Adds `src/utils/jsonLd.js:serializeJsonLd`, which escapes `<` as `<`. It is used by every `application/ld+json` tag: `layout.js`, `AddToProductPage`, `integrationsAppOneComp`, `IntegrationsIndexPage`, `PricingParts`, `UseCasesPage`, `FeaturesPage` and `BlogPostPage`. The rollback tree's `front-page/IndexPageContent.js` was left as is on purpose | `JSON.stringify('</script>')` output closes the tag | The serializer round-trips through `JSON.parse`; JSON-LD counts per page are unchanged in the inventory |
| `2ae287ba` | C-12 | `getFaqData` returns `[]` when `getFaq` returns `undefined` | Outage simulation: the 3 `/embed/*` pages answered 500 | Same simulation: all 200 |
| `9412ad10` | S-11 | `setCookie` escapes `;` as `%3B`. The value stays plain JSON, so every existing reader still works (the docs/CONTRACTS "JSON (unencoded)" format is kept; it was not changed to `encodeURIComponent`, because a flow.viasocket.com reader may exist). `setUtmSource` and `setIntent` now catch a failed `JSON.parse` and start from a fresh object | Headless Chrome on baseline: `/signup?utm_source=ad%3Bcampaign` and a hand-made bad cookie both threw "Unterminated string in JSON", and the widget never started | After: no page errors, the widget starts, and the cookie holds valid JSON |
| `13f275f7` | T-08 | `/embed/app-integration` hero offer and dark CTA now use `utm_source=/embed/app-integration`. The `/embed/actions-via-webhook` hero offer (same copy-paste bug) now uses `/embed/actions-via-webhook` | grep | grep: each page tags only its own path |
| `69da6aa8` | C-09 | `notFound()` for: `/find-apps` with 2+ segments (decided by structure alone); an MCP app when the plug service answered with a `plugins` object that lacks the app; an MCP or integrations category when the table answered `[]` for a slug other than `all`; a `/features/<slug>` when the table answered `[]`. On an upstream failure (`null` or `undefined`) these pages keep their old error state. `features/[...feature]` re-throws the not-found error out of its own `catch` | Inventory | Every 164 sitemap category URL (82 MCP, 82 integrations), a 60-URL sample of MCP app URLs and 31 of 32 feature slugs still return 200. Unknown slugs return 404. Outage simulation: none of these URLs 404s (see Gaps for the one feature slug) |
| `3170f213` | C-04, U-08 | `STATIC_ROUTES` loses `/home` and `/feedback` (a 404 without `?variant`) and gains `/use-cases` and `/new-direction`. `/features` and `/blogs` were already listed | Inventory | `ONLY=/sitemap.xml npm run check:routes` |
| `392f7287` | U-09 | `RequestMeetingComp` takes a `dialogId` (default `meeting_request_form`). `AgencyList` passes `meeting_request_form_<type>_<index>` | Baseline Chrome: 24 dialogs, 1 unique id; buttons 2 to 6 opened card 1's dialog | After: 24 unique ids, and each of the first 6 buttons opens its own card's dialog. The form was never submitted, and flow.sokt.io requests were blocked in the test |
| `48877d40` | – | `PhoneInput` makes one shared `ipapi.co` lookup per page instead of one per field | /experts sent 24 lookups (429s and CORS errors) | 1 lookup |
| `5b1507d0` | C-13 (partly) | `https://viasocket.com/help/developer-hub` becomes `/help/plugin-builder` (in `mcp/saas`, `McpIndexClientComp`, `AppDirectory` and `IntegrationsIndexClientComp`). `/help/partners/experts-partner-program` becomes `/help/partners/agency-partner-program` (`/experts`). These are the 200 targets those links already 301 to on production | `curl -L` on production | Both targets return 200 |
| `16a19355` | – | Adds a `key` to the `AppVisual` list in `McpIndexClientComp` | Missing-key warning on every `/mcp/category/*` | Warning gone |
| `9b4561bc` | – | `getDepartmentsPageData` falls back to `[]`, not `{}`, for its list fields (departments, reviews, FAQs, navbar, footer) | Outage simulation: `/departments` 500 (`departmentData?.map`, then `reviewData.filter`, then `footerData.filter`) | Same simulation: 200; normal data is unchanged |
| `3b8f6c55` | T-11 (obsolete) | Removal; see below | – | Build and inventory |
| `b0918b54` | D-08 | Removes `husky` and `lint-staged` | See below | The lockfile diff is deletions only (571 lines) |

## Removals with evidence

- **Old /pricing code:** `src/components/pricing/*` (7 files including `logo-marquee.scss`), `src/app/lib/pricing-data.js` and `src/utils/getCountries.js`, plus the getters and field lists that only they used (`getCountriesData`, `getPricingFeatureData`, `COUNTRIES_FIELDS`, `PRICINGFEATURE_FIELDS`). Since `304bf6d9`, `/pricing` renders `addToProduct/PricingPage`.
  - **Evidence:** no static or dynamic import, `require` or string reference remains in `src`, `build-utilities` or the config files. None of these files is a route or a CSS import. A reachability scan from every `page`/`layout`/`route`/`middleware` entry finds no orphaned file afterwards.
  - **What is kept:** the table ids stay in `src/const/tables.js` as the table registry.
  - **T-11:** the bare `/signup` links that T-11 describes lived only in this dead code. The live `/pricing` plan buttons go to `START_URL` (flow.viasocket.com) with no `utm_source`, which is the same open question as T-04. Not changed.
- **husky and lint-staged:** there is no `.husky/`, no lint-staged config, no `prepare` script and no `core.hooksPath`. `prettier` stays.
- **Dependencies checked and kept:** every runtime dependency still has an importer, so nothing else was removed.
- **Not touched:** the rollback tree (`src/app/page.js`, `src/app/front-page/**`, `src/app/components/home/**`), `public/**` assets (they may be referenced from CMS content), `src/middleware.js` and the ops paths.

## After

- **Build:** exit 0 in 16.7 s, 53 routes, shared First Load JS still 102 kB, and no new warnings. A few routes grew by 1 kB on rounding (`/embed`, `/mcp*`, `/experts-are-live`, `/free-access-programs`; `/signup` page 1.52 kB → 1.55 kB), from the guarded UTM code. Nothing else changed.
- **check:routes:** 71/71 pass on dev.
- **Inventory diff (84 URLs):** only the 6 intended C-09 changes. Every other status, location, title, canonical and robots value is identical.
- **Browser (13 pages):** no page errors. The remaining 4xx responses are third-party: the interface embed `loginuser` 404 and the MSG91 font 404, both of which also happen on production.
- **Outage simulation:** routes answering 5xx went from 4 to 0.

## Intentional URL or status changes

| URL | Before | After |
|---|---|---|
| `/find-apps/{a}/{b…}` (2+ segments) | 200 "Page Not Found" | 404 |
| `/mcp/{unknown app}` | 200 error page | 404 (only when the plug service answered) |
| `/mcp/category/{unknown}` | 200 error page | 404 (only when the table answered) |
| `/integrations/category/{unknown}` | 200 error page | 404 (only when the table answered) |
| `/features/{unknown}` | 200 generic features page | 404 (only when the table answered) |
| `sitemap.xml` | listed `/home` and `/feedback` | lists `/use-cases` and `/new-direction` instead |

## Remaining gaps and follow-ups

- **`/features/sort-flow-with-triggers` now returns 404.** Its row in the features table (`tbl5p2jus`) has the slug `"sort-flow-with-triggers\n"`, with a trailing newline, so the exact-match filter never finds it. Production served the generic features page there, not the feature itself. **Fix the slug in the CMS** (or decide to keep the 200).
- **C-13, the rest:** `/help/viaSocket-MCP` and `/help/viaSocket-MCP/Fair-Usage-Policy` return 200 on production (served by the help deployment), so they were left alone. The bare `/help` "Help Docs / Help Center" links lead to `/new-direction`. There is no live help home to point them at, so a product decision is needed. They are in `LifetimeDealFooter`, `SupportClient` and `getStarted`.
- **Redirects in the sitemap:** `/developers` and `/data-deletion-policy` are still in `STATIC_ROUTES`, but the admin redirects them on production. Admin redirects can change at runtime, so the sitemap was not changed; decide with the admin owner.
- **C-06** (unknown integration or automation slugs return 307) and **C-11** were not in scope and are unchanged.
- **Verification limits:** the `utmData` format change was checked in Chrome only. Whether flow.viasocket.com reads `utmData` was not verified. The fix escapes only `;`, so existing values are byte-identical. The forms were checked by inspecting how requests are built, with webhook calls blocked, and were never submitted. The Cloudflare build (`pages:build`) was not run; every new or changed page still exports `runtime = 'edge'`.
- **OPEN_QUESTIONS now fixed:** S-09, C-12, S-11, T-08, C-09, C-04, U-08, U-09, D-08 (husky and lint-staged part). Partly fixed: C-13. Obsolete: T-11 (the code is gone; the live `/pricing` CTAs fall under T-04).
