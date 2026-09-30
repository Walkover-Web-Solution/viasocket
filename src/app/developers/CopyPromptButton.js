'use client';

import { useState } from 'react';
import { SKILL } from './skill';

export default function CopyPromptButton({ className = '', onCopied }) {
    const [copied, setCopied] = useState(false);

    async function copy() {
        try {
            await navigator.clipboard.writeText(SKILL);
        } catch {
            // clipboard blocked (permissions, insecure context) — button label stays accurate below
        }
        setCopied(true);
        onCopied?.(true);
        setTimeout(() => {
            setCopied(false);
            onCopied?.(false);
        }, 1800);
    }

    return (
        <button
            type="button"
            onClick={copy}
            className={`inline-flex items-center gap-[10px] rounded-full font-semibold text-[15.5px] px-[22px] py-[14px] border-0 cursor-pointer transition-transform hover:-translate-y-px ${
                copied ? 'bg-dev-ok text-white' : 'bg-dev-ink text-dev-ink-inv'
            } ${className}`}
        >
            {copied ? 'Copied' : 'Copy implementation prompt'}
        </button>
    );
}
