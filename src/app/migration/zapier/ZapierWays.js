const steps = [
    {
        number: '01',
        title: 'Export from Zapier',
        description:
            "Settings > Security and data > Download my Zaps. One JSON file with everything. Team account owners can export all users' Zaps the same way.",
    },
    {
        number: '02',
        title: "Paste into viaSocket's AI",
        description:
            'Drop the JSON into the AI builder. It rebuilds your Zaps as viaSocket workflows and asks you when a mapping needs your call.',
    },
    {
        number: '03',
        title: 'Or bring an expert',
        description: 'Book a free call and our engineers rebuild your top three workflows for you, free.',
    },
];

export default function ZapierWays() {
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
