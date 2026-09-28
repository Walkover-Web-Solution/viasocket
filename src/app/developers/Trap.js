'use client';

import { useEffect, useRef, useState } from 'react';
import { BrandIcon, APP_NAMES } from './BrandIcon';
import { H2, Scene } from './Heading';
import { useReveal, revealClass } from './useReveal';

const STAGES = [
    { n: 1, size: 'lg', copy: 'Salesforce. One auth flow, one data model. A sprint.' },
    { n: 5, size: 'lg', copy: 'HubSpot, Slack, Gmail, Zendesk. Four more auth flows, four more schemas.' },
    { n: 20, size: 'mid', copy: 'Every app has its own permissions and its own way of failing.' },
    { n: 120, size: 'dense', copy: 'Half the sprint is integrations. The AI roadmap is what slips.', more: 'and 2,200 more your users could ask for' },
];

const TILE_SIZE = { lg: 'w-9 h-9 rounded-[10px]', mid: 'w-[26px] h-[26px] rounded-[7px]', dense: 'w-[14px] h-[14px] rounded-[4px]' };
const CLUSTER_GAP = { lg: 'gap-[6px]', mid: 'gap-[5px]', dense: 'gap-1' };

function Cluster({ n, size }) {
    const [ref, visible] = useReveal(0.3);
    const tiles = Array.from({ length: n }, (_, i) => APP_NAMES[i % APP_NAMES.length]);
    return (
        <div ref={ref} className={`flex flex-wrap ${CLUSTER_GAP[size]} content-start min-h-[120px]`}>
            {tiles.map((name, i) => (
                <span
                    key={i}
                    title={name}
                    className={`${TILE_SIZE[size]} bg-white border border-dev-line grid place-items-center transition-all duration-[400ms] ease-out ${
                        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.7]'
                    } ${i === 0 && size !== 'dense' ? 'shadow-[0_0_0_2px_#0B0D10]' : ''}`}
                    style={{ transitionDelay: visible ? `${i * (size === 'dense' ? 12 : n > 6 ? 35 : 110)}ms` : '0ms' }}
                >
                    <BrandIcon name={name} size={size === 'dense' ? 10 : size === 'mid' ? 16 : 20} />
                </span>
            ))}
        </div>
    );
}

export default function Trap() {
    const [headRef, headVisible] = useReveal();
    return (
        <Scene id="trap">
            <H2>Then your users ask for another.</H2>
            <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-[clamp(14px,2.5vw,32px)] items-start"
                aria-label="One app, then five, then twenty, then a hundred or more, each with its own auth, data model, permissions and failure modes"
            >
                {STAGES.map((s, i) => (
                    <div key={s.n} className="grid gap-[14px] content-start min-w-0">
                        <b
                            className={`font-semibold leading-[0.9] tracking-[-0.05em] text-[clamp(40px,6.4vw,92px)] ${
                                i <= 1 ? 'text-dev-ink-3' : i === 2 ? 'text-dev-ink-2' : 'text-dev-ink'
                            }`}
                        >
                            {s.n === 120 ? '100+' : s.n}
                        </b>
                        <Cluster n={s.n} size={s.size} />
                        {s.more && <span className="font-dev-mono text-[11px] tracking-[0.1em] uppercase text-dev-ink-3 -mt-1.5">{s.more}</span>}
                        <small className="text-[13.5px] text-dev-ink-3 leading-[1.4]">{s.copy}</small>
                    </div>
                ))}
            </div>
            <H2 style={{ maxWidth: '20ch' }}>You didn&apos;t build an AI product to become an integration company.</H2>
        </Scene>
    );
}
