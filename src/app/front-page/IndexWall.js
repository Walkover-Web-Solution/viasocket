'use client';

import { ArrowUpRight } from 'lucide-react';
import { INDEX_UTM_SOURCE, buildSignupHref, carryPromptToSignup, trackSignupClick } from './signup';
import { WALL_GROUP_TITLES } from './content';

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
                title: WALL_GROUP_TITLES[0],
                tone: 'lime',
                jobs: [
                    {
                        ask: 'Add invoice details to accounting.',
                        prompt: 'When a new supplier invoice arrives, use an AI step to read the supplier, invoice number, date, and amount from it, then add those details to my accounting tool. Ask me where invoices arrive and which accounting tool I use before you set it up.',
                    },
                    {
                        ask: 'Put new bookings into the right calendar.',
                        prompt: 'When a new booking comes in, create the event in the right calendar with the customer, the service, and the time, and invite whoever is assigned to it. Ask me where bookings come in and which calendars I use before you set it up.',
                    },
                    {
                        ask: 'Move online orders into a tracking sheet.',
                        prompt: 'When a new online order comes in, add a row to my order tracking sheet with the order number, customer, items, amount, and status. Ask me where my orders come in and which sheet to use before you set it up.',
                    },
                    {
                        ask: 'Save every signed contract to the right client folder.',
                        prompt: 'When a contract is signed, save the signed copy into that client\u2019s folder in my file storage, named with the client and the date. Ask me which e-signature tool and which file storage I use before you set it up.',
                    },
                    {
                        ask: 'Copy new leads into the CRM.',
                        prompt: 'When a new lead comes in, create or update that contact in my CRM with their name, email, phone, company, and where the lead came from. Ask me where my leads come in and which CRM I use before you set it up.',
                    },
                ],
            },
            {
                title: WALL_GROUP_TITLES[1],
                tone: 'blue',
                jobs: [
                    {
                        ask: 'Check which products need reordering.',
                        prompt: 'Every Monday morning, check my stock levels and send me the list of products that have fallen below their reorder point, with the supplier and a suggested quantity for each. Ask me where my stock levels are kept.',
                    },
                    {
                        ask: 'Check whether a delivery is late.',
                        prompt: 'Every morning, check my open deliveries against their promised dates and tell me which ones are late, with the order, the customer, and how many days late it is. Ask me where my orders and delivery tracking live.',
                    },
                    {
                        ask: 'Watch important customer issues.',
                        prompt: 'When a customer issue is raised, use an AI step to judge how serious it is, and if it is serious, post it to my team channel with the customer, the issue, and how long it has been open. Ask me where issues are raised and where my team wants to be told.',
                    },
                    {
                        ask: 'Tell me when a customer\u2019s card payment fails.',
                        prompt: 'When a customer\u2019s card payment fails, tell me straight away with the customer, the amount, and the reason it failed, and draft a message asking them to update their payment details. Ask me which payment tool I use and where to notify me.',
                    },
                    {
                        ask: 'Tell me when a payment finally lands.',
                        prompt: 'When a payment arrives, match it to the invoice it pays, mark that invoice as paid, and tell me the customer, the amount, and the invoice number. Ask me which payment tool and which accounting tool I use.',
                    },
                ],
            },
            {
                title: WALL_GROUP_TITLES[2],
                tone: 'coral',
                jobs: [
                    {
                        ask: 'Remind customers who haven\u2019t paid.',
                        prompt: 'Every weekday morning, find the invoices that are past their due date and send each of those customers a polite payment reminder, stopping as soon as an invoice is paid. Ask me which invoicing tool I use and which email account to send from.',
                    },
                    {
                        ask: 'Ask clients for missing documents.',
                        prompt: 'When a client\u2019s file is missing a document we need, email that client a request listing exactly what is missing, and remind them every few days until it arrives. Ask me where client files are kept and which documents are required.',
                    },
                    {
                        ask: 'Follow up on quotes that went quiet.',
                        prompt: 'When a quote has had no reply for a week, send that customer a short follow up, and tell me if there is still no reply after the second one. Ask me where my quotes live and which email account to send from.',
                    },
                    {
                        ask: 'Remind a customer to confirm their booking.',
                        prompt: 'When a booking is still unconfirmed the day before it happens, remind the customer to confirm it, and tell my team if it is still unconfirmed on the morning. Ask me where bookings come in and how customers prefer to be contacted.',
                    },
                    {
                        ask: 'Chase suppliers who haven\u2019t confirmed.',
                        prompt: 'When a purchase order has not been confirmed by the supplier within two days, chase that supplier for confirmation and tell me which orders are still waiting. Ask me where my purchase orders live and which email account to send from.',
                    },
                ],
            },
            {
                title: WALL_GROUP_TITLES[3],
                tone: 'violet',
                jobs: [
                    {
                        ask: 'Research every new supplier before a large order.',
                        prompt: 'Before I place a large order with a supplier I have not used before, research the company, how long it has traded, what people say about it, and anything that looks risky, then send me a short brief. Ask me what counts as a large order and where my suppliers are listed.',
                    },
                    {
                        ask: 'Compare vendors and shortlist three.',
                        prompt: 'Research the vendors for something I am buying, compare them on price, features, support, and reviews, then shortlist the best three with a sentence on why each one made the list. Ask me what I am buying and what matters most to me.',
                    },
                    {
                        ask: 'Research a lead\u2019s company before the first call.',
                        prompt: 'When a new lead is added, research their company, what it does, its size, and anything recent worth knowing, then add a short brief to their record in my CRM. Ask me where my leads come in and which CRM I use.',
                    },
                    {
                        ask: 'Prepare me before an important meeting.',
                        prompt: 'An hour before a meeting with someone outside my company, send me a short brief on who I am meeting, their company, what we last discussed, and anything still open with them. Ask me which calendar to read and where our history with them lives.',
                    },
                    {
                        ask: 'Fill in the missing email and phone on this company list.',
                        prompt: 'Take my list of companies, find the missing work email and phone number for each one, write them back into the list, and mark the ones that could not be found. Ask me where the list is and which details are missing.',
                    },
                ],
            },
            {
                title: WALL_GROUP_TITLES[4],
                tone: 'sand',
                jobs: [
                    {
                        ask: 'Tell me what needs my attention every morning.',
                        prompt: 'Every morning at 9, use an AI step to go through what came in overnight and send me the short list of things that actually need me, with a line on why each one is on it. Ask me which inboxes, tools, and channels to read, and where to send the list.',
                    },
                    {
                        ask: 'Send me the week\u2019s important numbers.',
                        prompt: 'Every Monday at 9am, pull last week\u2019s key numbers, compare them with the week before, and send me the summary with anything that moved sharply called out. Ask me which numbers matter to me and where they live.',
                    },
                    {
                        ask: 'Summarize unresolved customer issues.',
                        prompt: 'Every Monday morning, use an AI step to summarise the customer issues that are still open, grouped by how serious they are, with how long each one has been waiting. Ask me where customer issues are tracked and where to send the summary.',
                    },
                    {
                        ask: 'Prepare Monday\u2019s management update.',
                        prompt: 'Every Monday at 8am, pull last week\u2019s numbers and the open items from across my tools, use an AI step to draft the management update, and send it to me to check before it goes out. Ask me what the update should cover and who receives it.',
                    },
                    {
                        ask: 'Show me which customers spent the most.',
                        prompt: 'Every month, work out which customers spent the most, how that compares with the month before, and which ones dropped off, then send me the list. Ask me where my sales or payment data lives.',
                    },
                ],
            },
            {
                title: WALL_GROUP_TITLES[5],
                tone: 'mint',
                jobs: [
                    {
                        ask: 'Which invoices need a closer look?',
                        prompt: 'Every week, use an AI step to check my incoming invoices for anything unusual, such as a duplicate, an amount well outside the normal range, or changed bank details, and send me the ones worth a closer look with the reason. Ask me where invoices arrive.',
                    },
                    {
                        ask: 'Prioritize urgent customer requests.',
                        prompt: 'When a customer request arrives, use an AI step to judge how urgent it is, put the urgent ones at the top of the queue, and tell the right person if one needs an answer today. Ask me where requests arrive and who handles what.',
                    },
                    {
                        ask: 'Assign new deals to the right sales rep.',
                        prompt: 'When a new deal is created, assign it to the right sales rep using the rules I give you, update the deal owner, and tell that rep with the company, the value, and where the lead came from. Ask me which CRM I use and how deals should be split.',
                    },
                    {
                        ask: 'File incoming invoices by supplier and month.',
                        prompt: 'When a supplier invoice arrives, use an AI step to read the supplier name and the invoice date from it, then save the file into the folder for that supplier and month, creating the folder if it does not exist. Ask me where invoices arrive and which file storage I use.',
                    },
                    {
                        ask: 'Decide which leads are worth calling.',
                        prompt: 'When a new lead comes in, use an AI step to score how well it fits what we sell, and if it scores well, flag it for a call and tell the sales team, otherwise leave it in the list. Ask me what a good lead looks like and which CRM I use.',
                    },
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

export default function IndexWall({ utmSource = INDEX_UTM_SOURCE }) {
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

                        {group.jobs.map((job) => (
                            <a
                                key={job.ask}
                                /* Set as a block so the whole row is the target
                                   rather than the text alone. */
                                className="group mb-[14px] flex items-center gap-2 p-0 text-[#5c685f] transition-[color,transform] duration-200 ease-out last:mb-0 hover:translate-x-1 hover:text-index-ink focus-visible:rounded-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-index-ink min-[900px]:mb-[15px]"
                                href={buildSignupHref(utmSource)}
                                onClick={() => {
                                    carryPromptToSignup(job.prompt);
                                    trackSignupClick(utmSource, {
                                        element: 'index_wall_job',
                                        label: job.ask,
                                    });
                                }}
                            >
                                <span className="block text-base leading-[1.25] min-[900px]:text-[17px]">{job.ask}</span>
                                {/* Hidden until hover, so the row reads as
                                    plain text at rest and thirty of these
                                    don't compete with the copy. */}
                                <span className="flex flex-none translate-x-1 text-blue-600 items-center gap-1 whitespace-nowrap pt-[2px] text-sm font-medium opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                                    Do this
                                    <ArrowUpRight className="h-[14px] w-[14px]" aria-hidden="true" />
                                </span>
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
