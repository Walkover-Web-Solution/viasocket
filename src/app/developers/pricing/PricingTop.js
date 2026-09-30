'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './OverageTicker.module.scss';

const PLANS = [
    { label: 'Free', m: '$0', y: '$0', desc: 'Everything you need to start.', tasks: '100K tasks / month', cta: 'Start free', href: '/developers#start' },
    { label: 'Growth', tag: 'Most popular', m: '$29', y: '$290', desc: 'For products finding traction.', tasks: '1M tasks / month', cta: 'Start with Growth', href: '/developers#start', pop: true },
    { label: 'Scale', m: '$99', y: '$990', desc: 'For products with real volume.', tasks: '5M tasks / month', cta: 'Start with Scale', href: '/developers#start' },
    { label: 'Enterprise', m: 'Custom', y: 'Custom', desc: 'For higher usage and control.', tasks: 'Custom tasks', cta: 'Talk to sales', href: 'https://cal.id/team/viasocket/embed-viasocket', external: true },
];

const OVERAGE_MIN = 1;
const OVERAGE_MAX = 50;

function OverageTicker() {
    const [n, setN] = useState(5);
    const pct = ((n - OVERAGE_MIN) / (OVERAGE_MAX - OVERAGE_MIN)) * 100;

    return (
        <div className="w-full max-w-[420px] mx-auto mt-5 rounded-2xl border border-dev-line bg-dev-surface shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25)] p-[22px_24px]">
            <div className="flex items-baseline justify-center gap-2.5 flex-wrap text-center">
                <span className="font-dev-mono text-[26px] font-bold tabular-nums text-dev-ink tracking-[-0.02em]">${n}</span>
                <span className="text-dev-ink-3 text-[15px]">=</span>
                <span className="font-dev-mono text-[26px] font-bold tabular-nums text-dev-accent tracking-[-0.02em]">{(n * 5000).toLocaleString()}</span>
                <span className="text-[15px] font-medium text-dev-ink-2">Tasks</span>
            </div>
            <input
                type="range"
                min={OVERAGE_MIN}
                max={OVERAGE_MAX}
                step={1}
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
                aria-label="Overage amount in dollars"
                className={`${styles.slider} block w-full mt-4`}
                style={{ background: `linear-gradient(to right, #2B5BFF ${pct}%, #E2E4E8 ${pct}%)` }}
            />
            <div className="flex items-center justify-between mt-2.5">
                <span className="font-dev-mono text-[11px] text-dev-ink-3">$1</span>
                <span className="text-[12.5px] text-dev-ink-2">if you exceed your plan limit</span>
                <span className="font-dev-mono text-[11px] text-dev-ink-3">$50</span>
            </div>
        </div>
    );
}

export default function PricingTop() {
    const [period, setPeriod] = useState('m');

    return (
        <>
            <section className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(40px,6vw,72px)] pb-[clamp(24px,4vw,40px)] grid gap-[clamp(20px,3vw,36px)] justify-items-center text-center">
                <h1 className="font-semibold tracking-[-0.035em] leading-[1.02] text-[clamp(38px,5.6vw,72px)] mx-auto">
                    Cheaper than building and maintaining it yourself.
                </h1>
                <p className="text-[clamp(17px,1.5vw,20px)] leading-[1.5] text-dev-ink-2 mx-auto max-w-[52ch]">
                    Everything you need to add actions and integrations to your AI product. Pay only for what you use.
                </p>
                <div role="group" aria-label="Billing period" className="inline-flex items-center gap-1 p-1 rounded-full border border-dev-line bg-dev-surface mt-2">
                    <button
                        type="button"
                        onClick={() => setPeriod('m')}
                        aria-pressed={period === 'm'}
                        className={`border-0 rounded-full px-4 py-[9px] font-semibold text-[14px] cursor-pointer transition-colors ${period === 'm' ? 'bg-dev-ink text-dev-ink-inv' : 'bg-transparent text-dev-ink-2'}`}
                    >
                        Monthly
                    </button>
                    <button
                        type="button"
                        onClick={() => setPeriod('y')}
                        aria-pressed={period === 'y'}
                        className={`border-0 rounded-full px-4 py-[9px] font-semibold text-[14px] cursor-pointer transition-colors inline-flex items-center gap-2 ${period === 'y' ? 'bg-dev-ink text-dev-ink-inv' : 'bg-transparent text-dev-ink-2'}`}
                    >
                        Annual
                        <span className={`font-dev-mono text-[10.5px] tracking-[0.08em] uppercase px-[7px] py-0.5 rounded-full ${period === 'y' ? 'text-dev-ok-soft bg-dev-ok/55' : 'text-dev-ok bg-dev-ok-soft'}`}>
                            2 months free
                        </span>
                    </button>
                </div>
            </section>

            <section className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(40px,6vw,72px)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {PLANS.map((p) => (
                        <div
                            key={p.label}
                            className={`relative grid gap-2.5 content-start p-[24px_22px_22px] rounded-2xl border bg-dev-surface ${
                                p.pop ? 'border-dev-accent shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25),0_0_0_4px_var(--tw-shadow-color)] shadow-dev-accent-soft' : 'border-dev-line shadow-[0_1px_2px_rgba(11,13,16,.03)]'
                            }`}
                        >
                            {p.tag && (
                                <span className="absolute -top-3 left-5 font-dev-mono text-[10.5px] tracking-[0.12em] uppercase bg-dev-accent text-white px-2.5 py-1 rounded-full">
                                    {p.tag}
                                </span>
                            )}
                            <span className="font-dev-mono text-[11.5px] tracking-[0.14em] uppercase text-dev-ink-3">{p.label}</span>
                            <b className="text-[clamp(34px,3.4vw,44px)] font-bold tracking-[-0.04em] leading-none flex items-baseline gap-1 mt-1.5">
                                {period === 'y' ? p.y : p.m}
                                {p.m !== 'Custom' && <small className="text-[14px] font-medium text-dev-ink-3 tracking-normal">{period === 'y' ? '/yr' : '/mo'}</small>}
                            </b>
                            <span className="text-[14.5px] text-dev-ink-2">{p.desc}</span>
                            <span className="font-dev-mono text-[12px] text-dev-ink bg-dev-surface-2 px-2.5 py-2 rounded-lg mt-1">{p.tasks}</span>
                            <Link
                                href={p.href}
                                target={p.external ? '_blank' : undefined}
                                rel={p.external ? 'noopener' : undefined}
                                className={`inline-flex items-center justify-center gap-[10px] no-underline rounded-full font-semibold text-[15px] px-[18px] py-3 mt-2.5 transition-transform hover:-translate-y-px ${
                                    p.pop ? 'bg-dev-ink text-dev-ink-inv' : 'bg-transparent text-dev-ink border border-dev-line-2'
                                }`}
                            >
                                {p.cta}
                            </Link>
                        </div>
                    ))}
                </div>
                <OverageTicker />
            </section>
        </>
    );
}
