'use client';

import { KeyRound, Repeat, RotateCw, ShieldAlert, Users, Fingerprint, ShieldCheck, Cable } from 'lucide-react';
import { useReveal, revealClass } from '../useReveal';

const ICONS = { KeyRound, Repeat, RotateCw, ShieldAlert, Users, Fingerprint, ShieldCheck, Cable };

function StepCard({ n, icon, pill, title, copy }) {
    const Icon = icon ? ICONS[icon] : null;
    return (
        <div className="grid gap-2 content-start p-5 rounded-2xl border border-dev-line bg-dev-surface">
            <span className="font-dev-mono text-[11.5px] text-dev-accent tracking-[0.12em]">{n}</span>
            {Icon && (
                <span className="w-9 h-9 rounded-[10px] bg-dev-surface-2 grid place-items-center text-dev-ink mt-1 mb-0.5">
                    <Icon size={18} strokeWidth={1.7} />
                </span>
            )}
            {pill && (
                <span className={`inline-flex items-center gap-1.5 font-dev-mono text-[10.5px] tracking-[0.08em] uppercase px-[9px] py-1 rounded-full justify-self-start mb-1 ${
                    pill === 'ok' ? 'text-dev-ok bg-dev-ok-soft' : pill === 'warn' ? 'text-dev-warn bg-dev-warn/10' : 'text-dev-bad bg-dev-bad/10'
                }`}>
                    <i className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                    {pill}
                </span>
            )}
            <b className="font-semibold text-[17px] tracking-[-0.01em]">{title}</b>
            <p className="text-[14.5px] text-dev-ink-2 leading-[1.45] m-0">{copy}</p>
        </div>
    );
}

export default function StepsGrid({ steps, cols = 4 }) {
    const [ref, visible] = useReveal();
    const colClass = cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-5';
    return (
        <div ref={ref} className={`grid grid-cols-1 ${colClass} gap-3 ${revealClass(visible)}`}>
            {steps.map((s) => (
                <StepCard key={s.title} {...s} />
            ))}
        </div>
    );
}
