'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { INDEX_UTM_SOURCE, buildSignupHref, trackSignupClick } from '@/app/front-page/signup';

const NAV = {
    brandLabel: 'viaSocket home',
    navLabel: 'Main navigation',
    // Pricing and Support are the two a reader goes looking for and could
    // otherwise only reach from the footer, which is the length of the page
    // away from where they think to look. Use cases is the one in-page
    // anchor; the others navigate.
    links: [
        { label: 'Use cases', href: '#use-cases' },
        { label: 'Integrations', href: '/integrations' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Support', href: '/support' },
    ],
    start: { label: 'Start free' },
};

/**
 * The fixed header for /index.
 *
 * The Start is a filled button rather than an underlined link: it is the only
 * CTA on screen once the reader is past the hero, since every section's own ask
 * is inline and scrolls away. It goes to the same destination as the hero box,
 * with no prompt attached.
 */
export default function NewHeader() {
    const startHref = buildSignupHref(INDEX_UTM_SOURCE);

    return (
        <header
            /* Opaque at rest, not transparent-until-hovered. The page scrolls
               eleven thousand pixels under this bar, and a see-through header
               let every section read through it: headings collided with the nav
               links and the marks in the closing marquee tracked across the
               logo. It paints the page's own ground, so over the hero it still
               reads as one surface rather than as a band. */
            className="fixed inset-x-0 top-0 z-50 flex h-[54px] items-center justify-between border-b border-index-line bg-index-paper/95 px-[18px] backdrop-blur-lg supports-[backdrop-filter]:bg-index-paper/[0.87] min-[721px]:h-16 min-[721px]:px-10"
        >
            <a className="inline-flex items-center" href="#top" aria-label={NAV.brandLabel}>
                <Image
                    src="https://viasocket.com/assets/brand/logo.svg"
                    alt="viaSocket"
                    width={118}
                    height={35}
                    className="block h-[22px] w-auto min-[721px]:h-[26px]"
                    priority
                />
            </a>

            {/* Under 720 the links go and the header is the brand and the one CTA. */}
            <nav
                className="hidden gap-[26px] font-index-sans text-[14.5px] text-index-muted min-[721px]:flex"
                aria-label={NAV.navLabel}
            >
                {NAV.links.map((link) =>
                    link.href.startsWith('#') ? (
                        <a key={link.href} className="transition-colors hover:text-index-ink" href={link.href}>
                            {link.label}
                        </a>
                    ) : (
                        <Link key={link.href} className="transition-colors hover:text-index-ink" href={link.href}>
                            {link.label}
                        </Link>
                    )
                )}
            </nav>

            <div className="flex items-center gap-5">
                <a
                    /* Same ink pill as the closing CTA, one size down, so the
                       page has one button shape. */
                    className="inline-flex items-center gap-[5px] rounded-[9px] bg-index-ink px-[17px] py-[9px] font-index-sans text-[14.5px] font-medium text-index-paper transition-[transform,opacity] duration-[180ms] ease-out hover:-translate-y-px hover:opacity-90"
                    href={startHref}
                    onClick={() =>
                        trackSignupClick(INDEX_UTM_SOURCE, {
                            element: 'index_nav_start',
                            label: NAV.start.label,
                            destinationUrl: startHref,
                        })
                    }
                >
                    {NAV.start.label} <ArrowUpRight aria-hidden="true" size={15} />
                </a>
            </div>
        </header>
    );
}
