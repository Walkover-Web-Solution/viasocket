import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
    {
        name: 'STARTER',
        price: 'Free',
        priceSuffix: '',
        description: 'Everything you need to get started.',
        usage: ['25 active users', '25k tasks / month'],
        support: ['Docs & Community'],
        ctaLabel: 'Get started free',
        ctaLink: '/signup?utm_source=/embed',
        ctaClass: 'btn btn-primary',
        highlight: false,
    },
    {
        name: 'PRO',
        price: '$99',
        priceSuffix: '/ month',
        description: 'Scale up with higher limits and full platform access.',
        usage: ['250 active users', '250k tasks / month'],
        support: ['Email & priority tickets support'],
        ctaLabel: 'Get started',
        ctaLink: '/signup?utm_source=/embed',
        ctaClass: 'btn btn-accent',
        highlight: true,
    },
    {
        name: 'ENTERPRISE',
        price: 'Custom',
        priceSuffix: '',
        description: 'Tailored for security, compliance, and unlimited scale.',
        usage: ['Custom users', 'Custom tasks'],
        support: ['Dedicated 1-on-1 support'],
        ctaLabel: 'Contact Sales',
        ctaLink: 'https://cal.id/team/viasocket/embed',
        ctaClass: 'btn btn-primary',
        highlight: false,
        badge: true,
    },
];

function PlanCard({ plan }) {
    return (
        <div
            className={`relative flex flex-col bg-[#FAFAFA] h-full ${plan.highlight ? 'border-2 border-accent' : 'border border-gray-200'}`}
        >
            {(plan.highlight || plan.badge) && (
                <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 text-white text-[11px] font-bold tracking-wide uppercase px-4 py-1 rounded-b-lg whitespace-nowrap ${plan.highlight ? 'bg-accent' : 'bg-black'}`}
                >
                    Buy 1 month, get 5 free
                </div>
            )}
            <div
                className="flex flex-col gap-5 p-6 flex-1"
                style={plan.highlight ? { paddingTop: '2.25rem' } : plan.badge ? { paddingTop: '3rem' } : {}}
            >
                <div className="flex flex-col gap-2">
                    <span className="text-xs tracking-widest">{plan.name}</span>
                    <div className="flex items-baseline gap-1">
                        <h3 className="text-3xl font-bold text-black">{plan.price}</h3>
                        {plan.priceSuffix && <span className="text-sm">{plan.priceSuffix}</span>}
                    </div>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                </div>

                <div className="border-t border-gray-200" />

                <div className="flex flex-col gap-2">
                    <span className="text-xs tracking-widest text-gray-500">USAGE</span>
                    <ul className="flex flex-col gap-2">
                        {[...plan.usage, ...plan.support].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-800">
                                <Check size={16} className="text-green-600 shrink-0" strokeWidth={3} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <Link href={plan.ctaLink} className={`w-full mt-auto ${plan.ctaClass}`}>
                    {plan.ctaLabel}
                </Link>
            </div>
        </div>
    );
}

export default function EmbedPricing({ appCount }) {
    const totalApps = appCount ? `${+appCount + 300}+` : '2200+';
    return (
        <div className="container" id="pricing">
            <div className="border border-gray-200 bg-white md:p-10 p-6 flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-4xl font-medium text-black">Embed Pricing</h2>
                    <p className="text-gray-600 text-lg">Choose the perfect plan that fits your need.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <PlanCard key={plan.name} plan={plan} />
                    ))}
                </div>

                <div className="border border-gray-200 bg-[#FAFAFA] p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="flex flex-col gap-1">
                        <h4 className="font-semibold text-black">Need more than your plan includes?</h4>
                        <p className="text-sm text-gray-600">
                            Add extra users or tasks as you grow. Only pay for what you use.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 md:border-l md:border-gray-200 md:pl-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-[#B91C1C]">$1</span>
                            <span className="text-sm text-gray-700">/ user</span>
                        </div>
                        <p className="text-sm text-gray-600">For each additional active user.</p>
                    </div>
                    <div className="flex flex-col gap-1 md:border-l md:border-gray-200 md:pl-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-[#B91C1C]">$1</span>
                            <span className="text-sm text-gray-700">/ 2,500 tasks</span>
                        </div>
                        <p className="text-sm text-gray-600">For every 2,500 extra tasks.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
