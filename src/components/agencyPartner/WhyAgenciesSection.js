import { Users, DollarSign, Layers, Gift, Infinity, Wallet } from 'lucide-react';

const agencyCards = [
    {
        title: '1. Unlimited Client Workspaces',
        description: 'One account, unlimited clients. Each gets a separate workspace.',
        icon: <Users size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
    {
        title: '2. Charge Whatever You Want',
        description: 'Set your own rates. No platform commission.',
        icon: <DollarSign size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
    {
        title: '3. Shared Task Pool',
        description: 'One shared pool across all clients. Use it where needed.',
        icon: <Layers size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
];

const referCards = [
    {
        title: '1. Earn Recurring Rewards',
        description: 'Refer businesses and earn rewards on every active customer.',
        icon: <Gift size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
    {
        title: '2. Lifetime Free Workspace',
        description: 'A free viaSocket workspace for life to build and test automations.',
        icon: <Infinity size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
    {
        title: '3. No Upfront Cost',
        description: 'Join free and start earning right away. No subscription or fees.',
        icon: <Wallet size={28} stroke="#A8200D" strokeWidth={1.5} />,
    },
];

export default function WhyAgenciesSection() {
    return (
        <section className="w-full bg-white py-20">
            <div className="container mx-auto px-5 md:px-8">
                {/* Agency Partner Plan */}
                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#A8200D]">
                            Agency Partner Plan
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-gray-200">
                        {agencyCards.map((card, i) => (
                            <div
                                key={i}
                                className={`group flex flex-col items-center text-center py-[52px] px-9 transition-colors duration-200
                                    ${i < agencyCards.length - 1 ? 'border-b md:border-b-0 md:border-r' : 'border-b-0 md:border-r-0'}
                                    border-gray-200
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

                {/* Refer & Earn */}
                <div className="relative mt-16">
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#A8200D]">
                            Refer & Earn
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200">
                        {referCards.map((card, i) => (
                            <div
                                key={i}
                                className={`group flex flex-col items-center text-center py-[52px] px-9 transition-colors duration-200
                                    ${i < referCards.length - 1 ? 'border-b md:border-b-0 md:border-r' : 'border-b-0 md:border-r-0'}
                                    border-gray-200
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
            </div>
        </section>
    );
}
