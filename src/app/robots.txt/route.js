export const runtime = 'edge';

export async function GET(request) {
    const url = new URL(request.url);
    const hostname = url.hostname || request.headers.get('host') || '';
    
    const isIntegrationSubdomain = hostname.includes('integrate') || hostname.includes('integration');
    const isProduction = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';
    const isProd = isProduction && !isIntegrationSubdomain;

    const robotsContent = isProd
        ? `User-agent: *
Disallow: /admin/
Sitemap: https://plugservice-api.viasocket.com/sitemap/index-page`
        : `User-agent: *
Disallow: /`;

    return new Response(robotsContent, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
