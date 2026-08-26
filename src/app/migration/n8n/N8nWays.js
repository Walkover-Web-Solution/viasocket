const steps = [
    {
        number: '01',
        title: 'Export from n8n',
        description: 'Open a workflow, download it as JSON from the workflow menu. Works on self-hosted and Cloud.',
    },
    {
        number: '02',
        title: "Paste into viaSocket's AI",
        description:
            'Drop the JSON into the AI builder. It rebuilds the workflow step by step and asks you when a mapping needs your call.',
    },
    {
        number: '03',
        title: 'Or bring an engineer',
        description:
            'Book a free call and our automation engineers rebuild your workflows for you, including the gnarly ones.',
    },
];

export default function N8nWays() {
    return (
        <div className="bg-white px-4 lg:px-12 py-12 lg:py-16 border-y">
            <div className="container flex flex-col gap-8">
                <h2 className="h2 text-center lg:text-left">How migration works</h2>
                <div className="flex flex-col lg:flex-row items-stretch border">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className={`flex-1 py-6 px-6 lg:p-12 flex flex-col gap-4 ${
                                index !== steps.length - 1 ? 'border-b lg:border-b-0 lg:border-r' : ''
                            }`}
                        >
                            <span className="text-sm font-semibold tracking-widest text-accent">{step.number}</span>
                            <h3 className="h3">{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
