---
covers: ["src/app/docs/mcp/server-card/route.js", "src/app/.well-known/ai-catalog.json/route.js", "src/utils/docsMcp.js"]
verified_on: 2026-11-16
---
# API — MCP Server Card (docs MCP)

## Routes

| Route | Methods | Description |
|---|---|---|
| `/docs/mcp/server-card` | GET, OPTIONS | SEP-2127 Server Card for the public docs MCP |
| `/.well-known/ai-catalog.json` | GET | AI Catalog with one entry pointing at the docs Server Card |

No authentication. `GET /docs/mcp/server-card` responds with `application/mcp-server-card+json` and CORS `*`. The card describes the Streamable HTTP endpoint at `/docs/mcp` (`com.viasocket/docs`, protocol `2024-11-05`).

Product actions and OAuth-gated MCP remain on `https://connect.viasocket.com/mcp`; that host is not served by this repository.

## Production routing note

Same constraint as [docs-mcp.md](docs-mcp.md): on production viasocket.com, `/docs/*` may be answered by the flow documentation worker until zone routing sends `/docs/mcp` and `/docs/mcp/server-card` to this Pages app. Test deploys that route `/docs/*` here serve both endpoints.