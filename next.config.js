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

    async redirects() {
        return [
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
