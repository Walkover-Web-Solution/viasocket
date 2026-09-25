import { NextResponse } from 'next/server';

const RDT_CID_COOKIE = 'rdt_cid';
const RDT_CID_MAX_AGE = 60 * 60 * 24 * 30;

const RDT_CID_REGEX = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

const isValidRdtCid = (value) => typeof value === 'string' && value.length >= 40 && RDT_CID_REGEX.test(value);

export async function middleware(request) {
    const { pathname, searchParams } = request.nextUrl;

    // Redirect /home → /
    if (pathname === '/home') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const response = NextResponse.next();

    // The variant and visitor id cookies are written by the browser (see
    // TrackingCookies), not here: Cloudflare strips Set-Cookie from the HTML
    // responses it handles, so cookies minted at the edge never arrived.
    //
    // The homepage is still rendered from the variant cookie, so a shared cache
    // must never store it: a stored copy is replayed to everyone with one
    // visitor's variant baked into the HTML. Cloudflare's zone cache rule is the
    // authority in production, but the origin has to declare this too or any
    // cache in front of it repeats the mistake.
    if (pathname === '/') {
        response.headers.set('Cache-Control', 'private, no-store, must-revalidate');
        // Cloudflare reads this in preference to Cache-Control for its own edge
        // cache, so it is what keeps the page out of the CDN while leaving the
        // directive above to speak for the browser.
        response.headers.set('CDN-Cache-Control', 'no-store');
    }

    // Read click id from URL
    const rawIncomingClickId = searchParams.get('rdt_cid');

    const incomingClickId = isValidRdtCid(rawIncomingClickId) ? rawIncomingClickId : null;

    // Save valid click id in cookie
    if (incomingClickId) {
        response.cookies.set(RDT_CID_COOKIE, incomingClickId, {
            maxAge: RDT_CID_MAX_AGE,
            path: '/',
            sameSite: 'lax',
            secure: true,
        });
    } else if (rawIncomingClickId && !isValidRdtCid(rawIncomingClickId)) {
        response.cookies.delete(RDT_CID_COOKIE);
    }

    // Reddit tracking
    if (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod') {
        try {
            const pageUrl = request.url;

            const cookieClickId = request.cookies.get(RDT_CID_COOKIE)?.value;

            const clickId = incomingClickId || (isValidRdtCid(cookieClickId) ? cookieClickId : null);

            const apiUrl = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}api/reddit/page-visit`;

            const payload = {
                event_source_url: pageUrl,
            };

            if (clickId) {
                payload.click_id = clickId;
            }

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }).catch((err) => {
                console.error('[Reddit CAPI] tracking error:', err);
            });
        } catch (err) {
            console.error('Middleware error:', err);
        }
    }

    return response;
}

export const config = {
    matcher: ['/((?!_next/|api/|.*\\..*).*)'],
};
