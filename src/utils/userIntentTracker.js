const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
};

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const getUtmObject = () => {
    const utmData = getCookie('utmData');
    if (!utmData) return {};
    try {
        return JSON.parse(utmData);
    } catch (e) {
        console.error('Failed to parse utmData cookie:', e);
        return {};
    }
};

const saveUtmObject = (utmObject, days = 1) => {
    setCookie('utmData', JSON.stringify(utmObject), days);
};

export const setIntent = (intentValue, daysToExpire = 1) => {
    if (!intentValue) {
        console.warn('setIntent: intentValue is required');
        return;
    }
    const utmObject = getUtmObject();
    utmObject.intent = intentValue;
    saveUtmObject(utmObject, daysToExpire);
};

export const getIntent = () => {
    return getUtmObject().intent || null;
};

export const clearIntent = () => {
    const utmObject = getUtmObject();
    delete utmObject.intent;
    saveUtmObject(utmObject);
};
