'use client';

import { useEffect, useState } from 'react';
import { BrandIcon } from '../BrandIcon';
import { useReveal, revealClass } from '../useReveal';

const STEPS = [
    ['Find connection', 'gmail'],
    ['Authenticate', 'Token valid · refreshed 2h ago'],
    ['Execute action', 'gmail.messages.send'],
    ['Return result', 'Email sent · id 18c4…9f'],
];

export default function AiRun() {
    const [ref, visible] = useReveal(0.4);
    const [step, setStep] = useState(-1);
    const [status, setStatus] = useState('live');

    useEffect(() => {
        if (!visible) return undefined;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setStep(STEPS.length - 1);
            setStatus('verified');
            return undefined;
        }
        let timeouts = [];
        function play() {
            setStatus('running');
            setStep(-1);
            STEPS.forEach((_, i) => {
                timeouts.push(
                    setTimeout(() => {
                        setStep(i);
                        if (i === STEPS.length - 1) setStatus('verified');
                    }, 500 + i * 800),
                );
            });
        }
        play();
        const id = setInterval(play, 6500);
        return () => {
            clearInterval(id);
            timeouts.forEach(clearTimeout);
        };
    }, [visible]);

    return (
        <div ref={ref} className={`bg-dev-surface border border-dev-line rounded-[18px] shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25)] overflow-hidden ${revealClass(visible)}`}>
            <div className="flex justify-between items-center gap-3 px-4 py-3 border-b border-dev-line font-dev-mono text-[11.5px] text-dev-ink-3">
                <span>inside your product · support assistant</span>
                <span className={status === 'verified' ? 'text-dev-ok' : ''}>{status}</span>
            </div>
            <div className="flex gap-2.5 items-start px-4 pt-4 pb-1.5 text-[15px] font-medium">
                <span className="w-[26px] h-[26px] rounded-[8px] bg-dev-ink text-dev-ink-inv font-dev-mono text-[10.5px] grid place-items-center shrink-0">AI</span>
                <span>Send this customer an email.</span>
            </div>
            <ol className="list-none m-0 px-4 pt-2.5 pb-4 grid gap-2">
                {STEPS.map(([label, val], i) => (
                    <li
                        key={label}
                        className={`grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3 items-center px-3 py-2.5 rounded-[10px] border transition-all duration-[400ms] ${
                            i <= step ? 'opacity-100 translate-x-0 border-dev-line-2' : 'opacity-35 -translate-x-1 border-dev-line'
                        } ${i === step ? 'border-dev-accent shadow-[0_0_0_3px_var(--tw-shadow-color)] shadow-dev-accent-soft' : ''}`}
                    >
                        <span className="font-dev-mono text-[11px] tracking-[0.08em] uppercase text-dev-ink-3">{label}</span>
                        <span className={`text-[14px] flex items-center gap-1.5 ${i === STEPS.length - 1 && i <= step ? 'text-dev-ok font-semibold' : ''}`}>
                            {i === 0 && <BrandIcon name="Gmail" size={16} />}
                            {i === 0 ? 'Gmail · Acme · support@acme.com' : val}
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    );
}
