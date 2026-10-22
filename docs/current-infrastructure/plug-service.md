---
covers: ["src/utils/axiosCalls.js", "src/utils/searchApps.js", "src/utils/getAppDetail.js", "src/middleware.js", "src/app/components/workflow-automation-ideas/AutomationSuggestionsClient.js", "src/app/robots.txt/route.js"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# Plug service (`NEXT_PUBLIC_INTEGRATION_URL`)

viaSocket's app/plugin catalogue API: the apps, app pairs ("combos"), templates and app count shown across the site, plus the Reddit Conversions API relay.

> [!WARNING]
> **`NEXT_PUBLIC_INTEGRATION_URL` must end with `/`.** Every caller concatenates the path with no separator (`${NEXT_PUBLIC_INTEGRATION_URL}api/v1/plugins/all`). A base URL without the trailing slash produces `...comapi/v1/...` and every catalogue call fails soft to empty lists, which looks like "no apps" rather than an error.

## Role
Source of truth for the app catalogue (`/integrations`, `/mcp`, `/automations`, homepage app lists), app-pair recommendations, automation templates (`templates/all`), the live app count, and the backend sitemap listed in robots.txt. Dynamic integration/MCP/template pages exist only for slugs this service returns.

## Connection
- **Env var(s):** `NEXT_PUBLIC_INTEGRATION_URL` (base URL, trailing slash). Gates: `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod'` for the Reddit calls. Setup: [DEVELOPMENT.md](../DEVELOPMENT.md).
- **Client:** `src/utils/axiosCalls.js` (server loaders), `src/utils/searchApps.js` (browser, plain `fetch`), `src/middleware.js` (Reddit page-visit), and two raw `fetch` calls in `src/app/components/workflow-automation-ideas/AutomationSuggestionsClient.js` (`fetchApps` with `limit=50`, `fetchCombos`) that bypass `axiosCalls.js` and its cache.
- **Auth:** none. No header is sent.
- **Access posture:** read-only GETs, except the two Reddit POSTs.

Hardcoded host `https://plugservice-api.viasocket.com` is also used by `getLiveSupportData` and the robots `Sitemap:` line (`src/app/robots.txt/route.js`). Whether it is the same deployment as `NEXT_PUBLIC_INTEGRATION_URL` is not knowable from the repo.

## Entities / Tables / Endpoints
| Name | Purpose |
|---|---|
| `api/v1/plugins/all` | Paged app list, optional `category` |
| `api/v1/plugins/recommend/integrations` | Combos for one or two apps (`plugins` map + suggested flows) |
| `api/v1/plugins/recommend/services` | Combos filtered by industry / domain / use case |
| `plugins/search` | App search by `prefix` or `key` |
| `templates/all` | Every automation template |
| `get-apps-count` | Total app count |
| `api/reddit/<eventName>` | Reddit Conversions API relay (`page-visit` and others) |
| `https://plugservice-api.viasocket.com/get-support-data` | Live-support counters for `/support` |
| `https://plugservice-api.viasocket.com/sitemap/index-page` | Sitemap of dynamic pages, referenced from robots.txt |

## Schema / Shape
```text
GET  api/v1/plugins/all?category=<name|''>&limit=<APPERPAGE|n>&offset=<n>     -> { data: [app] }
GET  api/v1/plugins/recommend/integrations?service=<a>[&service=<b>]         -> { plugins: { <slug>: app }, ... }   // read whole
GET  api/v1/plugins/recommend/services?service=..&industry=..&domain=..&usecase=..  -> whole body
GET  plugins/search?prefix=<slug[0]>                                         -> whole body
GET  plugins/search?key=<query>&integrationOnly=true                          -> { data: [app] }
GET  templates/all                                                            -> { data: { templates: [template] } }
GET  get-apps-count                                                           -> { count: number }
POST api/reddit/page-visit   { event_source_url, click_id? }                  -> not read
POST api/reddit/<eventName>  { event_source_url, click_id }                   -> data
GET  plugservice-api.viasocket.com/get-support-data                           -> { count: { rows: [...] } }
```
App and template object fields are whatever the service returns; the site reads them ad hoc (for example `appslugname`, `flowJson.order.root`, `verified` in `src/app/lib/data.js:getHomePageData`). There is no schema in the repo.

## Functions We Call
| Function | Returns | Used by |
|---|---|---|
| `getApps(query, pageUrl)` | `data.data` or `[]`; cached 20 min. `offset` = `query.offset` ?? `query.page * APPERPAGE` | loaders in `src/app/lib/data.js`, `integration-data.js`, `automation-data.js`, `mcp-data.js`; `src/components/indexComps/CategoryAppsDisplay.js` |
| `getCombos(pageInfo, pageUrl)` | whole body; **`undefined` when `pageInfo.appone` is missing, `null` on error** (callers must handle both); 20 min | `src/app/lib/integration-data.js`, `src/app/lib/mcp-data.js`; read through `src/utils/getAppDetail.js` (`combos.plugins[<slug>]`) |
| `fetchPluginData(slug, pageUrl)` | whole body or `null`; 20 min | `src/app/lib/data.js:getFindAppsPageData` |
| `searchApps(query)` | `data.data`, `undefined` on error | browser search boxes (`SearchInputHomeOptimized.js`, `AppDirectory.js`, MCP and integrations clients, `SetupBuilder.js`, `AutomationSuggestionsClient.js`) |
| `getTemplates(pageUrl)` | `data.data.templates` or `[]`; **not cached** | `src/app/lib/data.js`, `automation-data.js`, `department-data.js`, `integration-data.js`; `src/app/components/integrations-script/TemplatePreview.js` |
| `getAppCount(pageUrl)` | `count` rounded up to the next 100; `undefined` on error; 20 min | most loaders; `src/app/agency-partner/page.js`, `src/app/integrations-script/page.js` |
| `getLiveSupportData(pageUrl)` | `data.count.rows` or `[]`; 20 min | `src/app/lib/support-data.js` |
| `trackRedditEvent(eventName, {...}, pageUrl)` | `data` or `null`; production only | **no caller at HEAD** |
| middleware page-visit `fetch` | not awaited, not in `waitUntil` <!-- verify:ignore --> | `src/middleware.js:middleware`, every matched page request in production ([OPEN_QUESTIONS T-09](../OPEN_QUESTIONS.md)) |

## Degradation
All catalogue helpers report via `sendErrorMessage` and return empty values, so an outage shows empty app grids and an app count of 0 or `undefined`. Unknown integration or template slugs redirect to the index ([OPEN_QUESTIONS C-06](../OPEN_QUESTIONS.md)); if `getTemplates` fails, every template URL redirects. The Reddit relay failing only logs.
