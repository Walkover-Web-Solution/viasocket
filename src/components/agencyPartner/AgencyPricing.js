import Link from 'next/link';

const stats = [
    { value: '250K', label: 'tasks per month, shared across all client workspaces' },
    { value: '100%', label: 'of revenue retained. No commissions, no splits.' },
    { value: '100K', label: 'AI credits included per month.' },
];

const includedItems = [
    'Unlimited workspace creation',
    '250,000 tasks / month',
    '100,000 AI credits included',
    'All premium features included',
    '1-on-1 live support',
    '$0.00021 per task overage',
];

const AgencyPricing = () => {
    return (
        <section id="pricing" className="w-full bg-white py-20">
            <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                {/* Left Content */}
                <div className="flex-1 max-w-lg">
                    <h2 className="h2 mb-5" style={{fontWeight: 900}}>
                        One plan.
                        <br />
                        Everything included.
                    </h2>
                    <p className="text-gray-600 text-base mb-10 max-w-md leading-relaxed">
                        No per-seat fees, no workspace charges, no revenue splits.
                        One flat rate for your whole practice.
                    </p>

                    <div className="divide-y divide-gray-200 border-t border-gray-200">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex items-center gap-6 py-5">
                                <span className="text-[42px] font-bold text-gray-300 leading-none w-28 shrink-0">
                                    {stat.value}
                                </span>
                                <span className="text-sm text-gray-500 leading-snug">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Card */}
                <div className="w-full lg:w-[440px] flex-shrink-0">
                    <div className="relative">
                        {/* Badge */}
                        <span className="absolute -top-4 left-6 z-10 inline-block text-xs font-semibold text-white bg-[#111] rounded-full px-4 py-1.5">
                            25% partner discount
                        </span>

                        <div className="bg-[#FAF9F6] rounded-2xl p-5 pt-7">
                            {/* Plan Name */}
                            <p className="text-[11px] font-bold tracking-[0.15em] text-[#A8200D] uppercase mb-4">
                                Agency Partner Plan
                            </p>

                            {/* Pricing */}
                            <div className="mb-1">
                                <span className="text-gray-400 text-base line-through">$350</span>
                            </div>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-[64px] font-bold text-gray-900 leading-none">$250</span>
                                <span className="text-gray-500 text-base ml-1">/month</span>
                            </div>
                            <p className="text-gray-500 text-sm mb-4 mt-1">Billed monthly. Cancel anytime.</p>

                            {/* CTA Button */}
                            <Link
                                href="https://buy.stripe.com/aFafZhgBudT51oZbvR2go15"
                                className="flex items-center justify-center w-full bg-[#A8200D] hover:bg-[#8B1A0C] text-white font-semibold text-sm rounded-full py-3 px-6 transition-colors mb-5"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Become a Partner
                            </Link>

                            {/* Divider */}
                            <div className="border-t border-[#e8e6e0] pt-4">
                                <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-4">
                                    What&apos;s Included
                                </p>

                                <ul className="space-y-2">
                                    {includedItems.map((item, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-[#A8200D] flex-shrink-0"></span>
                                            <span className="text-gray-800 text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
};

export default AgencyPricing;
