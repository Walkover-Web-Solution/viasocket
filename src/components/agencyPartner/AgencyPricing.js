import Link from 'next/link';

const AgencyPricing = () => {
    const featuresLeft = [
        'No revenue sharing. Keep 100% of what you charge.',
        'One shared task pool across all client workspaces.',
        '$0.00021 per task beyond your monthly limit.',
        'Includes 1-on-1 live support.',
    ];

    const includedItems = [
        'Unlimited Workspace Creation',
        '250,000 tasks / month',
        '100,000 AI credits included',
        'All basic built-in tools',
        'Advanced AI models',
        '1-min polling',
    ];

    return (
        <section id="pricing" className="max-w-6xl mx-auto px-4 py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                {/* Left Content */}
                <div className="flex-1 max-w-xl">
                    <h2 className="h2 mb-4">
                        One plan.
                        <br />
                        Everything included.
                    </h2>
                    <p className="text-gray-600 text-base mb-8 max-w-md">
                        No per-seat fees, no per-workspace charges, no surprises. One flat rate that scales with your
                        task usage.
                    </p>

                    <ul className="space-y-4">
                        {featuresLeft.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-[#A8200D] mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-gray-700 text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Card */}
                <div className="w-full lg:w-[420px] flex-shrink-0">
                    <div className="relative bg-[#fafafa] rounded-2xl p-6 pt-8 border border-gray-200">
                        {/* Badge */}
                        <span className="absolute -top-3 left-6 inline-block text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1">
                            25% partner discount
                        </span>

                        {/* Plan Name */}
                        <p className="text-[11px] font-bold tracking-[0.15em] text-[#A8200D] uppercase mb-2">
                            Agency Partner Plan
                        </p>

                        {/* Pricing */}
                        <div className="mb-1">
                            <span className="text-gray-400 text-base line-through">$350</span>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-5xl font-bold text-gray-900">$250</span>
                            <span className="text-gray-500 text-base">/month</span>
                        </div>
                        <p className="text-gray-500 text-xs mb-6">Billed monthly. Cancel anytime.</p>

                        {/* CTA Button */}
                        <Link
                            href="https://buy.stripe.com/fZuaEXfxqg1daZz8jF2go13"
                            className="btn btn-accent mb-8 w-full"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Become a Partner
                        </Link>

                        {/* Divider */}
                        <div className="border-t border-gray-200 pt-6">
                            <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-4">
                                What&apos;s Included
                            </p>

                            <ul className="space-y-3">
                                {includedItems.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#A8200D] flex-shrink-0"></span>
                                        <span className="text-gray-800 text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AgencyPricing;
