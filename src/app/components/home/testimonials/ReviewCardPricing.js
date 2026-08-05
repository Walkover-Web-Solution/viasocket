'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Star } from 'lucide-react';

const UserAvatar = memo(function UserAvatar({ profile, name }) {
    if (profile) {
        return (
            <Image
                src={profile}
                alt={name}
                width={100}
                height={100}
                className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
            />
        );
    }
    return (
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-semibold flex-shrink-0">
            {name?.charAt(0)?.toUpperCase() || '?'}
        </div>
    );
});

const PlatformLogo = memo(function PlatformLogo({ logo, name }) {
    if (!logo) return null;
    return (
        <div className="flex-shrink-0">
            <Image src={logo} alt={name} width={100} height={100} className="w-auto h-5 object-contain" />
        </div>
    );
});

const ReviewCardPricing = memo(function ReviewCardPricing({ item }) {
    const profile = item?.user_profile?.[0]?.trim();
    const logo = item?.platform_logo?.[0]?.trim();

    return (
        <Link href={item?.link || '#'} target="_blank" className="block h-full">
            <div className="bg-white p-6 md:p-8 flex flex-col gap-4 border border-gray-100 rounded-2xl h-full min-h-[340px] shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between gap-2">
                    <PlatformLogo logo={logo} name={item?.name} />
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-gray-800 text-base md:text-lg leading-relaxed line-clamp-5">
                        &ldquo;{item?.description}&rdquo;
                    </p>
                </div>
                <div className="flex items-center justify-between mt-auto gap-2 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 min-w-0">
                        <UserAvatar profile={profile} name={item?.user_name} />
                        <div className="min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">{item?.user_name}</p>
                            <p className="text-xs text-gray-500 truncate">{item?.subtitle}</p>
                        </div>
                    </div>
                    <span className="text-xs font-medium text-red-700 whitespace-nowrap flex items-center gap-1 hover:underline">
                        View original <span className="text-sm">&rarr;</span>
                    </span>
                </div>
            </div>
        </Link>
    );
});

export default ReviewCardPricing;
