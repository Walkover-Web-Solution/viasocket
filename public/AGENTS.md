# viaSocket

> viaSocket is the integration layer for AI agents and the products they build: 2,300+ apps with OAuth and webhooks handled, every AI model, memory for that AI, and a place where products and agents call each other.

Instructions for AI coding agents (Cursor, Claude Code, Codex) integrating viaSocket into a project.

## Set up with a coding agent

Works with Cursor, Claude Code and Codex. The user can paste the setup prompt from the viaSocket homepage, or you can follow these steps:

1. **Install the skill**: Download https://flow.viasocket.com/documentation/skill-install.md exactly and save it as `viasocket-integrations/SKILL.md` wherever the project keeps skills or rules. It is a short pointer that fetches the full, current skill each time it is used. Never work from a saved copy of the full skill.
2. **Configure environment**: Put the user's org id and project id in `.env` as `VIASOCKET_ORG_ID` and `VIASOCKET_PROJECT_ID`.
3. **Authenticate**: If `VIASOCKET_EMBED_SECRET` is not in `.env`, run the setup command from the [setup page](https://flow.viasocket.com/documentation/skill/setup.md). The user clicks Allow in the browser.
4. **Plan before coding**: Ask the user what they want to build. Before any code, show a plan and wait for a yes: which actions, who picks each one, and who supplies every value (your code, the user in a picker, or the product's AI per run).
5. **Verify on real connections**: Test every call on a real connection before building on it, then report each line of the skill's "Finished when" list.

Keep keys and secrets out of browser code, logs and committed files.

## SDK, CLI and API

- **Node.js SDK and CLI**: Make viaSocket calls through the [`viasocket-apps`](https://www.npmjs.com/package/viasocket-apps) npm package ([GitHub](https://github.com/Walkover-Web-Solution/viasocket-apps), `npm install viasocket-apps`). CLI: `npx viasocket-apps` or `npm install -g viasocket-apps`.
- **Python SDK**: Make viaSocket calls through the [`viasocket`](https://pypi.org/project/viasocket/) PyPI package (`pip install viasocket`).
- **Any other backend**: Follow the [HTTP version of the skill](https://flow.viasocket.com/documentation/skill.md?format=http).
- **Products and packages manifest**: [/products.json](/products.json) — machine-readable SDK and CLI package listings.
- **Full skill**: [https://flow.viasocket.com/documentation/skill.md](https://flow.viasocket.com/documentation/skill.md) — the map of every feature, with current URLs, keys and rules. Read it whole; its last line is `END OF PAGE`.
- **Developer documentation**: [https://flow.viasocket.com/documentation](https://flow.viasocket.com/documentation)
