'use client';

import Link from 'next/link';
import { H2, Label, Lead, Scene } from '../Heading';
import { useReveal, revealClass } from '../useReveal';

const RUNGS = [
    { arrow: 'Up to', big: '100K tasks', price: 'Free', w: '20%' },
    { arrow: 'Up to', big: '1M tasks', price: '$29/mo', w: '45%' },
    { arrow: 'Up to', big: '5M tasks', price: '$99/mo', w: '75%' },
    { arrow: 'More?', big: 'Custom', price: null, w: '100%' },
];

function Rung({ r }) {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} className={`relative grid gap-2 p-5 rounded-2xl border border-dev-line bg-dev-surface overflow-hidden ${revealClass(visible)}`}>
            <span
                className="absolute left-0 bottom-0 h-[3px] bg-dev-accent rounded-r-[3px]"
                style={{ width: r.w }}
            />
            <span className="font-dev-mono text-[11.5px] tracking-[0.12em] uppercase text-dev-ink-3">{r.arrow}</span>
            <b className="text-[clamp(22px,2.2vw,28px)] font-bold tracking-[-0.03em] leading-none">{r.big}</b>
            <span className="text-dev-ink-2 text-[15px]">
                {r.price ? (
                    <em className="not-italic text-dev-ink font-semibold">{r.price}</em>
                ) : (
                    <Link href="https://cal.id/team/viasocket/embed-viasocket" target="_blank" rel="noopener" className="text-dev-ink font-semibold">Talk to sales</Link>
                )}
            </span>
        </div>
    );
}

export default function Ladder() {
    return (
        <Scene>
            <Label>Usage-based</Label>
            <H2>One action layer. Any scale.</H2>
            <Lead>You don&apos;t pay for integrations. You pay for usage. Your customers can use your product with 2,300+ apps, and as usage grows, your plan scales with it.</Lead>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
                {RUNGS.map((r) => (
                    <Rung key={r.big} r={r} />
                ))}
            </div>
        </Scene>
    );
}
