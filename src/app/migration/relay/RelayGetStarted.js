const STEPS = [
    "If you have a Relay export, you can paste the workflow data into viaSocket's AI builder and it will reconstruct your workflows step by step, prompting you where mapping decisions are needed.",
    'If you would rather start from a template, the template library covers the most common automation patterns with one-click deploy.',
];

export default function RelayGetStarted() {
    return (
        <div className="bg-white border-b">
            <div className="container py-12 lg:py-16 flex flex-col gap-4">
                <h2 className="h2 mb-2">How to get started</h2>
                {STEPS.map((step) => (
                    <p key={step} className="text-gray-700 max-w-3xl">
                        {step}
                    </p>
                ))}
            </div>
        </div>
    );
}
