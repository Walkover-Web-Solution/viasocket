const PATTERNS = [
    {
        title: 'Lead routing to CRM',
        description: 'Capture new leads and push them into your CRM, routed by owner or region.',
    },
    {
        title: 'Approval workflows',
        description: 'Pause a workflow for a human sign-off by email, then resume automatically.',
    },
    {
        title: 'Slack alerts from any app',
        description: 'Turn any incoming event into a formatted alert in the right Slack channel.',
    },
    {
        title: 'Data extraction with AI',
        description: 'Extract structured data from documents or emails with AI and log it to a Google Sheet or database.',
    },
    {
        title: 'Support auto-replies',
        description: 'Let an AI agent draft and send first replies across support channels.',
    },
    {
        title: 'Applicant screening',
        description: 'Score inbound applicants with AI and route the best ones to the next step.',
    },
];

export default function RelayUseCases() {
    return (
        <div className="bg-white">
            <div className="container py-16">
                <h2 className="h2 mb-10">Common automation patterns</h2>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="grid md:grid-cols-3">
                        {PATTERNS.map((pattern, index) => (
                            <div
                                key={pattern.title}
                                className={`flex flex-col gap-3 p-8 ${
                                    index % 3 !== 2 ? 'border-r border-gray-200' : ''
                                } ${index < PATTERNS.length - 3 ? 'border-b border-gray-200' : ''}`}
                            >
                                <h3 className="font-semibold text-gray-900">{pattern.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{pattern.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
