/**
 * The viaSocket mark, for use inside a card visual — the thing doing the work
 * between what arrives and what comes out.
 *
 * It cannot be IndexMark itself: that one measures the hero's rect on every
 * resize and runs a glance timer, and this renders in several places at once.
 * So this is the same geometry with no behaviour — no roll-in, no landing
 * shadow, no blink.
 *
 * The shapes are copied from IndexMark unchanged, and that is deliberate: if
 * the mark is retraced, both change together or they diverge on the page.
 *
 * Sized by its container, so every caller sets the box and this fills it.
 */
export default function IndexCardMark() {
    return (
        <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100" role="img" aria-label="viaSocket">
            <rect className="fill-index-ink" x="4" y="4" width="92" height="92" rx="10" />
            <g>
                <rect className="fill-white opacity-95" x="25" y="34" width="16" height="16" rx="8" />
                <rect className="fill-white opacity-95" x="59" y="34" width="16" height="16" rx="8" />
            </g>
            <path
                className="fill-none stroke-white stroke-[3.5] opacity-95 [stroke-linecap:round]"
                d="M40,62 Q50,69 60,62"
            />
        </svg>
    );
}
