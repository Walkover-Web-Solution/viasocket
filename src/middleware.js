import { NextResponse } from 'next/server';
import { VARIANT_COOKIE, VARIANTS, VARIANT_MAX_AGE, VISITOR_ID_COOKIE, VISITOR_ID_MAX_AGE } from '@/const/abTest';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const RDT_CID_COOKIE = 'rdt_cid';
const RDT_CID_MAX_AGE = 60 * 60 * 24 * 30;

const RDT_CID_REGEX = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

const isValidRdtCid = (value) => typeof value === 'string' && value.length >= 40 && RDT_CID_REGEX.test(value);

// Replaces any existing `name` entry in a raw Cookie header with `value`,
// so a freshly-minted cookie can be forwarded into the current request
// (Set-Cookie on the response only reaches the *next* request).
const withCookie = (cookieHeader, name, value) => {
    const parts = (cookieHeader || '')
        .split(';')
        .map((part) => part.trim())
        .filter((part) => part && !part.startsWith(`${name}=`));
    parts.push(`${name}=${value}`);
    return parts.join('; ');
};

const getVariantCookieDomain = (hostname) => {
    if (!hostname) return undefined;
    // localhost and bare IPs are not registrable domains — browsers drop a cookie
    // that names one, so it is left off and the cookie stays host-only.
    if (hostname === 'localhost' || /^[\d.]+$/.test(hostname)) return undefined;
    if (hostname === 'viasocket.com' || hostname.endsWith('.viasocket.com')) return '.viasocket.com';
    return undefined;
};

export async function middleware(request) {
    const { pathname, searchParams } = request.nextUrl;

    // Redirect /home → /
    if (pathname === '/home') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const cookieDomain = getVariantCookieDomain(request.nextUrl.hostname);

    // Tracks whether this response is the one handing a visitor a cookie they
    // did not already have, on whichever page they happened to land on first.
    let mintedCookie = false;

    // A/B variant assignment (sticky, decided server-side at the edge)
    const existingVariant = request.cookies.get(VARIANT_COOKIE)?.value;
    const needsVariant = !existingVariant || !VARIANTS.includes(existingVariant);
    const variant = needsVariant ? VARIANTS[Math.floor(Math.random() * VARIANTS.length)] : existingVariant;

    // When a variant is freshly assigned, Set-Cookie below only reaches the
    // *next* request — page.js reads cookies() on this same request, so
    // without forwarding it here every new visitor's first render falls back
    // to VARIANTS[0] regardless of the coin flip.
    let response;
    if (needsVariant) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('cookie', withCookie(requestHeaders.get('cookie'), VARIANT_COOKIE, variant));
        response = NextResponse.next({ request: { headers: requestHeaders } });

        response.cookies.set(VARIANT_COOKIE, variant, {
            maxAge: VARIANT_MAX_AGE,
            path: '/',
            sameSite: 'lax',
            secure: true,
            domain: cookieDomain,
        });
        mintedCookie = true;
    } else {
        response = NextResponse.next();
    }

    // Anonymous visitor id — the key every visit is recorded against. Anything
    // that is not a plain uuid was not written by us, so it is replaced rather
    // than trusted as an identifier.
    const existingVisitorId = request.cookies.get(VISITOR_ID_COOKIE)?.value;
    if (!UUID_REGEX.test(existingVisitorId || '')) {
        response.cookies.set(VISITOR_ID_COOKIE, crypto.randomUUID(), {
            maxAge: VISITOR_ID_MAX_AGE,
            path: '/',
            sameSite: 'lax',
            secure: true,
            domain: cookieDomain,
        });
        mintedCookie = true;
    }

    // The homepage is rendered from the variant cookie, so a shared cache must
    // never store it regardless of cookies: a stored copy is replayed to
    // everyone with one visitor's variant baked into the HTML. Any other page
    // only needs the same treatment on the request that just minted a cookie —
    // a cached copy of that exact response would replay its Set-Cookie (or,
    // once evicted, the version with none) to every later visitor who lands on
    // that page first, which is how they end up with no tracking cookies at
    // all and the API call fails with "missing tracking cookies". Cloudflare's
    // zone cache rule is the authority in production, but the origin has to
    // declare this too or any cache in front of it repeats the mistake.
    if (pathname === '/' || mintedCookie) {
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
