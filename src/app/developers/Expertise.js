'use client';

import { H2, Lead, Scene } from './Heading';
import { useReveal, revealClass } from './useReveal';

const QA = [
    ['01', 'Authentication', "How does every customer securely connect their own account?"],
    ['02', 'Multi-tenancy', 'How do thousands of customers use the same integration without mixing connections or permissions?'],
    ['03', 'Tool discovery', 'How does your AI find the right capability without loading thousands of tools into its context?'],
    ['04', 'Mapping', 'How does the same intent work across apps with completely different data structures?'],
    ['05', 'Permissions', 'What can this particular AI read, write, create or delete?'],
    ['06', 'Execution', 'What happens when the API times out or rate-limits you?'],
    ['07', 'Recovery', 'How do you retry without accidentally performing the action twice?'],
    ['08', 'Monitoring', 'Can you see exactly what the AI tried to do and what actually happened?'],
];

function QAItem({ num, label, question }) {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} className={`grid gap-2 pl-[18px] border-l-2 border-dev-line ${revealClass(visible)}`}>
            <span className="font-dev-mono text-[11px] tracking-[0.12em] uppercase text-dev-ink-3 flex gap-[10px]">
                <i className="not-italic text-dev-accent">{num}</i>
                {label}
            </span>
            <b className="font-semibold text-dev-ink leading-[1.3] tracking-[-0.02em] text-[clamp(17px,1.55vw,21px)]">{question}</b>
        </div>
    );
}

export default function Expertise() {
    const [afterRef, afterVisible] = useReveal();
    return (
        <Scene id="expertise">
            <H2>The API call is the easy part.</H2>
            <Lead>Before you build another integration, think about what happens after the API call.</Lead>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(18px,2.4vw,32px)_clamp(28px,4vw,56px)] max-w-[1000px] my-2">
                {QA.map(([num, label, question]) => (
                    <QAItem key={num} num={num} label={label} question={question} />
                ))}
            </div>
            <p ref={afterRef} className={`font-semibold tracking-[-0.03em] text-[clamp(22px,2.6vw,34px)] ${revealClass(afterVisible)}`}>
                These aren&apos;t edge cases.
                <br />
                They&apos;re the integration layer.
            </p>
        </Scene>
    );
}
