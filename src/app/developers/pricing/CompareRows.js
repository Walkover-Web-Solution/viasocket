'use client';

import { Check } from 'lucide-react';
import { H2, Label, Scene } from '../Heading';
import { useReveal, revealClass } from '../useReveal';

const YES = <Check size={18} strokeWidth={2.2} className="text-dev-ok" />;

const ROWS = [
    ['Price', '$0', '$29/mo', '$99/mo', 'Custom'],
    ['Tasks', '100K/mo', '1M/mo', '5M/mo', 'Custom'],
    ['2,300+ apps', YES, YES, YES, YES],
    ['Managed auth', YES, YES, YES, YES],
    ['Managed mapping', YES, YES, YES, YES],
    ['Multi-tenant', YES, YES, YES, YES],
    ['Customizable UI', YES, YES, YES, YES],
    ['Your branding', '—', YES, YES, YES],
    ['Monitoring & debugging', 'Basic', 'Basic', 'Advanced', 'Advanced'],
    ['Triggers & webhooks', YES, YES, YES, YES],
    ['Server localization', YES, YES, YES, YES],
    ['Real-time execution', YES, YES, YES, YES],
    ['Support', 'Community', 'Slack', 'Priority Slack', 'Dedicated'],
];

export default function CompareRows() {
    const [ref, visible] = useReveal();
    return (
        <Scene>
            <Label>Compare plans</Label>
            <H2>Every plan, side by side.</H2>
            <div ref={ref} className={`overflow-x-auto border border-dev-line rounded-[18px] bg-dev-surface ${revealClass(visible)}`}>
                <table className="w-full border-collapse text-[15px] min-w-[680px]">
                    <thead>
                        <tr>
                            {['Plan', 'Free', 'Growth', 'Scale', 'Enterprise'].map((h, i) => (
                                <th
                                    key={h}
                                    className={`font-dev-mono text-[11.5px] tracking-[0.12em] uppercase font-medium px-[18px] py-4 text-left border-b border-dev-line ${i === 0 ? 'w-[28%]' : ''} ${i === 2 ? 'text-dev-accent' : 'text-dev-ink-3'}`}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {ROWS.map((row, i) => (
                            <tr key={row[0]}>
                                <th
                                    scope="row"
                                    className={`font-medium text-left px-[18px] py-[14px] text-dev-ink ${i < ROWS.length - 1 ? 'border-b border-dev-line' : ''} ${i < 2 ? 'font-semibold' : ''}`}
                                >
                                    {row[0]}
                                </th>
                                {row.slice(1).map((cell, j) => (
                                    <td
                                        key={j}
                                        className={`px-[18px] py-[14px] text-dev-ink-2 ${i < ROWS.length - 1 ? 'border-b border-dev-line' : ''} ${i < 2 ? 'font-semibold text-dev-ink' : ''} ${cell === '—' ? 'text-dev-ink-3' : ''}`}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Scene>
    );
}
