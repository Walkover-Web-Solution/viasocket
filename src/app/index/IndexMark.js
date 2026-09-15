'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * viaSocket's mark for /index: a square body with a small corner radius, two
 * round white eyes and a smile. An expressive interpretation, not the mark
 * itself — the actual logo is unchanged everywhere else it appears — and the
 * one hard constraint is that it must still read as the viaSocket logo at a
 * glance. Same frame, same proportions.
 *
 * Behaviours: an irregular blink, an idle glance that occasionally eases the
 * eyes toward a squarer shape, pointer tracking across the hero, and attentive
 * (the eyes drop when the prompt input has focus). Each composes with blink
 * through a combined attribute selector in the stylesheet, so nothing
 * overwrites anything else on the same element.
 *
 * Entry, once per page load: the mark rolls in from off-screen left with an
 * overshoot, then a shadow fades in under it as it lands, then a slow idle bob.
 * Reduced motion renders it already landed, shadow on, with none of the
 * behaviours.
 */

const BLINK_MIN = 1100;
const BLINK_MAX = 2600;
/** Roughly one blink in four is a double. Irregular, never a rhythm. */
const DOUBLE_BLINK = 0.26;
const GLANCE_MIN = 3600;
const GLANCE_MAX = 7000;
/** Longest the mark will wait for webfonts before drawing anyway. */
const FONT_WAIT_MS = 1200;
/**
 * The roll-in runs 1.3s. The landing shadow starts fading in at 1.25s and takes
 * .35s, so it finishes at 1.6s; the entry state stays 'run' until then so the
 * shadow's fade is not cut short by the switch to 'done'.
 */
const ENTRY_MS = 1600;

const rand = (min, max) => min + Math.random() * (max - min);

/** Read at call time, not at module load: the setting can change mid-session. */
const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Module scope, so the entry animation survives a remount and never replays. */
let hasPlayedEntry = false;

export default function IndexMark({ attentive = false }) {
    const eyesRef = useRef(null);
    /**
     * `hold` is the state before the entry may start. The hero heading is a
     * display serif over a metric-matched fallback, and on a cold load the real
     * face arriving reflows the heading, which moves the mark down the page. The
     * entry used to begin on mount, which put it in the middle of that reflow.
     * So it waits for the fonts: the mark holds its space and paints nothing
     * until layout has settled, then rolls in once, in one place. `visibility`
     * rather than a missing element, so holding it cannot itself shift anything.
     */
    const [entry, setEntry] = useState('hold');

    useEffect(() => {
        if (hasPlayedEntry || prefersReducedMotion()) {
            setEntry('done');
            return undefined;
        }
        hasPlayedEntry = true;

        let doneTimer = 0;
        let cancelled = false;

        const start = () => {
            if (cancelled) return;
            // One frame after the fonts resolve, so the reflow they cause has
            // been laid out before the roll-in starts.
            requestAnimationFrame(() => {
                if (cancelled) return;
                setEntry('run');
                doneTimer = window.setTimeout(() => setEntry('done'), ENTRY_MS);
            });
        };

        // A cap, because the mark must never be the reason the hero looks empty:
        // a slow or blocked font file starts the entry anyway.
        const cap = window.setTimeout(start, FONT_WAIT_MS);
        if (document.fonts?.ready) {
            document.fonts.ready
                .then(() => {
                    window.clearTimeout(cap);
                    start();
                })
                .catch(() => {});
        }

        return () => {
            cancelled = true;
            window.clearTimeout(cap);
            window.clearTimeout(doneTimer);
        };
    }, []);

    useEffect(() => {
        // Reduced motion gets the static, landed mark and none of the behaviours.
        if (prefersReducedMotion()) return undefined;

        const eyes = eyesRef.current;
        if (!eyes) return undefined;

        let blinkTimer = 0;
        let glanceTimer = 0;

        const shut = (hold, then) => {
            if (!eyesRef.current) return;
            eyesRef.current.dataset.blink = 'closed';
            // Held a little longer than a single frame so the closed state
            // actually registers rather than being a frame nobody sees.
            window.setTimeout(() => {
                if (eyesRef.current) eyesRef.current.dataset.blink = 'open';
                if (then) window.setTimeout(then, 120);
            }, hold);
        };

        const blink = () => {
            if (Math.random() < DOUBLE_BLINK) shut(140, () => shut(140));
            else shut(170);
            blinkTimer = window.setTimeout(blink, rand(BLINK_MIN, BLINK_MAX));
        };
        blinkTimer = window.setTimeout(blink, rand(BLINK_MIN, BLINK_MAX));

        // Irregular on purpose. A regular interval reads as a loading spinner.
        const glance = () => {
            // Skipped while the pointer or the input already has the eyes.
            if (eyes.dataset.attentive !== 'true' && eyes.dataset.track !== 'true') {
                eyes.dataset.glance = Math.random() < 0.5 ? 'left' : 'right';
                // Roughly one glance in three also eases the eyes toward a
                // squarer shape, slower than the glance itself so it reads as
                // expression rather than as a glitch.
                const morph = Math.random() < 0.34;
                if (morph) eyes.dataset.shape = 'rect';
                window.setTimeout(() => {
                    if (!eyesRef.current) return;
                    eyesRef.current.dataset.glance = 'centre';
                    if (morph) eyesRef.current.dataset.shape = 'round';
                }, 1100);
            }
            glanceTimer = window.setTimeout(glance, rand(GLANCE_MIN, GLANCE_MAX));
        };
        glanceTimer = window.setTimeout(glance, rand(GLANCE_MIN, GLANCE_MAX));

        // Eyes follow the pointer across the hero, with a lag, so it reads as
        // attention. Throttled to one frame, transform only, and nothing in the
        // handler reads layout: the hero rect is measured once per resize, not
        // per move, so moving the pointer cannot thrash.
        const hero = eyes.closest('.hero-scene');
        let rect = hero ? hero.getBoundingClientRect() : null;
        const remeasure = () => {
            rect = hero ? hero.getBoundingClientRect() : null;
        };

        let frame = 0;
        let pending = null;

        const apply = () => {
            frame = 0;
            if (!pending || !rect || !eyesRef.current) return;
            const dx = (pending.x - (rect.left + rect.width / 2)) / (rect.width / 2);
            const dy = (pending.y - (rect.top + rect.height / 2)) / (rect.height / 2);
            const clamp = (v) => Math.max(-1, Math.min(1, v));
            eyesRef.current.style.setProperty('--px', `${(clamp(dx) * 7).toFixed(2)}px`);
            eyesRef.current.style.setProperty('--py', `${(clamp(dy) * 5).toFixed(2)}px`);
            eyesRef.current.dataset.track = 'true';
        };

        const onPointerMove = (event) => {
            // Touch has no hovering pointer; those devices keep the idle glance.
            if (event.pointerType === 'touch') return;
            pending = { x: event.clientX, y: event.clientY };
            if (!frame) frame = window.requestAnimationFrame(apply);
        };

        const onPointerLeave = () => {
            pending = null;
            if (eyesRef.current) {
                eyesRef.current.dataset.track = 'false';
                eyesRef.current.style.removeProperty('--px');
                eyesRef.current.style.removeProperty('--py');
            }
        };

        hero?.addEventListener('pointermove', onPointerMove);
        hero?.addEventListener('pointerleave', onPointerLeave);
        window.addEventListener('resize', remeasure);
        window.addEventListener('scroll', remeasure, { passive: true });

        return () => {
            window.clearTimeout(blinkTimer);
            window.clearTimeout(glanceTimer);
            if (frame) window.cancelAnimationFrame(frame);
            hero?.removeEventListener('pointermove', onPointerMove);
            hero?.removeEventListener('pointerleave', onPointerLeave);
            window.removeEventListener('resize', remeasure);
            window.removeEventListener('scroll', remeasure);
        };
    }, []);

    return (
        <span
            /* `visibility` rather than a missing element while it holds, so the
               slot it occupies is reserved throughout and holding it cannot
               itself shift anything. */
            className="group relative mx-auto mb-4 block h-14 w-14 data-[entry=hold]:invisible min-[721px]:mb-5 min-[721px]:h-[76px] min-[721px]:w-[76px]"
            data-entry={entry}
        >
            {/* Landing shadow: fades in as the mark lands and stays on once it
                has, including the reduced-motion already-landed state. */}
            <span
                className="absolute -bottom-1 left-1/2 h-[7px] w-[70%] -translate-x-1/2 rounded-[50%] bg-black/15 opacity-0 blur-[3px] group-data-[entry=run]:animate-index-mark-shadow group-data-[entry=done]:opacity-100"
                aria-hidden="true"
            />
            <svg
                className="relative z-[1] block h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                role="img"
                aria-label="viaSocket"
            >
                {/* Body, eyes and smile all roll in as one rigid shape. */}
                <g className="[transform-box:fill-box] [transform-origin:center] group-data-[entry=run]:animate-index-mark-roll group-data-[entry=done]:animate-index-mark-bob motion-reduce:animate-none">
                    <rect className="fill-index-ink" x="4" y="4" width="92" height="92" rx="10" />
                    <g
                        ref={eyesRef}
                        /* Glance, pointer tracking and attentive all move this
                           group; blink composes with each through the combined
                           data-attribute variants below, so nothing here fights
                           anything else on the same element. `rx` is animatable
                           on a rect and not on a circle, which is why the eyes
                           are rects that only read as circles at rest. */
                        className="[transform-box:fill-box] [transform-origin:center] transition-transform duration-[120ms] ease-in-out
                            data-[glance=left]:-translate-x-[7px] data-[glance=right]:translate-x-[7px]
                            data-[glance=left]:duration-[550ms] data-[glance=right]:duration-[550ms]
                            data-[glance=left]:ease-[cubic-bezier(0.4,0,0.2,1)] data-[glance=right]:ease-[cubic-bezier(0.4,0,0.2,1)]
                            data-[track=true]:[transform:translate(var(--px,0),var(--py,0))] data-[track=true]:duration-[160ms] data-[track=true]:ease-[cubic-bezier(0.33,0,0.2,1)]
                            data-[attentive=true]:[transform:translateY(6px)] data-[attentive=true]:duration-[400ms] data-[attentive=true]:ease-[cubic-bezier(0.4,0,0.2,1)]
                            data-[blink=closed]:[transform:scaleY(0.1)]
                            data-[glance=left]:data-[blink=closed]:[transform:translateX(-7px)_scaleY(0.1)]
                            data-[glance=right]:data-[blink=closed]:[transform:translateX(7px)_scaleY(0.1)]
                            data-[track=true]:data-[blink=closed]:[transform:translate(var(--px,0),var(--py,0))_scaleY(0.1)]
                            data-[attentive=true]:data-[blink=closed]:[transform:translateY(6px)_scaleY(0.1)]
                            [&>rect]:data-[shape=rect]:[rx:4px]
                            motion-reduce:transition-none"
                        data-blink="open"
                        data-glance="centre"
                        data-track="false"
                        data-shape="round"
                        data-attentive={attentive ? 'true' : 'false'}
                    >
                        <rect
                            className="fill-white opacity-95 [transform-box:fill-box] [transform-origin:center] transition-[rx] duration-[550ms] ease-in-out"
                            x="25"
                            y="34"
                            width="16"
                            height="16"
                            rx="8"
                        />
                        <rect
                            className="fill-white opacity-95 [transform-box:fill-box] [transform-origin:center] transition-[rx] duration-[550ms] ease-in-out"
                            x="59"
                            y="34"
                            width="16"
                            height="16"
                            rx="8"
                        />
                    </g>
                    <path
                        className="fill-none stroke-white stroke-[3.5] opacity-95 [stroke-linecap:round]"
                        d="M40,62 Q50,69 60,62"
                    />
                </g>
            </svg>
        </span>
    );
}
