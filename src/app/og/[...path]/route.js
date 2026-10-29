import { ImageResponse } from 'next/og';

// /og/{path}: the share image (og:image, twitter:image) for the page at /{path}, for pages with no image of
// their own (app/lib/share-image.js). It is that page's hero drawn at 1200x630 in the dark theme: the
// viaSocket logo, the page's breadcrumb, its <h1> and the line under it. Those are read from the page
// itself, so the image always matches it: the breadcrumb from nav[aria-label="Breadcrumb"], the line from
// the hero's .hero-sub paragraph, else the page's meta description. No dot grid: the renderer can't draw it.

export const runtime = 'edge';
const size = { width: 1200, height: 630 };

// The dark theme's tokens (addToProduct.module.scss .root)
const BG = '#0b0b0c';
const INK = '#f1efe9';
const INK_2 = '#a9a7a1';
const INK_3 = '#85837d';

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', ndash: '–', mdash: '—', hellip: '…' };
const decode = (s) =>
    s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) =>
        e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : (ENTITIES[e.toLowerCase()] ?? m)
    );
/** An HTML fragment as one line of plain text. */
const text = (html) => (html ? decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim() : '');
const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/** The page's breadcrumb, heading and the line under it, from its HTML. */
function heroOf(html) {
    const h1 = text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]);
    // Each link and the current page in the breadcrumb, without "Home" or a last item that repeats the heading
    const nav = html.match(/<nav[^>]*aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/i)?.[1] || '';
    const crumbs = [...nav.matchAll(/<a[^>]*>([\s\S]*?)<\/a>|<[a-z]+[^>]*aria-current="page"[^>]*>([\s\S]*?)<\/[a-z]+>/gi)]
        .map((m) => text(m[1] ?? m[2]))
        .filter((c, i, all) => c && c.toLowerCase() !== 'home' && !(i === all.length - 1 && c === h1))
        .map((c) => clip(c, 40));
    const sub =
        text(html.match(/<p[^>]*class="[^"]*hero-sub[^"]*"[^>]*>([\s\S]*?)<\/p>/i)?.[1]) ||
        decode(html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || '');
    const title = text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]).replace(/\s*[|·–-]\s*viaSocket\s*$/i, '');
    return { crumbs, h1: h1 || title, sub };
}

// (Each new URL(..., import.meta.url) is written out in full so the bundler includes the file.)
const buf = (res) => res.arrayBuffer();

export async function GET(request, { params }) {
    const { path = [] } = await params;
    const page = new URL(`/${path.map(encodeURIComponent).join('/')}`, request.url);

    let hero = { crumbs: [], h1: '', sub: '' };
    try {
        // Not following redirects: a page that redirects (even to another site) has no hero of its own
        const res = await fetch(page, { headers: { accept: 'text/html' }, redirect: 'manual', signal: AbortSignal.timeout(8000) });
        if (res.status === 200) hero = heroOf(await res.text());
    } catch {
        // drawn with the default heading below
    }
    const h1 = clip(hero.h1 || 'Integration Layer for your products & agents', 110);
    const sub = clip(hero.sub, 210);

    const [semibold, regular, logo] = await Promise.all([
        fetch(new URL('../../../../node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf', import.meta.url)).then(buf),
        fetch(new URL('../../../../node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf', import.meta.url)).then(buf),
        fetch(new URL('../../../../public/new-home/assets/logo-light.svg', import.meta.url)).then(buf),
    ]);
    const logoSrc = `data:image/svg+xml;base64,${btoa(String.fromCharCode(...new Uint8Array(logo)))}`;

    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: BG, fontFamily: 'Geist' }}>
                <img src={logoSrc} width={170} height={50} style={{ objectFit: 'contain', objectPosition: 'left' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {hero.crumbs.length > 0 && (
                        <div style={{ display: 'flex', fontSize: 26, color: INK_3, marginBottom: 22 }}>
                            {hero.crumbs.map((c, i) => (
                                <span key={i} style={{ display: 'flex', color: i === hero.crumbs.length - 1 ? INK : INK_3 }}>
                                    {i > 0 && <span style={{ margin: '0 14px', color: INK_3 }}>›</span>}
                                    {c}
                                </span>
                            ))}
                        </div>
                    )}
                    <div style={{ display: 'flex', fontSize: h1.length > 70 ? 54 : 64, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.08, color: INK, maxWidth: 1000 }}>{h1}</div>
                    {sub && <div style={{ display: 'flex', fontSize: 27, lineHeight: 1.45, color: INK_2, marginTop: 26, maxWidth: 960 }}>{sub}</div>}
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                { name: 'Geist', data: semibold, weight: 600, style: 'normal' },
                { name: 'Geist', data: regular, weight: 400, style: 'normal' },
            ],
            headers: { 'cache-control': 'public, max-age=86400, s-maxage=604800' },
        }
    );
}
