import Link from 'next/link';
import { ExternalLink, Check, DollarSign, Star, Headphones } from 'lucide-react';

const AgencyPricing = () => {
    const partnerFeatures = [
        'Unlimited workspace creation',
        '250,000 tasks / month',
        '100,000 AI credits included',
        'All premium features included',
        '1-on-1 live support',
        '$0.00021 per task overage',
    ];

    const referFeatures = [
        '50% recurring commission on every plan',
        'Paid every month they stay subscribed',
        'Earn $18.50 to $49.50 per client',
        'Unlimited referrals, no earning cap',
        'Free lifetime viaSocket workspace',
        'Partner dashboard & monthly payouts',
    ];

    return (
        <section id="pricing" className="w-full bg-[#f5f0e8] py-20">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col items-center gap-2 text-center mb-14">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-yellow-500 text-sm tracking-widest">★★★★★</span>
                        <span className="text-sm text-gray-600">Trusted by 150+ agencies</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        Pricing built for agencies.
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Become a Partner and bill clients yourself, or share revenue and earn 50% of every plan your clients pay for.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(184,50,37,0.07)' }}>
                                <DollarSign size={14} className="text-[#A8200D]" />
                            </span>
                            <span>Keep 100% of your revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(184,50,37,0.07)' }}>
                                <Star size={14} className="text-[#A8200D]" />
                            </span>
                            <span>All premium features</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(184,50,37,0.07)' }}>
                                <Headphones size={14} className="text-[#A8200D]" />
                            </span>
                            <span>Priority support available</span>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
                    {/* OR Divider (centered between columns on desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-accent font-medium text-sm">
                        OR
                    </div>

                    {/* Partner Card */}
                    <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 justify-self-center">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A8200D] mb-4">
                            Agency Partner Plan
                        </p>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-gray-400 line-through text-sm">$350</span>
                            <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded">Save $100/mo</span>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-5xl font-bold text-gray-900">$250</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">Billed monthly. Cancel anytime. You bill your own clients.</p>

                        <Link
                            href="https://buy.stripe.com/aFafZhgBudT51oZbvR2go15"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full btn btn-accent mb-6"
                        >
                            Become a Partner
                        </Link>

                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">What&apos;s Included</p>
                        <ul className="space-y-2.5">
                            {partnerFeatures.map((item, index) => (
                                <li key={index} className="flex items-center gap-2.5 text-sm text-gray-700">
                                    <Check size={14} className="text-[#A8200D] flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Refer Card */}
                    <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 justify-self-center">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A8200D] mb-4">
                            Refer & Earn
                        </p>
                        <p className="text-xs text-[#A8200D] font-medium mb-1">$0 upfront</p>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-5xl font-bold text-gray-900">50%</span>
                            <span className="text-gray-500">recurring</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">Free to join. Earn every month your referred clients stay.</p>

                        <button className="block w-full btn btn-outline mb-6">
                            Start earning
                        </button>

                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">What&apos;s Included</p>
                        <ul className="space-y-2.5">
                            {referFeatures.map((item, index) => (
                                <li key={index} className="flex items-center gap-2.5 text-sm text-gray-700">
                                    <Check size={14} className="text-[#A8200D] flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Link */}
                <div className="text-center mt-10">
                    <Link
                        href="https://viasocket.com/help/partners/agency-partner-program"
                        className="inline-flex items-center gap-1 text-sm text-[#A8200D] underline hover:opacity-80 transition-opacity"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn more about partner pricing
                        <ExternalLink size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AgencyPricing;
