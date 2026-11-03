---
title: "How to Add Managed OAuth for Third-Party Apps to Your Product"
description: "Learn how to add managed OAuth for third-party apps to your SaaS product using viaSocket's managed auth layer — JWT signing, SDK setup, per-user credential isolation, and action execution across 2,300+ apps."
date: 2026-10-26
author: Abhijeet Singh
category: "Technical Guides"
draft: false
---

You add managed OAuth for third-party apps by signing a JWT on your backend and passing it to a managed auth SDK that handles every OAuth flow, token storage, and refresh on behalf of each user. viaSocket's managed auth layer covers 2,300+ apps with this model, so your team never builds or maintains individual OAuth clients.

## What "managed OAuth" actually means

Managed OAuth means a third-party service owns the OAuth infrastructure while your product owns the user experience. You do not register OAuth apps with each provider, implement authorization code flows, store refresh tokens, or handle provider-specific token expiry behaviour. The managed layer does all of that. Your code contributes one thing: a stable identifier for each of your users so the managed layer can scope credentials correctly.

This is distinct from Auth0, Clerk, or similar identity tools. Those handle how your users log in to your product. Managed OAuth for third-party apps handles how your users' accounts at Slack, HubSpot, Salesforce, Notion, Stripe, and thousands of other services connect to your product after they are already logged in.

## Why building OAuth yourself is the wrong default

Most teams discover the cost of DIY OAuth integration after the first three or four connectors. The initial implementation is tractable. The maintenance burden is not.

Each OAuth provider has different token lifetimes, refresh behaviour, and scope models. Google tokens expire in one hour and can be revoked silently. Slack tokens last indefinitely but can be invalidated by workspace admins. Each provider's error codes for expired or revoked tokens are different. In a multi-tenant product, you also need per-user credential isolation: User A's Slack token must never be retrievable in a request scoped to User B.

Building that yourself requires encrypted token storage, per-user keying, per-provider refresh logic, re-authentication prompts when tokens are revoked, and ongoing updates each time a provider changes its OAuth endpoints or scope requirements. A managed OAuth layer moves all of this off your roadmap.

## The four steps to add managed OAuth with viaSocket

viaSocket's managed auth is built around a JWT signing pattern. Your backend signs the token; viaSocket scopes everything to the identifier inside it.

### Step 1: Install the SDK

    npm install viasocket-apps

The SDK is MIT-licensed, has zero dependencies, and supports Node 20+, Bun, Deno, and edge runtimes.

### Step 2: Sign a JWT on your server

    import jwt from 'jsonwebtoken';

    function generateEmbedToken(userId) {
      const payload = {
        org_id: process.env.VIASOCKET_ORG_ID,
        project_id: process.env.VIASOCKET_PROJECT_ID,
        unique_identifier: userId
      };
      return jwt.sign(payload, process.env.VIASOCKET_EMBED_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1h'
      });
    }

Three things to get right here:

- `VIASOCKET_EMBED_SECRET` is the HS256 signing key passed as the second argument to `jwt.sign()`. It is not a field in the payload. Never put it in the payload and never send it to the browser.
- `unique_identifier` is your per-user stable ID. Use your internal user ID or tenant ID. Do not use email addresses, which can change.
- Sign on the server only. Return the token to the frontend via a protected API endpoint.

### Step 3: Initialise the SDK on the frontend

    import { viasocket } from 'viasocket-apps';

    const token = await fetch('/api/embed-token').then(r => r.text());
    await viasocket.init({ token });

Once initialised, the SDK renders a connect UI scoped to that user. Your users click to connect any of the 2,300+ supported apps, complete the OAuth flow inside viaSocket's hosted flow, and their token is stored under their `unique_identifier`.

### Step 4: Execute actions against connected apps

After a user connects an app, your backend can act on their behalf without touching a token directly:

    const response = await fetch(
      `https://flow.sokt.io/func/${process.env.VIASOCKET_SCRIPT_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unique_identifier: userId,
          app: 'slack',
          action: 'send_message',
          params: {
            channel: '#general',
            text: 'Your export is ready.'
          }
        })
      }
    );

No `Authorization` header. The `script_id` in the URL is the credential that identifies which workflow to run. Keep `script_id` values in environment variables.

## What viaSocket handles after setup

Once a user connects an app through the flow above, viaSocket manages:

- Token storage and encryption at rest
- Refresh token rotation on expiry
- Provider-specific OAuth edge cases
- Re-authentication prompts when a token is revoked by the provider

The same pattern works across all 2,300+ supported apps. You do not write any provider-specific code.

## How this compares to building it yourself

The managed OAuth approach trades implementation control for speed and maintenance relief. A few tradeoffs to understand before choosing it:

**Vendor dependency.** Your credential storage is on viaSocket's infrastructure. Evaluate the security posture (SOC 2 Type II, ISO 27001:2022, AES-256 at rest, TLS 1.2+ in transit) and the SLA (99.99% uptime) before committing for production workloads.

**App coverage vs. custom connectors.** 2,300+ apps covers the long tail for most SaaS products. For apps not in the catalog, viaSocket provides a Plug Builder path to add custom connectors without rebuilding the auth infrastructure.

**Pricing model.** viaSocket charges per task (integration action executed) and per active user on the embed tiers. The embed Sandbox tier is free for up to 25 active users and 25,000 tasks per month. Production is $249/month for 1,000 active users and 1M tasks. Overage is $1/user and $1/2,500 tasks.

**Alternatives.** Nango, Pipedream Connect, Paragon, and Merge take similar approaches with different catalog sizes, pricing structures, and target audiences. The architecture pattern (backend JWT signing, managed token storage, per-user scoping) is consistent across all of them. The differentiators are app coverage, pricing transparency, embed options, and AI agent support.

## Multi-tenant credential isolation

In a multi-tenant SaaS product, the `unique_identifier` field is the isolation boundary. Every credential viaSocket stores is keyed to your `org_id`, `project_id`, and `unique_identifier` together. A request with User A's identifier cannot retrieve User B's tokens. This is enforced at the storage layer, not just at the application layer.

Your responsibility is correct identifier routing on your backend. The identifier in the JWT you sign must match the authenticated user in that session. A backend bug that signs a JWT with the wrong identifier is the only way cross-tenant credential access can occur.

## Security checklist before going to production

- `embed_secret` is in an environment variable, not in source code
- `embed_secret` is the JWT signing key only, not a payload field
- JWT signing happens on your server, never in browser code
- `script_id` values are in environment variables
- JWT expiry is set to one hour or less
- `unique_identifier` maps one-to-one to your user records and is immutable
- No OAuth tokens are cached in your own database (let viaSocket own storage)

## FAQ

### Do I need to register OAuth apps with each provider?

No. With managed OAuth, viaSocket maintains the OAuth app registrations with each provider. Your users authorise through those registrations. You do not interact with any provider's developer console for the apps in the catalog.

### What happens when a user's token expires?

viaSocket handles refresh token rotation automatically. If a provider revokes a token and refresh is not possible, the platform surfaces a re-authentication event. You can handle this in your frontend by checking connection status and prompting the user to reconnect.

### Can I add apps that are not in the 2,300+ catalog?

Yes. viaSocket's Plug Builder lets you define a custom connector for any app with an API. The custom connector uses the same managed OAuth infrastructure as the built-in catalog, so you do not rebuild token storage or refresh logic.

### Is this the same as using Auth0 or Clerk for OAuth?

No. Auth0, Clerk, and similar tools handle how your users authenticate to your product (login). Managed OAuth for third-party apps handles how your users' accounts at external services (Slack, HubSpot, Stripe) connect to your product after login. They solve different problems and are typically used together.

### How do I handle a user who wants to connect multiple accounts from the same app?

viaSocket's managed auth supports multi-account connections per user per app. The connection management UI lets users connect more than one account (for example, two different Slack workspaces), and the action execution layer lets you reference a specific connection by connection ID.
