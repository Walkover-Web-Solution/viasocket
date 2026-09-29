'use client';

import { useRef, useState } from 'react';

export function CodeBlock({ children }) {
    const ref = useRef(null);
    const [state, setState] = useState('idle');

    async function copy() {
        const text = ref.current?.innerText || '';
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            // clipboard blocked — button still confirms so the click isn't silently ignored
        }
        setState('done');
        setTimeout(() => setState('idle'), 1600);
    }

    return (
        <div className="relative group">
            <pre ref={ref} className="m-0 bg-[#f5f7fa] border border-docs-rule rounded-md p-[14px_16px] overflow-x-auto font-docs-mono text-[13px] leading-[1.6]">
                <code className="bg-transparent border-0 p-0 text-inherit">{children}</code>
            </pre>
            <button
                type="button"
                onClick={copy}
                aria-label="Copy code to clipboard"
                className={`absolute top-2 right-2 font-docs-mono text-[11px] tracking-[0.04em] px-[9px] py-1 rounded border cursor-pointer transition-opacity ${
                    state === 'done' ? 'opacity-100 text-docs-good border-docs-good' : 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-docs-muted border-docs-rule-strong bg-white'
                }`}
            >
                {state === 'done' ? 'Copied' : 'Copy'}
            </button>
        </div>
    );
}
