import { setUtmSource } from './handleUtmSource';

export const handleRedirect = (e, url, router, customSource) => {
    e.preventDefault();
    const baseUrl = url.replace(/\?$/, '');
    const separator = baseUrl.includes('?') ? '&' : '?';
    let finalUrl;

    if (customSource) {
        const utmState = JSON.stringify({ utm_source: customSource });
        finalUrl = `${baseUrl}${separator}state=${utmState}&utm_source=${customSource}`;
    } else {
        const source = typeof window !== 'undefined' ? window.location.pathname : '';
        const utmParams = setUtmSource({ source });
        finalUrl = `${baseUrl}${separator}state=${utmParams}`;
    }

    if (router && url.startsWith('/')) {
        router.push(finalUrl);
    } else {
        const target = url.includes('signup') ? '_self' : '_blank';
        window.open(finalUrl, target);
    }
};
