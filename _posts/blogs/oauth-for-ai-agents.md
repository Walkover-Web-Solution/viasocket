---
title: "How to Handle OAuth for an AI Agent Acting on a User's Apps"
description: "An AI agent acting on a user's apps needs managed OAuth that stores credentials per user and scopes every action to the right tokens. This guide covers the correct architecture, implementation steps with viaSocket, and how to handle re-authorisation when tokens expire."
date: 2026-10-26
author: Abhijeet Singh
category: "Technical Guides"
draft: false
---

An AI agent acting on a user's apps needs a managed OAuth layer that stores the user's credentials, scopes every action to that user's tokens, and never mixes one user's credentials with another's. viaSocket's managed auth and Actions for AI embed product handle this across 2,300+ apps, so your agent calls a single endpoint rather than implementing OAuth per app.

## Why OAuth for AI agents is different from OAuth for humans

When a human authorises an OAuth flow, they are present in the browser and can complete a redirect. An AI agent runs server-side and cannot complete a browser-based OAuth flow on its own. The agent needs the user to authorise access upfront, with credentials stored and retrievable so the agent can act on the user's behalf later, potentially long after the original authorisation.

This creates two distinct phases:

1. **Authorisation phase** — the user (a human) connects their apps through a UI. This is a standard OAuth flow that must happen in a browser.
2. **Action phase** — the agent acts on the user's behalf using the stored credentials. This is a server-side API call, no browser involved.

Conflating these two phases is the most common architecture mistake in agent OAuth implementations. The agent cannot do phase 1. A managed OAuth layer handles phase 1 for you, so your agent only needs to handle phase 2.

## The right architecture for agent OAuth

The correct pattern has four components:

1. **Your backend** — signs a per-user JWT to identify which user's credentials to use
2. **A connect UI in your product** — lets the user authorise their apps before the agent runs (phase 1)
3. **Stored credentials** — managed by the OAuth layer, scoped to the user's identifier
4. **Your agent's action calls** — server-side requests that reference the user's identifier to retrieve the right credentials (phase 2)

The agent never touches credentials directly. It calls an endpoint with a user identifier, and the managed layer resolves which tokens to use.

## Setting up user authorisation with viaSocket

Before your agent can act on a user's apps, the user connects those apps through a UI you embed in your product. viaSocket's managed auth SDK handles the OAuth flows.

On your backend, sign a JWT per user:

    import jwt from 'jsonwebtoken';

    function getAgentToken(userId) {
      return jwt.sign(
        {
          org_id: process.env.VIASOCKET_ORG_ID,
          project_id: process.env.VIASOCKET_PROJECT_ID,
          unique_identifier: userId
        },
        process.env.VIASOCKET_EMBED_SECRET,
        { algorithm: 'HS256', expiresIn: '1h' }
      );
    }

`unique_identifier` is your stable per-user ID. It scopes all credential storage for this user. The `embed_secret` is the HS256 signing key passed as the second argument — it is not in the payload and never leaves your server.

On your frontend, initialise the SDK with that token:

    import { viasocket } from 'viasocket-apps';

    const token = await fetch('/api/agent-token').then(r => r.text());
    await viasocket.init({ token });

    // Let the user connect their apps
    await viasocket.connect({ app: 'gmail' });
    await viasocket.connect({ app: 'notion' });

The user completes each OAuth flow in the viaSocket-hosted flow. Their tokens are stored under their `unique_identifier`.

## How the agent executes actions

Once the user has connected their apps, your agent acts on their behalf by calling viaSocket's action execution endpoint with the user's identifier:

    async function agentSendEmail(userId, recipient, subject, body) {
      const response = await fetch(
        `https://flow.sokt.io/func/${process.env.VIASOCKET_SCRIPT_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            unique_identifier: userId,
            app: 'gmail',
            action: 'send_email',
            params: { to: recipient, subject, body }
          })
        }
      );
      return response.json();
    }

The agent supplies the `unique_identifier` for the user it is acting on behalf of. viaSocket retrieves that user's Gmail credentials and executes the action. The agent never sees the OAuth token.

This pattern scales to any of the 2,300+ apps in the catalog. The same code structure works whether the agent is sending an email, creating a Notion page, updating a HubSpot contact, or posting to Slack.

## Scoping agent permissions correctly

An AI agent acting on a user's apps should only have access to the apps that user has explicitly connected, and only the actions appropriate for your agent's scope. Two properties matter here.

**Per-user scoping.** The `unique_identifier` in the action call is the isolation boundary. Credentials stored for User A cannot be retrieved in a call that uses User B's identifier. If your agent handles multiple users, it must pass the correct identifier for each action. A routing bug here is a security incident.

**App and action scoping.** Before your agent attempts an action, verify the user has connected the relevant app:

    const enabled = await viasocket.user.findEnabled();
    const hasGmail = enabled.some(app => app.name === 'gmail');

    if (!hasGmail) {
      return 'User has not connected Gmail. Ask them to connect it in settings.';
    }

This prevents your agent from attempting actions on unconnected apps and gives you a clean path to prompt the user to connect what is needed.

## Handling re-authorisation

OAuth tokens expire and get revoked. When a user's token for a connected app is no longer valid, the managed layer surfaces this as a connection status change. Your agent should handle action failures that indicate a broken connection by surfacing a re-authorisation prompt to the user rather than retrying indefinitely.

A pattern that works: catch action failures from viaSocket, check connection status with `viasocket.user.findEnabled()`, and if the app is no longer showing as connected, return a message to the user asking them to reconnect. The agent cannot re-authorise on the user's behalf — that browser-based flow must involve the user.

## Multi-agent and multi-tenant patterns

If your product runs agents for multiple users simultaneously, each agent action must carry the correct `unique_identifier` for the user it is acting on. There is no shared credential pool. Two users who have both connected Slack each have separate, isolated token records.

In an agentic product with multiple agent types (a scheduling agent, a communications agent, a data agent), all agents acting on behalf of the same user can share the same `unique_identifier`. The scoping is per-user, not per-agent.

## viaSocket's Actions for AI embed product

viaSocket's [Actions for AI](/embed/actions-for-ai) product is built specifically for the agent use case. It exposes 2,300+ app actions as a tool-calling endpoint. Rather than calling individual app APIs, your agent calls a single endpoint and specifies which app and action it needs. The managed auth layer resolves the user's credentials.

This is distinct from viaSocket's [white-label MCP server](/mcp/saas), which is for giving users a branded MCP endpoint they configure in their AI client (Claude, Cursor). Actions for AI is for your agent making server-side calls. Both can be used in the same product.

Adding managed OAuth for the third-party apps an agent will call is covered in [How to Handle OAuth for an AI Agent Acting on a User's Apps](/blogs/how-to-add-managed-oauth-for-third-party-apps).

## FAQ

### Can my AI agent complete the OAuth flow on behalf of the user?

No. OAuth authorisation flows are browser-based and require user interaction. Your agent cannot complete them. The user must connect their apps through a UI before the agent can act on those apps. Build a connect-your-apps step into your product's onboarding or settings.

### What if the user has not connected an app the agent needs?

Check connection status before the agent attempts an action. If the app is not connected, surface a prompt asking the user to connect it. Do not attempt the action without a valid connection.

### How do I prevent one user's agent from accessing another user's apps?

Use a unique, stable `unique_identifier` per user in every JWT and action call. viaSocket's managed auth layer scopes all credential storage and retrieval to this identifier at the storage level. As long as your backend routes the correct identifier per user session, cross-user access is not possible.

### Does this work with LLM tool-calling frameworks like LangChain or LlamaIndex?

Yes. The action execution is a standard HTTP POST. You can wrap it as a tool in any framework that supports custom tool definitions. Define a tool that calls `flow.sokt.io/func/<script_id>` with the appropriate parameters and your agent framework can invoke it like any other tool.

### Does viaSocket's managed auth work for agents running on behalf of a user without the user being present?

Yes. Once the user has authorised their apps, the stored credentials are available for your agent to use in background tasks, scheduled runs, or triggered workflows. The user does not need to be active in a session for the agent to act.
