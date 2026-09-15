'use client';

import { useEffect } from 'react';

/**
 * The story clock. One timeline per card, not a list of frames.
 *
 * A cut asks the reader to infer that viaSocket did the work, because the thing
 * that went in and the thing that came out were never on screen together. Here
 * they always are.
 *
 * Everything is a function of `t`, seconds since the card became active. Steps
 * are one-shot: each fires the first time `t` crosses it. `tick` runs every
 * frame for anything continuous. Both derive from the same clock, so nothing
 * can drift out of step with anything else.
 *
 * `finish` is not optional and it is not decoration. It renders the end state
 * with nothing in flight, and it is what an inactive card, a reduced-motion
 * reader and a paused loop all get. A card must rest in its completed state;
 * the resting state is never a blank stage.
 */
export function useTimeline({ live, runId, stageRef, reset, finish, steps, tick, total }) {
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return undefined;

        // Always reset first. A card can be interrupted at any point in its
        // story, and leftover state from the previous run is how a loop restart
        // ends up painting two states on top of each other.
        reset(stage);

        if (!live) {
            finish(stage);
            return undefined;
        }

        const plan = steps(stage)
            .slice()
            .sort((a, b) => a[0] - b[0]);
        const fired = new Array(plan.length).fill(false);
        let raf = 0;
        const t0 = performance.now();

        const frame = (now) => {
            const t = (now - t0) / 1000;
            for (let i = 0; i < plan.length; i += 1) {
                if (!fired[i] && t >= plan[i][0]) {
                    fired[i] = true;
                    plan[i][1]();
                }
            }
            tick?.(t, stage);
            // Stop at the end rather than spinning: the card is resting, not
            // thinking.
            if (t < total) raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);

        return () => cancelAnimationFrame(raf);
    }, [live, runId, stageRef, reset, finish, steps, tick, total]);
}

/** `data-on` is the single switch every stage uses, so `finish` can be literal. */
export function on(node, value = true) {
    if (node instanceof HTMLElement || node instanceof SVGElement) {
        node.dataset.on = value ? 'true' : 'false';
    }
}

export function onAll(stage, selector, value = true) {
    stage.querySelectorAll(selector).forEach((node) => on(node, value));
}
