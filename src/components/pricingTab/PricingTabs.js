import { useState } from 'react';

const PricingTabs = () => {
    const [isYearly, setIsYearly] = useState(false);

    const pricingPlans = [
        {
            name: 'Free Forever',
            price: '0',
            invocations: '200 invocations/month',
            featureHeading: 'Free includes',
            features: [
                '1000+ apps',
                'Schedule Workflows',
                'Unlimited workflows',
                '15-minute minimum interval between runs',
            ],
        },
        {
            name: 'Starter',
            price: '29',
            invocations: '2000 invocations/month',
            featureHeading: 'Everything in free, plus',
            features: [
                'Webhook',
                'In-built tools',
                'More control with scheduled scenarios, down to the minute',
                'Increased data transfer limits',
            ],
        },
        {
            name: 'Growth',
            price: '49',
            invocations: '5000 invocations/month',
            featureHeading: 'Everything in Starter, plus',
            features: ['30 users', 'Shared app connections'],
        },
        {
            name: 'HyperGrowth',
            price: '200',
            invocations: '20000 invocations/month',
            featureHeading: 'Everything in Growth, plus',
            features: ['$200 worth automation credits'],
        },
        {
            name: 'Enterprise',
            price: null,
            priceText: 'Talk to Sales',
            featureHeading: 'Everything in HyperGrowth, plus',
            features: [
                'Unlimited users',
                'Advanced admin permissions and app controls',
                'Annual task limits',
                'Technical Account Manager',
            ],
        },
    ];

    return (
        <div className="w-full flex flex-col items-center gap-8">
            {/* Toggle Switch */}
            <div className="flex justify-start w-full">
                <div className="flex items-center bg-gray-100 border transparent-border-black">
                    <button
                        className={`px-4 py-2 h3 ${!isYearly ? 'bg-accent text-white' : 'text-black'}`}
                        onClick={() => setIsYearly(false)}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-4 py-2 h3 ${isYearly ? 'bg-accent text-white' : 'text-gray-600'}`}
                        onClick={() => setIsYearly(true)}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Pricing Table */}
            <div className="w-full border transparent-border-black bg-white overflow-x-auto">
                {/* Pricing Row */}
                <div className="grid grid-cols-5">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className="border-r last:border-r-0 transparent-border-black p-6 flex flex-col gap-4"
                        >
                            <h3 className="h3">{plan.name}</h3>
                            <div className="cont gap-1">
                                <div className="h3 text-accent">
                                    {plan.price ? (
                                        <>
                                            ${isYearly ? plan.price * '10' : plan.price}
                                            <span className="text-base text-gray-700">
                                                /{isYearly ? 'year' : 'month'}
                                            </span>
                                        </>
                                    ) : (
                                        <span>{plan.priceText}</span>
                                    )}
                                </div>
                                <div className="text-base text-gray-700">{plan.invocations}</div>
                            </div>

                            <div className="cont gap-2">
                                <p className="h6 !font-semibold">{plan.featureHeading} :</p>
                                <ul className="">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-accent">✔</span>
                                            <span className="text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-auto pt-4">
                                <button
                                    className={`btn w-full ${plan.name === 'Growth' ? 'btn-accent' : 'btn-primary'}`}
                                >
                                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingTabs;
