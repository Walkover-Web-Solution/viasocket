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

export const getUtmSource = () => {
    if (!getCookie('utmData')) {
        const queryParams = new URLSearchParams(window.location.search);
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

    if (!utmData) {
        const queryParams = new URLSearchParams(window.location.search);

        queryParams.forEach((value, key) => {
            if (key.startsWith('utm_') || key.startsWith('affiliate_')) {
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

    // Include A/B variant only if user hasn't signed up yet
    try {
        const abRaw = getCookie('ab_test');
        if (abRaw) {
            const abData = JSON.parse(decodeURIComponent(abRaw));
            if (abData.variant && !abData.signup) {
                queryObject.ab_test = abData.variant;
                // Mark signup = true so variant is not sent again
                abData.signup = true;
                setCookie('ab_test', JSON.stringify(abData), 365);
            }
        }
    } catch {}

    const queryString = Object.entries(queryObject)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');

    return `${utmData}&${queryString}`;
};
