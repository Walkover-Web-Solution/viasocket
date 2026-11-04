import { VISITOR_ID_COOKIE } from '@/const/abTest';

// Returns the first match: a stale host-only copy alongside the .viasocket.com
// one would otherwise make the cookie read as missing.
export const getCookie = (name) => {
    const entry = document.cookie.split('; ').find((part) => part.startsWith(`${name}=`));
    return entry ? entry.slice(name.length + 1) : undefined;
};

const getCookieDomain = () => {
    if (typeof window === 'undefined') return '';
    const hostname = window.location.hostname;
    if (!hostname || hostname === 'localhost' || /^[\d.]+$/.test(hostname)) return '';
    if (hostname === 'viasocket.com' || hostname.endsWith('.viasocket.com')) return '.viasocket.com';
    return '';
};

export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const domain = getCookieDomain();
    const domainAttr = domain ? `;domain=${domain}` : '';
    const secureAttr = window.location.protocol === 'https:' ? ';secure' : '';
    document.cookie = `${name}=${value};${expires};path=/${domainAttr}${secureAttr}`;
};

// Ad platforms auto-tag their clicks with these instead of utm_*, so a Google
// Ads visit without hand-written UTMs still says where it came from.
const CLICK_ID_PARAMS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'li_fat_id', 'ttclid', 'rdt_cid'];

const isAttributionParam = (key) =>
    key.startsWith('utm_') || key.startsWith('affiliate_') || key === 'ref' || CLICK_ID_PARAMS.includes(key);

// An ad click often converts days later, so a day was losing most of them.
const UTM_COOKIE_DAYS = 30;

export const getUtmSource = () => {
    if (!getCookie('utmData')) {
        const queryParams = new URLSearchParams(window.location.search);
        const queryObject = {};

        queryParams.forEach((value, key) => {
            if (isAttributionParam(key)) {
                queryObject[key] = value;
            }
        });

        if (Object.keys(queryObject).length > 0) {
            setCookie('utmData', JSON.stringify(queryObject), UTM_COOKIE_DAYS);
        }
    }
};

// Sources this site stamps on itself. Page-path sources (e.g. '/integrations')
// count as internal too. Anything else in utmData came from outside — an ad, a
// referral — and is real attribution we must not overwrite.
const INTERNAL_UTM_SOURCES = ['home-A', 'home-B', 'a', 'b', 'relay-switch-google-ads'];

export const isInternalUtmSource = (source) =>
    !source || source.startsWith('/') || INTERNAL_UTM_SOURCES.includes(source);

/**
 * Saves a page's own utm_source into the utmData cookie, so a signup started
 * from that page is attributed to it.
 *
 * handleRedirect only puts the source in the URL. The signup page resolves its
 * source from this cookie before falling back to the query string, so without
 * this the value passed by a page is dropped whenever a cookie already exists.
 * Only internal tags are replaced — an external source stays put, keeping ad
 * attribution intact. Other keys already in the cookie (a carried-over prompt)
 * are preserved.
 */
export const savePageUtmSource = (source) => {
    if (typeof document === 'undefined' || !source) return;

    let utmData = {};
    try {
        utmData = JSON.parse(getCookie('utmData') || '{}');
    } catch {
        utmData = {};
    }

    if (!isInternalUtmSource(utmData.utm_source)) return;

    utmData.utm_source = source;
    setCookie('utmData', JSON.stringify(utmData), UTM_COOKIE_DAYS);
};

export const setUtmSource = ({ source = 'index' } = {}) => {
    let utmData = getCookie('utmData');
    let queryObject = {};

    if (!utmData) {
        const queryParams = new URLSearchParams(window.location.search);

        queryParams.forEach((value, key) => {
            if (isAttributionParam(key)) {
                queryObject[key] = value;
            }
        });

        if (Object.keys(queryObject).length > 0) {
            utmData = JSON.stringify(queryObject);
            setCookie('utmData', utmData, UTM_COOKIE_DAYS);
        }
    }

    if (!utmData) {
        queryObject = { utm_source: source };
        utmData = JSON.stringify(queryObject);
    } else {
        queryObject = JSON.parse(utmData);
    }

    const queryString = Object.entries(queryObject)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');

    return `${utmData}&${queryString}`;
};

// Written by trackVisitor when a signup button is pressed: which of our own
// buttons started the signup, kept apart from utm_source so it never erases
// where the visitor actually came from.
export const SIGNUP_CTA_COOKIE = 'signup_cta';

/**
 * The `state` handed to MSG91 at signup.
 *
 * The same shape setUtmSource has always produced — the signed-up users table
 * already stores it — plus the anonymous visitor id and the signup button. The
 * visitor id is what lets the admin join a signed-up user to every page and
 * click that came before.
 */
export const buildSignupState = () => {
    // Captures this page's query into the cookie if it is not set yet; the
    // string it returns cannot be split back apart safely, as a carried prompt
    // may itself contain '&'.
    setUtmSource();

    let data = {};
    try {
        data = JSON.parse(getCookie('utmData') || '{}');
    } catch {
        data = {};
    }
    if (!Object.keys(data).length) data = { utm_source: 'index' };

    const visitorId = getCookie(VISITOR_ID_COOKIE);
    const cta = getCookie(SIGNUP_CTA_COOKIE);
    if (visitorId) data.visitor_id = visitorId;
    if (cta) data.cta = decodeURIComponent(cta);

    const queryString = Object.entries(data)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');

    return `${JSON.stringify(data)}&${queryString}`;
};
