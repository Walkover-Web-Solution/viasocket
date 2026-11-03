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
        return {
            // The homepage is the static site in public/new-home. beforeFiles runs ahead of the
            // app routes, so "/" is served from it and src/app/page.js (with its A/B variants) is not used.
            beforeFiles: [
                {
                    source: '/',
                    destination: '/new-home/index.html',
                },
                {
                    // Version B is a static file. public/home-b/index.html is only
                    // served at /home-b/index.html unless this rewrite exists.
                    source: '/home-b',
                    destination: '/home-b/index.html',
                },
            ],
            afterFiles: [
                {
                    source: '/feedback-satisfied',
                    destination: '/feedback?variant=satisfied',
                },
                {
                    source: '/feedback-unsatisfied',
                    destination: '/feedback?variant=unsatisfied',
                },
            ],
        };
    },

    // Redirects are managed in the admin panel (Pages → Redirects) and applied by src/middleware.js.

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
