import { getCookie, setCookie } from './handleUtmSource';

export const setIntent = (intentValue) => {
    let utmObject = {};
    try {
        utmObject = JSON.parse(getCookie('utmData') || '{}');
    } catch {
        utmObject = {};
    }
    utmObject.intent = intentValue;
    setCookie('utmData', JSON.stringify(utmObject), 1);
};
