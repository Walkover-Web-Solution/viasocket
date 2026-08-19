import { Check } from 'lucide-react';

const chores = [
    'Updating the instance and praying nothing breaks',
    'Rotating credentials by hand',
    'Monitoring queues and workers',
    'Sizing the server for one heavy workflow',
    'Debugging why a community node died after an update',
];

export default function N8nMaintenanceRelief() {
    return (
        <div className="bg-[#F9F6F1]">
            <div className="container py-12 lg:py-16 flex flex-col gap-8 lg:gap-10">
                <h2 className="h2 text-center lg:text-left max-w-3xl">What you stop doing this week</h2>

                <div className="border bg-white">
                    <ul className="flex flex-col">
                        {chores.map((chore, index) => (
                            <li
                                key={chore}
                                className={`flex items-start gap-4 p-5 lg:p-6 ${index !== 0 ? 'border-t' : ''}`}
                            >
                                <span className="mt-1 flex items-center justify-center w-5 h-5 shrink-0 border bg-[#F9F6F1] text-accent">
                                    <Check className="w-3 h-3" />
                                </span>
                                <span className="text-lg text-gray-500 line-through decoration-gray-300">{chore}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="text-base md:text-lg text-gray-900 max-w-3xl">
                    n8n is excellent software. Running it is a part-time job. viaSocket is what your workflows look like
                    when infrastructure is someone else's problem.
                </p>
            </div>
        </div>
    );
}
