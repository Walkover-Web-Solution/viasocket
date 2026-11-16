---
covers: ["src/app/ask/route.js"]
verified_at: a1c4e902
verified_on: 2026-11-16
---
# API — NLWeb /ask

Conversational natural-language query endpoint over marketing site content, returning Schema.org-typed results for AI agents and scanners (Axien `act.nlweb`, Ora, Lumar, agent-ready.dev).

## Route

| Route | Methods | Description |
|---|---|---|
| `/ask` | GET, POST, OPTIONS | NLWeb query endpoint returning structured Schema.org JSON (`src/app/ask/route.js`) |

No authentication. Runs on Edge runtime (`export const runtime = 'edge'`). Cached for 5 minutes (`public, max-age=300, stale-while-revalidate=600`).

## Request

- **GET `/ask?query=...`**: query passed via `query`, `q`, or `text` query parameter.
- **POST `/ask`**: query passed in JSON body (`query`, `query.text`, `q`, or `text`).
- **OPTIONS `/ask`**: CORS preflight returning HTTP 204.

## Response Structure

Conforms to the NLWeb specification v0.55 envelope with `response_type: "answer"` and `response_format: "conversational_search"`. Results contain Schema.org objects (`SoftwareApplication`, `TechArticle`, `DataCatalog`, `WebPage`, `WebAPI`, etc.) with `schema_object` and `grounding`.

Listed in `/.well-known/api-catalog` (`service-doc`) and `public/llms.txt`.
