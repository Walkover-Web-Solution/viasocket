import { Users, DollarSign, Layers, Star, Headphones, BarChart3 } from 'lucide-react';

const whyCards = [
    {
        title: '1. Unlimited Client Workspaces',
        description: 'Manage every client from one partner account with dedicated workspaces for each business.',
        icon: <Users size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
    {
        title: '2. Keep 100% of What You Charge',
        description: 'Set your own pricing, package your services your way, and keep every dollar you earn.',
        icon: <DollarSign size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
    {
        title: '3. Shared Task Pool',
        description: 'All client workspaces draw from a single shared task pool, with no per-workspace limits.',
        icon: <Layers size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
    {
        title: '4. Premium Features Included',
        description: 'Access real-time automations, advanced AI, priority processing, and every premium feature.',
        icon: <Star size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
    {
        title: '5. Dedicated Partner Support',
        description:
            'Get direct access to our team with fast, personalized support and expert guidance whenever you need it.',
        icon: <Headphones size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
    {
        title: '6. Pricing Built for Agencies',
        description: 'Pay for usage, not seats, clients, or workspaces. Scale without unpredictable costs.',
        icon: <BarChart3 size={28} stroke="#A8200D" strokeWidth={1.5} />,
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
