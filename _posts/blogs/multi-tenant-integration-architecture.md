---
title: "Multi-Tenant Integration Architecture: How to Build SaaS Integrations That Scale"
description: "Building integrations into a multi-tenant SaaS product requires credential isolation, per-user routing, and a connection lifecycle that scales with your user base. This guide covers the architecture patterns that keep one tenant's data separate from another's, using viaSocket's Integration Layer as the implementation reference."
date: 2026-10-26
author: Abhijeet Singh
category: "Technical Guides"
draft: false
---

Adding integrations to a multi-tenant SaaS product is not the same as adding integrations to a single-user tool. When thousands of tenants each connect their own Slack, HubSpot, or Stripe account, the architecture has to guarantee that one tenant's credentials and data can never reach another tenant's session — at any layer.

This guide covers the core architectural patterns for multi-tenant integrations: credential isolation, per-user connection routing, connection lifecycle management, and scaling considerations. The implementation examples use viaSocket's Integration Layer, which handles OAuth and token storage across 2,300+ apps.

## The Multi-Tenant Integration Problem

A single-tenant integration is straightforward: one set of credentials, one OAuth token, one API client. A multi-tenant integration multiplies every concern:

- **Credential isolation**: Each tenant's OAuth tokens must be stored and retrieved independently. A lookup error that returns the wrong tenant's token is a data breach.
- **Connection state**: Each tenant has their own set of connected apps, which can be connected, disconnected, or re-authenticated independently.
- **Routing**: When your backend triggers an action (send a Slack message, create a HubSpot contact), the action must use the correct tenant's credentials, not a shared pool.
- **Scale**: Token refresh, re-authentication prompts, and connection health checks must work reliably across thousands of tenants simultaneously.

Building all of this from scratch — per integration, per provider — is the main reason integration development is consistently underestimated.

## The Core Pattern: Identifier-Scoped Credential Storage

The foundation of any multi-tenant integration architecture is a stable, unique identifier per tenant that scopes all credential storage and retrieval.

In viaSocket's model, this is the `unique_identifier` field in the JWT payload:

    const payload = {
      org_id: process.env.VIASOCKET_ORG_ID,
      project_id: process.env.VIASOCKET_PROJECT_ID,
      unique_identifier: tenantId
    };

    const token = jwt.sign(payload, process.env.VIASOCKET_EMBED_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1h'
    });

Every OAuth token viaSocket stores is keyed to this identifier. When your backend requests an action execution for a given `unique_identifier`, viaSocket retrieves only the credentials belonging to that identifier. Cross-tenant credential access is structurally prevented at the storage layer.

**Choosing your identifier**: Use your internal tenant or user ID — a stable, immutable string that maps one-to-one to your tenants. Do not use email addresses (they can change), session tokens (they expire), or composite keys that might be reused.

## Four Isolation Dimensions

### 1. Credential Isolation

Each tenant's OAuth tokens are stored under their `unique_identifier`. Two tenants who both connect Slack get separate token records. Revoking one tenant's connection leaves the other's untouched.

Your responsibility: ensure the `unique_identifier` in every JWT you sign is correct for the authenticated session. This is a backend concern — the JWT is signed server-side with your `embed_secret` and delivered to the frontend via a protected API endpoint.

### 2. Connection State Isolation

Each tenant sees only their own connected apps. The SDK methods are automatically scoped to the `unique_identifier` from the initialisation token:

    // Returns only the apps connected by this tenant
    const enabled = await viasocket.user.findEnabled();

    // Opens a connection flow scoped to this tenant
    await viasocket.connect({ app: 'notion' });

There is no shared connection state across tenants. A tenant who disconnects an app affects only their own record.

### 3. Action Execution Routing

When your backend triggers an integration action, the `unique_identifier` in the request body tells viaSocket which tenant's credentials to use:

    await fetch(`https://flow.sokt.io/func/${process.env.SCRIPT_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unique_identifier: tenantId,
        app: 'hubspot',
        action: 'create_contact',
        params: { email: contactEmail, firstname: firstName }
      })
    });

The `script_id` in the URL identifies the workflow. The `unique_identifier` in the body selects the tenant's credentials. Both are required — neither alone is sufficient to execute a routed action.

### 4. Re-Authentication Isolation

OAuth tokens expire and get revoked. When a single tenant's connection breaks, only that tenant needs to re-authenticate. Your frontend can check connection health per-tenant and prompt re-authentication selectively, without affecting any other tenant's active connections.

## Connection Lifecycle Management

A production multi-tenant integration needs to handle the full connection lifecycle, not just the happy path.

**Initial connection**: The tenant clicks Connect in your UI, the SDK opens the OAuth flow, viaSocket handles the token exchange, and the token is stored under the tenant's identifier.

**Checking connection status**: Before executing an action for a tenant, verify the connection exists:

    const enabled = await viasocket.user.findEnabled();
    const hasSlack = enabled.some(app => app.name === 'slack');

    if (!hasSlack) {
      // Prompt the tenant to connect Slack before proceeding
    }

**Handling disconnection**: Tenants can disconnect apps explicitly, or tokens can be revoked by the provider. Your integration logic should handle action failures gracefully and surface re-connection prompts rather than failing silently.

**Tenant offboarding**: When a tenant leaves your product, revoke and remove their connections. This is both a security practice and a hygiene requirement for maintaining clean credential records.

## Scaling Considerations

### Don't Store OAuth Tokens Yourself

The most common scaling mistake is duplicating token storage — pulling tokens from a managed OAuth layer and caching them in your own database. This creates two problems: your cache goes stale when tokens refresh, and you are now responsible for the security of credentials you did not need to hold.

If you are using a managed OAuth layer, let it own token storage. Your backend's job is to route requests with the correct `unique_identifier`, not to hold credentials.

### Scope JWT Expiry Tightly

JWTs should have short expiry windows — one hour is a reasonable default. Return a fresh JWT from your backend at the start of each session rather than issuing long-lived tokens. Since the JWT generation is a lightweight signing operation, there is no meaningful performance cost to short expiry.

### Keep Script IDs and Secrets in Environment Variables

Your `embed_secret` (the JWT signing key) and your `script_id` values are credentials. Store them in environment variables, rotate them if they are exposed, and never include them in client-side code.

### AI Agent Integrations

If your product includes AI agent features, the same multi-tenant isolation model applies. When an agent executes a tool call on behalf of a tenant, the action execution must include that tenant's `unique_identifier` so the correct credentials are used. Do not share a single agent credential set across tenants for actions that operate on tenant-owned data.

## Architecture Summary

| Concern | Responsibility | How |
|---|---|---|
| Credential storage | viaSocket (managed) | Keyed to unique_identifier |
| JWT signing | Your backend | HS256 with embed_secret; secret never sent to client |
| Connection UI | Your frontend + SDK | SDK initialised with per-session JWT |
| Action execution | Your backend | POST to flow.sokt.io/func/script_id with unique_identifier |
| Tenant identifier accuracy | Your backend | Match JWT unique_identifier to authenticated session |
| Token refresh | viaSocket (managed) | Automatic per provider |

## Related Resources

- [How to Handle OAuth for Multi-Tenant SaaS Integrations with viaSocket](/help/integration-guides/managed-oauth-for-saas-integrations)
- [Embed Integrations in Your SaaS Product](/embed/app-integration)
- [Developer Documentation](/developers/docs)

Adding the managed OAuth layer on top of this architecture is covered in [Multi-Tenant Integration Architecture](/blogs/how-to-add-managed-oauth-for-third-party-apps).
