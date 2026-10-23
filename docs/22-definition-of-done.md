---
covers: []
verified_at: 17b99cd8
verified_on: 2026-10-22
---
# 22 Definition of Done

A change is "done" only when all of these are true. These are the criteria; the step-by-step procedure for checking them is the [DEVELOPMENT verification checklist](DEVELOPMENT.md#how-an-agent-checks-its-work-verification-checklist).

- [ ] Code follows [09-coding-guidelines.md](09-coding-guidelines.md): smallest change that does the job, no reformatting of untouched code, copy as constants in the component, Tailwind before custom CSS.
- [ ] Every new dynamic `page.js` / `route.js` exports `export const runtime = 'edge'` (the Cloudflare build fails without it even though `next build` passes). <!-- verify:ignore -->
- [ ] Server/client boundaries respected: no new `'use client'` file imports `src/utils/axiosCalls.js` or `src/utils/getData.js`, and no real secret sits behind a `NEXT_PUBLIC_` name ([docs/AGENTS.md](AGENTS.md#2-server-vs-client-boundaries), [13-security.md](13-security.md)). <!-- verify:ignore -->
- [ ] Backends fail soft: table-api and plug-service failures report via `sendErrorMessage` and render an empty section, never a 500; tracking fails closed ([18-error-handling.md](18-error-handling.md)).
- [ ] Routes, redirects, canonicals and SEO metadata are preserved unless the change is about them, and no route shadows a path served by another deployment ([05-navigation.md](05-navigation.md), [DESIGN SEO](DESIGN.md#seo--metadata-expectations)).
- [ ] UTM and tracking conventions kept: path-shaped `utm_source`, campaign tags, `utmData` cookie, `utm_source` once in the signup URL, tracking active in all three environments ([docs/AGENTS.md](AGENTS.md#4-id-handling--cross-system-references)). <!-- verify:ignore -->
- [ ] `npm run build` exits 0 with no warnings beyond the known Sass `@import` deprecations, and the generated `public/robots.txt` is deleted, not committed. <!-- verify:ignore -->
- [ ] Every affected route was HTTP-checked on the dev server (status, `<title>`, canonical, redirect target).
- [ ] Tracking or analytics changes were verified with a real write followed by a cache-busted read of the live row; otherwise the change is reported as "not verified end-to-end".
- [ ] There are **no automated tests**, lint or typecheck in this repo; the build plus the HTTP and data checks above are the only proof. Do not claim "tests pass".
- [ ] Docs updated in the same change: `docs/api/`, `docs/database/`, `docs/modules/`, `docs/current-infrastructure/`, routes in [05-navigation.md](05-navigation.md), env vars in [DEVELOPMENT](DEVELOPMENT.md#environment-variables-reference), with `verified_at` / `verified_on` bumped. <!-- verify:ignore -->
- [ ] No new library added for an already-covered concern ([06-tech-stack.md](06-tech-stack.md)).
- [ ] The change is small and single-concern, made on the checked-out branch, and goes through the feature → `test` → `main` flow ([DEVELOPMENT](DEVELOPMENT.md#pr-workflow--deployment-pipeline)).
