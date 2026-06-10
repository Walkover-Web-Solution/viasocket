'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const APP_ICONS = [
    'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
    'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png',
    'https://stuff.thingsofbrand.com/notion.so/images/img667018e3f8_notion.jpg',
    'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg',
    'https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg',
    'https://stuff.thingsofbrand.com/airtable.com/images/img6da0d45803_airtable.jpg',
];

const LINE_PATHS = [
    'M 300 220 Q 240 280 27 350',
    'M 300 220 Q 270 280 135 350',
    'M 300 220 Q 290 280 243 350',
    'M 300 220 Q 310 280 357 350',
    'M 300 220 Q 330 280 465 350',
    'M 300 220 Q 360 280 573 350',
];

const HUB_OUT_LEFTS = ['left-0', 'left-[108px]', 'left-[216px]', 'left-[324px]', 'left-[432px]', 'left-[540px]'];

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default function AgentDiagram({ agent }) {
    const [icons, setIcons] = useState(APP_ICONS);

    useEffect(() => {
        const interval = setInterval(() => {
            setIcons((prev) => shuffleArray(prev));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[600px] h-[380px]" aria-hidden="true">
                <svg
                    className="absolute inset-0 w-full h-full overflow-visible"
                    viewBox="0 0 600 380"
                    preserveAspectRatio="none"
                >
                    <line
                        x1="300"
                        y1="60"
                        x2="300"
                        y2="160"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth="1.5"
                        strokeDasharray="4 5"
                        fill="none"
                    />
                    <line
                        x1="300"
                        y1="60"
                        x2="300"
                        y2="160"
                        stroke="rgba(255,255,255,1)"
                        strokeWidth="1.8"
                        strokeDasharray="8 200"
                        fill="none"
                        className="animate-dash-flow"
                    />
                    {LINE_PATHS.map((d) => (
                        <g key={d}>
                            <path
                                d={d}
                                stroke="rgba(255,255,255,0.55)"
                                strokeWidth="1.5"
                                strokeDasharray="4 5"
                                fill="none"
                            />
                            <path
                                d={d}
                                stroke="rgba(255,255,255,1)"
                                strokeWidth="1.8"
                                strokeDasharray="8 200"
                                fill="none"
                                className="animate-dash-flow"
                            />
                        </g>
                    ))}
                </svg>

                <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-14 h-14 flex items-center justify-center rounded-[10px] bg-white shadow-[0_6px_18px_rgba(0,0,0,0.35)] [&_svg]:w-9 [&_svg]:h-9">
                    {agent.icon}
                </div>

                <div className="absolute top-[165px] left-1/2 -translate-x-1/2 w-14 h-14 flex items-center justify-center rounded-[10px] bg-[#150a3d] border border-white/25 shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                    <Image
                        src="https://viasocket.com/assets/brand/socketIcon.svg"
                        alt=""
                        width={36}
                        height={36}
                        className="w-9 h-9 object-contain"
                        style={{ filter: 'invert(1) brightness(1.7)' }}
                        unoptimized
                    />
                </div>

                {icons.map((src, i) => (
                    <div
                        key={i}
                        className={`absolute top-[322px] ${HUB_OUT_LEFTS[i]} w-14 h-14 flex items-center justify-center rounded-[10px] bg-white shadow-[0_6px_18px_rgba(0,0,0,0.35)]`}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="w-8 h-8 object-contain" loading="eager" />
                    </div>
                ))}
            </div>
        </div>
    );
}
