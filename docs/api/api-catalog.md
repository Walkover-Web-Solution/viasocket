---
covers: ["src/app/.well-known/api-catalog/route.js"]
verified_at: ac00cec3
verified_on: 2026-11-16
---
# API — RFC 9727 api-catalog

## Route

| Route | Methods | Description |
|---|---|---|
| `/.well-known/api-catalog` | GET | `application/linkset+json` listing flow app docs and this host's docs MCP |

Static JSON in `src/app/.well-known/api-catalog/route.js`. No authentication. Cached for one hour.

## Linkset

| Anchor | Points to |
|---|---|
| `https://flow.viasocket.com/` | Product documentation and `llms.txt` |
| Request origin (production bare domain) | Marketing `llms.txt`, `/developers/docs` (Apps API quickstart), and `/docs/mcp` |

OpenAPI specs are not listed: flow's product API specs are not published at stable public URLs from this repo.