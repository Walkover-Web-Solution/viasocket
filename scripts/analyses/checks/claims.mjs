// Claim consistency across key pages: app-count variants and positioning phrases, compared with
// the claim register in docs/POSITIONING.md when that file exists.
import fs from 'node:fs';
import path from 'node:path';
import { KEY_PAGES } from '../../../src/lib/ops/shared/analyses-registry.mjs';
import { visibleText } from '../lib.mjs';

const COUNT_RE = /(\d{1,2},\d{3}|\d{3,5})\s*\+\s*(?:apps?|integrations?|app integrations|tools)/gi;
const PHRASES = ['integration layer', 'workflow automation', 'action layer', 'automate workflows', 'embedded ipaas', 'unified api'];

function register(repoRoot) {
    const f = path.join(repoRoot, 'docs/POSITIONING.md');
    if (!fs.existsSync(f)) return null;
    const text = fs.readFileSync(f, 'utf8');
    // Approved counts: every "N+" written in the register section if there is one, else the whole file.
    const sec = /#+\s*claim register[\s\S]*?(?=\n#{1,2}\s|$)/i.exec(text)?.[0] || text;
    const counts = [...new Set([...sec.matchAll(/(\d{1,2},\d{3}|\d{3,5})\s*\+/g)].map((m) => m[1].replace(/,/g, '')))];
    return { counts, hasSection: sec !== text };
}

export default async function claims({ base, get, repoRoot }) {
    const findings = [];
    const reg = register(repoRoot);
    const counts = {}; // value → [{page, text}]
    const phrases = Object.fromEntries(PHRASES.map((p) => [p, []]));
    const pages = [];
    for (const p of KEY_PAGES) {
        const r = await get(new URL(p, base).href);
        pages.push({ path: p, status: r.status });
        if (r.status !== 200) continue;
        const text = visibleText(r.body);
        for (const m of text.matchAll(COUNT_RE)) {
            const v = m[1].replace(/,/g, '');
            (counts[v] ||= []).push({ page: p, text: text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 20) });
        }
        const lower = text.toLowerCase();
        for (const ph of PHRASES) {
            const n = lower.split(ph).length - 1;
            if (n) phrases[ph].push({ page: p, count: n });
        }
    }
    const values = Object.keys(counts);
    if (values.length > 1) {
        findings.push({ severity: 'medium', title: `Pages state ${values.length} different app counts: ${values.map((v) => `${Number(v).toLocaleString('en-US')}+`).join(', ')}`, evidence: Object.fromEntries(values.map((v) => [v, [...new Set(counts[v].map((c) => c.page))]])) });
    }
    if (reg) {
        for (const v of values) {
            if (!reg.counts.includes(v)) findings.push({ severity: 'medium', title: `App count ${Number(v).toLocaleString('en-US')}+ is not in the claim register`, evidence: { pages: [...new Set(counts[v].map((c) => c.page))], sample: counts[v][0].text, register: reg.counts } });
        }
    }
    if (phrases['workflow automation'].length && phrases['integration layer'].length) {
        findings.push({ severity: 'low', title: 'Both "workflow automation" and "integration layer" appear across key pages', evidence: { 'workflow automation': phrases['workflow automation'], 'integration layer': phrases['integration layer'] } });
    }
    return {
        status: pages.some((p) => p.status === 200) ? 'succeeded' : 'failed',
        results: { pages, appCounts: Object.fromEntries(values.map((v) => [v, counts[v]])), phrases, register: reg },
        findings,
        notes: reg ? (reg.hasSection ? null : 'docs/POSITIONING.md has no "Claim register" heading; every N+ number in the file was treated as approved.') : 'docs/POSITIONING.md not found: only cross-page consistency was checked.',
    };
}
