import { headers } from 'next/headers';

export default async function robots() {
    const headersList = await headers();
    const hostname = headersList.get('host') || '';
    
    // Check if subdomain contains 'integrate' or 'integration'
    const isIntegrationSubdomain = hostname.includes('integrate') || hostname.includes('integration');
    
    // Production environment check
    const isProduction = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';
    
    // Only allow indexing if it's production AND NOT an integration subdomain
    const isProd = isProduction && !isIntegrationSubdomain;

    if (isProd) {
        return {
            rules: {
                userAgent: '*',
                disallow: '/admin/',
            },
            sitemap: 'https://plugservice-api.viasocket.com/sitemap/index-page',
        };
    }

    return {
        rules: {
            userAgent: '*',
            disallow: '/',
        },
    };
}
