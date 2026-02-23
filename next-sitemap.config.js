const appPathsManifest = require('./.next/server/app-paths-manifest.json');

const staticRoutes = Object.keys(appPathsManifest)
    .filter((route) => !route.includes('[') && route.endsWith('/page') && !route.startsWith('/_'))
    .map((route) => route.replace(/\/page$/, '') || '/');

const externalPaths = [
    '/discovery',
    '/blog',
    '/faq',
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://viasocket.com',
    generateRobotsTxt: false,
    generateIndexSitemap: false,
    outDir: 'public',
    additionalPaths: async () => {
        return [...staticRoutes, ...externalPaths].map((route) => ({
            loc: route,
            changefreq: 'daily',
            priority: 1.0,
        }));
    },
}
