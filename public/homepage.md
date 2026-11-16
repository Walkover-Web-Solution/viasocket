# viaSocket

> Integration layer for your AI agent, CRM, support desk or recruiting app. You build the app or agent. viaSocket handles the connections and actions.

- Apps: 2,300+
- Setup: paste one prompt into Cursor, Claude Code or Codex
- Start free: https://flow.viasocket.com/integrations

## Setup prompt

Install the viaSocket skill. Download this file exactly and save it as viasocket-integrations/SKILL.md wherever this project keeps skills or rules:
https://flow.viasocket.com/documentation/skill-install.md

It is short on purpose: it fetches the full, current skill each time it is used. Do what it says.
My viaSocket org_id is <your org_id> and project_id is <your project_id>: put them in .env as VIASOCKET_ORG_ID and VIASOCKET_PROJECT_ID.
If VIASOCKET_EMBED_SECRET is not in .env, run the setup command from the skill's setup page; I will click Allow in the browser.
If my backend is Node.js, make every viaSocket call through the viasocket-apps npm package (`npm install viasocket-apps`); its types are its documentation. If it is Python, use the viasocket PyPI package (`pip install viasocket`). If it is not, follow https://flow.viasocket.com/documentation/skill.md?format=http instead.
Build it complete for my use case. Before any code, show me your plan and wait for my yes: which actions, who picks each one, and for every value who supplies it (my code, my user in a picker once after connecting or per run, or my product's AI per run). Test every call on a real connection before you build on it, then report each line of the skill's "Finished when" list.

Ask me what I want to build first.
When it works, show me what changed and what I can add next.

## What viaSocket handles

- **Managed auth**: One OAuth popup on the app's own consent screen. Tokens encrypted and refreshed.
- **Managed mapping**: Different APIs and data formats, handled.
- **Multi-tenant**: Multiple users, each with their own connections.
- **Customizable UI & branding**: Use the prebuilt connect flow or build your own, with your logo, colours and domain.
- **Monitoring**: Debug and manage every action.
- **Triggers & webhooks**: Subscribe to webhooks and events. Polling and retries are handled.
- **Server localization**: Support customers across regions.
- **Real-time latency**: Actions run in real time, when your app or agent needs them.
- **Slack support**: Direct help on Slack when you need it.

## Security and compliance

Your data, under the same controls you would ask for.

- **SOC 2 Type II** (Audit): Audited by an independent firm on how your data is handled, stored and reached.
- **ISO 27001:2022** (Certification): Certified against the international standard for managing information security.
- **GDPR and CCPA** (Privacy): Your data stays yours, exportable and deletable on request.

Security details: /help/security-and-compliance

## Video

https://www.youtube.com/watch?v=GRzkVjW839A

## FAQ

### What is an integration layer?

An integration layer is the part of your product that talks to other apps for you. Your code makes one kind of call, and the layer deals with each app's API, sign-in and events. viaSocket is an integration layer for SaaS products and AI agents, with 2,300+ apps behind it.

### How is viaSocket different from a unified API or an embedded iPaaS?

A unified API maps one category of apps, like all CRMs, onto a shared data model. viaSocket keeps every app's full set of actions and handles the mapping between their different APIs and data formats. That's how it reaches 2,300+ apps, with one way to call them, connect users and get their events. Its prebuilt screens cover what an embedded iPaaS does.

### How do I add integrations to my app with viaSocket?

Copy the setup prompt and paste it into Cursor, Claude Code or Codex inside your project. Your coding agent downloads the viaSocket skill, asks for your org ID, project ID and secret (they go in .env only), then builds the connect flow and the actions your use case needs. It finishes with a real test call.

### Do I need OAuth apps, client IDs or a token database?

No. viaSocket stores each user's grant and refreshes it, so you don't register OAuth apps, hold client secrets or write refresh logic. Your database keeps only a connection id.

### How do my users connect their own accounts?

They click Connect and the app's own consent screen opens in a popup, Google's or Slack's for example. They approve it there, so your code never sees a password. You get back a connection id to store against that user.

### Can my AI agent use these integrations as tools?

Yes. Every action comes with an input schema, so your agent can call it as a tool and fill in the fields on each run. You decide which actions it can use, or let each user choose. If you want a chat assistant in your own UI, viaSocket has one built in.

### How do I react to events in my users' apps?

Subscribe to the event, a new Stripe payment or a new Gmail message for example, and attach a short JavaScript handler. The handler runs in its own sandbox and can call your API, so you don't need a public webhook endpoint. Polling and retries are handled for you.

### What if the app I need isn't in the catalog?

Build it once as a custom connector in viaSocket's Plug Builder. From then on it works like any other app. You can also request an integration from the viaSocket team.

### Can I embed viaSocket's integration screens in my product?

Yes. Mount the prebuilt screens with one component and show the whole catalog, a single app, one action's form or a saved flow. Set the labels and theme so it looks like your product.

## Links

- Integrations: /integrations
- Features: /features
- Use cases: /use-cases
- Developers: /developers
- Pricing: /pricing
- Node.js SDK & CLI (npm): https://www.npmjs.com/package/viasocket-apps
- Python SDK (PyPI): https://pypi.org/project/viasocket/
- Products and packages manifest: /products.json
- LLM site overview: /llms.txt
- Coding agent instructions: /AGENTS.md
