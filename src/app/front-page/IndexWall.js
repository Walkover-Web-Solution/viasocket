'use client';

import { INDEX_UTM_SOURCE, buildSignupHref, carryPromptToSignup, trackSignupClick } from './signup';

const WALL =
    /**
     * The use case wall: breadth, where the showcase is depth. Five jobs told
     * properly answer "what is this"; thirty answer "would it do MY thing",
     * which is the question the reader actually arrives with and the one the
     * showcase cannot answer without becoming a list.
     *
     * Every job is a link to signup carrying its own words, the same handoff
     * the hero makes. No receipt and no subtitle: thirty jobs each carrying a
     * second grey line doubled the section's height and gave the eye two things
     * to read per row, in a list whose whole job is to be scanned for one
     * recognisable sentence.
     */
    {
        heading: 'What else would you like done?',
        groups: [
            {
                title: 'Data collection automation',
                tone: 'lime',
                jobs: [
                    'Add invoice details to accounting.',
                    'Put new bookings into the right calendar.',
                    'Move online orders into a tracking sheet.',
                    'Save every signed contract to the right client folder.',
                    'Copy new leads into the CRM.',
                ],
            },
            {
                title: 'Monitoring automation',
                tone: 'blue',
                jobs: [
                    'Check which products need reordering.',
                    'Check whether a delivery is late.',
                    'Watch important customer issues.',
                    'Tell me when a customer\u2019s card payment fails.',
                    'Tell me when a payment finally lands.',
                ],
            },
            {
                title: 'Follow up automation',
                tone: 'coral',
                jobs: [
                    'Remind customers who haven\u2019t paid.',
                    'Ask clients for missing documents.',
                    'Follow up on quotes that went quiet.',
                    'Remind a customer to confirm their booking.',
                    'Chase suppliers who haven\u2019t confirmed.',
                ],
            },
            {
                title: 'Research automation',
                tone: 'violet',
                jobs: [
                    'Research every new supplier before a large order.',
                    'Compare vendors and shortlist three.',
                    'Research a lead\u2019s company before the first call.',
                    'Prepare me before an important meeting.',
                    'Fill in the missing email and phone on this company list.',
                ],
            },
            {
                title: 'Reporting automation',
                tone: 'sand',
                jobs: [
                    'Tell me what needs my attention every morning.',
                    'Send me the week\u2019s important numbers.',
                    'Summarize unresolved customer issues.',
                    'Prepare Monday\u2019s management update.',
                    'Show me which customers spent the most.',
                ],
            },
            {
                title: 'Routing automation',
                tone: 'mint',
                jobs: [
                    'Which invoices need a closer look?',
                    'Prioritize urgent customer requests.',
                    'Assign new deals to the right sales rep.',
                    'File incoming invoices by supplier and month.',
                    'Decide which leads are worth calling.',
                ],
            },
        ],
    };

/**
 * The use case wall. Breadth, where the showcase is depth: a reader who has
 * just been shown five jobs in depth is asking "would it do MY thing", and
 * thirty receipts answer that where five stories cannot.
 *
 * Every job is a link to signup carrying its own words, the same handoff the
 * hero makes — so the wall carries intent to the one ask on the page rather
 * than adding a second.
 *
 * Motion is a colour shift and a slide. Nothing flies, nothing narrates: a
 * section of thirty rows is the last place that should move.
 */

/* The groups are offset against each other, so the eye moves down the page
   rather than across a grid. The stagger is a desktop idea: six offset groups
   on a phone is just six groups that do not line up, so below 900 they run in
   one column at their natural positions. */
const GROUP_PLACE = [
    'min-[900px]:[grid-area:one]',
    'min-[900px]:[grid-area:two] min-[900px]:translate-y-[34px]',
    'min-[900px]:[grid-area:three]',
    'min-[900px]:[grid-area:four] min-[900px]:translate-y-[22px]',
    'min-[900px]:[grid-area:five] min-[900px]:translate-y-[54px]',
    'min-[900px]:[grid-area:six] min-[900px]:translate-y-[4px]',
];

/* Bolder outright, not the accent hues lightened: the pale versions read as
   nothing against this section's ground. */
const DOT = {
    lime: 'bg-[#9fcc00]',
    blue: 'bg-[#2f8fe8]',
    coral: 'bg-[#f2673f]',
    violet: 'bg-[#7c5cff]',
    sand: 'bg-[#e0a800]',
    mint: 'bg-[#14b585]',
};

export default function IndexWall() {
    return (
        // The id is the showcase's handoff target.
        <section
            id="use-cases"
            className="scroll-mt-[54px] min-[721px]:scroll-mt-16 relative bg-index-wall px-5 pb-16 pt-[76px] font-index-sans text-index-ink min-[900px]:px-index-gutter min-[900px]:pb-24 min-[900px]:pt-[104px]"
            aria-labelledby="wall-heading"
        >
            {/* No lead line: the heading asks the question and the wall answers
                it. A sentence counting the jobs and explaining the interaction
                would be labelling what is already visible. */}
            <div className="grid grid-cols-1 items-start gap-[14px] min-[900px]:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] min-[900px]:gap-12">
                <h2
                    id="wall-heading"
                    className="m-0 max-w-[12ch] font-index-display text-[clamp(40px,5.4vw,78px)] font-normal leading-[0.98] tracking-[-0.03em] text-index-ink min-[900px]:tracking-[-0.045em]"
                >
                    {WALL.heading}
                </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 items-start gap-10 min-[900px]:mt-[88px] min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)_minmax(0,1fr)] min-[900px]:gap-x-16 min-[900px]:gap-y-[54px] min-[900px]:[grid-template-areas:'one_._two''._three_.''four_._five''._six_.']">
                {WALL.groups.map((group, gi) => (
                    <div key={group.title} className={GROUP_PLACE[gi]}>
                        {/* The dot is the only colour in the section. It marks
                            the heading; it does not tint the rows. */}
                        <h3 className="m-0 mb-3 flex items-center font-index-display text-[34px] font-normal leading-none tracking-[-0.03em] text-index-ink min-[900px]:mb-4 min-[900px]:text-index-group min-[900px]:tracking-[-0.055em]">
                            {group.title}
                            <i
                                className={`ml-[9px] h-[13px] w-[13px] flex-none rounded-full ${DOT[group.tone]}`}
                                aria-hidden="true"
                            />
                        </h3>

                        {group.jobs.map((ask) => (
                            <a
                                key={ask}
                                /* Set as a block so the whole row is the target
                                   rather than the text alone. */
                                className="mb-[14px] block p-0 text-[#5c685f] transition-[color,transform] duration-200 ease-out last:mb-0 hover:translate-x-1 hover:text-index-ink focus-visible:rounded-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-index-ink min-[900px]:mb-[15px]"
                                href={buildSignupHref(INDEX_UTM_SOURCE)}
                                onClick={() => {
                                    carryPromptToSignup(ask);
                                    trackSignupClick(INDEX_UTM_SOURCE, {
                                        element: 'index_wall_job',
                                        label: ask,
                                    });
                                }}
                            >
                                <span className="block text-base leading-[1.25] min-[900px]:text-[17px]">{ask}</span>
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
