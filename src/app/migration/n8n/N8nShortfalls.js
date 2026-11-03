const SHORTFALLS = {
    title: 'Where n8n Falls Short for SaaS Builders',
    lede: "If you're building a SaaS product and you want to give your customers the ability to connect their own apps — n8n was not designed for this job. Specifically:",
    points: [
        {
            title: 'No managed OAuth for your users.',
            body: "n8n handles authentication for your own n8n instance, not per-customer OAuth flows inside your product. If a customer wants to connect their Salesforce or HubSpot account, you'd need to build that auth layer yourself.",
        },
        {
            title: 'Self-hosting complexity at scale.',
            body: "Running n8n for your own internal use is manageable. Running a multi-tenant integration infrastructure where each of your customers has their own isolated connections, credentials, and workflows is a fundamentally different infrastructure problem — one n8n wasn't architected to solve out of the box.",
        },
        {
            title: 'No embedded workflow UI.',
            body: "n8n's editor is n8n's editor. You can't embed a white-labeled workflow builder inside your own SaaS product's UI without significant custom development work.",
        },
        {
            title: 'Integration maintenance falls on you.',
            body: 'When an app updates its API or OAuth scopes, someone on your team needs to update the n8n node. At scale, this becomes a significant ongoing burden.',
        },
    ],
    close: "These aren't flaws in n8n — they're simply outside its design scope. n8n is built for internal automation. Integration Layer infrastructure is a different product category.",
};

export default function N8nShortfalls() {
    return (
        <div className="bg-[#F9F6F1]">
            <div className="container py-12 lg:py-16 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h2 className="h2">{SHORTFALLS.title}</h2>
                    <p className="text-gray-700 max-w-3xl">{SHORTFALLS.lede}</p>
                </div>
                <div className="flex flex-col border bg-white">
                    {SHORTFALLS.points.map((point, index) => (
                        <div
                            key={point.title}
                            className={`py-6 px-6 lg:p-12 flex flex-col gap-3 ${
                                index !== SHORTFALLS.points.length - 1 ? 'border-b' : ''
                            }`}
                        >
                            <h3 className="h3">{point.title}</h3>
                            <p className="text-gray-700 max-w-3xl">{point.body}</p>
                        </div>
                    ))}
                </div>
                <p className="text-gray-900 max-w-3xl">{SHORTFALLS.close}</p>
            </div>
        </div>
    );
}
