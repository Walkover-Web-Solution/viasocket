---
covers: ["src/app/.well-known/api-catalog/route.js"]
verified_at: 6f3d58b5
verified_on: 2026-11-16
---
# API — RFC 9727 api-catalog

## Route

| Route | Methods | Description |
|---|---|---|
| `/.well-known/api-catalog` | GET | `application/linkset+json` listing flow app docs, this host's docs MCP, and the NLWeb `/ask` endpoint |

Static JSON in `src/app/.well-known/api-catalog/route.js`. No authentication. Cached for one hour.

## Linkset

| Anchor | Points to |
|---|---|
| `https://flow.viasocket.com/` | Product documentation and `llms.txt` |
| Request origin (production bare domain) | Marketing `llms.txt`, `/AGENTS.md` (coding agent instructions), `/developers/docs` (Apps API quickstart), `/docs/mcp`, and `/ask` (NLWeb endpoint) |

OpenAPI specs are not listed: flow's product API specs are not published at stable public URLs from this repo.