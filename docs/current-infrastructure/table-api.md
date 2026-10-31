---
covers: ["src/utils/axiosCalls.js", "src/utils/getData.js", "src/utils/getBlogData.js", "src/utils/getMetaData.js", "src/utils/getFaqData.js", "src/utils/getVideoData.js", "src/utils/getCountries.js", "src/const/tables.js", "src/const/fields.js"]
verified_at: 17b99cd8
verified_on: 2026-10-31
---
# table-api.viasocket.com

The viaSocket table service: the CMS behind almost every page section, the blog card list, and the A/B visitor-tracking table.

> [!WARNING]
> **There is no DELETE.** The table API accepts GET, POST and PATCH only, so a test row written to the A/B table stays forever (duplicates are turned into pointers, never removed). Homepage views and homepage signup/login clicks are written. Every other event is dropped before the lookup. Never write to the table "just to test" without tagging the row's `environment`.

## Role
Source of truth for page content (navbar, footer, meta, FAQs, features, pricing rows, reviews, departments, MCP prompts, webinars and the rest of [database/entities.md](../database/entities.md)), blog cards, and the one-row-per-visitor A/B tracking record. Content edits made in the table go live without a deploy, after the client cache TTL below.

## Connection
- **Env var(s):** `NEXT_PUBLIC_DB_BASE_URL` (base URL), `NEXT_PUBLIC_DB_KEY` (content DB), `NEXT_PUBLIC_BLOG_DB_KEY` (blog DB), `NEXT_PUBLIC_DB_KEY_ABTEST` (A/B DB). Values and setup: [DEVELOPMENT.md](../DEVELOPMENT.md). The three **database ids are string literals** in `src/utils/axiosCalls.js`, not env vars, and `getBlogs`, `getIndustries`, `getDepartments`, `getVideos` hardcode the full `https://table-api.viasocket.com` host instead of `NEXT_PUBLIC_DB_BASE_URL` ([OPEN_QUESTIONS S-02](../OPEN_QUESTIONS.md)). Do not copy that pattern.
- **Client:** `src/utils/axiosCalls.js` (transport, one function per endpoint) and `src/utils/getData.js` (one thin wrapper per table id). Table ids live in `src/const/tables.js`, column lists in `src/const/fields.js`.
- **Auth:** static per-request header `auth-key: <key>`; the A/B calls add `Content-Type: application/json`. No token refresh, no retry.
- **Access posture:** content and blog calls are read-only GETs. The A/B helpers GET, POST and PATCH, server-side only (from `POST /api/track-variant`). All three keys are `NEXT_PUBLIC_*` and reach the browser; see [13-security.md](../13-security.md). Whether any key is read-only is unknown ([OPEN_QUESTIONS S-01](../OPEN_QUESTIONS.md)).

Rules for every new call:
- Add the table id to `src/const/tables.js`, the fields to `src/const/fields.js`, a wrapper to `src/utils/getData.js`, and call it from a loader in `src/app/lib/*`. Pages and route handlers never `fetch` the table API themselves.
- Failures go to `sendErrorMessage({ error, pageUrl, source })` and the helper returns a fallback; it never throws to the page ([../18-error-handling.md](../18-error-handling.md)).

## Entities / Tables / Endpoints
| Name | Purpose |
|---|---|
| Content database (`65d2ed33fa9d1a94a5224235`) | All CMS tables in `src/const/tables.js` except `ABTESTCOUNT`, plus the meta, industries, departments and videos tables addressed by literal id. Catalog: [database/entities.md](../database/entities.md). |
| Blog database (`66029bf861a15927654de175`), table `tblngzrs5` | Blog card rows, filtered client-side by `tags`. |
| A/B database (`65c4c053a3fad7804af5bba8`), table `ABTESTCOUNT` (`tbla8b06r`) | One row per anonymous visitor. Columns: [database/entities.md](../database/entities.md#entity-abtestcount-visitor-tracking-row). |

## Schema / Shape
```text
Content  GET  ${NEXT_PUBLIC_DB_BASE_URL}/<content db id>/<table id>?fields=a&fields=b[&<filter>]   auth-key: NEXT_PUBLIC_DB_KEY
Blog     GET  https://table-api.viasocket.com/<blog db id>/tblngzrs5?limit=200&offset=N              auth-key: NEXT_PUBLIC_BLOG_DB_KEY
A/B      GET  ${NEXT_PUBLIC_DB_BASE_URL}/<abtest db id>/tbla8b06r?filter=name LIKE '%<visitorId>%' AND environment = '<environment>'&fields=<ABTEST_ROW_FIELDS>&sort=autonumber&limit=200&_=<Date.now()>
A/B      POST same URL, body { records: [ <toRowFields output> ] }                                  auth-key: NEXT_PUBLIC_DB_KEY_ABTEST
A/B      PATCH same URL, body { records: [ { where: "rowid = '<rowid>'", fields } ] }

Read response:   { data: { rows: [ { rowid, autonumber, ...columns } ] } }   // helpers read data.data.rows
Insert response: { data: [ <new row> ] }                                     // saveAbTestVisit reads data.data[0]
```
- Query string: `src/utils/getData.js:handleFieldsFilter` repeats the key (`?fields=a&fields=b`), then appends the caller's raw filter, for example `filter=slugname='<appone>'` (`src/app/lib/integration-data.js`) or `offset=200` (`src/utils/getCountries.js`).
- The error body shape is not visible in the repo; read it from a real failing request.

> [!WARNING]
> Filters are raw SQL-like strings with route params interpolated unescaped (`slugname='${integrationsInfo?.appone}'`). A quote in a slug breaks the query. Keep filters on values the site controls.

Table behaviour stated in code comments and maintainer notes (describes the live API, **not verifiable from the repo**):
- Reads carry `cache-control: max-age=172800`, so any read-after-write needs a unique cache-buster (`_=<timestamp>`). That is why the A/B helpers use plain `axios`, not `axiosWithCache`.
- `limit=500` silently returns zero rows (400 works), hence `ABTEST_LOOKUP_LIMIT = 200`.
- Column names are the table's own: `varient`, visitor JSON in `name`, no `user_info` or `referrer` column. A misspelt column, or a plain URL in the linked-record columns `first_url` / `last_url`, makes the table reject the **whole** write. Verify a column change with a real write plus a cache-busted read ([DEVELOPMENT.md](../DEVELOPMENT.md)).
- All three environments write to the same A/B table. Rows carry `environment`, and the lookup filters on it, because test and production share the `visitor_id` cookie on `.viasocket.com`.

Client cache: `axiosWithCache = setupCache(axios)` (`axios-cache-interceptor`), in process memory per server instance, with `interpretHeader: false`, so the table's own `cache-control` is ignored and the helper's TTL applies. There is no invalidation hook. Cross-layer caching (Cloudflare zone cache on top): [../14-performance.md](../14-performance.md).

## Functions We Call
| Function | Returns | Used by |
|---|---|---|
| `getDataFromTable(table, query, pageUrl)` | raw body (`data.rows` unwrapped by caller), `undefined` on error; cached 20 min | every `src/utils/getData.js` wrapper ([entities.md](../database/entities.md)) |
| `getMeta(pageUrl)` | `data.data.rows` of meta table `tbl2bk656`, `undefined` on error; 20 min | `src/utils/getMetaData.js:getMetaData` (matches `name`), every loader's metadata |
| `getFaq(pageUrl)` | `data.data.rows` of `tblnoi7ng` (same id as `FAQS`), `undefined` on error; 20 min | `src/utils/getFaqData.js:getFaqData` (matches `page`) |
| `getIndustries(pageUrl)`, `getDepartments(pageUrl)` | rows of `tblxy04hk` / `tbluyx8o1`, `[]` on error; 20 min | `src/app/components/home/SearchInputHomeOptimized.js` (**browser**) |
| `getVideos(pageUrl)` | rows of `tblh3g587`, `[]`; 1 h | `src/utils/getVideoData.js:getVideoData` (tag match, max 6) → `src/app/lib/integration-data.js`, `SearchInputHomeOptimized.js` |
| `getBlogs(pageUrl)` | all blog rows, paged by 200 until a short page, `[]` on error; 1 h | `src/utils/getBlogData.js:getBlogData` (tag match, 4–6 cards, `index` tag fallback) → most loaders |
| `getAbTestVisitorRows(visitorId, pageUrl, environment)` | rows oldest first, `[]` when none, `null` on error or an unknown environment; never cached | `src/app/api/track-variant/route.js` |
| `saveAbTestVisit(record, pageUrl)` | new row or `null` | `src/app/api/track-variant/route.js` |
| `updateAbTestVisit(rowid, fields, pageUrl)` | `data.data`, else `true`; `null` on error or if `rowid` fails `/^row[a-z0-9]+$/i` | `src/app/api/track-variant/route.js` (canonical row and merge pointers) |

## Degradation
Every helper catches, reports through `sendErrorMessage` (production only; see [flow-webhooks.md](flow-webhooks.md)) and returns `[]`, `{}`, `null` or `undefined`. A table outage renders pages with empty sections (no navbar links, no FAQs, default metadata), not an error page. `getFaqData` calls `.filter` on the result of `getFaq`, which is `undefined` on error, so a failed FAQ fetch throws inside the loader. Loaders wrap their `Promise.all` in try/catch and return all-empty defaults (for example `src/app/lib/data.js:getHomePageData`), so that one failure blanks every section of the page, not only the FAQ. A failed A/B lookup makes the route answer `{ success: false, reason: 'lookup failed' }` and write nothing.
