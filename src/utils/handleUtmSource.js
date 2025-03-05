export const getUtmSource = () => {
    if (!sessionStorage.getItem('utmData')) {
        const queryParams = new URLSearchParams(window.location.search);
        const queryObject = {};

        queryParams.forEach((value, key) => {
            if (key.startsWith('utm_') || key.startsWith('affiliate_')) {
                queryObject[key] = value;
            }
        });

        // Store only for the session
        if (Object.keys(queryObject).length > 0) {
            sessionStorage.setItem('utmData', JSON.stringify(queryObject));
        }
    }
};

export const setUtmSource = () => {
    let utmData = sessionStorage.getItem('utmData');

    if (!utmData) {
        const queryParams = new URLSearchParams(window.location.search);
        const queryObject = {};

        queryParams.forEach((value, key) => {
            if (key.startsWith('utm_') || key.startsWith('affiliate_')) {
                queryObject[key] = value;
            }
        });

        if (Object.keys(queryObject).length > 0) {
            utmData = JSON.stringify(queryObject);
            sessionStorage.setItem('utmData', utmData);
        }
    }

    return utmData ? utmData : JSON.stringify({ utm_source: 'website' });
};
