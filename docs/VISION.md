---
covers: ["public/new-home/**", "public/llms.txt", "src/app/**/page.js", "src/app/layout.js", "src/app/sitemap.js", "next.config.js"]
verified_at: a3e9bbd0
verified_on: 2026-10-28
---
# Product Vision & Strategic Direction

This repository is the **marketing website for viaSocket**, served at the bare domain https://viasocket.com. It is not the product. Its job is to bring visitors in through search and campaigns, explain the product, and hand them off to the product app at https://flow.viasocket.com with their signup source recorded. viaSocket itself is a platform from Walkover Web Solutions Pvt Ltd. for connecting apps. At `17b99cd8` the site describes it in two ways at once: as an integration layer for SaaS products and AI agents (the homepage, `/developers`, `/integrations`, `/features`, `/use-cases` and the founders' letter at `/new-direction`), and as a no-code AI workflow automation tool (most other pages and `public/llms.txt`).

## What This Site Is vs. What the Product Is

| Concern | Lives in this repo? | Where it actually lives |
|---|---|---|
| Landing pages, positioning copy, pricing pages, campaign pages | Yes | `src/app/**`, `public/new-home/` |
| Programmatic SEO pages (apps, app pairs, MCP apps, templates, departments, features) | Yes, the rendering. The content is not | Content comes from table-api and the plug service (see [CONTRACTS.md](CONTRACTS.md)) |
| Page `<title>`/description for most routes | Fallback strings only | A table-api metadata table read by `src/utils/getMetaData.js:getMetaData`. Editing the fallback in code usually changes nothing in production |
| Signup and login | Only the handoff | `/signup` renders `CustomLoginOptimized`; `/login` redirects to the flow app (`next.config.js`) |
| The product: building workflows, connections, the Embed/"Apps API" dashboard | No | flow.viasocket.com (`/integrations`, `/template/...`, `/documentation/skill.md`) <!-- verify:ignore --> |
| MCP product ("Mushrooms by viaSocket") | Only a few landing pages (`/mcp/aiagent`, `/mcp/saas`, `/mcp/[...slug]`) | mushrooms.viasocket.com. Bare `/mcp` redirects there permanently |
| Help centre (`/help/*`), blog, community, discovery | No | `/help` and most `/help/*` paths are retired: `next.config.js` 301s them to `/new-direction`, except the footer help pages (`FOOTER_HELP_PAGES`). Those pages, the blog, community and discovery are served by other deployments. See Unknowns |

The site's jobs, in the order the code puts effort into them:
1. **Rank in search.** Indexable, data-driven catch-all page families (`/integrations/...`, `/mcp/...`, `/automations/...`, `/departments/...`, `/features/...`), a native sitemap (`src/app/sitemap.js`) plus a backend sitemap, `public/llms.txt` for LLM crawlers, and JSON-LD on the homepage and root layout.
2. **Convert.** CTAs send visitors either to `/signup` or straight to flow.viasocket.com. The source is recorded in the `utmData` cookie and in the `utm_source` parameter.
3. **Run campaigns and programs.** Lifetime deal, Black Friday, Zapier/n8n/Relay migration, agency partners, experts, free-access programs and webinars.
4. **Run the developer/Embed funnel.** `/developers` (with `/developers/auth`, `/developers/docs`, `/developers/pricing`) and `/embed/*`. The funnel ends with a setup prompt that tells a coding agent to fetch the viaSocket skill. SDK emails also link to `/setup-prompt`, a noindex page that copies a keys or first-run prompt into that agent.

## Authoritative Sources & Status

Sources mined: the team answers to OPEN_QUESTIONS, 2026-10-22 (pasted into the session by the user; each answer is marked decided or proposed), `public/new-home/index.html` (homepage copy, FAQ, JSON-LD), `public/llms.txt`, `src/app/layout.js` metadata, page metadata and copy constants under `src/app/**`, `next.config.js` redirects, git history (`git log -300` and the bodies of the "New homepage" and `/developers` commits), and the user's Claude memory files. The README is empty and there is no PRD in the repo.

- **Approved Direction** (stated by the human or recorded as a deliberate decision in git):
  - The homepage at `/` is the static site in `public/new-home/`, served by a `beforeFiles` rewrite in `next.config.js`. It went to production as indexable with a canonical of https://viasocket.com/ (commits `1f911f58`, `a8f48657`, merged in PR #1830/#1831).
  - The homepage headline is "Integration Layer for Your Product & AI Agents": "You build the app or agent. viaSocket handles the connections and actions." Its "What viaSocket handles" table lists nine Embed capabilities (`75d86c93`).
  - **`/new-direction`, the founders' letter "Why we're changing viaSocket"** (`b3a7ab32`; `LETTER_COPY` in `src/components/IntegrationsComp/addToProduct/copy.js` is marked "Kept word for word with the approved copy"), signed by Pushpendra Agrawal (founder) and Ravi Paliwal (co-founder). It is the strongest statement of product direction in the repo. It says viaSocket is now "the integration and action layer for apps and AI agents": builders bring viaSocket into their own software instead of building workflows in viaSocket's editor, which should no longer be the centre of the experience. viaSocket keeps responsibility for connections, authenticated actions and events; the builder keeps the interface, application logic, hosting and choice of AI. The workflow engine and integrations still matter. A separate delegation-style product for businesses is in the works and is explicitly not part of this launch. `/help` and retired `/help/*` pages now 301 to this letter.
  - `/integrations`, `/integrations/{app}` ("Add {app} to Your Product & Agents"), `/features` ("viaSocket Key Features | Integration Layer") and the new `/use-cases` were rebuilt in the homepage design with copy the commits call approved (`18420492`, `3a516576`, `0705e2f0`, `b3a7ab32`).
  - `/embed` redirects permanently to `/developers`, which is described as "the action layer for AI products" (`7fd1dc19`, `src/app/developers/page.js:generateMetadata`). Bare `/mcp` redirects permanently to mushrooms.viasocket.com.
  - Releases flow from a feature branch to `test` (test.viasocket.com) to `main` (viasocket.com). Both are hosted on Cloudflare Pages (see [DEVELOPMENT.md](DEVELOPMENT.md)).
  - The working rules listed under Core Principles, which come from the user's memory.
  - **The integration layer is canonical everywhere** (P-01, decided, team answers to OPEN_QUESTIONS, 2026-10-22). Positioning line: "Integration Layer for your products & agents." Boundary line: "You build the app or agent. viaSocket handles the connections and actions." Pages that still say workflow automation are out of date, not a second positioning: the root `metadata` in `src/app/layout.js`, `public/llms.txt` and `/pricing` are pending an update to match the homepage.
  - **The static homepage's design system is the target for the whole site** (U-01, decided): Geist and Geist Mono, its colour tokens, square corners, and light/dark following the OS. The full rules are in the external "viaSocket Brand Guidelines" doc ([DESIGN.md](DESIGN.md)).
  - **The homepage source of truth is outside this repo** (C-01 and D-03, decided): `public/new-home/` is exported from the `viasocket-site` repo (`variants/simple-bento`) by `deploy/export-to-viasocket-repo.py --prod` and pushed to `test`. The old Next homepage tree is kept as the rollback path (reverting merge `cfdae23e` on `main` restores the A/B homepage) until the new homepage has run stably for a few weeks.
- **Current Implementation** (shipped at `17b99cd8`; the code does this, but no direction confirms it should stay):
  - Most other routes still use the earlier positioning (out of date per P-01 above), including app-pair pages (`/integrations/<app>/<app2>`) and `/features/{slug}`. The root `metadata` in `src/app/layout.js` says "Connect your apps and automate workflows". The `/home` and `src/app/page.js` fallbacks say "Automate Anything". `public/llms.txt` opens with "AI-powered automation platform … no-code workflows". `/pricing` sells workflow plans, while `/developers/pricing` sells task-metered "Action Layer" plans.
  - `src/app/page.js` and its A/B Index* components in `src/app/front-page/` are no longer what visitors see at `/`. See [DECISIONS.md](DECISIONS.md) and [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md). Do not delete them.
  - `/home` is a minimal placeholder route (`src/app/home/page.js`) and is listed in `src/app/sitemap.js`.
- **Proposals & Roadmaps** (from the team answers to OPEN_QUESTIONS, 2026-10-22; each needs the named owner's yes before it counts as approved):
  - **ICP and metrics** (P-02, proposed, Ankit to confirm): see [Target Audience](#target-audience--ideal-customer-profile-icp) and [Strategic Priorities](#strategic-priorities--success-measures).
  - **Pricing** (P-03, proposed): `/developers/pricing` is the canonical pricing page; `/pricing` sells the older workflow product and should either redirect or be rewritten.
  - **App count** (P-04, proposed, marketing to confirm 2,300+ vs 2,200+): use "2,300+ apps" everywhere, or tie all copy to the live count.
  - **Homepage attribution** (T-04, proposed): "Start free" and "Log in" carry `utm_source=/`, and the homepage passes incoming `utm_*`/`gclid` to flow.viasocket.com; done in `viasocket-site` and exported.
  - **Title format** (U-05, proposed): "X | viaSocket" via a `title.template` of `%s | viaSocket`.
- The public roadmap is hosted externally at roadmap.viasocket.com, linked from the homepage footer. No open branch or doc in the repo describes upcoming site work.
- **Unknowns & Ambiguities:** listed at the end of this doc. The canonical list is in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

## Target Audience & Ideal Customer Profile (ICP)

> [!TODO]
> **Proposed ICP, not yet approved** (P-02, team answers to OPEN_QUESTIONS, 2026-10-22, Ankit to confirm): developers and founders building a SaaS product or an AI agent who need their users to connect other apps (solution-aware, comparing ways to get integrations). Second: agencies building for clients. A large share of traffic is paid ads, which is why the homepage now offers Chat, Talk to an expert and Book a demo. Until confirmed, treat this as the working assumption and the list below as what the copy addresses.

Audiences the copy addresses (evidence in parentheses):
- **Developers building a SaaS product or an AI agent.** They want their users to connect third-party apps without building OAuth, mapping or webhooks themselves. They work in Cursor, Claude Code or Codex. (Homepage hero and FAQ; `/developers`; JSON-LD `applicationCategory: DeveloperApplication`.)
- **Teams and operators automating business workflows without code.** (`public/llms.txt`; `/automations`; `/departments`; `/features/{slug}`; `/workflow-automation-ideas`.)
- **People switching from another tool:** Zapier, n8n and Relay.app users (`src/app/migration/`). The Relay page carries its own paid-campaign tag.
- **Deal buyers:** lifetime-deal and Black Friday visitors (`src/app/lifetime-deal/`, `src/app/black-friday-sale/`).
- **Partners and service providers:** agencies, automation experts, billing partners and affiliates (`/agency-partner`, `/experts`, `/hire-an-expert`, links to `/help/partners`).
- **Impact organisations:** NGOs, education, women-led organisations and creators (`/free-access-programs`).

## Problems Solved & Value Proposition

The current lead story, taken from the homepage's "What viaSocket handles" table and `src/app/developers/Proof.js`:

| Customer problem (building it yourself) | How viaSocket solves it | Differentiator claimed in copy |
|---|---|---|
| A separate OAuth app, consent flow and token refresh for every service | One OAuth popup on each app's own consent screen; tokens are stored encrypted and refreshed | No OAuth apps or client secrets to own; your database keeps only a connection id |
| Every app shapes its data differently | Managed mapping across APIs and data formats | "Keeps every app's full set of actions", unlike a unified API that covers one category |
| Keeping each end user's connections separate | Multi-tenant connections and permissions | Each of your customers connects their own accounts |
| Building connect screens from scratch | A prebuilt connect flow, or your own UI with your branding | One component mounts the catalog, a single app, an action form or a saved flow |
| Public webhook endpoints and polling | Event subscriptions with sandboxed JS handlers; polling and retries handled | No public endpoint needed |
| An agent that needs tools | Every action ships with an input schema an agent can call | "2,300+ apps" behind one calling convention |

Older story, still live on most pages: no-code AI workflow automation with a large free tier ("100x the Free Tasks" versus Zapier on `/migration/zapier`), unlimited team members, free migration, and expert help.

> [!WARNING]
> The app count is claim-bearing copy, and it is not one number across the site. The proposed answer (P-04, pending marketing) is "2,300+" everywhere. The homepage and `/developers` say "2,300+". `src/app/lifetime-deal/page.js` computes `appCount + 300`. `/mcp/aiagent` falls back to "1000+". Some copy is fetched from table-api. Never change one of these in isolation. Ask which figure is authoritative.

## Core Principles & Design Philosophy

These are the site's operating principles. Each one is backed by code, a commit, or an explicit statement from the user.

1. **Search equity is an asset; preserve routes.** Existing URLs carry rankings and backlinks. When a page moves, add a permanent redirect in `next.config.js` (the `/embed`, `/mcp`, `/about` and `/department/*` pattern) and keep `src/app/sitemap.js` listing only final destinations (`7fd1dc19`). Production indexes; test must not. The `robots` value in `src/app/layout.js` is keyed on `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT`, and `src/app/robots.txt/route.js` disallows everything outside prod.
2. **Attribution integrity beats convenience.** A page tags its own signups with its path as `utm_source`. A campaign page keeps its literal campaign tag (`INTERNAL_UTM_SOURCES` in `src/utils/handleUtmSource.js` includes `relay-switch-google-ads`). External attribution already in the `utmData` cookie is never overwritten: `src/utils/handleUtmSource.js:savePageUtmSource` refuses unless `isInternalUtmSource` passes. `utm_source` appears once in a signup URL. A typed prompt travels in `utmData`, never in the query string. Tracking runs in local, test and prod, and its rows carry `environment`. Mechanics are in [FLOWS.md](FLOWS.md) and [CONTRACTS.md](CONTRACTS.md).
3. **Make the smallest change that does the job.** The user reviews diffs closely and has reverted edits that went beyond the request, including one that ran a repo-wide formatter during a one-line fix. Surface anything else you notice; do not fix it unprompted.
4. **Keep the codebase one idiom.** Port the design, content and behaviour of outside work, never its code. Use Tailwind first; a stylesheet needs a reason. Copy lives as constants in the component that renders it (`src/components/footer/NewFooter.js` shape). See [DESIGN.md](DESIGN.md).
5. **Data-driven pages stay data-driven.** Integration, MCP, template, department and metadata content comes from table-api through `src/const/tables.js` and `src/utils/axiosCalls.js`, with errors reported through `src/utils/SendErrorMessage.js:sendErrorMessage`. Endpoints come from env vars. Do not hardcode content or endpoints to "fix" a page.
6. **Production is the source of truth for behaviour.** The Cloudflare cache on viasocket.com behaves differently from test and local. Verify user-facing and cookie-dependent behaviour against the live domain. The bare domain is the only production host; there is no `www`.

## Strategic Priorities & Success Measures

- **Top priorities (inferred from the last ~6 weeks of commits, not confirmed):**
  1. Reposition around the integration/action layer for products and AI agents: the `/developers` build (late September), the new static homepage (13–15 October), then `/integrations`, `/features`, `/use-cases` and `/new-direction` in the homepage design (19–20 October). `/new-direction` states this direction outright.
  2. Keep signup attribution and A/B tracking correct across environments: the many `utm`, cookie and variant commits from July to September.
  3. Campaign and migration acquisition: Relay, Zapier, n8n, the lifetime deal, webinars.
- **Key Success Metrics:**

> [!TODO]
> **Proposed metrics, not yet approved** (P-02, Ankit to confirm): setup-prompt copies and "Start free" signups first, then demo bookings and chat starts from ad traffic. Proposed performance targets are in [14-performance](14-performance.md#budgets) (D-12).

## Boundaries & Non-Goals

- **Not the product app.** This site does not authenticate users beyond the signup handoff, store user data, or build workflows. Anything that needs a logged-in product capability belongs to flow.viasocket.com. If a page needs data the backends do not expose, specify the contract in [CONTRACTS.md](CONTRACTS.md) rather than mocking it.
- **Not the help centre, blog or Mushrooms site.** The footer help pages, the blog and mushrooms.viasocket.com are linked to, not built here. The rest of `/help` is retired to `/new-direction`.
- **The static homepage is a separate surface.** `public/new-home/` is plain HTML/CSS/JS. It does not go through `src/app/layout.js`, so it gets none of the global SCSS, `TrackingCookies`, `VariantTracker`, `RedditPixel` or Next metadata. It loads only GTM (`GTM-THTCRSLN`). Do not assume a site-wide component or tracker reaches `/`.
- **Anti-patterns (each has caused a revert or a correction before):** invented non-path `utm_source` tags; production-only gating of tracking ("Only production hits" was reverted); `www` host branches; prompts in query strings; editing the old homepage components when the request is about the new one; adding a dependency or framework from a ported repo.

## Unknowns Affecting Direction

The team answers to OPEN_QUESTIONS, 2026-10-22 settled the positioning (P-01) and the old homepage tree (C-01); both are recorded under Approved Direction above. What is still open:

> [!TODO]
> 1. **Confirmations pending:** the ICP and metrics (P-02, Ankit), the canonical pricing page and what happens to `/pricing` (P-03), the app count (P-04, marketing), homepage attribution (T-04) and the title format (U-05). Proposed answers are under Proposals & Roadmaps.
> 2. **Who owns `/help/*`, `/blog`, `/discovery` and `/community`?** They are other deployments (help centre, blog, discovery app); the team still needs to name the repo behind each path (P-05).
> 3. **When to retire the old homepage tree:** after the new homepage has run stably for a few weeks (C-01); no date is set.

## How Future Agents Must Evaluate Requests

Follow this protocol for every request on this site:
1. **Name the surface first.** Is the request about the static homepage (`public/new-home/`), a Next route under `src/app/`, a data-driven page whose content lives in table-api, or something on another host (flow app, `/help`, Mushrooms)? If the change belongs to another host or to the database, say so. Do not fake it in this repo.
2. **Align with Approved Direction.** Check the request against the positioning, principles and non-goals above. Copy that contradicts the homepage's integration-layer story, or the automation story where that page still uses it, is a positioning decision. Ask; do not just edit text.
3. **Protect search equity.** Never remove or rename a public route, change a canonical, flip `robots`/noindex, or drop a page from `src/app/sitemap.js` without an explicit request. Moving a URL means adding a permanent redirect and updating the sitemap to the final destination. Keep test non-indexable.
4. **Protect attribution.** Any CTA you add or change must follow the existing `utm_source` and `utmData` mechanics in [FLOWS.md](FLOWS.md): path-shaped sources, campaign tags kept as they are, one `utm_source` per URL, prompts in the cookie, tracking in all three environments. Tracking work is not done until a real write and a cache-busted read against the live table succeed. Say plainly when you could not run that check.
5. **Keep scope minimal.** Change only the lines the request needs. No drive-by refactors, formatting passes, new dependencies or decoration. List anything else you noticed as a suggestion.
6. **Improve unclear requests.** Ask a question when a request is ambiguous. Examples: "update pricing" (which of the two pricing pages?), "change the homepage" (the static `/` or the old `src/app/page.js`?), "update the app count" (which figure, and does it come from the DB?). Propose the interpretation that fits this doc.
7. **Flag conflicts and recommend declining.** Examples: a request to put a prompt in the URL, add a `www` branch, gate tracking to prod only, or hardcode a table-api endpoint. Explain which principle it breaks and offer the compliant alternative.
8. **Make direction changes explicit.** If the human deliberately changes positioning, ICP or the canonical pricing page, confirm the shift, then update this file and [DECISIONS.md](DECISIONS.md) along with the code.
9. **No fabricated integrations.** If a page needs a backend capability that does not exist (a new table, a plug-service field, a flow-app endpoint), write the required contract in [CONTRACTS.md](CONTRACTS.md). Never ship mock data or fake endpoints that make it look finished.
10. **Verify where it matters.** Run the build for code changes (see [DEVELOPMENT.md](DEVELOPMENT.md)). For cookie, cache or tracking behaviour, compare the response headers on production viasocket.com with test before you call it correct.
