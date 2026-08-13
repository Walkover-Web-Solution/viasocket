export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const getCookieDomain = () => {
    if (typeof window === 'undefined') return '';
    const hostname = window.location.hostname;
    if (!hostname) return '';
    const parts = hostname.split('.');
    const rootDomain = parts.length > 2 ? parts.slice(-2).join('.') : hostname;
    return `.${rootDomain}`;
};

export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const domain = getCookieDomain();
    const domainAttr = domain ? `;domain=${domain}` : '';
    document.cookie = `${name}=${value};${expires};path=/${domainAttr}`;
};

export const setVariantCookie = (variant) => {
    const VARIANTS = ['A', 'B'];
    if (!VARIANTS.includes(variant)) return;
    if (getCookie('variant') === variant) return;
    setCookie('variant', variant, 30);
};

export const getUtmSource = () => {
    if (!getCookie('utmData')) {
        const queryParams = new URLSearchParams(window.location.search);
        const queryObject = {};

        queryParams.forEach((value, key) => {
            if (key.startsWith('utm_') || key.startsWith('affiliate_') || key === 'ref') {
                queryObject[key] = value;
            }
        });

        if (Object.keys(queryObject).length > 0) {
            setCookie('utmData', JSON.stringify(queryObject), 1);
        }
    }
};

// Sources this site stamps on itself. Page-path sources (e.g. '/integrations')
// count as internal too. Anything else in utmData came from outside — an ad, a
// referral — and is real attribution we must not overwrite.
const INTERNAL_UTM_SOURCES = ['home-A', 'home-B', 'relay-switch-google-ads'];

const isInternalUtmSource = (source) =>
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
    setCookie('utmData', JSON.stringify(utmData), 1);
};

export const setUtmSource = ({ source = 'index' } = {}) => {
    let utmData = getCookie('utmData');
    let queryObject = {};

    if (!utmData) {
        const queryParams = new URLSearchParams(window.location.search);

        queryParams.forEach((value, key) => {
            if (key.startsWith('utm_') || key.startsWith('affiliate_') || key === 'ref') {
                queryObject[key] = value;
            }
        });

        if (Object.keys(queryObject).length > 0) {
            utmData = JSON.stringify(queryObject);
            setCookie('utmData', utmData, 1);
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
