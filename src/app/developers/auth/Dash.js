'use client';

import { BrandIcon } from '../BrandIcon';
import { useReveal, revealClass } from '../useReveal';

const STATUS_CLASS = { ok: 'text-dev-ok', warn: 'text-dev-warn', bad: 'text-dev-bad' };

export function Dash({ barLeft, barRight, barRightClass = '', rows, cols3 }) {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} className={`bg-dev-surface border border-dev-line rounded-[18px] shadow-[0_1px_1px_rgba(11,13,16,.04),0_24px_60px_-30px_rgba(11,13,16,.25)] overflow-hidden ${revealClass(visible)}`}>
            <div className="flex justify-between items-center gap-3 px-4 py-3 border-b border-dev-line font-dev-mono text-[11.5px] text-dev-ink-3">
                <span>{barLeft}</span>
                <span className={barRightClass}>{barRight}</span>
            </div>
            {rows.map((r, i) => (
                <div
                    key={i}
                    className={`grid ${cols3 ? 'grid-cols-[1.1fr_1fr_auto]' : 'grid-cols-[0.9fr_1.3fr_auto]'} gap-3 items-center px-4 py-3 text-[14px] ${i < rows.length - 1 ? 'border-b border-dev-line' : ''}`}
                >
                    <span className="flex items-center gap-2 font-semibold">
                        <BrandIcon name={r.app} size={16} />
                        {r.app}
                    </span>
                    <span className="text-dev-ink-2">{r.who}</span>
                    <span className={`inline-flex items-center gap-[7px] font-dev-mono text-[11px] whitespace-nowrap ${STATUS_CLASS[r.status]}`}>
                        <i className="w-2 h-2 rounded-full bg-current inline-block" />
                        {r.note}
                    </span>
                </div>
            ))}
        </div>
    );
}
