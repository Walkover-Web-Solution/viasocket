import { NextResponse } from 'next/server';
import fallbackRedirects from './data/redirects.json';
import { ADMIN_URL } from './const/admin';

const RDT_CID_COOKIE = 'rdt_cid';
const RDT_CID_MAX_AGE = 60 * 60 * 24 * 30;

const RDT_CID_REGEX = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

const isValidRdtCid = (value) => typeof value === 'string' && value.length >= 40 && RDT_CID_REGEX.test(value);

// Every redirect of the site is managed in the admin panel (Pages → Redirects). The list comes from
// the admin's public API and is kept for a minute. Until it has been read, or when the admin can't
// be reached, the copy in src/data/redirects.json is used, so the site never loses its redirects
// and a page never waits on the admin for long.
// Rules (the admin checks them too): "/old" matches only /old; "/old/*" matches /old and everything
// under it; a destination ending in * takes what the source's * matched; the query string is kept;
// the most specific match wins, and a match with statusCode 0 is an exception: no redirect.
const ADMIN_REDIRECTS_URL = `${ADMIN_URL}/api/public/redirects`;
const REDIRECTS_TTL_MS = 60 * 1000;
let redirectCache = null; // { at, list }, filled below once sortRedirects exists
let redirectRefresh = null;

// Exact sources first, then the longest wildcard, so the most specific redirect wins.
const sortRedirects = (list) =>
    list
        .filter((r) => r && typeof r.source === 'string' && typeof r.destination === 'string')
        .map((r) => ({ ...r, wildcard: r.source.endsWith('/*'), base: r.source.replace(/\/\*$/, '') }))
        .sort((a, b) => a.wildcard - b.wildcard || b.base.length - a.base.length);
redirectCache = { at: 0, list: sortRedirects(fallbackRedirects.redirects || []) };

async function managedRedirects() {
    if (Date.now() - redirectCache.at < REDIRECTS_TTL_MS) return redirectCache.list;
    redirectRefresh ??= fetch(ADMIN_REDIRECTS_URL, { signal: AbortSignal.timeout(1500) })
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
        .then((data) => {
            redirectCache = { at: Date.now(), list: sortRedirects(Array.isArray(data?.redirects) ? data.redirects : []) };
        })
        .catch((err) => {
            console.error('[redirects] could not refresh the list:', err.message);
            redirectCache = { ...redirectCache, at: Date.now() }; // keep the last list; try again in a minute
        })
        .finally(() => {
            redirectRefresh = null;
        });
    await redirectRefresh;
    return redirectCache.list;
}

function managedRedirect(request, list) {
    const path = request.nextUrl.pathname.length > 1 ? request.nextUrl.pathname.replace(/\/+$/, '') : '/';
    const hit = list.find((r) => (r.wildcard ? path === r.base || path.startsWith(`${r.base}/`) : path === r.source));
    if (!hit || !hit.statusCode) return null;
    let destination = hit.destination;
    if (destination.endsWith('*')) {
        const rest = hit.wildcard ? path.slice(hit.base.length).replace(/^\//, '') : '';
        destination = destination.slice(0, -1) + rest;
        if (!rest && destination.length > 1) destination = destination.replace(/\/+$/, '');
    }
    const url = new URL(destination, request.url);
    request.nextUrl.searchParams.forEach((value, key) => {
        if (!url.searchParams.has(key)) url.searchParams.append(key, value);
    });
    if (url.href === request.nextUrl.href) return null;
    const response = NextResponse.redirect(url, [301, 302, 307, 308].includes(hit.statusCode) ? hit.statusCode : 308);
    // Browsers keep a permanent redirect with no caching headers forever, so one removed in the
    // admin would go on redirecting returning visitors. Five minutes keeps changes reaching them.
    response.headers.set('Cache-Control', 'public, max-age=300');
    return response;
}

export async function middleware(request) {
    const { pathname, searchParams } = request.nextUrl;

    const redirect = managedRedirect(request, await managedRedirects());
    if (redirect) return redirect;

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

// Not for share images (/og/...): they need no redirects or cookies, and are not page visits.
export const config = {
    matcher: ['/((?!_next/|api/|og/|.*\\..*).*)'],
};
