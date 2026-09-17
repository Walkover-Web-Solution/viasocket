'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { VIDEO, VIDEO_YOUTUBE_ID, VIDEO_POSTER } from './content';

// PROVISIONAL. A dummy YouTube placeholder, standing in until the founders'
// own video replaces it. The heading and sub-head above describe the intended
// video, not this footage; all three move with the id. The section is built
// to be complete with no video at all: set VIDEO_YOUTUBE_ID to null and the
// poster alone carries it.

/**
 * Section 2: the video, with a sticky reveal on desktop.
 *
 * The scroll is never taken. A tall outer section with a sticky inner, and
 * scroll position drives the transition — no wheel handlers, no preventDefault,
 * no animating scrollTop. A reader who scrolls hard always leaves, because
 * nothing here is doing anything other than reading where the page already is.
 *
 * Mobile and reduced motion get a different section, not a scaled one: below
 * 900px, and at any width under reduced motion, there is no sticky and no
 * reveal. Heading, video inline, done.
 */
export default function IndexVideo() {
    const outerRef = useRef(null);
    const iframeRef = useRef(null);

    // Drives the reveal. Reads scroll position, writes two custom properties,
    // and touches nothing else.
    useEffect(() => {
        const outer = outerRef.current;
        if (!outer) return undefined;

        const takeoverQuery = window.matchMedia('(min-width: 900px)');
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const root = document.documentElement;

        let frame = 0;
        let active = false;

        const clear = () => {
            outer.style.removeProperty('--p');
            outer.style.removeProperty('--t');
            root.style.removeProperty('--takeover');
        };

        const measure = () => {
            frame = 0;
            const rect = outer.getBoundingClientRect();
            const viewport = window.innerHeight;

            // Progress through the pinned range, 0 to 1.
            const travel = rect.height - viewport;
            const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
            outer.style.setProperty('--p', p.toFixed(4));

            // The scroll should come to rest on the video. A longer range alone
            // does not do that: it makes the card arrive more slowly and it is
            // still never at rest. So the transform runs on its own clamped
            // progress, finishing early and then holding. Everything visual
            // reads `--t`; `--p` stays the raw scroll position.
            const ENTER = 0.28;
            const t = Math.min(1, p / ENTER);
            outer.style.setProperty('--t', t.toFixed(4));

            // The hero's exit: 0 while it is fully in view, 1 once it has gone.
            // The hero sits immediately above this section, so its exit is
            // exactly how far this section's top has risen toward the top of the
            // viewport. Only the hero cross-fades; the nav stays visible,
            // because an inset card leaves nothing for it to get out of the way
            // of.
            const heroOut = Math.min(1, Math.max(0, 1 - rect.top / viewport));
            root.style.setProperty('--takeover', heroOut.toFixed(4));
        };

        const onScroll = () => {
            if (!active) return;
            if (!frame) frame = window.requestAnimationFrame(measure);
        };

        const sync = () => {
            const wanted = takeoverQuery.matches && !motionQuery.matches;
            if (wanted === active) return;
            active = wanted;
            if (active) measure();
            else clear();
        };

        sync();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        takeoverQuery.addEventListener('change', sync);
        motionQuery.addEventListener('change', sync);

        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            takeoverQuery.removeEventListener('change', sync);
            motionQuery.removeEventListener('change', sync);
            clear();
        };
    }, []);

    /**
     * Nothing plays until it is asked for. The section holds the poster with a
     * Play affordance over it and starts on the click. Two things follow from
     * the reader starting it rather than the page:
     *
     * - It can have sound. Muted was a requirement of autoplay, not a choice.
     * - It still pauses when scrolled away, which is the one piece of the old
     *   observer worth keeping: audio continuing from a section nobody is
     *   looking at is worse than a video that stopped. It does not resume on
     *   its own; coming back leaves it paused where it was.
     *
     * The embed is YouTube's, so play/pause travel over the iframe Player API's
     * postMessage protocol rather than a direct method call, and "the video
     * ended" arrives the same way instead of as a DOM `pause` event.
     */
    const [started, setStarted] = useState(false);

    const postToPlayer = (func) => {
        iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
    };

    const play = () => setStarted(true);

    useEffect(() => {
        if (!started) return undefined;

        // Reaching the end puts the affordance back, so the section rests as a
        // still rather than on a stopped last frame. info 0 is YouTube's
        // "ended" state.
        const onMessage = (event) => {
            if (event.origin !== 'https://www.youtube.com') return;
            let data;
            try {
                data = JSON.parse(event.data);
            } catch {
                return;
            }
            if (data.event === 'onStateChange' && data.info === 0) setStarted(false);
        };
        window.addEventListener('message', onMessage);

        const node = iframeRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) postToPlayer('pauseVideo');
                });
            },
            { threshold: 0.25 }
        );
        if (node) observer.observe(node);

        return () => {
            window.removeEventListener('message', onMessage);
            observer.disconnect();
        };
    }, [started]);

    return (
        <section
            /* Mobile gets the plain section, not a smaller pin: scroll-jacking
               on a phone is hostile and a large share of this audience arrives
               on one, so the reduced version is the plain one rather than a
               scaled copy of the desktop one. */
            className="relative h-auto bg-index-paper motion-reduce:h-auto min-[900px]:h-[350vh] motion-reduce:min-[900px]:h-auto"
            ref={outerRef}
            aria-label={VIDEO.label}
        >
            {/* VideoObject schema is generated in ./seo.js from these same
                constants and rendered once, page-wide, in page.js. */}

            <div className="static flex h-auto flex-col items-stretch justify-center gap-5 overflow-visible px-5 pb-2 pt-[92px] min-[900px]:sticky min-[900px]:top-0 min-[900px]:h-svh min-[900px]:items-center min-[900px]:gap-[clamp(16px,2.8vh,32px)] min-[900px]:overflow-hidden min-[900px]:px-index-gutter min-[900px]:pb-[34px] min-[900px]:pt-[84px] motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible motion-reduce:px-index-gutter motion-reduce:pb-2 motion-reduce:pt-[92px]">
                {/* On the page ground, in ink. No text sits over the footage,
                    which permanently removes the scrim, the band, and any
                    dependence on how bright the video turns out to be. */}
                <h2 className="m-0 max-w-none text-left font-index-display text-[clamp(30px,8vw,40px)] font-normal leading-[0.88] tracking-[-0.02em] text-index-ink min-[900px]:max-w-[min(900px,84vw)] min-[900px]:text-center min-[900px]:text-[clamp(32px,4vw,58px)] min-[900px]:tracking-[-0.06em]">
                    {VIDEO.heading}
                </h2>

                {/* The card arrives rather than takes over: ground stays visible
                    on all four sides. Opacity and blur both read `--takeover`,
                    not `--t`: it goes from 0 to 1 over exactly the one screen of
                    scroll it takes the section to arrive at the top of the
                    viewport, not partway through the long pin that follows. So
                    the card starts softly blurred, clears within that one
                    scroll, and stays clear through however many screens of hold
                    are left. The scale still reads `--t`, so the arrival keeps
                    its settle. */}
                <div
                    className="group relative w-auto max-h-none max-w-full min-[900px]:w-[min(82vw,140svh)] min-[900px]:max-h-full min-[900px]:[opacity:calc(0.8+0.2*var(--takeover,0))] min-[900px]:[filter:blur(calc((1-var(--takeover,0))*6px))] min-[900px]:[transform:scale(calc(0.93+0.07*var(--t,1)))] motion-reduce:max-h-none motion-reduce:opacity-100 motion-reduce:[filter:none] motion-reduce:[transform:none]"
                    data-started={started ? 'true' : 'false'}
                >
                    {VIDEO_YOUTUBE_ID ? (
                        started ? (
                            <iframe
                                ref={iframeRef}
                                className="block aspect-video h-auto w-full rounded-[14px] bg-white min-[900px]:rounded-[clamp(14px,1.6vw,24px)] min-[900px]:shadow-[0_30px_70px_rgb(20_32_31/13%)]"
                                src={`https://www.youtube.com/embed/${VIDEO_YOUTUBE_ID}?autoplay=1&rel=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
                                title={VIDEO.heading}
                                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : (
                            <>
                                {VIDEO_POSTER && (
                                    <Image
                                        className="block aspect-video h-auto w-full rounded-[14px] bg-white object-cover min-[900px]:rounded-[clamp(14px,1.6vw,24px)] min-[900px]:shadow-[0_30px_70px_rgb(20_32_31/13%)]"
                                        src={VIDEO_POSTER}
                                        alt=""
                                        width={1280}
                                        height={720}
                                    />
                                )}
                                <button
                                    type="button"
                                    /* A triangle and the word, left and
                                       vertically centred, not a big centred
                                       disc. It covers the whole frame, so the
                                       target is the video rather than a small
                                       label, while only the mark and the word
                                       are drawn. A flat left-edge wash darkens
                                       the same band at every height, so
                                       legibility does not depend on the
                                       footage. */
                                    className="absolute inset-0 z-[2] flex cursor-pointer items-center gap-3 rounded-[14px] border-0 bg-[linear-gradient(to_right,rgb(20_32_31/45%),rgb(20_32_31/16%)_38%,transparent_66%)] p-[clamp(22px,3vw,42px)] text-white transition-[background] duration-[250ms] ease-out hover:bg-[linear-gradient(to_right,rgb(20_32_31/55%),rgb(20_32_31/22%)_38%,transparent_66%)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[6px] focus-visible:outline-white min-[900px]:rounded-[clamp(14px,1.6vw,24px)] [&>svg]:h-[clamp(20px,2vw,30px)] [&>svg]:w-[clamp(20px,2vw,30px)] [&>svg]:fill-current [&>svg]:stroke-none [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-out hover:[&>svg]:scale-110"
                                    onClick={play}
                                    aria-label={VIDEO.playLabel}
                                >
                                    <Play aria-hidden="true" />
                                    <span className="text-[clamp(24px,2.6vw,40px)] font-normal leading-none tracking-[-0.02em]">
                                        {VIDEO.play}
                                    </span>
                                </button>
                            </>
                        )
                    ) : VIDEO_POSTER ? (
                        // No video yet. The poster alone still carries the section.
                        <Image
                            className="block aspect-video h-auto w-full rounded-[14px] bg-white object-cover min-[900px]:rounded-[clamp(14px,1.6vw,24px)] min-[900px]:shadow-[0_30px_70px_rgb(20_32_31/13%)]"
                            src={VIDEO_POSTER}
                            alt=""
                            width={1280}
                            height={720}
                        />
                    ) : (
                        <div className="block aspect-video h-auto w-full rounded-[14px] bg-[#eceee6] min-[900px]:rounded-[clamp(14px,1.6vw,24px)]" />
                    )}
                </div>
            </div>
        </section>
    );
}
