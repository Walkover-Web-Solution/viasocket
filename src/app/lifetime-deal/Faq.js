'use client';

import { useState } from 'react';

const FAQS = [
    {
        q: 'Is this really a one-time payment?',
        a: <p>Yes. $250 once. No monthly bill, no annual renewal, no auto-charges.</p>,
    },
    {
        q: 'What counts as a “task”?',
        a: (
            <p>
                A task is one action step in a workflow when it executes successfully. Triggers and internal logic steps
                (conditions, formatters, filters) don’t count against your task limit.
            </p>
        ),
    },
    {
        q: 'Can I buy multiple lifetime licenses?',
        a: <p>One lifetime license per customer during this offer. Each license is tied to a single account.</p>,
    },
    {
        q: 'What counts as an “AI credit”?',
        a: (
            <p>
                One AI credit is one AI action call — summarizing, classifying, generating, or extracting content using
                our built-in models.
            </p>
        ),
    },
    {
        q: 'Refunds?',
        a: <p>Full refund within 30 days, no questions asked. After 30 days the purchase is final.</p>,
    },
    {
        q: 'What if I exceed 15,000 tasks or 5,000 credits?',
        a: <p>Add extra tasks or credits anytime, at standard rates. Your lifetime access doesn’t change.</p>,
    },
    {
        q: 'Is this offer coming back?',
        a: <p>This is a one-time launch offer for early adopters. We have no plans to repeat it at this price point.</p>,
    },
    {
        q: 'Will I get future features?',
        a: (
            <p>
                Yes. All future updates to the Team plan are included — new triggers, integrations, AI models, and
                workflow tools.
            </p>
        ),
    },
    {
        q: 'Can I upgrade to Premium later?',
        a: <p>Yes. You can move to a Premium plan anytime — your lifetime credit applies toward the difference.</p>,
    },
    {
        q: 'What if viaSocket shuts down?',
        a: (
            <p>
                “Lifetime” means for as long as viaSocket operates. We’re profitable, growing, and built for the long
                term — but we want to be honest about what lifetime can promise.
            </p>
        ),
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);

    const svgCommon = 'w-4 h-4 text-[#a8200d] fill-none stroke-current [stroke-width:1.8] [stroke-linecap:round] [stroke-linejoin:round]';

    return (
        <section
            className="bg-[#fafafa] border-t border-black/[0.08] py-[72px] md:py-[104px] md:pb-24"
            id="faq"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="inline-block text-[#a8200d] text-[11px] font-bold tracking-[0.16em] uppercase mb-[22px]">
                        FAQs
                    </div>
                    <h2 className="text-[34px] md:text-[42px] lg:text-[52px] font-extrabold leading-[1.1] tracking-[-0.6px] md:tracking-[-1px] lg:tracking-[-1.3px] text-[#111] mb-7">
                        Questions buyers ask before they <span className="text-[#a8200d]">commit.</span>
                    </h2>

                    <div className="inline-flex flex-wrap md:flex-nowrap items-center p-3 md:p-1.5 lg:p-2 bg-white border border-black/[0.08] rounded-2xl md:rounded-[100px] mb-14 gap-2 md:gap-0">
                        {[
                            {
                                icon: (
                                    <svg viewBox="0 0 24 24" className={svgCommon}>
                                        <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" />
                                        <polyline points="9 12 11.2 14.2 15 10.4" />
                                    </svg>
                                ),
                                label: '30-day refund policy',
                            },
                            {
                                icon: (
                                    <svg viewBox="0 0 24 24" className={svgCommon}>
                                        <circle cx="12" cy="12" r="9" />
                                        <polyline points="9 12 11.5 14.5 16 10" />
                                    </svg>
                                ),
                                label: 'One-time payment',
                            },
                            {
                                icon: (
                                    <svg viewBox="0 0 24 24" className={svgCommon}>
                                        <rect x="3" y="8" width="18" height="13" rx="2" />
                                        <path d="M3 12h18M12 8v13M8 5a2 2 0 0 1 4 0c0 1.5-1 3-2 3-1 0-2-1.5-2-3M16 5a2 2 0 0 0-4 0c0 1.5 1 3 2 3 1 0 2-1.5 2-3" />
                                    </svg>
                                ),
                                label: 'Future Team updates included',
                            },
                        ].map((pill, idx) => (
                            <span
                                key={idx}
                                className={`inline-flex items-center gap-2.5 py-1.5 px-3.5 md:px-[14px] lg:px-[18px] text-[12.5px] lg:text-[13px] text-[#111] tracking-[-0.1px] font-medium relative w-full md:w-auto justify-start md:justify-center ${
                                    idx > 0 ? 'md:before:content-[""] md:before:absolute md:before:left-0 md:before:top-[18%] md:before:bottom-[18%] md:before:w-px md:before:bg-black/[0.08]' : ''
                                }`}
                            >
                                {pill.icon}
                                {pill.label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2.5 px-4 md:px-0">
                    {FAQS.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`rounded-[18px] border transition-all duration-300 ease-in-out ${
                                    isOpen
                                        ? 'bg-[#a8200d]/[0.018] border-[#a8200d]/20 shadow-[0_2px_12px_rgba(168,32,13,0.05)]'
                                        : 'bg-white border-black/[0.08] hover:border-black/[0.12] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                                }`}
                            >
                                <button
                                    className="w-full bg-transparent border-none py-5 px-[22px] md:py-6 md:px-7 flex items-center justify-between gap-5 cursor-pointer text-left text-[#111]"
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-[15.5px] font-semibold tracking-[-0.25px] leading-[1.35]">
                                        {item.q}
                                    </span>
                                    <span
                                        className={`w-8 h-8 rounded-full inline-flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                            isOpen ? 'bg-[#a8200d] text-white' : 'bg-[#f2f2f2] text-[#111]'
                                        }`}
                                        aria-hidden="true"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-3.5 h-3.5 fill-none stroke-current [stroke-width:2.2] [stroke-linecap:round] [stroke-linejoin:round]"
                                        >
                                            {isOpen ? (
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            ) : (
                                                <>
                                                    <line x1="12" y1="5" x2="12" y2="19" />
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                </>
                                            )}
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-[grid-template-rows] duration-[340ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-[22px] pb-[22px] md:px-7 md:pb-[26px] text-[14.5px] text-[#555] tracking-[-0.1px] leading-[1.7] [&_p]:m-0 [&_p+p]:mt-2">
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
