---
covers: ["src/app/api/route.js", "src/app/api/[...catchall]/route.js", "src/utils/jsonErrors.js"]
verified_at: 3a898531
verified_on: 2026-11-16
---
# API — JSON Problem Errors (RFC 9457)

Machine-readable JSON error handling for API routes under `/api`, designed for agent error recovery (Axien `act.json-errors`).

## Routes

| Route | Methods | Description |
|---|---|---|
| `/api` | GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS | API root handler returning 404 problem+json (`src/app/api/route.js`) |
| `/api/[...catchall]` | GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS | API catchall handler returning 404 problem+json (`src/app/api/[...catchall]/route.js`) |

## Envelope Shape (RFC 9457)

Responses are returned with `Content-Type: application/problem+json; charset=utf-8` and `Cache-Control: no-store`:

```json
{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "The requested API endpoint was not found: /api/unknown",
  "code": "not_found",
  "error": "Not Found",
  "message": "The requested API endpoint was not found: /api/unknown"
}
```

Includes standard RFC 9457 fields (`type`, `title`, `status`, `detail`) as well as conventional error fields (`code`, `error`, `message`) to allow automated tools and agent scanners to diagnose failures.
