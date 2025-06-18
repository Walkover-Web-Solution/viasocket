module.exports = {
    // experimental: {
    //     runtime: 'experimental-edge',
    //   },
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
                destination: 'https://flow.viasocket.com/:path*',
                has: [
                    {
                        type: 'query',
                        key: '(.*)',
                    },
                ],
                permanent: false,
            },
            {
                source: '/login',
                destination: 'https://flow.viasocket.com/',
                permanent: false,
            },
        ];
    },

    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };

        return config;
    },
};
