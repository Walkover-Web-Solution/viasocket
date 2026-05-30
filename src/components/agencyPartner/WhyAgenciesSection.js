import React from 'react';

const whyCards = [
    {
        title: '1. Unlimited Client Workspaces',
        description: 'Manage every client from one partner account with dedicated workspaces for each business.',
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A8200D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: '2. Keep 100% of What You Charge',
        description: 'Set your own pricing, package your services your way, and keep every dollar you earn.',
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A8200D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
    },
    {
        title: '3. Shared Task Pool',
        description: 'All client workspaces draw from a single shared task pool, with no per-workspace limits.',
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A8200D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
            </svg>
        ),
    },
    {
        title: '4. Premium Features Included',
        description: 'Access real-time automations, advanced AI, priority processing, and every premium feature.',
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A8200D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ),
    },
    {
        title: '5. Dedicated Partner Support',
        description:
            'Get direct access to our team with fast, personalized support and expert guidance whenever you need it.',
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A8200D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
        ),
    },
    {
        title: '6. Pricing Built for Agencies',
        description: 'Pay for usage, not seats, clients, or workspaces. Scale without unpredictable costs.',
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A8200D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
    },
];

export default function WhyAgenciesSection() {
    return (
        <section className="w-full bg-white py-24 pb-28 mt-16">
            <div className="container mx-auto px-5 md:px-8">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-[72px]">
                    <h2 className="text-[clamp(30px,4vw,52px)] font-bold leading-[1.08] tracking-[-0.02em] text-[#111] mb-4">
                        Why Agencies Choose viaSocket
                    </h2>
                    <p className="max-w-[640px] text-[17px] leading-[1.6] text-[#555]">
                        Built for agencies, consultants, and freelancers delivering automation services at scale.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200">
                    {whyCards.map((card, i) => (
                        <div
                            key={i}
                            className={`group flex flex-col items-center text-center py-[52px] px-9 transition-colors duration-200
                ${i < 5 ? 'border-b' : 'border-b-0'} border-gray-200
                ${i === 0 || i === 1 || i === 3 || i === 4 ? 'md:border-r' : ''}
                ${i === 2 || i === 5 ? 'md:border-r-0' : ''}
                ${i >= 3 ? 'md:border-b' : 'md:border-b'}
              `}
                        >
                            <div className="w-16 h-16 rounded-[14px] flex items-center justify-center mb-5 transition-colors duration-200 group-hover:bg-[#a8200d]/[0.07]">
                                {card.icon}
                            </div>
                            <h3
                                className="text-[17px] font-bold leading-[1.3] text-[#111] mb-[10px]"
                                style={{ fontFamily: 'Inter Tight, sans-serif' }}
                            >
                                {card.title}
                            </h3>
                            <p className="text-[14px] leading-[1.65] text-[#555] max-w-[260px]">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
