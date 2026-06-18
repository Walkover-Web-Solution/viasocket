import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroCtaButtons({ signupHref, salesHref = 'https://cal.id/team/viasocket/sales-team', className = 'flex gap-3 sm:gap-4 md:gap-6 items-center justify-start w-full' }) {
    return (
        <div className={className}>
            <Link href={signupHref} className="btn btn-outline">
                Get Started
                <ArrowRight size={14} strokeWidth={2.2} />
            </Link>
            <Link
                href={salesHref}
                className="text-white/80 hover:text-white underline"
                target="_blank"
            >
                Contact Sales
            </Link>
        </div>
    );
}
