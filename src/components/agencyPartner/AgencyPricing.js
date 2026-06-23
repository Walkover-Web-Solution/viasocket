import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const AgencyPricing = () => {
    const stats = [
        { number: '250K', label: 'tasks per month, shared across all client workspaces' },
        { number: '100%', label: 'of revenue retained. No commissions, no splits.' },
        { number: '100K', label: 'AI credits included per month.' },
    ];

    const includedItems = [
        'Unlimited workspace creation',
        '250,000 tasks / month',
        '100,000 AI credits included',
        'All premium features included',
        '1-on-1 live support',
        '$0.00021 per task overage',
    ];

    return (
        <section id="pricing" className="max-w-6xl mx-auto px-4 py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                {/* Left Content */}
                <div className="flex-1 max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                        One plan.
                        <br />
                        Everything included.
                    </h2>
                    <p className="text-gray-600 text-base mb-10 max-w-md">
                        No per-seat fees, no workspace charges, no revenue splits.
                        <br />
                        One flat rate for your whole practice.
                    </p>

                    <div className="space-y-0">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-4 py-5 ${index !== stats.length - 1 ? 'border-b border-gray-200' : ''}`}
                            >
                                <span className="text-2xl font-bold text-gray-400 w-16 flex-shrink-0">
                                    {stat.number}
                                </span>
                                <span className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm mt-6">
                        <Link
                            href="https://viasocket.com/help/partners/agency-partner-program"
                            className="inline-flex items-center gap-1 text-[#A8200D] underline hover:opacity-80 transition-opacity"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn more about partner pricing
                            <ExternalLink size={14} />
                        </Link>
                    </p>
                </div>

                {/* Right Card */}
                <div className="w-full lg:w-[400px] flex-shrink-0">
                    <div className="relative bg-[#fafafa] rounded-2xl p-6 pt-10 border border-gray-200">
                        {/* Badge */}
                        <span className="absolute -top-3 left-6 inline-block text-xs font-normal text-white bg-gray-900 rounded-full px-3 py-1.5">
                            25% OFF • LIMITED TIME OFFER
                        </span>

                        {/* Plan Name */}
                        <p className="text-sm font-bold tracking-[0.15em] text-[#A8200D] uppercase mb-3">
                            Agency Partner Plan
                        </p>

                        {/* Pricing */}
                        <div className="mb-1">
                            <span className="text-gray-400 text-sm line-through">$350</span>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-5xl font-bold text-gray-900">$250</span>
                            <span className="text-gray-500 text-base">/month</span>
                        </div>
                        <p className="text-gray-500 text-xs mb-6">Billed monthly. Cancel anytime.</p>

                        {/* CTA Button */}
                        <Link
                            href="https://buy.stripe.com/aFafZhgBudT51oZbvR2go15"
                            className="block w-full btn btn-accent"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Become a Partner
                        </Link>

                        {/* Divider */}
                        <div className="border-t border-gray-200 pt-5">
                            <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-4">
                                What&apos;s Included
                            </p>

                            <ul className="space-y-2.5">
                                {includedItems.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#A8200D] flex-shrink-0"></span>
                                        <span className="text-gray-800 text-sm">{item}</span>
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
