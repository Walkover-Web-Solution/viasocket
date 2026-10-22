---
covers: ["src/app/automations/**", "src/app/lib/automation-data.js", "src/app/lib/automationSlugResolver.js", "src/app/components/automations/**", "src/app/workflow-automations/**", "src/app/workflow-automation-ideas/**", "src/app/components/workflow-automation-ideas/**", "src/app/integrations-script/**", "src/app/components/integrations-script/**", "src/components/templateCard/**", "src/components/categoryTemplates/**", "src/utils/templateIdManager.js", "src/hooks/useTemplateFilters.js", "src/hooks/useTemplateIds.js"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# Module: Automation templates

## Purpose

These pages cover ready-made workflow templates and the content around them:
- `/automations`: a searchable template gallery.
- `/automations/[...slug]` (`/automations/<slug>` or `/automations/<title-slug>/<id>`): one template, or one template category. <!-- verify:ignore -->
- `/workflow-automations`: an explainer ("What is workflow automation?").
- `/workflow-automation-ideas`: an app-picker that recommends workflows.
- `/integrations-script`: a builder for an embeddable `<script>` that shows an app's integrations or chosen templates on another site.

---

## Business Value

- Template CTAs open the template in the product (`https://flow.viasocket.com/template/<id>`). Inference: the module turns template browsing into product signups.
- These pages sell **workflow automation**, while `/`, `/integrations` and `/developers` lead with the integration layer. The integration layer is now the canonical positioning everywhere (P-01, decided 2026-10-22; [DECISIONS ADR-015](../DECISIONS.md#adr-015-the-integration-layer-is-the-canonical-positioning)), so this copy is out of date.

> [!TODO]
> The positioning is decided (P-01), but not what happens to these workflow-automation pages: reworded, kept for SEO, or retired. Proposed site metrics (P-02, pending) do not mention them ([OPEN_QUESTIONS](../OPEN_QUESTIONS.md)).

---

## Navigation Flow
1. Visitors arrive from the legacy navbar or footer, search, or `templateCard` links (`/automations/<title-slug>/<id>`).
2. They search or filter the gallery, open a template, view its flow diagram, share it, or copy its id.
3. Next stops: flow.viasocket.com/template/<id> (new tab, `?state=`), `/signup` via `DashboardButton`, or `/integrations-script?templateId=…`.

Slug resolution order, the CTA mechanics and the "template API down" footgun are in [FLOWS: Automation templates](../FLOWS.md#detailed-journey-automation-templates).

---

## Screens
### 1. Gallery (`/automations`)
`src/app/automations/page.js:AutomationsPage` (metadata in `src/app/automations/layout.js`) → `src/app/components/automations/AutomationsClient.js`.
- H1 "Search ready to use automations" and `SearchInputHomeOptimized` (apps, industries, departments). Templates are filtered client-side through `src/hooks/useTemplateFilters.js`, and `enableAi={false}` turns off the flow.sokt.io AI call on this page.
- `MarqueeComponent` (marquee apps and categories), the app and category filter chips, a `TemplateCard` grid with "Load More", `AutomationSuggestionsClient` ("Can't find the right template? Start with AI"), `AutomationIdeasSection`, `DashboardButton` (`utm_src` `/automations`), `BlogGrid`, `FaqSection` and `Footer`.
- Data: `getAutomationsPageData`. Only `verified` / `verified_by_ai` templates with a non-empty `flowJson.order.root` are shown, ordered featured first, then updated within 30 days (by `usedCount`), then the rest (`sortTemplatesForDisplay`).

### 2. Template or category (`/automations/[...slug]`)
`src/app/automations/[...slug]/page.js:AutomationSlugPage` (metadata in its `layout.js`) → `src/app/components/automations/AutomationSlugClient.js`.
- **Category** (`isCategory`): `src/components/categoryTemplates/categoryTemplates.js` lists the category's templates.
- **Template:** title and description, "Use template" (`handleRedirect` to flow.viasocket.com/template/<id>), share (`SharePopup`), `FlowRenderer` inside `ZoomableFlowContainer`, a markdown long description, three related templates, `DashboardButton` (`utm_src` `/automations/<title>`), and the FAQ (`/automation`).
- "Copy template id" writes the id to the clipboard, then sets `window.location.href` to `templateIdManager.generateUrl(id)`, which appends the id to `localStorage.copiedTemplateIds`.

### 3. Explainer (`/workflow-automations`)
`src/app/workflow-automations/page.js` with `src/app/lib/data.js:getWorkflowAutomationsPageData`. The table-api meta and FAQ wrap static copy defined in the loader (steps, benefits, examples, tool features), plus `ShowDepartmentOptimized`, `DashboardButton` and `FAQSection`.

### 4. Ideas (`/workflow-automation-ideas`)
`src/app/workflow-automation-ideas/page.js` renders **only** `src/app/components/workflow-automation-ideas/AutomationSuggestionsClient.js`: no navbar, no footer. The page awaits `getWorkflowAutomationIdeasPageData` but uses the meta only in `generateMetadata`. The client fetches apps and recommendations directly from the plug service.

### 5. Integration script builder (`/integrations-script`)
`src/app/integrations-script/page.js` with `getIntegrationsScriptPageData` (meta, footer, navbar, blogs `integrations-script`, `getApps({ limit: 500 })`). Sections: `SetupBuilder` (an apps or template-ids tab; `?app=` and `?templateId=` preselect), `WhyItMatters`, `HowItWorks`, `FinalCta`, `ShowBadges`, `SecuritySection` and `BlogGrid`. `SetupBuilder` outputs a `<script id="viasocket_integrations" src="https://integrations.viasocket.com/integrations.js">` tag with `primaryApp`/`appName{n}` or `templateIds`, plus optional `ref` and `domain`. `TemplatePreview` calls `getTemplates` from the browser.

---

## UI Components

Shared: `DashboardButton`, `FAQSection`, `Footer`, `NavbarServer`, `ConditionalNavbar`/`ConditionalFooter` and `MetaHeadComp` ([component catalog](../DESIGN.md#reusable-component-catalog)). Module-specific: `src/components/templateCard/templateCard.js` (the card link), `templateCardIcons.js`, `sharePopup.js`, `src/components/flowComp/flowRenderer.js`, `src/components/flowComp/zoomableFlowContainer.js`, `src/components/marqueeComponent/marqueeComponent.js`, and `src/app/components/home/SearchInputHomeOptimized.js`.

---

## Data Dependencies
1. **Loaders:** `src/app/lib/automation-data.js:getAutomationsPageData`, `getAutomationSlugPageData` → `src/app/lib/automationSlugResolver.js:resolveAutomationSlug` (`generateSlug`, `findTemplateBySlug`). Plus `src/app/lib/data.js:getWorkflowAutomationsPageData`, `getWorkflowAutomationIdeasPageData` and `getIntegrationsScriptPageData`.
2. **Plug service** ([plug-service](../current-infrastructure/plug-service.md)): `src/utils/axiosCalls.js:getTemplates` (`templates/all`, every template on every request), `getApps`, `getIndustries`, `getDepartments` (the last two from the client), and `AutomationSuggestionsClient` `fetchApps`/`fetchCombos` (`api/v1/plugins/all`, `api/v1/plugins/recommend/services`).
3. **Table-api** ([table-api](../current-infrastructure/table-api.md), [entities](../database/entities.md)): `src/utils/getData.js:getTemplateMarqueeItemsData`, `getFeaturedTemplatesData`, `getFooterData`, `getNavbarData`; plus `getMetaData`, `getFaqData`, `getBlogData`.

> [!WARNING]
> - The template page resolves against **all** templates, verified or not. Only the gallery filters on `verified`, so an unverified template is reachable by URL.
> - `src/app/components/integrations-script/TemplatePreview.js` and `SearchInputHomeOptimized.js` import `src/utils/axiosCalls.js` into client bundles ([OPEN_QUESTIONS S-01](../OPEN_QUESTIONS.md)).

---

## State Management
- **Server state:** per request through the loaders, with the `axios` memory cache ([ARCHITECTURE](../ARCHITECTURE.md#caching)).
- **Client state:** search and filter state in `SearchInputHomeOptimized` / `useTemplateFilters`, and the visible count for "Load More". `localStorage.copiedTemplateIds` (`templateIdManager`, `useTemplateIds`) carries template ids into `/integrations-script`.

---

## API Dependencies
- Global view and click tracking through `/api/track-variant` ([../api/track-variant.md](../api/track-variant.md)).
- External: plug service and table-api as above. The template CTA hands off to flow.viasocket.com with `?state=` from `handleRedirect` ([FLOWS](../FLOWS.md#3-how-each-entry-point-reaches-signup)).

---

## Loading / Empty / Error States
- **Loading:** `onLoadingChange` flags in the gallery search. No route-level loading UI.
- **Empty:** sections with no data are skipped (`faqData?.length > 0`, `blogData?.length > 0`).
- **Error:** an unresolved slug causes a 307 to `/automations` (`redirect`), including every template URL when `getTemplates` fails ([OPEN_QUESTIONS C-06](../OPEN_QUESTIONS.md)). The loaders' `catch` blocks return fallback meta (title "viaSocket Template" / "Workflow Automation Templates").

---

## Development Tasks (Open Items)
- [ ] Decide whether unknown template slugs, and a failed template fetch, should 404 rather than redirect ([OPEN_QUESTIONS C-06](../OPEN_QUESTIONS.md)).
- [ ] Decide whether these pages are reworded to the integration-layer positioning, kept for SEO, or retired ([OPEN_QUESTIONS P-01](../OPEN_QUESTIONS.md)).
- [ ] Keep `axiosCalls.js` out of client components ([OPEN_QUESTIONS S-01](../OPEN_QUESTIONS.md)).
- [ ] The CTA `handleRedirect` puts the whole cookie, prompt included, into `?state=` ([OPEN_QUESTIONS T-06](../OPEN_QUESTIONS.md)).
