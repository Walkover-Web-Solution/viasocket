'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

const plans = [
    {
        name: 'BASIC PLAN',
        monthly: { price: '$39', period: '/month' },
        annual: { price: '$293', period: '/year', savings: 'Save $97 by switching to annual' },
        features: [
            { text: '5,000 tasks/month', included: true },
            { text: '2,000 AI credits included', included: true },
            { text: '1,500+ app connections', included: true },
            { text: 'All basic built-in tools', included: true },
            { text: 'Advanced AI models', included: false },
            { text: 'Team members', included: false },
            { text: 'Standard ticket support', included: true },
        ],
        ctaLink: '/signup?utm_source=pricing/basic',
        highlight: false,
    },
    {
        name: 'TEAM PLAN',
        monthly: { price: '$79', period: '/month' },
        annual: { price: '$593', period: '/year', savings: 'Save $197 by switching to annual' },
        features: [
            { text: '15,000 tasks/month', included: true },
            { text: '5,000 AI credits included', included: true },
            { text: 'Unlimited team members', included: true },
            { text: 'All basic built-in tools', included: true },
            { text: 'Advanced AI models', included: true },
            { text: '5-min polling interval', included: true },
            { text: 'Priority ticket support', included: true },
        ],
        ctaLink: '/signup?utm_source=pricing/team',
        highlight: true,
    },
    {
        name: 'ADVANCED PLAN',
        monthly: { price: '$99', period: '/month' },
        annual: { price: '$743', period: '/year', savings: 'Save $247 by switching to annual' },
        features: [
            { text: '25,000 tasks/month', included: true },
            { text: '10,000 AI credits included', included: true },
            { text: 'Unlimited team members', included: true },
            { text: 'All basic built-in tools', included: true },
            { text: 'Advanced AI models', included: true },
            { text: '1-min polling (real-time)', included: true },
            { text: 'Top priority queue', included: true },
            { text: 'One on One live expert support', included: true },
        ],
        ctaLink: '/signup?utm_source=pricing/advanced',
        highlight: false,
    },
];

function PlanCard({ plan, isAnnual }) {
    const pricing = isAnnual ? plan.annual : plan.monthly;

    return (
        <div className={`flex flex-col bg-white h-full ${plan.highlight ? 'border-2 border-accent' : 'border border-gray-200'}`}>
            <div className="flex flex-col gap-5 p-6 md:p-8 flex-1" style={plan.highlight ? { paddingTop: '2.5rem' } : {}}>
                <div className="flex flex-col gap-1">
                    <span className="text-xs tracking-widest text-gray-500">{plan.name}</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-black">{pricing.price}</span>
                        <span className="text-sm text-gray-500">{pricing.period}</span>
                    </div>
                    {isAnnual && (
                        <span className="text-sm text-green-600 font-medium">{plan.annual.savings}</span>
                    )}
                </div>

                <div className="border-t border-gray-200" />

                <ul className="flex flex-col gap-3 flex-1">
                    {plan.features.map((feature, i) => (
                        <li key={i} className={`flex items-center gap-2 text-sm ${feature.included ? 'text-gray-800' : 'text-gray-400'}`}>
                            {feature.included ? (
                                <Check size={15} className="text-green-600 shrink-0" strokeWidth={3} />
                            ) : (
                                <X size={15} className="text-gray-300 shrink-0" strokeWidth={3} />
                            )}
                            <span className={feature.included ? '' : 'line-through'}>{feature.text}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={plan.ctaLink}
                    className={`w-full mt-auto text-center ${plan.highlight ? 'btn btn-accent' : 'btn btn-outline'}`}
                >
                    Select Plan
                </Link>
            </div>
        </div>
    );
}

export default function PricingPlansClient() {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <div className="flex flex-col gap-8 w-full" id="pricingTabs">
            <div className="flex items-center justify-center">
                <div className="flex items-center bg-gray-100 p-1 border border-gray-200 rounded-full gap-1">
                    <button
                        onClick={() => setIsAnnual(false)}
                        className={`px-5 py-2 text-sm rounded-full transition-all whitespace-nowrap ${!isAnnual ? 'bg-white shadow text-black font-semibold' : 'text-gray-500'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setIsAnnual(true)}
                        className={`px-5 py-2 text-sm rounded-full transition-all whitespace-nowrap ${isAnnual ? 'bg-white shadow text-black font-semibold' : 'text-gray-500'}`}
                    >
                        Annual <span className={isAnnual ? 'text-green-600 font-semibold' : 'text-green-500'}>(Save 12%)</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {plans.map((plan) => (
                    <PlanCard key={plan.name} plan={plan} isAnnual={isAnnual} />
                ))}
            </div>

            <div className="flex items-center justify-center pt-2">
                <Link href="/signup" className="btn btn-primary">
                    Start Free Plan
                </Link>
            </div>
        </div>
    );
}
