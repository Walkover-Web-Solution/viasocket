import { collectUserInfo, getUtmData } from './collectUserInfo';

/**
 * Client side of visitor tracking.
 *
 * Every event goes to the same endpoint, which keeps one row per visitor by
 * reading the row before writing it. That read-then-write is only safe if the
 * browser sends one event at a time, so views are held behind a lock shared by
 * every tab — otherwise two tabs opening together would each see "no row yet"
 * and each insert one. Interactions are the exception and say why below.
 */

const ENDPOINT = '/api/track-variant';
const LOCK_NAME = 'viasocket-visitor-tracking';

// A tracking request must never keep a page waiting, or hold the lock if the
// network stalls.
const REQUEST_TIMEOUT_MS = 8000;

// A visit ends when the visitor has been idle this long. Coming back after that
// is a revisit — which is what revisit_count counts — so closing the tab and
// returning later starts a new visit while moving between pages does not.
const SESSION_IDLE_MS = 30 * 60 * 1000;
const SESSION_KEY = 'vs_session';

// Serialises events raised by this tab even where the Web Locks API is missing.
let queue = Promise.resolve();

const newId = () => {
    try {
        return crypto.randomUUID();
    } catch {
        return `s-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    }
};

const readStore = (key) => {
    try {
        return JSON.parse(window.localStorage.getItem(key) || 'null');
    } catch {
        // Private browsing and blocked site data both throw here.
        return null;
    }
};

const writeStore = (key, value) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Nothing to do: a visitor whose storage is blocked simply starts a new
        // visit each time, which is the honest reading of what we can observe.
    }
};

/**
 * The visit this event belongs to, and whether it started it.
 *
 * Kept in localStorage rather than sessionStorage so two tabs of the same visit
 * agree they are one visit; the idle window is what ends a visit, not the tab
 * closing.
 */
const touchSession = () => {
    const now = Date.now();
    const stored = readStore(SESSION_KEY);
    const isLive = Boolean(stored?.id) && Number.isFinite(stored?.at) && now - stored.at < SESSION_IDLE_MS;

    const session = { id: isLive ? stored.id : newId(), at: now };
    writeStore(SESSION_KEY, session);

    return { sessionId: session.id, isNewSession: !isLive };
};

/** The current visit without starting one, for events that only ride along. */
const currentSessionId = () => readStore(SESSION_KEY)?.id || '';

const post = (payload) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    return fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
        // Reports made as the page is being replaced have to outlive it.
        keepalive: true,
    })
        .catch(() => {
            // Tracking is best-effort and must never disturb the page.
        })
        .finally(() => clearTimeout(timer));
};

/**
 * Runs the request under a lock shared by every tab on this origin.
 *
 * The payload is built inside the lock rather than before it, so deciding whether
 * this event starts a new visit happens where only one tab can be doing it —
 * otherwise two tabs opening together would each claim to have started one and
 * revisit_count would climb twice.
 *
 * Web Locks is the only cross-tab mutex a browser offers; where it is missing the
 * in-tab queue still orders this tab's own events, and the API route settles the
 * rest by collapsing any duplicate row it finds.
 */
const send = (buildPayload) => {
    const run = async () => {
        const locks = typeof navigator !== 'undefined' ? navigator.locks : null;

        if (!locks?.request) return post(buildPayload());

        try {
            await locks.request(LOCK_NAME, () => post(buildPayload()));
        } catch {
            // Locks are unavailable in this context — report without one rather
            // than dropping the event.
            await post(buildPayload());
        }
    };

    queue = queue.then(run, run);
    return queue;
};

/**
 * Sends a report straight out, with no lock and no queue.
 *
 * An interaction usually navigates immediately, and a request that has not left
 * the page yet is lost with it — waiting for a lock would be waiting for a page
 * that is going. The row already exists by now (the view was reported on load),
 * so the worst a clash with an in-flight view can cost is one increment, which is
 * a far better trade than dropping the interaction.
 */
const sendNow = (payload) => {
    const body = JSON.stringify(payload);

    // sendBeacon exists for exactly this: a report made while the page is being
    // replaced, which the browser keeps sending on the page's behalf.
    try {
        if (navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: 'application/json' }))) return;
    } catch {
        // Falls through to fetch.
    }

    post(payload);
};

/** Reports that this visitor has looked at a page. */
export const trackView = () =>
    send(() => ({
        event: 'view',
        userInfo: collectUserInfo(),
        pageUrl: window.location.href,
        utmData: getUtmData(),
        referrer: document.referrer || '',
        ...touchSession(),
    }));

/**
 * Reports one meaningful interaction — a header link, a hero CTA, a footer link.
 *
 * `element` is the stable name this site gives the thing that was pressed, and is
 * what the API route keys the event on; everything else is context. The UTM data
 * is read off the current URL at the moment of the press, so an interaction
 * carries the attribution the visitor is browsing under — which the route keeps
 * separate from their original attribution rather than overwriting it.
 */
export const trackInteraction = ({ element, label, section, action, destinationUrl } = {}) => {
    if (typeof window === 'undefined' || !element) return;

    sendNow({
        event: 'click',
        element,
        label,
        section,
        action,
        destinationUrl,
        pageUrl: window.location.href,
        utmData: getUtmData(),
        referrer: document.referrer || '',
        sessionId: currentSessionId(),
    });
};

/**
 * Reports a hero call to action.
 *
 * One request carries both readings: the A/B counters this site already keeps per
 * `utm_source` tag, and the interaction itself for the click history. Sending two
 * requests would count the press twice.
 */
export const trackCtaClick = (source, interaction = {}) => {
    if (typeof window === 'undefined') return;

    sendNow({
        event: 'cta',
        ctaSource: source,
        section: 'hero',
        ...interaction,
        userInfo: collectUserInfo(),
        pageUrl: window.location.href,
        utmData: getUtmData(),
        referrer: document.referrer || '',
        sessionId: currentSessionId(),
    });
};
