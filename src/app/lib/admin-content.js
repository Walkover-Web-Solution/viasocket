import { cache } from 'react';
import { ADMIN_URL } from '@/const/admin';

// Page copy for /integrations/{app} written in the admin panel (Programmatic pages), read from its
// public API. Each part is used only when it is there and well-formed; when the admin has nothing
// for the app, is slow, or fails, the page keeps its fixed copy (components/IntegrationsComp/
// addToProduct/copy.js), part by part.
const TIMEOUT_MS = 2000;

const text = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null);
const texts = (v) => (Array.isArray(v) ? v.map(text).filter(Boolean) : []);
const pairs = (v, a, b) =>
    Array.isArray(v) ? v.filter((x) => text(x?.[a]) && text(x?.[b])).map((x) => [text(x[a]), text(x[b])]) : [];

/** { pageTitle, metaDescription, keywords, h1, sub, useCases: [[title, description]], faqs: [[q, a]] } or null */
export const getAdminContent = cache(async (slug) => {
    if (!slug) return null;
    try {
        const res = await fetch(`${ADMIN_URL}/api/public/content/${encodeURIComponent(slug)}`, {
            signal: AbortSignal.timeout(TIMEOUT_MS),
            next: { revalidate: 300 },
        });
        if (!res.ok) return null; // 404: nothing written for this app yet
        const c = (await res.json())?.content;
        if (!c || typeof c !== 'object') return null;
        return {
            pageTitle: text(c.seo?.page_title),
            metaDescription: text(c.seo?.meta_description),
            keywords: [...texts(c.seo?.primary_keywords), ...texts(c.seo?.secondary_keywords)],
            h1: text(c.hero_section?.h1_title),
            sub: text(c.hero_section?.subheadline),
            useCases: pairs(c.use_cases, 'title', 'description'),
            faqs: pairs(c.faqs, 'question', 'answer'),
        };
    } catch (err) {
        console.error(`[admin content] ${slug}: ${err.message}`);
        return null;
    }
});
