import { NextResponse } from 'next/server';

const RDT_CID_COOKIE = 'rdt_cid';
const RDT_CID_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function middleware(request) {
  const { pathname, search, searchParams } = request.nextUrl;

  // Block direct access to /home — redirect to /
  if (pathname === '/home') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Forward the request pathname (incl. query) so server components can read it via headers()
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', `${pathname}${search || ''}`);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Persist Reddit click id from URL into a first-party cookie for subsequent navigations
  const incomingClickId = searchParams.get('rdt_cid');
  if (incomingClickId) {
    response.cookies.set(RDT_CID_COOKIE, incomingClickId, {
      maxAge: RDT_CID_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  // Run on all app routes; skip Next internals, API, and static assets
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
};
  