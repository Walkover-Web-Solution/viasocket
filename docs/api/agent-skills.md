---
covers: ["src/app/.well-known/agent-skills/**", "src/utils/agentSkills.js", "src/utils/buildViasocketIntegrationsSkillInstall.js", "src/const/viasocketIntegrationsSkillVersion.js", "build-utilities/generate-agent-skills.js"]
verified_at: c1ad9005
verified_on: 2026-11-18
---
# API — Agent Skills Discovery (RFC v0.2.0)

## Route

| Route | Methods | Description |
|---|---|---|
| `/.well-known/agent-skills/index.json` | GET | Discovery index enumerating published agent skills per RFC v0.2.0 |
| `/.well-known/agent-skills/viasocket-integrations/SKILL.md` | GET | The `viasocket-integrations` skill artifact (`type: "skill-md"`) |

Static JSON and markdown served by Edge Function route handlers in `src/app/.well-known/agent-skills/` (backed by `src/utils/agentSkills.js`). No authentication.

The install pointer's `metadata.version` and its reinstall line are built from `src/const/viasocketIntegrationsSkillVersion.js` via `buildViasocketIntegrationsSkillInstall.js`; `npm run prebuild` runs `build-utilities/generate-agent-skills.js` to refresh the RFC digest. Live `/docs/skill.md` and `/docs/skill-install.md` are generated at request time in socket-flow-UI from `public/skills/viasocket-integrations/SKILL.md` ([docs-mcp.md](docs-mcp.md#production-routing-note)).

## Manifest format

Conforms to schema `https://schemas.agentskills.io/discovery/0.2.0/schema.json`:
- Top-level `$schema` and `skills` array.
- Each skill entry has `name`, `type` (`"skill-md"` or `"archive"`), `description`, `url`, and `digest` (`sha256:{hex}`).

## Published Skills

| Name | Type | URL | Description |
|---|---|---|---|
| `viasocket-integrations` | `skill-md` | `/.well-known/agent-skills/viasocket-integrations/SKILL.md` | Instructions for AI coding agents to integrate apps, automations, and AI with viaSocket |
