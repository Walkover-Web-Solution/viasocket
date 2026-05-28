import Image from 'next/image';
import './hire-expert.scss';

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

const ICON_URLS = {
    slack: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
    sheets: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png',
    notion: 'https://stuff.thingsofbrand.com/notion.so/images/img667018e3f8_notion.jpg',
    gmail: 'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg',
    hubspot: 'https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg',
    airtable: 'https://stuff.thingsofbrand.com/airtable.com/images/img6da0d45803_airtable.jpg',
};

const ICONS = Object.fromEntries(
    Object.entries(ICON_URLS).map(([key, url]) => [
        key,
        <img key={key} src={url} alt={LABELS[key]} className="w-full h-full object-contain" />,
    ])
);

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

                {/* Static connector to Automation Live badge (no animation) */}
                <line
                    x1="200"
                    y1="244"
                    x2="200"
                    y2="445"
                    stroke="rgba(168,32,13,0.35)"
                    strokeWidth="1.4"
                    strokeDasharray="4 5"
                    strokeLinecap="round"
                />
                {/* <circle cx="200" cy="244" r="2.4" fill="#A8200D" opacity="0.75" />
                <circle cx="200" cy="345" r="2.4" fill="#A8200D" opacity="0.75" /> */}

                {PATHS.flatMap((p) => [
                    <circle key={`ex-${p.key}`} cx={p.exit[0]} cy={p.exit[1]} r="2.4" fill="#A8200D" opacity="0.75" />,
                    // <circle key={`en-${p.key}`} cx={p.entry[0]} cy={p.entry[1]} r="2.4" fill="#A8200D" opacity="0.75" />,
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
            <div className="absolute w-[20%] aspect-square left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                    className="absolute inset-0 rounded-[26%] blur-md -z-10 animate-pulse"
                    style={{
                        background:
                            'radial-gradient(circle at center, rgba(168,32,13,0.42) 0%, rgba(168,32,13,0.18) 38%, transparent 68%)',
                    }}
                />
                <div className="w-full h-full bg-white rounded-[26%] overflow-hidden shadow-sm flex items-end justify-center">
                    <Image
                        src="/assets/icons/userprofileicon.svg"
                        alt="Your dedicated Viasocket expert"
                        width={120}
                        height={120}
                        className="w-full h-full"
                    />
                </div>
            </div>

            {/* Live status badge */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+40px)] inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-[0_8px_22px_rgba(15,23,42,0.09)] text-xs font-semibold text-[#1A1A1F] whitespace-nowrap z-20">
                <span className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_0_3px_rgba(22,163,74,0.16)] animate-pulse" />
                Automation Live
            </div>

        </div>
    );
}
