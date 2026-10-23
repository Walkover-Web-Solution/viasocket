---
name: Nango
url: https://nango.dev
category: direct
relevance: high
checked_on: 2026-10-23
sources:
  - https://nango.dev/
  - https://nango.dev/pricing
  - https://nango.dev/docs/guides/auth/customize-connect-ui
  - https://nango.dev/docs/updates/changelog
---
# Nango

## Observation (checked 2026-10-23)

- **Overlap:** code-first integration infrastructure for SaaS products and AI agents. It offers managed auth, per-user connections, actions, syncs, webhooks and MCP tools.
- **Positioning:** "Integrations for your products & agents" ([nango.dev](https://nango.dev/)).
- **Core promise:** managed auth plus integration functions written in TypeScript (syncs, actions, webhooks), served to agents as tools.
- **Capabilities:**
  - OAuth and API keys, with token refresh
  - an embeddable Connect UI (`@nangohq/frontend`) or headless auth
  - webhook verification
  - logs, metrics and alerts
  - open source, with self-hosting and bring-your-own-cloud (BYOC) on Enterprise
  - recent changelog entries ([changelog](https://nango.dev/docs/updates/changelog)): agent sessions (2026-09-02), Auto Catalog for AI agents (2026-10-13), "Nango for Claude" (2026-10-06), Agent Playground (2026-10-20)
- **Prompt-based setup:** the "Agent-led onboarding" changelog entry (2026-06-01) describes pasting a quickstart prompt into Claude, Cursor or Codex, which then walks you through signup, API key, first connection and first call.
- **Stated limitations:**
  - Connect UI branding, including removing "Secured by Nango", needs the Growth add-on ([docs](https://nango.dev/docs/guides/auth/customize-connect-ui)).
  - No EU-hosted cloud ([pricing](https://nango.dev/pricing)).
  - 10-minute limit per sync run.
  - Connection MCP is being retired on 2026-12-14.
- **Integrations claimed:** "1,000+ APIs", "10,000+ tools" and "1M+ integrations" on the homepage. The changelog marks 1,000+ APIs as reached on 2026-09-14.
- **Pricing** ([pricing](https://nango.dev/pricing), 2026-10-23, volatile):
  - Free: 10 connections.
  - Pay-as-you-go: $50/mo, including $50 of credit, then $0.29 per connection and $0.72 per compute hour.
  - Growth add-on: $450/mo.
  - Enterprise: custom.
- **Proof:**
  - Testimonials: Replit, Vapi, Plain, Motion.
  - 12.9k GitHub stars and "99.9% uptime".
  - The homepage text names no specific compliance badge and links to a trust center.

## Interpretation

- Nango is the closest match on audience and developer motion.
- Prompt-based setup is no longer unique to viaSocket.
- Nango's strengths are open source, self-hosting and integration code the customer owns.
- viaSocket's contrasts are a larger ready catalog (2,300+ against 1,000+), ready actions without writing TypeScript, and pricing that does not charge per connection.

## Uncertainties

- Nango's compliance certifications (behind its trust center, not read).
- Whether the Growth add-on is the only way to get full branding.

## Recommendation (Proposed, needs approval)

- Remove "setup by pasting one prompt" from any list of unique differentiators. Keep it as a feature.
- If viaSocket offers EU or regional hosting (its features page lists "Regional Deployment"), confirm the regions and state them publicly. That would be a factual contrast with Nango's "no EU cloud".
- **Watch:** https://nango.dev/pricing, https://nango.dev/docs/updates/changelog, https://nango.dev/
