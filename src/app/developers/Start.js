'use client';

import { useState } from 'react';
import { H2, Label, Lead, Scene } from './Heading';
import { BrandIcon, AGENT_NAMES } from './BrandIcon';
import { useReveal, revealClass } from './useReveal';

const PROMPT = `Add viaSocket Actions to my AI product as its action layer.

Goal: my AI should be able to take real actions in my users' own apps (Salesforce, HubSpot, Slack, Gmail and 2,300+ others) through viaSocket, with every user connecting their own accounts.

Do this:
1. Read the viaSocket Actions docs and quickstart.
2. Install the viaSocket SDK. Read my API key from the environment (VIASOCKET_API_KEY). Never hardcode it or ship it to the client.
3. Add a "Connect apps" entry point where each user connects their own accounts. Keep the UI inside my product and match my existing styling.
4. Expose viaSocket actions to my AI as tools, scoped to the current user's connections and permissions. Use viaSocket's tool discovery so only the relevant actions load into context.
5. Route the AI's tool calls to viaSocket for execution with one idempotency key per run. Surface results, failures and retries back to the user in plain language.
6. Log every action so I can see what the AI tried to do and what actually happened.

Constraints: multi-tenant by default (one user's connections are never visible to another), no secrets in client code, follow my existing framework and conventions.

Start by inspecting my codebase and showing me your plan before writing code.`;

export default function Start() {
    const [copied, setCopied] = useState(false);
    const [ref, visible] = useReveal();

    async function copy() {
        try {
            await navigator.clipboard.writeText(PROMPT);
        } catch {
            // clipboard blocked (permissions, insecure context) — button label stays accurate below
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    }

    return (
        <Scene id="start">
            <Label>Start</Label>
            <H2>Build the AI. We&apos;ll handle the action layer.</H2>
            <Lead className="max-w-[52ch]">Copy one prompt, give it to your coding agent, and build from there.</Lead>
            <div ref={ref} className={`flex items-center gap-4 flex-wrap mt-2 ${revealClass(visible)}`}>
                <button
                    type="button"
                    onClick={copy}
                    className={`inline-flex items-center gap-[10px] rounded-full font-semibold text-[15.5px] px-[22px] py-[14px] border-0 cursor-pointer transition-transform hover:-translate-y-px ${
                        copied ? 'bg-dev-ok text-white' : 'bg-dev-ink text-dev-ink-inv'
                    }`}
                >
                    {copied ? 'Copied' : 'Copy implementation prompt'}
                </button>
                <span className="text-[14px] text-dev-ink-3">Live in under 15 minutes</span>
            </div>
            {copied && (
                <div className="flex items-start gap-[10px] p-[12px_14px] rounded-xl border border-dev-line bg-dev-surface text-[14.5px] text-dev-ink-2 max-w-[560px]">
                    <i className="w-2 h-2 rounded-full bg-dev-ok mt-1.5 shrink-0" />
                    <span>Copied. Paste it into your coding agent. Your users connect their apps inside your product, and your AI can act in them.</span>
                </div>
            )}
            <div className="grid gap-[14px] mt-2">
                <span className="font-dev-mono text-[11.5px] tracking-[0.14em] uppercase text-dev-ink-3">Works with every agent</span>
                <div className="flex flex-wrap items-center gap-[22px]">
                    {AGENT_NAMES.map((name) => (
                        <span key={name} title={name} className="grid place-items-center w-[22px] h-[22px] text-dev-ink-3">
                            <BrandIcon name={name} size={22} />
                        </span>
                    ))}
                </div>
            </div>
        </Scene>
    );
}
