/**
 * Runs public/home-ab.js in a minimal browser stub and checks stamped CTA hrefs.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HOME_AB = fs.readFileSync(path.join(__dirname, '../public/home-ab.js'), 'utf8');

const VISITOR = '11111111-1111-4111-8111-111111111111';

function fail(msg) {
    console.error(msg);
    process.exit(1);
}

function parseCookieHeader(header) {
    const jar = {};
    if (!header) return jar;
    for (const part of header.split(';')) {
        const trimmed = part.trim();
        if (!trimmed) continue;
        const eq = trimmed.indexOf('=');
        if (eq === -1) continue;
        jar[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
    }
    return jar;
}

function serializeCookieHeader(jar) {
    return Object.entries(jar)
        .map(([k, v]) => `${k}=${v}`)
        .join('; ');
}

function createLink({ href, text, closest }) {
    let current = href;
    return {
        tagName: 'A',
        get href() {
            return current;
        },
        set href(value) {
            current = value;
        },
        textContent: text,
        getAttribute(name) {
            return name === 'href' ? href : null;
        },
        hasAttribute: () => false,
        closest(selector) {
            return closest ? closest(selector) : null;
        },
    };
}

function runHomeAb({ pathname = '/', search = '', initialCookies = {}, links }) {
    const jar = { variant: 'A', visitor_id: VISITOR, ...initialCookies };
    const storedLinks = links.map((spec) => createLink(spec));
    const storage = new Map();

    const location = new URL(`https://example.test${pathname}${search}`);

    const document = {
        readyState: 'complete',
        referrer: '',
        documentElement: {
            getAttribute(name) {
                return name === 'data-hp' ? 'A' : null;
            },
        },
        querySelectorAll(sel) {
            return sel === 'a[href]' ? storedLinks : [];
        },
        get cookie() {
            return serializeCookieHeader(jar);
        },
        set cookie(value) {
            const parts = value.split(';');
            const pair = parts[0];
            const eq = pair.indexOf('=');
            if (eq === -1) return;
            const name = pair.slice(0, eq).trim();
            const val = pair.slice(eq + 1).trim();
            jar[name] = val;
        },
        addEventListener() {},
    };

    const context = {
        window: {},
        document,
        location,
        navigator: {
            userAgent: 'Mozilla/5.0',
            cookieEnabled: true,
            language: 'en-US',
            platform: 'Linux x86_64',
        },
        localStorage: {
            getItem(key) {
                return storage.has(key) ? storage.get(key) : null;
            },
            setItem(key, value) {
                storage.set(key, value);
            },
        },
        crypto: {
            randomUUID: () => '22222222-2222-4222-8222-222222222222',
            getRandomValues(arr) {
                for (let i = 0; i < arr.length; i++) arr[i] = 1;
            },
        },
        fetch: () => Promise.resolve({ ok: true }),
        URL,
        URLSearchParams,
        Blob: class Blob {},
        console,
        setTimeout,
        clearTimeout,
        Math,
        Date,
        JSON,
        Object,
        RegExp,
        Error,
        Uint8Array,
        parseInt,
        String,
        Array,
    };
    context.window = context;
    context.self = context;
    context.globalThis = context;

    vm.createContext(context);
    vm.runInContext(HOME_AB, context, { filename: 'home-ab.js' });

    return storedLinks.map((link) => link.href);
}

function params(href) {
    return new URL(href).searchParams;
}

function assertParams(href, want, forbid = []) {
    const got = params(href);
    for (const [k, v] of Object.entries(want)) {
        if (got.get(k) !== v) fail(`Expected ${k}=${v} on ${href}, got ${got.get(k)}`);
    }
    for (const k of forbid) {
        if (got.has(k)) fail(`Forbid ${k} on ${href}, got ${got.get(k)}`);
    }
}

{
    const [flowHref, calHref] = runHomeAb({
        search: '?utm_source=google&utm_medium=cpc&utm_campaign=x',
        links: [
            { href: 'https://flow.viasocket.com/integrations', text: 'Start free' },
            { href: 'https://cal.id/team/viasocket/demo', text: 'Book a demo' },
        ],
    });
    assertParams(flowHref, {
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'x',
        variant: 'A',
        hp_variant: 'A',
    });
    assertParams(calHref, { utm_source: 'google' }, ['utm_medium', 'variant', 'hp_variant', 'gclid']);
}

{
    const [flowHref] = runHomeAb({
        search: '',
        initialCookies: { utmData: JSON.stringify({ utm_source: 'google', utm_campaign: 'x' }) },
        links: [{ href: 'https://flow.viasocket.com/integrations', text: 'Start free' }],
    });
    assertParams(flowHref, { utm_source: 'google', utm_campaign: 'x', variant: 'A', hp_variant: 'A' }, ['prompt']);
}

{
    const [flowHref] = runHomeAb({
        search: '',
        links: [{ href: 'https://flow.viasocket.com/integrations', text: 'Start free' }],
    });
    assertParams(flowHref, { utm_source: '/', variant: 'A', hp_variant: 'A' });
}

{
    const [flowHref] = runHomeAb({
        search: '?utm_medium=cpc',
        initialCookies: { utmData: JSON.stringify({ utm_source: 'google' }) },
        links: [{ href: 'https://flow.viasocket.com/integrations', text: 'Start free' }],
    });
    assertParams(flowHref, { utm_medium: 'cpc', utm_source: 'google', variant: 'A', hp_variant: 'A' });
}

{
    const [flowHref] = runHomeAb({
        search: '?gclid=abc',
        initialCookies: { utmData: JSON.stringify({ utm_source: 'google' }) },
        links: [{ href: 'https://flow.viasocket.com/integrations', text: 'Start free' }],
    });
    assertParams(flowHref, { gclid: 'abc', utm_source: 'google', variant: 'A', hp_variant: 'A' });
}

{
    const [signupHref] = runHomeAb({
        search: '?utm_source=google',
        links: [{ href: '/signup', text: 'Sign up' }],
    });
    assertParams(signupHref, { utm_source: 'google', variant: 'A', hp_variant: 'A' });
}

{
    const search = '?utm_source=google&utm_medium=cpc&gclid=abc';
    const [calHref] = runHomeAb({
        search,
        links: [{ href: 'https://cal.id/team/viasocket/demo', text: 'Book a demo' }],
    });
    assertParams(calHref, { utm_source: 'google' }, ['utm_medium', 'gclid', 'variant', 'hp_variant']);
}

console.log('All homepage CTA attribution checks passed.');