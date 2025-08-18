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

    experimental: {
        serverComponentsExternalPackages: [],
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

    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };
        config.cache = false;

        return config;
    },
};

export default nextConfig;
