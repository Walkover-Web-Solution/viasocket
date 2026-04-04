import { NextResponse } from 'next/server';

const COOKIE_NAME = 'ab_test';

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

  // Read ab_test cookie (browser sends it on each request)
  let abData = null;
  try {
    const raw = request.cookies.get(COOKIE_NAME)?.value;
    if (raw) abData = JSON.parse(decodeURIComponent(raw));
  } catch {}

  let variant;

  if (abData && (abData.variant === 'old' || abData.variant === 'new')) {
    // Variant already set (cookie exists from client-side) → keep it sticky
    variant = abData.variant;
  } else if (!!request.cookies.get('prod')?.value) {
    // First visit, already logged in → not part of experiment
    variant = 'old';
  } else {
    // New guest, no cookie yet → random 80/20 (new/old)
    variant = Math.random() > 0.8 ? 'old' : 'new';
  }

  if (variant === 'new') {
    // Rewrite / to /home internally (URL stays /)
    const url = request.nextUrl.clone();
    url.pathname = '/home';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home'],
};
  