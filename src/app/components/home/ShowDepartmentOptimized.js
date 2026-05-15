import Image from 'next/image';
import Link from 'next/link';

const FEATURE_CARDS = [
    {
        image: '/assets/img/leftside.png',
        alt: 'Tables that power workflows',
        titleHighlight: 'Tables',
        titleRest: ' That Power Workflows',
        description:
            'Store, organize and manage data inside your automations. Keep your data updated and accessible across all your workflows.',
    },
    {
        image: '/assets/img/rightside.png',
        alt: 'AI Agents that decide',
        titleHighlight: 'AI Agents',
        titleRest: ' That Decide',
        description:
            'Let AI analyse data, make decisions, and take the next best action automatically, so your workflows adapt and move forward.',
    },
];

export default function ShowDepartmentOptimized() {
    return (
        <div className="flex flex-col gap-6 container py-12 px-4">
            <section className="py-12 md:py-16">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <div>
                        <h2 className="h2 font-semibold text-gray-900">Workflows that think and remember</h2>
                        <p className="text-lg text-gray-600 mt-2">
                            Automations that don&apos;t just run, but decide and remember
                        </p>
                    </div>
                    <Link
                        href="/features"
                        className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-full transition-colors w-fit"
                    >
                        Explore all features
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {FEATURE_CARDS.map((card, index) => (
                        <div
                            key={card.titleHighlight}
                            className="bg-white rounded-lg border overflow-hidden flex flex-col"
                        >
                            <div
                                className={`bg-white overflow-hidden h-[260px] md:h-[300px] relative ${
                                    index === 0 ? 'rounded-tl-lg' : 'rounded-tr-lg'
                                }`}
                            >
                                <Image
                                    src={card.image}
                                    alt={card.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover object-left-top"
                                />
                            </div>

                            <div className="flex flex-col gap-3 p-4 md:p-6">
                                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                                    <span className="text-accent">{card.titleHighlight}</span>
                                    {card.titleRest}
                                </h3>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
