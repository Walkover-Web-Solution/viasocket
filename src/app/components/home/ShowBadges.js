'use client';

import Link from 'next/link';
import Image from 'next/image';

const badgeList = [
    {
        link: 'https://www.softwareadvice.com/workflow/#frontrunners',
        img: 'https://brand-assets.softwareadvice.com/badge/92042d6a-aeba-4d59-ba4c-00401332bccf.svg',
        alt: 'Workflow Management'
    },
    {
        link: 'https://www.capterra.com/workflow-management-software/shortlist',
        img: 'https://brand-assets.capterra.com/badge/a6f0b1ea-b591-4919-9f40-827cd6d6753b.svg',
        alt: 'Workflow Management'
    },
    {
        link: 'https://www.capterra.com/p/10020406/viaSocket/',
        img: 'https://brand-assets.capterra.com/badge/0c624c79-b388-4438-bb92-6bdbe09c04ee.svg',
        alt: 'No Code Platform'
    },
    {
        link: 'https://www.capterra.com/p/10020406/viaSocket/',
        img: 'https://brand-assets.capterra.com/badge/3237aa22-913d-4d43-bd35-de61668cbc95.svg',
        alt: 'Low Code Development Platform'
    },
    {
        link: 'https://www.capterra.com/p/10020406/viaSocket/',
        img: 'https://brand-assets.capterra.com/badge/d7798002-d859-4ccd-8de5-d786d01f39e9.svg',
        alt: 'Low Code Development Platform'
    }
]

export default function ShowBadges() {
    return (
        <div className="container py-20">
            <div className="flex flex-col gap-3 mb-12 text-center">
                <h2 className="h2">Recognized Excellence</h2>
                <p className="sub__h2">Trusted by thousands and recognized by leading review platforms</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {badgeList.map((badge, index) => (
                    <div key={index} className="flex flex-col items-center justify-center gap-4">
                        <Link href={badge.link} target="_blank">
                            <Image className="h-24 w-24" src={badge.img} alt={badge.alt} width={100} height={100} />
                        </Link>
                        <p className="text-center text-sm font-medium">{badge.alt}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}