// Browser-side visitor fingerprint used for A/B variant reporting.
// Everything here reads from `window`/`navigator`, so it must run in the client.

const BROWSERS = [
    { name: 'Edge', regex: /Edg(?:e|A|iOS)?\/([\d.]+)/ },
    { name: 'Opera', regex: /(?:OPR|Opera)\/([\d.]+)/ },
    { name: 'Samsung Internet', regex: /SamsungBrowser\/([\d.]+)/ },
    { name: 'Chrome', regex: /(?:Chrome|CriOS)\/([\d.]+)/ },
    { name: 'Firefox', regex: /(?:Firefox|FxiOS)\/([\d.]+)/ },
    { name: 'Safari', regex: /Version\/([\d.]+).*Safari/ },
];

const OPERATING_SYSTEMS = [
    { name: 'Windows', regex: /Windows NT/ },
    { name: 'Android', regex: /Android/ },
    { name: 'iOS', regex: /iPhone|iPad|iPod/ },
    { name: 'macOS', regex: /Mac OS X|Macintosh/ },
    { name: 'Linux', regex: /Linux/ },
];

// Order matters: tablets also match the generic mobile hints.
const getDeviceType = (userAgent) => {
    if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(userAgent)) return 'tablet';
    if (/Mobi|iPhone|iPod|Android|Windows Phone|BlackBerry/i.test(userAgent)) return 'mobile';
    return 'desktop';
};

const getBrowser = (userAgent) => {
    const match = BROWSERS.find(({ regex }) => regex.test(userAgent));
    return {
        browser: match?.name || 'unknown',
        // Major version only — enough to segment on, and it keeps the row small.
        browserVersion: match ? userAgent.match(match.regex)?.[1]?.split('.')[0] || '' : '',
    };
};

const getOS = (userAgent) => OPERATING_SYSTEMS.find(({ regex }) => regex.test(userAgent))?.name || 'unknown';

// Every utm_* param on the current URL, e.g. { utm_source: 'google' }.
export function getUtmData(search = window.location.search) {
    const params = new URLSearchParams(search);
    const utmData = {};

    params.forEach((value, key) => {
        if (key.toLowerCase().startsWith('utm_')) utmData[key.toLowerCase()] = value;
    });

    return utmData;
}

export function collectUserInfo() {
    const userAgent = navigator.userAgent || '';
    const { browser, browserVersion } = getBrowser(userAgent);

    return {
        device: {
            type: getDeviceType(userAgent),
            os: getOS(userAgent),
            platform: navigator.platform || '',
            browser,
            browserVersion,
        },
        screen: {
            width: window.screen?.width ?? null,
            height: window.screen?.height ?? null,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio ?? null,
        },
        browser: {
            language: navigator.language || '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            cookiesEnabled: navigator.cookieEnabled,
            online: navigator.onLine,
        },
    };
}
