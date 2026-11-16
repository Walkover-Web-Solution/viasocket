---
covers: ["src/app/.well-known/agent-card.json/route.js"]
verified_at: a1c4e902
verified_on: 2026-11-16
---
# API — A2A agent-card

## Route

| Route | Methods | Description |
|---|---|---|
| `/.well-known/agent-card.json` | GET | A2A `AgentCard` JSON describing the public docs MCP on this host |

Static JSON in `src/app/.well-known/agent-card.json/route.js`. No authentication. Cached for one hour.

## Payload

The card identifies **viaSocket Docs**, points `supportedInterfaces[0].url` at `/docs/mcp` (MCP JSON-RPC, not A2A task messaging), and lists three documentation skills aligned with the docs MCP tools. `documentationUrl` is `/llms.txt`. Product actions remain on the OAuth MCP at `https://connect.viasocket.com/mcp` (see `public/llms.txt`).