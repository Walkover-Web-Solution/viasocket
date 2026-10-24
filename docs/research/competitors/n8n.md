---
name: n8n
url: https://n8n.io
category: substitute
relevance: medium
checked_on: 2026-10-23
sources:
  - https://n8n.io/
  - https://n8n.io/pricing/
  - https://n8n.io/integrations/
  - https://docs.n8n.io/embed/
  - https://docs.n8n.io/advanced-ai/accessing-n8n-mcp-server/
---
# n8n

## Observation (checked 2026-10-23)

- **Audience:** teams building their own automations and agents.
- **Positioning:** "Build the agent. Understand its workflow." ([n8n.io](https://n8n.io/))
- **OEM embed** ([embed docs](https://docs.n8n.io/embed/)):
  - It puts the n8n editor inside your product.
  - It needs a separate commercial agreement.
  - The docs say n8n branding is required.
  - Credential overwrites let end users use OAuth without ever seeing client secrets.
  - n8n.io/embed/ returned 404.
- **MCP:** an instance-level MCP server ([MCP docs](https://docs.n8n.io/advanced-ai/accessing-n8n-mcp-server/)). The docs say access is not scoped per client.
- **Integrations claimed:** "500+ native integrations" on the homepage against "2,000+" with a counter of "2409 integrations" on [integrations](https://n8n.io/integrations/).
- **Pricing** ([pricing](https://n8n.io/pricing/), 2026-10-23, volatile):
  - Starter: €20/mo billed annually.
  - Pro: €50.
  - Business: €667.
  - Community Edition: free.
  - Embed pricing is not public. Third parties cite about $50K a year (unverified).
- **Proof:** 208.3k GitHub stars and "200k+ community".

## Interpretation

- n8n is a substitute: product teams may self-host it as a hidden integration backend.
- The OEM branding requirement is a factual difference from viaSocket's custom branding.

## Recommendation (Proposed, needs approval)

- The `/migration/n8n` comparison table needs its n8n cells re-sourced and dated.
- **Watch:** https://n8n.io/pricing/, https://docs.n8n.io/embed/
