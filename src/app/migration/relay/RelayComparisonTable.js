import Link from 'next/link';

// "2,300+" also appears in RelayHero and RelayOffers.
const comparisonRows = [
    {
        feature: 'Status',
        relay: 'Shut down',
        viasocket: 'Active',
    },
    {
        feature: 'Free plan',
        relay: '200 steps/month',
        viasocket: '100,000 tasks/month + 1,000 AI credits',
    },
    {
        feature: 'Paid entry',
        relay: '$9/mo',
        viasocket: '$19/mo (Pro)',
    },
    {
        feature: 'Integrations',
        relay: '200+',
        viasocket: '2,300+',
    },
    {
        feature: 'Human-in-the-loop',
        relay: 'Yes',
        viasocket: 'Yes',
    },
    {
        feature: 'AI in workflows',
        relay: 'Yes',
        viasocket: 'Yes',
    },
    {
        feature: 'Tables / data storage',
        relay: 'Yes',
        viasocket: 'Yes',
    },
    {
        feature: 'Templates',
        relay: 'Yes',
        viasocket: 'Yes',
    },
    {
        feature: 'SaaS embed / white-label',
        relay: 'No',
        viasocket: 'Yes — Embed product',
    },
    {
        feature: 'Security',
        relay: '—',
        viasocket: 'SOC 2 Type II, ISO, GDPR and CCPA',
    },
];

export default function RelayComparisonTable() {
    return (
        <div className="bg-[#F9F6F1]">
            <div className="container py-12 lg:py-16">
                <h2 className="h2 mb-6 lg:mb-8 text-center lg:text-left">viaSocket vs Relay.app</h2>

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

                <p className="text-sm text-gray-700 mt-8 max-w-3xl">
                    The same kind of switch is documented if you{' '}
                    <Link href="/migration/zapier" className="text-accent underline underline-offset-4">
                        migrate from Zapier
                    </Link>{' '}
                    or{' '}
                    <Link href="/migration/n8n" className="text-accent underline underline-offset-4">
                        migrate from n8n
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
