'use client';

import { Lock, Layers, TrendingUp, Cpu, Link, CreditCard, Headphones, Check, X } from 'lucide-react';

export default function ExperienceComparison() {
    const comparisons = [
        {
            id: 1,
            label: 'Feature Access',
            icon: <Lock size={18} strokeWidth={1.8} />,
            others: 'Core features locked',
            viaSocket: 'Every feature, from day one',
        },
        {
            id: 2,
            label: 'Plans',
            icon: <Layers size={18} strokeWidth={1.8} />,
            others: 'More plans, more confusion',
            viaSocket: 'Simple pricing that scales',
        },
        {
            id: 3,
            label: 'How You Scale',
            icon: <TrendingUp size={18} strokeWidth={1.8} />,
            others: 'Pay upfront',
            viaSocket: 'Pay when your business grows',
        },
        {
            id: 4,
            label: 'AI',
            icon: <Cpu size={18} strokeWidth={1.8} />,
            others: 'Premium add-on',
            viaSocket: 'AI built into every plan',
        },
        {
            id: 5,
            label: 'Builder',
            icon: <Link size={18} strokeWidth={1.8} />,
            others: 'Complex setup',
            viaSocket: 'AI-powered workflow builder',
        },
        {
            id: 6,
            label: 'Billing',
            icon: <CreditCard size={18} strokeWidth={1.8} />,
            others: 'Unexpected overage charges',
            viaSocket: 'Transparent, predictable pricing',
        },
        {
            id: 7,
            label: 'Support',
            icon: <Headphones size={18} strokeWidth={1.8} />,
            others: 'Slow ticket queues',
            viaSocket: 'Real experts who actually help',
        },
    ];

    return (
        <section className="bg-white">
            <div className="container p-12 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                    {/* Left side - Heading */}
                    <div className="lg:w-[360px] flex-shrink-0 flex flex-col gap-4">
                        <h2 className="h2">Compare the experience, not just the features.</h2>
                        <p className="sub-heading1">
                            Most platforms make you pay more to unlock value. We believe you should get everything you
                            need from day one.
                        </p>
                    </div>

                    {/* Right side - Comparison table */}
                    <div className="flex-1">
                        {/* Table header */}
                        <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 pb-3 border-b border-[#e5e7eb]">
                            <div></div>
                            <div className="text-sm font-medium text-[#6b7280]">Most platforms</div>
                            <div className="text-sm font-medium text-accent">viaSocket</div>
                        </div>

                        {/* Table rows */}
                        <div className="flex flex-col">
                            {comparisons.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-5 border-b border-[#e5e7eb] items-center"
                                >
                                    {/* Feature label with icon */}
                                    <div className="flex items-center gap-2 text-[#222222] text-sm font-medium">
                                        <span className="text-[#6b7280]">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </div>

                                    {/* Most platforms */}
                                    <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                        <span className="inline-flex items-center justify-center w-5 h-5 text-red-500 border border-red-50 bg-red-100 rounded-full p-1">
                                            <X size={14} strokeWidth={2.5} />
                                        </span>
                                        <span>{item.others}</span>
                                    </div>

                                    {/* viaSocket */}
                                    <div className="flex items-center gap-2 text-sm text-[#222222]">
                                        <span className="inline-flex items-center justify-center w-5 h-5 text-green-500 border border-green-50 bg-green-100 rounded-full p-1">
                                            <Check size={14} strokeWidth={2.5} />
                                        </span>
                                        <span>{item.viaSocket}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
