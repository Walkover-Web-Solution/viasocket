const columns = [
    {
        label: 'n8n Cloud',
        value: '€24',
        unit: 'per month',
        sub: '2,500 executions',
        accent: false,
    },
    {
        label: 'viaSocket',
        value: 'Free',
        unit: '10,000 tasks / month',
        sub: '+ 500 AI credits, and no instance to maintain',
        accent: true,
    },
];

export default function N8nStatCompare() {
    return (
        <div className="bg-white border-y">
            <div className="container py-12 lg:py-16 flex flex-col gap-8 lg:gap-10">
                <div className="flex flex-col gap-2 text-center max-w-3xl mx-auto">
                    <h2 className="h2">Start free, with nothing to maintain.</h2>
                    <p className="text-base md:text-lg text-gray-500">
                        n8n Cloud starts at €24/month for 2,500 executions. viaSocket's free plan includes 10,000 tasks
                        and 500 AI credits every month.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 border max-w-4xl mx-auto w-full">
                    {columns.map((column, index) => (
                        <div
                            key={column.label}
                            className={`flex flex-col items-center text-center gap-3 p-8 lg:p-12 ${
                                index === 0 ? 'border-b md:border-b-0 md:border-r' : ''
                            }`}
                        >
                            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                {column.label}
                            </span>
                            <span
                                className={`text-4xl md:text-5xl lg:text-6xl leading-none ${
                                    column.accent ? 'text-accent' : 'text-gray-900'
                                }`}
                            >
                                {column.value}
                            </span>
                            <span className="text-base font-medium text-gray-500">{column.unit}</span>
                            <span className={`text-sm ${column.accent ? 'text-accent font-medium' : 'text-gray-500'}`}>
                                {column.sub}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-500">And nobody has to maintain the instance.</p>
            </div>
        </div>
    );
}
