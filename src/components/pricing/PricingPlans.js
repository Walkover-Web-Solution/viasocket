'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Info } from 'lucide-react';

const ALLOWANCE_NOTE =
    'Tasks and AI credits are separate monthly allowances; the worth figure counts each AI credit as 4 tasks.';

const plans = [
    {
        id: 'free',
        name: 'Free',
        monthly: 0,
        annual: 0,
        worth: '12,000',
        allowances: ['10,000 standard tasks', '500 AI credits'],
        features: ['1 member', 'Docs & community support'],
        cta: 'Continue with free plan',
        ctaClass: 'btn-outline',
        track: 'pricing_plan_free',
    },
    {
        id: 'team',
        name: 'Team',
        badge: 'Most popular',
        highlight: true,
        monthly: 27,
        annual: 18,
        worth: '27,000',
        allowances: ['17,000 standard tasks', '2,500 AI credits'],
        features: [
            'Up to 10 members',
            'Shared team workspace',
            'Email & chat support',
            'Pay as you scale: $0.0025/task, $0.007/AI credit',
        ],
        cta: 'Upgrade Plan',
        ctaClass: 'btn-accent',
        track: 'pricing_plan_team',
    },
    {
        id: 'premium',
        name: 'Premium',
        monthly: 99,
        annual: 67,
        worth: '80,000',
        allowances: ['40,000 standard tasks', '10,000 AI credits'],
        features: [
            'Unlimited members',
            'SSO & advanced permissions',
            'Priority 1:1 support',
            'Setup help from automation experts',
            'Pay as you scale: $0.0004/task, $0.002/AI credit',
        ],
        cta: 'Upgrade Plan',
        ctaClass: 'btn-outline',
        track: 'pricing_plan_premium',
    },
];

export default function PricingPlans() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section className="bg-gray-50" id="plans">
            <div className="container px-12 pb-12 lg:pb-20 pt-[104px]">
                <h2 className="h2 text-center">Start free. Upgrade when your team does.</h2>

                <div className="flex items-center justify-center gap-2 mt-8">
                    <div className="inline-flex items-center rounded-full border border-gray-200 p-1 bg-white">
                        <button
                            type="button"
                            aria-pressed={!isAnnual}
                            onClick={() => setIsAnnual(false)}
                            className={`rounded-full text-sm px-4 py-1.5 transition-colors ${
                                isAnnual ? 'text-[#6b7280] hover:text-black' : 'bg-black text-white'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            type="button"
                            aria-pressed={isAnnual}
                            onClick={() => setIsAnnual(true)}
                            className={`rounded-full text-sm px-4 py-1.5 transition-colors ${
                                isAnnual ? 'bg-black text-white' : 'text-[#6b7280] hover:text-black'
                            }`}
                        >
                            Annual
                        </button>
                    </div>
                    <span className="bg-green-100 text-green-600 text-xs rounded-full px-3 py-1">Save 33%</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
                    {plans.map((plan) => {
                        const price = isAnnual ? plan.annual : plan.monthly;

                        return (
                            <div
                                key={plan.id}
                                className={`bg-white border rounded-2xl p-8 flex flex-col shadow-sm ${
                                    plan.highlight ? 'border-accent' : 'border-gray-300'
                                }`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <span className="text-lg font-semibold">{plan.name}</span>
                                    {plan.badge && (
                                        <span className="bg-accent text-white text-xs rounded-full px-3 py-1">
                                            {plan.badge}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-semibold">${price}</span>
                                        <span className="text-sm text-[#6b7280]">/mo</span>
                                    </div>
                                    <div className="text-sm text-[#6b7280] mt-1 min-h-5">
                                        {isAnnual && price > 0 ? 'Billed annually' : ''}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="flex items-center gap-1.5 font-semibold">
                                        <span>Worth {plan.worth} tasks/mo</span>
                                        <span title={ALLOWANCE_NOTE} className="inline-flex">
                                            <Info size={16} className="text-[#6b7280] shrink-0" />
                                        </span>
                                    </div>
                                    <div className="text-sm text-[#6b7280] mt-2">
                                        {plan.allowances.map((allowance) => (
                                            <div key={allowance}>{allowance}</div>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-xs uppercase tracking-wide text-[#6b7280] mt-6 mb-3">
                                    What&apos;s included
                                </div>
                                <ul className="flex flex-col gap-2">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm">
                                            <Check size={16} className="text-green-600 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-6">
                                    <Link
                                        href="/signup"
                                        className={`btn w-full ${plan.ctaClass}`}
                                        data-track={plan.track}
                                        data-track-section="pricing_plans"
                                        data-track-action="signup_click"
                                        data-track-destination="/signup"
                                    >
                                        {plan.cta}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p className="text-sm text-[#6b7280] mt-8 text-center">
                    Running an agency? Agency plan: $250/mo, 250,000 tasks and 100,000 AI credits.{' '}
                    <Link
                        href="https://cal.id/team/viasocket/sales-team"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="text-accent hover:underline"
                        data-track="pricing_agency_talk_to_us"
                        data-track-section="pricing_plans"
                        data-track-action="sales_click"
                        data-track-destination="https://cal.id/team/viasocket/sales-team"
                    >
                        Talk to us
                    </Link>
                    .
                </p>
                <p className="text-xs text-[#6b7280] mt-3 max-w-3xl mx-auto text-center">{ALLOWANCE_NOTE}</p>
            </div>
        </section>
    );
}
