---
status: current-implementation
owner: unassigned (SEO); Ankit Dongre (homepage)
covers: ["src/app/sitemap.js", "src/app/robots.txt/**", "build-utilities/generate-robots-txt.js", "src/middleware.js", "src/data/redirects.json", "src/const/admin.js", "next.config.js", "src/app/layout.js", "src/app/providers.js", "src/components/headComp/**", "src/app/**/page.js", "src/app/lib/admin-content.js", "public/new-home/index.html", "public/llms.txt"]
verified_at: dbc4292c
verified_on: 2026-10-23
sources:
  - curl of https://viasocket.com (status, title, canonical, robots, cache headers) on 2026-10-23
  - https://viasocket.com/sitemap.xml and https://viasocket.com/robots.txt, 2026-10-23
  - https://plugservice-api.viasocket.com/sitemap/index-page, 2026-10-23
  - https://viasocket-admin.embarko.app/api/public/redirects, 2026-10-23
  - viasocket-site/seo-audit-homepage-2026-10-13.md (scores 37 → 44 → 52/70)
  - src/app/sitemap.js, src/app/robots.txt/route.js, src/middleware.js, src/data/redirects.json, src/app/layout.js
  - OPEN_QUESTIONS answers 2026-10-22 (D-09, D-10, U-03, U-05, U-08, C-04, C-06, C-09)
  - docs/COMPETITORS.md
---
# SEO

How search engines and LLM crawlers see viasocket.com, what each important URL is for, and the known gaps. **Measured** facts come from curl on 2026-10-23. **Proposed** items are opportunities, not commitments. No ranking is promised anywhere in this doc.

## Page map

| URL | Search intent | Audience | Index? | Rendering |
|---|---|---|---|---|
| `/` | "integration layer", "add integrations to my app / AI agent" (commercial investigation) | Builders of SaaS and agents; paid-ads visitors | Yes | Static HTML (`public/new-home/`), outside Next |
| `/integrations` | "{category} integrations", app directory | Builders checking coverage | Yes | Next, edge, plug service |
| `/integrations/{app}` | "{app} integration / API for my product" | Builders needing one app | Yes | Next; copy from the admin panel with fixed fallback |
| `/integrations/{app}/{app2}` | "connect {app} to {app2}" (automation intent, old story) | Mostly automation searchers | Yes (bulk of the backend sitemap) | Next, legacy design |
| `/integrations/category/{cat}` | "{category} apps" | Builders | Yes | Next |
| `/features` | "integration layer features" | Evaluators | Yes | Next |
| `/use-cases` | "what can I build with …", agent and SaaS integration examples | Evaluators | Yes (not in sitemap) | Next |
| `/pricing` | "viaSocket pricing" (navigational / transactional) | Evaluators | Yes | Next |
| `/pass` | "viaSocket Pass" | Existing evaluators | Yes (placeholder rates, see P-08) | Next |
| `/blogs`, `/blogs/{slug}` | Developer how-to and build-vs-buy topics | Builders researching | Yes | Next, Markdown bundled at build |
| `/new-direction` | Brand / "why viaSocket changed" | Existing users, press | Yes (not in sitemap) | Next |
| `/developers/docs`, `/developers/auth` | Docs-like developer queries | Developers | Yes (parent `/developers` now 301s to `/`) | Next |
| `/embed/*`, `/mcp/aiagent`, `/mcp/saas` | Embedded iPaaS, MCP for agents (older stories) | Mixed | Yes | Next, legacy |
| `/automations/*`, `/departments/*`, `/workflow-automation*`, `/migration/*`, `/lifetime-deal`, `/experts` | Workflow-automation and campaign queries (old story) | Automation buyers | Yes | Next, legacy |

## Canonical and indexing intent

- Production indexes; test must not. The root layout sets `robots: noindex, nofollow` unless `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT=prod`; `src/app/robots.txt/route.js` returns `Disallow: /` outside prod.
- Canonicals always use the bare domain `https://viasocket.com`, never `www`.
- **Server-rendered canonical (measured):** `/`, `/features`, `/use-cases`, `/integrations`, `/integrations/{app}`, `/pricing`, `/pass`, `/blogs`, `/blogs/{slug}`, `/new-direction`.
- **No canonical in the server HTML (measured):** app-pair pages, category pages, `/developers/*`, `/embed/*`, `/mcp/*`, `/automations`, `/departments`, `/migration/*`, `/experts`, `/lifetime-deal`, `/signup`. These get one only client-side (`src/app/providers.js` → `HeadComp`). Moving canonicals to server metadata is a recommended fix (U-03).
- **Test host gap (D-09):** `test.viasocket.com` sends no `x-robots-tag` (measured 2026-10-23); only its `robots.txt` (`Disallow: /`) keeps it out, and the homepage export carries no page-level `noindex`. A noindex response header for the test host needs Cloudflare dashboard access.

## Robots and sitemaps

- `robots.txt` (measured, production): `Disallow: /admin/`, plus two sitemaps: `https://viasocket.com/sitemap.xml` and `https://plugservice-api.viasocket.com/sitemap/index-page`.
- `src/app/sitemap.js` lists static routes only (41 URLs measured). The backend sitemap index lists 85 child sitemaps: 75 for app-pair integration pages, plus categories, MCP, automations, viaSocket blogs and discovery blogs.
- **Sitemap issues (measured):** lists `/home` (307 → `/`) and `/developers` (301 → `/`); lists utility pages (`/signup`, `/feedback`, `/agency-partner/success`, `/lifetime-deal/success`); misses `/use-cases` and `/new-direction` (U-08, C-04). Every URL gets `lastModified: new Date()`, so dates carry no signal.
- `public/llms.txt` is a hand-written index for LLM crawlers. It still describes "an AI-powered automation platform … no-code workflows" and "1000+ app integrations" ([claim register](POSITIONING.md#claim-register)). Rewrite it to the approved positioning when in scope. Do not add other AI-search files (`llms-full.txt` and the like) without a decision.

## Redirects

Redirects are managed in the **viasocket-admin panel** (Pages → Redirects, PR #1840). `src/middleware.js` reads `https://viasocket-admin.embarko.app/api/public/redirects`, caches it for a minute, and falls back to `src/data/redirects.json` when the admin cannot be reached. Exact sources win over wildcards; `statusCode: 0` marks an exception. `next.config.js` keeps only the `/` rewrite.

**The live admin list and the repo fallback disagree (measured 2026-10-23):**

| Source | Admin (live) | `src/data/redirects.json` |
|---|---|---|
| `/embed` | 301 → `/` | 308 → `/developers` |
| `/developers` | 301 → `/` | none |
| `/developers/pricing` | 301 → `/pricing` | 308 → `/pricing` |
| `/blog` | 301 → `/blogs` (never fires: another deployment answers `/blog` with 200) | none |

If the admin is down, `/embed` would send visitors to `/developers`, which then renders the old page. Refresh the fallback from the admin when you touch redirects ([OPEN_QUESTIONS P-06](OPEN_QUESTIONS.md)). Other live rules: `/about` → `/help/about-us`, `/help/*` → `/new-direction` (footer help pages excepted), `/mcp` → mushrooms.viasocket.com, `/login` → flow.viasocket.com, `/home` → `/` (307).

## Rendering assumptions

- `/` is static HTML. Everything a crawler should read must be in the HTML; the use-case list and prompts are prerendered by `viasocket-site/deploy/prerender-lists.js`. <!-- verify:ignore -->
- Other pages render on the edge per request from table-api, the plug service and the admin API. If an upstream fails, sections render empty rather than erroring.
- Unknown integration and template slugs 307 to their index (C-06); some invalid URLs return 200 with a "404 - Page not found" title, a soft 404 (measured on `/find-apps/a/slack`, C-09).

## Edge cache

Production has a Cloudflare zone rule that caches HTML for 10,800 s (measured `cache-control: max-age=10800` on most pages; `/` sends `public, max-age=10800, must-revalidate`). `/` has been seen at the edge for over a day (D-10). **Purge `https://viasocket.com/` in Cloudflare after every homepage deploy.** Admin redirects are sent with a 5-minute browser cache so a removed rule stops quickly.

## Structured data

| Where | Types |
|---|---|
| `/` (`public/new-home/index.html`) | Organization, WebSite, SoftwareApplication (offer price 0), WebPage, FAQPage (9 Q&As, must match the visible FAQ word for word) |
| Every Next page (`src/app/layout.js`) | Organization |
| `/integrations/{app}` | SoftwareApplication + FAQPage |
| `/features`, `/use-cases`, `/integrations` (index) | FAQPage |

JSON-LD built with `JSON.stringify` does not escape `<` (S-09).

## Metadata conventions

- `generateMetadata` (server) is the source of truth; never `next/head`. Most legacy pages read title and description from a table-api meta row (`src/utils/getMetaData.js`); edit the row, not the fallback. The homepage-design pages take theirs from `copy.js`; `/integrations/{app}` prefers the admin panel's copy.
- **Title format:** **Proposed** "X | viaSocket" via `title.template: '%s | viaSocket'` (U-05). Today four formats are live (measured): "X | viaSocket", "X · viaSocket" (`/pricing`, `/pass`, `/blogs`), "Sign Up - viaSocket", and no brand at all (`/automations`, `/departments`, `/features/variables`).
- **Duplicate titles (measured):** `/integrations/category/crm` has the same title as `/integrations` ("App Integrations for Your Product | viaSocket").
- **Root defaults are out of date:** `src/app/layout.js` describes "Connect your apps and automate workflows" (the old story); every Next page without its own description inherits it.
- Meta descriptions state a real benefit and only verified numbers.

## Internal links

- Homepage body links to `/integrations` (from "2,300+ apps"), `/help/security-and-compliance`, and the footer columns. The footer no longer links to the blog, MCP marketplace or knowledge base (audit note), so those pages lost a homepage link.
- Homepage-design pages share `SiteHeader`/`SiteFooter` (Features, Book a demo, Pricing, Log in, Start free).
- **Proposed:** link `/use-cases` and `/blogs` from the homepage; link each use case to its integration pages.

## Spot check (2026-10-23)

| URL | Status | Server title | Server canonical |
|---|---|---|---|
| `/` | 200 | Integration Layer for Your Product & AI Agents \| viaSocket | yes |
| `/features` | 200 | viaSocket Key Features \| Integration Layer | yes |
| `/use-cases` | 200 | Explore Use Cases & Examples of Integration Layer \| viaSocket | yes |
| `/integrations` | 200 | App Integrations for Your Product \| viaSocket | yes |
| `/integrations/slack` | 200 | Add Slack Integration to Your Product & Agents \| viaSocket | yes |
| `/integrations/hubspot/slack` | 200 | Integrate HubSpot with Slack for automation \| viaSocket | no |
| `/integrations/category/crm` | 200 | App Integrations for Your Product \| viaSocket | no |
| `/pricing` | 200 | Pricing · viaSocket | yes |
| `/pass` | 200 | viaSocket Pass · viaSocket | yes |
| `/blogs` | 200 | Blog · viaSocket | yes |
| `/new-direction` | 200 | Why we're changing viaSocket \| viaSocket | yes |
| `/developers` | 301 → `/` | n/a | n/a |
| `/developers/pricing` | 301 → `/pricing` | n/a | n/a |
| `/embed` | 301 → `/` | n/a | n/a |
| `/developers/docs` | 200 | Integrations Quickstart · viaSocket | no |
| `/embed/app-integration` | 200 | Embedded iPaaS for SaaS \| viaSocket Embed | no |
| `/mcp/aiagent` | 200 | Connect Your AI to 1,929+ Apps \| viaSocket MCP | no |
| `/automations` | 200 | Workflow Automation Templates | no |
| `/migration/zapier` | 200 | Zapier Alternative: 100x the Free Tasks + Free Migration \| viaSocket | no |
| `/find-apps/a/slack` | 200 (soft 404) | 404 - Page not found | no |
| `/integrations/notarealapp123` | 307 → `/integrations` | n/a | n/a |
| `/help/trigger` | 404 (other deployment) | n/a | n/a |
| `/blog` | 200 (other deployment) | n/a | n/a |

None of the checked pages sent `x-robots-tag` or a robots meta on production.

## Keyword opportunities (Proposed, unmeasured)

From the 2026-10-13 homepage audit and [COMPETITORS](COMPETITORS.md); no rank or volume data was collected:
- Own "integration layer" and "AI agent integrations"; name MCP, OAuth, webhooks and tool calling in body copy.
- Comparison pages for the new buyer (Paragon, Merge, Composio, StackOne, Membrane), verdict first, consistent criteria, every competitor cell sourced. Today's `/embed/*` and `/migration/*` tables have unsourced competitor cells and a mislabelled table; fix those before building more.
- One page per use case (for example an AI support agent with Shopify and Gmail).
- Developer articles under `/blogs`: build vs buy, multi-tenant OAuth, adding tools to an agent.
- Proof that would lift E-E-A-T (a real security posture statement, logos, a Hotelator OS case study) must be real first.
