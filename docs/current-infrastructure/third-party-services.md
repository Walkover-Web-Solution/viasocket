---
covers: ["src/app/components/customLogin/**", "src/components/phoneInput/phoneInput.js", "src/app/providers.js", "public/new-home/assets/support.js", "src/app/layout.js", "src/components/headComp/headComp.js", "src/app/components/RedditPixel/**", "src/utils/axiosCalls.js"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# Third-party services

Every service outside the table API, plug service, flow webhooks and Cloudflare that the site loads or calls: the MSG91 signup widget, country lookup, chatbot, tags, and the external pages it fetches or links to.

> [!WARNING]
> **Signup happens inside MSG91, off this site.** The site's only handle on a signup is the `state` string it passes to the widget (`setUtmSource()`, built from the `utmData` cookie). Attribution that is not in `utmData` before the widget initialises is lost. Rules for that cookie: [CONTRACTS.md](../CONTRACTS.md#cookies).

## Role
Authentication UI (MSG91), visitor-country default for phone inputs (ipapi.co), support chat (gtwy), marketing and conversion tags, client-story content (docstar), the Action Layer blog cards (viaSocket blog RSS), and outbound booking and payment links (cal.id, Stripe). None of them is called with a secret; none has a server-side fallback.

## Connection
- **Env var(s):** `NEXT_PUBLIC_REFERENCE_ID` (MSG91 widget reference id), `NEXT_PUBLIC_REDDIT_PIXEL_ID`, `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT` (gates the Reddit pixel). Everything else is hardcoded: the GTM id, Google Ads id, cr-relay site id, gtwy `embedToken`, docstar collection id, feed URL ([OPEN_QUESTIONS S-02, S-04, S-05](../OPEN_QUESTIONS.md)).
- **Client:** script tags injected from React components or inline HTML; plain `fetch` / `axiosWithCache` for the two data lookups.
- **Auth:** none, except the gtwy `embedToken` attribute (a client-visible JWT).
- **Access posture:** read-only lookups and browser-side tags.

## Entities / Tables / Endpoints
| Name | Purpose |
|---|---|
| MSG91 proxy auth `https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js` | Signup/login widget. `src/app/components/customLogin/CustomLoginOptimized.js` loads it once and calls `window.initVerification({ referenceId: NEXT_PUBLIC_REFERENCE_ID, state: setUtmSource(), theme: 'light', success, failure, addInfo?: { redirect_path } })`; it renders into `<div id={NEXT_PUBLIC_REFERENCE_ID}>`. Used by `src/app/signup/page.js`, `src/app/components/home/CTAButtons.js`, `src/app/migration/relay/RelaySignupCTA.js`. |
| `https://files.msg91.com/342616/wnitwkyk` | Default OG/Twitter image in page metadata (`src/app/layout.js`, `public/new-home/index.html` and others) |
| ipapi.co `https://ipapi.co/json/` | `src/components/phoneInput/phoneInput.js` reads `country_code` to preselect the dial code; best effort, ignored if unknown |
| gtwy chatbot `https://chatbot.gtwy.ai/chatbot.js` | Support chat. `src/app/providers.js` (React pages) and `public/new-home/assets/support.js` (`/`) inject it with a hardcoded `embedToken`, `bridgeName: 'viasocket_chat'` and a `threadId` kept in `localStorage.viasocket_chat_thread` for 1 h; the icon is hidden and `[data-chat]` links call `window.Chatbot.open()` on `/` |
| Google Tag Manager `GTM-THTCRSLN` | All environments; also the only tag on `/` |
| Google Ads `AW-16852796533`, X (Twitter) pixel | Conversion tags on campaign pages and `headComp` |
| Reddit pixel + Reddit Conversions API | Production only; CAPI goes through the plug service ([plug-service.md](plug-service.md)) |
| Cloudflare Zaraz | `/cdn-cgi/zaraz/i.js`, configured in Cloudflare ([cloudflare.md](cloudflare.md)) |
| cr-relay signals script (`cdn.cr-relay.com/.../signals.js`) <!-- verify:ignore --> | Inline loader in `src/app/layout.js`; `window.signals.identify({ email })` from the integration-request form |
| Amplify tracker (`https://main.d2f49esifpcbwh.amplifyapp.com/tracker.js`) <!-- verify:ignore --> | Only on the unrendered old homepage files (`src/app/page.js`, `src/app/home/page.js`, `src/app/front-page/IndexPageContent.js`); purpose unknown |
| viaSocket blog RSS `https://viasocket.com/blog/feed.xml` | Action Layer blog cards (see below); production feed from every environment ([OPEN_QUESTIONS S-05](../OPEN_QUESTIONS.md)) |
| docstar `https://api.docstar.io/p/getSideBarData?collectionId=...` | Client stories on the old homepage loader (`getClientStories`, reads `data.pages`) |
| `https://viasocket.com/automation-ideas/api/usecases?app=<one app>` | `getUsecases`; one `app` per request (repeated `app` params error). **No caller at HEAD.** |
| cal.id `https://cal.id/team/viasocket/<event>`, `https://cal.id/forms/<id>` | "Book a demo" / "Talk to sales" links across nav, footer, campaign and developer pages (outbound only) |
| Stripe Payment Links `https://buy.stripe.com/<id>` | Purchase buttons in `src/app/lifetime-deal/Pricing.js` and `src/components/agencyPartner/AgencyPricing.js` (outbound only; no Stripe SDK or webhook in this repo) |
| thingsofbrand.com | App icon image CDN in static copy (`https://thingsofbrand.com/api/icon/<domain>`) |

Tag ids, events and the environments each tag runs in: [CONTRACTS.md](../CONTRACTS.md#third-party-tags) (analytics home).

## Schema / Shape
```text
GET https://ipapi.co/json/                 -> { country_code: "IN", ... }          // only country_code read
GET https://viasocket.com/blog/feed.xml    -> RSS; per <item>: title, link, pubDate, category
GET <post link>                            -> HTML; <meta property="og:image" content="...">
getActionLayerBlogs(pageUrl, limit = 3)    -> [{ title, link, date, image: string | null }]  // image null when the post fetch fails
GET api.docstar.io/p/getSideBarData        -> { pages: {...} }
```

## Functions We Call
| Function | Returns | Used by |
|---|---|---|
| `src/utils/axiosCalls.js:getActionLayerBlogs(pageUrl, limit)` | items whose `category` is exactly `Action Layer for AI Products`, first `limit`, each with its post's `og:image`; `[]` on feed failure; cached 1 h | `src/app/lib/integration-data.js` (index and single-app branches), `src/app/features/page.js` (direct, no loader) |
| `src/utils/axiosCalls.js:getClientStories(pageUrl)` | `data.pages` or `{}`; 20 min | `src/app/lib/data.js:getHomePageData` |
| `src/utils/axiosCalls.js:getUsecases(app, pageUrl)` | `data.data` or `[]`; 20 min | none |
| `window.initVerification(config)` | widget UI | `CustomLoginOptimized` |
| ipapi `fetch` | `country_code` | `PhoneInput` |

## Degradation
MSG91 down: the signup box shows its skeleton and nothing else; there is no fallback link. ipapi down: the default country stays. gtwy down: `[data-chat]` links do nothing. Feed down: `sendErrorMessage`, no Action Layer cards. Tags failing to load have no visible effect. reCAPTCHA is not used anywhere (no form token, no server verification).
