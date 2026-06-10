import Link from 'next/link';
import Image from 'next/image';

const badgeList = [
    {
        link: 'https://www.softwareadvice.com/workflow/#frontrunners',
        img: 'https://brand-assets.softwareadvice.com/badge/92042d6a-aeba-4d59-ba4c-00401332bccf.svg',
        alt: 'Workflow Management',
        source: 'Software Advice Front Runners 2025',
    },
    {
        link: 'https://www.capterra.com/workflow-management-software/shortlist',
        img: 'https://brand-assets.capterra.com/badge/a6f0b1ea-b591-4919-9f40-827cd6d6753b.svg',
        alt: 'Workflow Management',
        source: 'Capterra Shortlist 2025',
    },
    {
        link: 'https://www.capterra.com/p/10020406/viaSocket/',
        img: 'https://brand-assets.capterra.com/badge/0c624c79-b388-4438-bb92-6bdbe09c04ee.svg',
        alt: 'No Code Platform',
        source: 'Capterra Best Value 2025',
    },
    {
        link: 'https://www.capterra.com/p/10020406/viaSocket/',
        img: 'https://brand-assets.capterra.com/badge/3237aa22-913d-4d43-bd35-de61668cbc95.svg',
        alt: 'Low Code Development Platform',
        source: 'Capterra Best Value 2025',
    },
    {
        link: 'https://www.capterra.com/p/10020406/viaSocket/',
        img: 'https://brand-assets.capterra.com/badge/d7798002-d859-4ccd-8de5-d786d01f39e9.svg',
        alt: 'Low Code Development Platform',
        source: 'Capterra Best Ease of Use 2025',
    },
];

export default function ShowBadges() {
    return (
        <div className="container py-20">
            <div className="flex flex-col items-center gap-4 mb-14 text-center">
                <h2 className="h2">
                    Trusted by Thousands.
                    <span className="text-accent">Recognized</span> by the Best.
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl">
                    Recognized by leading review platforms and trusted by 10,000+ businesses worldwide.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {badgeList.map((badge, index) => (
                    <Link
                        key={index}
                        href={badge.link}
                        target="_blank"
                        className="flex flex-col items-center justify-start gap-3 bg-white border border-gray-200 rounded-xl p-6 transition-shadow hover:shadow-md"
                    >
                        <Image
                            className="h-24 w-24 object-contain"
                            src={badge.img}
                            alt={badge.alt}
                            width={100}
                            height={100}
                        />
                        <p className="text-center text-sm font-semibold text-gray-900 mt-2">{badge.alt}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
