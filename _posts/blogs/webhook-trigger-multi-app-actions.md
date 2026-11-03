---
title: "Webhook-to-Multi-App Actions: Technical Guide to viaSocket Embed via Webhook"
description: "A technical implementation guide to viaSocket's Actions via Webhook embed product: how to generate per-user webhook URLs with JWT signing, POST events from your backend, and trigger multi-app workflows across 2,300+ connected apps."
date: 2026-10-26
author: Abhijeet Singh
category: "Technical Guide"
draft: false
---

Webhook-based integration is one of the most efficient patterns for connecting your SaaS product to your users' other apps. Instead of building individual API integrations, you POST a single event from your backend and let a workflow layer handle the fan-out. viaSocket's Actions via Webhook embed product is built specifically for this pattern.

This guide covers the complete technical implementation: how the webhook URL is generated, how your backend calls it, how workflows execute, and what the current reliability guarantees are.

## How Actions via Webhook Works

When something happens in your product — a user completes onboarding, places an order, submits a form — your backend POSTs an event payload to a user-specific webhook URL. viaSocket receives that event and executes whatever workflows the user has configured, across any of the 2,300+ connected apps on the platform.

The model has three components:

1. Your backend — fires the event as an HTTP POST
2. viaSocket's webhook endpoint — receives, authenticates, and routes the event
3. User workflows — the automations the user has configured (send email, update CRM, notify Slack, etc.)

Your code never changes as users connect new apps. You POST the same event regardless of what the user has wired up on their end.

## Generating the Webhook URL

Each user gets their own webhook URL. You generate it on your backend by signing a JWT and constructing the URL.

### JWT Payload

Sign a JWT with your embed secret key using HS256. The payload must include exactly these three fields:

    {
      org_id: your viaSocket organisation ID,
      project_id: the project within your organisation,
      unique_identifier: a stable unique ID for the end user
    }

Never expose the embed secret or sign JWTs on the client side.

### Webhook URL Format

Once you have the signed token, the URL takes this form:

    https://flow.viasocket.com/webhook/{token}

Replace {token} with the signed JWT. This URL is unique to that user — POSTing to it triggers only that user's configured workflows.

## Posting an Event

POST JSON to the URL from any backend, language, or framework. Include whatever fields your workflows need to act on — there is no required schema. viaSocket passes the entire payload to the workflow as trigger data.

Example using curl:

    curl -X POST https://flow.viasocket.com/webhook/YOUR_TOKEN
      -H Content-Type: application/json
      -d {event: order.placed, user_id: usr_123, amount: 49.99}

## Workflow Execution

When viaSocket receives the POST, it matches the event against the user's active workflows and executes the configured action steps. A single POST can trigger multiple workflows — for example, one workflow sends a welcome email, another creates a HubSpot deal, and a third posts to Slack.

Action execution happens asynchronously after your POST returns. Your backend does not wait for downstream app actions to complete. If you need confirmation that a specific action succeeded, handle that through your own logging or a callback pattern.

## Reliability: Automatic Retries

viaSocket automatically retries failed event deliveries. If a downstream app action fails due to a temporary error, the platform retries the step to ensure the event reaches its destination.

The exact retry count and backoff intervals are not currently published in the public documentation. For specific retry configuration questions — particularly for high-stakes workflows where you need guaranteed delivery semantics — contact viaSocket support or check your workflow settings.

## Per-User Data Isolation

Each webhook URL is scoped to a single user's connected apps and data. User A's event cannot trigger User B's workflows. The unique_identifier field in the JWT enforces this boundary — the platform resolves which user's workflow set to execute based on that field.

This is a meaningful security property for multi-tenant SaaS products: you never need to worry about cross-tenant action bleed from a shared webhook endpoint.

## Setup Checklist

Before going live:

- Generate your org_id and project_id from the viaSocket dashboard
- Store your embed secret securely (server-side only; never in client code)
- Implement JWT signing on your backend using HS256
- Test the webhook URL with a sample payload in a sandbox environment
- Confirm the user's workflows are active before firing production events
- Add error handling for non-2xx responses from the webhook endpoint
- Review retry behaviour with your team for any critical workflows

## When to Use Actions via Webhook vs. Other Embed Products

Actions via Webhook is the right choice when your backend can fire events but you do not want to build or maintain individual app integrations. It requires no public API on your side and works from any backend stack.

Use App Integrations (embedded iPaaS) if you want users to build their own workflows visually. Use Actions for AI if your AI agent needs to call third-party app actions.

## FAQ

### What does the webhook URL look like?

The URL follows the format https://flow.viasocket.com/webhook/{token}, where {token} is a signed JWT containing your org_id, project_id, and the user's unique_identifier.

### Is the webhook URL unique per user?

Yes. Each user gets their own URL generated from a JWT signed with their unique_identifier. Events posted to one user's URL only trigger that user's workflows.

### Do I need a public API to use Actions via Webhook?

No. Your backend fires HTTP POSTs to viaSocket's endpoint. viaSocket handles all the downstream app API calls. Your product never needs to be publicly accessible.

### What happens if a workflow action fails?

viaSocket automatically retries failed steps. The exact retry count and backoff duration are not currently published; contact support for specifics on your plan.

### Can one event trigger multiple workflows?

Yes. A single POST can match and execute multiple workflows the user has configured.
