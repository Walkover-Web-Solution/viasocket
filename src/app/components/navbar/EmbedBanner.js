import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function EmbedBanner() {
    return (
        <div
            className={`hidden lg:flex cursor-pointer w-full bg-[#5CD2A2]/90 supports-[backdrop-filter]:bg-[#5CD2A2]/80 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] !h-[30px] items-center justify-center gap-2 !text-sm`}
        >
            <span>Pay For Month 1. Get 5 Free.</span>
            <Link href="/signup?utm_source=/embed" target="_blank" rel="nofollow noopener noreferrer" className='flex items-center gap-2 italic font-medium text-lg underline'>
                Get Started <ArrowUpRight className="w-3 h-3" />
            </Link>
        </div>
    );
}
