import { setUtmSource } from './handleUtmSource';

export const handleRedirect = (e, url, router) => {
    e.preventDefault();
    const source = typeof window !== 'undefined' ? window.location.pathname : '';
    const utmParams = setUtmSource({ source });
    const finalUrl = `${url}state=${utmParams}`;

    if (router && url.startsWith('/')) {
        router.push(finalUrl);
    } else {
        window.open(finalUrl, '_blank');
    }
};
