---
covers: ["package.json", "package-lock.json"]
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# 06 Tech Stack

Versions are the ones installed by `package-lock.json` (lockfileVersion 3), not the `package.json` ranges. Setup, scripts and env vars live in [DEVELOPMENT](DEVELOPMENT.md).

| Layer | Choice | Notes |
|---|---|---|
| Language | JavaScript (ES modules, JSX) | `jsconfig.json` maps `@/*` to `src/*`. No `tsconfig.json`; the only TypeScript file is the generated `next-env.d.ts`. <!-- verify:ignore --> |
| Framework | `next` 15.5.9, `react` 18.3.1, `react-dom` 18.3.1 | App Router, every dynamic route on the edge runtime ([ARCHITECTURE](ARCHITECTURE.md)). Next 16 / React 19 were tried and reverted ([DECISIONS ADR-002](DECISIONS.md#adr-002-stay-on-next-15--react-18--next-on-pages-reject-next-16-and-opennextjscloudflare)). <!-- verify:ignore --> |
| Styling | `tailwindcss` 3.4.17 + `daisyui` 4.12.24 (plugin in `tailwind.config.js`), `sass` 1.91.0, `postcss` 8.5.6 + `autoprefixer` 10.4.21 (`postcss.config.js`) | Tailwind first; SCSS in `src/scss/` and `*.module.scss` is legacy. Rules in [DESIGN](DESIGN.md#design-tokens--styling-primitives). <!-- verify:ignore --> |
| UI components | none (in-house) | No component library. Shared components are catalogued in [DESIGN](DESIGN.md#reusable-component-catalog). |
| Icons | `lucide-react` 0.511.0 | one library only (143 files import it). <!-- verify:ignore --> |
| Charts | none | No charting library. Do not add one without asking. |
| Animation | CSS / Tailwind keyframes (`tailwind.config.js` `theme.extend.animation`) | `motion` 12.35.0 is imported only by `src/app/components/new-home/FeaturesBanner.js`, used by the dormant `src/app/home/page.js`. Do not spread it to new pages. <!-- verify:ignore --> |
| Data store(s) | table-api.viasocket.com (remote tables, no local DB) <!-- verify:ignore --> | see [current-infrastructure/table-api](current-infrastructure/table-api.md) and [database/entities](database/entities.md). |
| HTTP | `axios` 1.11.0 + `axios-cache-interceptor` 1.8.2 | All calls go through `src/utils/axiosCalls.js` (20-minute in-process cache). <!-- verify:ignore --> |
| Markdown | `react-markdown` 10.1.0 | `src/app/components/automations/AutomationSlugClient.js`, `src/app/components/home/ResultSectionOptimized.js`. <!-- verify:ignore --> |
| Marquee | `react-fast-marquee` 1.6.5 | e.g. `src/components/marqueeComponent/marqueeComponent.js`. <!-- verify:ignore --> |
| Pagination | `react-paginate` 8.3.0 | `src/app/components/experts/AgencyList.js` only. <!-- verify:ignore --> |
| Phone input | `google-libphonenumber` 3.2.46 | `src/components/phoneInput/phoneInput.js` only. <!-- verify:ignore --> |
| Lottie | `@dotlottie/player-component` 2.7.12 | `src/app/components/support/LiveIcon.js` only. <!-- verify:ignore --> |
| Fonts | `geist` 1.3.1 (`geist/font/sans`, `geist/font/mono`) | Used by the `src/components/IntegrationsComp/addToProduct/` pages. Other fonts: [DESIGN](DESIGN.md#typography). <!-- verify:ignore --> |
| Testing | none | No test runner, test files, lint or typecheck. How to verify instead: [DEVELOPMENT](DEVELOPMENT.md#how-an-agent-checks-its-work-verification-checklist). |
| Deployment | Cloudflare Pages via `@cloudflare/next-on-pages` 1.13.16, `wrangler` 4.54.0, `vercel` 42.0.0 | `vercel` is a peer dependency of next-on-pages (it runs `vercel build`), so it is in use. Pipeline: [DEVELOPMENT](DEVELOPMENT.md#pr-workflow--deployment-pipeline). <!-- verify:ignore --> |
| Formatting | `prettier` 3.2.5 (pinned exactly) | Format only the lines you touch ([DEVELOPMENT](DEVELOPMENT.md#running-automated-checks--tests)). `husky` 9.1.7 and `lint-staged` 15.5.2 are installed but not wired up. <!-- verify:ignore --> |

## Constraints

- **Node:** no `.nvmrc`, `.node-version` or `engines` field. Node v22.15.0 with npm 10.9.2 is the known-good baseline. <!-- verify:ignore -->
- **`.npmrc` `legacy-peer-deps=true` masks a peer conflict.** `@cloudflare/next-on-pages` 1.13.16 declares `next >=14.3.0 <=15.5.2` and `vercel >=30.0.0 <=47.0.4`, but `next` 15.5.9 is installed. Install succeeds only because of that line; do not remove it ([OPEN_QUESTIONS D-04](OPEN_QUESTIONS.md#active-questions-table)). <!-- verify:ignore -->
- **One library per concern.** The table above is the approved set; a second library for a covered concern is review-blocking ([docs/AGENTS.md](AGENTS.md#3-tech-stack-restrictions)).
- **No framework or adapter upgrades inside other work.** Bumping `next`, `react`, the adapter, or moving to `@opennextjs/cloudflare` is its own scoped project ([DECISIONS ADR-002](DECISIONS.md#adr-002-stay-on-next-15--react-18--next-on-pages-reject-next-16-and-opennextjscloudflare)). <!-- verify:ignore -->
- **Removed on 2026-10-21 as unused:** `color`, `date-fns`, `fs`, `gray-matter`, `js-yaml`, `path`, `react-google-recaptcha-v3` ([DECISIONS ADR-014](DECISIONS.md#adr-014-evidence-based-dead-code-cleanup)). Do not re-add them for convenience. <!-- verify:ignore -->
