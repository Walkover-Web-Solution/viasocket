---
covers: ["src/app/mcp/**", "src/components/mcpComps/**", "src/app/lib/mcp-data.js", "src/app/components/mcp/**", "src/utils/getMcpInfo.js"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# Module: MCP

The `/mcp/*` pages sell viaSocket's MCP endpoint (a URL that lets an AI assistant call app actions). The product itself lives on the Mushroom site (mushrooms.viasocket.com and app.mushroom.viasocket.com). This repo serves only the per-app and category marketing pages plus two static pitch pages.

## Purpose
- `/mcp/<app>` answers "can my AI assistant use `<app>` through viaSocket MCP, and which actions does it get?"
- `/mcp/category/<c>` and `/mcp/page/<n>` list apps for MCP.
- `/mcp/aiagent` ("Ditch MCP, Embed Actions") and `/mcp/saas` (MCP for SaaS vendors) are static pitch pages.
- Bare `/mcp` is **not served here**: `next.config.js` `redirects()` sends it permanently to https://mushrooms.viasocket.com/ ([DECISIONS ADR-011](../DECISIONS.md)). `src/app/mcp/page.js` still exists but never renders, because redirects run before the filesystem routes.

---

## Business Value
> [!TODO]
> Not determinable from the repository. No commit or doc says whether MCP pages are still an acquisition channel. `/mcp/aiagent` argues *against* MCP in favour of Embed, which fits the integration-layer direction in [VISION](../VISION.md). The bare `/mcp` moved to the Mushroom site in `791e7c72` (2026-04-06). Needs a product owner.

---

## Navigation Flow
1. Visitors land from search or the backend sitemap. `src/app/sitemap.js` lists only `/mcp/aiagent` and `/mcp/saas`; it says dynamic MCP pages are covered by "the backend's own sitemap".
2. On an app page they read the actions and triggers (`McpEventsComp`), search other apps, or click **Get Your MCP URL**.
3. That CTA calls `src/utils/handleRedirection.js:handleRedirect` with app.mushroom.viasocket.com/login and the app slug as `customSource`, which opens a **new tab**. The index page CTA passes no custom source. The attribution effects (a non-path source locks the cookie for a day) are in [FLOWS](../FLOWS.md#4-alternative-branches) and [OPEN_QUESTIONS T-07](../OPEN_QUESTIONS.md#active-questions-table).
4. An app with neither a stored prompt nor events shows `RequestIntegrationPopupOpener` instead (the request flow is in [FLOWS](../FLOWS.md#3-request-an-integration-modal)).

---

## Screens
### 1. MCP app page (`src/app/mcp/[...slug]/page.js` → `src/app/components/mcp/McpMain.js` → `src/components/mcpComps/mcpAppComp/McpAppComp.js`)
- Routing: `src/utils/getMcpInfo.js:getMcpInfo` parses `['mcp', ...slug]` into `{appone, apptwo, category, page}`. Any first segment other than `category` or `page` is an app.
- Data (`src/app/lib/mcp-data.js:getMCPPageData`, app branch): meta under `/mcp/appName`, FAQs under `[mcpApp]`, category row, `getCombos`, 16 apps (`getApps`), then `getAppDetails`. When the app exists it also loads blogs tagged `mcp` and `getMCPPromptData` (filter `slug_names='<appslugname>'`).
- The step texts (`mcpAppSteps`) and benefit strings (`mcpAIIntegrationData`) are hardcoded in the loader, not in the component.
- Metadata replaces `[app_name]` in the table-api title and description.
- Client half `McpAppClientComp`: hero and CTA, events list, app search (debounced `src/utils/searchApps.js`), related apps with Prev/Next, categories, FAQ (`FAQSection`), `BlogGrid`, `Cta`, `Footer`.

### 2. MCP index / category (`/mcp/category/<c>[/page/<n>]`, `/mcp/page/<n>` → `src/components/mcpComps/mcpIndexComp/McpIndexComp.js`) <!-- verify:ignore -->
- Data (index branch): meta and FAQs, the category row, the app count (`getAppCount`), the category list, blogs tagged `mcp`, and paged apps. The loader hardcodes `mcpSteps`, the API-vs-MCP `tableData`, `featuresData` and `keyPointData`.
- `McpIndexComp` fires a Twitter conversion event (`twq('event', 'tw-pnuam-pnugc', …)`) through `next/script`. `twq` is defined by `src/components/headComp/headComp.js`.
- The client half `McpIndexClientComp` uses `McpIndexComp.module.scss` and `APPERPAGE` from `src/const/integrations.js`.

### 3. Pitch pages (`src/app/mcp/aiagent/page.js`, `src/app/mcp/saas/page.js`)
- Static JSX sections with daisyUI classes. The data comes from `getMCPAiAgentPageData` / `getMCPSaasPageData`: meta and FAQs under `/mcp`, footer, navbar, blogs (`mcp`, plus `saas` on `/saas`).
- CTAs go to cal.id (`/team/viasocket/embed`, `/team/viasocket/mcp`) and to `/help/viaSocket-MCP` and `/help/developer-hub`.

> [!WARNING]
> `/help/viaSocket-MCP`, `/help/developer-hub` and `/help/viaSocket-MCP/Fair-Usage-Policy` (linked from both MCP client components) are not in `FOOTER_HELP_PAGES`. On this deployment they therefore 301 to `/new-direction`. On production, which app answers `/help/*` depends on Cloudflare routing ([OPEN_QUESTIONS P-05](../OPEN_QUESTIONS.md#p-05-paths-served-by-other-deployments)).

---

## UI Components
- Feature-specific: `McpMain`, `McpAppComp` and `McpAppClientComp`, `McpIndexComp` and `McpIndexClientComp`, `McpEventsComp` (shows 6 events, then expands).
- Shared (older tree): `NavbarServer`, `FAQSection`, `Footer`, `BlogGrid`, `Cta`, `ErrorComp`, `MetaHeadComp`, `RequestIntegrationPopupOpener`. See the [DESIGN catalog](../DESIGN.md#reusable-component-catalog). The styling is legacy daisyUI plus Tailwind.

---

## Data Dependencies
1. **table-api:** `src/utils/getData.js:getMCPPromptData` (`MCP` table), `getCategoryData`, `getFooterData`, `getNavbarData`; `src/utils/getMetaData.js:getMetaData`; `src/utils/getFaqData.js:getFaqData`; `src/utils/getBlogData.js:getBlogData`. See [table-api](../current-infrastructure/table-api.md) and [database/entities](../database/entities.md).
2. **Plug service:** `src/utils/axiosCalls.js:getCombos`, `getApps`, `getAppCount`; `src/utils/searchApps.js` (client-side `fetch`). See [plug-service](../current-infrastructure/plug-service.md).
3. **App details:** `src/utils/getAppDetail.js:getAppDetails` picks `combosData.plugins[slug]`.

---

## State Management
- **Server state:** per request, through the loader. There is no cache beyond `axiosCalls.js` ([ARCHITECTURE](../ARCHITECTURE.md#caching)).
- **Client state:** search term, debounced value and results in `useState`, and `visibleEvents` in `McpEventsComp`. Nothing is persisted. The `utmData` cookie is only read, by `handleRedirect`.

---

## API Dependencies
- None of the site's own routes. External: the plug-service search and combos, table-api rows, and the Mushroom login URL (outbound link only).

---

## Loading / Empty / Error States
- **Loading:** the app search shows results as they arrive. There is no loading UI beyond `AppProvider`'s navigation skeleton.
- **Empty:** sections such as FAQ and blogs render only when they have data.
- **Error:** an unknown app slug or a loader throw gives `noData`, and the page renders `ErrorComp` with **HTTP 200** (a soft 404). An unknown category makes `McpIndexClientComp` render `ErrorComp`, also with 200. Only a throw during render reaches `notFound()`.

---

## Development Tasks (Next Phases)
- [ ] Decide the authoritative app-count copy ("1000+" in MCP metadata and loader text) ([OPEN_QUESTIONS P-04](../OPEN_QUESTIONS.md#active-questions-table)).
- [ ] Register or path-shape the MCP app-slug source ([OPEN_QUESTIONS T-07](../OPEN_QUESTIONS.md#active-questions-table)).
- [ ] Decide where the `/help/viaSocket-MCP*` and `/help/developer-hub` links should point, and whether unknown MCP slugs should 404 (new questions in M2 notes). <!-- verify:ignore -->
