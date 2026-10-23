---
name: Pipedream Connect
url: https://pipedream.com/connect
category: direct
relevance: high
checked_on: 2026-10-23
sources:
  - https://pipedream.com/connect
  - https://pipedream.com/pricing
  - https://pipedream.com/docs/connect
  - https://pipedream.com/docs/connect/mcp/tool-modes
  - https://pipedream.com/docs/workflows
---
# Pipedream Connect

## Observation (checked 2026-10-23)

- **Overlap:** managed auth for your end users, keyed by `external_user_id`, plus actions, triggers, an API proxy, MCP and SDKs, for both apps and agents ([docs](https://pipedream.com/docs/connect)).
- **Positioning:** "The integration layer for AI agents" ([connect](https://pipedream.com/connect)). This is almost the same as viaSocket's framing.
- **Core promise:** Pipedream handles OAuth, token storage and refresh so your agent or app can act on users' accounts.
- **Capabilities:**
  - hosted or bring-your-own OAuth clients
  - a remote MCP server; the v3 endpoint is tools-only from 2026-04-15 ([tool modes](https://pipedream.com/docs/connect/mcp/tool-modes))
  - triggers that deliver events to a webhook URL
  - a hosted Connect Link and an embeddable browser SDK
  - open-source components, an API proxy for any endpoint, and no storage of request or response payloads ([docs](https://pipedream.com/docs/connect))
  - monitoring beyond a status page: not found on public pages
- **Stated limitations:**
  - The free tier is development only.
  - Pipedream Workflows and String shut down on 2027-03-31, with data deleted by 2027-04-30 and no new signups. Connect, MCP and the proxy are unaffected ([workflows docs](https://pipedream.com/docs/workflows)).
- **Integrations claimed:** "10,000+ tools across 3,000+ APIs", "More than 3,000 connectors" and "1M+ accounts connected" ([connect](https://pipedream.com/connect), 2026-10-23).
- **Pricing** ([pricing](https://pipedream.com/pricing), 2026-10-23, volatile):
  - Free: development only.
  - Startup: $99/mo billed annually or $150 monthly. The page rendered garbled, so treat these figures as approximate. Includes 100 external users, then $2 per user per month, and 10K credits, then $0.012 per credit.
  - Business: custom (SSO, HIPAA, static IPs).
- **Onboarding:** SDKs (`@pipedream/sdk`; Python and Java per the changelog in search results) and an llms.txt docs index. Prompt-based setup was not found on public pages.
- **Proof:**
  - Logos: Perplexity, Lindy, Relevance AI, Apollo.io, Alibaba, Workday.
  - Badges: SOC 2 Type 2, GDPR, HIPAA.
  - A Lindy testimonial says it went from about 250 self-built integrations to 2,500 with Pipedream ([connect](https://pipedream.com/connect)).
- **Ownership:** Workday agreed to acquire Pipedream (announced November 2025). The close is reported in a Workday 8-K and in press, seen in search results only. The acquisition is not mentioned on pipedream.com.

## Interpretation

- Pipedream Connect is the most direct competitor on message, and it has a larger API count than viaSocket (3,000+ against 2,300+).
- Its pricing charges per external user. viaSocket's pricing page says it does not bill for connected accounts or users.
- The Workflows shutdown may push some no-code Pipedream users to look for alternatives.

## Uncertainties

- The exact Startup price, because the page was garbled.
- What the Workday ownership means for the roadmap.
- Monitoring features (not found on public pages).

## Recommendation (Proposed, needs approval)

- Do not use "the integration layer for AI agents" as a standalone viaSocket line, because it collides with Pipedream's hero.
- Consider "no per-end-user fees" as a factual pricing contrast, stated only about viaSocket's own pricing and without naming Pipedream.
- Any migration content aimed at former Pipedream Workflows users needs owner approval.
- **Watch:** https://pipedream.com/pricing, https://pipedream.com/docs/changelog, https://pipedream.com/docs/workflows, https://pipedream.com/connect
