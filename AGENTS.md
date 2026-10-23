---
status: approved
owner: Ankit Dongre (site direction); unassigned (engineering rules)
covers: ["*"]
verified_at: dbc4292c
verified_on: 2026-10-23
sources: ["docs/DEVELOPMENT.md", "docs/DECISIONS.md", "docs/VISION.md", "docs/POSITIONING.md", "package.json", "src/middleware.js", "next.config.js"]
---
# viaSocket marketing site

This repo is **viasocket.com**: the static homepage, landing and SEO pages, the integrations directory, pricing, the blog at `/blogs`, campaign pages and lead forms. It sends visitors to signup at flow.viasocket.com with their attribution. It is not the product. viaSocket is **the integration and action layer for applications and AI agents**: "You build the app or agent. viaSocket handles the connections and actions." ([POSITIONING](docs/POSITIONING.md)). Stack: Next.js 15 App Router, plain JavaScript, Cloudflare Pages via `@cloudflare/next-on-pages`. Most page content comes from table-api at request time.

## Commands

Copied from [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) and `package.json` scripts. Nothing else is verified.

| Task | Command |
|---|---|
| Install | `npm install` (`.npmrc` sets `legacy-peer-deps=true`) |
| Dev server | `npm run dev` (http://localhost:1111; `predev` bundles `_posts/blogs` into `src/data/blogs.json`) |
| Production build | `npm run build`, then `rm -f public/robots.txt` (prebuild writes it; never commit it) | <!-- verify:ignore -->
| Cloudflare build / local preview | `npm run pages:build` / `npm run preview` (slow; only when asked) |
| Typecheck, lint, tests | **None exist.** Use the [verification checklist](docs/DEVELOPMENT.md#how-an-agent-checks-its-work-verification-checklist). |

Never run `npm run deploy`. Node v22.15.0 and npm 10.9.2 are known to work.

## Reading order

1. This file, then [docs/README.md](docs/README.md) (map of every doc).
2. [docs/VISION.md](docs/VISION.md) and [docs/POSITIONING.md](docs/POSITIONING.md) for any copy, page or funnel change.
3. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/AGENTS.md](docs/AGENTS.md) for any code change.
4. Your area: [docs/modules/](docs/modules/), [docs/FLOWS.md](docs/FLOWS.md), [docs/05-navigation.md](docs/05-navigation.md).
5. As needed: [DESIGN](docs/DESIGN.md) (brand and UI), [SEO](docs/SEO.md), [MEASUREMENT](docs/MEASUREMENT.md), [COMPETITORS](docs/COMPETITORS.md), [CONTRACTS](docs/CONTRACTS.md), [DECISIONS](docs/DECISIONS.md), [OPEN_QUESTIONS](docs/OPEN_QUESTIONS.md).
6. Before handing back: [DEVELOPMENT](docs/DEVELOPMENT.md) checklist and [22-definition-of-done](docs/22-definition-of-done.md).

Docs carry a `status:` (approved, current-implementation, proposed, draft). Only **approved** content is direction. Code that exists is not approval.

## Workflow for every request

1. **Read** this file and the approved docs for the area.
2. **Turn the request into an outcome.** Treat it as raw input. Infer the user outcome and the acceptance criteria. Honour every explicit constraint. Ask when two readings lead to different work.
3. **Check alignment** with [VISION](docs/VISION.md), [POSITIONING](docs/POSITIONING.md) and [DESIGN](docs/DESIGN.md). If the request conflicts, explain the conflict and recommend. Never approve a direction change yourself; record it as a proposal.
4. **Find the root cause.** Fix it, plus confirmed instances of the same problem inside the scope. List the rest.
5. **Check what is connected:** the journey before and after the page, shared components, admin consumers (viasocket-admin on Embarko feeds redirects and `/integrations/{app}` copy), claims ([claim register](docs/POSITIONING.md#claim-register)), analytics and attribution ([MEASUREMENT](docs/MEASUREMENT.md)), SEO ([SEO](docs/SEO.md)) and any running experiment.
6. **Verify the backend exists.** If it does not, write the missing contract in [CONTRACTS](docs/CONTRACTS.md#required--unavailable-backend-capabilities). Never mock it.
7. **Make small, reviewable changes.** Check real behaviour: status, title and canonical with curl, and a screenshot for visual work.
8. **Update the docs you affected** in the same change and bump `verified_at` / `verified_on`.
9. **Report** what changed, the evidence, and any blocker or unverified claim.
10. **Ship through the configured path only:** feature branch → PR into `test` → PR `test` → `main`. Agents never push to `main`.

> Reminder: the user asks for an outcome, not a diff. Read the approved context, work out what "done" means, keep viaSocket's boundary line intact ("You build the app or agent. viaSocket handles the connections and actions."), never invent a number, customer or price, and leave the docs truer than you found them.

## Project Rules & Boundaries

Numbered for reference from other docs; keep the numbers stable.

1. **Smallest change that does the job.** No unrequested refactors, styling or helpers. Never run Prettier or any formatter over files you did not change ([ADR-013](docs/DECISIONS.md#adr-013-working-conventions-maintainer-guidance)).
2. **Branches:** work on the checked-out branch; never commit on `main`. Commit or push only when asked. If asked to commit while on `main`, branch from `origin/test` as `<name>-test` and PR into `test`.
3. **The homepage `/` is `public/new-home/`, and it is generated.** `next.config.js` rewrites `/` to it. The source is the `viasocket-site` repo (`variants/simple-bento`), exported by `deploy/export-to-viasocket-repo.py --prod`, which overwrites `public/new-home/`. Make homepage edits there, bump `?v=`, export, and purge `https://viasocket.com/` in Cloudflare after deploy. `src/app/page.js`, `src/app/home/` and `src/app/front-page/` never render; they are the rollback path ([ADR-008](docs/DECISIONS.md#adr-008-serve--from-the-static-site-in-publicnew-home)). <!-- verify:ignore -->
4. **Edge runtime.** Every dynamic `page.js` and `route.js` exports `runtime = 'edge'`. No Node APIs at runtime.
5. **table-api goes through one path:** reads via `src/utils/getData.js` → `src/utils/axiosCalls.js`, called from a `src/app/lib/*-data.js` loader. Never raw `fetch` in a page, never `axiosCalls.js` in a `'use client'` file.
6. **No hardcoded endpoints, database ids or keys.** Table ids in `src/const/tables.js`, columns in `src/const/fields.js`; a new database uses `NEXT_PUBLIC_DB_ID_<NAME>` / `NEXT_PUBLIC_DB_KEY_<NAME>`. Everything `NEXT_PUBLIC_*` ships to the browser.
7. **`utm_source` is the page's own path** (`/integrations`). Per-button detail goes in `trackCtaClick` `element`/`label`, never in `utm_source` ([MEASUREMENT](docs/MEASUREMENT.md), [ADR-012](docs/DECISIONS.md#adr-012-utm-attribution-conventions)).
8. **Campaign pages keep their registered tag** (e.g. `relay-switch-google-ads`); `utm_source` appears once per signup URL.
9. **A typed prompt travels in the `utmData` cookie**, never in a URL.
10. **Tracking runs in local, test and production**; rows carry `environment`. Visitor tracking is switched off ([OPEN_QUESTIONS T-01](docs/OPEN_QUESTIONS.md)); do not re-enable it casually.
11. **Bare `viasocket.com` only.** No `www` handling. Production checks compare the full hostname.
12. **Prove the failing layer before editing tracking code** (cookie → request → payload → response → cache-busted read), and verify with a real write and read.
13. **Verify cookie and cache behaviour on production too.** viasocket.com has a Cloudflare cache rule that test and local lack (`curl -D -` both hosts).
14. **Styling and copy:** follow [DESIGN](docs/DESIGN.md). New work uses the homepage system (Geist, ink tokens, square corners). Tailwind first in Next; copy as constants in the component (the `addToProduct` `copy.js` and SCSS module are an exception, U-07).
15. **Preserve routes and SEO.** Redirects live in the admin panel (Pages → Redirects), read by `src/middleware.js`, with `src/data/redirects.json` as fallback; `next.config.js` keeps the `/` rewrite. Keep `src/app/sitemap.js`, the robots route and `generateMetadata` intact. `/help/*` footer pages, `/blog`, `/discovery` and `/community` belong to other deployments; never shadow them ([SEO](docs/SEO.md)).
16. **Claims:** use only figures and claims marked verified in the [claim register](docs/POSITIONING.md#claim-register). Never write "runs" or "hosts" about the customer's app, or the banned phrases in [DESIGN](docs/DESIGN.md#voice-and-terminology).
17. **Remove code only with evidence** from all seven checks in [docs/AGENTS.md](docs/AGENTS.md); `public/` assets may be referenced from table-api content.

## Where things are

- `public/new-home/`: generated static homepage. `src/app/`: routes. `src/components/IntegrationsComp/addToProduct/`: the homepage design in Next (`/integrations`, `/features`, `/use-cases`, `/pricing`, `/pass`, `/blogs`, `/new-direction`).
- `src/middleware.js`: admin redirects, `/` cache headers, Reddit click-id and page-visit call. `src/app/lib/admin-content.js`: admin copy for `/integrations/{app}`.
- Full tree: [docs/08-folder-structure.md](docs/08-folder-structure.md).

## Production

Feature branch → PR into `test` (check https://test.viasocket-website.pages.dev) → PR `test` → `main` with a merge commit (deploys viasocket.com). No CI: the build and the checklist are the gate. Details: [DEVELOPMENT](docs/DEVELOPMENT.md#pr-workflow--deployment-pipeline).
