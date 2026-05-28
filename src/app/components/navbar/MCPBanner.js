import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function MCPBanner() {
    return (
        <div
            className={`hidden lg:flex cursor-pointer w-full bg-[#5CD2A2]/90 supports-[backdrop-filter]:bg-[#5CD2A2]/80 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] !h-[30px] items-center justify-center gap-2 !text-sm`}
        >
            <span>MCP is now</span>
            <Image src={`/assets/img/mushrooms-text.svg`} alt="explore mcp" width={100} height={100} />
            <Link
                href={'https://mushrooms.viasocket.com?utm_source=viasocket'}
                target="_blank"
                rel="nofollow noopener noreferrer"
            >
                <div className="bg-white rounded-full px-3 py-1 flex items-center gap-1 cursor-pointer hover:bg-gray-100 transition-colors mx-2 !h-[20px] !text-xs">
                    Explore More <ArrowUpRight className="w-3 h-3" />
                </div>
            </Link>
        </div>
    );
}
