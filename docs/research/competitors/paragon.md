---
name: Paragon (incl. ActionKit)
url: https://www.useparagon.com
category: direct
relevance: high
checked_on: 2026-10-23
sources:
  - https://www.useparagon.com/
  - https://www.useparagon.com/pricing
  - https://www.useparagon.com/actionkit
  - https://www.useparagon.com/product/actionkit
  - https://www.useparagon.com/integrations
  - https://docs.useparagon.com/
  - https://docs.useparagon.com/changelog/product-updates
---
# Paragon (incl. ActionKit)

## Observation (checked 2026-10-23)

- **Overlap:** integration infrastructure for AI agents and SaaS products. The embedded Connect Portal handles auth for each of your end users.
- **Positioning:** "Connect your agent to customer data and tools." ([useparagon.com](https://www.useparagon.com/))
- **Core promise:** Paragon maintains integrations (auth, sync, permissions, provider API changes) so your team keeps only the product logic.
- **Capabilities** ([docs](https://docs.useparagon.com/), [actionkit](https://www.useparagon.com/actionkit)):
  - managed auth through the embedded Connect Portal, or a headless SDK
  - ActionKit, "One API/MCP": agents fetch the action list at runtime and call actions as tools
  - Managed Sync and Workflows
  - a Triggers API (changelog)
  - custom connectors from any API
  - event logs that can be forwarded to your own logging
  - US or EU cloud, on-prem in your VPC, or deployment into your customer's cloud
- **Integrations claimed (conflicting):**
  - "1000+ integration actions" ([/actionkit](https://www.useparagon.com/actionkit))
  - "300+ integration actions" ([/product/actionkit](https://www.useparagon.com/product/actionkit))
  - "130+ integrations" for the MCP server (changelog, April 2025)
  - The /integrations page gives no count; it has about 121 links.
- **Pricing** ([pricing](https://www.useparagon.com/pricing), 2026-10-23): no prices are published.
  - Platform plan: self-serve "Start building".
  - Enterprise: sales-only.
  - Billing is by Connected Users, custom quote.
  - The homepage says "Start for free", but no free tier is listed.
- **Onboarding:**
  - An SDK.
  - A "Paragon Skill" for coding agents (docs), which is close to viaSocket's prompt setup.
  - Demo booking.
- **Proof:**
  - Testimonials: CrewAI, You.com, Copy.ai, Appsmith, tl;dv.
  - Footer badges: SOC 2 Type II, ISO 27001, GDPR, HIPAA. The changelog says HIPAA applies to self-hosted installs.

## Interpretation

- Paragon is the closest match on the agent-tools-plus-embedded-auth story.
- Its strengths are compliance breadth, self-host and on-prem options, and Managed Sync.
- viaSocket's contrasts are a public self-serve price and a larger stated app catalog.

## Uncertainties

- The three conflicting action counts.
- Free-trial terms.
- Only about half of the changelog was read; its newest entry seen was April 2026.

## Recommendation (Proposed, needs approval)

- The existing site tables (`src/app/embed/app-integration/ComparisonTable.js`, `src/app/embed/actions-for-ai/AIComparisonTable.js`) state "130+ apps", "~500 toolkits" and "Sales call required" for Paragon with no source or date. Re-source these values or remove them, and get approval before republishing.
- **Watch:** https://www.useparagon.com/pricing, https://docs.useparagon.com/changelog/product-updates, https://www.useparagon.com/product/actionkit
