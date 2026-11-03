import { ADMIN_URL } from '@/const/admin';

// The announcement bar above the navbar, managed in the admin panel (Pages → Announcements) and read
// from its public API, kept for a minute. The admin serves only the ones live right now; the navbar
// picks the one for the page (components/navbar/AnnouncementBar.js). null when the admin is slow or
// fails, and the navbar then keeps the banner it has in its own code.
const TIMEOUT_MS = 1500;

const text = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null);
const strings = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []);
// A path on the site or an http(s) URL; anything else (javascript:, //host) is dropped.
const link = (v) => {
    const l = text(v);
    if (!l) return null;
    if (l.startsWith('/') && !l.startsWith('//')) return l;
    return /^https?:\/\//i.test(l) ? l : null;
};

/** [{ id, text, link, newTab, pages, exclude }] or null */
export async function getAnnouncements() {
    try {
        const res = await fetch(`${ADMIN_URL}/api/public/announcements`, {
            signal: AbortSignal.timeout(TIMEOUT_MS),
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const list = (await res.json())?.announcements;
        if (!Array.isArray(list)) throw new Error('no list');
        return list
            .filter((a) => text(a?.text))
            .map((a) => ({
                id: a.id,
                text: text(a.text),
                link: link(a.link),
                newTab: !!a.newTab,
                pages: strings(a.pages),
                exclude: strings(a.exclude),
            }));
    } catch (err) {
        console.error('[announcements] could not read the list:', err.message);
        return null;
    }
}
