'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import IndexMark from './IndexMark';
import IndexHeroApps from './IndexHeroApps';
import { INDEX_UTM_SOURCE, buildSignupHref, carryPromptToSignup, trackSignupClick } from './signup';

const HERO = {
    heading: 'What do you want done?',
    // Opens on "Describe" deliberately: the competition all lead their
    // heroes on "build", and that one verb is the whole difference. Nine
    // words, and both claims in it are new information — you do not build
    // it, and it is reliable.
    subhead: 'Describe the job. viaSocket turns it into reliable automation.',
    inputLabel: 'Tell viaSocket what you need done',
    placeholder: 'Tell viaSocket the work…',
    submit: 'Do it',
    ideasLabel: 'Example requests',
    ideas: [
        'Read these invoices and add the numbers to my accounting.',
        'Turn these customer messages into tasks.',
        'Find the missing details in this supplier list.',
        'Check which products need reordering.',
    ],
    // The free-plan figure is read off viasocket.com/pricing. It is also stated
    // in the FAQ's cost answer and in the closing section's micro line; if it
    // moves there it moves here.
    footnote: 'Free to start with 10,000 tasks a month.',
};

/**
 * The hero: the live mark, the question, the subhead, the prompt box and the
 * app row, with four example requests floating in the gutters.
 *
 * It carries no proof of any kind. That is deliberate, and it moves the whole
 * proof burden onto the sections below.
 *
 * The box does not scroll to a demo; it hands the typed job straight to signup,
 * so there is one conversion path rather than two. An empty box still
 * navigates, it just arrives without a prompt.
 */

/* The example requests live in the gutter, and the gutter is measured, not
   guessed. Both the width and the offset are vw-based, so a quote's inner edge
   tracks the headline's outer edge instead of closing on it as the screen
   narrows. */
const IDEA_PLACE = [
    'top-[16%] left-[clamp(16px,3vw,72px)] rotate-[-3deg]',
    'top-[27%] -mt-[34px] right-[clamp(16px,3vw,72px)] rotate-[2deg]',
    'bottom-[17%] left-[clamp(16px,3vw,72px)] rotate-[2deg]',
    'bottom-[20%] right-[clamp(16px,3vw,72px)] rotate-[-2deg]',
];

export default function IndexHero({ apps, appCount }) {
    const [request, setRequest] = useState('');
    const [attentive, setAttentive] = useState(false);
    const inputRef = useRef(null);

    const pickIdea = (idea) => {
        setRequest(idea);
        inputRef.current?.focus();
    };

    const startWork = (event) => {
        event.preventDefault();
        const destinationUrl = buildSignupHref(INDEX_UTM_SOURCE);

        // The typed job travels in the utmData cookie, which is what signup
        // actually reads, so it must be written before the page leaves.
        carryPromptToSignup(request);

        trackSignupClick(INDEX_UTM_SOURCE, {
            element: 'index_hero_ask',
            label: HERO.submit,
            destinationUrl,
        });

        window.open(destinationUrl, '_self');
    };

    return (
        <section
            id="top"
            /* `hero-scene` carries no styles: it is the handle the mark's
               pointer tracking uses to measure this section. */
            className="hero-scene scroll-mt-[54px] min-[721px]:scroll-mt-16 relative isolate flex h-auto min-h-svh flex-col overflow-hidden bg-index-paper px-5 pb-0 pt-[84px] font-index-sans text-index-ink min-[721px]:h-svh min-[721px]:px-index-gutter min-[721px]:pb-[70px] min-[721px]:pt-[104px]"
        >
            <div className="[opacity:calc(1-var(--takeover,0))] relative z-[2] m-auto w-[min(900px,100%)] text-center min-[721px]:-top-[34px]">
                <IndexMark attentive={attentive} />

                <h1 className="m-0 font-index-display text-[40px] font-normal leading-[0.88] tracking-[-0.02em] min-[721px]:text-index-hero min-[721px]:tracking-[-0.03em] min-[900px]:tracking-[-0.06em]">
                    {HERO.heading}
                </h1>

                <p className="mt-[14px] text-[17px] leading-[1.35] text-index-ink min-[721px]:mt-[18px] min-[721px]:text-[19px]">
                    {HERO.subhead}
                </p>

                {/* One pill, the input flush inside it, the submit as a filled
                    counterpart so the page has one button shape. */}
                <form
                    className="mx-auto mt-6 flex w-[min(660px,100%)] items-center gap-2 rounded-full border border-[#cfd2c9] bg-[rgb(255_255_252/73%)] p-[5px] shadow-[0_15px_44px_rgb(31_39_33/5%)] min-[721px]:mt-[30px] min-[721px]:p-[7px]"
                    onSubmit={startWork}
                >
                    <input
                        ref={inputRef}
                        className="h-12 min-w-0 flex-1 border-0 bg-transparent px-4 text-base text-index-ink placeholder:text-[#a0a69f] focus:shadow-none focus:outline-none"
                        type="text"
                        aria-label={HERO.inputLabel}
                        placeholder={HERO.placeholder}
                        value={request}
                        onChange={(event) => setRequest(event.target.value)}
                        onFocus={() => setAttentive(true)}
                        onBlur={() => setAttentive(false)}
                    />
                    {/* Under 720 the label goes and the arrow carries the
                        button: at that width the word and the field were
                        competing for the same row. */}
                    <button
                        className="flex h-12 min-w-[48px] items-center gap-[5px] rounded-full bg-index-ink px-[14px] text-[0px] text-white transition-colors duration-[180ms] ease-out hover:bg-[#2a3834] min-[721px]:px-[19px] min-[721px]:text-[15px]"
                        type="submit"
                    >
                        {HERO.submit} <ArrowUpRight aria-hidden="true" size={18} />
                    </button>
                </form>

                <IndexHeroApps apps={apps} appCount={appCount} />
            </div>

            {/* Below 1000px the examples go entirely. Not because they would
                overlap — the vw-based rule prevents that at any width — but
                because the column left for them is under 180px, and a 23px serif
                in 180px wraps into a tall narrow stack that reads as debris
                beside the headline rather than as an example. */}
            <div
                className="[opacity:calc(1-var(--takeover,0))] pointer-events-none absolute inset-x-0 bottom-0 top-[76px] z-[1] hidden min-[1000px]:block"
                aria-label={HERO.ideasLabel}
            >
                {HERO.ideas.map((idea, index) => (
                    <button
                        key={idea}
                        type="button"
                        className={`pointer-events-auto absolute max-w-[min(290px,calc(21vw-32px))] border-0 bg-transparent p-0 text-left font-index-display text-[clamp(23px,2.2vw,35px)] leading-[0.98] tracking-[-0.045em] text-[#66716a] transition-[color,transform] duration-[350ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-[7px] hover:text-index-ink ${IDEA_PLACE[index]}`}
                        onClick={() => pickIdea(idea)}
                    >
                        {idea}
                    </button>
                ))}
            </div>

            <p className="[opacity:calc(1-var(--takeover,0))] absolute inset-x-0 bottom-3 z-[2] m-0 text-center text-[11px] text-index-muted min-[721px]:bottom-12 min-[721px]:text-[13px]">
                {HERO.footnote}
            </p>
        </section>
    );
}
