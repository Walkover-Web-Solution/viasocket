'use client';

import { Lock, Shield, Globe, Heart, Gift, Headphones } from 'lucide-react';

export default function PerkGrid() {
    const perks = [
        {
            id: 1,
            title: 'No lock-in, ever',
            description: 'Pay-as-you-go with no contracts. Scale up or down whenever you need to.',
            icon: <Lock size={26} strokeWidth={1.8} />,
        },
        {
            id: 2,
            title: 'Fair usage, no hard caps',
            description: "We don't throttle you with rigid limits, just responsible-use guidelines.",
            icon: <Shield size={26} strokeWidth={1.8} />,
        },
        {
            id: 3,
            title: 'Regional (PPP) pricing',
            description: '50% off for developing nations, applied automatically by country.',
            icon: <Globe size={26} strokeWidth={1.8} />,
        },
        {
            id: 4,
            title: '3x usage for impact orgs',
            description: 'Nonprofits, students, and educators can unlock 3x the free plan.',
            icon: <Heart size={26} strokeWidth={1.8} />,
        },
        {
            id: 5,
            title: 'Bonus credits on top-up',
            description: 'Get 50% extra credit free whenever you buy additional credits.',
            icon: <Gift size={26} strokeWidth={1.8} />,
        },
        {
            id: 6,
            title: 'Free expert help',
            description: 'Automation experts can build your workflows for a one-time fee.',
            icon: <Headphones size={26} strokeWidth={1.8} />,
        },
    ];

    return (
        <section
            id="features"
            className="container p-12 lg:py-20"
        >
            <div className="flex items-center justify-center gap-2 text-center mb-8">
                <h2 className="h2">
                    Why does viaSocket <span className="text-accent">pricing feel fair?</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 relative mt-8">
                    {perks.map((perk, index) => (
                        <div key={perk.id} className="relative px-[14px] py-9 text-center">
                            {/* Right border with gradient - only on lg screens */}
                            {(index + 1) % 3 !== 0 && (
                                <div
                                    className="absolute top-[10%] bottom-[10%] right-0 w-px hidden lg:block"
                                    style={{
                                        background:
                                            'linear-gradient(to bottom, transparent, var(--custom-border, #d1d5db) 20%, var(--custom-border, #d1d5db) 80%, transparent)',
                                    }}
                                />
                            )}

                            {/* Bottom border with gradient - on all cards except last 3 on lg screens */}
                            <div
                                className={`absolute left-[8%] right-[8%] bottom-0 h-px ${index >= 3 ? 'hidden lg:block' : ''}`}
                                style={{
                                    background:
                                        'linear-gradient(to right, transparent, var(--custom-border, #d1d5db) 20%, var(--custom-border, #d1d5db) 80%, transparent)',
                                }}
                            />

                            {/* Icon */}
                            <div className="text-black flex items-center justify-center mx-auto mb-5">{perk.icon}</div>

                            {/* Title */}
                            <h3 className="text-[17px] font-bold mb-2.5 text-black">
                                <span className="pnum">{perk.id}.</span> {perk.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[#6b6b6b] text-sm leading-[1.55] max-w-[30ch] mx-auto">
                                {perk.description}
                            </p>
                        </div>
                    ))}
                </div>
        </section>
    );
}
