---
covers: ["public/.well-known/agent-skills/**"]
verified_at: 0b5da499
verified_on: 2026-11-16
---
# API — Agent Skills Discovery (RFC v0.2.0)

## Route

| Route | Methods | Description |
|---|---|---|
| `/.well-known/agent-skills/index.json` | GET | Discovery index enumerating published agent skills per RFC v0.2.0 |
| `/.well-known/agent-skills/viasocket-integrations/SKILL.md` | GET | The `viasocket-integrations` skill artifact (`type: "skill-md"`) |

Static files served from `public/.well-known/agent-skills/`. No authentication.

## Manifest format

Conforms to schema `https://schemas.agentskills.io/discovery/0.2.0/schema.json`:
- Top-level `$schema` and `skills` array.
- Each skill entry has `name`, `type` (`"skill-md"` or `"archive"`), `description`, `url`, and `digest` (`sha256:{hex}`).

## Published Skills

| Name | Type | URL | Description |
|---|---|---|---|
| `viasocket-integrations` | `skill-md` | `/.well-known/agent-skills/viasocket-integrations/SKILL.md` | Instructions for AI coding agents to integrate apps, automations, and AI with viaSocket |
