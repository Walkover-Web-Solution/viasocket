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
