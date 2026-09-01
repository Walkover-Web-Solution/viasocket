/**
 * Whether a tracking event came from a crawler rather than a person.
 *
 * The visitor table holds one row per anonymous visitor, keyed on a cookie. A
 * crawler does not keep cookies, so every page it fetches reads as a first-ever
 * visitor and earns a row of its own — which is how the table came to hold tens of
 * thousands of single-hit rows, and why the visitor lookup, a LIKE scan over that
 * table, gets slower with every one of them.
 *
 * Both tests below are deliberately conservative. A person wrongly dropped costs
 * one visit; a crawler wrongly kept costs a permanent row and every future lookup.
 */

// Self-declared crawlers. `bot` alone catches most of them; the rest are agents
// that identify themselves without ever saying "bot", and the headless browsers
// and HTTP clients that run scripted page loads.
const BOT_USER_AGENTS =
    /bot|crawl|spider|slurp|facebookexternalhit|meta-externalagent|bingpreview|embedly|quora link preview|whatsapp|telegrambot|discordbot|slackbot|linkedinbot|pinterest|redditbot|applebot|petalbot|yandex|baiduspider|duckduckbot|headlesschrome|phantomjs|puppeteer|playwright|selenium|lighthouse|chrome-lighthouse|gtmetrix|pingdom|uptimerobot|python-requests|python-urllib|go-http-client|java\/|okhttp|axios\/|node-fetch|got\/|curl\/|wget\/|libwww-perl|httpclient|scrapy|ahrefs|semrush|mj12bot|dotbot|screaming frog|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|anthropic-ai|perplexitybot|ccbot|bytespider|amazonbot|google-extended/i;

/**
 * A browser whose reported platform contradicts the OS in its user-agent string.
 *
 * A real Chrome on Windows reports `Win32`; on a Mac it reports `MacIntel`. A
 * headless browser running on a Linux host while spoofing a desktop user-agent
 * reports `Linux x86_64` and cannot change it, because navigator.platform comes
 * from the machine rather than the string. That mismatch was present in 83% of the
 * rows this table was collecting, alongside a Meta crawler IP range.
 */
const PLATFORM_BY_OS = {
    Windows: /^Win/i,
    macOS: /^Mac/i,
};

const hasSpoofedPlatform = (device) => {
    const expected = PLATFORM_BY_OS[device?.os];
    if (!expected || !device?.platform) return false;

    return !expected.test(device.platform);
};

export const isBotRequest = ({ userAgent, userInfo } = {}) => {
    if (typeof userAgent === 'string' && BOT_USER_AGENTS.test(userAgent)) return true;

    return hasSpoofedPlatform(userInfo?.device);
};
