'use client';
import { useState } from 'react';

const PLANS = {
    starter: {
        name: 'Solo',
        badge: '',
        price: '$399',
        desc: 'Perfect for solo automators getting started.',
        features: [
            '5,000 tasks/month',
            '2,000 AI credits',
            '1 team member',
            '2,200+ integrations',
            'All workflow templates',
            'Standard support',
            'Basic AI workflows',
            '15-min polling',
        ],
    },
    team: {
        name: 'Team',
        badge: 'MOST POPULAR',
        price: '$799',
        desc: 'Built for teams running automations daily.',
        features: [
            '15,000 tasks/month',
            '5,000 AI credits',
            'Unlimited workspaces',
            '2,200+ integrations',
            'All workflow templates',
            'Priority email support',
            'Advanced AI workflows',
            '5-min polling interval',
        ],
    },
    premium: {
        name: 'Premium',
        badge: 'PREMIUM',
        price: '$999',
        desc: 'For scale: real-time and unlimited team.',
        features: [
            '25,000 tasks/month',
            '10,000 AI credits',
            'Unlimited team members',
            '2,200+ integrations',
            'All workflow templates',
            '1-on-1 live expert support',
            'Advanced AI models',
            '1-min polling (real-time)',
        ],
    },
};

export default function Hero() {
    const [open, setOpen] = useState(false);
    const [planKey, setPlanKey] = useState('team');
    const plan = PLANS[planKey];

    return (
        <section id="hero" className="relative overflow-hidden py-20 lg:py-[110px]">
            {/* grid bg */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black_20%,transparent_90%)]"
            />
            {/* glow */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_40%_35%_at_50%_30%,rgba(168,32,13,0.10),transparent_70%)]"
            />

            <div className="relative z-10 container mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
                <div className="relative z-[2] flex flex-col items-start text-left max-w-[760px] min-w-0 flex-1">
                    <div className="inline-flex items-center gap-2.5 bg-white border border-black/10 rounded-full px-3.5 py-[7px] text-xs text-gray-500 mb-7 md:mb-6">
                        <span aria-hidden className="w-2 h-2 rounded-full bg-[#16A34A]" />
                        <span className="text-gray-900 font-bold tracking-[0.13em] text-[11px]">
                            LIMITED LIFETIME OFFER
                        </span>
                    </div>

                    <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-extrabold leading-[1.04] tracking-[-2px] md:tracking-[-2.2px] text-gray-900 m-0 mb-7">
                        Stop paying{' '}
                        <span className="font-bold relative inline-block mx-2">
                            $70/mo.
                            <span
                                className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 h-2 bg-[#A8200D] [transform:rotate(-4deg)] pointer-events-none"
                                aria-hidden
                            />
                        </span>
                        <br />
                        Pay <span className="text-accent">once</span>. Automate{' '}
                        <span className="text-accent">forever</span>.
                    </h1>

                    <p className="text-[17px] md:text-[18px] text-gray-500 leading-[1.65] max-w-[620px] m-0 mb-9">
                        One payment for viaSocket Team &mdash; instead of{' '}
                        <strong className="text-gray-900 font-bold">$840+ every single year</strong> to other automation 
                        tools
                        <br />
                        15,000 tasks &middot; 5,000 AI credits &middot; 2,200+ integrations included.
                    </p>

                    <div className="flex items-center gap-6 flex-wrap mb-8">
                        <a href="#pricing" className="btn btn-accent">
                            <span>Get Lifetime Access</span>
                            <span className="hidden sm:inline text-[13px] font-semibold opacity-90">from $399</span>
                            <span aria-hidden className="text-lg leading-none">
                                &rarr;
                            </span>
                        </a>
                        <a href="#pricing" className="text-gray-900 font-semibold text-[14.5px] hover:underline">
                            See what&rsquo;s inside
                        </a>
                    </div>

                    <div
                        className="flex items-center gap-[18px] md:gap-3 flex-wrap text-[14px] md:text-[13px] text-gray-500"
                        role="list"
                    >
                        {['30-day refund', 'One-time payment'].map((t, i) => (
                            <span key={t} className="contents">
                                <span role="listitem" className="inline-flex items-center gap-2 font-medium">
                                    <svg
                                        viewBox="0 0 16 16"
                                        className="w-3.5 h-3.5 flex-shrink-0"
                                        fill="none"
                                        stroke="#16A34A"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden
                                    >
                                        <polyline points="3 8 7 12 13 4" />
                                    </svg>
                                    {t}
                                </span>
                                {i === 0 && (
                                    <span aria-hidden className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                                )}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Pricing selector card */}
                <aside
                    className="relative group max-w-[480px] w-full justify-self-center lg:justify-self-end bg-white/70 backdrop-blur-2xl backdrop-saturate-150 border border-black/[0.06] rounded-[20px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03),0_12px_32px_-8px_rgba(0,0,0,0.08),0_24px_64px_-16px_rgba(0,0,0,0.10)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_16px_40px_-10px_rgba(0,0,0,0.10),0_32px_80px_-20px_rgba(0,0,0,0.14)] hover:-translate-y-0.5 transition-all duration-300"
                    aria-label="View pricing plans"
                >
                    {/* macOS chrome */}
                    <div
                        className="flex items-center gap-[7px] px-[18px] py-[13px] bg-[rgba(245,246,247,0.55)] border-b border-black/[0.05]"
                        aria-hidden
                    >
                        <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.06)]" />
                        <span className="w-[11px] h-[11px] rounded-full bg-[#FFBD2E] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.06)]" />
                        <span className="w-[11px] h-[11px] rounded-full bg-[#28C840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.06)]" />
                    </div>

                    <div className="relative px-6 pt-6 pb-7">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3.5 mb-[22px]">
                            <div>
                                <h3 className="text-[17px] font-bold text-gray-900 tracking-[-0.3px] mb-1">
                                    Choose your plan
                                </h3>
                                <p className="text-[12.5px] text-gray-500 tracking-[-0.1px]">
                                    One-time payment. Lifetime access.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-[5px] bg-[rgba(47,108,176,0.09)] text-[#2F6CB0] rounded-full text-[11.5px] font-semibold whitespace-nowrap">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="12"
                                    height="12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden
                                >
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                    <line x1="7" y1="7" x2="7.01" y2="7" />
                                </svg>
                                No recurring billing
                            </span>
                        </div>

                        {/* Plan dropdown */}
                        <div className="relative mb-5">
                            <button
                                type="button"
                                onClick={() => setOpen((o) => !o)}
                                aria-expanded={open}
                                aria-haspopup="listbox"
                                className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-black/10 rounded-xl hover:border-black/20 transition-colors"
                            >
                                <span className="text-gray-700" aria-hidden>
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="20"
                                        height="20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <polyline points="17 11 19 13 23 9" />
                                    </svg>
                                </span>
                                <span className="flex-1 text-left text-[15px] font-semibold text-gray-900">
                                    {plan.name}
                                </span>
                                <svg
                                    className={`transition-transform ${open ? 'rotate-180' : ''}`}
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            {open && (
                                <ul
                                    role="listbox"
                                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/10 rounded-xl shadow-lg overflow-hidden z-20"
                                >
                                    {Object.entries(PLANS).map(([key, p]) => (
                                        <li
                                            key={key}
                                            role="option"
                                            aria-selected={planKey === key}
                                            onClick={() => {
                                                setPlanKey(key);
                                                setOpen(false);
                                            }}
                                            className={`px-4 py-2.5 text-[14.5px] cursor-pointer hover:bg-gray-50 ${planKey === key ? 'font-semibold text-accent' : 'text-gray-800'}`}
                                        >
                                            {p.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Plan details */}
                        {plan.badge && (
                            <span className="inline-block px-2.5 py-1 bg-accent/10 text-accent text-[11px] font-bold tracking-wider rounded mb-3">
                                {plan.badge}
                            </span>
                        )}

                        <div className="flex items-baseline gap-2.5 mb-2">
                            <span className="text-[48px] font-extrabold leading-none tracking-[-1.5px] text-gray-900">
                                {plan.price}
                            </span>
                            <span className="text-[13px] font-semibold text-accent">one-time payment</span>
                        </div>

                        <p className="text-[14px] text-gray-500 mb-5">{plan.desc}</p>

                        <div className="h-px bg-black/[0.06] mb-5" aria-hidden />

                        <ul className="space-y-2.5 mb-6">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-center gap-3 text-[14px] text-gray-800">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-4 h-4 flex-shrink-0 text-accent"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-end">
                            <a
                                href="#pricing"
                                aria-label="Continue with selected plan"
                                className="w-12 h-12 rounded-full border border-accent/30 text-accent flex items-center justify-center group-hover:bg-[#A8200D] group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-[18px] h-[18px]"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden
                                >
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="9 7 17 7 17 15" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}
