import { getCookie, setCookie } from './handleUtmSource';

export const setIntent = (intentValue, daysToExpire = 1) => {
    if (!intentValue) {
        console.warn('setIntent: intentValue is required');
        return;
    }
    const utmObject = JSON.parse(getCookie('utmData') || '{}');
    utmObject.intent = intentValue;
    setCookie('utmData', JSON.stringify(utmObject), daysToExpire);
};
