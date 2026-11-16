# viaSocket

Marketing site for [viaSocket](https://viasocket.com), the app that connects products and automates workflows. The site is a [Next.js](https://nextjs.org) App Router app (React 18, Tailwind CSS, Sass) and can also be built for Cloudflare Pages.

## Prerequisites

- Node.js `^18.18.0`, `^19.8.0`, or `>= 20.0.0` (Next.js 15.5)
- npm

## Setup

```bash
git clone https://github.com/walkover-Web-Solution/viasocket.git
cd viasocket
npm install
```

Create a `.env.local` file in the project root. Next.js loads it automatically, and `.env` / `.env*.local` are gitignored.

```bash
# Public site origin. Used for canonical links and metadata.
NEXT_PUBLIC_BASE_URL=http://localhost:1111

# viaSocket app. Paths such as /makeflow and /connect are appended.
NEXT_PUBLIC_FLOW_URL=https://flow.viasocket.com

# Integrations API. Must end with a slash; routes are appended directly.
NEXT_PUBLIC_INTEGRATION_URL=https://plugservice-api.viasocket.com/

# Set to prod to allow indexing, the Reddit pixel, and production-only tracking.
# Any other value (or unset) serves noindex and a disallow-all robots.txt.
NEXT_PUBLIC_PRODUCTION_ENVIRONMENT=dev

# Content database
NEXT_PUBLIC_DB_BASE_URL=
NEXT_PUBLIC_DB_KEY=
NEXT_PUBLIC_BLOG_DB_KEY=
NEXT_PUBLIC_DB_KEY_ABTEST=

# Optional analytics and login widget
NEXT_PUBLIC_REDDIT_PIXEL_ID=
NEXT_PUBLIC_REFERENCE_ID=
NEXT_PUBLIC_RECAPTCHA_KEY=
```

Ask a teammate for the database keys and other private values. The app still starts without them, but pages that fetch content from the database or integrations API will fail those requests.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at [http://localhost:1111](http://localhost:1111) |
| `npm run build` | Production build. A prebuild step writes `public/robots.txt` from `NEXT_PUBLIC_PRODUCTION_ENVIRONMENT`. |
| `npm start` | Serve the production build on port 1111 |
| `npm run preview` | Build with `@cloudflare/next-on-pages` and preview with Wrangler |
| `npm run deploy` | Build for Cloudflare Pages and deploy with Wrangler |

`/` is rewritten to the static homepage in `public/new-home`. App Router pages live under `src/app`.

## Project layout

- `src/app` — routes, page data, and route-level components
- `src/components` — shared UI
- `src/utils` — API and URL helpers
- `public` — static assets, including the homepage
- `build-utilities/generate-robots-txt.js` — robots.txt generated before each build
