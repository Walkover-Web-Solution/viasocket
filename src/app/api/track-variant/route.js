import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { VARIANTS, VARIANT_COOKIE, VISITOR_ID_COOKIE } from '@/const/abTest';
import { getAbTestVisitorRows, saveAbTestVisit, updateAbTestVisit } from '@/utils/axiosCalls';
import {
    CLICK_DEDUPE_WINDOW_MS,
    MAX_MERGES_PER_REQUEST,
    absorbRow,
    applyEvent,
    getPageKey,
    getPagePath,
    mergedRowFields,
    newProfile,
    readProfile,
    shouldCountView,
    toRowFields,
} from '@/utils/abTestVisitor';

export const runtime = 'edge';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const EVENT_TYPES = ['view', 'cta', 'click'];

// What a click may say about itself. Anything else the browser sends is dropped
// rather than written, and the label is capped so a stray blob of page text
// cannot end up in the row.
const MAX_LABEL_LENGTH = 120;
const ELEMENT_PATTERN = /^[a-z0-9_]{1,64}$/;
const ACTION_PATTERN = /^[a-z0-9_]{1,40}$/;

const trim = (value, limit) => (typeof value === 'string' ? value.trim().slice(0, limit) : '');

/**
 * The part of a click event the browser is allowed to decide.
 *
 * Identifiers are the names this site gives its own elements, so they are held to
 * that shape; free text is trimmed. Returns null when there is no usable element
 * to record, which is what makes an unrecognised click a no-op rather than a row
 * full of junk.
 */
const readInteraction = (body) => {
    const element = trim(body?.element, 64).toLowerCase();
    if (!ELEMENT_PATTERN.test(element)) return null;

    const action = trim(body?.action, 40).toLowerCase();

    return {
        element,
        action: ACTION_PATTERN.test(action) ? action : 'click',
        label: trim(body?.label, MAX_LABEL_LENGTH),
        section: trim(body?.section, 40).toLowerCase(),
        destinationUrl: trim(body?.destinationUrl, 500),
    };
};

// Two reports of the same element this close together are one press arriving
// twice. Different elements are always kept, however fast they come.
const isDuplicateClick = (profile, interaction, now) => {
    const last = (profile.clicks || [])[(profile.clicks || []).length - 1];
    if (!last || last.element !== interaction.element || last.event !== interaction.action) return false;

    const at = Date.parse(last.timestamp || '');
    return Number.isFinite(at) && now.getTime() - at < CLICK_DEDUPE_WINDOW_MS;
};

// x-forwarded-for is a comma separated chain; the first entry is the client.
const getClientIp = (request) =>
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    '';

/**
 * Which of the three deployments this visit came from.
 *
 * NEXT_PUBLIC_PRODUCTION_ENVIRONMENT is the flag the rest of the site already
 * branches on, so it wins; the hostname is only a fallback for a deployment
 * where the variable was never set.
 */
const getEnvironment = (request) => {
    const flag = (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT || '').toLowerCase();
    if (flag === 'prod' || flag === 'production') return 'production';
    if (flag === 'test' || flag === 'stage' || flag === 'staging') return 'test';
    if (flag === 'local' || flag === 'development' || flag === 'dev') return 'local';

    const hostname = new URL(request.url).hostname;
    if (hostname === 'viasocket.com' || hostname.endsWith('.viasocket.com')) return 'production';
    if (hostname === 'localhost' || /^[\d.]+$/.test(hostname)) return 'local';
    return 'test';
};

// Rows for a visitor that are already collapsed into another row are pointers, not
// history, so they are ignored when picking the row to write to.
const isLiveRow = (row) => {
    try {
        return !JSON.parse(row?.name || '{}')?.mergedInto;
    } catch {
        return true;
    }
};

/**
 * Records one event against the single row this visitor owns.
 *
 * The browser sends what only it knows (device, screen, utm, page, which button
 * was pressed); the visitor id, variant, IP and environment are resolved here,
 * where they can be trusted. A visitor gets exactly one row: the first event
 * inserts it, and every event after that updates the counters in place, so
 * closing the tab and coming back later raises the view count instead of adding
 * a row. Always answers 200 — the client never reads the response, and a tracking
 * failure must not surface as a page error.
 */
export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const visitorId = cookieStore.get(VISITOR_ID_COOKIE)?.value;
        const variant = cookieStore.get(VARIANT_COOKIE)?.value;

        if (!UUID_REGEX.test(visitorId || '') || !VARIANTS.includes(variant)) {
            return NextResponse.json({ success: false, reason: 'missing tracking cookies' });
        }

        const body = await request.json();
        const { userInfo, pageUrl, utmData, ctaSource, sessionId, isNewSession, referrer } = body;
        const type = EVENT_TYPES.includes(body?.event) ? body.event : 'view';

        // A hero CTA carries an interaction alongside its variant signal; a plain
        // click is nothing but one.
        const interaction = type === 'view' ? null : readInteraction(body);

        // A click that names nothing recognisable is not worth a write.
        if (type === 'click' && !interaction) {
            return NextResponse.json({ success: false, reason: 'unrecognised interaction' });
        }

        const now = new Date();
        const nowIso = now.toISOString();
        const environment = getEnvironment(request);

        const rows = await getAbTestVisitorRows(visitorId, pageUrl);

        // A failed lookup is not an empty history. Inserting here is exactly how a
        // visitor ends up with two rows, so the event is dropped instead — the next
        // one will carry the same counters forward.
        if (rows === null) {
            return NextResponse.json({ success: false, reason: 'lookup failed' });
        }

        const liveRows = rows.filter(isLiveRow);
        const [canonical, ...duplicates] = liveRows;

        const event = {
            type,
            visitorId,
            variant,
            pageUrl: pageUrl || '',
            pageKey: getPageKey(pageUrl),
            path: getPagePath(pageUrl),
            userInfo,
            utmData: utmData || {},
            ctaSource,
            ipAddress: getClientIp(request),
            nowIso,
            interaction,
            sessionId: typeof sessionId === 'string' ? sessionId.slice(0, 64) : '',
            isNewSession: Boolean(isNewSession),
            referrer: typeof referrer === 'string' ? referrer.slice(0, 500) : '',
        };

        if (canonical) {
            let profile = readProfile(canonical);

            // Rows this visitor collected before the table held one row each, or
            // from two tabs racing, are folded into the row that survives and then
            // emptied — the table has no delete, so a duplicate is turned into a
            // pointer at the surviving row rather than removed.
            const toMerge = duplicates.slice(0, MAX_MERGES_PER_REQUEST);
            toMerge.forEach((row) => {
                profile = absorbRow(profile, row);
            });

            const counted =
                type === 'click'
                    ? !isDuplicateClick(profile, interaction, now)
                    : type === 'cta' || shouldCountView(profile, event.pageKey, now);

            // A duplicate event with nothing to collapse has nothing to write: the
            // counters do not move, and the details it carries cannot have changed
            // in the seconds since the event it repeats.
            if (!counted && !toMerge.length) {
                return NextResponse.json({
                    success: true,
                    created: false,
                    counted: false,
                    merged: 0,
                    viewCount: profile.views?.total ?? 0,
                });
            }

            profile = applyEvent(profile, { ...event, counted });

            const updated = await updateAbTestVisit(
                canonical.rowid,
                toRowFields(profile, { environment: canonical.environment || environment, nowIso }),
                pageUrl
            );

            // Only after the surviving row holds their views, so a failure here
            // never loses them.
            if (updated) {
                await Promise.all(
                    toMerge.map((row) =>
                        updateAbTestVisit(row.rowid, mergedRowFields(visitorId, canonical.rowid), pageUrl)
                    )
                );
            }

            return NextResponse.json({
                success: Boolean(updated),
                created: false,
                counted,
                merged: updated ? toMerge.length : 0,
                viewCount: profile.views?.total ?? 0,
            });
        }

        const profile = applyEvent(newProfile(visitorId, nowIso), { ...event, counted: true });

        const saved = await saveAbTestVisit(toRowFields(profile, { environment, nowIso }), pageUrl);

        // Two first-ever events can be in flight at once — a second tab, a retry —
        // and both would insert. Re-reading settles it: every racer sees the same
        // oldest row and folds the rest into it, so the visitor is left with one.
        if (saved) await collapseDuplicates(visitorId, pageUrl);

        return NextResponse.json({
            success: Boolean(saved),
            created: Boolean(saved),
            counted: true,
            viewCount: profile.views?.total ?? 0,
        });
    } catch (error) {
        console.error('[variant tracking] failed:', error);
        return NextResponse.json({ success: false });
    }
}

/**
 * Leaves the visitor with one row after a race.
 *
 * Both racers run this and both pick the oldest row, because the rows come back
 * ordered by autonumber — so they agree on which row survives and the result is
 * the same however many times it runs.
 */
async function collapseDuplicates(visitorId, pageUrl) {
    const rows = await getAbTestVisitorRows(visitorId, pageUrl);
    if (!rows) return;

    const liveRows = rows.filter(isLiveRow);
    if (liveRows.length < 2) return;

    const [canonical, ...duplicates] = liveRows;
    let profile = readProfile(canonical);

    const toMerge = duplicates.slice(0, MAX_MERGES_PER_REQUEST);
    toMerge.forEach((row) => {
        profile = absorbRow(profile, row);
    });

    const updated = await updateAbTestVisit(
        canonical.rowid,
        toRowFields(profile, { environment: canonical.environment || 'production', nowIso: profile.lastSeen }),
        pageUrl
    );

    if (!updated) return;

    await Promise.all(
        toMerge.map((row) => updateAbTestVisit(row.rowid, mergedRowFields(visitorId, canonical.rowid), pageUrl))
    );
}
