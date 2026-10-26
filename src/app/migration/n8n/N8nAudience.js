const AUDIENCES = [
    {
        title: 'Who Should Use n8n',
        lede: 'n8n remains an excellent choice for:',
        points: [
            'Internal engineering or ops teams automating their own workflows',
            'Teams with strict on-premise data requirements',
            'Developers who want to write custom logic in JavaScript nodes with full control',
            'Companies running automation for internal use cases only',
        ],
        close: "If that's your situation, n8n is a well-maintained, open-source tool with a strong community.",
    },
    {
        title: 'Who Should Choose viaSocket',
        lede: 'viaSocket is built for:',
        points: [
            'SaaS founders and product teams who want to offer native integrations to their customers without a dedicated integrations team',
            'AI agent builders who need their agent to act on third-party apps through tool calls',
            'Platform engineers who need per-customer OAuth, credential isolation, and multi-tenant integration infrastructure',
            'Developer teams who want to ship integration capabilities in weeks, not quarters',
        ],
        close: "If you need your product to offer integrations — not just your team's internal workflows — viaSocket is the correct architectural choice.",
    },
];

export default function N8nAudience() {
    return (
        <div className="bg-white border-b">
            <div className="container py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {AUDIENCES.map((audience) => (
                    <div key={audience.title} className="flex flex-col gap-4">
                        <h2 className="h2">{audience.title}</h2>
                        <p className="text-gray-700">{audience.lede}</p>
                        <ul className="flex flex-col gap-2 list-disc pl-5 text-gray-800">
                            {audience.points.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                        <p className="text-gray-700">{audience.close}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
