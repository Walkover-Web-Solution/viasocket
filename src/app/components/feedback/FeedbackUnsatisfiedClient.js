'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Calendar, PenLine } from 'lucide-react';
import Image from 'next/image';

const WEBHOOK_URL = 'https://flow.sokt.io/func/scri74yGAo9Z';
const FEEDBACK = 'unsatisfied';
const TALLY_BASE = 'https://tally.so/r/q4olK9';
const CAL_LINK = 'https://cal.id/team/viasocket/bring-saas-app-on-viasocket';

function pickParam(params, names) {
    for (let i = 0; i < names.length; i++) {
        const v = params.get(names[i]);
        if (v) return v;
    }
    return '';
}

const STATUS_VARIANTS = {
    sending: 'bg-[#f3f1ee] border-[#efece5] text-[#555555]',
    sent: 'bg-[#f1f9f3] border-[#cfe6d7] text-[#0c8a4a]',
    error: 'bg-[#fbf1ee] border-[#f0d6cf] text-[#c54a3a]',
};

const STATUS_LABELS = {
    sending: 'Sending your response…',
    sent: "Received. We'll be in touch",
    error: "Couldn't reach our servers. Please use the form below",
};

const DOT_VARIANTS = {
    sending: 'bg-[#888888]',
    sent: 'bg-[#0c8a4a]',
    error: 'bg-[#c54a3a]',
};

export default function FeedbackUnsatisfiedClient() {
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

    const tallyHref = useMemo(() => {
        const tp = new URLSearchParams();
        Object.keys(mailContent).forEach((k) => {
            if (mailContent[k]) tp.set(k, mailContent[k]);
        });
        const qs = tp.toString();
        return qs ? `${TALLY_BASE}?${qs}` : TALLY_BASE;
    }, [mailContent]);

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
                    className="w-full max-w-[620px] bg-white border border-[#e7e4dd] shadow-[0_1px_0_rgba(0,0,0,0.02),0_28px_60px_-32px_rgba(40,30,15,0.18)]"
                >
                    <div className="h-1 bg-[#8a5a1f]" />

                    <div className="px-7 pt-8 pb-7 sm:px-11 sm:pt-10 sm:pb-9">
                        <div
                            aria-hidden="true"
                            className="w-14 h-14 rounded-full bg-[#faf2e2] border border-[#ead9b8] flex items-center justify-center text-[#8a5a1f] mb-[22px]"
                        >
                            <AlertTriangle className="w-[26px] h-[26px]" strokeWidth={2.4} />
                        </div>

                        <p className="m-0 mb-2.5 text-[11px] tracking-[1.4px] uppercase text-[#8a5a1f] font-semibold">
                            Let&apos;s get it right
                        </p>
                        <h1 className="m-0 mb-3.5 text-2xl sm:text-3xl leading-[1.16] font-semibold tracking-[-0.5px] text-[#0c0c0c]">
                            Tell us what&apos;s off and we&apos;ll fix it.
                        </h1>
                        <p className="m-0 mb-6 text-[15.5px] leading-[1.6] text-[#2a2a2a]">
                            Pick the option that fits best. Whichever you choose, the team that built{' '}
                            <strong className="font-semibold text-[#0c0c0c]">{pluginLabel}</strong> is alerted right
                            away.
                        </p>

                        <div
                            aria-live="polite"
                            className={`flex items-center gap-2.5 px-3.5 py-2.5 mb-7 border text-[13px] transition-colors ${STATUS_VARIANTS[status]}`}
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

                        <p className="m-0 mb-3.5 text-[11px] tracking-[1.3px] uppercase text-[#888888] font-semibold">
                            What&apos;s next?
                        </p>

                        <div className="grid gap-2.5">
                            <a
                                href={tallyHref}
                                className="group flex items-center gap-4 px-4 py-4 sm:px-5 sm:py-[18px] bg-[#0c0c0c] border border-[#0c0c0c] no-underline text-white transition-colors hover:bg-[#1c1c1c] active:translate-y-px"
                            >
                                <span
                                    aria-hidden="true"
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0"
                                >
                                    <PenLine className="w-4 h-4" />
                                </span>
                                <span className="flex-1 flex flex-col gap-0.5">
                                    <span className="text-[14.5px] font-semibold text-white">
                                        Share what needs to change
                                    </span>
                                    <span className="text-[13px] text-[#b8b8b8] leading-[1.45]">
                                        2-minute form. We&apos;ll ship a fix within 24 hours.
                                    </span>
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="text-lg text-white shrink-0 transition-transform group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </a>

                            <a
                                href={CAL_LINK}
                                className="group flex items-center gap-4 px-4 py-4 sm:px-5 sm:py-[18px] bg-[#fafaf6] border border-[#e7e4dd] no-underline text-[#0c0c0c] transition-colors hover:bg-[#f4f1e8] hover:border-[#d6d0bf] active:translate-y-px"
                            >
                                <span
                                    aria-hidden="true"
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#e7e4dd] flex items-center justify-center text-[#555555] shrink-0"
                                >
                                    <Calendar className="w-4 h-4" />
                                </span>
                                <span className="flex-1 flex flex-col gap-0.5">
                                    <span className="text-[14.5px] font-semibold text-[#0c0c0c]">
                                        Book a 15-min call
                                    </span>
                                    <span className="text-[13px] text-[#555555] leading-[1.45]">
                                        Walk through it live with the team that built it.
                                    </span>
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="text-lg text-[#888888] shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-[#2a2a2a]"
                                >
                                    →
                                </span>
                            </a>
                        </div>

                        <div className="mt-7 pt-[22px] border-t border-[#efece5] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[18px]">
                            <div>
                                <p className="m-0 mb-1 text-[10.5px] tracking-[1px] uppercase text-[#888888] font-semibold">
                                    Plugin
                                </p>
                                <p className="m-0 text-[13.5px] text-[#2a2a2a] leading-[1.45] break-words">
                                    {mailContent.plugin || '—'}
                                </p>
                            </div>
                            <div>
                                <p className="m-0 mb-1 text-[10.5px] tracking-[1px] uppercase text-[#888888] font-semibold">
                                    Action / Trigger
                                </p>
                                <p className="m-0 text-[13.5px] text-[#2a2a2a] leading-[1.45] break-words">
                                    {mailContent.action_trigger || '—'}
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            <footer className="max-w-[620px] w-full mx-auto px-7 pt-[22px] pb-9 text-center text-xs text-[#888888] leading-[1.6]">
                <div className="my-1">You can also just reply to the original email. It lands in the same inbox.</div>
                <div className="my-1 mt-2.5 text-[#a39d8e]">© 2026 viaSocket, Inc. All rights reserved.</div>
            </footer>
        </div>
    );
}
