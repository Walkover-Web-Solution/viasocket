import versionA from '../../../public/new-home/index.html';
import versionB from '../../../public/home-b/index.html';

export const runtime = 'edge';

const HOMEPAGE_HEADERS = {
    'Cache-Control': 'private, no-store, must-revalidate',
    'CDN-Cache-Control': 'no-store',
    Vary: 'Cookie',
};

/**
 * Pages applies its own static-asset Cache-Control after middleware runs. Import
 * the static documents at build time so this edge response can serve the chosen
 * file without re-entering Pages routing or changing the browser URL.
 */
export async function GET(request) {
    const variant = request.headers.get('x-homepage-variant') === 'B' ? 'B' : 'A';

    const headers = new Headers(HOMEPAGE_HEADERS);
    headers.set('Content-Type', 'text/html; charset=utf-8');

    return new Response(variant === 'B' ? versionB : versionA, {
        headers,
    });
}
