import { isInternalUtmSource } from './handleUtmSource';

/**
 * How a visitor's row in the A/B tracking table is built and grown.
 *
 * The table holds exactly one row per anonymous visitor, so every visit after the
 * first is a merge rather than an insert. All of that arithmetic lives here,
 * free of transport and request concerns: the API route resolves the facts it can
 * trust (visitor id, variant, IP, environment) and these functions decide what
 * the row should look like afterwards.
 */

// The table has no column per counter, so the per-visitor detail is kept as JSON
// in `name` — the same column the old per-page rows used. The marker says which
// shape a row is in, so a row written before this file existed is recognised and
// folded in rather than misread as an empty profile.
export const PROFILE_VERSION = 2;

// A repeat visit is meant to be counted, but one visit must not be counted twice.
// Anything arriving this soon after the same page was recorded is a duplicate
// request — a double-fired effect, a retry, two tabs restoring at once — not a
// second look at the page.
export const VIEW_DEDUPE_WINDOW_MS = 10_000;

const HOME_PATHS = new Set(['/', '/home']);

// A visitor's history is folded in on their next visit, and each fold costs one
// request, so a long legacy history is absorbed over several visits rather than
// holding one response open for all of it.
export const MAX_MERGES_PER_REQUEST = 10;

// click_data and page_data are single cells, so the journey they hold has to stay
// a size the table will accept. The newest events are the ones kept, and the
// running totals in `name` keep counting past the cap so a trimmed history is
// still an honest one.
export const MAX_CLICK_EVENTS = 100;
export const MAX_PAGE_EVENTS = 100;

// Two events for the same element this close together are one press — a
// double-click, or a handler that fired twice. Separate presses of separate
// buttons are always kept, however fast they come.
export const CLICK_DEDUPE_WINDOW_MS = 400;

// A visit ends when the visitor has been idle this long; coming back after that
// is a revisit, which is what revisit_count counts.
export const SESSION_IDLE_MS = 30 * 60 * 1000;

// Signup completion happens inside the MSG91 widget, off this site, so a click on
// a signup button is recorded as intent and never as a completed signup.
const SIGNUP_ACTIONS = new Set(['signup_click']);
const LOGIN_ACTIONS = new Set(['login_click']);

const toInt = (value) => {
    const number = parseInt(value, 10);
    return Number.isFinite(number) ? number : 0;
};

export const parseJson = (value, fallback = {}) => {
    if (value && typeof value === 'object') return value;
    try {
        const parsed = JSON.parse(value || '');
        return parsed && typeof parsed === 'object' ? parsed : fallback;
    } catch {
        return fallback;
    }
};

const bump = (counters, key, by = 1) => {
    if (!key) return counters || {};
    return { ...(counters || {}), [key]: toInt((counters || {})[key]) + by };
};

const addCounters = (left, right) =>
    Object.entries(right || {}).reduce((totals, [key, value]) => bump(totals, key, toInt(value)), { ...(left || {}) });

const parseJsonArray = (value) => {
    if (Array.isArray(value)) return value;
    try {
        const parsed = JSON.parse(value || '');
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

// Oldest first, so a reader of click_data reads the journey in the order it
// happened; events without a timestamp keep the order they arrived in.
const byTimestamp = (a, b) => String(a?.timestamp || '').localeCompare(String(b?.timestamp || ''));

/** Appends an event to a history, keeping the newest `limit` of them. */
const appendEvent = (history, event, limit) => {
    const next = [...(history || []), event];
    return next.length > limit ? next.slice(next.length - limit) : next;
};

/** Interleaves two histories by time, keeping the newest `limit` of them. */
const mergeHistories = (left, right, limit) => {
    const merged = [...(left || []), ...(right || [])].sort(byTimestamp);
    return merged.length > limit ? merged.slice(merged.length - limit) : merged;
};

/** The path a URL points at, used to key the per-page counters. */
export const getPagePath = (pageUrl) => {
    try {
        return new URL(pageUrl).pathname || '/';
    } catch {
        return '';
    }
};

/**
 * The identity of a page for de-duplication purposes.
 *
 * Two requests describe the same view when they differ only in what a reload
 * cannot change: the hash, and the order the query parameters happen to be
 * written in. A different path, or new query data, is a different page.
 */
export const getPageKey = (pageUrl) => {
    try {
        const url = new URL(pageUrl);
        const params = [...url.searchParams.entries()].sort(([a], [b]) => a.localeCompare(b));
        const search = new URLSearchParams(params).toString();
        return `${url.origin}${url.pathname}${search ? `?${search}` : ''}`;
    } catch {
        return pageUrl || '';
    }
};

export const isHomePath = (path) => HOME_PATHS.has(path);

const isSignupPath = (path) => path === '/signup';

/** Whether any utm_* parameter at all was present. */
const hasAnyUtm = (utmData) => Boolean(utmData && Object.keys(utmData).length);

/** Real attribution — a source that came from outside the site, not a button on it. */
const hasExternalAttribution = (utmData) => !isInternalUtmSource(utmData?.utm_source);

/**
 * First-touch attribution, kept in the utmdata column.
 *
 * Whatever utm_* the visitor arrived with is stored the first time any is seen —
 * a lone utm_medium counts, since not every campaign sets all five. After that it
 * is held: later internal navigation carries no utm at all and must never blank
 * it, and a page that tags itself (home-A and the like) must never take the credit
 * from the ad that actually brought them. The one thing that may still replace it
 * is genuine outside attribution arriving where only an internal tag was held.
 */
const resolveFirstUtm = (current, incoming) => {
    if (!hasAnyUtm(incoming)) return current;
    if (!hasAnyUtm(current)) return incoming;
    if (!hasExternalAttribution(current) && hasExternalAttribution(incoming)) return incoming;

    return current;
};

/**
 * Reads a stored row back into the profile this file works with.
 *
 * A row written by an earlier version of the tracker has no counters, only the
 * one page it recorded, so it is converted into a profile worth exactly the one
 * view it represents. That way an existing visitor keeps their history instead of
 * restarting at zero.
 */
export const readProfile = (row) => {
    const stored = parseJson(row?.name);

    // click_data and page_data have columns of their own, so they are read back
    // from there rather than kept a second time inside `name`.
    const histories = {
        clicks: parseJsonArray(row?.click_data),
        pages: parseJsonArray(row?.page_data),
        sessionId: row?.session_id || '',
        // first_url and last_url are deliberately absent: they are linked-record
        // columns this code cannot write, so they are always null and reading them
        // back would wipe the urls that `name` is keeping.
        lastAction: row?.last_action || '',
        lastActionAt: row?.last_action_at || '',
        lastVisitAt: row?.last_visit_at || '',
    };

    if (stored.profileVersion === PROFILE_VERSION) {
        return {
            ...stored,
            ...histories,
            // Rows written before the homepage counters existed: seed them from
            // whether the homepage has been seen at all, and treat the session
            // already on the row as the one that was counted, so the visitor's
            // current session is not mistaken for a return.
            homeSessions: stored.homeSessions ?? (toInt(stored.views?.home) ? 1 : 0),
            homeSessionId: stored.homeSessionId ?? histories.sessionId,
            // Rows written before the timestamp existed: the last counted view is
            // the closest thing to when their homepage session was counted, which
            // is enough for the idle guard to work from their next visit onwards.
            homeSessionAt: stored.homeSessionAt ?? stored.lastViewAt ?? '',
        };
    }

    const path = getPagePath(stored.pageUrl);

    return {
        ...histories,
        // A row from before the interaction columns existed has no session history,
        // so the visit it records is counted as the one session it was.
        sessions: Math.max(1, toInt(row?.revisit_count) + 1),
        // A legacy row records one page; it counts as a homepage session only if
        // that page was the homepage.
        homeSessions: isHomePath(path) ? 1 : 0,
        homeSessionId: row?.session_id || '',
        homeSessionAt: isHomePath(path) ? row?.timestamp || row?.createdat || '' : '',
        clickCount: histories.clicks.length,
        pageEventCount: histories.pages.length,
        firstUrl: stored.pageUrl || '',
        lastUrl: stored.pageUrl || '',
        referrer: '',
        signupClicks: { count: 0 },
        loginClicks: { count: 0 },
        profileVersion: PROFILE_VERSION,
        visitorId: stored.visitorId || '',
        firstSeen: row?.timestamp || row?.createdat || '',
        lastSeen: row?.timestamp || row?.createdat || '',
        firstPageUrl: stored.pageUrl || '',
        lastPageUrl: stored.pageUrl || '',
        firstVariant: row?.varient || '',
        device: stored.device || {},
        screen: stored.screen || {},
        browser: stored.browser || {},
        ipAddress: stored.ipAddress || '',
        views: { total: 1, home: isHomePath(path) ? 1 : 0 },
        pageViews: path ? { [path]: 1 } : {},
        variantViews: row?.varient ? { [row.varient]: 1 } : {},
        cta: { count: 0, bySource: {} },
        signupViews: isSignupPath(path) ? 1 : 0,
        firstUtm: parseJson(row?.utmdata),
        lastUtm: parseJson(row?.utmdata),
        lastViewKey: getPageKey(stored.pageUrl),
        lastViewAt: row?.timestamp || row?.createdat || '',
        mergedRows: [],
    };
};

/**
 * Whether this request is a genuine view or a duplicate of the one just recorded.
 * A reload counts; the same page arriving twice within the dedupe window does not.
 */
export const shouldCountView = (profile, pageKey, now) => {
    if (!pageKey || profile?.lastViewKey !== pageKey) return true;

    const last = Date.parse(profile?.lastViewAt || '');
    if (!Number.isFinite(last)) return true;

    return now.getTime() - last >= VIEW_DEDUPE_WINDOW_MS;
};

/**
 * Whether this view begins a homepage visit that has not been counted yet.
 *
 * A visitor's first homepage view always counts; after that a view only counts
 * when it belongs to a session that has not been counted and the last counted one
 * is at least the idle window old. The session id alone is not enough to ask: a
 * visitor whose site data is blocked — private browsing, or an extension that
 * clears it — is handed a fresh id on every load, and without the clock every
 * reload would read as a return visit. The clock alone is not enough either, since
 * it would count a visitor who simply stayed on the page for half an hour, so both
 * have to agree.
 *
 * This is what keeps view_count at 1 for the life of a visitor and makes every
 * later visit a revisit.
 */
export const startsHomeSession = (profile, { path, sessionId, nowIso }) => {
    if (!isHomePath(path)) return false;

    // The session this row was last counted for is still running.
    if (sessionId && sessionId === profile?.homeSessionId) return false;

    // Never seen the homepage: this is the first visit, whatever the clock says.
    if (!toInt(profile?.homeSessions)) return true;

    const last = Date.parse(profile?.homeSessionAt || '');

    // A row written before this timestamp existed has only the id to go on.
    if (!Number.isFinite(last)) return true;

    return Date.parse(nowIso) - last >= SESSION_IDLE_MS;
};

const emptyProfile = (visitorId, nowIso) => ({
    profileVersion: PROFILE_VERSION,
    visitorId,
    firstSeen: nowIso,
    lastSeen: nowIso,
    firstPageUrl: '',
    lastPageUrl: '',
    firstVariant: '',
    device: {},
    screen: {},
    browser: {},
    ipAddress: '',
    views: { total: 0, home: 0 },
    pageViews: {},
    variantViews: {},
    cta: { count: 0, bySource: {} },
    signupViews: 0,
    firstUtm: {},
    lastUtm: {},
    lastViewKey: '',
    lastViewAt: '',
    mergedRows: [],
    // Interaction history and the scalars the dedicated columns mirror.
    clicks: [],
    pages: [],
    clickCount: 0,
    pageEventCount: 0,
    sessions: 0,
    sessionId: '',
    // The homepage counters are counted in visits, not page views: how many
    // sessions this visitor has looked at the homepage in, and which session the
    // last of those was, so a second look inside the same session adds nothing.
    homeSessions: 0,
    homeSessionId: '',
    // When the last homepage session was counted, so a fresh session id cannot
    // claim a return visit that the clock says has not happened.
    homeSessionAt: '',
    firstUrl: '',
    lastUrl: '',
    referrer: '',
    lastAction: '',
    lastActionAt: '',
    lastVisitAt: '',
    signupClicks: { count: 0 },
    loginClicks: { count: 0 },
});

/**
 * Folds a duplicate row for the same visitor into their profile.
 *
 * Rows cannot be removed through the table API, so a duplicate is emptied and
 * pointed at the surviving row instead — but only after what it recorded has been
 * added here, so collapsing the history never loses a view.
 */
export const absorbRow = (profile, row) => {
    const absorbed = readProfile(row);
    const utm = parseJson(row?.utmdata);

    const merged = {
        ...profile,
        views: {
            total: toInt(profile.views?.total) + toInt(absorbed.views?.total),
            home: toInt(profile.views?.home) + toInt(absorbed.views?.home),
        },
        pageViews: addCounters(profile.pageViews, absorbed.pageViews),
        variantViews: addCounters(profile.variantViews, absorbed.variantViews),
        signupViews: toInt(profile.signupViews) + toInt(absorbed.signupViews),
        cta: {
            ...profile.cta,
            count: toInt(profile.cta?.count) + toInt(absorbed.cta?.count),
            bySource: addCounters(profile.cta?.bySource, absorbed.cta?.bySource),
            firstAt: profile.cta?.firstAt || absorbed.cta?.firstAt,
            lastAt: profile.cta?.lastAt || absorbed.cta?.lastAt,
            lastSource: profile.cta?.lastSource || absorbed.cta?.lastSource || '',
        },
        mergedRows: [...(profile.mergedRows || []), row?.rowid].filter(Boolean),
        // Collapsing two rows must not cost the visitor any of their journey, so
        // the two histories are interleaved by time rather than one replacing the
        // other.
        clicks: mergeHistories(profile.clicks, absorbed.clicks, MAX_CLICK_EVENTS),
        pages: mergeHistories(profile.pages, absorbed.pages, MAX_PAGE_EVENTS),
        clickCount: toInt(profile.clickCount) + toInt(absorbed.clickCount),
        pageEventCount: toInt(profile.pageEventCount) + toInt(absorbed.pageEventCount),
        sessions: toInt(profile.sessions) + toInt(absorbed.sessions),
        homeSessions: toInt(profile.homeSessions) + toInt(absorbed.homeSessions),
        homeSessionId: profile.homeSessionId || absorbed.homeSessionId || '',
        // The later of the two: taking the earlier one would let the next view slip
        // past the idle guard and count a visit that never happened.
        homeSessionAt: [profile.homeSessionAt, absorbed.homeSessionAt].filter(Boolean).sort().pop() || '',
        signupClicks: {
            count: toInt(profile.signupClicks?.count) + toInt(absorbed.signupClicks?.count),
            firstAt: profile.signupClicks?.firstAt || absorbed.signupClicks?.firstAt || '',
            lastAt: profile.signupClicks?.lastAt || absorbed.signupClicks?.lastAt || '',
            last: profile.signupClicks?.last || absorbed.signupClicks?.last || null,
        },
        loginClicks: {
            count: toInt(profile.loginClicks?.count) + toInt(absorbed.loginClicks?.count),
            firstAt: profile.loginClicks?.firstAt || absorbed.loginClicks?.firstAt || '',
            lastAt: profile.loginClicks?.lastAt || absorbed.loginClicks?.lastAt || '',
        },
        firstUrl: profile.firstUrl || absorbed.firstUrl || '',
        lastUrl: profile.lastUrl || absorbed.lastUrl || '',
        referrer: profile.referrer || absorbed.referrer || '',
    };

    // The absorbed row may be the one that carried the attribution.
    merged.firstUtm = resolveFirstUtm(merged.firstUtm, utm);

    return merged;
};

/** The columns that turn a duplicate row into a pointer at the surviving one. */
export const mergedRowFields = (visitorId, survivingRowId) => ({
    name: JSON.stringify({ visitorId, mergedInto: survivingRowId, profileVersion: PROFILE_VERSION }),
    view_count: 0,
});

/**
 * The visitor's profile after one event is applied.
 *
 * `counted` decides whether the event moves the counters; an uncounted view still
 * refreshes the details that are simply the latest known values, because a
 * duplicate request is not a reason to hold on to a staler device or IP.
 */
export const applyEvent = (profile, event) => {
    const { type, pageUrl, pageKey, path, variant, userInfo, utmData, ctaSource, ipAddress, nowIso, counted } = event;
    const { sessionId, isNewSession, referrer } = event;

    const next = {
        ...profile,
        visitorId: profile.visitorId || event.visitorId,
        lastSeen: nowIso,
        lastPageUrl: pageUrl || profile.lastPageUrl,
        firstPageUrl: profile.firstPageUrl || pageUrl || '',
        firstVariant: profile.firstVariant || variant,
        device: userInfo?.device || profile.device,
        screen: userInfo?.screen || profile.screen,
        browser: userInfo?.browser || profile.browser,
        ipAddress: ipAddress || profile.ipAddress,
        lastUtm: Object.keys(utmData || {}).length ? utmData : profile.lastUtm,
        sessionId: sessionId || profile.sessionId || '',
        firstUrl: profile.firstUrl || pageUrl || '',
        referrer: profile.referrer || referrer || '',
    };

    next.firstUtm = resolveFirstUtm(next.firstUtm, utmData);

    // view_count and revisit_count describe the homepage alone, in visits rather
    // than page views, so they are decided here — before the page-view dedupe has
    // a say. A visit is a far coarser thing than a page view: the ten seconds that
    // stop a double-fired effect from counting twice must never also swallow a
    // genuine return visit that happens to land on the same url.
    if (type === 'view' && startsHomeSession(profile, { path, sessionId, nowIso })) {
        next.homeSessions = toInt(profile.homeSessions) + 1;
        next.homeSessionId = sessionId;
        next.homeSessionAt = nowIso;
    }

    if (!counted) return next;

    if (type === 'click') return applyClick(next, event);

    if (type === 'cta') {
        next.cta = {
            count: toInt(profile.cta?.count) + 1,
            bySource: bump(profile.cta?.bySource, ctaSource || 'unknown'),
            firstAt: profile.cta?.firstAt || nowIso,
            lastAt: nowIso,
            lastSource: ctaSource || profile.cta?.lastSource || '',
            lastVariant: variant,
        };

        // A hero CTA is both a variant signal and an interaction. It arrives as one
        // request so the press is counted once, and is recorded in both places.
        return event.interaction ? applyClick(next, event) : next;
    }

    next.views = {
        total: toInt(profile.views?.total) + 1,
        home: toInt(profile.views?.home) + (isHomePath(path) ? 1 : 0),
    };
    next.pageViews = bump(profile.pageViews, path);
    next.variantViews = bump(profile.variantViews, variant);
    next.signupViews = toInt(profile.signupViews) + (isSignupPath(path) ? 1 : 0);
    next.lastViewKey = pageKey;
    next.lastViewAt = nowIso;

    if (isNewSession || !toInt(profile.sessions)) {
        next.sessions = toInt(profile.sessions) + 1;
        next.lastVisitAt = nowIso;
    }

    next.pages = appendEvent(
        profile.pages,
        {
            event: 'page_view',
            url: pageUrl || '',
            path,
            timestamp: nowIso,
            user_id: next.visitorId,
            variant,
            utmData: utmData || {},
            referrer: referrer || '',
            session_id: sessionId || '',
        },
        MAX_PAGE_EVENTS
    );
    next.pageEventCount = toInt(profile.pageEventCount) + 1;
    next.lastUrl = pageUrl || profile.lastUrl || '';

    return next;
};

/**
 * The name last_action goes by: the element and what was done to it.
 *
 * A plain press reads as `header_usecases_click`. Where the element's name already
 * ends in the action's verb the verb is not said twice, so a login link named
 * `signup_page_login` reads as `signup_page_login_click` rather than
 * `signup_page_login_login_click`.
 */
const composeAction = (element, action) => {
    if (!element) return action;

    const verb = action.replace(/_click$/, '');
    if (verb && element.endsWith(`_${verb}`)) return `${element}_click`;

    return `${element}_${action}`;
};

/**
 * Records one meaningful interaction.
 *
 * The event is appended to the click history — never written over it — and the
 * three latest-action columns are refreshed from it. A signup or login press is
 * counted separately, because the two must not be read as each other, and neither
 * is treated as a completed signup: that happens in the MSG91 widget, off this
 * site, where this code cannot see it.
 */
const applyClick = (profile, event) => {
    const { pageUrl, variant, utmData, nowIso, sessionId, referrer, interaction } = event;

    const action = interaction?.action || 'click';
    const element = interaction?.element || '';

    const record = {
        event: action,
        element,
        label: interaction?.label || '',
        section: interaction?.section || '',
        current_url: pageUrl || '',
        destination_url: interaction?.destinationUrl || '',
        timestamp: nowIso,
        user_id: profile.visitorId,
        variant,
        utmData: utmData || {},
        session_id: sessionId || '',
        ...(referrer ? { referrer } : {}),
    };

    const next = {
        ...profile,
        clicks: appendEvent(profile.clicks, record, MAX_CLICK_EVENTS),
        clickCount: toInt(profile.clickCount) + 1,
        lastAction: composeAction(element, action),
        lastActionAt: nowIso,
        // Where the click is taking them, which is the more useful "latest url"
        // for a journey; a click with nowhere to go leaves it as it was.
        lastUrl: interaction?.destinationUrl || pageUrl || profile.lastUrl || '',
    };

    if (SIGNUP_ACTIONS.has(action)) {
        next.signupClicks = {
            count: toInt(profile.signupClicks?.count) + 1,
            firstAt: profile.signupClicks?.firstAt || nowIso,
            lastAt: nowIso,
            last: record,
        };
    }

    if (LOGIN_ACTIONS.has(action)) {
        next.loginClicks = {
            count: toInt(profile.loginClicks?.count) + 1,
            firstAt: profile.loginClicks?.firstAt || nowIso,
            lastAt: nowIso,
            last: record,
        };
    }

    return next;
};

/**
 * What the `signup` column should hold.
 *
 * Signup itself is completed by the MSG91 widget, off this site, so what can be
 * observed here is the intent: reaching /signup, how often, and which button sent
 * them. Left null until that happens so the column reads as "has not started".
 */
const buildSignup = (profile) => {
    const clicks = toInt(profile.signupClicks?.count);
    const pageViews = toInt(profile.signupViews);

    if (!clicks && !pageViews) return null;

    return JSON.stringify({
        // Intent, not completion: pressing signup and reaching /signup are both
        // observable here, finishing the signup is not.
        signup_clicks: {
            count: clicks,
            first_at: profile.signupClicks?.firstAt || '',
            last_at: profile.signupClicks?.lastAt || '',
            last: profile.signupClicks?.last || null,
        },
        signup_page_views: {
            count: pageViews,
            last_at: pageViews ? profile.lastSeen : '',
        },
        login_clicks: {
            count: toInt(profile.loginClicks?.count),
            last_at: profile.loginClicks?.lastAt || '',
        },
        variant: profile.firstVariant || '',
        last_source: profile.cta?.lastSource || profile.lastUtm?.utm_source || '',
    });
};

/**
 * Columns this table stores as linked records rather than as text.
 *
 * They hold a reference to a row elsewhere, so a plain URL is rejected with a
 * foreign-key error that fails the whole write — not just that column. The URLs
 * they were meant to carry are kept in `name` as firstPageUrl / lastPageUrl and on
 * every event in page_data, so leaving them out loses nothing. Emptying this list
 * is all it takes to start writing them, once the columns are plain text.
 */
const LINKED_RECORD_COLUMNS = ['first_url', 'last_url'];

/**
 * The full column set for a visitor's row, used for both the insert and the update
 * so the two paths can never drift apart.
 *
 * `variant` and `utmdata` are deliberately first-touch: the variant a visitor was
 * originally served is what the test measures, and the source they originally
 * arrived from is what attribution means. Everything that is a running total or a
 * latest-known value lives in `name`.
 */
export const toRowFields = (profile, { environment, nowIso }) => {
    const fields = {
        // These are the table's own column names, read back off the table rather than
        // assumed: there is no `user_info` column (it is `name`) and no `variant`
        // column (it is `varient`). Correcting either spelling here makes the table
        // reject the entire write.
        name: JSON.stringify(stripHistories(profile)),
        user_id: profile.visitorId || '',
        varient: profile.firstVariant || '',
        // Set once, by the first homepage session, and never moved again.
        view_count: toInt(profile.homeSessions) ? 1 : 0,
        // Every later session the homepage was seen in.
        revisit_count: Math.max(0, toInt(profile.homeSessions) - 1),
        environment,
        utmdata: JSON.stringify(profile.firstUtm || {}),
        signup: buildSignup(profile),
        timestamp: nowIso,
        click_data: JSON.stringify(profile.clicks || []),
        page_data: JSON.stringify(profile.pages || []),
        last_action: profile.lastAction || '',
        last_action_at: profile.lastActionAt || '',
        first_url: profile.firstUrl || profile.firstPageUrl || '',
        last_url: profile.lastUrl || profile.lastPageUrl || '',
        session_id: profile.sessionId || '',
        last_visit_at: profile.lastVisitAt || '',
    };

    LINKED_RECORD_COLUMNS.forEach((column) => delete fields[column]);

    return fields;
};

// The histories live in click_data and page_data, so they are left out of `name`
// rather than stored a second time — one copy to read, one copy to keep in step.
const stripHistories = ({ clicks, pages, ...summary }) => summary;

export const newProfile = (visitorId, nowIso) => emptyProfile(visitorId, nowIso);
