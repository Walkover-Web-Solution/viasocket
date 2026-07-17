import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MigratingBanner() {
    return (
        <div
            className={`hidden lg:flex cursor-pointer w-full bg-[#3B62FF] text-white backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] !h-[30px] items-center justify-center gap-2 !text-sm`}
        >
            <span className="tracking-[0.06em]">
                Migrating from another tool? We'll move your workflows for you, <strong>Free</strong>.
            </span>
            <Link
                href={'https://cal.id/team/viasocket/workflow-setup-discussion'}
                target="_blank"
                rel="nofollow noopener noreferrer"
            >
                <div className="border border-white bg-white text-black rounded-full px-3 py-1 flex items-center gap-1 cursor-pointer hover:bg-gray-100 transition-colors mx-2 !h-[20px] !text-xs">
                    Talk to us <ArrowRight className="w-3 h-3" />
                </div>
            </Link>
        </div>
    );
}
