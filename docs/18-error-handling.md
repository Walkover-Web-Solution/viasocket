---
covers: ["src/utils/SendErrorMessage.js", "src/app/not-found.js"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# 18 Error Handling

The site-wide failure policy. Per-journey failure tables (signup, integrations, forms) stay in [FLOWS](FLOWS.md); this file is the cross-cutting rule they follow.

## Principle: Fail Soft
Observed, not designed: no backend failure takes a page down. Helpers catch, report and return an empty value, and the page renders without that section. Keep it that way, with two caveats:
- **Fail-soft hides outages.** A table-api or plug-service failure looks like "no content" (an empty app grid, missing FAQs, an app count of 0), not an error. Check the logs before concluding that data is missing.
- **Fail closed for writes.** The tracking route drops an event rather than inserting a row when its lookup fails, because the table has no DELETE ([12-api-guidelines](12-api-guidelines.md#error-handling)).

There is no error boundary: no `error.js`, `global-error.js` or `loading.js` exists anywhere under `src/app`. A server component that throws gets the default Next.js or Cloudflare error page. Only `src/app/not-found.js` is customised. <!-- verify:ignore -->

## API Layer
**`src/utils/SendErrorMessage.js:sendErrorMessage({ error, pageUrl, source })`** is the only reporter. Every helper in `src/utils/axiosCalls.js`, and `src/utils/searchApps.js`, calls it from inside its `catch`.

| Step | Behaviour |
|---|---|
| Payload | `error` = `JSON.stringify(error.response.data ?? error.message ?? 'Unknown error')`, `url` = `pageUrl` (else `window.location.href` in the browser, else `'Unknown'`), `source` = the request URL or `'unknown'`, `statusCode` = `error.response.status ?? error.status ?? 'unknown'` |
| Where | `GET https://flow.sokt.io/func/scrixVwRkMy0?<those four as query params>` ([flow-webhooks.md](current-infrastructure/flow-webhooks.md)) |
| When | **only** when `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod'`. Test and local failures appear only in the server or browser console |
| Always | `console.error(extractedError)`; it never throws |

> [!WARNING]
> None of the 21 call sites awaits `sendErrorMessage`. Inferred: on the edge runtime, an unawaited `fetch` can be cut off when the response finishes (the same doubt as the middleware Reddit call, [OPEN_QUESTIONS T-09](OPEN_QUESTIONS.md)), so some production reports may never arrive. Do not treat a quiet error webhook as proof that nothing failed.

**Helper return values.** On failure each helper returns its own fallback. The exact value per helper is in [table-api.md](current-infrastructure/table-api.md#functions-we-call) and [plug-service.md](current-infrastructure/plug-service.md#functions-we-call). Callers must handle all of these:

| Fallback | Examples | Caller must |
|---|---|---|
| `[]` | `getBlogs`, `getVideos`, `getIndustries`, `getApps`, `getTemplates`, `getActionLayerBlogs` | nothing; the section hides itself |
| `undefined` | `getDataFromTable` (so every `src/utils/getData.js` wrapper), `getMeta`, `getFaq`, `getAppCount`, `searchApps` | guard before `.filter` / `.map` / arithmetic |
| `null` | `fetchPluginData`, `getCombos` (and `undefined` when `appone` is missing), `saveAbTestVisit`, `updateAbTestVisit`, `getAbTestVisitorRows` | check `=== null` where null means "failed", not "empty" |
| `{}` | `getClientStories` | nothing |

**Loaders** (`src/app/lib/*-data.js`) wrap their `Promise.all` in `try/catch` and return all-empty defaults, often with `noData: true`, so a throw inside one helper blanks every section of the page. The live case is `src/utils/getFaqData.js:getFaqData`, which calls `.filter` on `getFaq`'s `undefined` ([OPEN_QUESTIONS C-12](OPEN_QUESTIONS.md)). New helpers must return a value of the type their caller iterates.

**Route handlers** answer HTTP 200 `{ success: false, reason? }` and never a 5xx ([12-api-guidelines](12-api-guidelines.md#response-shape)).

## UI Layer
- **An empty section renders nothing.** Components return `null` on empty data, for example `BlogPosts` in `src/components/IntegrationsComp/addToProduct/SiteChrome.js`, `src/app/components/new-home/FAQs.js` and `src/app/components/home/StoriesSection.js`, or wrap themselves in `data?.length > 0 &&`. Follow this pattern rather than rendering an empty frame.
- **`notFound()` gives a real 404** with `src/app/not-found.js`, which renders `src/components/404/404Comp.js` ("404: Return to homepage.") with the title "404 - Page not found". It is used by:
  - `src/app/feedback/page.js`, for any `variant` other than `satisfied` or `unsatisfied`
  - `src/app/departments/[slug]/page.js`, for an unknown department or a loader throw
  - the `catch` of `src/app/mcp/[...slug]/page.js` and `src/app/integrations/page.js`
  - any unmatched path, including bare `/find-apps`, because `[...slug]` is not optional
- **Unknown slugs redirect to the index (307):**
  - `src/app/integrations/[...slug]/page.js` sends any slug with `noData` to `/integrations`. That includes a failed `getCombos`.
  - `src/app/automations/[...slug]/page.js` sends a non-category slug with no template to `/automations`, and every template URL redirects if `getTemplates` fails.
  - Whether these should be 404s is [OPEN_QUESTIONS C-06](OPEN_QUESTIONS.md). Do not copy this pattern onto new routes without deciding.
- **Soft 404s (HTTP 200 with an error body)** ([OPEN_QUESTIONS C-09](OPEN_QUESTIONS.md)):

  | URL | What renders | Where |
  |---|---|---|
  | /find-apps/&lt;a&gt;/&lt;b&gt; (2+ segments, e.g. old /find-apps/{letter}/{app} links) | inline "Page Not Found" | `src/app/find-apps/[...slug]/page.js` (`getFindAppsPageData` accepts exactly one segment) |
  | `/mcp/<unknown app>` | `ErrorComp` | `src/app/mcp/[...slug]/page.js` (`noData` from `src/app/lib/mcp-data.js`) |
  | `/mcp/category/<unknown>` | `ErrorComp` | `src/components/mcpComps/mcpIndexComp/McpIndexClientComp.js` (empty `categoryData`) |
  | `/features/<unknown>` | an empty feature page; inline "Page Not Found" if the loader throws | `src/app/features/[...feature]/page.js`, `src/app/lib/feature-data.js` |
  | `/integrations/category/<unknown>` | `ErrorComp` under the index title | `src/app/components/integrations/IntegrationsMain.js` |
  | `/integrations` when its loader returns `noData` | `ErrorComp` | `src/app/integrations/page.js` |
  | legacy integrations index with no category data | `ErrorComp` | `src/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexClientComp.js` |

- **`redirect()` and `notFound()` work by throwing.** A surrounding `try/catch` that renders something else swallows them. `src/app/departments/[slug]/page.js` works only because its `catch` calls `notFound()` again. Keep these calls outside the `try`, or re-throw.
- **Forms have no shared failure UI** ([OPEN_QUESTIONS U-06](OPEN_QUESTIONS.md)). Current behaviour:

  | Form | On failure |
  |---|---|
  | Meeting request (`src/components/requestMeetingComp/RequestMeetingComp.js`) | `alert()` |
  | Support (`src/app/components/support/SupportClient.js`) | nothing: `console.error`, and the button re-enables |
  | Request an integration (`src/components/IntegrationsComp/IntegrationsBetaComp/integrationsRequestComp.js`) | **shows the success popup anyway** |
  | Feedback (`src/app/components/feedback/**`) | status pill "Couldn't reach our servers" |
  | MSG91 signup (`src/app/components/customLogin/CustomLoginOptimized.js`) | the skeleton stays forever if the script fails, and the failure callback only logs |

  Per-journey detail: [FLOWS](FLOWS.md#detailed-journey-lead-and-contact-forms). A new form must show an inline error state and must not report success unless the webhook answered `ok`.

## States to Design For
| State | UI |
|---|---|
| Loading | **Navigation:** `src/app/providers.js:AppProvider` intercepts same-origin `<a>` clicks, shows its `Skeleton` (a navbar-shaped placeholder) and does a full page load through `window.location.href`. There is no route-level loading file. **In-page:** components keep their own flags (`onLoadingChange` in `src/app/components/home/SearchInputHomeOptimized.js`), and the MSG91 box shows a skeleton until its script loads. `<Suspense>` with no fallback wraps `AppDirectory` in `src/components/IntegrationsComp/addToProduct/IntegrationsIndexPage.js` and `BetaRequestButton` in `src/components/IntegrationsComp/addToProduct/AddToProductPage.js`. Inferred: this is there for their `useSearchParams` use, not as a loading state. |
| Empty | The section returns `null` (`BlogPosts`, `FAQs`, `StoriesSection`). An empty navbar or footer renders without links. A missing app count can print `NaN+` (`src/app/signup/page.js`, `+appCount + 300`). |
| Partial (one backend down) | The failed helper's section disappears and the rest renders. Exception: a throw inside a loader (C-12) blanks the whole page, and a failed `getCombos` or `getTemplates` turns into a redirect to the index. |
| Not found | `src/app/not-found.js` → `ErrorComp`, HTTP 404, via `notFound()` or an unmatched route. Avoid the soft-404 patterns listed above in new routes. |
