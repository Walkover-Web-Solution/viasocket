'use client';

import { useState } from 'react';
import { H2, Label, Lead, Scene } from './Heading';
import { BrandIcon, AGENT_NAMES } from './BrandIcon';
import { useReveal, revealClass } from './useReveal';
import CopyPromptButton from './CopyPromptButton';

export default function Start() {
    const [copied, setCopied] = useState(false);
    const [ref, visible] = useReveal();

    return (
        <Scene id="start">
            <Label>Start</Label>
            <H2>Build the AI. We&apos;ll handle the action layer.</H2>
            <Lead className="max-w-[52ch]">Copy one prompt, give it to your coding agent, and build from there.</Lead>
            <div ref={ref} className={`flex items-center gap-4 flex-wrap mt-2 ${revealClass(visible)}`}>
                <CopyPromptButton onCopied={setCopied} />
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
