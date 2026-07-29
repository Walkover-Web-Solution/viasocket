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
    const VARIANTS = ['A', 'B', 'C'];
    if (!VARIANTS.includes(variant)) return;
    const existing = getCookie('variant');
    if (existing && VARIANTS.includes(existing)) return;
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
