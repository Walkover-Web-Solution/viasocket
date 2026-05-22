import { NextResponse } from 'next/server';

const RDT_CID_COOKIE = 'rdt_cid';
const RDT_CID_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function middleware(request) {
    const { pathname, searchParams } = request.nextUrl;

    // Block direct access to /home — redirect to /
    if (pathname === '/home') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const response = NextResponse.next();

    // Persist Reddit click id from URL into a first-party cookie for subsequent navigations
    const incomingClickId = searchParams.get('rdt_cid');
    if (incomingClickId) {
        response.cookies.set(RDT_CID_COOKIE, incomingClickId, {
            maxAge: RDT_CID_MAX_AGE,
            path: '/',
            sameSite: 'lax',
        });
    }

    // Reddit Conversion API — fire PageVisit server-side on every request (Edge-native fetch)
    const pageUrl = request.url;
    const clickId = incomingClickId || request.cookies.get(RDT_CID_COOKIE)?.value;
    const apiUrl = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}api/reddit/page-visit`;

    const payload = { event_source_url: pageUrl, click_id: clickId || undefined };

    // fire-and-forget; do not block the response
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).catch((err) => {
        console.error('[Reddit CAPI] tracking error:', err);
    });

    return response;
}

export const config = {
    // Run on all app routes; skip Next internals, API, and static assets
    matcher: ['/((?!_next/|api/|.*\\..*).*)'],
};
