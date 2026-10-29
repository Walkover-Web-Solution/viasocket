---
covers: ["src/app/**/page.js", "src/app/**/route.js", "next.config.js", "src/middleware.js", "public/_redirects", "src/app/sitemap.js"]
verified_at: 766f6f54
verified_on: 2026-10-28
---
# 05 Navigation Structure

This file is the single home of the route map. A clean `npm run build` lists **57 routes**. Each is listed below with the file that renders it. How each route resolves at runtime is in [ARCHITECTURE](ARCHITECTURE.md#request-path-cloudflare-pages), and the journeys through these routes are in [FLOWS](FLOWS.md).

## Top-level Routes

| Route | Screen | Purpose |
|---|---|---|
| `/` | `public/new-home/index.html` (static, through the `beforeFiles` rewrite). `src/app/page.js:HomePage` builds but never serves | Homepage: integration/action-layer pitch, setup prompt, signup |
| `/_not-found` | `src/app/not-found.js` | Global 404 | <!-- verify:ignore -->
| `/agency-partner` | `src/app/agency-partner/page.js` with sections from `src/components/agencyPartner/`; `getAgencyPartnerPageData` | Agency partner program (Stripe buy link, cal.id) |
| `/agency-partner/success` | `src/app/agency-partner/success/page.js` (static `○`) | Thank-you page after payment |
| `/api/track-variant` | `src/app/api/track-variant/route.js:POST` | Visitor/variant tracking endpoint ([api/track-variant](api/track-variant.md)) |
| `/automations` | `src/app/components/automations/AutomationsClient.js`; `src/app/lib/automation-data.js:getAutomationsPageData` | Template directory with search and AI suggestions |
| `/automations/[...slug]` | `src/app/components/automations/AutomationSlugClient.js`; `getAutomationSlugPageData` | One template category or one template ([Deep links](#deep-link-conventions)) |
| `/black-friday-sale` | `src/app/components/black-friday-sale/BlackFridaySaleClient.js` | Seasonal partner-offer campaign |
| `/blogs` | `src/components/IntegrationsComp/addToProduct/BlogsPage.js`; `src/app/lib/blogs.js:getAllBlogs` | Blog index |
| `/blogs/[slug]` | `src/components/IntegrationsComp/addToProduct/BlogPostPage.js`; `getBlog` | One post; `notFound()` if unknown |
| `/data-deletion-policy` | `src/app/data-deletion-policy/page.js` (copy in the file) | Legal |
| `/data-retention-deletion` | `src/app/data-retention-deletion/page.js` (copy in the file) | Legal; target of `/data-retention-deletion-policy` |
| `/departments` | `src/app/departments/page.js`; `src/app/lib/department-data.js:getDepartmentsPageData` | Automation ideas by department |
| `/departments/[slug]` | `src/app/components/department/DepartmentClient.js`; `getDepartmentPageData` | One department; `notFound()` if unknown |
| `/developers` | `src/app/developers/page.js` (own `Header`/`Footer`, layout `src/app/developers/layout.js`) | Embed / developers funnel landing |
| `/developers/auth` | `src/app/developers/auth/page.js` | Embed auth feature page |
| `/developers/docs` | `src/app/developers/docs/page.js` (+ `src/app/developers/docs/layout.js`) | Developer docs (published contract) |
| `/embed` | `src/app/embed/page.js`. **Never renders**: it redirects to `/developers` | (retired) |
| `/embed/actions-for-ai` | `src/app/embed/actions-for-ai/page.js`; `src/app/lib/data.js:getEmbedPageData` | Embed use case: actions for AI |
| `/embed/actions-via-webhook` | `src/app/embed/actions-via-webhook/page.js` | Embed use case: webhook actions |
| `/embed/app-integration` | `src/app/embed/app-integration/page.js` | Embed use case: in-app integrations |
| `/experts` | `src/app/components/experts/AgencyList.js`; `src/app/lib/data.js:getExpertsPageData` | Expert/agency directory and meeting request |
| `/experts-are-live` | `src/app/experts-are-live/page.js` | Contact-an-expert page |
| `/features` | `src/components/IntegrationsComp/addToProduct/FeaturesPage.js` (copy `FEATURES_COPY`) | Key features, homepage design |
| `/features/[...feature]` | One feature. A slug in `src/components/IntegrationsComp/addToProduct/featurePages.js:FEATURE_PAGES` renders `FeatureDetailPage.js` (homepage design); any other slug still renders the old `src/app/components/features/FeaturesClient.js` from `src/app/lib/feature-data.js:getFeaturesPageData` until it is redirected | One feature |
| `/feedback` | `src/app/components/feedback/FeedbackSatisfiedClient.js` or `FeedbackUnsatisfiedClient.js` by `?variant=` | Post-support feedback; any other variant gets `notFound()` |
| `/find-apps/[...slug]` | `src/app/components/find-apps/FindAppsClient.js`; `src/app/lib/data.js:getFindAppsPageData` | A–Z app list for one letter. Any other segment count renders an inline "Page Not Found" with HTTP 200 |
| `/free-access-programs` | `src/app/free-access-programs/page.js` | Free-access program listing |
| `/hire-an-expert` | `src/app/hire-an-expert/HireExpertClient.js` | Hire-an-expert CTA to signup or cal.id |
| `/home` | `src/app/home/page.js`. **Never renders**: middleware 307s to `/` | (retired) |
| `/integrations` | `src/app/components/integrations/IntegrationsMain.js` → `src/components/IntegrationsComp/addToProduct/IntegrationsIndexPage.js`; `src/app/lib/integration-data.js:getIntegrationsPageData` | Integrations directory |
| `/integrations-script` | `src/app/components/integrations-script/SetupBuilder.js` and sections | Embed-script setup builder (`?templateId=`, `?app=`) |
| `/integrations/[...slug]` | `IntegrationsMain` (branches in [Deep links](#deep-link-conventions)) | Category, single-app or app-pair pages |
| `/lifetime-deal` | `src/app/lifetime-deal/LifetimeDealClient.js` (own `LifetimeDealFooter`) | Lifetime-deal campaign (Stripe) |
| `/lifetime-deal/success` | `src/app/lifetime-deal/success/page.js` (static `○`) | Thank-you page |
| `/mcp` | `src/app/mcp/page.js`. **Never renders**: it redirects to mushrooms.viasocket.com | (moved) |
| `/mcp/[...slug]` | `src/app/components/mcp/McpMain.js` → `McpAppComp` (app) or `McpIndexComp`; `src/app/lib/mcp-data.js:getMCPPageData` | MCP page per app. Unknown → `ErrorComp` |
| `/mcp/aiagent` | `src/app/mcp/aiagent/page.js` | MCP for AI agents |
| `/mcp/saas` | `src/app/mcp/saas/page.js` | MCP for SaaS |
| `/migration/n8n` | `src/app/migration/n8n/page.js` | Switch-from-n8n campaign |
| `/migration/relay` | `src/app/migration/relay/page.js` | Relay.app alternative page; paid campaign (own `utm_source`) |
| `/migration/zapier` | `src/app/migration/zapier/page.js` | Switch-from-Zapier campaign |
| `/new-direction` | `src/components/IntegrationsComp/addToProduct/LetterPage.js` (`LETTER_COPY`) | Founders' letter; target of `/help` |
| `/og/[...path]` | `src/app/og/[...path]/route.js:GET` | Share image (og:image, twitter:image) of the page at `/<path>`: its hero drawn at 1200x630. Used by pages with no image of their own, through `src/app/lib/share-image.js` |
| `/pass` | `src/components/IntegrationsComp/addToProduct/PassPage.js` (`PASS_COPY`) | viaSocket Pass |
| `/pricing` | `src/components/IntegrationsComp/addToProduct/PricingPage.js` (`PRICING_COPY`) | For now the Free plan and a "Contact us" card; the paid plans and plan finder are kept in the code, unrendered |
| `/privacy` | `src/app/privacy/page.js` (copy in the file) | Legal |
| `/robots.txt` | `src/app/robots.txt/route.js:GET` | Robots, decided by env and host ([CONTRACTS](CONTRACTS.md#internal-api-routes)) |
| `/signup` | `src/app/components/customLogin/CustomLoginOptimized.js`; `src/app/lib/data.js:getSignupPageData` | MSG91 signup widget (`?redirect_to=`, `utm_*`) |
| `/setup-prompt` | `src/app/setup-prompt/SetupPrompt.js`. The server page is a static shell; `for`, `org`, `project` and `name` are read in the browser | SDK email landing. Copies a keys or first-run prompt. No header, footer, login or API call. `noindex, nofollow, noarchive` plus a `googlebot` meta and `X-Robots-Tag: noindex, nofollow`. Not listed in `src/app/sitemap.js`, not linked from any other page, and not `Disallow`ed in robots.txt |
| `/sitemap.xml` | `src/app/sitemap.js:STATIC_ROUTES` | Sitemap of the routes without params |
| `/support` | `src/app/components/support/SupportClient.js`; `src/app/lib/support-data.js:getSupportPageData` | Support form and live-support card |
| `/terms` | `src/app/terms/page.js` (copy in the file) | Legal |
| `/use-cases` | `src/components/IntegrationsComp/addToProduct/UseCasesPage.js` (`USECASES_COPY`) | Use cases, homepage design |
| `/webinar` | `src/app/components/webinar/WebinarCard.js`; `src/app/lib/webinar-data.js:getWebinarPageData` | Webinar registrations |
| `/workflow-automation-ideas` | `src/app/components/workflow-automation-ideas/AutomationSuggestionsClient.js` | AI automation-idea suggestions |
| `/workflow-automations` | `src/app/workflow-automations/page.js` (copy in the file) | Workflow-automation SEO landing page |

### Redirects, rewrites and middleware

Order of evaluation: `public/_redirects`, then `next.config.js` `redirects()`, then `src/middleware.js`, then the `beforeFiles` rewrite, then the filesystem, then the `afterFiles` rewrites. In Next, `permanent: true` produces a 308 and `permanent: false` a 307.

| Source | Destination | Status | Defined in |
|---|---|---|---|
| `/faq/a-step-by-step-guide` | `/faq/step-by-step-guide` | 302 (Cloudflare Pages default; no code given) | `public/_redirects` (but `/faq` is answered elsewhere) | <!-- verify:ignore -->
| `/help` | `/new-direction` | 301 | `next.config.js` |
| `/help/<anything>`, except paths under `FOOTER_HELP_PAGES` (`about-us`, `partners`, `plugin-builder`, `security-and-compliance`, `viasocket-embed/billing-partner`) | `/new-direction` | 301 | `next.config.js` (regex built from `FOOTER_HELP_PAGES`) | <!-- verify:ignore -->
| `/department/:path*` | `/departments/:path*` | 308 | `next.config.js` |
| `/data-retention-deletion-policy` | `/data-retention-deletion` | 308 | `next.config.js` |
| `/about` | `/help/about-us` (served by the help deployment) | 308 | `next.config.js` |
| `/variables` | `/features/variables` | 308 | `next.config.js` |
| `/login` | https://flow.viasocket.com/ | 307 | `next.config.js` |
| `/mcp/invgate-service-desk` | `/mcp/invgateservicemanagement` | 308 | `next.config.js` |
| `/mcp` | https://mushrooms.viasocket.com/ | 308 | `next.config.js` ([ADR-011](DECISIONS.md#adr-011-embed--developers-and-mcp--mushroomsviasocketcom)) |
| `/embed` | `/developers` | 308 | `next.config.js` |
| `/home` | `/` | 307 | `src/middleware.js:middleware` |
| `/` | `/new-home/index.html` | rewrite (`beforeFiles`) | `next.config.js` |
| `/feedback-satisfied`, `/feedback-unsatisfied` | `/feedback?variant=satisfied` / `unsatisfied` | rewrite (`afterFiles`) | `next.config.js` |

`src/middleware.js` does not run for `/og/...` (its `matcher`): share images need no redirects or cookies and are not page visits.

`/` and `/setup-prompt` are sent `Cache-Control: private, no-store` and `CDN-Cache-Control: no-store`. The setup page's response echoes the request URL, and that URL carries org and project ids, so a shared cache must not store it. `/setup-prompt` also sends `X-Robots-Tag: noindex, nofollow`. robots.txt does not `Disallow` that path, so a crawler can fetch the page and read the tag.

In-page redirects: `/integrations/[...slug]` with no data → `redirect('/integrations')` (307). `/automations/[...slug]` with no match → `redirect('/automations')` (307). Both are soft 404s ([FLOWS](FLOWS.md#2-failure-handling), [18-error-handling](18-error-handling.md)).

> [!WARNING]
> The `/help/*` regex covers whole subtrees. `/help/security-and-compliance/ai-transparency`, which the static homepage footer links to, is kept because it sits under a listed page. If you add a footer link to a new `/help/...` page, add it to `FOOTER_HELP_PAGES`, or this project will 301 it to `/new-direction`.

### Paths served by other deployments

These answer on viasocket.com but have no route here. Cloudflare routes them to other projects ([OPEN_QUESTIONS P-05](OPEN_QUESTIONS.md#p-05-paths-served-by-other-deployments)). Link to them as absolute URLs, and never add a route here that shadows them.

| Path | Evidence | Linked from |
|---|---|---|
| `/help/*` (the `FOOTER_HELP_PAGES` and their subpages) | On 2026-10-21 production `/help/trigger` returned the help deployment's 404, and only bare `/help` 301'd | `public/new-home/index.html` footer, `src/components/IntegrationsComp/addToProduct/SiteChrome.js` footer, `/about` redirect |
| `/blog` | Answers without this project's `x-matched-path` header (2026-10-21) | footers, blog cards (`getActionLayerBlogs` reads its RSS feed) |
| `/discovery` | Same | `public/new-home/index.html`, `src/components/IntegrationsComp/IntegrationsIndexComp/topCategoryBlogs.js` |
| `/community` | Same | `src/app/components/support/SupportClient.js` |
| `/faq` | Redirects to `/help` on production | — |
| `/automation-ideas/api/usecases` | Called as an API by `src/utils/axiosCalls.js:getUsecases`. No route here (inferred to be another deployment) | — |

## Navigation Model

There is no sidebar, command palette or client router. Visitors move through a top navbar, footer links, in-page CTAs and breadcrumbs, and every internal link is a **full page load**: `src/app/providers.js:AppProvider` intercepts same-origin `<a>` clicks and sets `window.location.href` ([ARCHITECTURE](ARCHITECTURE.md#entry-points--bootstrap-sequence)). The static homepage has no `AppProvider` and uses plain absolute links.

Four header/footer systems are in use. Pick the one that matches the page's design system ([DESIGN](DESIGN.md)):

| Chrome | Header | Footer | Used by |
|---|---|---|---|
| Static homepage | inline in `public/new-home/index.html` | inline in the same file | `/` |
| Homepage design in Next | `src/components/IntegrationsComp/addToProduct/SiteChrome.js:SiteHeader` (a copy of the static header, "Start free" goes to flow.viasocket.com/integrations) | `src/components/IntegrationsComp/addToProduct/SiteChrome.js:SiteFooter` | `/integrations`, `/integrations/<app>`, `/features`, `/use-cases`, `/new-direction` |
| Legacy site | `src/app/components/navbar/NavbarServer.js:NavbarServer` (reads the `prod` cookie) → `NavbarOptimized`, wrapped in `ConditionalNavbar` | `src/components/footer/footer.js` (table-api `footerData`), wrapped in `ConditionalFooter` | most other pages, plus the legacy integration components (app-pair, `?status=disconnected`), MCP and feature components |
| Developers sub-app | `src/app/developers/Header.js` | `src/app/developers/Footer.js` | `/developers/*` |

- **No navbar:** `/signup`, `/feedback`, `/setup-prompt`, `/find-apps/*`, `/workflow-automation-ideas` and both `success` pages. `/setup-prompt` also has no footer, no chat button and no login. `/lifetime-deal` has only its own `LifetimeDealFooter`. `/features/[...feature]` gets `NavbarServer` from `src/components/FeaturesComp/FeatureBannerComp/FeatureBannerComp.js` and its footer from `FeaturesFooterComp`.
- **Integration subdomains:** `ConditionalNavbar`/`ConditionalFooter` hide the legacy chrome on `integration.*`, `integrations.*` and `integrate.*` hosts (`src/utils/domain.js:isIntegrationSubdomain`).
- **Unreachable chrome:** `src/app/components/new-home/FooterNew.js` (`/home`), plus `src/components/footer/NewFooter.js` and `src/app/components/navbar/NewHeader.js` (`IndexPageContent`) render only on unreachable pages.
- **Breadcrumbs:** `src/components/breadcrumb/breadcrumb.js` is used by the legacy integration, feature and department components. `src/app/embed/EmbedBreadcrumbs.js` is used by the three `/embed/*` heroes. The `addToProduct` index and single-app pages render their own `<nav aria-label="Breadcrumb">`.
- **Logged-in state:** when the `prod` cookie exists, CTAs say "Dashboard" and go to flow.viasocket.com instead of `/signup` ([FLOWS](FLOWS.md#cross-cutting-navigation-facts)).

## Deep-link Conventions

| Pattern | Parsed by | Resolves to |
|---|---|---|
| `/integrations/<app>` | `src/utils/getInterationsInfo.js:getIntegrationsInfo` | "Add {app} to Your Product" (`AddToProductPage`), or `BetaNotice` for apps with no actions or triggers |
| `/integrations/<app>?status=disconnected` | same | older single-app page (`IntegrationsDisconnectedComp`) |
| `/integrations/<app>/<app2>` | same | app-pair page (`IntegrationsAppTwoComp`) |
| `/integrations/category/<cat>[/page/<n>]`, `/integrations/page/<n>` | same | directory filtered by category, page `n` of `APPERPAGE` apps | <!-- verify:ignore -->
| `/automations/<category-slug>` | `src/app/lib/automationSlugResolver.js:resolveAutomationSlug` | category page. A category match **beats** a template with the same slug |
| `/automations/<title-slug>` or `/automations/<title-slug>/<id>` | same (`generateSlug(title)`, then the id) | one template |
| `/mcp/<app>` (also `/mcp/category/<c>[/page/<n>]`) | `src/utils/getMcpInfo.js:getMcpInfo` | MCP app page or index | <!-- verify:ignore -->
| `/features/<slug>` | `featurePages.js:FEATURE_PAGES`, else `src/app/lib/feature-data.js:getFeaturesPageData` (first segment only) | one feature (new design, or the old page) |
| `/departments/<slug>` | `getDepartmentPageData` | one department, or 404 |
| `/find-apps/<letter>` | `getFindAppsPageData` (exactly one segment) | apps starting with that letter |

Query parameters with meaning:

- `?requestIntegration=true[&requestType=trigger|action|app]` opens the request-integration modal. It is set with `router.replace` by `src/components/IntegrationsComp/addToProduct/AppDirectory.js`, `BetaNotice.js` and `IntegrationsIndexClientComp.js` ([FLOWS](FLOWS.md#3-request-an-integration-modal)).
- `?templateId=a,b` and `?app=<slug>` (repeatable) carry the selection into `/integrations-script` (`src/hooks/useTemplateIds.js`, `SetupBuilder.js`).
- `?variant=satisfied|unsatisfied` selects the `/feedback` screen.
- `?for=keys|run` (default `keys`), `?org=` (digits only), `?project=` (`A–Z`, `a–z`, `0–9`, `_`, `-`) and `?name=` (text, 80 characters, default `your project`) on `/setup-prompt`. `org` and `project` are used only when both are valid; anything else is ignored. The page reads them in the browser and does not log the query.
- `?redirect_to=` on `/signup`. `utm_*`, `affiliate_*` and `ref` on any React page are captured into the `utmData` cookie, and `?rdt_cid=` into the `rdt_cid` cookie ([CONTRACTS](CONTRACTS.md#cookies)).

> [!WARNING]
> Slugs go raw into table-api filters and plug-service URLs ([FLOWS](FLOWS.md#2-failure-handling)). Never route a new deep-link segment into a lookup without validating it first.

The sitemap lists only routes without params (`src/app/sitemap.js:STATIC_ROUTES`). When you add a static route, add it there too, except `/setup-prompt`, which is omitted on purpose and must stay unlinked. `/use-cases` and `/new-direction` are still missing from it ([OPEN_QUESTIONS](OPEN_QUESTIONS.md) U-08).
