---
covers: ["src/app/docs/mcp/route.js", "src/utils/docsMcp.js"]
verified_at: 37841d9c
verified_on: 2026-11-16
---
# API — docs-mcp (public documentation MCP)

Read-only Streamable HTTP MCP over the public `/docs` tree on the marketing host. No authentication. Product actions remain on the connect MCP host (OAuth).

## Routes

| Route | Methods | Description |
|---|---|---|
| `/docs/mcp` | GET, POST, OPTIONS | Public docs MCP (`src/app/docs/mcp/route.js`) |

## POST /docs/mcp

JSON-RPC 2.0. `Accept` must include both `application/json` and `text/event-stream` (same rule as the product MCP).

Supported methods:

- `initialize` — returns `serverInfo.name: viasocket-docs`
- `tools/list` — `get_doc_page`, `search_docs`, `list_doc_pages` (read-only annotations)
- `tools/call` — fetches live content from `/docs/{path}` on the same host as this route

Errors use JSON-RPC `error` objects with HTTP 200.

## GET /docs/mcp

Small JSON discovery payload (`name`, `mcp`, `docs`, `product_mcp`).

## Production routing note

On production, most `/docs/*` URLs are served by the flow documentation worker (socket-flow-UI), not this Pages app. Until zone routing sends `GET/POST /docs/mcp` here, only environments where `/docs/*` reaches this worker (for example test after deploy) answer this handler. The intended production URL is still `/docs/mcp` on the bare marketing domain.