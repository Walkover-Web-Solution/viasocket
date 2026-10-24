---
name: Arcade.dev
url: https://www.arcade.dev
category: direct
relevance: medium
checked_on: 2026-10-23
sources:
  - https://www.arcade.dev
  - https://www.arcade.dev/pricing
  - https://docs.arcade.dev
---
# Arcade.dev

## Observation (checked 2026-10-23)

- **Overlap:** agent tools, OAuth per user and MCP. It is positioned as an enterprise governance layer for agent actions, not as embedded integrations for SaaS products.
- **Positioning:** "Govern every action for every AI agent" ([arcade.dev](https://www.arcade.dev))
- **Core promise:** one control point to enforce, execute and audit agent actions, where agents act as the signed-in user.
- **Capabilities:**
  - OAuth plus identity-provider integrations (Auth0, Clerk, Entra, Okta, Stytch) ([docs](https://docs.arcade.dev))
  - an MCP runtime, gateways and a registry
  - an open-source framework for building tools
  - self-hosting in a VPC, on-prem or air-gapped
  - audit records per action, streamed to your SIEM
  - policy hooks around tool calls
- **Not found on public pages:** triggers or webhooks for app events, and a white-label connect UI.
- **Integrations claimed:** "8,000+ permission-aware tools" ([arcade.dev](https://www.arcade.dev), 2026-10-23).
- **Pricing** ([pricing](https://www.arcade.dev/pricing), 2026-10-23, volatile):
  - Free: 2,000 auth events and 2,000 tool calls a month.
  - Team: $25/mo plus $0.10 per auth event and $0.01 per tool call.
  - Enterprise: custom.
- **Onboarding:** plugins for Claude Code, Codex, Copilot CLI and Cursor; a remote MCP URL; SDKs.
- **Proof:**
  - Logos: LangChain, Duracell, Relevance AI, Snyk, Sybill.
  - "SOC 2 compliant".
  - Funding (a $60M Series A, June 2026) is reported in press only, not on Arcade's site.

## Interpretation

- Arcade matters in enterprise agent deals. It is weaker on triggers and embedded end-user UI for SaaS builders, though missing public evidence does not prove absence.

## Uncertainties

- The changelog index looked stale (last entry 2026-07-24).

## Recommendation (Proposed)

- Monitor quarterly-plus. No copy action needed now.
- **Watch:** https://www.arcade.dev/pricing, https://docs.arcade.dev/en/home/changelog
