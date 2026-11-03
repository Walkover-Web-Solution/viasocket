// "2,300+" also appears in N8nHero and N8nDifference.
const comparisonRows = [
    {
        feature: 'Self-hosted deployment',
        n8n: 'Core feature',
        viasocket: 'Not applicable',
    },
    {
        feature: 'Internal workflow automation',
        n8n: 'Strong',
        viasocket: 'Available via Automations',
    },
    {
        feature: 'Managed OAuth per customer',
        n8n: 'Not available',
        viasocket: 'Core product',
    },
    {
        feature: 'Embedded workflow UI for your users',
        n8n: 'Not designed for this',
        viasocket: 'Embed / App Integration',
    },
    {
        feature: 'AI agent tool-calling on 2,300+ apps',
        n8n: 'Not available',
        viasocket: 'Actions for AI',
    },
    {
        feature: 'Pre-built integrations (no build required)',
        n8n: 'Partial (community nodes)',
        viasocket: '2,300+ maintained',
    },
    {
        feature: 'Multi-tenant credential isolation',
        n8n: 'Not designed for this',
        viasocket: 'Built in',
    },
    {
        feature: 'White-label experience',
        n8n: 'No',
        viasocket: 'Yes',
    },
];

export default function N8nComparisonTable() {
    return (
        <div className="bg-[#F9F6F1]">
            <div className="container py-12 lg:py-16">
                <h2 className="h2 mb-6 lg:mb-8 text-center lg:text-left">
                    Capability Comparison: viaSocket vs n8n for SaaS Integration Delivery
                </h2>

                <div className="border border-black rounded-2xl overflow-hidden hidden lg:block">
                    <div className="grid grid-cols-[0.8fr_1fr_1.5fr] bg-black text-white text-xs font-semibold uppercase tracking-wider">
                        <div className="px-6 py-4 border-r border-white/20"></div>
                        <div className="px-6 py-4 border-r border-white/20">n8n</div>
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
                            <div className="px-6 py-4 border-r border-gray-200 text-gray-500 bg-white">{row.n8n}</div>
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
                                        n8n
                                    </div>
                                    <div className="text-sm text-gray-500">{row.n8n}</div>
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
