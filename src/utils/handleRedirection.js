import { setUtmSource } from './handleUtmSource';

export const handleRedirect = (e, url, router, customSource, extraParams = {}) => {
    e.preventDefault();
    const baseUrl = url.replace(/\?$/, '');
    const mergedParams = extraParams;
    const separator = baseUrl.includes('?') ? '&' : '?';
    const extra = Object.entries(mergedParams)
        .map(([key, val]) => `&${key}=${encodeURIComponent(val)}`)
        .join('');
    let finalUrl;

    if (customSource) {
        const utmState = JSON.stringify({ utm_source: customSource });
        finalUrl = `${baseUrl}${separator}state=${utmState}${extra}&utm_source=${encodeURIComponent(customSource)}`;
    } else {
        const source = typeof window !== 'undefined' ? window.location.pathname : '';
        const utmParams = setUtmSource({ source });
        finalUrl = `${baseUrl}${separator}state=${utmParams}${extra}`;
    }

    if (router && url.startsWith('/')) {
        router.push(finalUrl);
    } else {
        const target = url.includes('signup') ? '_self' : '_blank';
        window.open(finalUrl, target);
    }
};
