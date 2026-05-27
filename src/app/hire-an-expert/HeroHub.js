'use client';

import Image from 'next/image';

/* ──────────────────────────────────────────────────────────────────
   Hero hub (connected automation hub)
   ────────────────────────────────────────────────────────────────── */

// viewBox 400x400. Six cubic-bezier paths fan into the central hub.
const PATHS = [
    { key: 'slack', d: 'M 185 156 C 185 110, 168 75, 110 75', exit: [110, 75], entry: [185, 156], delay: 0 },
    { key: 'sheets', d: 'M 156 200 C 142 200, 130 200, 110 200', exit: [110, 200], entry: [156, 200], delay: 0.8 },
    { key: 'notion', d: 'M 185 244 C 185 290, 168 325, 110 325', exit: [110, 325], entry: [185, 244], delay: 1.6 },
    { key: 'gmail', d: 'M 215 156 C 215 110, 232 75, 290 75', exit: [290, 75], entry: [215, 156], delay: 2.4 },
    { key: 'hubspot', d: 'M 244 200 C 258 200, 270 200, 290 200', exit: [290, 200], entry: [244, 200], delay: 3.2 },
    { key: 'airtable', d: 'M 215 244 C 215 290, 232 325, 290 325', exit: [290, 325], entry: [215, 244], delay: 4.0 },
];

const CARDS = {
    slack: { left: '20.5%', top: '18.75%' },
    sheets: { left: '10.5%', top: '50%' },
    notion: { left: '20.5%', top: '81.25%' },
    gmail: { left: '80.5%', top: '18.75%' },
    hubspot: { left: '88.5%', top: '50%' },
    airtable: { left: '80.5%', top: '81.25%' },
};

const LABELS = {
    slack: 'Slack',
    sheets: 'Google Sheets',
    notion: 'Notion',
    gmail: 'Gmail',
    hubspot: 'HubSpot',
    airtable: 'Airtable',
};

const ICONS = {
    slack: (
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path
                fill="#e01e5a"
                d="M53.841 161.32c0 14.832-11.987 26.82-26.819 26.82S.203 176.152.203 161.32c0-14.831 11.987-26.818 26.82-26.818H53.84zm13.41 0c0-14.831 11.987-26.818 26.819-26.818s26.819 11.987 26.819 26.819v67.047c0 14.832-11.987 26.82-26.82 26.82c-14.83 0-26.818-11.988-26.818-26.82z"
            />
            <path
                fill="#36c5f0"
                d="M94.07 53.638c-14.832 0-26.82-11.987-26.82-26.819S79.239 0 94.07 0s26.819 11.987 26.819 26.819v26.82zm0 13.613c14.832 0 26.819 11.987 26.819 26.819s-11.987 26.819-26.82 26.819H26.82C11.987 120.889 0 108.902 0 94.069c0-14.83 11.987-26.818 26.819-26.818z"
            />
            <path
                fill="#2eb67d"
                d="M201.55 94.07c0-14.832 11.987-26.82 26.818-26.82s26.82 11.988 26.82 26.82s-11.988 26.819-26.82 26.819H201.55zm-13.41 0c0 14.832-11.988 26.819-26.82 26.819c-14.831 0-26.818-11.987-26.818-26.82V26.82C134.502 11.987 146.489 0 161.32 0s26.819 11.987 26.819 26.819z"
            />
            <path
                fill="#ecb22e"
                d="M161.32 201.55c14.832 0 26.82 11.987 26.82 26.818s-11.988 26.82-26.82 26.82c-14.831 0-26.818-11.988-26.818-26.82V201.55zm0-13.41c-14.831 0-26.818-11.988-26.818-26.82c0-14.831 11.987-26.818 26.819-26.818h67.25c14.832 0 26.82 11.987 26.82 26.819s-11.988 26.819-26.82 26.819z"
            />
        </svg>
    ),
    sheets: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                fill="#0F9D58"
                d="M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6zm1.363 10.636h-3.41v1.91h3.41zm0 3.273h-3.41v1.91h3.41zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z"
            />
        </svg>
    ),
    notion: (
        <svg viewBox="0 0 256 268" xmlns="http://www.w3.org/2000/svg">
            <path
                fill="#fff"
                d="M16.092 11.538L164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188"
            />
            <path d="M164.09.608L16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608M69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921M212.377 89.53c1.034 4.681 0 9.362-4.681 9.897l-7.783 1.542v114.404c-6.758 3.637-12.981 5.715-18.18 5.715c-8.308 0-10.386-2.604-16.609-10.396l-50.898-80.079v77.476l16.1 3.646s0 9.362-12.989 9.362l-35.814 2.077c-1.043-2.086 0-7.284 3.63-8.318l9.351-2.595V109.823l-12.98-1.052c-1.044-4.68 1.55-11.439 8.826-11.965l38.426-2.585l52.958 81.113v-71.76l-13.498-1.552c-1.043-5.733 3.111-9.896 8.3-10.404z" />
        </svg>
    ),
    gmail: (
        <svg viewBox="0 0 256 193" xmlns="http://www.w3.org/2000/svg">
            <path
                fill="#4285f4"
                d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"
            />
            <path
                fill="#34a853"
                d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"
            />
            <path
                fill="#ea4335"
                d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"
            />
            <path fill="#fbbc04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z" />
            <path fill="#c5221f" d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z" />
        </svg>
    ),
    hubspot: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                fill="#FF7A59"
                d="M18.164 7.93V5.084a2.2 2.2 0 0 0 1.267-1.978v-.067A2.2 2.2 0 0 0 17.238.845h-.067a2.2 2.2 0 0 0-2.193 2.193v.067a2.2 2.2 0 0 0 1.252 1.973l.013.006v2.852a6.2 6.2 0 0 0-2.969 1.31l.012-.01l-7.828-6.095A2.497 2.497 0 1 0 4.3 4.656l-.012.006l7.697 5.991a6.2 6.2 0 0 0-1.038 3.446a6.2 6.2 0 0 0 1.147 3.607l-.013-.02l-2.342 2.343a2 2 0 0 0-.58-.095h-.002a2.033 2.033 0 1 0 2.033 2.033a2 2 0 0 0-.1-.595l.005.014l2.317-2.317a6.247 6.247 0 1 0 4.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 1 1 3.215-3.207v.002a3.206 3.206 0 0 1-3.207 3.207z"
            />
        </svg>
    ),
    airtable: (
        <svg viewBox="0 0 256 215" xmlns="http://www.w3.org/2000/svg">
            <path
                fill="#ffbf00"
                d="M114.259 2.701L18.86 42.176c-5.305 2.195-5.25 9.73.089 11.847l95.797 37.989a35.54 35.54 0 0 0 26.208 0l95.799-37.99c5.337-2.115 5.393-9.65.086-11.846L141.442 2.7a35.55 35.55 0 0 0-27.183 0"
            />
            <path
                fill="#26b5f8"
                d="M136.35 112.757v94.902c0 4.514 4.55 7.605 8.746 5.942l106.748-41.435a6.39 6.39 0 0 0 4.035-5.941V71.322c0-4.514-4.551-7.604-8.747-5.941l-106.748 41.434a6.39 6.39 0 0 0-4.035 5.942"
            />
            <path
                fill="#ed3049"
                d="m111.423 117.654l-31.68 15.296l-3.217 1.555L9.65 166.548C5.411 168.593 0 165.504 0 160.795V71.72c0-1.704.874-3.175 2.046-4.283a7.3 7.3 0 0 1 1.618-1.213c1.598-.959 3.878-1.215 5.816-.448l101.41 40.18c5.155 2.045 5.56 9.268.533 11.697"
            />
            <path
                fillOpacity=".25"
                d="m111.423 117.654l-31.68 15.296L2.045 67.438a7.3 7.3 0 0 1 1.618-1.213c1.598-.959 3.878-1.215 5.816-.448l101.41 40.18c5.155 2.045 5.56 9.268.533 11.697"
            />
        </svg>
    ),
};

export default function HeroHub() {
    return (
        <div
            className="hero-hub relative w-full max-w-[460px] aspect-square mx-auto"
            role="img"
            aria-label="Connected automation hub: Slack, Google Sheets, Notion, Gmail, HubSpot and Airtable orchestrated by your Viasocket expert"
        >
            {/* Ambient aura */}
            <div
                className="absolute inset-[22%] rounded-full blur-2xl pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle at center, rgba(168,32,13,0.10) 0%, rgba(168,32,13,0.04) 38%, transparent 70%)',
                    animation: 'hubAura 7s ease-in-out infinite',
                    zIndex: 0,
                }}
            />

            {/* Connector SVG */}
            <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                aria-hidden="true"
            >
                <defs>
                    {PATHS.map((p) => (
                        <path key={p.key} id={`hubPath-${p.key}`} d={p.d} />
                    ))}
                </defs>

                {PATHS.map((p) => (
                    <g key={p.key} data-line={p.key}>
                        <use
                            href={`#hubPath-${p.key}`}
                            fill="none"
                            stroke="rgba(168,32,13,0.35)"
                            strokeWidth="1.4"
                            strokeDasharray="4 5"
                            strokeLinecap="round"
                        />
                    </g>
                ))}

                {PATHS.flatMap((p) => [
                    <circle key={`ex-${p.key}`} cx={p.exit[0]} cy={p.exit[1]} r="2.4" fill="#A8200D" opacity="0.75" />,
                    <circle key={`en-${p.key}`} cx={p.entry[0]} cy={p.entry[1]} r="2.4" fill="#A8200D" opacity="0.75" />,
                ])}

                {PATHS.map((p) => (
                    <g key={`anim-${p.key}`}>
                        <circle r="6" fill="#A8200D" opacity="0">
                            <animateMotion dur="4.8s" begin={`${p.delay}s`} repeatCount="indefinite">
                                <mpath href={`#hubPath-${p.key}`} />
                            </animateMotion>
                            <animate
                                attributeName="opacity"
                                values="0;0.16;0.16;0"
                                keyTimes="0;0.12;0.88;1"
                                dur="4.8s"
                                begin={`${p.delay}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle r="2.6" fill="#A8200D" opacity="0">
                            <animateMotion dur="4.8s" begin={`${p.delay}s`} repeatCount="indefinite">
                                <mpath href={`#hubPath-${p.key}`} />
                            </animateMotion>
                            <animate
                                attributeName="opacity"
                                values="0;1;1;0"
                                keyTimes="0;0.12;0.88;1"
                                dur="4.8s"
                                begin={`${p.delay}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    </g>
                ))}
            </svg>

            {/* App nodes */}
            {Object.entries(CARDS).map(([key, pos], i) => (
                <div
                    key={key}
                    className="absolute w-[18%] aspect-square -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: pos.left,
                        top: pos.top,
                        animation: 'hireFloat 4.6s ease-in-out infinite',
                        animationDelay: `-${(i * 0.7) % 3}s`,
                    }}
                    aria-label={LABELS[key]}
                >
                    <div className="w-full h-full bg-white rounded-[22%] flex items-center justify-center shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.06] p-[18%]">
                        {ICONS[key]}
                    </div>
                </div>
            ))}

            {/* Orchestration center — avatar */}
            <div className="absolute w-[24%] aspect-square left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                    className="absolute inset-0 rounded-[26%] blur-md -z-10 animate-pulse"
                    style={{
                        background:
                            'radial-gradient(circle at center, rgba(168,32,13,0.42) 0%, rgba(168,32,13,0.18) 38%, transparent 68%)',
                    }}
                />
                <div className="w-full h-full bg-white rounded-[26%] overflow-hidden shadow-[0_12px_28px_rgba(15,23,42,0.08)] flex items-center justify-center">
                    <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop&crop=face"
                        alt="Your dedicated Viasocket expert"
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                        unoptimized
                    />
                </div>
            </div>

            {/* Live status badge */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+40px)] inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-[0_8px_22px_rgba(15,23,42,0.09)] text-xs font-semibold text-[#1A1A1F] whitespace-nowrap z-20">
                <span className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_0_3px_rgba(22,163,74,0.16)] animate-pulse" />
                Automation Live
            </div>

            <style jsx>{`
                @keyframes hireFloat {
                    0%,
                    100% {
                        transform: translate(-50%, -50%);
                    }
                    50% {
                        transform: translate(-50%, calc(-50% - 5px));
                    }
                }
                @keyframes hubAura {
                    0%,
                    100% {
                        opacity: 0.55;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.1);
                    }
                }
                .hero-hub :global(g[data-line]:hover use) {
                    stroke: #a8200d;
                    stroke-opacity: 1;
                    filter: drop-shadow(0 0 3px rgba(168, 32, 13, 0.4));
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero-hub *,
                    .hero-hub :global(*) {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
