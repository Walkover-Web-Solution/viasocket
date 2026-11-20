import { ADMIN_URL } from '@/const/admin';

// viaSocket's built-in tools: /tools and /tools/{page}. Managed in the admin panel (Pages → Built-in tools) and read from its public API, kept
// for a minute. A tool with a slug (its plug's appslugname) and a page has its page at /tools/{page},
// which shows that plug; the admin also 301s /integrations/{slug} there. When the admin
// is slow or fails, the page shows FALLBACK, the admin's first list (keep it in step with SEED in
// viasocket-admin/lib/builtinTools.js).
const TIMEOUT_MS = 1500;
const ICON = 'https://stuff.thingsofbrand.com/viasocket.com/images';
// Shown for a tool with no icon.
export const BUILTIN_TOOL_LOGO = `${ICON}/img66f35ee7a7_viasocket.jpg`;

const FALLBACK = [
    ['SMS', null, null, null, 'By country, per message part'],
    ['WhatsApp message', `${ICON}/imge_whatsapp.svg`, 'Send_WhatsApp_Message', 'send-whatsapp-message', 'By country and template type'],
    ['AI agent', null, null, null],
    ['Transcribe audio', `${ICON}/img6_transcribe-audio.svg`, 'speech-to-text', 'transcribe-audio'],
    ['Summarize text', `${ICON}/img4_summarize-text-bg.svg`, 'text_summarizer', 'summarize-text'],
    ['Translate text', `${ICON}/imgb_translate-text.svg`, 'text_translater', 'translate-text'],
    ['Convert to JSON', `${ICON}/imgd_convert-to-json.svg`, 'json_converter', 'convert-to-json'],
    ['Create image from text', `${ICON}/imgf_ai-image-generator.svg`, 'image-generator', 'ai-image-generator'],
    ['Web data extractor', `${ICON}/img4_Data-Extractor-bg.svg`, 'WebScrapingOrCrawling', 'web-scraper'],
    ['GST details', `${ICON}/img2_Fetch-GST-details-bg.svg`, 'giddh_gst', 'gst-lookup', '25 credits per lookup'],
    ['HTML to PDF', `${ICON}/imge_Convert-HTML-To-PDF.svg`, 'pdf_generator', 'html-to-pdf', '5 credits per document'],
    ['Currency converter', `${ICON}/img2_Fetch-GST-details-1.svg`, 'converter', 'currency-converter', '2 credits per conversion'],
].map(([name, icon, slug, page, credits], i) => ({ id: `fallback-${i}`, name, icon: icon || BUILTIN_TOOL_LOGO, slug, page, credits: credits || null }));

const text = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null);
// Only an https image URL; anything else falls back to the viaSocket logo.
const icon = (v) => {
    const u = text(v);
    return u && /^https:\/\//i.test(u) ? u : BUILTIN_TOOL_LOGO;
};
// A plug's appslugname, or null (the tile is then not a link).
const slug = (v) => {
    const s = text(v);
    return s && /^[A-Za-z0-9_-]+$/.test(s) ? s : null;
};

// A /tools/{page} name: lowercase words joined by hyphens.
const page = (v) => {
    const p = text(v);
    return p && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p) ? p : null;
};

/** [{ id, name, icon, slug, page, credits }], from the admin or FALLBACK */
export async function getBuiltinTools() {
    try {
        const res = await fetch(`${ADMIN_URL}/api/public/builtin-tools`, {
            signal: AbortSignal.timeout(TIMEOUT_MS),
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const list = (await res.json())?.tools;
        if (!Array.isArray(list)) throw new Error('no list');
        return list.filter((t) => text(t?.name)).map((t) => ({ id: t.id, name: text(t.name), icon: icon(t.icon), slug: slug(t.slug), page: page(t.page), credits: text(t.credits) }));
    } catch (err) {
        console.error('[builtin-tools] could not read the list:', err.message);
        return FALLBACK;
    }
}
