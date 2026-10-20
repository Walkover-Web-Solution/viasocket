# Contributing

Thanks for helping improve the viaSocket marketing site. This repo is a [Next.js](https://nextjs.org/) app (App Router) deployed to Cloudflare Pages.

## Prerequisites

- **Node.js** 18 or newer (Node 20+ recommended)
- **npm** (ships with Node)

## Run locally

1. Clone the repository and install dependencies:

   ```bash
   npm ci
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:1111](http://localhost:1111) in your browser.

The dev server uses port **1111** (see `package.json`).

## Environment variables

Many pages call viaSocket APIs and databases. For a full production-like experience, add a `.env.local` file in the project root with the `NEXT_PUBLIC_*` values your team uses (for example `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_INTEGRATION_URL`, `NEXT_PUBLIC_FLOW_URL`, and related keys). The app still runs without them; some data fetches and integrations may be empty or limited.

Do not commit secrets or `.env.local`.

## Other commands

| Command | Purpose |
| --- | --- |
| `npm run build` | Production build (runs `prebuild` to generate `robots.txt` first) |
| `npm run start` | Serve the production build on port 1111 |
| `npm run preview` | Build for Cloudflare Pages and run locally with Wrangler |

## Pull requests

- Keep changes focused and match existing code style.
- Run `npm run build` before opening a PR if you touched routing, data loading, or build scripts.
