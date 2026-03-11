import { NextResponse } from 'next/server';

const COOKIE_NAME = 'ab_test';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setAbCookie(response, data) {
  response.cookies.set(COOKIE_NAME, JSON.stringify(data), {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false,
    sameSite: 'lax',
  });
  return response;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Block direct access to /home — redirect to /
  if (pathname === '/home') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Only run A/B test on the homepage
  if (pathname !== '/') {
    return NextResponse.next();
  }

  // Parse existing ab_test cookie
  let abData = null;
  try {
    const raw = request.cookies.get(COOKIE_NAME)?.value;
    if (raw) abData = JSON.parse(raw);
  } catch {}

  const isLoggedIn = !!request.cookies.get('prod')?.value;
  let variant;
  let signup = isLoggedIn || !!abData?.signup;

  if (abData && (abData.variant === 'old' || abData.variant === 'new')) {
    // Variant already set → keep it sticky
    variant = abData.variant;
  } else if (isLoggedIn) {
    // First visit, already logged in → not part of experiment
    variant = 'old';
  } else {
    // New guest → random 50/50
    variant = Math.random() < 0.5 ? 'old' : 'new';
  }

  let response;

  if (variant === 'new') {
    // Rewrite / to /home internally (URL stays /)
    const url = request.nextUrl.clone();
    url.pathname = '/home';
    response = NextResponse.rewrite(url);
  } else {
    response = NextResponse.next();
  }

  // Prevent CDN (Cloudflare) from caching this response — cached responses strip Set-Cookie
  response.headers.set('Cache-Control', 'private, no-store, must-revalidate');

  return setAbCookie(response, { variant, signup });
}

export const config = {
  matcher: ['/', '/home'],
};
  