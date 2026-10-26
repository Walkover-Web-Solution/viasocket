---
title: "How to Handle OAuth for Multi-Tenant SaaS Integrations with viaSocket"
description: "Most SaaS products need dozens of third-party integrations, each with its own OAuth flow, token storage, and per-tenant credential isolation. This guide explains how viaSocket's managed OAuth layer handles all of that, and how to wire it into your backend correctly using JWT and the viasocket-apps SDK."
date: 2026-10-26
author: Abhijeet Singh
category: "Technical Guides"
draft: false
---

Most SaaS products eventually need to integrate with third-party apps — a CRM, a ticketing system, a messaging platform. Each integration means an OAuth flow, token storage, refresh handling, and strict per-tenant isolation. Building all of that yourself takes weeks per integration and creates ongoing maintenance risk.

viaSocket's managed OAuth layer handles authentication for 2,300+ apps. Your backend issues a signed JWT, your frontend renders a connect widget, and viaSocket stores and refreshes tokens on behalf of each user. This guide walks through the architecture, the correct JWT signing pattern, and how to execute actions against connected apps.

## Why Managed OAuth Matters for Multi-Tenant SaaS

In a multi-tenant SaaS product, every user's credentials must be completely isolated. A bug in credential routing — returning User A's Slack token to a request scoped to User B — is a serious security incident.

Building OAuth yourself requires:
- Registering an OAuth app with each provider
- Implementing the authorization code flow per provider
- Storing, encrypting, and rotating refresh tokens
- Handling provider-specific token expiry behaviour
- Ensuring per-tenant isolation throughout

viaSocket's managed OAuth layer moves all of this out of your codebase. You identify each user with a `unique_identifier` — a stable string from your own system — and viaSocket scopes all credential storage and retrieval to that identifier automatically.

## Architecture Overview

The integration layer has three components on your side:

1. **Your backend** — signs a JWT using your `embed_secret` and returns it to your frontend
2. **Your frontend** — initialises the viasocket-apps SDK with that JWT to render the connect UI
3. **Your backend (action execution)** — calls `flow.sokt.io/func/<script_id>` to trigger actions against connected apps

Your `embed_secret` never leaves your server. It is the HS256 signing key — it does not appear in the JWT payload.

## Step 1: Generate the JWT on Your Server

Install the SDK:

    npm install viasocket-apps

Sign a JWT for each user session on your backend:

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

**Critical:** `VIASOCKET_EMBED_SECRET` is the signing key passed as the second argument to `jwt.sign()`. It is not a field inside the payload object. Never include `embed_secret` in the JWT payload, and never send it to the browser.

The three payload fields are:
- `org_id` — your viaSocket organisation ID
- `project_id` — your viaSocket project ID
- `unique_identifier` — your per-user identifier; viaSocket uses this to scope all credential storage

## Step 2: Initialise the SDK on the Frontend

Return the signed token to your frontend via a protected API endpoint, then initialise the SDK:

    import { viasocket } from 'viasocket-apps';

    const token = await fetch('/api/embed-token').then(r => r.text());
    await viasocket.init({ token });

Once initialised, you can use the SDK to manage connections for the current user.

## Step 3: Manage User Connections

The SDK provides a set of methods for the full connection lifecycle:

    // Open the connect UI for a specific app
    await viasocket.connect({ app: 'slack' });

    // List all apps the user has enabled
    const enabled = await viasocket.user.findEnabled();

    // Check available connection options for an app
    const options = await viasocket.user.listOptions({ app: 'hubspot' });

    // Enable a specific connection
    await viasocket.user.enable({ app: 'notion', connection_id: '...' });

    // Get a short-lived token for the current user
    const userToken = await viasocket.user.token();

Each call is automatically scoped to the `unique_identifier` from the JWT. There is no way for one user's session to access another user's connections through the SDK.

## Step 4: Execute Actions Against Connected Apps

Once a user has connected an app, your backend can execute actions using the `flow.sokt.io` endpoint:

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
            text: 'Integration connected successfully.'
          }
        })
      }
    );

**Important:** There is no `Authorization` header on this request. The `script_id` in the URL is itself the credential — it identifies which workflow to run and authorises the call. Keep your `script_id` values in environment variables and do not expose them to the browser.

## Per-Tenant Isolation: How It Works

Every credential viaSocket stores is keyed to the combination of your `org_id`, `project_id`, and `unique_identifier`. When your backend calls `flow.sokt.io/func/<script_id>` with a given `unique_identifier`, viaSocket retrieves only the tokens associated with that identifier.

This means:
- Two users who have both connected Slack get separate, isolated token records
- A call scoped to User A cannot retrieve User B's tokens
- Revoking a connection for one user does not affect any other user

Your responsibility is to ensure the `unique_identifier` you embed in the JWT is stable and maps one-to-one to your own user records. A good choice is your internal user ID or a hashed version of it. Do not use email addresses if they can change.

## Security Checklist

Before going to production:

- `embed_secret` is stored in an environment variable, never in source code
- `embed_secret` is used only as the JWT signing key — it does not appear in the payload
- JWT generation happens on your server, never in browser-side code
- `script_id` values are stored in environment variables
- No `Authorization` header is added to `flow.sokt.io` action calls
- `unique_identifier` values are stable and map one-to-one to your user records
- JWT expiry is set to a short window (1 hour or less) and refreshed via your backend

## What viaSocket Handles for You

Once a user connects an app through the SDK:
- Token storage and encryption
- Refresh token rotation on expiry
- Provider-specific OAuth edge cases
- Re-authentication prompts when a token is revoked

You do not need to implement any of this per-integration. The same pattern works across all 2,300+ supported apps.

## Next Steps

- [Embed an integration picker in your SaaS UI](/blog/multi-tenant-integration-architecture)
- [Add AI agent tool-calling to your product](/embed/actions-for-ai)
- [Browse the full developer documentation](/developers/docs)

The steps for adding this managed OAuth layer to a product are in [How to Handle OAuth for Multi-Tenant SaaS Integrations](/blogs/how-to-add-managed-oauth-for-third-party-apps).

When an AI agent acts on a user's connected apps after that authorisation, see [How to Handle OAuth for Multi-Tenant SaaS Integrations](/blogs/oauth-for-ai-agents).
