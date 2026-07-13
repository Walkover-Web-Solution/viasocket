const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
};

export const REFERRAL_STORAGE_KEY = 'viasocket_referral_id';

export const getStoredReferral = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFERRAL_STORAGE_KEY);
};

export const getUtmSource = () => {
    if (typeof window === 'undefined') return;

    const queryParams = new URLSearchParams(window.location.search);
    const ref = queryParams.get('ref');
    
    if (ref && ref.trim() !== '') {
        localStorage.setItem(REFERRAL_STORAGE_KEY, ref.trim());
    }

    if (!getCookie('utmData')) {
        const queryObject = {};

        queryParams.forEach((value, key) => {
            if (key.startsWith('utm_') || key.startsWith('affiliate_')) {
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
    let queryParams;

    if (typeof window !== 'undefined') {
        queryParams = new URLSearchParams(window.location.search);
        const ref = queryParams.get('ref');
        if (ref && ref.trim() !== '') {
            localStorage.setItem(REFERRAL_STORAGE_KEY, ref.trim());
        }
    }

    if (!utmData) {
        if (!queryParams && typeof window !== 'undefined') {
            queryParams = new URLSearchParams(window.location.search);
        }

        if (queryParams) {
            queryParams.forEach((value, key) => {
                if (key.startsWith('utm_') || key.startsWith('affiliate_')) {
                    queryObject[key] = value;
                }
            });
        }

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

    // Include A/B variant in utm_content only if user hasn't signed up yet
    // signup=true is set by middleware when user actually signs in (prod cookie appears)
    try {
        const abRaw = getCookie('ab_test');
        if (abRaw) {
            const abData = JSON.parse(decodeURIComponent(abRaw));
            const isLoggedIn = !!getCookie('prod');
            //once signup is true it stays true forever
            if (isLoggedIn && !abData.signup) {
                abData.signup = true;
                setCookie('ab_test', encodeURIComponent(JSON.stringify(abData)), 30);
            }
            if (abData.variant && !abData.signup) {
                queryObject.utm_content = abData.variant;
            } else {
                delete queryObject.utm_content;
                utmData = JSON.stringify(queryObject);
                setCookie('utmData', utmData, 1);
            }
        }
    } catch (e) {
        console.error('Failed to parse ab_test cookie:', e);
    }

    const queryString = Object.entries(queryObject)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');

    return `${utmData}&${queryString}`;
};
