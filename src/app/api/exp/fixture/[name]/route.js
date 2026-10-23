import { fixturesEnabled } from '@/lib/ops/config';

export const runtime = 'edge';

// Dev-only experiment fixtures (OPS_EXPERIMENTS_FIXTURES=true and never on production): 404
// everywhere else. Both are built at request time from the real static homepage, so nothing is
// copied into public/ and nothing ships as a page.
//   home-a  the current homepage (/new-home/index.html) plus /exp.js — what the homepage looks
//           like once the viasocket-site export adds the snippet (docs/ops/README.md blocker)
//   home-b  the same page with a different H1 and a visible "fixture" ribbon: a stand-in
//           challenger for exercising assignment, exposure and outcomes with synthetic traffic

const RIBBON =
    '<div style="position:fixed;left:12px;bottom:12px;z-index:2147483647;background:#111113;color:#fff;font:500 12px/1.4 ui-monospace,Menlo,monospace;padding:6px 10px">Experiment fixture B — dev only</div>';
const H1_B = '<h1 id="h1"><span class="h1-l">Add integrations</span> <span class="h1-l">to your app or</span> <span class="h1-l rot"><em data-rot>AI agent.</em></span></h1>';

export async function GET(request, { params }) {
    const { name } = await params;
    if (!fixturesEnabled() || !['home-a', 'home-b'].includes(name)) return new Response('Not found', { status: 404 });
    const res = await fetch(new URL('/new-home/index.html', request.url), { cache: 'no-store' });
    if (!res.ok) return new Response(`Baseline unavailable (HTTP ${res.status})`, { status: 502 });
    let html = await res.text();
    // No noindex here: a variant is served on the surface URL itself, so a noindex in its HTML
    // would de-index "/". The page keeps the original canonical (https://viasocket.com/).
    if (name === 'home-b') {
        html = html.replace(/<h1 id="h1">[\s\S]*?<\/h1>/, H1_B);
        html = html.replace('</body>', `${RIBBON}\n</body>`);
    }
    html = html.replace('</body>', '<script src="/exp.js" defer></script>\n</body>');
    return new Response(html, {
        headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'private, no-store' },
    });
}
