/* Homepage A/B split. Loaded by public/new-home/index.html (version A) and
   public/home-b/index.html (version B). Untranspiled ES5, same as TrackingCookies.

   Middleware already chose the document and the address bar stays "/". This
   script does not navigate. It writes the variant cookie for the page that was
   served, because a cache in front of the origin can strip the Set-Cookie
   header (ADR-007). Bots are not counted. The cookie is the same `variant`
   cookie the rest of the site already uses (src/const/abTest.js). */
(function () {
    'use strict';

    var VARIANTS = ['A', 'B'];
    var VARIANT_MAX_AGE = 60 * 60 * 24 * 30;
    var VISITOR_MAX_AGE = 60 * 60 * 24 * 365;
    var VARIANT_KEY = 'vs_variant';
    var VISITOR_KEY = 'vs_visitor';
    var SESSION_KEY = 'vs_session';
    var SESSION_IDLE_MS = 30 * 60 * 1000;
    var UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    // Same self-declared crawler test as src/utils/isBot.js. A match stays on A
    // and is not counted. Headless shells are included on purpose.
    var BOT = /bot|crawl|spider|slurp|facebookexternalhit|meta-externalagent|bingpreview|embedly|quora link preview|whatsapp|telegrambot|discordbot|slackbot|linkedinbot|pinterest|redditbot|applebot|petalbot|yandex|baiduspider|duckduckbot|headlesschrome|phantomjs|puppeteer|playwright|selenium|lighthouse|chrome-lighthouse|gtmetrix|pingdom|uptimerobot|python-requests|python-urllib|go-http-client|java\/|okhttp|axios\/|node-fetch|got\/|curl\/|wget\/|libwww-perl|httpclient|scrapy|ahrefs|semrush|mj12bot|dotbot|screaming frog|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|anthropic-ai|perplexitybot|ccbot|bytespider|amazonbot|google-extended/i;

    var hpOff = false;

    function pathName() {
        var path = location.pathname || '/';
        if (path.length > 1 && path.charAt(path.length - 1) === '/') path = path.slice(0, -1);
        return path || '/';
    }

    function cookieDomain() {
        var host = location.hostname;
        if (host === 'viasocket.com' || /\.viasocket\.com$/.test(host)) return ';domain=.viasocket.com';
        return '';
    }

    function readCookie(name) {
        var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? match[1] : '';
    }

    function writeCookie(name, value, maxAge) {
        var secure = location.protocol === 'https:' ? ';secure' : '';
        // Same shape as TrackingCookies: the value is an A/B letter or a UUID, neither of which needs encoding.
        document.cookie = name + '=' + value + ';path=/;max-age=' + maxAge + ';samesite=lax' + cookieDomain() + secure;
    }

    function storeGet(key) {
        try {
            return JSON.parse(localStorage.getItem(key) || 'null');
        } catch (e) {
            return null;
        }
    }

    function storeSet(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {}
    }

    function newVisitorId() {
        try {
            if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
        } catch (e) {}
        var bytes = new Uint8Array(16);
        try {
            crypto.getRandomValues(bytes);
        } catch (e2) {
            for (var i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
        }
        bytes[6] = (bytes[6] & 15) | 64;
        bytes[8] = (bytes[8] & 63) | 128;
        var hex = '';
        for (var j = 0; j < 16; j++) hex += ('0' + bytes[j].toString(16)).slice(-2);
        return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20);
    }

    function ensureVisitorId() {
        var current = readCookie('visitor_id');
        if (UUID.test(current)) {
            if (storeGet(VISITOR_KEY) !== current) storeSet(VISITOR_KEY, current);
            return current;
        }
        var mirrored = storeGet(VISITOR_KEY);
        var id = UUID.test(mirrored) ? mirrored : newVisitorId();
        writeCookie('visitor_id', id, VISITOR_MAX_AGE);
        storeSet(VISITOR_KEY, id);
        return id;
    }

    // The served file is the version. A missing mark is version A, which is also
    // what an export of public/new-home looks like if it drops the attribute.
    function renderedVariant() {
        var mark = document.documentElement.getAttribute('data-hp');
        return mark === 'B' ? 'B' : 'A';
    }

    // ?variant=a|b is a checking tool on test and local only. Production ignores it.
    function queryVariant() {
        var host = location.hostname;
        if (host !== 'test.viasocket.com' && host !== 'localhost' && host !== '127.0.0.1') return '';
        try {
            var raw = (new URLSearchParams(location.search).get('variant') || '').trim().toLowerCase();
            return raw === 'a' || raw === 'b' ? raw.toUpperCase() : '';
        } catch (e) {
            return '';
        }
    }

    function boot() {
        var path = pathName();
        if (path !== '/' && path !== '/home-b') return null;
        if (BOT.test(navigator.userAgent || '')) return null;

        ensureVisitorId();
        var forced = queryVariant();
        var current = forced || readCookie('variant');
        // The edge set this on the response. When that header was stripped, the
        // page that arrived is the assignment, and document.cookie is what
        // reaches the browser. A valid cookie is left alone, so one cached
        // document cannot overwrite the visitor's version.
        if (VARIANTS.indexOf(current) === -1) current = renderedVariant();
        if (forced || readCookie('variant') !== current) writeCookie('variant', current, VARIANT_MAX_AGE);
        try {
            localStorage.setItem(VARIANT_KEY, current);
        } catch (e) {}
        return current;
    }

    function utmData() {
        var data = {};
        var params;
        try {
            params = new URLSearchParams(location.search);
        } catch (e) {
            return data;
        }
        params.forEach(function (value, key) {
            if (key.toLowerCase().indexOf('utm_') === 0) data[key.toLowerCase()] = value;
        });
        return data;
    }

    function touchSession(refreshOnly) {
        var now = Date.now();
        var stored = storeGet(SESSION_KEY);
        var live = stored && stored.id && typeof stored.at === 'number' && now - stored.at < SESSION_IDLE_MS;
        if (refreshOnly) {
            if (!live) return '';
            storeSet(SESSION_KEY, { id: stored.id, at: now });
            return stored.id;
        }
        var session = { id: live ? stored.id : newVisitorId(), at: now };
        storeSet(SESSION_KEY, session);
        return { sessionId: session.id, isNewSession: !live };
    }

    function collect() {
        var ua = navigator.userAgent || '';
        var os = 'unknown';
        if (/Windows NT/.test(ua)) os = 'Windows';
        else if (/Android/.test(ua)) os = 'Android';
        else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
        else if (/Mac OS X|Macintosh/.test(ua)) os = 'macOS';
        else if (/Linux/.test(ua)) os = 'Linux';
        var type = 'desktop';
        if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)) type = 'tablet';
        else if (/Mobi|iPhone|iPod|Android|Windows Phone|BlackBerry/i.test(ua)) type = 'mobile';
        return {
            device: { type: type, os: os, platform: navigator.platform || '' },
            screen: {
                width: window.screen ? window.screen.width : null,
                height: window.screen ? window.screen.height : null,
                viewportWidth: window.innerWidth,
                viewportHeight: window.innerHeight,
                pixelRatio: window.devicePixelRatio || null,
            },
            browser: { language: navigator.language || '', cookiesEnabled: navigator.cookieEnabled },
        };
    }

    function send(payload, beacon) {
        if (hpOff) return;
        try {
            var body = JSON.stringify(payload);
            if (beacon && navigator.sendBeacon && navigator.sendBeacon('/api/track-variant', new Blob([body], { type: 'application/json' }))) {
                return;
            }
            fetch('/api/track-variant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body,
                keepalive: true,
                credentials: 'same-origin',
            }).catch(function () {
                hpOff = true;
            });
        } catch (e) {
            hpOff = true;
        }
    }

    function authKind(link) {
        var text = (link.textContent || '').replace(/\s+/g, ' ').toLowerCase();
        if (text.indexOf('log in') !== -1 || text.indexOf('login') !== -1) return 'login';
        if (text.indexOf('start free') !== -1 || text.indexOf('sign up') !== -1 || text.indexOf('signup') !== -1) return 'signup';
        return '';
    }

    function sectionOf(link) {
        if (link.closest && (link.closest('footer') || link.closest('.f-legal'))) return 'footer';
        if (link.closest && (link.closest('aside') || link.closest('header') || link.closest('.mbar'))) return 'header';
        return 'hero';
    }

    function linkText(link) {
        return (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    }

    function samePage(href) {
        if (!href || href.charAt(0) === '#') return true;
        try {
            var url = new URL(href, location.href);
            return url.origin === location.origin && url.pathname === location.pathname && url.search === location.search;
        } catch (e) {
            return true;
        }
    }

    function isFlowHost(url) {
        return url.hostname === 'flow.viasocket.com';
    }

    function isSignupPath(url) {
        var path = url.pathname || '/';
        if (path.length > 1 && path.charAt(path.length - 1) === '/') path = path.slice(0, -1);
        return url.origin === location.origin && path === '/signup';
    }

    // Version tags go on calls to action that open another page. Anchors and
    // copy buttons stay as they are. Other query parameters are left in place.
    function isVersionCta(link, url) {
        if (link.hasAttribute && link.hasAttribute('data-copy')) return false;
        if (samePage(link.getAttribute('href'))) return false;
        var text = linkText(link);
        if (text.indexOf('start free') !== -1) return true;
        if (text.indexOf('log in') !== -1 || text.indexOf('login') !== -1) return true;
        if (text.indexOf('sign up') !== -1 || text.indexOf('signup') !== -1) return true;
        if (text.indexOf('talk to an expert') !== -1) return true;
        if (text.indexOf('book a demo') !== -1) return true;
        if (link.tagName === 'A' && text.indexOf('setup prompt') !== -1) return true;
        var inBar = link.closest && (link.closest('nav') || link.closest('header') || link.closest('aside') || link.closest('.mbar') || link.closest('footer'));
        if (inBar && (isFlowHost(url) || isSignupPath(url))) return true;
        if (link.tagName === 'A' && link.closest && (link.closest('.ctas') || link.closest('.vt-f-alt'))) return true;
        return false;
    }

    function stampLink(link, variant) {
        var raw = link.getAttribute('href');
        if (!raw || raw.charAt(0) === '#') return;
        var url;
        try {
            url = new URL(raw, location.origin);
        } catch (e) {
            return;
        }
        var changed = false;
        if (isFlowHost(url)) {
            url.searchParams.set('hp_variant', variant);
            changed = true;
        }
        if (isVersionCta(link, url)) {
            url.searchParams.set('utm_source', variant === 'B' ? 'b' : 'a');
            changed = true;
        }
        if (changed) link.href = url.toString();
    }

    function stamp(variant) {
        var links = document.querySelectorAll('a[href]');
        for (var i = 0; i < links.length; i++) stampLink(links[i], variant);
    }

    function bind(variant) {
        document.addEventListener('click', function (event) {
            var node = event.target;
            if (node && node.nodeType === 3) node = node.parentNode;
            var link = node && node.closest ? node.closest('a') : null;
            if (!link) return;
            stampLink(link, variant);
            if (!link.href || link.href.indexOf('flow.viasocket.com') === -1) {
                var signup = false;
                try {
                    signup = isSignupPath(new URL(link.href));
                } catch (e) {}
                if (!signup) return;
            }
            var kind = authKind(link);
            if (!kind) return;
            var session = touchSession(true);
            send(
                {
                    event: 'click',
                    element: kind === 'login' ? 'log_in' : 'start_free',
                    action: kind === 'login' ? 'login_click' : 'signup_click',
                    label: (link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120),
                    section: sectionOf(link),
                    destinationUrl: link.href,
                    pageUrl: location.href,
                    utmData: utmData(),
                    referrer: document.referrer || '',
                    sessionId: session,
                    userInfo: collect(),
                },
                true
            );
        });
    }

    function report(variant) {
        stamp(variant);
        var session = touchSession(false);
        send(
            {
                event: 'view',
                pageUrl: location.href,
                utmData: utmData(),
                referrer: document.referrer || '',
                userInfo: collect(),
                sessionId: session.sessionId,
                isNewSession: session.isNewSession,
            },
            false
        );
        bind(variant);
    }

    var variant;
    try {
        variant = boot();
    } catch (e) {
        variant = null;
    }
    if (!variant) return;

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { report(variant); });
    else report(variant);
})();
