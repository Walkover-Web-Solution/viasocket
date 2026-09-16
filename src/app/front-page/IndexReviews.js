'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

const REVIEWS = {
    heading: 'Reviews.',
    subhead: 'From G2, Capterra, LinkedIn and X.',
};

/**
 * The listing scores. Both figures come from the public listings and are shown
 * beside stars drawn from each row's own rating, so the half-star follows 4.6
 * and 4.8 separately rather than both taking one number.
 */
const LISTINGS =
    /**
     * The listing scores. Both figures come from the public listings and are
     * shown beside stars drawn from each row's own rating, so the half-star
     * follows 4.6 and 4.8 separately rather than both taking one number.
     */
    [
        { label: 'Capterra', value: '4.8 on Capterra \u00b7 648 reviews', rating: 4.8 },
        { label: 'G2', value: '4.6 on G2 \u00b7 92 reviews', rating: 4.6 },
    ];

/**
 * The award seals. The same badges the site shows in ShowBadges, which stays
 * the shared source of truth for them; they are listed here so this page does
 * not reach into a component the old home page renders.
 */
const AWARDS =
    /**
     * The award seals. Same badges the site already shows in ShowBadges, which
     * stays the shared source of truth for them; these are listed here so this
     * page does not reach into a component the old home page renders.
     *
     * Small and uncaptioned on purpose: at full size they are bigger than the
     * reviews they vouch for, and a category label under each would turn four
     * marks back into a section.
     */
    [
        {
            name: 'Front Runners, Workflow Management',
            src: 'https://brand-assets.softwareadvice.com/badge/92042d6a-aeba-4d59-ba4c-00401332bccf.svg',
            href: 'https://www.softwareadvice.com/workflow/#frontrunners',
        },
        {
            name: 'Capterra Best Value, No Code Platform',
            src: 'https://brand-assets.capterra.com/badge/0c624c79-b388-4438-bb92-6bdbe09c04ee.svg',
            href: 'https://www.capterra.com/p/10020406/viaSocket/',
        },
        {
            name: 'Capterra Best Ease of Use, Low Code Development Platform',
            src: 'https://brand-assets.capterra.com/badge/d7798002-d859-4ccd-8de5-d786d01f39e9.svg',
            href: 'https://www.capterra.com/p/10020406/viaSocket/',
        },
    ];

/**
 * What people say, taken from where they already said it. The cards come from
 * the site's own review data, so nothing here is written for the page.
 *
 * One row, running across the whole section. The copy is a head across the top
 * and the quotes run underneath it: a row cannot leave a hole beside itself,
 * which is what makes this the arrangement that holds at every width.
 *
 * The marquee renders the set twice so the loop has no seam, and the track
 * translates by exactly one set's width. Pause pauses the motion and nothing
 * else. Reduced motion gets no marquee at all — a plain static grid with every
 * card visible, because a paused marquee is a marquee that has hidden half its
 * content.
 */

/** Seconds per card, so a longer row takes proportionally longer to pass. */
const PER_CARD = 7;

const initials = (name) =>
    (name || '')
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

export default function IndexReviews({ reviewData = [] }) {
    const [reduced, setReduced] = useState(false);
    const [paused, setPaused] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    const row = reviewData.filter((item) => item?.description && item?.user_name);
    if (!row.length) return null;

    return (
        <section
            className="relative flex flex-col justify-center bg-index-reviews px-5 py-24 font-index-sans text-index-ink min-[900px]:px-index-gutter"
            ref={ref}
            data-still={reduced ? 'true' : 'false'}
        >
            {/* The provenance reads down rather than across — where the reviews
                are from with the seals beside it, then what they score — which
                keeps every part of it near the heading it belongs to. Pushed to
                opposite edges it only moved the hole. */}
            <div className="mb-[clamp(30px,3vw,46px)]">
                <h2 className="m-0 font-index-display text-[clamp(34px,4.6vw,64px)] font-normal leading-[1.02] tracking-[-0.03em] min-[900px]:tracking-[-0.06em]">
                    {REVIEWS.heading}
                </h2>

                <div className="mt-[15px]">
                    <div className="flex flex-wrap items-center gap-y-[10px] gap-x-[clamp(16px,1.8vw,28px)]">
                        <p className="m-0 text-[15.5px] leading-[1.55] text-index-muted">{REVIEWS.subhead}</p>

                        {/* Sized against the review cards rather than the line:
                            at full scale a seal is taller than the review it
                            vouches for. Greyed back a touch and brought to full
                            on hover, so they read as provenance and not as
                            chrome. The hairline divides them from the clause
                            they sit next to, and goes with them if every seal
                            fails to load. */}
                        <div className="flex flex-wrap items-center gap-3 border-l border-index-line pl-[clamp(16px,1.8vw,28px)] empty:hidden">
                            {AWARDS.map((award) => (
                                <a
                                    key={award.name}
                                    href={award.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={award.name}
                                    className="block leading-[0] opacity-90 transition-opacity duration-[180ms] ease-out hover:opacity-100"
                                >
                                    {/* No alt text and no frame: a seal that
                                        fails to load leaves nothing behind
                                        rather than a broken slot. */}
                                    <Image
                                        src={award.src}
                                        alt=""
                                        width={160}
                                        height={42}
                                        loading="lazy"
                                        className="h-[38px] w-auto min-[900px]:h-[42px]"
                                        onError={(e) => {
                                            e.currentTarget.closest('a')?.remove();
                                        }}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-[13px] flex flex-wrap gap-y-[6px] gap-x-[clamp(22px,2.4vw,38px)]">
                        {LISTINGS.map((listing) => (
                            <p
                                key={listing.label}
                                className="m-0 flex items-center whitespace-nowrap text-[15px] text-[#4a544e]"
                            >
                                <i
                                    className="mr-2 inline-flex translate-y-px items-center gap-px text-[#6f7a71] [&_svg]:fill-current"
                                    aria-hidden="true"
                                >
                                    {Array.from({ length: Math.floor(listing.rating) }, (_, i) => (
                                        <Star key={i} size={13} />
                                    ))}
                                    {listing.rating % 1 >= 0.25 && <StarHalf size={13} />}
                                </i>
                                {listing.value}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Clipped by its own box, which is the section's content box, so a
                card enters and leaves on the same line the heading starts on
                rather than running wider than every other section on the page.

                The fade is a fixed 44px of mask at each end rather than a
                percentage, so the taper stays the same size at 1440 and at 2560
                instead of eating a whole card on a wide screen.

                Reduced motion gets no marquee at all — a plain grid with every
                card visible, because a paused marquee is a marquee that has
                hidden half its content. */}
            <div
                className="relative overflow-hidden [--card-w:290px] [--fade:24px] [--gap:12px] [--set-w:calc(var(--n)*(var(--card-w)+var(--gap)))] [mask-image:linear-gradient(to_right,transparent,#000_var(--fade),#000_calc(100%-var(--fade)),transparent)] min-[721px]:[--card-w:320px] min-[721px]:[--fade:44px] min-[721px]:[--gap:16px] min-[900px]:[--card-w:380px] motion-reduce:overflow-visible motion-reduce:[mask-image:none]"
                onPointerEnter={() => setPaused(true)}
                onPointerLeave={() => setPaused(false)}
                /* The count, not a width: the set's width is computed in CSS
                   from --card-w, which the breakpoints change, so hardcoding the
                   distance here would translate a narrow-card row by a wide-card
                   distance and put a visible seam in the loop on every phone. */
                style={{ '--n': row.length, '--dur': `${row.length * PER_CARD}s` }}
            >
                <div
                    className="flex w-max animate-index-reviews gap-[var(--gap)] data-[paused=true]:[animation-play-state:paused] motion-reduce:grid motion-reduce:w-auto motion-reduce:animate-none motion-reduce:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]"
                    data-paused={paused ? 'true' : 'false'}
                >
                    {/* Twice, so the loop has no seam. The duplicate is decorative. */}
                    {[0, 1].map((copy) =>
                        row.map((card, i) => (
                            <article
                                key={`${copy}-${card.link || card.user_name}-${i}`}
                                className="flex h-[250px] w-[var(--card-w)] flex-none flex-col rounded-[14px] border border-[#dfe3da] bg-white px-[22px] py-5 motion-reduce:w-auto motion-reduce:aria-hidden:hidden"
                                aria-hidden={copy === 1 ? 'true' : undefined}
                            >
                                <p className="m-0 mb-[14px] grid grid-cols-[32px_minmax(0,1fr)_auto] gap-x-[11px] gap-y-[2px]">
                                    {/* The reviewer's own picture when the row has one, initials
                                        otherwise. */}
                                    {card.user_profile?.[0]?.trim() ? (
                                        <Image
                                            src={card.user_profile[0].trim()}
                                            alt=""
                                            width={32}
                                            height={32}
                                            aria-hidden="true"
                                            className="row-span-2 h-8 w-8 rounded-[9px] object-cover"
                                        />
                                    ) : (
                                        <span
                                            className="row-span-2 grid h-8 w-8 place-items-center rounded-[9px] bg-[#eceee6] text-[10px] font-medium text-index-muted"
                                            aria-hidden="true"
                                        >
                                            {initials(card.user_name)}
                                        </span>
                                    )}
                                    <b className="text-[13.5px] font-medium text-index-ink">{card.user_name}</b>
                                    <i className="col-start-2 not-italic text-[11px] text-[#98a098]">{card.subtitle}</i>
                                    <em className="col-start-3 row-start-1 not-italic text-[9.5px] uppercase tracking-[0.09em] text-[#a8b0a7]">
                                        {card.name}
                                    </em>
                                </p>
                                {/* A fixed height, not `flex-1`: leftover flex
                                    space only approximates five lines, and on a
                                    tight card it can fall short, letting a sixth
                                    line show past the clamp's ellipsis. This is
                                    exactly five lines at each breakpoint's own
                                    font size and line-height, so it never over-
                                    or under-shoots. */}
                                <p className="m-0 h-[109px] overflow-hidden text-sm line-clamp-5 leading-[1.55] text-[#3f4a43] min-[721px]:h-[93px] min-[721px]:text-xs min-[900px]:h-[114px] min-[900px]:text-sm min-[900px]:leading-[1.62]">
                                    {card.description}
                                </p>
                                {card.date && <p className="mt-auto pt-2 text-[10.5px] text-[#a8b0a7]">{card.date}</p>}
                            </article>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
