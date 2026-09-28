'use client';

import Link from 'next/link';
import { Timer, Gem, MessageCircle } from 'lucide-react';
import { Label, Scene } from '../Heading';
import { useReveal, revealClass } from '../useReveal';

const VALUES = [
    { Icon: Timer, title: 'Get live in under 15 minutes', copy: 'Copy the integration layer into your product and start building.' },
    { Icon: Gem, title: 'Pay as you go', copy: 'No large upfront commitment. Scale with actual usage.' },
    { Icon: MessageCircle, title: 'Slack support', copy: 'Get help when you need it.' },
];

function ValueCard({ Icon, title, copy }) {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} className={`grid gap-2.5 content-start p-5 rounded-2xl border border-dev-line bg-dev-surface ${revealClass(visible)}`}>
            <span className="w-[38px] h-[38px] rounded-[10px] bg-dev-surface-2 grid place-items-center text-dev-ink">
                <Icon size={18} strokeWidth={1.7} />
            </span>
            <b className="font-semibold text-[16.5px] tracking-[-0.01em]">{title}</b>
            <span className="text-dev-ink-2 text-[14.5px] leading-[1.45]">{copy}</span>
        </div>
    );
}

export function FastValues() {
    return (
        <Scene>
            <Label>Built to get you live fast</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {VALUES.map((v) => (
                    <ValueCard key={v.title} {...v} />
                ))}
            </div>
        </Scene>
    );
}

export function EnterpriseCta() {
    const [ref, visible] = useReveal();
    return (
        <Scene>
            <div ref={ref} className={`rounded-[22px] bg-dev-ink text-dev-ink-inv p-[clamp(28px,4vw,48px)] grid lg:grid-cols-[minmax(0,1.3fr)_auto] gap-[clamp(24px,4vw,48px)] items-center ${revealClass(visible)}`}>
                <div>
                    <h2 className="text-dev-ink-inv font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(28px,3.6vw,44px)] max-w-[18ch]">
                        Need more capacity or control?
                    </h2>
                    <p className="text-white/70 mt-3 max-w-[52ch]">For products with higher usage, security requirements, or custom infrastructure needs.</p>
                    <div className="flex flex-wrap gap-x-[18px] gap-y-2 mt-5 font-dev-mono text-[12px] tracking-[0.06em] uppercase text-white/75">
                        {['Custom limits', '99.9% SLA', 'SSO / SAML', 'Dedicated support', 'Custom deployment'].map((f) => (
                            <span key={f} className="before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full before:bg-dev-accent before:mr-2 before:align-middle">{f}</span>
                        ))}
                    </div>
                </div>
                <Link href="https://cal.id/team/viasocket/embed-viasocket" target="_blank" rel="noopener" className="inline-flex items-center gap-[10px] bg-dev-ink-inv text-dev-ink no-underline rounded-full font-semibold text-[15.5px] px-[22px] py-[14px] justify-self-start transition-transform hover:-translate-y-px">
                    Talk to sales
                </Link>
            </div>
        </Scene>
    );
}
