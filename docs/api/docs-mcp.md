---
covers: ["src/app/docs/mcp/route.js", "src/utils/docsMcp.js"]
verified_at: 94a67398
verified_on: 2026-11-16
---
# API — docs-mcp (public documentation MCP)

Read-only Streamable HTTP MCP over the public `/docs` tree on the marketing host. No authentication. Product actions remain on the connect MCP host (OAuth).

## Routes

| Route | Methods | Description |
|---|---|---|
| `/docs/mcp` | GET, POST, OPTIONS | Public docs MCP (`src/app/docs/mcp/route.js`) |
| `/.well-known/mcp/server-card.json` | GET, OPTIONS | Docs MCP Server Card for legacy scanners ([mcp-server-card.md](mcp-server-card.md)) |
| `/docs/mcp/server-card` | GET, OPTIONS | Canonical SEP-2127 Server Card ([mcp-server-card.md](mcp-server-card.md)) |

## POST /docs/mcp

JSON-RPC 2.0. `Accept` must include both `application/json` and `text/event-stream` (same rule as the product MCP).

Supported methods:

- `initialize` — returns `serverInfo.name: viasocket-docs` and usage `instructions` (50+ chars explaining tool selection)
- `tools/list` — `get_doc_page`, `search_docs`, `list_doc_pages` with read-only annotations and typed `outputSchema`
- `tools/call` — fetches live content from `/docs/{path}` on the same host as this route, returning both `content` text blocks and typed `structuredContent`

Errors use JSON-RPC `error` objects with HTTP 200.

## GET /docs/mcp

Small JSON discovery payload (`name`, `description`, `mcp`, `docs`, `product_mcp`).

## Production routing note

On production, most `/docs/*` URLs are served by the flow documentation worker (socket-flow-UI), not this Pages app. Until zone routing sends `GET/POST /docs/mcp` here, only environments where `/docs/*` reaches this worker (for example test after deploy) answer this handler. The intended production URL is still `/docs/mcp` on the bare marketing domain.