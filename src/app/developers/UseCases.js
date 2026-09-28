'use client';

import { useEffect, useState } from 'react';
import { BrandIcon } from './BrandIcon';
import { H2, Scene } from './Heading';
import { revealClass, useReveal } from './useReveal';

const TABS = ['Sales AI', 'Support AI', 'Recruiting AI', 'Operations AI'];

const UC = [
    {
        who: 'inside your product · sales assistant',
        items: [
            ['Salesforce', 'Move this deal to Negotiation.'],
            ['HubSpot', "Log today's call on the contact."],
            ['Gmail', 'Send the proposal follow-up.'],
            ['Google Calendar', 'Book the demo for Thursday.'],
            ['Slack', 'Tell #sales we closed Acme.'],
            ['Asana', 'Create a follow-up for next week.'],
        ],
    },
    {
        who: 'inside your product · support copilot',
        items: [
            ['Zendesk', 'Mark this ticket urgent.'],
            ['Stripe', 'Refund the duplicate charge.'],
            ['Slack', 'Escalate this to #payments.'],
            ['Intercom', 'Reply to the customer with the fix.'],
            ['Notion', 'Add this to the known issues page.'],
            ['Jira', 'Open a bug for engineering.'],
        ],
    },
    {
        who: 'inside your product · recruiting assistant',
        items: [
            ['Greenhouse', 'Move Priya to interview.'],
            ['Google Calendar', 'Book 30 minutes with Dev.'],
            ['Gmail', 'Send the interview invite.'],
            ['Slack', 'Ask the panel for feedback.'],
            ['Notion', 'Add the scorecard to the hiring doc.'],
            ['Trello', 'Move the role to Offer stage.'],
        ],
    },
    {
        who: 'inside your product · operations agent',
        items: [
            ['Notion', 'Log this vendor invoice.'],
            ['Jira', 'Open a finance task for approval.'],
            ['QuickBooks', 'Record the bill for payment.'],
            ['Gmail', 'Ask the vendor for the missing PO.'],
            ['Slack', 'Post the weekly summary in #ops.'],
            ['Airtable', 'Update the vendor record.'],
        ],
    },
];

export default function UseCases() {
    const [active, setActive] = useState(0);
    const [ref, visible] = useReveal(0.2);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return undefined;
        const id = setInterval(() => setActive((i) => (i + 1) % TABS.length), 5000);
        return () => clearInterval(id);
    }, []);

    return (
        <Scene id="usecases">
            <H2 style={{ maxWidth: '22ch', marginBottom: '8px' }}>Give your AI access to your users&apos; apps</H2>
            <div ref={ref} className={`grid gap-[clamp(20px,3vw,32px)] ${revealClass(visible)}`}>
                <div role="tablist" className="flex gap-1.5 flex-wrap p-1 rounded-full bg-dev-surface-2 w-max max-w-full">
                    {TABS.map((tab, i) => (
                        <button
                            key={tab}
                            role="tab"
                            type="button"
                            aria-selected={active === i}
                            onClick={() => setActive(i)}
                            className={`text-[15px] font-medium px-[18px] py-[9px] rounded-full border-0 cursor-pointer transition-colors ${
                                active === i ? 'bg-dev-ink text-dev-ink-inv' : 'bg-transparent text-dev-ink-2'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div role="tabpanel" className="bg-dev-surface border border-dev-line rounded-[20px] shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25)] overflow-hidden">
                    <div className="flex justify-between gap-3 px-5 py-3 border-b border-dev-line font-dev-mono text-[11.5px] text-dev-ink-3">
                        <span>{UC[active].who}</span>
                        <span>verified</span>
                    </div>
                    <div className="p-[clamp(20px,3vw,32px)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {UC[active].items.map(([app, text]) => (
                            <div key={app + text} className="flex items-start gap-3 p-3 rounded-xl border border-dev-line">
                                <span className="w-8 h-8 rounded-lg bg-dev-surface-2 grid place-items-center shrink-0">
                                    <BrandIcon name={app} size={16} />
                                </span>
                                <span className="min-w-0">
                                    <b className="block text-[14.5px] font-medium leading-[1.35]">{text}</b>
                                    <span className="text-[12.5px] text-dev-ink-3">{app}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Scene>
    );
}
