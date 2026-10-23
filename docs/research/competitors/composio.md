---
name: Composio
url: https://composio.dev
category: direct
relevance: high
checked_on: 2026-10-23
sources:
  - https://composio.dev
  - https://composio.dev/pricing
  - https://composio.dev/toolkits
  - https://docs.composio.dev
  - https://docs.composio.dev/docs/auth-configuration/white-labeling
  - https://composio.dev/blog
  - https://composio.dev/blog/composio-may-2026-security-incident
---
# Composio

## Observation (checked 2026-10-23)

- **Overlap:** developers giving AI agents and products per-user access to third-party apps. Connections are scoped per user ID, auth is managed, and each session gets a hosted MCP URL ([docs](https://docs.composio.dev)). The homepage now leads with non-developers connecting ChatGPT, Claude or Cursor, with developers second ([composio.dev](https://composio.dev)).
- **Positioning:** "Give your AI secure access to 1,500+ apps in minutes." ([composio.dev](https://composio.dev))
- **Core promise:** secure app access for any AI, where the model never sees tokens.
- **Capabilities:**
  - managed OAuth with encrypted tokens
  - per-user connected accounts, with several accounts per app
  - a hosted MCP URL per session
  - triggers and webhooks: trigger events are priced, and a webhook-triggers post is dated 2026-09-17 ([blog](https://composio.dev/blog))
  - a rebrandable hosted Connect Link
  - per-action approval and action logs
  - Python and TypeScript SDKs, a CLI, and Claude Code and Codex plugins
  - newer additions "Composio Instant" (paid tools billed per call) and "Composio Firewall" (2026-10-21) ([blog](https://composio.dev/blog))
- **Stated limitations** ([white-labeling docs](https://docs.composio.dev/docs/auth-configuration/white-labeling)):
  - one brand and theme per project
  - the OAuth consent screen shows Composio unless you bring your own OAuth app
  - the redirect goes through backend.composio.dev unless you proxy it
  - switching to your own OAuth app means existing users must reconnect
  - the Connect page is in three languages only
  - the free plan pauses at its cap
- **Polling:** the default trigger polling interval rose to 15 minutes from 2026-04-15. Source: changelog, seen in search results only, not fetched.
- **Integrations claimed:** "1,500+ apps" on the homepage, 1,633 toolkits listed, and "20,000+ tools" in the catalog meta description ([toolkits](https://composio.dev/toolkits)). Checked 2026-10-23.
- **Pricing** ([pricing](https://composio.dev/pricing), 2026-10-23, volatile):
  - Hobby: $0, with 100K tool calls, 50K trigger events and unlimited connected accounts.
  - Pro: $29/mo, including $29 of usage credit. Overage is $0.0003 per call and $0.003 per trigger event.
  - Advanced white-labeling: $0.30 per connection on Pro.
  - Enterprise: custom (SSO/SCIM, customer-managed keys, BAA).
- **Onboarding:** self-serve. SDK, CLI, plugins for coding assistants, and llms.txt.
- **Proof:**
  - SOC 2 Type II and a Trust Center ([composio.dev](https://composio.dev)).
  - No named customer logos on the homepage.
  - Series A blog post dated 2025-07-22. Its title says $29M and its excerpt says $25M.
- **Security incident:**
  - In May 2026 an attacker got in through an internal monitoring tool.
  - About 0.3% of active connections leaked, including 5,001 GitHub connections. 5,241 API keys were flagged as possibly exposed.
  - Remediation: tokens are no longer returned by the API, API keys are stored only as hashes, and customers get scoped keys and IP allowlists.
  - Bulletin last updated 2026-09-16 ([incident page](https://composio.dev/blog/composio-may-2026-security-incident)).

## Interpretation

- Composio is the closest feature match for agent builders and has the cheapest paid entry point among direct competitors.
- Its catalog claim (1,500+) is below viaSocket's 2,300+, but Composio counts tools as well as apps (20,000+).
- The incident is public, documented by Composio itself, and remediated. It is not grounds for attack copy.

## Uncertainties

- The two Composio-managed-app call rates on the pricing page conflict ($0.0005 per call against "$0.0002 on top").
- A custom-connector builder was not found on public pages. Missing evidence does not prove it is absent.

## Recommendation (Proposed, needs marketing owner approval)

- Do not reference the incident in viaSocket copy. Instead, publish viaSocket's own credential-handling facts (encryption, token refresh, whether tokens are ever returned by the API), once engineering confirms them.
- Before any "white-label consent screen" claim, confirm what app name viaSocket's own OAuth consent screen shows.
- **Watch:** https://composio.dev/pricing, https://composio.dev/blog, https://docs.composio.dev/reference/changelog
