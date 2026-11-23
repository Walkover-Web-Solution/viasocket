/**
 * Regression checks for homepage CTA attribution stamping (home-ab.js logic).
 */

const CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'li_fat_id', 'ttclid', 'rdt_cid'];

const isAttributionParam = (key) =>
    key.indexOf('utm_') === 0 || key.indexOf('affiliate_') === 0 || key === 'ref' || CLICK_IDS.includes(key);

const pickAttributionFrom = (obj) => {
    const out = {};
    for (const key of Object.keys(obj)) {
        if (isAttributionParam(key)) out[key] = obj[key];
    }
    return out;
};

const landingAttribution = (search) => {
    const out = {};
    new URLSearchParams(search).forEach((value, name) => {
        if (isAttributionParam(name)) out[name] = value;
    });
    return out;
};

const hasAttributionKeys = (obj) => Object.keys(obj).length > 0;

const ctaAttribution = (search, cookie) => {
    const landing = landingAttribution(search);
    if (hasAttributionKeys(landing)) return landing;
    return pickAttributionFrom(cookie);
};

const landingUtmSource = (search) => {
    const landing = landingAttribution(search);
    return landing.utm_source || '/';
};

const stampProductCta = (search, cookie, variant) => {
    const attribution = ctaAttribution(search, cookie);
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(attribution)) params.set(k, v);
    if (!attribution.utm_source) params.set('utm_source', '/');
    params.set('variant', variant);
    params.set('hp_variant', variant);
    return params;
};

const stampThirdPartyCta = (search) => {
    const params = new URLSearchParams();
    params.set('utm_source', landingUtmSource(search));
    return params;
};

const cases = [
    {
        name: 'landing UTMs',
        search: '?utm_source=google&utm_medium=cpc&utm_campaign=x',
        cookie: {},
        variant: 'A',
        want: { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'x', variant: 'A', hp_variant: 'A' },
    },
    {
        name: 'bare / with cookie',
        search: '',
        cookie: { utm_source: 'google', utm_campaign: 'x', prompt: 'secret' },
        variant: 'B',
        want: { utm_source: 'google', utm_campaign: 'x', variant: 'B', hp_variant: 'B' },
    },
    {
        name: 'bare / no cookie',
        search: '',
        cookie: {},
        variant: 'A',
        want: { utm_source: '/', variant: 'A', hp_variant: 'A' },
    },
    {
        name: 'landing beats cookie',
        search: '?utm_medium=cpc',
        cookie: { utm_source: 'google' },
        variant: 'A',
        want: { utm_medium: 'cpc', utm_source: '/', variant: 'A', hp_variant: 'A' },
    },
];

for (const c of cases) {
    const got = stampProductCta(c.search, c.cookie, c.variant);
    for (const [k, v] of Object.entries(c.want)) {
        if (got.get(k) !== v) {
            console.error(`FAIL ${c.name}: ${k} expected ${v}, got ${got.get(k)}`);
            process.exit(1);
        }
    }
    if (got.get('prompt')) {
        console.error(`FAIL ${c.name}: prompt must not appear in link`);
        process.exit(1);
    }
}

{
    const search = '?utm_source=google&utm_medium=cpc&gclid=abc&fbclid=xyz';
    const got = stampThirdPartyCta(search);
    if (got.get('utm_source') !== 'google') {
        console.error(`FAIL third-party cal.id: utm_source expected google, got ${got.get('utm_source')}`);
        process.exit(1);
    }
    for (const key of ['utm_medium', 'gclid', 'fbclid', 'variant', 'hp_variant']) {
        if (got.get(key)) {
            console.error(`FAIL third-party cal.id: ${key} must not appear on non-product CTA links`);
            process.exit(1);
        }
    }
}

console.log('All homepage CTA attribution checks passed.');