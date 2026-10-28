'use client';

import { useEffect, useRef, useState } from 'react';
import { buildSetupPrompt, parseSetupQuery } from './prompt';

const COPY_LABEL = 'Copy prompt';
const COPIED_LABEL = 'Copied. Paste it into your agent';
const NOTE = 'Paste it into your AI agent (Cursor, Claude Code or similar).';
const COPIED_MS = 2500;

// Clipboard API first. A textarea that is only attached for the failed attempt
// is the fallback, and it is removed before this returns. The prompt is never logged.
async function copyText(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch {
        // Fall through to the textarea.
    }

    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.setAttribute('aria-hidden', 'true');
    area.tabIndex = -1;
    area.style.position = 'fixed';
    area.style.top = '0';
    area.style.left = '0';
    area.style.width = '1px';
    area.style.height = '1px';
    area.style.padding = '0';
    area.style.border = 'none';
    area.style.outline = 'none';
    area.style.opacity = '0';
    area.style.pointerEvents = 'none';
    document.body.appendChild(area);
    area.focus();
    area.select();
    let ok = false;
    try {
        ok = document.execCommand('copy');
    } catch {
        ok = false;
    }
    document.body.removeChild(area);
    return ok;
}

export default function SetupPrompt() {
    const [model, setModel] = useState(null);
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    useEffect(() => {
        setModel(buildSetupPrompt(parseSetupQuery(window.location.search)));
    }, []);

    useEffect(() => () => clearTimeout(timer.current), []);

    const onCopy = async () => {
        if (!model) return;
        const ok = await copyText(model.prompt);
        if (!ok) return;
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), COPIED_MS);
    };

    const preview = model ? model.lines.slice(0, 2) : [];
    const secondLine = preview[1] ? `${preview[1]}${model.lines.length > 2 ? '…' : ''}` : '';

    return (
        <main className="flex min-h-screen w-full max-w-full bg-white">
            <div className="m-auto w-full max-w-full px-4 py-8">
                <article
                    className="mx-auto w-full max-w-[1040px] rounded-[36px] border-4 border-solid border-[#1c1c1e] bg-white px-6 py-14 text-center shadow-[0_12px_0_#1c1c1e] max-[560px]:rounded-[24px] max-[560px]:border-[3px] max-[560px]:shadow-[0_8px_0_#1c1c1e]"
                    aria-busy={model ? 'false' : 'true'}
                >
                    <a href="/" className="inline-block">
                        <img
                            src="/assets/brand/logo.svg"
                            alt="viaSocket"
                            width="92"
                            height="23"
                            className="h-auto w-[92px]"
                        />
                    </a>
                    {model && (
                        <>
                            <h1 className="mx-auto mt-8 max-w-full break-words text-[44px] font-bold leading-[1.15] text-[#1c1c1e] max-[560px]:text-[30px]">
                                {model.title}
                            </h1>
                            <p className="mx-auto mt-3 max-w-full text-[18px] leading-snug text-[#6b7280]">
                                {model.lede}
                            </p>
                            <div className="mx-auto mt-8 flex w-full max-w-[440px] flex-col gap-3">
                                <div className="w-full overflow-hidden rounded-[10px] border border-solid border-[#e5e7eb] bg-white px-3.5 py-3 text-left text-[14px] leading-[1.45] text-[#6b7280]">
                                    <p className="truncate">{preview[0]}</p>
                                    <p className="truncate">{secondLine}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={onCopy}
                                    className={`w-full rounded-[10px] border-0 px-4 py-3 text-[15px] font-semibold leading-snug text-white ${
                                        copied ? 'bg-[#14532d]' : 'bg-[#1c1c1e]'
                                    }`}
                                >
                                    {copied ? COPIED_LABEL : COPY_LABEL}
                                </button>
                                <p className="text-[13px] leading-snug text-[#6b7280]">{NOTE}</p>
                            </div>
                        </>
                    )}
                </article>
            </div>
        </main>
    );
}
