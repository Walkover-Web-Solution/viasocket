'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { INDEX_UTM_SOURCE, buildSignupHref, trackSignupClick } from '@/app/front-page/signup';

const NAV = {
    brandLabel: 'viaSocket home',
    navLabel: 'Main navigation',
    start: { label: 'Start free' },
};

/**
 * The fixed header for /index, and — with `homepage={false}` — the header
 * used site-wide for variant B of the homepage A/B test.
 *
 * The Start is a filled button rather than an underlined link: it is the only
 * CTA on screen once the reader is past the hero, since every section's own ask
 * is inline and scrolls away. It goes to the same destination as the hero box,
 * with no prompt attached.
 *
 * On /index, "Use cases" and the logo are in-page anchors, since the
 * homepage layout has nowhere else to send them. Everywhere else those
 * anchors don't exist, so they point at real pages instead.
 */
export default function NewHeader({ utmSource = INDEX_UTM_SOURCE, homepage = true }) {
    const startHref = buildSignupHref(utmSource);
    const brandHref = homepage ? '#top' : '/';
    // Pricing and Support are the two a reader goes looking for and could
    // otherwise only reach from the footer, which is the length of the page
    // away from where they think to look.
    const links = [
        { label: 'Use cases', href: homepage ? '#use-cases' : '/departments' },
        { label: 'Pricing', href: '/pricing' },
    ];

    // Clean at the top of the page, on purpose: the hero sits directly under
    // this bar, and a hairline at rest read as a stray edge across it. The
    // line and its lift-off shadow only earn their place once there is
    // something to divide the header from, which starts at the first pixel
    // of scroll.
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            {/* Read by .global-top-space on every other page, so content
               clears this header's actual height instead of a guess. */}
            <header
                /* Opaque at rest, not transparent-until-hovered. The page scrolls
                   eleven thousand pixels under this bar, and a see-through header
                   let every section read through it: headings collided with the nav
                   links and the marks in the closing marquee tracked across the
                   logo. It paints the page's own ground, so over the hero it still
                   reads as one surface rather than as a band. */
                className={`fixed inset-x-0 top-0 z-50 flex h-[54px] items-center justify-between bg-index-paper/95 px-[18px] backdrop-blur-sm transition-shadow duration-300 ease-out supports-[backdrop-filter]:bg-index-paper/[0.87] min-[721px]:h-16 min-[721px]:px-10 ${
                    scrolled
                        ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_3px_rgba(20,32,31,0.05)]'
                        : 'shadow-none'
                }`}
            >
                {homepage ? (
                    <a className="inline-flex items-center" href={brandHref} aria-label={NAV.brandLabel}>
                        <Image
                            src="https://viasocket.com/assets/brand/logo.svg"
                            alt="viaSocket"
                            width={118}
                            height={35}
                            className="block h-[22px] w-auto min-[721px]:h-[26px]"
                            priority
                        />
                    </a>
                ) : (
                    <Link className="inline-flex items-center" href={brandHref} aria-label={NAV.brandLabel}>
                        <Image
                            src="https://viasocket.com/assets/brand/logo.svg"
                            alt="viaSocket"
                            width={118}
                            height={35}
                            className="block h-[22px] w-auto min-[721px]:h-[26px]"
                            priority
                        />
                    </Link>
                )}

                <div className="flex items-center gap-6">
                    <nav
                        className="hidden gap-[26px] font-index-sans text-[14.5px] text-index-muted min-[721px]:flex"
                        aria-label={NAV.navLabel}
                    >
                        {links.map((link) =>
                            link.href.startsWith('#') ? (
                                <a key={link.href} className="transition-colors hover:text-index-ink" href={link.href}>
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.href}
                                    className="transition-colors hover:text-index-ink"
                                    href={link.href}
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </nav>
                    <a
                        /* Same ink pill as the closing CTA, one size down, so the
                           page has one button shape. */
                        className="inline-flex items-center gap-2 rounded-md bg-index-ink px-[17px] py-[9px] font-index-sans text-sm font-medium text-index-paper transition-[transform,opacity] duration-[180ms] ease-out hover:-translate-y-px hover:opacity-90"
                        href={startHref}
                        onClick={() =>
                            trackSignupClick(utmSource, {
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
        </>
    );
}
