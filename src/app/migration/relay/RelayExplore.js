import Link from 'next/link';

const LINKS = [
    {
        before: 'Coming from Zapier? See the ',
        anchor: 'Zapier alternative page',
        href: '/migration/zapier',
    },
    {
        before: 'Coming from n8n? See the ',
        anchor: 'n8n alternative page',
        href: '/migration/n8n',
    },
    {
        before: 'Building integrations into your own SaaS product? See ',
        anchor: 'Embedded iPaaS',
        href: '/embed/app-integration',
    },
    {
        before: 'Browse developer and SaaS builder ',
        anchor: 'use cases and examples',
        href: '/use-cases',
    },
];

export default function RelayExplore() {
    return (
        <div className="bg-white border-y">
            <div className="container py-12 lg:py-16">
                <h2 className="h2 mb-6">Explore further</h2>
                <ul className="flex flex-col gap-3 list-disc pl-5 text-gray-800">
                    {LINKS.map((item) => (
                        <li key={item.href + item.anchor}>
                            {item.before}
                            <Link href={item.href} className="text-accent underline underline-offset-4">
                                {item.anchor}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
