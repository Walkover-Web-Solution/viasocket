'use client';

import { BrandIcon } from '../BrandIcon';
import { useReveal, revealClass } from '../useReveal';

const ROWS = ['Customer A', 'Customer B', 'Customer C'];

export default function TenantTree() {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            className={`grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-8 gap-y-4 items-center max-w-[640px] ${revealClass(visible)}`}
            aria-label="Your AI product connects Customer A, B and C each to their own Salesforce account"
        >
            <div className="grid justify-items-center gap-2.5 text-center">
                <span className="w-[76px] h-[76px] rounded-full bg-dev-accent-soft grid place-items-center">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[34px] h-[34px] fill-none stroke-dev-accent stroke-[1.4] [stroke-linejoin:round]">
                        <path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z" />
                        <path d="M12 2.5v9M4 7l8 4.5L20 7M12 11.5l-8 5.5M12 11.5l8 5.5M12 11.5v10" />
                    </svg>
                </span>
                <b className="text-[13.5px] font-semibold">Your AI product</b>
            </div>
            <div className="grid gap-3.5">
                {ROWS.map((c) => (
                    <div key={c} className="grid grid-cols-[auto_1fr_auto] items-center gap-3.5">
                        <span className="border border-dev-line bg-dev-surface rounded-xl px-3.5 py-2.5 font-semibold text-[15px] whitespace-nowrap">{c}</span>
                        <i className="h-0.5 bg-[linear-gradient(90deg,#C9CDD3_0_40%,transparent_40%_100%)] bg-[length:8px_2px] block" />
                        <span className="flex items-center gap-1.5 border border-dev-line bg-dev-surface rounded-xl px-3.5 py-2.5 font-semibold text-[15px] whitespace-nowrap">
                            <BrandIcon name="Salesforce" size={16} />
                            {`Salesforce Account ${c.slice(-1)}`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
