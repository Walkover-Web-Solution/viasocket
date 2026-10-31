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
            // Fallback when middleware does not rewrite "/". Middleware serves version A
            // or B at "/" (public/new-home or public/home-b) and redirects /home-b to "/".
            // src/app/page.js is the old Next homepage and is not used.
            beforeFiles: [
                {
                    source: '/',
                    destination: '/new-home/index.html',
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
