import Link from 'next/link';
import { Users, DollarSign, Zap, TrendingUp } from 'lucide-react';

const whyCards = [
    {
        title: 'Unlimited Client Workspaces',
        description:
            'Unlimited client workspaces under one partner account. No separate logins, no per-client overhead.',
        Icon: Users,
    },
    {
        title: 'Keep all the revenue you earn',
        description: 'Set your own rates and keep every dollar. No commissions, no revenue sharing, ever.',
        Icon: DollarSign,
    },
    {
        title: 'All tools, zero restrictions',
        description:
            'Real-time automations, advanced AI, and priority processing all included. No add-ons or upgrades needed.',
        Icon: Zap,
    },
    {
        title: 'Scales with your growth',
        description:
            'Pay only for tasks used. No seat fees, no workspace limits, and a direct line to our team whenever you need it.',
        Icon: TrendingUp,
    },
];

export default function WhyAgenciesSection() {
    return (
        <section className="w-full bg-white py-20">
            <div className="container mx-auto px-5 md:px-8 py-12 bg-white">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                    <div>
                        <h2 className="h2 mb-2">Why agencies choose viaSocket</h2>
                        <p className="text-[#555] text-[15px] leading-relaxed">
                            Built for consultants, agencies, and freelancers delivering automation services at scale.
                        </p>
                    </div>
                    <Link href="#pricing" className="btn btn-accent whitespace-nowrap self-start md:self-center">
                        Get Partner Access
                    </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {whyCards.map((card, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-start rounded-2xl bg-[#faf9f6] p-7 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-lg border border-[#e8ddd1] bg-accent-100 flex items-center justify-center mb-5">
                                <card.Icon size={20} strokeWidth={1.5} className="text-[#A8200D]" />
                            </div>
                            <h3 className="text-[16px] font-bold text-[#111] mb-2 leading-snug">{card.title}</h3>
                            <p className="text-[14px] leading-[1.65] text-[#555]">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
