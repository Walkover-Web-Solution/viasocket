export const dynamic = 'force-dynamic';

export function GET(request) {
    const hostname = request.headers.get('host') || '';
    const isIntegrationDomain = hostname.includes('integrate') || hostname.includes('integration');
    
    if (isIntegrationDomain) {
        return new Response(`User-agent: *
Disallow: /`, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }
    
    const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';
    const robotsTxt = isProd
        ? `User-agent: *
Disallow: /admin/
Sitemap: https://plugservice-api.viasocket.com/sitemap/index-page`
        : `User-agent: *
Disallow: /`;
    
    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
