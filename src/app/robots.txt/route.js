import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    // Get the hostname from the request headers
    const hostname = request.headers.get('host') || '';
    
    // Check if hostname contains 'integrate' or 'integration'
    const isIntegrationDomain = hostname.includes('integrate') || hostname.includes('integration');
    
    // For integration domains, block all crawling
    if (isIntegrationDomain) {
        const robotsTxt = `User-agent: *
Disallow: /`;
        
        return new NextResponse(robotsTxt, {
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    }
    
    // For production main domain, allow crawling with sitemap
    const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';
    
    const robotsTxt = isProd
        ? `User-agent: *
Disallow: /admin/
Sitemap: https://plugservice-api.viasocket.com/sitemap/index-page`
        : `User-agent: *
Disallow: /`;
    
    return new NextResponse(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
