'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { INDEX_UTM_SOURCE, buildSignupHref, trackSignupClick } from './signup';

const CLOSE = {
    heading: 'It works with the apps you already use.',
    subhead: 'Connect the apps you use and tell viaSocket the job. Thousands of apps, and counting.',
    submit: 'Start with one job',
    // States the free plan and nothing more: the pricing page is being
    // changed to match this page, and a figure here would be the thing that
    // goes stale first.
    micro: 'Free to start. 10,000 tasks and 500 AI credits every month.',
    indexTitle: 'Every app, A to Z',
    indexLetters: ['0-9', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')],
};

// CONFIRMED. The single trust number at the ask: the ratings are stated in
// full in the reviews section and the app count in the subhead above.
const TEAMS = '10,000+ teams';

/**
 * The close.
 *
 * Why a marquee is right here and nowhere else on the page: this page uses
 * motion that resolves rather than motion that idles, and a marquee is the
 * definition of motion that idles — which is exactly what makes it the honest
 * drawing of a catalogue. A row that ends has a number; a row that keeps
 * arriving does not, so the reader stops counting and takes the point. Every
 * other moving thing on this page is showing one job finishing, and each of
 * those stops when it is done.
 *
 * It is slow on purpose: a full pass takes 68 seconds, so at a glance nothing
 * appears to be moving and only a reader who rests on it sees the drift. A
 * ticker at reading speed beside a call to action is a second thing to watch.
 *
 * The strip stops while the section is off screen, on hover, and entirely under
 * reduced motion, where it renders as a plain row.
 */
export default function IndexClose({ apps = [] }) {
    const bandRef = useRef(null);
    const [live, setLive] = useState(false);

    const marks = useMemo(() => apps.filter((app) => app?.iconurl), [apps]);
    /** The catalogue twice over, so the loop has no seam: the second copy is
        exactly half the track, and translating by -50% lands copy two where
        copy one began. */
    const strip = useMemo(() => [...marks, ...marks], [marks]);

    useEffect(() => {
        const node = bandRef.current;
        if (!node) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => setLive(entry.isIntersecting));
            },
            { threshold: 0.05 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const ctaHref = buildSignupHref(INDEX_UTM_SOURCE);

    return (
        <section
            id="ask"
            className="scroll-mt-[54px] min-[721px]:scroll-mt-16 flex flex-col items-center justify-center gap-[clamp(44px,5vw,72px)] overflow-hidden bg-index-paper px-index-gutter py-index-section font-index-sans text-index-ink"
        >
            <div className="flex w-[min(640px,100%)] flex-col items-center text-center">
                <h2 className="m-0 max-w-[16ch] font-index-display text-[clamp(36px,4.6vw,68px)] font-normal leading-[1.02] tracking-[-0.03em] text-index-ink min-[900px]:tracking-[-0.04em]">
                    {CLOSE.heading}
                </h2>
                <p className="mt-[18px] max-w-[46ch] text-[17px] leading-[1.55] text-index-muted">{CLOSE.subhead}</p>

                {/* The page's main CTA, and a real link: crawlable and
                    cmd-clickable, not a button calling window.location. */}
                <a
                    className="mt-[22px] inline-flex cursor-pointer items-center gap-[7px] rounded-[10px] border-0 bg-index-ink px-[22px] py-3 text-[15px] font-medium text-index-paper transition-[transform,opacity] duration-[180ms] ease-out hover:-translate-y-px hover:opacity-90 min-[900px]:mt-7 min-[900px]:px-[26px] min-[900px]:py-[14px] min-[900px]:text-base"
                    href={ctaHref}
                    onClick={() =>
                        trackSignupClick(INDEX_UTM_SOURCE, {
                            element: 'index_close_cta',
                            label: CLOSE.submit,
                            destinationUrl: ctaHref,
                        })
                    }
                >
                    {CLOSE.submit} <ArrowUpRight aria-hidden="true" size={17} />
                </a>

                <p className="mt-[14px] text-[13.5px] text-index-muted">{CLOSE.micro}</p>
                {/* The only proof left at the ask: the ratings are stated in
                    full in the reviews section and the app count in the subhead
                    directly above. */}
                <p className="mt-2 text-[13.5px] text-[#98a098]">{TEAMS}</p>
            </div>

            {marks.length > 0 && (
                /* Why a marquee is right here and nowhere else on the page: this
                   page uses motion that resolves rather than motion that idles,
                   and a marquee is the definition of motion that idles — which
                   is exactly what makes it the honest drawing of a catalogue. A
                   row that ends has a number; a row that keeps arriving does
                   not. It is slow on purpose, so at a glance nothing appears to
                   be moving: a ticker at reading speed beside a call to action
                   is a second thing to watch.

                   Clipped by its own box, so the marks enter and leave in line
                   with the heading and the button rather than being the one
                   thing on the page wider than the copy it sits under. */
                <div
                    className="group w-full overflow-hidden [--fade:44px] [mask-image:linear-gradient(90deg,transparent_0,#000_var(--fade),#000_calc(100%-var(--fade)),transparent_100%)]"
                    ref={bandRef}
                    data-live={live ? 'true' : 'false'}
                    aria-label={CLOSE.indexTitle}
                >
                    <div className="flex w-max animate-index-drift gap-[clamp(14px,1.6vw,24px)] [animation-play-state:paused] group-data-[live=true]:[animation-play-state:running] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
                        {/* A link when that app has a page: as links these put
                            several dozen contextual internal links from this
                            page into the integration catalogue. The second half
                            of the strip is the seamless-loop duplicate, so its
                            links are hidden from assistive tech — a screen
                            reader should hear the catalogue once, not twice. */}
                        {strip.map((app, i) => {
                            const duplicate = i >= marks.length;
                            const mark = (
                                <Image
                                    src={app.iconurl}
                                    alt=""
                                    loading="lazy"
                                    width={26}
                                    height={26}
                                    className="h-[21px] w-[21px] object-contain min-[900px]:h-[26px] min-[900px]:w-[26px]"
                                />
                            );
                            /* Rounded squares, never circles: a circular crop
                               cuts the corners off marks drawn square. */
                            const chip =
                                'grid h-11 w-11 flex-none place-items-center rounded-[12px] border border-index-line bg-white shadow-[0_1px_2px_rgb(20_32_31/4%)] transition-[transform,border-color] duration-[180ms] ease-out hover:-translate-y-[2px] hover:border-[#c9cdbf] min-[900px]:h-[54px] min-[900px]:w-[54px] min-[900px]:rounded-[15px]';

                            return app.appslugname ? (
                                <a
                                    className={chip}
                                    key={`${i}-${app.appslugname}`}
                                    href={`/integrations/${app.appslugname}`}
                                    title={app.name}
                                    aria-hidden={duplicate ? 'true' : undefined}
                                    tabIndex={duplicate ? -1 : undefined}
                                >
                                    {mark}
                                </a>
                            ) : (
                                <span className={chip} key={`${i}-${app.name}`} title={app.name}>
                                    {mark}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* The catalogue index, in the shape the site already uses for its
                own A to Z. */}
            <nav
                className="mx-auto mt-[30px] flex w-[min(1100px,100%)] flex-col items-baseline gap-3 border-t border-index-line pt-4 min-[900px]:mt-[clamp(34px,4vw,54px)] min-[900px]:flex-row min-[900px]:gap-[clamp(20px,3vw,48px)] min-[900px]:pt-5"
                aria-label={CLOSE.indexTitle}
            >
                <p className="m-0 flex-none text-[15px] font-medium tracking-[-0.005em] text-index-ink">
                    {CLOSE.indexTitle}
                </p>
                <ul className="m-0 flex flex-wrap justify-start gap-px p-0 [list-style:none] min-[900px]:ml-auto min-[900px]:gap-[2px]">
                    {CLOSE.indexLetters.map((letter) => (
                        <li key={letter}>
                            <a
                                className="grid h-[26px] min-w-[26px] place-items-center rounded-[7px] px-[5px] text-[13.5px] text-index-ink transition-[background-color,color] duration-[160ms] ease-out hover:bg-index-ink hover:text-index-paper min-[900px]:h-7 min-[900px]:min-w-[28px] min-[900px]:px-[7px] min-[900px]:text-[14px]"
                                href={`/find-apps/${letter.toLowerCase()}`}
                            >
                                {letter}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    );
}
