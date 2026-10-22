---
covers: ["src/const/tables.js", "src/const/fields.js", "src/utils/getData.js", "src/utils/axiosCalls.js", "src/utils/abTestVisitor.js", "src/app/lib/**"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# Database — table-api entities

> Catalog of every table the site reads or writes. Connection, auth, caching and failure behaviour: [current-infrastructure/table-api.md](../current-infrastructure/table-api.md). This file owns table ids, purposes, field lists and getters.

## Overview
All tables live in table-api.viasocket.com, in three databases: **content** (`65d2ed33fa9d1a94a5224235`, every constant in `src/const/tables.js` except `ABTESTCOUNT`, plus four tables addressed by literal id), **blog** (`66029bf861a15927654de175`) and **A/B tracking** (`65c4c053a3fad7804af5bba8`). Purposes below are inferred from table and field names and from the loaders that call them; the table service is the only authority on actual column types.

**Connection:** `NEXT_PUBLIC_DB_BASE_URL` + `NEXT_PUBLIC_DB_KEY` / `NEXT_PUBLIC_BLOG_DB_KEY` / `NEXT_PUBLIC_DB_KEY_ABTEST` → `src/utils/axiosCalls.js` (via `src/utils/getData.js` for content tables)
**Access posture:** content and blog read-only; A/B table GET/POST/PATCH from `POST /api/track-variant` only, currently short-circuited ([OPEN_QUESTIONS T-01](../OPEN_QUESTIONS.md)). No DELETE exists.

To add a table: constant in `src/const/tables.js`, `*_FIELDS` in `src/const/fields.js`, wrapper in `src/utils/getData.js` (`getDataFromTable(TABLE, handleFieldsFilter(fields, filter), pageUrl)` → `data.data.rows`), call from a loader in `src/app/lib/`, then add a row here.

---

## Entity: content tables (`src/const/tables.js`)
**Role:** CMS rows for page sections. Every getter takes `(fields, filter, pageUrl)` and returns `rows` (or `undefined` on error). Filters shown are the ones callers pass; blank means none.

| Constant (id) | Purpose (inferred) | Fields constant (`src/const/fields.js`) | Getter (`src/utils/getData.js`) | Used by |
|---|---|---|---|---|
| `FOOTER` (`tbl6u2cba`) | Footer link groups | `FOOTER_FIELDS` | `getFooterData` | almost every loader in `src/app/lib/*`; `src/app/hire-an-expert/page.js`; `src/app/migration/{zapier,n8n,relay}/page.js` |
| `NAVBAR` (`tbl6sqnav`) | Navbar link groups | `NAVBAR_FIELDS` | `getNavbarData` | almost every loader; `src/app/hire-an-expert/page.js` |
| `ALLFEATURES` (`tbl5p2jus`) | Feature pages (slug, FAQs, CTA copy) | `ALLFEATURES_FIELDS` | `getAllFeatures`; `getFeatureData` with `filter=slug='<slug>'` | `src/app/lib/feature-data.js:getFeaturesPageData` (`/features/[...feature]`) |
| `FAQS` (`tblnoi7ng`) | FAQ rows keyed by `page` | `FAQS_FIELDS` (unused) | not via getData: `src/utils/axiosCalls.js:getFaq` (literal id) → `src/utils/getFaqData.js:getFaqData(page)` | most loaders (`getFaqData('/index')`, `'/workflow-automations'`, ...) |
| `CATEGORY` (`tblh9c91k`) | App categories (slug, headings, app count) | `INTECATEGORY_FIELDS` (`filter=slug='<category or all>'`), `INTECATEGORYlIST_FILED` | `getCategoryData` | `src/app/lib/integration-data.js:getIntegrationsPageData`, `src/app/lib/mcp-data.js:getMCPPageData` |
| `TESTIMONIALS` (`tblwql8n1`) | Testimonials | `TESTIMONIALS_FIELDS` | `getTestimonialData` | `src/app/lib/support-data.js:getSupportPageData` |
| `CASESTUDY` (`tblwoqytc`) | Case studies | `CASESTUDY_FIELDS` | `getCaseStudyData` | none |
| `INDEXFEATURES` (`tblvo36my`) | Homepage feature blocks | `INDEXFEATURES_FIELDS` | `getIndexFeatures` | none |
| `PAGE` (`tblmsw3ci`) | Page headings h1–h3 | `PAGEDATA_FIELDS` | `getPageData` | `src/app/lib/data.js:getExpertsPageData`, `getAgencyPartnerPageData` |
| `AGENCIES` (`tblajmg8e`) | Partner agencies | `AGENCIES_FIELDS` (`filter=verified=true` / `filter=verified IS NULL`) | `getAgencies` | `getExpertsPageData`, `getAgencyPartnerPageData` |
| `EXPERTBLOGS` (`tblirrj24`) | Expert blog links | `EXPERTBLOGS_FIELDS` | `getExpertBlogs` | `getExpertsPageData` |
| `PRICINGBETTERCHOICE` (`tblfj3wrr`) | Pricing comparison | `PRICINGBETTERCHOICE_FIELDS` (`[]`) | `getPricingBetterChoice` | none |
| `PROGRAMS` (`tbl44ztmk`) | Free-access programs (`tagine` is the column's spelling) | `PROGRAMS_FIELDS` | `getProgramsData` | `src/app/lib/data.js:getFreeAccessProgramsPageData` |
| `TRUSTEDBY` (`tblsaw4zp`) | "Trusted by" logos | `TRUSTEDBY_FIELDS` | `getTrustedByData` | none |
| `DISCONNECTED` (`tbleptzd5`) | Disconnected-app notes | `DISCONNECTEDBY_FIELDS` | `getDisconnectedData` | none |
| `EMBED` (`tblkelgtd`) | Embed page blocks | `EMBED_FIELDS` | `getEmbedData` | `src/app/lib/data.js:getEmbedPageData` (`/embed/*`) |
| `USECASES` (`tblvu0f6w`) | Per-app use cases | `USECASES_FIELDS` (`filter=slugname='<appone>'`) | `getUsecasesData` | `getIntegrationsPageData` |
| `COUNTRIES` (`tblxvza45`) | Country pricing (currency, discount) | `COUNTRIES_FIELDS` (two pages: no filter, `offset=200`) | `getCountriesData` → `src/utils/getCountries.js` | `src/app/lib/pricing-data.js:getPricingPageData` |
| `TEMPLATES` (`tblz2bm2n`) | Valid template names | `TEMPLATES_FIELDS` | `getValidTemplatesData` | none (templates come from the plug service) |
| `MCP` (`tblctk342`) | MCP prompts per app | `MCP_FIELDS` (`filter=slug_names='<appslugname>'`) | `getMCPPromptData` | `getMCPPageData` |
| `PRICINGFEATURE` (`tbl76iei5`) | Pricing feature list | `PRICINGFEATURE_FIELDS` | `getPricingFeatureData` | `getPricingPageData` |
| `INDEXTEMPLATE` (`tbllsxcvm`) | Homepage template tiles | `INDEXTEMPLATE_FIELDS` | `getIndexTemplateData` | `src/app/lib/data.js:getHomePageData` (old homepage, not rendered: [OPEN_QUESTIONS C-01](../OPEN_QUESTIONS.md)) |
| `DOFOLLOWLINK` (`tblxpnrit`) | Apps whose website link is dofollow | `DOFOLLOWLINK_FIELDS` | `getDoFollowStatus` | `getIntegrationsPageData` → `src/utils/ExternalLink.jsx:relForApp` |
| `BLACKFRIDAYSALE` (`tblfvu5ld`) | Black Friday offers | `BLACKFRIDAYSALE_FIELDS` | `getBlackFridaySaleData` | `src/app/lib/black-friday-sale-data.js` |
| `DEPARTMENTDATA` (`tblghuop9`) | Department pages | `DEPARTMENTDATA_FIELDS` | `getDepartmentData` | `src/app/lib/department-data.js` (both loaders) |
| `TEMPLATEMARQUEEITEMS` (`tblfks0b4`) | Automations marquee | `TEMPLATEMARQUEEITEMS_FIELDS` | `getTemplateMarqueeItemsData` | `src/app/lib/automation-data.js:getAutomationsPageData` |
| `SOCIALREVIEWS` (`tblfttfs0`) | Review cards | `REVIEWSECTION_FIELDS` | `getReviewSectionData` | `getHomePageData`, `getDepartmentsPageData`, `getLifetimeDealPageData`, `getPricingPageData`, `getWebinarPageData`, `src/app/migration/*/page.js` |
| `SINGLEAPPINTEGRATIONDATA` (`tbld4bjdd`) | Single-app page SEO copy | `SINGLEAPP_FIELDS` (`filter=app_slug='<appone>'`) | `getSingleAppIntegrationData` (returns first row or `{}`) | `getIntegrationsPageData` |
| `FEATUREDTEMPLATES` (`tblvb5p9d`) | Featured template names | `FEATUREDTEMPLATES_FIELDS` | `getFeaturedTemplatesData` | `getAutomationsPageData`, `getHomePageData` |
| `WEBINAR` (`tbll1z70k`) | Webinar listings | `WEBINAR_FIELDS` | `getWebinarData` | `src/app/lib/webinar-data.js` |
| `ABTESTCOUNT` (`tbla8b06r`) | **A/B DB**, see below | `ABTEST_ROW_FIELDS` in `src/utils/axiosCalls.js` | `getAbTestVisitorRows`, `saveAbTestVisit`, `updateAbTestVisit` | `src/app/api/track-variant/route.js` |

`FEATUREBANNER_FIELDS` has no table and no caller.

## Entity: tables addressed by literal id
**Role:** read by dedicated helpers in `src/utils/axiosCalls.js`, not through `src/const/tables.js` ([OPEN_QUESTIONS S-02](../OPEN_QUESTIONS.md)).

| Column | Type | Notes |
|---|---|---|
| meta `tbl2bk656` | rows matched on `name` (page path, e.g. `/`) | `getMeta` → `src/utils/getMetaData.js:getMetaData(name)` |
| industries `tblxy04hk`, departments `tbluyx8o1` | full rows | `getIndustries`, `getDepartments`, from the browser in `SearchInputHomeOptimized.js` |
| videos `tblh3g587` | rows with `tags` array, `rowid` | `getVideos` → `src/utils/getVideoData.js` (tag match, max 6) |
| blog `tblngzrs5` (blog DB) | rows with `tags` array, `rowid` | `getBlogs` → `src/utils/getBlogData.js` (tag match, 4–6 cards, `index` fallback) |

---

## Entity: `ABTESTCOUNT` (visitor-tracking row)
**Role:** one row per anonymous visitor (by `visitor_id` cookie). Written by `src/utils/abTestVisitor.js:toRowFields` (same column set for insert and update); read by `ABTEST_ROW_FIELDS`. All values are written as strings or numbers; JSON columns hold `JSON.stringify` output.

| Column | Type | Notes |
|---|---|---|
| `rowid` | string `row…` | Table-assigned; PATCH target (validated `/^row[a-z0-9]+$/i`) |
| `autonumber` | number | Table-assigned; lookup sorts by it so the oldest row is canonical |
| `createdat` | timestamp | Table-assigned; read only |
| `name` | JSON string | Visitor profile, `profileVersion: 2` (shape below). Lookup matches `name LIKE '%<visitorId>%'`. A merged duplicate holds `{ visitorId, mergedInto: <rowid>, profileVersion }`. |
| `user_id` | string | `visitor_id` UUID |
| `varient` | `A` \| `B` | **Spelling is the table's.** First-touch variant |
| `view_count` | number | Visits (sessions) anywhere on the site; `0` on merged rows |
| `revisit_count` | number | `view_count - 1`, min 0; `0` on merged rows |
| `environment` | `production` \| `test` \| `local` | From the route's `getEnvironment`; kept from the canonical row on update |
| `utmdata` | JSON string | First-touch UTM object |
| `signup` | JSON string \| null | Signup *intent*: `signup_clicks`, `signup_page_views`, `login_clicks`, `variant`, `last_source`, journey. Null until any signup click or `/signup` view |
| `timestamp` | ISO string | Time of this write |
| `click_data` | JSON array | Last 100 click events (`MAX_CLICK_EVENTS`) |
| `page_data` | JSON array | Last 100 page events (`MAX_PAGE_EVENTS`) |
| `last_action`, `last_action_at` | string, ISO | Latest interaction |
| `session_id` | string | Latest client session id (≤ 64 chars) |
| `last_visit_at` | ISO string | Start of latest visit |
| `first_url`, `last_url` | linked record | **Never written**: `LINKED_RECORD_COLUMNS` deletes them because a plain URL fails the whole row. URLs live in `name` (`firstPageUrl`, `lastPageUrl`) and `page_data`. Read back as null. |

There is no `variant`, `user_info` or `referrer` column; misspelling a column rejects the entire write.

Profile JSON in `name` (`src/utils/abTestVisitor.js:emptyProfile`, minus `clicks`/`pages`, which go to their own columns):

```js
{
  profileVersion: 2, visitorId, firstSeen, lastSeen, firstPageUrl, lastPageUrl, firstVariant,
  device: {}, screen: {}, browser: {}, ipAddress,            // from collectUserInfo + request headers
  views: { total, home }, pageViews: {}, variantViews: {}, cta: { count, bySource: {} },
  signupViews, signupViewAt, firstUtm: {}, lastUtm: {}, lastViewKey, lastViewAt, mergedRows: [],
  clickCount, pageEventCount, sessionId,
  visits, visitSessionId, visitAt,                           // source of view_count / revisit_count
  homeSessions, homeSessionId, homeSessionAt,                // homepage-only A/B figure
  firstUrl, lastUrl, referrer, lastAction, lastActionAt, lastVisitAt,
  signupClicks: { count, ... }, loginClicks: { count, ... }
}
```
Rows written by older tracker versions (no `profileVersion`) are converted by `readProfile` and folded in by `absorbRow`, at most `MAX_MERGES_PER_REQUEST` (10) per request.

---

## Cross-System References
- **`visitor_id` cookie ↔ row.** `user_id` and `name.visitorId` hold the cookie's UUID; there is no key constraint, only the `LIKE` lookup. The cookie is on `.viasocket.com`, so test and production visitors share it while the lookup ignores `environment` ([OPEN_QUESTIONS T-02](../OPEN_QUESTIONS.md)).
- **`mergedInto` → `rowid`.** A merged row points at the surviving row inside its `name` JSON; not a foreign key.
- **`utm_source` ↔ MSG91 `state`.** `utmdata` / `firstUtm` record what the visitor arrived with; the same `utmData` cookie is what `setUtmSource()` passes to MSG91 as `state` at signup. Joining a tracking row to a signup is only possible through that value; no id crosses over ([third-party-services.md](../current-infrastructure/third-party-services.md)).
- **`appslugname` ↔ plug service.** `DOFOLLOWLINK.appslugname`, `USECASES.slugname`, `SINGLEAPPINTEGRATIONDATA.app_slug`, `MCP.slug_names` and video/blog `tags` hold plug service app slugs; `CATEGORY.slug` matches plug service categories ([plug-service.md](../current-infrastructure/plug-service.md)). A renamed slug in the plug service silently orphans these rows.
- **Page path ↔ meta / FAQ rows.** Meta rows are matched by `name` (`'/'`, `'/pricing'`), FAQ rows by `page` (`'/index'` for the homepage loader). Renaming a route needs the table rows renamed too.
