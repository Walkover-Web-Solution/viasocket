/* Homepage A/B split. Loaded by public/new-home/index.html (version A) and
   public/home-b/index.html (version B). Untranspiled ES5, same as TrackingCookies.

   The CDN caches one copy of "/", so the coin flip cannot happen on the server.
   This script assigns the variant cookie before the body paints and, for B,
   navigates to /home-b. Bots stay on A. The cookie is the same `variant` cookie
   the rest of the site already uses (src/const/abTest.js), on .viasocket.com,
   so a return visit and flow.viasocket.com both see it. */
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

    function assignVariant() {
        var current = readCookie('variant');
        if (VARIANTS.indexOf(current) === -1) {
            var mirrored = '';
            try {
                mirrored = localStorage.getItem(VARIANT_KEY) || '';
            } catch (e) {}
            current = VARIANTS.indexOf(mirrored) !== -1 ? mirrored : VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
            writeCookie('variant', current, VARIANT_MAX_AGE);
        }
        try {
            localStorage.setItem(VARIANT_KEY, current);
        } catch (e2) {}
        return current;
    }

    function go(url) {
        document.documentElement.style.visibility = 'hidden';
        location.replace(url);
    }

    function boot() {
        var path = pathName();
        var onHome = path === '/' || path === '/home-b';
        if (!onHome) return null;

        var bot = BOT.test(navigator.userAgent || '');
        if (bot) {
            if (path === '/home-b') go('/' + location.search + location.hash);
            return null;
        }

        ensureVisitorId();
        var variant = assignVariant();
        var tail = location.search + location.hash;

        if (path === '/' && variant === 'B') {
            go('/home-b' + tail);
            return null;
        }
        if (path === '/home-b' && variant !== 'B') {
            go('/' + tail);
            return null;
        }
        return variant;
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

    function stamp(variant) {
        var links = document.querySelectorAll('a[href*="flow.viasocket.com"]');
        for (var i = 0; i < links.length; i++) {
            try {
                var url = new URL(links[i].getAttribute('href'), location.origin);
                url.searchParams.set('hp_variant', variant);
                links[i].href = url.toString();
            } catch (e) {}
        }
    }

    function bind(variant) {
        document.addEventListener('click', function (event) {
            var node = event.target;
            if (node && node.nodeType === 3) node = node.parentNode;
            var link = node && node.closest ? node.closest('a') : null;
            if (!link || !link.href || link.href.indexOf('flow.viasocket.com') === -1) return;
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

    window.addEventListener('pageshow', function (event) {
        try {
            var path = pathName();
            if (path !== '/' && path !== '/home-b') return;
            var shown = readCookie('variant');
            var onB = path === '/home-b';
            var wantsB = shown === 'B';
            if (onB === wantsB) {
                document.documentElement.style.visibility = '';
                return;
            }
            // Back/forward can restore the other version from the cache, still
            // hidden from the redirect that left it. Send them to their version.
            if (event.persisted || document.documentElement.style.visibility === 'hidden') {
                go((wantsB ? '/home-b' : '/') + location.search + location.hash);
            }
        } catch (e) {}
    });

    var variant;
    try {
        variant = boot();
    } catch (e) {
        document.documentElement.style.visibility = '';
        variant = null;
    }
    if (!variant) return;

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { report(variant); });
    else report(variant);
})();
