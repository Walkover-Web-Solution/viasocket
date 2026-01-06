export default function robots() {
    const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';

    if (isProd) {
        return {
            rules: {
                userAgent: '*',
                disallow: '/admin/',
            },
            sitemap: [
                'https://socket-plug-services-h7duexlbuq-el.a.run.app/sitemap/index-page',
                'https://viasocket.com/sitemap.xml'
            ],
        };
    }

    return {
        rules: {
            userAgent: '*',
            disallow: '/',
        },
    };
}
