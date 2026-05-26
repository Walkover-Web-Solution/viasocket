import Link from 'next/link';

const HERO_ICONS = [
    { src: 'https://cdn.svgporn.com/logos/google-sheets.svg', alt: 'Google Sheets' },
    { src: 'https://cdn.svgporn.com/logos/hubspot.svg', alt: 'HubSpot' },
    { src: 'https://cdn.svgporn.com/logos/google-gmail.svg', alt: 'Gmail' },
    { src: 'https://cdn.svgporn.com/logos/salesforce.svg', alt: 'Salesforce' },
];

export default function EmbedHero({ appCount }) {
    return (
        <div className="flex flex-col gap-6 p-12">
            <p className="text-sm text-gray-700">
                <span className="font-medium">MCP-Native</span>
                <span className="mx-2">·</span>
                <span className="font-medium">SOC2-Ready</span>
            </p>
            <h1 className="text-4xl md:text-6xl font-normal text-gray-900 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span>Your product. {+appCount + 300}+ apps.</span>
                <span className="inline-flex items-center gap-2 align-middle">
                    {HERO_ICONS.map((ic) => (
                        <img
                            key={ic.alt}
                            src={ic.src}
                            alt={ic.alt}
                            className="w-10 h-10 md:w-11 md:h-11 inline-block border p-1"
                        />
                    ))}
                </span>
                <span className="w-full">One embed.</span>
            </h1>
            <div>
                <Link href="/signup?utm_source=/embed" className="btn btn-accent">
                    Get Started →
                </Link>
            </div>
        </div>
    );
}
