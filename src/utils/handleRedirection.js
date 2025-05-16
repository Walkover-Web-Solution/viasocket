import { setUtmSource } from './handleUtmSource';

export const handleRedirect = (e, url) => {
    e.preventDefault();
    const source = typeof window !== 'undefined' ? window.location.pathname : '';
    const utmParams = setUtmSource({ source: source });
    window.location.href = `${url}state=${utmParams}`;
};
