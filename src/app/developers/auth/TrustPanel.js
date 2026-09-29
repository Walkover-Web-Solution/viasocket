'use client';

import { useReveal, revealClass } from '../useReveal';

const CELLS = [
    ['SOC 2 (Type II)', "Your users' data is handled with the highest level of security, privacy, and confidentiality."],
    ['ISO certified', 'We consistently meet international standards to deliver reliable and secure solutions for your business.'],
    ['GDPR & CCPA compliance', 'Your data remains private and entirely under your control, at all times.'],
    ['End-to-end observability', 'Gain full visibility into every action with detailed audit logs, real-time analytics, and proactive alerts.'],
    ['99.99% uptime & enterprise SLA', 'Stay worry-free with 99.99% uptime and fast, reliable support when you need it most.'],
    ['Error handling & recovery', 'Stay ahead of issues with smart alerts and AI-powered troubleshooting, keeping your actions running smoothly.'],
];

export default function TrustPanel() {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} className={`rounded-[22px] bg-[#3F6E5B] text-white p-[clamp(24px,4vw,44px)] grid gap-[clamp(20px,3vw,32px)] ${revealClass(visible)}`}>
            <div className="grid sm:grid-cols-[minmax(0,1fr)_auto] gap-6 items-start">
                <div>
                    <h2 className="text-white font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(26px,3.4vw,42px)] max-w-[22ch]">
                        viaSocket is the trusted choice for a secure action layer
                    </h2>
                    <p className="text-white/80 text-[16px] mt-2.5 max-w-[70ch]">
                        Your data is safe with us — compliant, secure, and built with privacy in mind at every step, so you can run actions with confidence.
                    </p>
                </div>
                <div className="flex gap-3.5">
                    <span className="w-[84px] h-[84px] rounded-full border-2 border-white/60 bg-white/10 grid place-content-center text-center leading-[1.05] gap-0.5">
                        <small className="font-dev-mono text-[8.5px] tracking-[0.08em] uppercase text-white/80">AICPA</small>
                        <b className="text-[17px] font-bold tracking-[-0.02em]">SOC 2</b>
                        <small className="font-dev-mono text-[8.5px] tracking-[0.08em] uppercase text-white/80">Type II</small>
                    </span>
                    <span className="w-[84px] h-[84px] rounded-full border-2 border-white/60 bg-white/10 grid place-content-center text-center leading-[1.05] gap-0.5">
                        <small className="font-dev-mono text-[8.5px] tracking-[0.08em] uppercase text-white/80">Certified</small>
                        <b className="text-[17px] font-bold tracking-[-0.02em]">ISO</b>
                        <small className="font-dev-mono text-[8.5px] tracking-[0.08em] uppercase text-white/80">27001 : 2022</small>
                    </span>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 border border-white/55">
                {CELLS.map(([title, copy], i) => (
                    <div key={title} className="p-[clamp(22px,3vw,40px)_clamp(18px,2.4vw,32px)] border-r border-b border-white/55 grid gap-2 content-start min-h-[150px] [&:nth-child(3n)]:border-r-0 last:border-b-0">
                        <b className="text-[clamp(18px,1.7vw,22px)] font-semibold tracking-[-0.02em] leading-[1.2]">{title}</b>
                        <p className="text-white/80 text-[15px] leading-[1.45] m-0">{copy}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
