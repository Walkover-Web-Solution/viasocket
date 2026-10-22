---
covers: ["src/app/api/**", "src/app/robots.txt/**", "src/app/sitemap.js", "src/utils/trackVisitor.js", "src/utils/isBot.js", "src/const/abTest.js"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# API — track-variant (the site's own HTTP routes)

> The site has one API route. Route-handler rules (edge runtime, always-200 tracking, where helpers live): [../12-api-guidelines.md](../12-api-guidelines.md).

## Purpose
`POST /api/track-variant` records first-party visitor events (page views, tracked clicks, hero CTA presses) against one row per anonymous visitor in the A/B table, so the homepage A/B test and visitor journeys can be read from table-api. It powers no screen; the browser never reads the response. **It writes nothing today**: the lookup helper is short-circuited ([OPEN_QUESTIONS T-01](../OPEN_QUESTIONS.md)). Event contract and triggers: [CONTRACTS.md](../CONTRACTS.md#first-party-visitor-tracking).

---

## Routes in This Domain

| Route | Method | Description |
|---|---|---|
| `/api/track-variant` | POST | Visitor-tracking upsert, `src/app/api/track-variant/route.js:POST` (below) |
| `/robots.txt` | GET | `src/app/robots.txt/route.js:GET`, edge; prod-vs-non-prod content ([../current-infrastructure/cloudflare.md](../current-infrastructure/cloudflare.md), [../ARCHITECTURE.md](../ARCHITECTURE.md)) |
| `/sitemap.xml` | GET | `src/app/sitemap.js` (`STATIC_ROUTES`), edge; route list in [../05-navigation.md](../05-navigation.md) |

---

## POST /api/track-variant

### Purpose
Upsert the caller's visitor row with one event; edge runtime (`export const runtime = 'edge'`).

### Callers and Cookies Read
- Only `src/utils/trackVisitor.js` calls it: `trackView`, `trackInteraction`, `trackCtaClick`, via `fetch(..., { keepalive: true })` or `navigator.sendBeacon` when the page is unloading.
- Identity comes from cookies, never the body: `visitor_id` (`VISITOR_ID_COOKIE`, must be a UUID) and `variant` (`VARIANT_COOKIE`, must be in `VARIANTS` = `A`, `B`), from `src/const/abTest.js`. Both are written by the browser ([CONTRACTS.md](../CONTRACTS.md#cookies)).

### Request Body
All keys optional; unknown keys ignored.
```json
{
  "event": "view | cta | click (anything else is treated as view)",
  "pageUrl": "https://viasocket.com/pricing?utm_source=x",
  "utmData": { "utm_source": "google" },
  "userInfo": { "device": {}, "screen": {}, "browser": {} },
  "referrer": "string, capped at 500",
  "sessionId": "string, capped at 64",
  "isNewSession": true,
  "ctaSource": "home-A (cta only)",
  "element": "header_pricing (click/cta; must match ^[a-z0-9_]{1,64}$ after lowercasing, or a click is dropped)",
  "action": "click | signup_click | ... (^[a-z0-9_]{1,40}$, else 'click')",
  "label": "string, capped at 120",
  "section": "header | hero | main | footer | menu | other (capped at 40)",
  "destinationUrl": "string, capped at 500"
}
```

### Data Sources
| Field | Source | Function |
|---|---|---|
| visitor rows | table-api A/B table | `getAbTestVisitorRows()` (returns `null` today) |
| new row | table-api A/B table | `saveAbTestVisit()` |
| updated / merged rows | table-api A/B table | `updateAbTestVisit()` |
| row columns | computed | `src/utils/abTestVisitor.js:toRowFields()`, `applyEvent()`, `absorbRow()`, `mergedRowFields()` |
| `environment` | `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT`, hostname fallback | `getEnvironment()` in the route |
| client IP | `x-forwarded-for` (first entry), `x-real-ip`, `cf-connecting-ip` | `getClientIp()` in the route |
| bot flag | user agent + `userInfo` | `src/utils/isBot.js:isBotRequest()` |

Column meanings: [../database/entities.md](../database/entities.md#entity-abtestcount-visitor-tracking-row). Table transport: [../current-infrastructure/table-api.md](../current-infrastructure/table-api.md).

### Response — 200
Always HTTP 200 JSON, including on internal errors.
```ts
// rejected before any table read
{ success: false; reason: 'missing tracking cookies' | 'unrecognised interaction' | 'bot' }
// lookup returned null — every request today
{ success: false; reason: 'lookup failed' }
// existing row
{ success: boolean /* false if the PATCH failed */; created: false; counted: boolean; merged: number; viewCount: number }
// first event for this visitor
{ success: boolean; created: boolean /* false if the POST failed */; counted: true; viewCount: number }
// unexpected exception (logged as '[variant tracking] failed:')
{ success: false }
```

### Behavior Notes
- Order: cookies → body → click validation → bot check → lookup. Bots and unrecognised clicks cost no table read.
- `getEnvironment`: flag `prod`/`production` → `production`; `test`/`stage`/`staging` → `test`; `local`/`development`/`dev` → `local`; otherwise hostname: `viasocket.com` or any `*.viasocket.com` → `production` (test.viasocket.com included, [OPEN_QUESTIONS T-03](../OPEN_QUESTIONS.md)), `localhost` or an IP → `local`, else `test`. The existing row's `environment` wins on update.
- A failed lookup is **not** treated as "no history": the event is dropped rather than inserting a duplicate row.
- Dedupe: views of the same page key within `VIEW_DEDUPE_WINDOW_MS` (10 s) and same-element clicks within `CLICK_DEDUPE_WINDOW_MS` (400 ms) are not counted; an uncounted event with nothing to merge and no new visit writes nothing. `cta` always counts.
- Duplicates (older rows, or two tabs racing) fold into the oldest live row, up to `MAX_MERGES_PER_REQUEST` (10) per request; merged rows become pointers (`name.mergedInto`) only after the survivor's PATCH succeeds. After an insert, `collapseDuplicates` re-reads and merges again.
- No caching, no auth, no rate limit. Tracking must run in all three environments; do not gate it on production ([DECISIONS](../DECISIONS.md) ADR-009).

### Example
```json
{ "success": false, "reason": "lookup failed" }
```
