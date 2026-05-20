'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { memo } from 'react';

const UserAvatar = memo(function UserAvatar({ profile, name }) {
    if (profile) {
        return (
            <Image
                src={profile}
                alt={name}
                width={100}
                height={100}
                className="w-12 h-12 rounded-full flex-shrink-0"
            />
        );
    }
    return (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl flex-shrink-0">
            {name?.charAt(0)?.toUpperCase() || '?'}
        </div>
    );
});

const PlatformLogo = memo(function PlatformLogo({ logo, name }) {
    if (!logo) return null;
    return (
        <div className="flex-shrink-0">
            <Image src={logo} alt={name} width={100} height={100} className="w-auto h-6" />
        </div>
    );
});

const CardContent = memo(function CardContent({ item }) {
    const profile = item?.user_profile?.[0]?.trim();
    const logo = item?.platform_logo?.[0]?.trim();

    return (
        <Link href={item?.link || '#'} target="_blank" className="block h-full">
            <div className="bg-white md:p-12 p-6 flex flex-col gap-4 border custom-border h-[320px] group hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between gap-2 overflow-hidden">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <UserAvatar profile={profile} name={item?.user_name} />
                        <div className="min-w-0 flex-1">
                            <p className="truncate">{item?.user_name}</p>
                            <p className="text-sm text-gray-600 truncate">{item?.subtitle}</p>
                        </div>
                    </div>
                    <PlatformLogo logo={logo} name={item?.name} />
                </div>
                <div className="line-clamp-5 flex-1">
                    <p>{item?.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto gap-2">
                    <p className="text-xs text-gray-400">{item?.date}</p>
                    <button className="text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 whitespace-nowrap">
                        Read more <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </Link>
    );
});

export default CardContent;
