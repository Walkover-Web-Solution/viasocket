import { getCookie, setCookie, savePageUtmSource } from '@/utils/handleUtmSource';
import { trackCtaClick } from '@/utils/trackVisitor';

/**
 * The signup handoff for /index.
 *
 * Each section that can start a signup carries its own utm_source, so the entry
 * points stay separable in reporting.
 */

// Straight to /signup rather than through handleRedirect, which sends
// utm_source twice — once inside `state`, once standalone. Only the standalone
// one is read: the login component rebuilds `state` itself from the cookie.
const SIGNUP_PATH = '/signup';

/**
 * The source this page stamps on its own signups: its path, which is how every
 * other page on the site tags itself (`/embed`, `/integrations`).
 *
 * Path-shaped matters. `isInternalUtmSource()` counts a leading slash as the
 * site tagging itself, and `savePageUtmSource()` only overwrites a source that
 * passes that test — anything else in the cookie came from outside, an ad or a
 * referral, and is real attribution it must not destroy. A tag that is neither
 * path-shaped nor registered would be mistaken for exactly that: the first
 * click of the day would win and every later CTA on this page would be refused.
 *
 * Which section a signup started from is recorded in the tracking event's
 * `element` field instead, which is where the rest of the site keeps it.
 */
export const INDEX_UTM_SOURCE = '/index';

/**
 * Records a signup click that is leaving through a real anchor.
 *
 * Every entry point on this page is an `<a>` rather than a button calling
 * `window.location`: a button navigates but is not a link — it passes no
 * equity, a crawler cannot see where it goes, and a reader cannot middle-click
 * or cmd-click it. So this saves the page's own utm_source and reports the
 * click without touching the event, and the browser follows the href as normal.
 */
export const trackSignupClick = (source, meta = {}) => {
    savePageUtmSource(source);
    trackCtaClick(source, { action: 'signup_click', ...meta });
};

export const PROMPT_MAX_LENGTH = 1500;

/**
 * Cleans a hero prompt for the trip to signup.
 *
 * The receiving page writes the result into `utmData`, whose value is a cookie,
 * and a cookie value is terminated by a semicolon and dropped whole above
 * roughly 4 KB. Both limits belong on this side of the handoff. Order matters:
 * replace, then cap, then trim.
 */
export const carryPrompt = (value) => (value || '').replaceAll(';', ',').slice(0, PROMPT_MAX_LENGTH).trim();

/**
 * Carries a typed prompt forward to signup.
 *
 * It travels in the `utmData` cookie, not in the URL, which is how the rest of
 * the site does it: `setUtmSource()` builds the `state` parameter from every key
 * in that cookie and the login component calls it, so anything stored here
 * arrives at signup without appearing in the address bar, the referrer or
 * analytics. localStorage is a best-effort second copy, as the other heroes
 * keep, and is wrapped because a private window can refuse it.
 *
 * Call this BEFORE savePageUtmSource: that one preserves keys already in the
 * cookie while it sets utm_source, so the order keeps both.
 */
export const carryPromptToSignup = (value) => {
    const prompt = carryPrompt(value);
    if (typeof document === 'undefined' || !prompt) return;

    let utmData = {};
    try {
        utmData = JSON.parse(getCookie('utmData') || '{}');
    } catch {
        utmData = {};
    }

    utmData.prompt = prompt;
    setCookie('utmData', JSON.stringify(utmData), 1);

    try {
        window.localStorage.setItem('prompt', prompt);
    } catch {
        // A private window can refuse storage; the cookie is the real channel.
    }
};

/**
 * The signup destination. utm_source appears exactly once, and the prompt is
 * not on it — see carryPromptToSignup for where it actually travels.
 */
export const buildSignupHref = (source = INDEX_UTM_SOURCE) => `${SIGNUP_PATH}?utm_source=${source}`;
