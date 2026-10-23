---
name: Membrane (formerly Integration.app)
url: https://getmembrane.com
category: direct
relevance: high
checked_on: 2026-10-23
sources:
  - https://getmembrane.com/
  - https://getmembrane.com/pricing
  - https://getmembrane.com/articles/all/membrane-core-start-building-product-integrations-for-free
  - https://docs.getmembrane.com/
  - https://changelog.getmembrane.com/
---
# Membrane (formerly Integration.app)

## Observation (checked 2026-10-23)

- **Rebrand:** integration.app returns a 301 redirect to getmembrane.com. The rename is evidenced by that redirect and a search-result title; the why-membrane page does not mention it.
- **Overlap:** integration infrastructure for products, AI agents and internal tools. It has per-tenant connections (`tenantKey`), actions, and events through webhooks or polling ([docs](https://docs.getmembrane.com/)).
- **Positioning:** "Make your software talk to anything" ([getmembrane.com](https://getmembrane.com/))
- **Core promise:** AI agents research, build, test and repair integrations.
- **Capabilities:**
  - a universal (cross-app) layer that resolves to app-specific integrations
  - Agent Skills, CLI, REST, TypeScript SDK, MCP, embedded UI and a console
  - self-hosting with Docker and Helm
- **Integrations claimed:** "100,000+ integrations" and an "infinite integration catalog" (homepage, 2026-10-23). This appears to rely on connectors generated on demand rather than pre-built ones.
- **Pricing:**
  - The pricing page rendered without prices.
  - A Membrane article dated 2026-01-26 ([article](https://getmembrane.com/articles/all/membrane-core-start-building-product-integrations-for-free)) lists:
    - Core: free, with 20 AI credits and 20,000 action runs a month, then $1 per credit and $1 per 1,000 runs.
    - Business: $3,000/mo plus a capped fee per active customer.
  - Treat these figures as possibly stale.
- **Onboarding:** Agent Skills, MCP and a CLI for coding agents (Claude, ChatGPT, Cursor, Copilot, Lovable).
- **Proof:**
  - Logos: Dialpad, Constant Contact, PandaDoc, Bridgestone, Glide.
  - Badges: SOC 2 Type II, GDPR.

## Interpretation

- Membrane competes on unlimited breadth through AI-generated connectors. It makes viaSocket's "2,300+ apps" look small by raw number.
- viaSocket's credible counter is maintained, ready-to-use connectors. That can only be claimed if viaSocket can show evidence of how it maintains them.

## Uncertainties

- Current prices.
- How reliable generated connectors are (no public data).

## Recommendation (Proposed, needs approval)

- Do not compete on raw app count against this tier. Lead with ready-to-use actions and per-user auth instead.
- **Watch:** https://getmembrane.com/pricing, https://changelog.getmembrane.com/, https://getmembrane.com/
