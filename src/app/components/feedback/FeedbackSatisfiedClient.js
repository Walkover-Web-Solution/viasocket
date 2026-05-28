'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';

const WEBHOOK_URL = 'https://flow.sokt.io/func/scri74yGAo9Z';
const FEEDBACK = 'satisfied';
const SUGGEST_LINK = 'https://tally.so/r/q4olK9';

function pickParam(params, names) {
    for (let i = 0; i < names.length; i++) {
        const v = params.get(names[i]);
        if (v) return v;
    }
    return '';
}

const STATUS_VARIANTS = {
    sending: 'bg-[#f3f1ee] border-[#efece5] text-[#555555]',
    sent: 'bg-[#e8f5ec] border-[#cfe6d7] text-[#0c8a4a]',
    error: 'bg-[#fbf1ee] border-[#f0d6cf] text-[#c54a3a]',
};

const STATUS_LABELS = {
    sending: 'Recording your response…',
    sent: 'Response recorded. The team is on it',
    error: "Couldn't reach our servers. Try refreshing",
};

const DOT_VARIANTS = {
    sending: 'bg-[#888888]',
    sent: 'bg-[#0c8a4a]',
    error: 'bg-[#c54a3a]',
};

export default function FeedbackSatisfiedClient() {
    const [status, setStatus] = useState('sending');
    const [mailContent, setMailContent] = useState({
        plugin: '',
        action_trigger: '',
        use_case: '',
        client_name: '',
        client_email: '',
        request_id: '',
        timestamp: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const data = {
            plugin: pickParam(params, ['plugin', 'plugname']),
            action_trigger: pickParam(params, ['action_trigger']),
            use_case: pickParam(params, ['use_case']),
            client_name: pickParam(params, ['client_name']),
            client_email: pickParam(params, ['client_email']),
            request_id: pickParam(params, ['request_id', 'rid']),
            timestamp: pickParam(params, ['ts', 'timestamp']) || new Date().toISOString(),
        };
        setMailContent(data);

        const payload = JSON.stringify({ 'mail-content': data, feedback: FEEDBACK });

        let sent = false;
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
            try {
                sent = navigator.sendBeacon(WEBHOOK_URL, new Blob([payload], { type: 'application/json' }));
            } catch (_) {
                sent = false;
            }
        }

        if (sent) {
            const t = setTimeout(() => setStatus('sent'), 350);
            return () => clearTimeout(t);
        }

        fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
            mode: 'cors',
        })
            .then(() => setStatus('sent'))
            .catch(() => setStatus('error'));
    }, []);

    const pluginLabel = mailContent.plugin ? `your ${mailContent.plugin} integration` : 'your integration';

    return (
        <div className="flex flex-col min-h-screen bg-[#f3f1ee] text-[#0c0c0c] antialiased font-sans">
            <header className="flex items-center justify-between px-5 py-4 sm:px-7 sm:py-5">
                <a href="https://viasocket.com" aria-label="viaSocket home">
                    <Image
                        src="https://viasocket.com/assets/brand/socketsvg.png"
                        alt="viaSocket"
                        width={96}
                        height={32}
                        className="block max-w-[96px] h-auto"
                    />
                </a>
                <div className="hidden sm:block text-[11px] tracking-[0.9px] uppercase text-[#888888] font-semibold">
                    Plugin feedback
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 pt-3 pb-10 sm:px-6 sm:pt-6 sm:pb-14">
                <article
                    role="status"
                    className="w-full max-w-[560px] bg-white border border-[#e7e4dd] shadow-[0_1px_0_rgba(0,0,0,0.02),0_28px_60px_-32px_rgba(20,30,20,0.18)]"
                >
                    <div className="h-1 bg-[#0c8a4a]" />

                    <div className="px-7 pt-8 pb-7 sm:px-11 sm:pt-10 sm:pb-9">
                        <div
                            aria-hidden="true"
                            className="w-14 h-14 rounded-full bg-[#e8f5ec] border border-[#cfe6d7] flex items-center justify-center text-[#0c8a4a] mb-[22px]"
                        >
                            <Check className="w-[26px] h-[26px]" strokeWidth={2.6} />
                        </div>

                        <p className="m-0 mb-2.5 text-[11px] tracking-[1.4px] uppercase text-[#0c8a4a] font-semibold">
                            Feedback received
                        </p>
                        <h1 className="m-0 mb-3.5 text-2xl sm:text-3xl leading-[1.16] font-semibold tracking-[-0.5px] text-[#0c0c0c]">
                            Glad it&apos;s working for you.
                        </h1>
                        <p className="m-0 mb-6 text-[15.5px] leading-[1.6] text-[#2a2a2a]">
                            We&apos;ve shared your response with the team that built{' '}
                            <strong className="font-semibold text-[#0c0c0c]">{pluginLabel}</strong>. They&apos;ll keep
                            an eye on it and reach out if anything looks off on our side.
                        </p>

                        <div
                            aria-live="polite"
                            className={`flex items-center gap-2.5 px-3.5 py-2.5 mb-7 border text-xs transition-colors ${STATUS_VARIANTS[status]}`}
                        >
                            <span
                                className={`relative inline-flex w-2 h-2 rounded-full shrink-0 ${DOT_VARIANTS[status]}`}
                            >
                                {status === 'sending' && (
                                    <span className="absolute inset-0 rounded-full bg-current opacity-40 animate-ping" />
                                )}
                            </span>
                            <span>{STATUS_LABELS[status]}</span>
                        </div>

                        <div className="mt-7 pt-[22px] border-t border-[#efece5] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[18px]">
                            <div>
                                <p className="m-0 mb-1 text-[10.5px] tracking-[1px] uppercase text-[#888888] font-semibold">
                                    Plugin
                                </p>
                                <p className="m-0 text-xs text-[#2a2a2a] leading-[1.45] break-words">
                                    {mailContent.plugin || '—'}
                                </p>
                            </div>
                            <div>
                                <p className="m-0 mb-1 text-[10.5px] tracking-[1px] uppercase text-[#888888] font-semibold">
                                    Action / Trigger
                                </p>
                                <p className="m-0 text-xs text-[#2a2a2a] leading-[1.45] break-words">
                                    {mailContent.action_trigger || '—'}
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            <footer className="max-w-[560px] w-full mx-auto px-7 pt-[22px] pb-9 text-center text-xs text-[#888888] leading-[1.6]">
                <div className="my-1">
                    Need to change something later?{' '}
                    <a
                        href={SUGGEST_LINK}
                        className="text-[#555555] border-b border-transparent hover:border-[#555555] transition-colors"
                    >
                        Suggest an improvement
                    </a>{' '}
                    and we&apos;ll ship it within 24 hours.
                </div>
                <div className="my-1 mt-2.5 text-[#a39d8e]">© 2026 viaSocket, Inc. All rights reserved.</div>
            </footer>
        </div>
    );
}
