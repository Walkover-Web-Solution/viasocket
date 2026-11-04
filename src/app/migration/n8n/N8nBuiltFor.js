const BUILT_FOR = {
    title: "What n8n Is (and What It's Built For)",
    lede: 'n8n is an open-source workflow automation platform. It lets technical teams create automated workflows between apps using a visual node editor. You can self-host it on your own infrastructure, which appeals to teams with data residency requirements or who want full control over the runtime.',
    intro: "It's a strong tool for:",
    points: [
        'Internal automation (CRM syncing, data pipelines, ops workflows)',
        'Technical users who want to write custom JavaScript nodes',
        'Teams who need to run automation on-premise',
    ],
    close: 'n8n has a cloud offering too, but its primary value proposition is self-hosted flexibility.',
};

export default function N8nBuiltFor() {
    return (
        <div className="bg-white border-y">
            <div className="container py-12 lg:py-16 flex flex-col gap-4">
                <h2 className="h2 mb-2">{BUILT_FOR.title}</h2>
                <p className="text-gray-700 max-w-3xl">{BUILT_FOR.lede}</p>
                <p className="text-gray-700 max-w-3xl">{BUILT_FOR.intro}</p>
                <ul className="flex flex-col gap-2 list-disc pl-5 text-gray-800 max-w-3xl">
                    {BUILT_FOR.points.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>
                <p className="text-gray-700 max-w-3xl">{BUILT_FOR.close}</p>
            </div>
        </div>
    );
}
