import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroCtaButtons({
    signupHref,
    salesHref = 'https://cal.id/team/viasocket/sales-team',
    className = 'flex gap-3 sm:gap-4 md:gap-6 items-center justify-start w-full',
    signupClassName = 'btn btn-outline',
    salesClassName = 'text-white/80 hover:text-white underline',
}) {
    return (
        <div className={className}>
            <Link
                href={salesHref}
                className={salesClassName}
                target="_blank"
                data-track="embed_book_demo"
                data-track-section="embed"
                data-track-action="demo_click"
            >
              Book a Demo
            </Link>
            <Link
                href={signupHref}
                className={signupClassName}
                data-track="embed_get_started"
                data-track-section="embed"
                data-track-action="signup_click"
            >
                Get Started
                <ArrowRight size={14} strokeWidth={2.2} />
            </Link>
        </div>
    );
}
