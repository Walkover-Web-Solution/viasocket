---
covers: ["src/app/integrations/**", "src/app/lib/integration-data.js", "src/app/components/integrations/**", "src/components/IntegrationsComp/**", "src/utils/getInterationsInfo.js", "src/utils/getAppDetail.js", "src/utils/searchApps.js", "src/app/find-apps/**", "src/app/components/find-apps/**"]
verified_at: 17b99cd8
verified_on: 2026-10-30
---
# Module: Integrations directory

## Purpose

This module is the public catalog of the apps viaSocket connects to. It covers the directory (`/integrations`, with categories and paging), one page per app (`/integrations/{app}`, "Add {app} to Your Product"), app-pair pages (`/integrations/{app}/{app2}`), an A–Z index (`/find-apps/{letter}`), and the "Request an integration" form for missing apps or actions.

---

## Business Value

- Commits `18420492` and `3a516576` rebuilt the directory and the single-app page in the homepage design, leading with the integration-layer message ([OPEN_QUESTIONS P-01](../OPEN_QUESTIONS.md)). The primary action is "Copy setup prompt".
- Inference: there is one indexable page per app and per app pair, plus canonicals (`alternates.canonical`) and FAQ JSON-LD, so the module also serves organic search.

> [!TODO]
> Which metric judges these pages (prompt copies, signups, integration requests) is not stated anywhere ([OPEN_QUESTIONS P-02](../OPEN_QUESTIONS.md)).

---

## Navigation Flow
1. Visitors arrive from the homepage "2,300+ apps" link, the `SiteHeader`/footer links, search, or the legacy footer.
2. They search or browse categories, open an app, copy the setup prompt, or open "Request an App".
3. Next stops: an app page, an app-pair page, `/find-apps/{letter}`, or "Start free" (flow.viasocket.com/integrations, untagged, see [OPEN_QUESTIONS T-04](../OPEN_QUESTIONS.md)).

Route parsing, the loader branches and the failure table live in [FLOWS: Integrations directory](../FLOWS.md#detailed-journey-integrations-directory). This doc does not repeat them.

---

## Screens
### 1. Directory (`/integrations`, `/integrations/category/{cat}`, `…/page/{n}`)
`src/app/integrations/page.js` (base) and `src/app/integrations/[...slug]/page.js` → `src/app/components/integrations/IntegrationsMain.js:IntegrationsMain` → `src/components/IntegrationsComp/addToProduct/IntegrationsIndexPage.js`.
- **Hero:** H1, sub-heading and "List your app" text from `INDEX_COPY` (`src/components/IntegrationsComp/addToProduct/copy.js`) (the category H1 uses `categoryH1`).
- **`AppDirectory`:** category list (`categories`), app grid (`apps`, with the pinned app first via `CATEGORY_PINNED_APPS`), live search (`src/utils/searchApps.js:searchApps`, from the browser), Prev/Next links and a "Request an App" cell.
- **Blog cards:** `BlogPosts` with `actionLayerBlogs` (RSS feed).
- **FAQ:** `FaqSection` with `INDEX_COPY.faqs`. FAQ JSON-LD is emitted only on the base index.
- **A–Z strip:** links to `/find-apps/{letter}`.

### 2. Single app (`/integrations/{app}`)
`IntegrationsMain` → `src/components/IntegrationsComp/addToProduct/AddToProductPage.js` (chosen when the loader returns `actionLayerBlogs`).
- Breadcrumb, H1 (`RotatingWord`), "Copy setup prompt" with `promptFor({ name })`, and `OAuthDemo`.
- "#get-started" feature grid (`COPY.feats`), "#actions-triggers" (`EventsList` over `app.actions` / `app.triggers`), blog cards, "#about" (app links via `relForApp` / `appWebsiteUrl`), FAQ and the end CTA.
- **Beta app** (no actions and no triggers): the hero shows the beta copy and `BetaNotice.js` "Request" (`requestType=app`).
- Data: `appOneDetails` from `getCombos` → `src/utils/getAppDetail.js:getAppDetails`. All copy comes from `COPY` in the same `copy.js`, via `fill`.

### 3. App pair (`/integrations/{app}/{app2}`)
`IntegrationsMain` → `src/components/IntegrationsComp/integrationsAppTwoComp/integrationsAppTwoComp.js` (legacy design, `NavbarServer` + `Footer`). Sections in `integrationsAppTwoClientComp.js`: `HeroSection`, `TriggersAndActions`, `PopularFlows`, `TemplateContainer`, `HowItWorks`, `AIFeatureSection`, `AboutApps`, `BlogGrid`, `VideoGrid`, `FAQSection`, `FinalCTA`. Data: table-api meta for `/integrations/AppOne/AppTwo` with `[AppOne]`/`[AppTwo]` substituted, FAQ `[singleApp]`, combos, blogs, videos, verified templates, and `getSimilarApps` for each app.

### 4. Disconnected (`/integrations/{app}?status=disconnected`)
`IntegrationsMain` → `src/components/IntegrationsComp/integrationsAppOneComp/integrationsDisconnectedComp/integrationsDisconnectedComp.js` (legacy design). The loader's older single-app branch supplies category, combos, use cases and `getSingleAppIntegrationData` (meta and FAQ).

### 5. A–Z index (`/find-apps/{letter}`)
`src/app/find-apps/[...slug]/page.js` → `src/app/lib/data.js:getFindAppsPageData` (`fetchPluginData`) → `src/app/components/find-apps/FindAppsClient.js`. It renders the letter bar (`AlphabetComp`) and app links to `/integrations/{app}`. Only one segment is accepted.

> [!WARNING]
> - The `IntegrationsAppOneComp` branch in `IntegrationsMain` is unreachable: the single-app loader always returns `actionLayerBlogs`. Do not edit it to change `/integrations/{app}` ([OPEN_QUESTIONS C-08](../OPEN_QUESTIONS.md)).
> - `/find-apps` with zero or two or more segments renders an inline "Page Not Found" with **HTTP 200**, a soft 404. The `step == 0` branch of `FindAppsClient` never renders.

---

## UI Components

Shared pieces (`SiteHeader`, `SiteFooter`, `BlogPosts`, `FaqSection`, `CopyPromptProvider`, `AppDirectory`, `RequestIntegrationPopupOpener`, `FAQSection`, `MetaHeadComp`) are in the [component catalog](../DESIGN.md#reusable-component-catalog). The `addToProduct` styling (`addToProduct.module.scss`, Geist via `next/font`) is in [DESIGN](../DESIGN.md#homepage-system-in-next-addtoproductmodulescss).

Module-specific: `src/components/IntegrationsComp/addToProduct/OAuthDemo.js`, `EventsList.js`, `BetaNotice.js`, `RotatingWord.js`, and the request form `src/components/IntegrationsComp/IntegrationsBetaComp/integrationsRequestComp.js:RequestPlugin`. On the homepage-design pages the form sits inside `.root`. Dark mode restyles that copy from `addToProduct.module.scss` (`.request-form`); the daisyUI light modal is what legacy pages still show. See [DESIGN](../DESIGN.md#homepage-system-in-next-addtoproductmodulescss).

---

## Data Dependencies
1. **Loader:** `src/app/lib/integration-data.js:getIntegrationsPageData(slug, searchParams)`. It always fetches footer, app count, dofollow list and navbar, then branches as described in FLOWS.
2. **Table-api** ([table-api](../current-infrastructure/table-api.md), tables in [entities](../database/entities.md)): `src/utils/getData.js:getFooterData`, `getNavbarData`, `getCategoryData`, `getDoFollowStatus`, `getUsecasesData`, `getSingleAppIntegrationData`; `src/utils/getMetaData.js:getMetaData`; `src/utils/getFaqData.js:getFaqData`; `src/utils/getBlogData.js:getBlogData`; `src/utils/getVideoData.js:getVideoData`.
3. **Plug service** ([plug-service](../current-infrastructure/plug-service.md)): `src/utils/axiosCalls.js:getCombos`, `getApps`, `getAppCount`, `getTemplates`, `fetchPluginData`; `src/utils/searchApps.js:searchApps` (`plugins/search`, called from the client).
4. **Blog RSS:** `src/utils/axiosCalls.js:getActionLayerBlogs` (production feed from every environment, [OPEN_QUESTIONS S-05](../OPEN_QUESTIONS.md)).
5. **Static copy:** `src/components/IntegrationsComp/addToProduct/copy.js` (`COPY`, `INDEX_COPY`, `NAV`, `FOOTER_GROUPS`, `START_URL`), `src/const/integrations.js:CATEGORY_PINNED_APPS`.

---

## State Management
- **Server state:** per request, through the loader, with the in-memory `axios-cache-interceptor` cache ([ARCHITECTURE: Caching](../ARCHITECTURE.md#caching)).
- **Client state:** search text and results in `AppDirectory`, and the copy toast in `CopyPromptProvider`. The request modal's open state lives in the URL (`requestIntegration=true`, optional `requestType`) and is set with `router.replace`.

---

## API Dependencies
- No route of this site except the global `/api/track-variant` view and click tracking ([../api/track-variant.md](../api/track-variant.md)).
- External: plug service and table-api as above. The request form POSTs to a hardcoded flow.sokt.io webhook ([flow-webhooks](../current-infrastructure/flow-webhooks.md)).

---

## Loading / Empty / Error States
- **Loading:** `<Suspense>` around the `useSearchParams` clients in `IntegrationsIndexPage` and `AddToProductPage`, with no fallback UI.
- **Empty:** sections whose data is empty render nothing. A category with no row renders `src/components/404/404Comp.js` with HTTP 200.
- **Error:** an unknown app or a failed `getCombos` causes a 307 to `/integrations` (`redirect`). If the base page has no data, it renders `ErrorComp` or `notFound()`. See [FLOWS](../FLOWS.md#2-failure-handling) and [OPEN_QUESTIONS C-06](../OPEN_QUESTIONS.md).

> [!WARNING]
> Slugs are interpolated raw into table-api filters and plug-service URLs. Validate them before adding a lookup ([FLOWS](../FLOWS.md#2-failure-handling)).

---

## Development Tasks (Open Items)
- [ ] Decide whether unknown slugs should 404 instead of 307 ([OPEN_QUESTIONS C-06](../OPEN_QUESTIONS.md)).
- [ ] Keep or remove the unrendered single-app components ([OPEN_QUESTIONS C-08](../OPEN_QUESTIONS.md)).
- [ ] Decide whether `SiteHeader` "Start free" should carry `utm_source` ([OPEN_QUESTIONS T-04](../OPEN_QUESTIONS.md)).
- [ ] Give the request form a failure state ([OPEN_QUESTIONS U-06](../OPEN_QUESTIONS.md)).
- [ ] Confirm whether the `addToProduct` SCSS module and shared `copy.js` are the accepted pattern ([OPEN_QUESTIONS U-07](../OPEN_QUESTIONS.md)).
- [ ] Decide whether canonicals should be set only server-side, since `HeadComp` rewrites them ([OPEN_QUESTIONS U-03](../OPEN_QUESTIONS.md)).
