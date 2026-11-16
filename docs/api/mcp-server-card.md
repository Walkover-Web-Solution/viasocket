---
covers: ["src/app/docs/mcp/server-card/route.js", "src/app/.well-known/mcp/server-card.json/route.js", "src/app/.well-known/ai-catalog.json/route.js", "src/utils/docsMcp.js"]
verified_on: 2026-11-16
---
# API — MCP Server Card (docs MCP)

## Routes

| Route | Methods | Description |
|---|---|---|
| `/.well-known/mcp/server-card.json` | GET, OPTIONS | Same SEP-2127 card as below; `application/json` for legacy scanners (for example Axien) |
| `/docs/mcp/server-card` | GET, OPTIONS | Canonical SEP-2127 location; `application/mcp-server-card+json` |
| `/.well-known/ai-catalog.json` | GET | AI Catalog entry `url` points at the well-known card |

No authentication. Both card URLs share `buildDocsMcpServerCard()` from `src/utils/docsMcp.js` and CORS `*`. The card describes the Streamable HTTP endpoint at `/docs/mcp` (`com.viasocket/docs`, protocol `2024-11-05`). This repo does **not** serve `/.well-known/mcp.json` (registry manifest; different schema).

Product actions and OAuth-gated MCP remain on `https://connect.viasocket.com/mcp`; that host is not served by this repository.

## Production routing note

Same constraint as [docs-mcp.md](docs-mcp.md): on production viasocket.com, `/docs/*` may be answered by the flow documentation worker until zone routing sends `/docs/mcp` and `/docs/mcp/server-card` to this Pages app. Test deploys that route `/docs/*` here serve both endpoints. `/.well-known/mcp/server-card.json` is always served by this app.