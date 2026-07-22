const comparisonRows = [
    {
        feature: 'Free plan',
        relay: '200 steps/month',
        viasocket: '2,000 tasks + 500 AI credits/month',
    },
    {
        feature: 'Paid entry',
        relay: '$19/mo (Team $69 for 2,000 steps)',
        viasocket: 'Free plan covers most Relay workloads; pay as you go beyond',
    },
    {
        feature: 'Integrations',
        relay: '200+',
        viasocket: '2,200+',
    },
    {
        feature: 'Human-in-the-loop',
        relay: 'Yes',
        viasocket: 'Human Intervention steps: pause for email approval, resume, full audit trail',
    },
    {
        feature: 'AI in workflows',
        relay: 'Yes',
        viasocket: 'AI agents that analyze, decide and act',
    },
    {
        feature: 'Tables',
        relay: 'Yes',
        viasocket: 'Built in; import your Relay tables as CSV',
    },
    {
        feature: 'Templates',
        relay: 'Yes',
        viasocket: 'Template library with one-click deploy',
    },
    {
        feature: 'Support',
        relay: 'Until Sep 14, 2026',
        viasocket: 'Real human support on every plan',
    },
    {
        feature: 'Security',
        relay: 'Not listed',
        viasocket: 'SOC 2 Type II, ISO, GDPR & CCPA',
    },
    {
        feature: 'Still in business',
        relay: 'Shutting down Sep 14, 2026',
        viasocket: 'Here to stay: built by Walkover, 10,000+ businesses',
    },
];

export default function RelayComparisonTable() {
    return (
        <div className="bg-[#F9F6F1]">
            <div className="container py-12 lg:py-16">
                <h2 className="h2 mb-6 lg:mb-8 text-center lg:text-left">
                    Everything you had on Relay, and then some.
                </h2>

                <div className="border border-black rounded-2xl overflow-hidden hidden lg:block">
                    <div className="grid grid-cols-[0.8fr_1fr_1.5fr] bg-black text-white text-xs font-semibold uppercase tracking-wider">
                        <div className="px-6 py-4 border-r border-white/20"></div>
                        <div className="px-6 py-4 border-r border-white/20">Relay.app</div>
                        <div className="px-6 py-4">viaSocket</div>
                    </div>

                    {comparisonRows.map((row, index) => (
                        <div
                            key={row.feature}
                            className={`grid grid-cols-[0.8fr_1fr_1.5fr] text-sm ${
                                index !== comparisonRows.length - 1 ? 'border-b border-gray-200' : ''
                            }`}
                        >
                            <div className="px-6 py-4 border-r border-gray-200 font-semibold text-gray-900 bg-[#FAF8F4]">
                                {row.feature}
                            </div>
                            <div className="px-6 py-4 border-r border-gray-200 text-gray-500 bg-white">{row.relay}</div>
                            <div className="px-6 py-4 font-semibold text-gray-900 bg-white">{row.viasocket}</div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4 lg:hidden">
                    {comparisonRows.map((row) => (
                        <div key={row.feature} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="px-4 py-3 bg-[#FAF8F4] border-b border-gray-200 font-semibold text-gray-900 text-sm">
                                {row.feature}
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="px-4 py-3">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                                        Relay.app
                                    </div>
                                    <div className="text-sm text-gray-500">{row.relay}</div>
                                </div>
                                <div className="px-4 py-3">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                                        viaSocket
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">{row.viasocket}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
