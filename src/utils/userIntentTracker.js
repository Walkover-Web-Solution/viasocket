import { getCookie, setCookie } from './handleUtmSource';

export const setIntent = (intentValue) => {
    const utmObject = JSON.parse(getCookie('utmData') || '{}');
    utmObject.intent = intentValue;
    setCookie('utmData', JSON.stringify(utmObject), 1);
};
