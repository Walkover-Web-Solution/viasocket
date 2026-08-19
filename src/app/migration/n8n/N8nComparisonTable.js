const comparisonRows = [
    {
        feature: 'Entry cost',
        n8n: 'Self-hosted: free software, your server, your hours. Cloud: €24/mo for 2,500 executions',
        viasocket: 'Free plan: 10,000 tasks + 500 AI credits/month',
    },
    {
        feature: 'Maintenance',
        n8n: 'Updates, credentials, monitoring: yours',
        viasocket: 'Zero. Managed, 99.99% uptime SLA',
    },
    {
        feature: 'Integrations',
        n8n: '1,990 integrations, plus community nodes',
        viasocket: '2,200+ apps, maintained for you',
    },
    {
        feature: 'Code nodes and expressions',
        n8n: 'Yes',
        viasocket: 'Custom JavaScript transforms inside any workflow',
    },
    {
        feature: 'Webhook triggers',
        n8n: 'Yes',
        viasocket: 'Webhooks, native',
    },
    {
        feature: 'Conditional branches and switches',
        n8n: 'Yes',
        viasocket: 'Conditional logic built in',
    },
    {
        feature: 'Wait / approval patterns',
        n8n: 'Buildable',
        viasocket: 'Human Intervention steps: pause for email approval, resume, full audit trail',
    },
    {
        feature: 'AI in workflows',
        n8n: 'Yes',
        viasocket: 'AI agents that analyze, decide and act. 500 AI credits free monthly',
    },
    {
        feature: 'Data storage',
        n8n: 'Workarounds needed',
        viasocket: 'Tables built into your workflows',
    },
    {
        feature: 'Support',
        n8n: 'Community forum; support on paid Cloud',
        viasocket: 'Real humans on every plan',
    },
    {
        feature: 'Security',
        n8n: 'Depends on your setup',
        viasocket: 'SOC 2 Type II, ISO, GDPR & CCPA',
    },
];

export default function N8nComparisonTable() {
    return (
        <div className="bg-[#F9F6F1]">
            <div className="container py-12 lg:py-16">
                <h2 className="h2 mb-2 text-center lg:text-left">Everything you had on n8n, and then some.</h2>
                <p className="text-base md:text-lg text-gray-500 mb-6 lg:mb-8 text-center lg:text-left">
                    Every pattern you rely on has a native equivalent, so nothing has to be rebuilt from scratch.
                </p>

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
