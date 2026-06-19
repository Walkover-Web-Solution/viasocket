import Link from 'next/link';
import { Gift, ArrowRight } from 'lucide-react';

export default function LimitedTimeOffer({ href }) {
    return (
        <Link
            href={href}
            className="inline-flex items-center justify-start gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 mb-4 text-xs md:text-sm border border-white/20 shadow-sm hover:bg-white hover:shadow-md transition-all max-w-fit"
        >
            <Gift size={14} className="text-accent shrink-0" />
            <span className="font-medium text-accent tracking-wide whitespace-nowrap">LIMITED-TIME OFFER</span>
            <span className="text-gray-700 font-medium hidden lg:block">Get 6 months for the price of 1</span>
            <ArrowRight size={14} strokeWidth={2.2} className="shrink-0" />
        </Link>
    );
}
