---
covers: ["src/app/experts/**", "src/app/components/experts/**", "src/components/requestMeetingComp/**", "src/app/hire-an-expert/**", "src/app/agency-partner/**", "src/components/agencyPartner/**", "src/app/support/**", "src/app/components/support/**", "src/app/lib/support-data.js", "src/app/feedback/**", "src/app/components/feedback/**", "src/app/signup/**", "src/app/components/customLogin/**"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# Module: Lead, Support and Signup Forms

The pages where a visitor hands over contact details or starts an account: the experts directory, hire-an-expert, the agency partner programme, support, post-request feedback, and `/signup` (the MSG91 login widget). Submissions leave the site. Webhook URLs and payloads are in [flow-webhooks](../current-infrastructure/flow-webhooks.md), and the per-form summary table is in [FLOWS: lead and contact forms](../FLOWS.md#detailed-journey-lead-and-contact-forms). This doc covers screens, data and states.

## Purpose
- `/experts`: browse verified and other agencies and request a meeting with one. "Be an Expert" goes to tally.so.
- `/hire-an-expert`: "Let us build": sign up with a `hireanexpert` intent, or book cal.id.
- `/agency-partner` (+ `/agency-partner/success`): agencies buy the partner plan (Stripe) or book a call.
- `/support`: a contact form, live-support availability and every other channel (chat widget, phone, WhatsApp, email, cal.id).
- `/feedback`: the landing page for "was this integration request handled well?" email links.
- `/signup`: the start of every in-site signup.

---

## Business Value
- `/signup` is where the site's attribution work ends: `state` carries `utm_source` to MSG91 ([FLOWS journey 1](../FLOWS.md#detailed-journey-landing-utm-capture-and-signup), [DECISIONS ADR-012](../DECISIONS.md#adr-012-utm-attribution-conventions)).
- The forms feed viaSocket flows on flow.sokt.io, so each lead lands in the team's own automation (*observed*: every submit targets flow.sokt.io).

> [!TODO]
> Not determinable from the repository: who handles these leads, and the expected volume or SLA. Needs the support or partnerships owner.

---

## Navigation Flow
1. Entry points: `SiteFooter` "Partner program" (`/experts`), "Agency partners" and "Contact support"; the legacy navbar "Let us build" (`src/app/components/navbar/TopNavLinks.js`); MCP pages and the lifetime-deal footer (`/support`); email links (`/feedback-satisfied`, `/feedback-unsatisfied`, rewritten in `next.config.js` to `/feedback?variant=…`); and every signup CTA (`/signup`).
2. The visitor fills or clicks the form (journeys in [FLOWS](../FLOWS.md#detailed-journey-lead-and-contact-forms)).
3. Exit: an inline success state, Stripe, cal.id, tally.so, or MSG91 into the product. `/signup` "Log in" goes to `/login`, which redirects to flow.viasocket.com.

---

## Screens
### 1. Experts (`src/app/experts/page.js`)
- Data: `src/app/lib/data.js:getExpertsPageData`. It reads meta, footer, navbar, `getPageData` (`h1`/`h2` copy), `getAgencies` twice (`verified=true` and `verified IS NULL`), and `getExpertBlogs` ("help" cards).
- `src/app/components/experts/AgencyList.js` paginates with `react-paginate`. Each card has "Schedule a meet", which opens `RequestMeetingComp` (a daisyUI `<dialog>` via `showModal()`).

> [!WARNING]
> `AgencyList` renders one `RequestMeetingComp` **per card**, and each one uses `id="meeting_request_form"`. "Schedule a meet" calls `document.getElementById('meeting_request_form').showModal()`, which always finds the **first** dialog in the DOM. So every card opens the first card's form, and that form sends the first agency's `agencyName` (*observed in code; not reproduced in a browser*).

### 2. Hire an expert (`src/app/hire-an-expert/page.js` → `src/app/hire-an-expert/HireExpertClient.js:HireExpertClient`)
- Sections: Hero (with `HeroHub`), HowItWorks, Comparison, CaseStudies, ReadyToAutomate, TestimonialsCarousel. Three CTAs share `handleHireClick`.
- `handleHireClick` runs `setIntent('hireanexpert')`, then `trackInteraction({element:'hire_expert_signup', …})`, then `handleRedirect(e, '/signup?', null, 'hire-an-expert')`. The cookie side effects are in [FLOWS](../FLOWS.md#5-failure-modes-and-footguns) ([OPEN_QUESTIONS T-05](../OPEN_QUESTIONS.md#active-questions-table), [T-07](../OPEN_QUESTIONS.md#active-questions-table)).
- Data: meta (`.catch(() => null)`), footer and navbar, loaded directly in `page.js` rather than through a `src/app/lib` loader.

### 3. Agency partner (`src/app/agency-partner/page.js`)
- Sections: `HeroSection`, `WhyAgenciesSection`, `HowItWorksSection`, `AgencyPricing`, `FAQSection`, `ShowBadges`, `SecuritySection`, `BlogGrid` (`src/components/agencyPartner/`).
- `AgencyPricing` holds a Stripe buy link, a cal.id `divyansh-jain/agency-partnership` booking, and `/help/partners/agency-partner-program`. `/agency-partner/success` is static (a link home and `mailto:support@viasocket.com`).
- Data: `getAgencyPartnerPageData` plus a separate `getAppCount()` with no `pageUrl`.

### 4. Support (`src/app/support/page.js` → `src/app/components/support/SupportClient.js:SupportClient`)
- Data: `src/app/lib/support-data.js:getSupportPageData` loads footer, navbar, meta, testimonials and `src/utils/axiosCalls.js:getLiveSupportData`, which calls a hardcoded plugservice-api host.
- `isLiveSupportAvailable` is computed **on the server**. It is true when a row has `availability === true` and its `time` slot's start hour equals the current IST hour (`isTimeSlotActive` parses `"<h> - <h> AM|PM"`).
- The form validates name and email, then POSTs JSON. Other channels: `window.Chatbot?.open()`, community, help, `/experts`, a playbook on Canva, phone, WhatsApp, email and cal.id.

### 5. Feedback (`src/app/feedback/page.js`)
- `variant=satisfied` renders `FeedbackSatisfiedClient`, `variant=unsatisfied` renders `FeedbackUnsatisfiedClient`, and anything else calls `notFound()`. Metadata sets `robots: { index: false, follow: false }`.
- On mount, both send the URL params (`plugin`, `client_email`, `request_id`, …) through `sendBeacon`, falling back to `fetch`. The unsatisfied page also builds a tally.so link that carries those same params as a query string (`tallyHref`).

### 6. Signup (`src/app/signup/page.js:SignupPage` → `src/app/components/customLogin/CustomLoginOptimized.js:CustomLoginOptimized`)
- A two-column layout: on the left, the MSG91 widget mounts into `<div id={NEXT_PUBLIC_REFERENCE_ID}>`; on the right, a hardcoded testimonial card and stats. `appCount + 300` comes from `src/app/lib/data.js:getSignupPageData`.
- The widget loads MSG91's proxy-auth script once (guarded by `window.__custom_login_script_loaded__`) and calls `initVerification` once per page (guarded by `window.__init_verification_ran__`), with `state: setUtmSource()`. `?redirect_to` becomes `addInfo.redirect_path`. The env var is `NEXT_PUBLIC_REFERENCE_ID` ([DEVELOPMENT](../DEVELOPMENT.md#environment-variables-reference)).

---

## UI Components
- Feature-specific: `AgencyList`, `RequestMeetingComp`, the `src/app/hire-an-expert/*` sections, `src/components/agencyPartner/*`, `SupportClient`, the two feedback clients, `CustomLoginOptimized`.
- Shared: `PhoneInput` (used by `RequestMeetingComp`), `NavbarServer`, `Footer`, `MetaHeadComp`, `BlogGrid`, `SecuritySection`, `ShowBadges`. See the [DESIGN catalog](../DESIGN.md#reusable-component-catalog) and [DESIGN: modals](../DESIGN.md#modals-toasts-and-feedback).

---

## Data Dependencies
1. **table-api:** agencies, page data, expert blogs, testimonials, meta, FAQ, navbar and footer, through `src/utils/getData.js` getters ([table-api](../current-infrastructure/table-api.md), [database/entities](../database/entities.md)).
2. **Plug service:** `getAppCount` (signup, agency partner). `getLiveSupportData` (plugservice-api) ([plug-service](../current-infrastructure/plug-service.md)).
3. **Outbound:** flow.sokt.io webhooks ([flow-webhooks](../current-infrastructure/flow-webhooks.md)); MSG91, Stripe, cal.id, tally.so, ipapi.co via `PhoneInput` ([third-party-services](../current-infrastructure/third-party-services.md)).

---

## State Management
- **Server state:** one loader per page. `/support` decides live availability per request.
- **Client state:** form fields and errors in `useState` (`SupportClient`, `RequestMeetingComp`); the feedback `status` (`sending` and after); MSG91 guards on `window`. `/hire-an-expert` writes `utmData.intent` ([CONTRACTS: cookies](../CONTRACTS.md#cookies)).

---

## API Dependencies
- None of the site's own routes. Every submission goes straight from the browser to an external endpoint, and there is no server proxy or reCAPTCHA ([13-security](../13-security.md)).

---

## Loading / Empty / Error States
- **Loading:** the signup widget shows three skeleton bars until `initVerification` runs. Support disables its button while sending (`isSend`). Feedback shows a "sending" status pill.
- **Empty:** `/experts` hides the verified list when it is empty. The support live card appears only when `isLiveSupportAvailable` is true.
- **Error:** the support form shows **nothing** on failure; it only re-enables the button ([OPEN_QUESTIONS U-06](../OPEN_QUESTIONS.md#active-questions-table)). Feedback shows "Couldn't reach our servers…". `RequestMeetingComp` uses `alert()`. If the MSG91 script fails, the skeleton stays forever ([FLOWS](../FLOWS.md#5-failure-modes-and-footguns)).

---

## Development Tasks (Next Phases)
- [ ] Decide on form failure states ([OPEN_QUESTIONS U-06](../OPEN_QUESTIONS.md#active-questions-table)) and on moving `RequestMeetingComp` PII into a body ([S-03](../OPEN_QUESTIONS.md#active-questions-table)).
- [ ] Fix the source tagging for hire-an-expert ([OPEN_QUESTIONS T-05](../OPEN_QUESTIONS.md#active-questions-table), [T-07](../OPEN_QUESTIONS.md#active-questions-table)).
- [ ] Decide on the duplicate `meeting_request_form` dialogs and on the feedback params forwarded to tally.so (new questions in M2 notes).
