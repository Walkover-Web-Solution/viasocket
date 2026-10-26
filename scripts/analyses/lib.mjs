// Shared helpers for the deterministic analyses. Node 20+, no dependencies.

export const UA = 'viasocket-website-analyses/1 (+docs/ops/README.md)';

// Paths on viasocket.com served by other deployments (docs/05-navigation.md). Locally they 404,
// so they are only checked when BASE_URL is production.
export const OTHER_DEPLOYMENTS = [/^\/blog(\/|$)/, /^\/help(\/|$)/, /^\/discovery(\/|$)/, /^\/community(\/|$)/, /^\/faq(\/|$)/, /^\/cdn-cgi\//];

export class Budget {
    constructor(max) {
        this.max = max;
        this.used = 0;
    }
    take() {
        if (this.used >= this.max) throw new BudgetError(`request budget of ${this.max} reached`);
        this.used += 1;
    }
}
export class BudgetError extends Error {}

export function makeFetch(budget, timeoutMs) {
    return async function get(url, { method = 'GET', redirect = 'manual', headers = {} } = {}) {
        budget.take();
        const res = await fetch(url, { method, redirect, headers: { 'user-agent': UA, ...headers }, signal: AbortSignal.timeout(timeoutMs) });
        const body = method === 'HEAD' ? '' : await res.text();
        return { status: res.status, headers: res.headers, body, url };
    };
}

export const attr = (tag, name) => {
    const m = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i').exec(tag);
    return m ? m[2] ?? m[3] : null;
};

export function metaTags(html) {
    return [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
}

export function headInfo(html) {
    const title = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html) || [])[1]?.replace(/\s+/g, ' ').trim() || null;
    const metas = metaTags(html);
    const metaBy = (n) => {
        const t = metas.find((m) => (attr(m, 'name') || attr(m, 'property') || '').toLowerCase() === n);
        return t ? attr(t, 'content') : null;
    };
    const canonTag = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((t) => (attr(t, 'rel') || '').toLowerCase() === 'canonical');
    return {
        title: title ? decode(title) : null,
        description: metaBy('description') ? decode(metaBy('description')) : null,
        robots: metaBy('robots'),
        canonical: canonTag ? attr(canonTag, 'href') : null,
        h1Count: (html.match(/<h1\b/gi) || []).length,
    };
}

export const decode = (s) =>
    String(s)
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&#x27;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ');

export function hrefs(html) {
    return [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*("([^"]*)"|'([^']*)')/gi)].map((m) => decode(m[2] ?? m[3]));
}

/** Map a link to a path on BASE_URL when it points at this site (relative or viasocket.com). */
export function internalPath(href, base) {
    if (!href || href.startsWith('#') || /^(mailto|tel|javascript):/i.test(href)) return null;
    try {
        const u = new URL(href, base);
        const b = new URL(base);
        if (u.host === b.host || u.host === 'viasocket.com') return u.pathname + u.search;
    } catch {
        return null;
    }
    return null;
}

export function visibleText(html) {
    return decode(
        String(html)
            .replace(/<script[\s\S]*?<\/script>/gi, ' ')
            .replace(/<style[\s\S]*?<\/style>/gi, ' ')
            .replace(/<[^>]+>/g, ' ')
    )
        .replace(/\s+/g, ' ')
        .trim();
}

export const isProdBase = (base) => new URL(base).host === 'viasocket.com';
