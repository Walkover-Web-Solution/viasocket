---
covers: ["src/app/docs/mcp/route.js", "src/utils/docsMcp.js", "src/app/.well-known/mcp.json/route.js"]
verified_at: 0b8e073c
verified_on: 2026-11-16
---
# API — docs-mcp (public documentation MCP)

Read-only Streamable HTTP MCP over the public `/docs` tree on the marketing host. No authentication. Product actions remain on the connect MCP host (OAuth).

## Routes

| Route | Methods | Description |
|---|---|---|
| `/docs/mcp` | GET, POST, OPTIONS | Public docs MCP (`src/app/docs/mcp/route.js`) |
| `/.well-known/mcp.json` | GET | Discovery manifest pointing to `/docs/mcp` (`src/app/.well-known/mcp.json/route.js`) |
| `/docs/mcp/server-card` | GET, OPTIONS | SEP-2127 Server Card ([mcp-server-card.md](mcp-server-card.md)) |

## POST /docs/mcp

JSON-RPC 2.0. `Accept` may include `application/json` or `text/event-stream`.

Supported methods:

- `initialize` — returns `serverInfo.name: viasocket-docs` and usage `instructions` (50+ chars explaining tool selection)
- `tools/list` — `get_doc_page`, `search_docs`, `list_doc_pages` with read-only annotations and typed `outputSchema`
- `tools/call` — fetches live content from `/docs/{path}` on the same host as this route, returning both `content` text blocks and typed `structuredContent`

Errors use JSON-RPC `error` objects with HTTP 200.

## GET /docs/mcp

Small JSON discovery payload (`name`, `description`, `mcp`, `docs`).

## GET /.well-known/mcp.json

Standard MCP discovery descriptor advertising the `/docs/mcp` endpoint and its capabilities.

## Production routing note

On production, most `/docs/*` URLs are served by the flow documentation worker (socket-flow-UI), not this Pages app. Until zone routing sends `GET/POST /docs/mcp` here, only environments where `/docs/*` reaches this worker (for example test after deploy) answer this handler. The intended production URL is still `/docs/mcp` on the bare marketing domain.