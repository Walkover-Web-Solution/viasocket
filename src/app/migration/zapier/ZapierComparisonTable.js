const comparisonRows = [
    {
        feature: 'Free plan',
        zapier: '100 tasks/month',
        viasocket: '10,000 tasks + 500 AI credits/month',
    },
    {
        feature: 'Paid entry',
        zapier: 'Professional $29.99/mo for 750 tasks',
        viasocket: 'Pay as you go beyond free, no contracts',
    },
    {
        feature: 'Overages',
        zapier: "2.5x your plan's task rate on monthly billing, 1.25x on annual",
        viasocket: 'None, usage just continues at standard rates',
    },
    {
        feature: 'Task counting',
        zapier: 'Every successful step in a Zap consumes a task',
        viasocket: 'Comparable step-based counting, with 100x the free headroom',
    },
    {
        feature: 'Multi-step workflows',
        zapier: 'Yes',
        viasocket: 'No step limits, even on the free plan',
    },
    {
        feature: 'Paths and filters',
        zapier: 'Yes',
        viasocket: 'Conditional logic built into every workflow',
    },
    {
        feature: 'Formatter steps',
        zapier: 'Yes',
        viasocket: 'Custom JavaScript transforms when the built-in options are not enough',
    },
    {
        feature: 'Tables',
        zapier: 'Zapier Tables',
        viasocket: 'Tables inside your workflows. Import your existing ones as CSV',
    },
    {
        feature: 'AI in workflows',
        zapier: 'Yes',
        viasocket: 'AI agents that analyze, decide and act, plus 500 free monthly credits',
    },
    {
        feature: 'Human approvals',
        zapier: 'Yes',
        viasocket: 'Pause for email approval, resume automatically, full audit trail',
    },
    {
        feature: 'Support',
        zapier: 'Tiered by plan',
        viasocket: 'Real humans on every plan',
    },
    {
        feature: 'Security',
        zapier: 'Enterprise-grade',
        viasocket: 'SOC 2 Type II, ISO, GDPR & CCPA',
    },
];

export default function ZapierComparisonTable() {
    return (
        <div className="bg-[#F9F6F1]">
            <div className="container py-12 lg:py-16">
                <h2 className="h2 mb-2 text-center lg:text-left">Zapier vs viaSocket, honestly.</h2>
                <p className="text-base md:text-lg text-gray-500 mb-6 lg:mb-8 text-center lg:text-left">
                    Every workflow capability you rely on is supported, without rebuilding everything from scratch.
                </p>

                <div className="border border-black rounded-2xl overflow-hidden hidden lg:block">
                    <div className="grid grid-cols-[0.8fr_1fr_1.5fr] bg-black text-white text-xs font-semibold uppercase tracking-wider">
                        <div className="px-6 py-4 border-r border-white/20"></div>
                        <div className="px-6 py-4 border-r border-white/20">Zapier</div>
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
                            <div className="px-6 py-4 border-r border-gray-200 text-gray-500 bg-white">
                                {row.zapier}
                            </div>
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
                                        Zapier
                                    </div>
                                    <div className="text-sm text-gray-500">{row.zapier}</div>
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
