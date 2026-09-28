'use client';

import { useReveal, revealClass } from '../useReveal';

const ROWS = [
    ['Your product', 'Authentication flows'],
    ['Your AI', 'OAuth'],
    ['Your user experience', 'Token management'],
    ['Your business logic', 'Token refresh'],
    ['Your actions', 'Reauthorization'],
    ['Your customers', 'Connection management'],
    ['Your UI', 'App-specific authentication'],
];

export default function CompareTable() {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} className={`overflow-x-auto border border-dev-line rounded-[18px] bg-dev-surface max-w-[820px] ${revealClass(visible)}`}>
            <table className="w-full border-collapse text-[15.5px]">
                <thead>
                    <tr>
                        <th className="font-dev-mono text-[11.5px] tracking-[0.12em] uppercase text-dev-ink-3 font-medium px-5 py-4 text-left border-b border-dev-line">You build</th>
                        <th className="font-dev-mono text-[11.5px] tracking-[0.12em] uppercase text-dev-accent font-medium px-5 py-4 text-left border-b border-dev-line">viaSocket handles</th>
                    </tr>
                </thead>
                <tbody>
                    {ROWS.map(([a, b], i) => (
                        <tr key={a}>
                            <td className={`px-5 py-[13px] text-dev-ink-2 ${i < ROWS.length - 1 ? 'border-b border-dev-line' : ''}`}>{a}</td>
                            <td className={`px-5 py-[13px] text-dev-ink font-medium ${i < ROWS.length - 1 ? 'border-b border-dev-line' : ''}`}>{b}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
