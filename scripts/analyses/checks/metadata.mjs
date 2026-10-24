// Title / description presence, length and uniqueness on the key pages (server HTML only).
import { KEY_PAGES } from '../../../src/lib/ops/shared/analyses-registry.mjs';
import { headInfo } from '../lib.mjs';

export default async function metadata({ base, get }) {
    const findings = [];
    const pages = [];
    for (const p of KEY_PAGES) {
        const r = await get(new URL(p, base).href);
        if (r.status !== 200) {
            pages.push({ path: p, status: r.status });
            continue;
        }
        const h = headInfo(r.body);
        pages.push({ path: p, status: r.status, title: h.title, titleLength: h.title?.length || 0, description: h.description, descriptionLength: h.description?.length || 0, h1Count: h.h1Count });
        if (!h.title) findings.push({ severity: 'high', title: `${p} has no <title>`, evidence: { path: p } });
        else if (h.title.length < 30 || h.title.length > 60) findings.push({ severity: 'low', title: `${p} title is ${h.title.length} characters (30–60)`, evidence: { path: p, title: h.title } });
        if (!h.description) findings.push({ severity: 'medium', title: `${p} has no meta description`, evidence: { path: p } });
        else if (h.description.length < 70 || h.description.length > 160) findings.push({ severity: 'low', title: `${p} description is ${h.description.length} characters (70–160)`, evidence: { path: p, description: h.description } });
        if (h.h1Count !== 1) findings.push({ severity: 'low', title: `${p} has ${h.h1Count} <h1> elements in the server HTML`, evidence: { path: p } });
    }
    const byTitle = {};
    for (const pg of pages) if (pg.title) (byTitle[pg.title] ||= []).push(pg.path);
    for (const [title, paths] of Object.entries(byTitle)) if (paths.length > 1) findings.push({ severity: 'medium', title: `Duplicate title on ${paths.join(', ')}`, evidence: { title, paths } });
    return { status: pages.some((p) => p.status === 200) ? 'succeeded' : 'failed', results: { pages }, findings };
}
