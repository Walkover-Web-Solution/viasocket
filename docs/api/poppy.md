---
covers: ["src/app/.well-known/poppy.json/route.js"]
verified_at: dc2fd06e
verified_on: 2026-11-16
---
# API — Personal Agent Protocol (Poppy 1.0) Discovery

## Route

| Route | Methods | Description |
|---|---|---|
| `/.well-known/poppy.json` | GET, HEAD, OPTIONS | Personal Agent Protocol (Draft 1.0) discovery document identifying viaSocket, its domain, and its public MCP API endpoint |

Served dynamically by `src/app/.well-known/poppy.json/route.js` (edge runtime). No authentication. Cached for one hour (`public, max-age=3600`).

## Discovery Document

| Field | Value | Purpose |
|---|---|---|
| `protocol_version` | `"1.0"` | Declares Personal Agent Protocol major.minor version |
| `organization.name` | `"viaSocket"` | Company display name |
| `organization.domain` | Request host (port when not 443) | Host that serves the document, matching the serving domain |
| `apis` | `[{ type: "mcp", url: "https://<domain>/docs/mcp", description: "..." }]` | Lists the public docs and integration reference MCP server on the same domain |
