// Line icons used on the single-app integration page and /features (stroke follows currentColor, or a gradient).

const PATHS = {
    key: (
        <>
            <circle cx="8" cy="15" r="4" />
            <path d="M11 12l9-9M17 6l3 3M15 8l2 2" />
        </>
    ),
    users: (
        <>
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
            <path d="M16 4.5a3.5 3.5 0 010 7M18 14.8c2 .7 3.2 2.4 3.6 5.2" />
        </>
    ),
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
    map: (
        <>
            <path d="M4 6h6M4 12h6M4 18h6M14 6h6M14 12h6M14 18h6" />
            <path d="M10 6l4 6M10 12l4 6" />
        </>
    ),
    pulse: <path d="M2 12h4l3-7 4 14 3-7h6" />,
    brand: (
        <>
            <rect x="3" y="4" width="18" height="16" />
            <path d="M3 9h18M8 14h5" />
        </>
    ),
    apps: (
        <>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
        </>
    ),
    code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
    chat: (
        <>
            <path d="M3 4h18v13H9l-5 4v-4H3z" />
            <path d="M8 9h8M8 12.5h5" />
        </>
    ),
    agent: (
        <>
            <rect x="4" y="7" width="16" height="13" />
            <path d="M12 3v4M9 12v2M15 12v2M9 17h6" />
        </>
    ),
    browser: (
        <>
            <rect x="3" y="4" width="18" height="16" />
            <path d="M3 9h18M6 6.5h.01M9 6.5h.01" />
            <path d="M11 13l2 6 1.2-2.4L17 19l1-1-2.4-1.8L18 15z" />
        </>
    ),
    globe: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </>
    ),
    fast: <path d="M2 8h6M2 12h4M2 16h6M13 3l-3 9h5l-2 9 8-11h-5l3-7z" />,
    retry: (
        <>
            <path d="M20 12a8 8 0 11-2.3-5.7" />
            <path d="M20 4v5h-5" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </>
    ),
    replay: (
        <>
            <path d="M4 12a8 8 0 102.3-5.7" />
            <path d="M4 4v5h5" />
            <path d="M10.5 9.5v5l4-2.5z" />
        </>
    ),
};

/** `gradient`: stroke with a diagonal gradient whose stops read --ai-g1..3 (set on the AI tiles) instead of currentColor. */
export function FeatureIcon({ name, gradient }) {
    const id = `fi-grad-${name}`;
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" style={gradient ? { stroke: `url(#${id})` } : undefined}>
            {gradient && (
                <defs>
                    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
                        <stop offset="0" style={{ stopColor: 'var(--ai-g1)' }} />
                        <stop offset=".5" style={{ stopColor: 'var(--ai-g2)' }} />
                        <stop offset="1" style={{ stopColor: 'var(--ai-g3)' }} />
                    </linearGradient>
                </defs>
            )}
            {PATHS[name]}
        </svg>
    );
}

export function Chevron() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
        </svg>
    );
}

export function CopyIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="9" y="9" width="12" height="12" rx="1" />
            <path d="M5 15H3V3h12v2" />
        </svg>
    );
}

/** The viaSocket wordmark, the homepage's own files (dark text in light mode, light in dark). */
export function Logo({ height = 24, className }) {
    return (
        <picture>
            <source srcSet="/new-home/assets/logo-light.svg" media="(prefers-color-scheme: dark)" />
            <img src="/new-home/assets/logo.svg" alt="viaSocket" height={height} style={{ height, width: 'auto' }} className={className} />
        </picture>
    );
}

export const SOCIAL = [
    {
        label: 'viaSocket on Instagram',
        href: 'https://www.instagram.com/viasocket/',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
        ),
    },
    {
        label: 'viaSocket on LinkedIn',
        href: 'https://www.linkedin.com/company/viasocket-walkover/',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: 'viaSocket on X (Twitter)',
        href: 'https://x.com/viasocket',
        fill: true,
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
        ),
    },
    {
        label: 'viaSocket on YouTube',
        href: 'https://www.youtube.com/@viasocket',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
            </svg>
        ),
    },
    {
        label: 'viaSocket on Discord',
        href: 'https://discord.com/invite/wqsSsMAkkz',
        fill: true,
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.1.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
        ),
    },
];
