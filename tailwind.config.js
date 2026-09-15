/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'inter-tight': ['Inter Tight', 'sans-serif'],
                // The /index page's two faces. The display serif breaks below
                // about 34px — its letters collide and the counters close — so
                // anything smaller than that is set in the sans.
                'index-display': ['Instrument Serif', 'Instrument Serif Fallback', 'Georgia', 'serif'],
                'index-sans': ['DM Sans', 'Arial', 'sans-serif'],
            },
            colors: {
                // The /index palette. Warm off-white ground, near-black ink with
                // a green cast, and one accent reserved for the thing that needs
                // a person.
                index: {
                    paper: '#f7f7f2',
                    ink: '#14201f',
                    muted: '#6e7772',
                    line: '#dfe1d9',
                    done: '#1f6f4a',
                    attention: '#a8200d',
                    // Section grounds. The page is not one flat colour; each
                    // section sits on its own tint of paper, so the seams
                    // soften rather than stepping.
                    showcase: '#f1f3ea',
                    fills: '#f4f4f1',
                    reviews: '#f2f4ee',
                    keeps: '#eaf3f2',
                    trust: '#eaf0e8',
                    wall: '#eef1e8',
                },
            },
            fontSize: {
                // Heading sizes are fluid; body sizes are fixed px. Reading
                // sizes sit one step up from where they started: everything in
                // the 12-17px band became 13-18px, and micro labels at 11.5 and
                // under were deliberately left alone, because they are chrome
                // and enlarging them makes a page louder, not more readable.
                'index-hero': ['clamp(56px, 7.4vw, 118px)', { lineHeight: '0.88' }],
                'index-section': ['clamp(32px, 4.4vw, 66px)', { lineHeight: '0.88' }],
                'index-group': ['clamp(34px, 3.4vw, 50px)', { lineHeight: '1' }],
                'index-card': ['clamp(24px, 2.6vw, 36px)', { lineHeight: '1.02' }],
            },
            spacing: {
                // One column for the whole page. A section wider than the
                // others reads as a mistake before it reads as a device.
                'index-gutter': 'clamp(20px, 7.4vw, 104px)',
                'index-section': 'clamp(72px, 7vw, 116px)',
            },
            boxShadow: {
                'index-card': '0 12px 40px rgb(0 0 0 / 6%)',
                'index-chip': '0 1px 2px rgb(31 39 33 / 5%), 0 6px 16px rgb(31 39 33 / 6%)',
            },
            screens: {
                'xl2': '1500px', // Add custom screen size for 1500px
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            animation: {
                shimmer: 'shimmer 1.5s infinite',
                blink: 'blink 1s infinite',
                'dot-bounce': 'dotBounce 1.4s ease-in-out infinite',
                'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
                'marquee-scroll': 'marqueeScroll 38s linear infinite',
                fadeSlideIn: 'fadeSlideIn 0.35s ease forwards',
                flowDecisionDots: 'flowDecisionDots 10s ease-in-out infinite',
                flowDecisionText: 'flowDecisionText 10s ease-in-out infinite',
                flowCheckmark: 'flowCheckmark 10s ease-in-out infinite',
                flowExecutedDots: 'flowExecutedDots 10s ease-in-out infinite',
                flowAction1: 'flowAction1 10s ease-in-out infinite',
                flowAction2: 'flowAction2 10s ease-in-out infinite',
                flowAction3: 'flowAction3 10s ease-in-out infinite',
                'slide-right': 'slideRight 1.5s ease-in-out infinite',
                // /index. Motion that resolves, not motion that idles: every
                // animated thing is showing one job finishing, and each stops.
                // The two marquees are the deliberate exception — a row that
                // keeps arriving is the honest drawing of a catalogue.
                'index-mark-roll': 'indexMarkRoll 1.3s cubic-bezier(0.22, 0.68, 0.3, 1.2) forwards',
                'index-mark-shadow': 'indexMarkShadow 0.35s ease-out 1.25s both',
                'index-mark-bob': 'indexMarkBob 3.2s ease-in-out infinite',
                'index-card-in': 'indexFadeIn 0.3s ease-out',
                'index-run-in': 'indexFadeIn 0.45s ease-out both',
                'index-caret': 'indexCaret 1s steps(1) infinite',
                'index-typing': 'indexTyping 1s ease-in-out infinite',
                'index-reviews': 'indexReviews var(--dur) linear infinite',
                'index-drift': 'indexDrift 68s linear infinite',
            },
            keyframes: {
                indexFadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                indexMarkRoll: {
                    '0%': { opacity: '0', transform: 'translateX(-260px) scale(0.18) rotate(-600deg)' },
                    '15%': { opacity: '1' },
                    '82%': { transform: 'translateX(6px) scale(1.06) rotate(8deg)' },
                    '100%': { opacity: '1', transform: 'translateX(0) scale(1) rotate(0deg)' },
                },
                indexMarkShadow: {
                    from: { opacity: '0', transform: 'translateX(-50%) scaleX(0.2)' },
                    to: { opacity: '1', transform: 'translateX(-50%) scaleX(1)' },
                },
                indexMarkBob: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(2px)' },
                },
                indexCaret: {
                    '50%': { opacity: '0' },
                },
                indexTyping: {
                    '0%, 60%, 100%': { opacity: '0.4', transform: 'translateY(0)' },
                    '30%': { opacity: '1', transform: 'translateY(-4px)' },
                },
                // The track holds its set twice, so translating by exactly one
                // set's width lands copy two where copy one began: no seam.
                indexReviews: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(calc(var(--set-w) * -1))' },
                },
                indexDrift: {
                    from: { transform: 'translate3d(0, 0, 0)' },
                    to: { transform: 'translate3d(-50%, 0, 0)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                blink: {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' },
                },
                dotBounce: {
                    '0%, 60%, 100%': { transform: 'translateY(0)' },
                    '30%': { transform: 'translateY(-3px)' },
                },
                marqueeScroll: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
                pulseDot: {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.6)' },
                    '50%': { boxShadow: '0 0 0 6px rgba(34,197,94,0)' },
                },
                fadeSlideIn: {
                    from: { opacity: '0', transform: 'translateY(6px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                flowDecisionDots: {
                    '0%, 22%': { opacity: '1' },
                    '26%, 100%': { opacity: '0' },
                },
                flowDecisionText: {
                    '0%, 24%': { opacity: '0', transform: 'translateY(4px)' },
                    '28%, 100%': { opacity: '1', transform: 'translateY(0)' },
                },
                flowCheckmark: {
                    '0%, 30%': { opacity: '0', transform: 'scale(0.8)' },
                    '34%, 100%': { opacity: '1', transform: 'scale(1)' },
                },
                flowExecutedDots: {
                    '0%, 50%': { opacity: '1' },
                    '54%, 100%': { opacity: '0' },
                },
                flowAction1: {
                    '0%, 52%': { opacity: '0', transform: 'translateY(6px)' },
                    '56%, 100%': { opacity: '1', transform: 'translateY(0)' },
                },
                flowAction2: {
                    '0%, 56%': { opacity: '0', transform: 'translateY(6px)' },
                    '60%, 100%': { opacity: '1', transform: 'translateY(0)' },
                },
                flowAction3: {
                    '0%, 60%': { opacity: '0', transform: 'translateY(6px)' },
                    '64%, 100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideRight: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(4px)' },
                },
            },
        },
        screens: {
            'sm': '641px',
            // => @media (min-width: 640px) { ... }

            'md': '769px',
            // => @media (min-width: 768px) { ... }

            'lg': '1025px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1281px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1537px',
            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#0000',
                    secondary: '#f5f5f5',
                    accent: '#A8200D',
                    neutral: '#fafafa',
                    'primary-content': '#ffffff',
                    link: '#4485F2',
                    '--rounded-btn': '0.0px',
                },
            },
        ],
    },
};
