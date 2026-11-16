import { NextResponse } from 'next/server';
import fallbackRedirects from './data/redirects.json';
import { ADMIN_URL } from './const/admin';
import { buildJsonNotFoundResponse } from './utils/buildJsonNotFoundResponse';
import { prefersApplicationJson } from './utils/prefersApplicationJson';
import { prefersTextMarkdown } from './utils/prefersTextMarkdown';
import { serveNotFoundMarkdown } from './utils/serveNotFoundMarkdown';

const NOT_FOUND_PROBE_HEADER = 'x-viasocket-404-probe';
const RDT_CID_COOKIE = 'rdt_cid';
const RDT_CID_MAX_AGE = 60 * 60 * 24 * 30;

const RDT_CID_REGEX = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

// Where an agent finds the API catalog and the site's description for it without parsing the
// HTML. The markdown representation of "/" is built here, so it has to carry this itself:
// Cloudflare Pages applies public/_headers to static assets only, and an agent asking for
// markdown never reaches the HTML response that file covers. Keep it equal to the
// "/new-home/" rule in public/_headers.
const AGENT_LINK_HEADER =
    '</.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby"; type="text/plain"';

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

    if (request.headers.get(NOT_FOUND_PROBE_HEADER) === '1') {
        return NextResponse.next();
    }

    const redirect = managedRedirect(request, await managedRedirects());
    if (redirect) return redirect;

    const barePath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const accept = request.headers.get('accept');

    if (prefersApplicationJson(accept)) {
        const probeHeaders = new Headers(request.headers);
        probeHeaders.set(NOT_FOUND_PROBE_HEADER, '1');
        probeHeaders.set('accept', 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8');
        try {
            const probe = await fetch(request.url, {
                method: 'GET',
                headers: probeHeaders,
                redirect: 'manual',
            });
            if (probe.status === 404) {
                return buildJsonNotFoundResponse(request);
            }
        } catch (err) {
            console.error('[json-404] probe failed:', err.message);
        }
    } else if (prefersTextMarkdown(accept)) {
        try {
            const probe = await fetch(request.url, {
                method: 'HEAD',
                headers: {
                    accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
                    [NOT_FOUND_PROBE_HEADER]: '1',
                },
            });
            if (probe.status === 404) {
                return serveNotFoundMarkdown(request);
            }
        } catch (err) {
            console.error('[404 markdown] probe failed:', err.message);
        }
    }

    if (barePath === '/' && prefersTextMarkdown(accept)) {
        const mdUrl = new URL('/homepage.md', request.url);
        const mdRes = await fetch(mdUrl);
        if (mdRes.ok) {
            const body = await mdRes.text();
            return new NextResponse(body, {
                status: 200,
                headers: {
                    'Content-Type': 'text/markdown; charset=utf-8',
                    Vary: 'Accept',
                    Link: AGENT_LINK_HEADER,
                },
            });
        }
    }

    // /home-b is not a public URL: opening it, as a person or a crawler, goes to
    // "/". The gate in version A's <head> fetches the file with this header and
    // writes it into "/" for version B visitors, so that request is let through.
    const gateFetch = pathname === '/home-b/index.html' && request.headers.get('x-homepage-fetch') === 'B';
    if ((barePath === '/home-b' || pathname === '/home-b/index.html') && !gateFetch) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        const homeRedirect = NextResponse.redirect(url, 302);
        homeRedirect.headers.set('Cache-Control', 'private, no-store');
        homeRedirect.headers.set('CDN-Cache-Control', 'no-store');
        return homeRedirect;
    }

    const response = NextResponse.next();

    if (barePath === '/') {
        response.headers.set('Vary', 'Accept');
    }

    // /setup-prompt echoes org and project ids in its flight data. A shared cache
    // must not store that. Cloudflare's zone cache rule is the authority in
    // production, but the origin has to declare this too.
    if (pathname === '/setup-prompt') {
        response.headers.set('Cache-Control', 'private, no-store, must-revalidate');
        response.headers.set('CDN-Cache-Control', 'no-store');
        // Same instruction as the page's robots meta. robots.txt does not Disallow
        // this path: a crawler has to fetch the page to see the noindex.
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
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
            // /setup-prompt puts org and project ids in the query. The page reads
            // them in the browser; this payload must not carry the query.
            const pageUrl = pathname === '/setup-prompt' ? `${request.nextUrl.origin}${pathname}` : request.url;

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
// /home-b/index.html has a dot, so the general matcher skips it; it is listed on
// its own so opening it directly is redirected to "/".
export const config = {
    matcher: ['/((?!_next/|api/|og/|.*\\..*).*)', '/home-b/index.html'],
};