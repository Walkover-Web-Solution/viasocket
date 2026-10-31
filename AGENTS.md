# viaSocket marketing site

This repo is the public website at **viasocket.com**: the static homepage, SEO landing pages, an integrations directory, automation templates, campaign and migration pages, lead forms, and the `/developers` (Embed) funnel. It hands visitors to signup or to the product at flow.viasocket.com, carrying attribution with them. It is not the product. Its canonical positioning is "Integration Layer for your products & agents" ([DECISIONS ADR-015](docs/DECISIONS.md#adr-015-the-integration-layer-is-the-canonical-positioning)). It is Next.js 15 (App Router) in plain JavaScript, deployed to Cloudflare Pages with `@cloudflare/next-on-pages`. Most page content and metadata come from table-api at request time.

<!-- middleware:guidance:start -->
## Guidance for this kind of repository

Kept by the middleware (version c133f420d8b7). Read these before changing anything here:
- [docs/guidance/website.md](docs/guidance/website.md)
<!-- middleware:guidance:end -->

## Commands

| Task | Command |
|---|---|
| Install dependencies | `npm install` (`.npmrc` sets `legacy-peer-deps=true`) |
| Run dev server | `npm run dev` (http://localhost:1111) |
| Build for production | `npm run build` (prebuild writes an untracked `public/robots.txt`; delete it afterwards) | <!-- verify:ignore -->
| Cloudflare build / local preview | `npm run pages:build` / `npm run preview` |
| Type check, lint, tests | **None exist.** Use the checklist in [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md#how-an-agent-checks-its-work-verification-checklist). |

Node v22.15.0 and npm 10.9.2 are known to work. A clean build has 53 routes and prints only Sass `@import` deprecation warnings.

## Reading Order Before You Change Code

Always read 1–3 first, then only the docs your task needs. [docs/README.md](docs/README.md) maps every doc to the kind of change it serves.

1. [docs/VISION.md](docs/VISION.md): what the site is for, and how to evaluate a request (§ "How Future Agents Must Evaluate Requests").
2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): request path on Cloudflare, layers, core systems, A/B machinery.
3. [docs/AGENTS.md](docs/AGENTS.md): the detailed rulebook (boundaries, one library per concern, IDs, fail-soft) behind the rules below.
4. **Your feature area:** [docs/modules/](docs/modules/) (nine areas, listed in [docs/README.md](docs/README.md#project-overview)), its journey in [docs/FLOWS.md](docs/FLOWS.md), and its routes in [docs/05-navigation.md](docs/05-navigation.md).
5. **Data and tracking:** [docs/CONTRACTS.md](docs/CONTRACTS.md) (cookies, storage, analytics events, and where every schema lives), then the system's page under [docs/current-infrastructure/](docs/current-infrastructure/) and [docs/database/entities.md](docs/database/entities.md).
6. **Writing the change:** [docs/08-folder-structure.md](docs/08-folder-structure.md) (where it goes, plus a step-by-step "add a new page" recipe), [docs/09-coding-guidelines.md](docs/09-coding-guidelines.md), [docs/DESIGN.md](docs/DESIGN.md) for UI and SEO.
7. **Before reversing a choice:** [docs/DECISIONS.md](docs/DECISIONS.md) and [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md).
8. **Before handing back:** [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) (verification checklist) and [docs/22-definition-of-done.md](docs/22-definition-of-done.md).

## Evaluating a Request

- **Unclear request:** restate the user problem and propose the option that fits [docs/VISION.md](docs/VISION.md) before writing code.
- **Conflict with approved direction or a rule below:** explain the conflict and recommend declining or revising; don't silently comply.
- **Deliberate change of direction:** make the decision explicit and update `docs/VISION.md` (and `docs/DECISIONS.md`) in the same change.
- **Needs a backend capability that doesn't exist:** describe the contract in [docs/CONTRACTS.md](docs/CONTRACTS.md#required--unavailable-backend-capabilities). Never fake an integration, stub route or mock.

## Project Rules & Boundaries

1. **Keep every change as small as the request allows.** Touch only the lines it needs, and add no unrequested styling, helpers or refactors. Never run Prettier or any formatter over files you did not change: it would rewrite about half of `src/`. The maintainer reviews diffs closely and reverts scope creep ([DECISIONS ADR-013](docs/DECISIONS.md#adr-013-working-conventions-maintainer-guidance)).
2. **Work on the branch that is checked out, and never commit on `main`.** Commit or push only when asked. If asked to commit while on `main`, create a branch from `origin/test` (named `<name>-test`), commit there and open a PR into `test` (maintainer instruction, 2026-10-22).
3. **The homepage `/` is the static site in `public/new-home/`.** `next.config.js` rewrites `/` to it (`beforeFiles`), so `src/app/page.js`, `src/app/home/page.js` and `src/app/front-page/**` never render. Don't edit them for homepage work; they are kept only as the rollback path ([DECISIONS ADR-008](docs/DECISIONS.md#adr-008-serve--from-the-static-site-in-publicnew-home)). `public/new-home/` itself is **exported from the `viasocket-site` repo**, so a hand edit here is overwritten by the next export unless the change is also made there. After changing its CSS or JS, bump the `?v=` query in `public/new-home/index.html`, and after it deploys, purge `https://viasocket.com/` in Cloudflare ([modules/01-homepage](docs/modules/01-homepage.md)).

Version B of the homepage lives in `public/home-b/` and is not part of the `viasocket-site` export. The exported `public/new-home/index.html` must keep `<script src="/home-ab.js?v=1"></script>` as its first script, or the split stops.
4. **Every dynamic `page.js` and `route.js` must `export const runtime = 'edge'`.** `next build` passes without it, but the Cloudflare build fails. No Node APIs (`fs`) are available at runtime ([ARCHITECTURE](docs/ARCHITECTURE.md#request-path-cloudflare-pages)).
5. **table-api access follows one path.** Put the table id in `src/const/tables.js` and its columns in `src/const/fields.js`. For a read from the content database, add a getter to `src/utils/getData.js` that calls `src/utils/axiosCalls.js:getDataFromTable`. A new database or a write gets its own function in `src/utils/axiosCalls.js` (axios, `auth-key` header from env, failures reported through `sendErrorMessage`). Pages call these through a `src/app/lib/*-data.js` loader. Never call raw `fetch` from a page or component, and never import `axiosCalls.js` into a `'use client'` file: it carries the keys ([docs/AGENTS.md §1](docs/AGENTS.md#1-architecture--integration-phase), [database/entities](docs/database/entities.md)).
6. **Never hardcode endpoints, database ids or keys.** Base URLs, database ids and keys come from env vars (a new database uses the `NEXT_PUBLIC_DB_ID_<NAME>` / `NEXT_PUBLIC_DB_KEY_<NAME>` pair; no live example exists yet, since today's ids are hardcoded). Table ids stay in `src/const/tables.js`. This matters because each environment points at different tables. Existing hardcoded ones are tracked as debt (S-02), not as a pattern to copy. Everything `NEXT_PUBLIC_*` ships in client JS.
7. **`utm_source` is the page's own path** (`/integrations`, `/embed/app-integration`). Per-button detail goes in `trackCtaClick` (`src/utils/trackVisitor.js`) `element`/`label`, never in `utm_source`. A tag that is not path-shaped is mistaken for external attribution and locks the cookie for a day ([docs/AGENTS.md §4](docs/AGENTS.md#4-id-handling--cross-system-references), [FLOWS](docs/FLOWS.md#detailed-journey-landing-utm-capture-and-signup)).
8. **Campaign pages keep their own tag** (e.g. `relay-switch-google-ads`). `utm_source` must appear exactly once in the signup URL, and the tag is stamped into `utmData` just before navigating.
9. **A prompt typed on a marketing page travels in the `utmData` cookie** (`setCookie` / `getCookie` from `src/utils/handleUtmSource.js`), never as a query parameter.
10. **Tracking runs in local, test and production.** Rows carry an `environment` column, and any read-back must filter on it, because test and prod share the `visitor_id` cookie. Homepage exposures and homepage signup/login clicks are stored. Every other page is still dropped (`not a homepage event`). Don't widen that without a new test ([modules/01-homepage](docs/modules/01-homepage.md#reading-visitors-signup-clicks-and-signups-per-version)).
11. **The domain is bare `viasocket.com`. Never add `www` handling.** Host checks that single out production compare the full hostname exactly (`test.viasocket.com` is also a `.viasocket.com` host).
12. **Prove which layer fails before editing tracking or analytics code.** Instrument the chain (cookie → request → payload → response → cache-busted read). Analytics work counts as verified only after a real write and read against the live table. The table has no DELETE, so tag test rows by `environment`.
13. **Verify per-visitor behaviour on production as well as test.** viasocket.com sits behind a Cloudflare cache rule that local and test lack. Compare `cache-control`, `cf-cache-status` and `set-cookie` with `curl -D -` on both hosts.
14. **Style with Tailwind utilities.** Use CSS only when Tailwind cannot do it (e.g. `@font-face`), and put tokens and keyframes in `tailwind.config.js`. Legacy global SCSS overrides some utilities with `!important` ([DESIGN](docs/DESIGN.md#design-tokens--styling-primitives)). Keep a component's copy as constants at the top of its own file, not in a shared content module. The `src/components/IntegrationsComp/addToProduct/` pages are an existing exception to both (a 649-line SCSS module and a shared `copy.js`); don't copy that pattern elsewhere until [OPEN_QUESTIONS U-07](docs/OPEN_QUESTIONS.md) is settled.
15. **Preserve routes, redirects and SEO.** Keep `next.config.js` redirects, `src/app/sitemap.js`, the robots logic and `generateMetadata` intact. `next.config.js` 301s `/help` and `/help/*` to `/new-direction`, except the `FOOTER_HELP_PAGES` list and pages under them. The help pages themselves, `/blog`, `/discovery` and `/community` are served by other deployments, so never add routes that shadow them ([05-navigation](docs/05-navigation.md#paths-served-by-other-deployments)). When porting from another repo, bring over the design, content and behaviour only, rebuilt in this repo's conventions.

## Where Things Are

Full annotated tree and "where does a new X go" rules: [docs/08-folder-structure.md](docs/08-folder-structure.md).

- `public/new-home/`: the static homepage (`index.html`, `styles.css`, `main.js`) with its own design tokens.
- `src/app/`: App Router routes. Each section (`integrations/`, `automations/`, `pricing/`, `developers/`, `embed/`, `migration/` …) owns its `page.js`. `src/app/developers/` is a self-contained sub-app with its own layout. <!-- verify:ignore -->
- `src/app/components/`: section-specific components. `src/components/`: older shared components (navbar pieces, footer, FAQ, meta head, integrations).
- `src/components/IntegrationsComp/addToProduct/`: the homepage design rebuilt in Next (own header/footer, `copy.js`, SCSS module) for `/integrations`, `/integrations/{app}`, `/features`, `/use-cases` and `/new-direction`.
- `src/app/lib/*-data.js`: per-page data aggregators. `src/utils/`: table-api client (`axiosCalls.js`, `getData.js`), UTM and redirect helpers, tracking, and `mwExperiment.js` (middleware experiment client; not the visitor table). `src/const/`: table ids, field lists, A/B config.
- `src/middleware.js`: `/home` redirect, the `/` cache headers, Reddit click-id cookie and page-visit call.
- `src/app/api/track-variant/route.js`: the only internal API route.
- `next.config.js`: the `/` rewrite and permanent redirects. `tailwind.config.js` holds theme tokens; `src/scss/` holds legacy global styles.
- `_posts/`, `public/admin/`: legacy Decap CMS blog, unused by any route (C-02).

## PR & Deployment Flow

- **Branches:** feature branches start from `origin/test` (Jira-style `VSWEB-NNN`, fork branches such as `<user>/feat/<name>`, or `<name>-test`). Agents follow Rule 2.
- **Pipeline:** feature branch → PR into **`test`** (deploys test; check https://test.viasocket-website.pages.dev) → PR `test` → **`main`** with a merge commit (deploys viasocket.com; `main` is protected but needs no review). Both are Cloudflare Pages deployments. The `prod` branch is legacy. There is no CI, so the checks below are the gate. Details: [DEVELOPMENT](docs/DEVELOPMENT.md#pr-workflow--deployment-pipeline).
- **Before handing work back:** run `npm run build` (it must pass with no new warnings), then delete `public/robots.txt`. On `npm run dev`, check every affected route's status, `<title>` and canonical with curl, and check `/robots.txt` and `/sitemap.xml` if routes changed. Then follow the rest of the [DEVELOPMENT checklist](docs/DEVELOPMENT.md#how-an-agent-checks-its-work-verification-checklist). <!-- verify:ignore -->

## Verification & Knowledge Maintenance Expectations

- Record the build and route results before editing, so pre-existing warnings are not mistaken for regressions.
- Preserve routes, redirects, page titles, canonicals, UTM and tracking behaviour, cookie names and visual appearance unless the request is to change them.
- Remove code only with evidence from all seven checks: string registries, dynamic imports, routing, flags, CSS references, build or static references, external consumers. Note that `public/` assets may be referenced from table-api content that grep cannot see. When in doubt, add a row to [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md) instead.
- When behaviour, routes, contracts or tokens change, update the owning doc (`docs/*.md`, `docs/modules/`, `docs/current-infrastructure/`, `docs/database/`, `docs/api/`; owners in [docs/AGENTS.md §6](docs/AGENTS.md#6-modifying-documentation)) in the same change and bump its `verified_at` / `verified_on`. Docs carry `covers:` globs, so `/ai-docs check` (the create-ai-docs skill) can flag stale docs and broken references. <!-- verify:ignore -->
