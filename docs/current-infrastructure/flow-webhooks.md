---
covers: ["src/utils/SendErrorMessage.js", "src/app/components/home/SearchInputHomeOptimized.js", "src/components/requestMeetingComp/RequestMeetingComp.js", "src/app/components/support/SupportClient.js", "src/app/components/feedback/**", "src/components/IntegrationsComp/IntegrationsBetaComp/integrationsRequestComp.js", "src/app/components/black-friday-sale/BlackFridaySaleClient.js"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# flow.sokt.io webhooks (viaSocket flows)

viaSocket's own automation runtime, used as this site's form backend, error reporter and AI-answer endpoint. Each call is a hardcoded `https://flow.sokt.io/func/<script id>` URL.

> [!WARNING]
> **The payload keys are a contract with a flow you cannot see.** The flow on the viaSocket side reads these exact keys; renaming one here silently breaks the email, sheet or reply on the other end. Change the flow and the caller together, and keep the script id in the caller unchanged unless the flow owner gives you a new one.

## Role
Receives every lead and support form, the feedback-page result, Black Friday offer clicks, and production error reports; produces the homepage search "AI answer". There is no database or API of the site's own behind any form.

## Connection
- **Env var(s):** none. Script ids are hardcoded in each caller, against the env-var rule ([OPEN_QUESTIONS S-02](../OPEN_QUESTIONS.md)). `sendErrorMessage` is gated on `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod'`.
- **Client:** direct `fetch`/`axios`/`sendBeacon` in each component (table below).
- **Auth:** none.
- **Access posture:** write-only (fire-and-forget), except the AI answer, which is read back.

## Entities / Tables / Endpoints
| Name | Purpose |
|---|---|
| `func/scrixVwRkMy0` | Error reports from `sendErrorMessage` (production only) |
| `func/scrifJcjUubA` | Homepage search AI answer |
| `func/scri22s212eP` | Request-a-meeting form (agency list) |
| `func/scrir501xRzP` | `/support` contact form |
| `func/scri74yGAo9Z` | `/feedback` satisfied / unsatisfied result |
| `func/scriPIvL7pBP` | "Request an integration" form |
| `func/scrixtKyK3QM` | `/black-friday-sale` offer click |

## Schema / Shape
| Method | Caller | Sends | Reads back |
|---|---|---|---|
| GET | `src/utils/SendErrorMessage.js:sendErrorMessage` | query `error` (JSON of `error.response.data` or `error.message`), `url`, `source`, `statusCode`. **Production only**; elsewhere it only logs. | `ok` |
| POST | `src/app/components/home/SearchInputHomeOptimized.js` | query `apps`, `departments`, `categories` (comma lists), empty body `{}` | whole body, rendered as the AI answer |
| POST | `src/components/requestMeetingComp/RequestMeetingComp.js` (from `src/app/components/experts/AgencyList.js`) | **all form fields as query params**: `name`, `email`, `phone`, `countryCode`, `countryIso`, `country`, `datetime`, optional `agencyName`; no body | `ok` (alert on failure) |
| POST | `src/app/components/support/SupportClient.js` | JSON body `{ name, email, message }`, no content-type header | `ok` |
| POST | `src/app/components/feedback/FeedbackSatisfiedClient.js`, `FeedbackUnsatisfiedClient.js` | JSON `{ 'mail-content': { plugin, action_trigger, use_case, client_name, client_email, request_id, timestamp }, feedback: 'satisfied' \| 'unsatisfied' }` via `navigator.sendBeacon`, `fetch` fallback. Values come from the page's query params. | nothing |
| POST | `src/components/IntegrationsComp/IntegrationsBetaComp/integrationsRequestComp.js` | JSON form state minus `plug`/`appName` (`userEmail`, `userName`, `whatsappNumber`, `countryCode`, `countryIso`, `country`, `useCase`, `plugName`, `source: 'website'`, ...) plus `userNeed` (`New <type>`), `category`. Also calls `window.signals.identify({ email })` first. | `data.success` |
| POST | `src/app/components/black-friday-sale/BlackFridaySaleClient.js` | body `{ appdomain }` (no content-type) on "View offer" | nothing |

> [!WARNING]
> `RequestMeetingComp` puts the visitor's name, email and phone in the URL query string, where they land in logs. New forms must send a JSON body, as `SupportClient` does ([OPEN_QUESTIONS S-03](../OPEN_QUESTIONS.md), [13-security.md](../13-security.md)).

The developer docs page (`src/app/developers/docs/page.js`) also shows `flow.sokt.io/func/<script_id>` URLs; those are published examples for external developers, not calls this site makes ([CONTRACTS.md](../CONTRACTS.md#published-contracts-developer-docs-page)).

## Functions We Call
| Function | Returns | Used by |
|---|---|---|
| `sendErrorMessage({ error, pageUrl, source })` | nothing (never throws) | every helper in `src/utils/axiosCalls.js`, `src/utils/searchApps.js` |
| AI answer `axios.post` | response body | homepage search (`SearchInputHomeOptimized.js`, rendered from `ResultSectionOptimized.js`, `AutomationsClient.js`) |
| form submits | `Response` | the components above |

## Degradation
Forms show inconsistent failure UI: the meeting form alerts, the support form logs only, the integration-request form shows its success popup even on network failure ([OPEN_QUESTIONS U-06](../OPEN_QUESTIONS.md); policy in [../18-error-handling.md](../18-error-handling.md)). Feedback and Black Friday calls are fire-and-forget. If the error webhook is down, errors are still logged to the console.
