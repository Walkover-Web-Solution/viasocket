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

/**
 * Set intent cookie to track user's origin/intent
 * @param {string} intentValue - The intent value (e.g., 'hireanexpert', 'contactsales', 'bookdemo')
 * @param {number} daysToExpire - Number of days until cookie expires (default: 1)
 */
export const setIntent = (intentValue, daysToExpire = 1) => {
    if (!intentValue) {
        console.warn('setIntent: intentValue is required');
        return;
    }
    setCookie('intent', intentValue, daysToExpire);
};

/**
 * Get the current intent from cookie
 * @returns {string|null} The intent value or null if not set
 */
export const getIntent = () => {
    return getCookie('intent') || null;
};

/**
 * Clear the intent cookie
 */
export const clearIntent = () => {
    setCookie('intent', '', -1);
};
