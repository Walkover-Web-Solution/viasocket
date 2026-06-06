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
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                blink: {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' },
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
