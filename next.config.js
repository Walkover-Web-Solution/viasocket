/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        loader: 'akamai',
        path: '',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: '/feedback-satisfied',
                destination: '/feedback?variant=satisfied',
            },
            {
                source: '/feedback-unsatisfied',
                destination: '/feedback?variant=unsatisfied',
            },
        ];
    },

    async redirects() {
        return [
            // `index` is a reserved route name in the App Router: the root route
            // `/` is internally named `/index`, so a page at src/app/index can
            // never be served at /index in a deployed build — the edge routing
            // config rewrites /index to /. The page lives at /front-page, and
            // this keeps the /index URL pointing at it.
            {
                source: '/index',
                destination: '/front-page',
                permanent: false,
            },
            {
                source: '/department/:path*',
                destination: '/departments/:path*',
                permanent: true,
            },
            {
                source: '/data-retention-deletion-policy',
                destination: '/data-retention-deletion',
                permanent: true,
            },
            {
                source: '/about',
                destination: '/help/about-us',
                permanent: true,
            },
            {
                source: '/variables',
                destination: '/features/variables',
                permanent: true,
            },
            {
                source: '/login',
                destination: 'https://flow.viasocket.com/',
                permanent: false,
            },
            {
                source: '/mcp/invgate-service-desk',
                destination: '/mcp/invgateservicemanagement',
                permanent: true,
            },
            {
                source: '/mcp',
                destination: 'https://mushrooms.viasocket.com/',
                permanent: true,
            },
        ];
    },

    turbopack: {},

    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };

        return config;
    },
};

module.exports = nextConfig;
