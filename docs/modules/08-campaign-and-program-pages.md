---
covers: ["src/app/migration/**", "src/app/lifetime-deal/**", "src/app/black-friday-sale/**", "src/app/components/black-friday-sale/**", "src/app/webinar/**", "src/app/components/webinar/**", "src/app/free-access-programs/**", "src/app/experts-are-live/**", "src/app/departments/**", "src/app/components/department/**", "src/app/lib/lifetime-deal-data.js", "src/app/lib/black-friday-sale-data.js", "src/app/lib/webinar-data.js", "src/app/lib/department-data.js", "src/app/privacy/**", "src/app/terms/**", "src/app/data-deletion-policy/**", "src/app/data-retention-deletion/**"]
verified_at: 8fb15ca8
verified_on: 2026-10-26
---
# Module: Campaign, Program and Static Pages

Self-contained landing pages for paid campaigns and offers (migration, lifetime deal, Black Friday), programs (webinars, free access, departments, live experts) and the legal pages. Each one is a `page.js` plus a loader, rendered on the legacy daisyUI + Tailwind stack. `/embed/*` belongs to [module 04](./04-developers-embed.md).

## Purpose
- **Migration** (`/migration/zapier`, `/migration/n8n`, `/migration/relay`): "switch from X to viaSocket". Zapier still offers a hands-on migration. n8n is an Integration Layer alternative for SaaS builders: the copy says n8n fits internal automation, and viaSocket fits embedded multi-tenant integrations. It no longer offers a booked migration call. Relay is an evergreen alternative page: the copy says Relay.app has shut down, and it no longer offers a dated free year or a booked migration call.
- **Offers:** `/lifetime-deal` (Stripe one-off licences) with `/lifetime-deal/success`, and `/black-friday-sale` (a directory of partner-app deals).
- **Programs:** `/webinar` (upcoming webinars), `/free-access-programs` (free plans for specific groups), `/departments` and `/departments/[slug]` (automation ideas per team), `/experts-are-live` (live help: Google Meet, cal.id, phone, WhatsApp, email).
- **Legal:** `/privacy`, `/terms`, `/data-deletion-policy`, `/data-retention-deletion`.

---

## Business Value
- The migration, lifetime-deal and Black Friday pages exist for paid acquisition. Zapier, n8n and lifetime-deal load the Google Ads tag `AW-16852796533`, and Relay's tag is named `relay-switch-google-ads` (*observed*). Campaign attribution is why these pages keep their own `utm_source` ([DECISIONS ADR-012](../DECISIONS.md#adr-012-utm-attribution-conventions)).
- `/experts-are-live` is the "Talk to an expert" target of `/features` and `/use-cases` ([module 05](./05-features-and-use-cases.md)).

> [!TODO]
> Not determinable from the repository: which campaigns are still running. Black Friday links carry `utm_campaign=blackfriday2025`, and the lifetime-deal Stripe links have no end date. Needs marketing.

---

## Navigation Flow
1. Visitors arrive from ads (migration, lifetime deal), the navbar's `WebinarBanner` (`src/app/components/webinar/WebinarBanner.js`, shown on every `NavbarOptimized` page except `utm` `/index`, `/migration/relay` and `/webinar`), footers, or the sitemap (all these routes except `/departments/[slug]` are in `src/app/sitemap.js:STATIC_ROUTES`).
2. They act on the page's single CTA: signup, Stripe checkout, cal.id booking, or a partner deal.
3. Signup hand-off follows [FLOWS journey 1](../FLOWS.md#3-how-each-entry-point-reaches-signup). Stripe and cal.id leave the site.

### Campaign `utm_source` rules
| Page | CTA | Source sent | Mechanism |
|---|---|---|---|
| `/migration/relay` | `src/app/migration/relay/RelaySignupCTA.js` | `relay-switch-google-ads` | overwrites the whole `utmData` cookie, then `/signup?utm_source=…` |
| `/migration/zapier` | `ZapierSignupCTA` | `zapier-migration` | same |
| `/migration/n8n` | `N8nSignupCTA` | `n8n-migration` | same |
| `/black-friday-sale` | "Sign up" link | `/black-friday-sale` | plain `/signup?utm_source=` |
| `/free-access-programs` | each program card | `programs` (+ `utm_medium=<program name>`, unencoded) | plain link |
| `/departments`, `/departments/<slug>` | `DashboardButton` | `/departments/hero`, `departments/<slug>` (no leading `/`) | `handleRedirect` with `customSource` |
| `/lifetime-deal`, `/webinar`, `/experts-are-live` | none to signup | n/a | Stripe, registration links, cal.id |

> [!WARNING]
> `zapier-migration`, `n8n-migration`, `programs` and `departments/<slug>` are neither path-shaped nor in `INTERNAL_UTM_SOURCES` (`src/utils/handleUtmSource.js`; only `relay-switch-google-ads` is). Once one of them is in the cookie, later `savePageUtmSource` calls cannot overwrite it for a day. That lock is wanted for campaign tags but probably not for `departments/<slug>` (*inferred*). This is the same issue as [OPEN_QUESTIONS T-07](../OPEN_QUESTIONS.md#active-questions-table). The migration CTAs also **drop** any external UTMs and prompt already in the cookie ([FLOWS](../FLOWS.md#3-how-each-entry-point-reaches-signup)).

> [!WARNING]
> Zapier and n8n define `gtag_report_conversion` inline but nothing calls it, so no Ads conversion fires from those pages' CTAs (*observed*: no caller in `src/`).

---

## Screens
### 1. Migration (`src/app/migration/{zapier,n8n,relay}/page.js`)
- Zapier (`src/app/migration/zapier/`) renders Hero, StatCompare, Ways, ComparisonTable, reviews, UseCases, CTABanner, `SecuritySection` and the footer. The hero and banner book cal.id `workflow-setup-discussion`. Use-case cards open `/automations/<slug>` in a new tab.
- n8n (`src/app/migration/n8n/`) renders Hero, BuiltFor, Shortfalls, Difference, ComparisonTable, Audience, GetStarted, CTABanner, reviews and `SecuritySection`. Signup still goes through `N8nSignupCTA` (`n8n-migration`). Difference links `/developers/auth`, `/features`, `/embed/app-integration`, `/embed/actions-for-ai` and `/embed/actions-via-webhook`. Getting Started links `/developers/docs`, `/use-cases` and `/embed/app-integration`. The cal.id migration call and the workflow-import pitch are gone. There are no template cards.
- Relay (`src/app/migration/relay/`) renders Hero, Offers, ComparisonTable, GetStarted, automation patterns, reviews, a security paragraph plus `SecuritySection`, Explore further, and CTABanner. Signup still goes through `RelaySignupCTA` (`relay-switch-google-ads`). The comparison section links `/migration/zapier` and `/migration/n8n`. Offers link `/embed/app-integration` and `/use-cases`. Explore further repeats those destinations, and the closing banner links `/use-cases` with the anchor "see integration use cases". The top bar on this page (`src/app/components/navbar/Relay.js`) is a static shutdown line, not a Sep 14 countdown. `RelayRescueDeal` and the cal.id buttons are gone. Pattern cards do not link out to templates.
- Data: only `getFooterData` and `getReviewSectionData`. Titles are hardcoded in `generateMetadata`.

### 2. Lifetime deal (`src/app/lifetime-deal/page.js` → `LifetimeDealClient.js`)
- Sections: Hero, Comparison, HowItWorks, AIWorkflows, Integrations, Pricing, Unlock, Testimonials, Faq, FinalCta, `LifetimeDealFooter`. The page has **no site navbar or footer**.
- `src/app/lifetime-deal/Pricing.js` has three Stripe `buy.stripe.com` links. Stripe returns buyers to `/lifetime-deal/success` (`SuccessContent.js`, title "Lifetime License Activated").
- Data: `src/app/lib/lifetime-deal-data.js:getLifetimeDealPageData` (meta, footer, FAQs, navbar, reviews, app count). Only reviews and `appCount` are used: the FAQ is hardcoded in `Faq.js`, and `faqData` is passed but not destructured. App figures are `appCount + 300` ([OPEN_QUESTIONS P-04](../OPEN_QUESTIONS.md#active-questions-table)). `LifetimeDealFooter` links `/help`, which 301s to `/new-direction`.

### 3. Black Friday (`src/app/black-friday-sale/page.js` → `src/app/components/black-friday-sale/BlackFridaySaleClient.js`)
- A grid of partner deals from the `BLACKFRIDAYSALE` table (`getBlackFridaySaleData`). Each "View offer" opens `offerpricing_url` with UTM params and POSTs the app domain to a flow.sokt.io webhook ([flow-webhooks](../current-infrastructure/flow-webhooks.md)). "List your app" goes to tally.so.

### 4. Webinar (`src/app/webinar/page.js`)
- Cards from `src/app/lib/webinar-data.js:getWebinarPageData`. `handleWebinars` drops rows with no `name` and sorts by `date_in_ist`, with undated rows last. `WebinarCard` links to each row's `registration_link`.

### 5. Free access programs (`src/app/free-access-programs/page.js`)
- Program cards from the `PROGRAMS` table (`src/app/lib/data.js:getFreeAccessProgramsPageData`). The layout branches on `programs.length === 6`.

### 6. Departments (`src/app/departments/page.js`, `src/app/departments/[slug]/page.js` → `src/app/components/department/DepartmentClient.js`)
- The index lists every `DEPARTMENTDATA` row and links `/departments/<slug>`. `/department/*` 308s here (`next.config.js`).
- `src/app/lib/department-data.js:getDepartmentPageData` loads **all** department rows and finds the slug in JS. It fetches every template (`getTemplates`) and keeps those with `flowJson.order.root`. Blogs are tagged `department`, and meta is read under `/department/<slug>` (singular).

### 7. Live experts (`src/app/experts-are-live/page.js`)
- Static contact cards. It reuses `getExpertsPageData` (the `/experts` loader, [module 09](./09-lead-and-support-forms.md)) but uses only meta, footer and navbar.

### 8. Static and legal pages
- `/privacy` (`getPrivacyPageData`), `/terms` (`getTermsPageData`), `/data-deletion-policy`, `/data-retention-deletion` (loaders in `src/app/lib/data.js`). The legal text is JSX in each `page.js`; table-api supplies only meta, navbar and footer.
- `/data-deletion-policy` and `/data-retention-deletion` have **identical bodies** and differ only in titles. `/data-retention-deletion-policy` 308s to `/data-retention-deletion`. Both pages are in the sitemap. The `SiteFooter` links only `/data-retention-deletion`.

---

## UI Components
- Page-local components live in each route folder (`src/app/migration/zapier/`, `src/app/lifetime-deal/`) or under `src/app/components/<page>/`. Shared ones are `NavbarServer`, `Footer`, `ReviewIframeOptimized`, `SecuritySection`, `ShowBadges`, `FAQSection`, `BlogGrid` and `DashboardButton`. See the [DESIGN catalog](../DESIGN.md#reusable-component-catalog).

---

## Data Dependencies
1. **table-api** through `src/utils/getData.js` getters: `getReviewSectionData`, `getBlackFridaySaleData`, `getWebinarData`, `getProgramsData`, `getDepartmentData`, `getFooterData`, `getNavbarData`; plus `getMetaData` and `getFaqData`. See [table-api](../current-infrastructure/table-api.md) and [database/entities](../database/entities.md).
2. **Plug service:** `getAppCount` (lifetime deal, departments), `getTemplates` (departments). See [plug-service](../current-infrastructure/plug-service.md).
3. **External:** Stripe payment links, cal.id, tally.so, the flow.sokt.io offer-click webhook ([third-party-services](../current-infrastructure/third-party-services.md)).

---

## State Management
- **Server state:** one loader per page, per request. The `prod` cookie is read for `DashboardButton` on the departments pages.
- **Client state:** the migration CTAs write the `utmData` cookie ([CONTRACTS](../CONTRACTS.md#cookies)). Lifetime-deal components keep local UI state only.

---

## API Dependencies
- None of the site's own routes. The only write is the Black Friday offer-click webhook (fire-and-forget).

---

## Loading / Empty / Error States
- **Loading:** only `AppProvider`'s navigation skeleton.
- **Empty:** `/webinar` shows "No webinars are scheduled right now…". Other table-driven grids render empty.
- **Error:** loaders return empty defaults, so pages render partially. `/departments/<slug>` calls `notFound()` for an unknown slug or a loader error (a real 404).

---

## Development Tasks (Next Phases)
- [ ] Decide whether `programs` and `departments/<slug>` should be path-shaped or registered ([OPEN_QUESTIONS T-07](../OPEN_QUESTIONS.md#active-questions-table)).
- [ ] Settle the app-count copy on `/lifetime-deal` ([OPEN_QUESTIONS P-04](../OPEN_QUESTIONS.md#active-questions-table)).
- [ ] Decide whether the uncalled `gtag_report_conversion`, the duplicate data-deletion page and the expired Black Friday campaign stay (new questions in M2 notes).
