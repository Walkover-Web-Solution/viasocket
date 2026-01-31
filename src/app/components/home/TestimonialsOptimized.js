'use client'

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";

export default function TestimonialsOptimized({ reviewData, matchesFilter }) {
    return (
        <>
            <div className="mb-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {
                    reviewData?.map((item, index) => {
                        if (item?.user_name?.trim() === '' && item?.subtitle?.trim() === '' && item?.description?.trim() === '') return null;
                        const isVisible = matchesFilter(item);
                        if (!isVisible) return null;
                        return (
                            <Link href={item?.link || '#'} target="_blank" key={item?.name + "-" + index}>
                                <div className="bg-white md:p-12 p-6 flex flex-col gap-4 border custom-border h-[320px] group hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between gap-2 overflow-hidden">
                                        <div className="flex items-center gap-2 min-w-0 flex-1">
                                            {item?.user_profile?.[0] && item?.user_profile?.[0].trim() !== '' ? (
                                                <Image src={item?.user_profile?.[0]} alt={item?.user_name} width={100} height={100} className="w-12 h-12 rounded-full flex-shrink-0" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl flex-shrink-0">
                                                    {item?.user_name?.charAt(0)?.toUpperCase() || '?'}
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate">{item?.user_name}</p>
                                                <p className="text-sm text-gray-600 truncate">{item?.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {item?.platform_logo?.[0] && item?.platform_logo?.[0].trim() !== '' && (
                                                <Image src={item?.platform_logo?.[0]} alt={item?.name} width={100} height={100} className="w-auto h-6" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="line-clamp-5 flex-1">
                                        <p>{item?.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto gap-2">
                                        <p className="text-xs text-gray-400">{item?.date}</p>
                                        <button className="text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 whitespace-nowrap">
                                            Read more <FaArrowRight className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    );
}
