'use client'

import Image from 'next/image';
import Link from 'next/link';

export default function TestimonialsOptimized({ reviewsData, matchesFilter }) {
    return (
        <>
            <div className="mb-8 grid grid-cols-3 gap-4">
                {
                    reviewsData?.map((item, index) => {
                        const isVisible = matchesFilter(item);
                        if (!isVisible) return null;
                        return (
                            <Link href={item.link || '#'} target="_blank" key={item.name + "-" + index}>
                                <div className="bg-white md:p-12 p-6 flex flex-col gap-4 border custom-border h-[320px]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Image src={item.user_profile?.[0]} alt={item.user_name} width={100} height={100} className="w-12 h-12 rounded-full" />
                                            <div>
                                                <p>{item.user_name}</p>
                                                <p className="text-sm text-gray-600 truncate w-72">{item.subtitle}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Image src={item.platform_logo?.[0]} alt={item.name} width={100} height={100} className="w-auto h-6" />
                                        </div>
                                    </div>
                                    <div className="line-clamp-5">
                                        <p>{item.description}</p>
                                    </div>
                                    <p className="text-xs text-gray-400">{item.date}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    );
}
