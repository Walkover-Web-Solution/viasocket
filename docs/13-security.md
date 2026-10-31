---
covers: ["src/utils/axiosCalls.js", "src/utils/mwExperiment.js", "src/app/providers.js", "src/middleware.js", "src/app/setup-prompt/**"]
verified_at: a261e40d
verified_on: 2026-10-31
---
# 13 Security

This file covers the site's security posture: who can do what, which values are public, and the exposed surfaces. Env var names and setup are in [DEVELOPMENT](DEVELOPMENT.md#environment-variables-reference). The open questions linked below (S-01 and others) live in [OPEN_QUESTIONS](OPEN_QUESTIONS.md) and are not repeated here.

## Access Control
- **There is none.** This is a public marketing site with no login, roles or admin area of its own. Login and signup belong to the viaSocket app. `/login` redirects to `https://flow.viasocket.com/` (`next.config.js`), and signup runs inside the MSG91 widget ([third-party-services.md](current-infrastructure/third-party-services.md)).
- **"Signed in" only means a `prod` cookie exists.** `src/app/lib/getAuth.js:getHasToken` and `src/app/components/navbar/NavbarServer.js` check that the cookie is present and swap "Sign up" for "Dashboard". The value is never read, and nothing in this repo sets the cookie. Anyone can set it, so never use it to gate content, data or an API route.
- **`POST /api/track-variant` has no auth and no rate limit.** The caller's identity is the browser-generated `visitor_id` cookie, checked only for UUID shape ([api/track-variant.md](api/track-variant.md)). Homepage events are stored again. Anyone who knows a visitor id can append a homepage event to that visitor's row. The route still drops every other page.
- **Environments are public. Robots rules only keep them out of search.** test.viasocket.com and local builds get robots `Disallow: /` from `src/app/robots.txt/route.js`, and every non-`prod` build gets the root layout's `noindex, nofollow`. No evidence was found of a preview `x-robots-tag` header ([OPEN_QUESTIONS D-09](OPEN_QUESTIONS.md)). Full posture: [cloudflare.md](current-infrastructure/cloudflare.md#schema--shape).
- `public/admin/` (a Decap CMS config with `git-gateway`, branch `prod`) is served as a static file. Production robots only `Disallow: /admin/` it. Whether it is retired is [OPEN_QUESTIONS C-02](OPEN_QUESTIONS.md).

## Secrets
- **The site has no server-only secret.** Every credential the code reads is a `NEXT_PUBLIC_*` variable. The only non-public env vars it reads are `HOSTNAME` and `VERCEL_URL`, which are build-time platform values used only by `build-utilities/generate-robots-txt.js`. `VIASOCKET_EMBED_SECRET`, `VIASOCKET_ORG_ID` and `VIASOCKET_PROJECT_ID` appear only inside strings shown to the developer (`src/app/developers/docs/page.js`, `src/app/setup-prompt/prompt.js`) and are never read from the environment ([DEVELOPMENT](DEVELOPMENT.md#environment-variables-reference)). `/setup-prompt` takes `org` and `project` from the query in the browser; that query is not written to the visit payload or the Reddit page-visit body.
- **No secret is safe under the `NEXT_PUBLIC_*` prefix.** Next inlines these values as literals at build time into any bundle that references them.

> [!WARNING]
> **Client-exposed database keys.** `NEXT_PUBLIC_DB_KEY`, `NEXT_PUBLIC_BLOG_DB_KEY` and `NEXT_PUBLIC_DB_KEY_ABTEST` are `NEXT_PUBLIC_*` variables, so Next.js may inline them into any client bundle that references them.
> - `NEXT_PUBLIC_DB_KEY` and `NEXT_PUBLIC_BLOG_DB_KEY` demonstrably ship to the browser. The client component `src/app/components/home/SearchInputHomeOptimized.js` (rendered on `/automations` through `AutomationsClient`) sends them as `auth-key` from the browser: `getIndustries` and `getDepartments` directly, `getVideoData` through `getVideos`, and `getBlogData` through `getBlogs`.
> - `NEXT_PUBLIC_DB_KEY_ABTEST` is the key that can POST and PATCH the visitor-tracking table. It is referenced only from `src/utils/axiosCalls.js`, which three `'use client'` files import: `SearchInputHomeOptimized.js`, `src/app/components/integrations-script/TemplatePreview.js` and `src/components/indexComps/CategoryAppsDisplay.js`.
>
> Never add a new secret with the `NEXT_PUBLIC_*` prefix, and never print these values. Whether the exposed keys are read-only cannot be determined from the repo ([OPEN_QUESTIONS S-01](OPEN_QUESTIONS.md)).

- **Whether the A/B write key is in production bundles is unproven.** Local build artifacts (gitignored, not from HEAD; checked 2026-10-22 by grepping for the A/B database id, never for key values) show two things. The 2026-10-21 `.next/static` dev output contains the A/B helpers, `abTestHeaders` included, in the `/automations` client chunk. The 2026-09-15 `.vercel/output` production chunks contain the content and blog database ids and `auth-key` headers, but not the A/B id, which suggests tree-shaking dropped it from that build. Treat the key as exposed until a production bundle shows otherwise (S-01).
- **Rules:**
  - Never import `src/utils/axiosCalls.js` or `src/utils/getData.js` into a new `'use client'` file ([docs/AGENTS.md §2](AGENTS.md#2-server-vs-client-boundaries)). The same goes for `src/utils/getBlogData.js`, `getVideoData.js`, `getFaqData.js` and `getMetaData.js`, which import it.
  - A key that must stay secret needs a name without the prefix, read only in a route handler or server loader. No such variable exists yet, so adding one means setting it in the Cloudflare Pages dashboard for both environments.
  - Never copy `.env` values into docs, code comments, commits or chat. Refer to variables by name.
- **Hardcoded client-visible tokens:**
  - The gtwy chatbot `embedToken`, a JWT in `src/app/providers.js` and `public/new-home/assets/support.js`. It is **public by design**: a front-end embed token, reused on the homepage on purpose so its Chat button opens the same support bot (S-04, decided 2026-10-22). Pending: a check with the gtwy team that it is scoped to the chatbot only.
  - The ids of the GTM, Google Ads, X and cr-relay tags.
  - `MW_KEY` in `src/utils/mwExperiment.js`, a publishable key that can only append experiment events. It is not a table-api key and it is not in an env var, because the middleware's client contract says to ship it in the page. Do not log the value.
  - Every flow.sokt.io script id ([flow-webhooks.md](current-infrastructure/flow-webhooks.md)).

## Data Access
| Store | Key | Operations from this repo | Where |
|---|---|---|---|
| Content DB (`65d2ed33fa9d1a94a5224235`) | `NEXT_PUBLIC_DB_KEY` | GET only | server loaders, plus the browser (above) |
| Blog DB (`66029bf861a15927654de175`) | `NEXT_PUBLIC_BLOG_DB_KEY` | GET only | server loaders, plus the browser (above) |
| A/B DB (`65c4c053a3fad7804af5bba8`) | `NEXT_PUBLIC_DB_KEY_ABTEST` | GET, POST, PATCH | `POST /api/track-variant` only, and only for homepage views and homepage signup/login clicks |
| Plug service | none sent | GET, plus the Reddit relay POSTs | server and browser ([plug-service.md](current-infrastructure/plug-service.md)) |
| flow.sokt.io webhooks | none | POST/GET from the browser; `sendErrorMessage` from either side | [flow-webhooks.md](current-infrastructure/flow-webhooks.md) |
| Experiment events (`cursor-slack-bot.embarko.app`) | publishable `MW_KEY` | POST append only, from the browser, and only once a page calls `mwSend` | `src/utils/mwExperiment.js` |

- **Least privilege is one key per database.** Whether any key is scoped read-only is unknown (S-01). The database ids are string literals in `src/utils/axiosCalls.js`, not env vars ([OPEN_QUESTIONS S-02](OPEN_QUESTIONS.md)).
- **There is no DELETE.** The table API takes GET, POST and PATCH only, so a row written by mistake (or by a test) stays forever. Duplicates become pointer rows ([table-api.md](current-infrastructure/table-api.md)). Tag every test write with its `environment`.
- **The A/B table holds personal data.** Each visitor row's `name` JSON stores the client IP (`ipAddress`, resolved server-side by `getClientIp`), device, screen and browser details, UTM data and click history (`src/utils/abTestVisitor.js`). The key that can read it is a `NEXT_PUBLIC_*` variable, so the exposure in the warning above applies to this data too.
- **Test and production share the table and the cookie.** Both write to the same A/B table, and the `visitor_id` cookie is set on `.viasocket.com`. The lookup filters on `environment`. When the env flag is unset, production is exactly `viasocket.com`.

## Input Handling
- **Route input is validated in `src/app/api/track-variant/route.js`:**
  - `visitor_id` must match `UUID_REGEX`, and `variant` must be in `VARIANTS`.
  - Click `element` and `action` must match `ELEMENT_PATTERN` and `ACTION_PATTERN` after lowercasing.
  - Free text is trimmed and capped (label 120, referrer and destination 500, session id 64), and bots are dropped by `src/utils/isBot.js:isBotRequest`.
- **The A/B lookup filter is built from the visitor id.** `getAbTestVisitorRows` interpolates it into `name LIKE '%${visitorId}%'`, but the only caller passes an id that already passed `UUID_REGEX`, and `URLSearchParams` encodes the query string. Keep that order: never call it with an unvalidated value.
- **Row writes check the row id.** `updateAbTestVisit` refuses any `rowid` that fails `/^row[a-z0-9]+$/i` before putting it into `where: "rowid = '<rowid>'"`.
- **Content filters are not sanitised.** Route params go raw into table-api filters, for example ``filter=slugname='${appone}'`` in `src/app/lib/integration-data.js`, ``filter=slug='${featureSlug}'`` in `src/app/lib/feature-data.js`, and the category and MCP filters in `src/app/lib/mcp-data.js`. `src/utils/getData.js:handleFieldsFilter` appends them unencoded. A quote or `&` in a slug changes the query. Validate or encode slugs before adding a new lookup ([table-api.md](current-infrastructure/table-api.md#schema--shape)).
- **UTM state goes into URLs and cookies unencoded:**
  - `src/utils/handleUtmSource.js:setUtmSource` returns the raw `utmData` JSON plus `key=value` pairs, and `src/utils/handleRedirection.js:handleRedirect` appends it as `?state=` without `encodeURIComponent` ([OPEN_QUESTIONS T-06](OPEN_QUESTIONS.md)).
  - `getUtmSource` writes decoded query values into `document.cookie` with no encoding (`setCookie`).
  - Inferred, not tested: a crafted link with `%3B` in a `utm_*` value would cut the cookie short, and `JSON.parse` in `setUtmSource` (no `try/catch`) would then throw on every CTA that calls it.
- **Markdown is rendered without raw HTML.** `react-markdown` renders template descriptions (`src/app/components/automations/AutomationSlugClient.js`) and the AI answer from a flow webhook (`src/app/components/home/ResultSectionOptimized.js`). No `rehype-raw` is installed, so HTML in that content is escaped. Do not add `rehype-raw` for remote content.
- **`dangerouslySetInnerHTML` is used only for scripts and JSON-LD:**
  - Inline tag loaders in `src/components/headComp/headComp.js`, `src/app/components/RedditPixel/RedditPixel.js` and `src/app/lifetime-deal/success/page.js`, plus the cr-relay loader in `src/app/layout.js`.
  - The `TrackingCookies` script, whose only interpolations are `JSON.stringify(VARIANTS)` and the rendered variant.
  - `application/ld+json` blocks built with `JSON.stringify` in `src/app/layout.js` and the `addToProduct` and integrations pages.

> [!WARNING]
> `JSON.stringify` does not escape `<`. Inferred: JSON-LD built from remote data (app names and FAQs from the plug service or table-api, for example in `src/components/IntegrationsComp/addToProduct/AddToProductPage.js`) would break out of its `<script>` tag if that data contained `</script>`. Never put remote HTML into `dangerouslySetInnerHTML`, and escape `<` (as `<`) in any new JSON-LD built from remote data.

- **`rdt_cid` is validated before it becomes a cookie.** `src/middleware.js` stores it only if it matches `RDT_CID_REGEX` and is at least 40 characters, and it deletes the cookie when an invalid value arrives.

## Threat Model Notes
The sensitive surface is visitor PII sent to third parties, unauthenticated public write endpoints, and the keys above. There is no user account or payment data in this repo (Stripe is outbound links only).

| Surface | Risk | Where | Status |
|---|---|---|---|
| Meeting-request form | name, email and phone sent as **query params**, which can end up in logs | `src/components/requestMeetingComp/RequestMeetingComp.js` | [OPEN_QUESTIONS S-03](OPEN_QUESTIONS.md); new forms send a JSON body like `src/app/components/support/SupportClient.js` |
| Unhappy-feedback link | `client_email` and the other URL params forwarded to tally.so in the link (`tallyHref`) | `src/app/components/feedback/FeedbackUnsatisfiedClient.js` | [OPEN_QUESTIONS S-06](OPEN_QUESTIONS.md) |
| Feedback pages | PII arrives in the page URL (`client_email`, `request_id`) and the page **submits on load**, so scanners and reloads resubmit it | `src/app/components/feedback/**` | [FLOWS](FLOWS.md#detailed-journey-lead-and-contact-forms) |
| Prompt and UTM in `?state=` | a typed prompt can show in the address bar and the referrer | `src/utils/handleRedirection.js:handleRedirect` | [OPEN_QUESTIONS T-06](OPEN_QUESTIONS.md) |
| Chatbot `embedToken` | hardcoded JWT, the same in two places; public by design | `src/app/providers.js`, `public/new-home/assets/support.js` | [OPEN_QUESTIONS S-04](OPEN_QUESTIONS.md) (scope check pending) |
| Public webhooks | every flow.sokt.io form endpoint is unauthenticated, its script id ships in client code, and no form has a CAPTCHA, honeypot or rate limit, so it can be spammed directly | [flow-webhooks.md](current-infrastructure/flow-webhooks.md) | reCAPTCHA is unused ([CONTRACTS](CONTRACTS.md#required--unavailable-backend-capabilities)); any bot check must be verified server-side with a key outside the `NEXT_PUBLIC_*` prefix |
| Error webhook | anyone can call `func/scrixVwRkMy0` and forge error reports | `src/utils/SendErrorMessage.js` | inferred; [18-error-handling](18-error-handling.md#api-layer) |
| Tracking route | no auth or rate limit; bot filtering is by user agent, plus a platform/OS mismatch | `src/app/api/track-variant/route.js` | homepage events are stored; other pages are dropped |
| Client-side keys | table-api keys usable by anyone with devtools, possibly the A/B write key too | the warning above | [OPEN_QUESTIONS S-01](OPEN_QUESTIONS.md) |
