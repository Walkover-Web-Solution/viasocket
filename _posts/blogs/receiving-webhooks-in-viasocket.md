---
title: "Webhook Triggers in viaSocket: Technical Implementation Guide"
description: "A technical guide to receiving and processing inbound webhooks in viaSocket: how to configure a webhook trigger, retrieve your endpoint URL, validate payloads, and build reliable event-driven workflows."
date: 2026-10-26
author: Abhijeet Singh
category: "Technical Guide"
draft: false
---

Webhooks let external services push events directly to your viaSocket workflows the moment something happens — a payment completes, a form is submitted, a record changes. Instead of polling an API, your workflow waits and reacts.

This guide explains how to set up a webhook trigger in viaSocket, get your inbound endpoint URL, validate incoming payloads, and handle events reliably.

## How Inbound Webhooks Work in viaSocket

Every workflow in viaSocket can start with a webhook trigger. When you add a webhook trigger step, viaSocket generates a unique endpoint URL for that workflow. Any HTTP POST to that URL fires the workflow with the posted payload as the trigger data.

The pattern is:

1. You create a workflow and add a webhook trigger
2. viaSocket gives you a unique endpoint URL
3. You register that URL with the external service (Stripe, GitHub, your own app, etc.)
4. The external service POSTs events to the URL
5. viaSocket executes the workflow with the event payload

## Getting Your Webhook Endpoint URL

The endpoint URL is generated when you add a webhook trigger to a workflow. The URL follows this format:

    https://flow.viasocket.com/webhook/{token}

where {token} is a unique identifier tied to that workflow. You can find the URL in the trigger step configuration inside the workflow editor. Copy it and paste it into the external service's webhook settings.

Each workflow gets its own distinct URL. If you need to handle events from multiple services, create a separate workflow for each source.

## Validating Incoming Payloads

Most webhook senders include a signature header so you can verify the request is genuine and has not been tampered with. How you handle this in viaSocket depends on the sender.

### Using a Custom Code Step for Signature Verification

For services that sign their payloads (Stripe uses a Stripe-Signature header with HMAC-SHA256; GitHub uses X-Hub-Signature-256; others follow similar patterns), the reliable approach in viaSocket is to add a code step immediately after the webhook trigger.

In that code step:

1. Read the raw request body and the signature header from the trigger data
2. Recompute the expected signature using the shared secret the service gave you
3. Compare the computed signature against the received header using a constant-time comparison
4. Return an error or stop the workflow if the signatures do not match

This approach works for any signing scheme and gives you full control over the validation logic. It is the recommended pattern until viaSocket publishes confirmed native signature verification settings for specific sources.

### Filtering by IP Allowlist

Some services publish a list of IP addresses their webhooks originate from. If the service you are integrating with provides one, you can add a filter step that checks the source IP against the allowlist as a secondary control. This is a defence-in-depth measure, not a replacement for signature verification.

## Handling Event Payloads

The entire POST body is available as trigger data in your workflow steps. You can reference any field in subsequent steps using viaSocket's variable picker.

A few practical considerations:

- Most services send JSON. viaSocket parses the body automatically and makes fields accessible as named variables.
- Some services send form-encoded data. Check the sender's documentation and parse accordingly in a code step if needed.
- If the sender retries on non-2xx responses, make your workflow idempotent where possible — processing the same event twice should not create duplicate side effects.

## Responding to the Sender

viaSocket returns a 200 response to the sender as soon as the webhook is received. Workflow execution happens after acknowledgement. This means:

- The sender gets a fast acknowledgement and will not time out waiting for your workflow to finish
- If your workflow fails partway through, the sender has already received its 200 and will not automatically retry unless it has its own retry logic

For critical workflows, log incoming events at the trigger step so you have a record independent of whether downstream steps succeed.

## Reliability and Retries

viaSocket retries failed workflow steps automatically when a downstream action fails due to a temporary error. This covers failures in action steps (writing to a CRM, sending a message) but not the initial webhook receipt — once viaSocket has acknowledged the POST, the event is in the system.

The exact retry count and backoff schedule are not currently published in the public documentation. For high-stakes workflows where you need specific delivery guarantees, contact viaSocket support.

## Common Setup Mistakes

### Registering the wrong URL

Double-check the URL you paste into the external service. A single character difference means events go nowhere. Test with a sample payload immediately after registering.

### Not activating the workflow

A workflow must be active to receive events. A draft or paused workflow will not process incoming webhooks even if the URL is correct.

### Skipping payload validation

Without signature verification, anyone who discovers your webhook URL can POST arbitrary data and trigger your workflow. Always validate signatures for production workflows connected to external services.

### Assuming synchronous execution

viaSocket acknowledges the webhook immediately and runs the workflow asynchronously. Do not design your integration to depend on a result returned in the HTTP response body.

## FAQ

### What is the inbound webhook URL format?

It follows the format https://flow.viasocket.com/webhook/{token}, where {token} is unique to the workflow. Find the full URL in the webhook trigger step inside your workflow editor.

### Can I use the same webhook URL for multiple services?

Technically yes, but it is not recommended. Use separate workflows with separate URLs for each source so you can apply source-specific validation and routing logic independently.

### How do I verify a Stripe or GitHub webhook signature?

viaSocket does not currently have confirmed native signature verification toggles for specific sources. The recommended approach is a custom code step immediately after the webhook trigger, where you recompute the expected signature and compare it against the header the sender provides.

### What happens if my workflow fails after viaSocket acknowledges the webhook?

viaSocket retries failed action steps automatically. However, the sender has already received its 200 acknowledgement and will not re-send the event. Log trigger data at the start of your workflow so you can replay events manually if needed.

### Does viaSocket support webhook authentication headers?

You can add filter or code steps that inspect any header included in the incoming request. For standard signing schemes, use a code step to perform the verification as described above.
