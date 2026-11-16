---
covers: ["src/app/.well-known/ai-catalog.json/route.js"]
verified_at: pending
verified_on: 2026-11-16
---
# API — AI Catalog (/.well-known/ai-catalog.json)

## Route

| Route | Methods | Description |
|---|---|---|
| `/.well-known/ai-catalog.json` | GET, OPTIONS | `application/ai-catalog+json` (or `application/json`) machine-readable catalog of agent-facing resources |

Served by `src/app/.well-known/ai-catalog.json/route.js`. Edge runtime. No authentication. Cached for one hour with CORS `*` enabled.

## Contents

Lists viaSocket's invocable and discoverable agent resources conforming to the AI Catalog Standard:

- **viaSocket website**: canonical homepage <!-- // pragma: allowlist secret -->
- **Product MCP server**: `https://mcp.viasocket.com/mcp` and server card at `https://mcp.viasocket.com/mcp/server-card` (21 tools across 2,300+ apps)
- **Docs MCP server**: `/docs/mcp` (public read-only documentation MCP)
- **llms.txt**: `/llms.txt` and flow's `https://flow.viasocket.com/llms.txt`
- **Skills**: installable coding agent skill at `https://flow.viasocket.com/documentation/skill-install.md` and full reference manual at `https://flow.viasocket.com/documentation/skill.md`
- **Documentation**: API credentials setup (`/documentation/skill/setup.md`), Apps API quickstart (`/developers/docs`), auth docs (`/documentation/skill/login-and-orgs.md`), app integrations (`/documentation/skill/app-integrations.md`), and markdown pricing (`/pricing.md`)
- **API catalog**: RFC 9727 linkset at `/.well-known/api-catalog`

OpenAPI specs are omitted: flow's product API specs are not published at stable public URLs from this repo.

## Discovery

Linked via `<link rel="ai-catalog" href="/.well-known/ai-catalog.json" type="application/ai-catalog+json">` from homepage HTML variants (`public/new-home/index.html`, `public/home-b/index.html`) and Next.js `src/app/layout.js`.
