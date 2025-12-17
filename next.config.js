module.exports = {
    // Enable Turbopack configuration (Next.js 16 default)
    turbopack: {},
    
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

    // Keep webpack config for compatibility when not using Turbopack
    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };

        return config;
    },
};
