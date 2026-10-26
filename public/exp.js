/* viaSocket experiment exposure + outcome reporter (ES5, no dependencies).
 * Load on every variant page of an experimented surface: <script src="/exp.js" defer></script>
 * Reads the first-party cookies the middleware set (vs_vid, vs_x_<exp> = "<variant>.<phase>.<surface>")
 * and posts to /api/exp/event:
 *   exposure            once per page view, after the page has rendered
 *   cta_click           any click on a link or button
 *   setup_prompt_copy   a click on a [data-copy] control (the setup-prompt copy button)
 *   signup_start        a click on a Start free / signup link (flow.viasocket.com or /signup);
 *                       vs_exp and vs_vid are appended to that link for the flow app (docs/CONTRACTS.md)
 * Nothing is sent without an assignment cookie for this page's surface. Contract: docs/CONTRACTS.md. */
(function () {
    'use strict';
    if (window.__vsExp) return;
    window.__vsExp = true;

    var SURFACES = { '/': 'home' };
    var surface = SURFACES[location.pathname];
    if (!surface) return;

    function cookies() {
        var out = {};
        var parts = (document.cookie || '').split(';');
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            var k = p.indexOf('=');
            if (k > -1) out[p.slice(0, k).replace(/^\s+|\s+$/g, '')] = decodeURIComponent(p.slice(k + 1));
        }
        return out;
    }

    var c = cookies();
    var vid = c.vs_vid;
    if (!vid || !/^[A-Za-z0-9_-]{16,64}$/.test(vid)) return;

    var assignments = [];
    for (var name in c) {
        if (name.indexOf('vs_x_') !== 0) continue;
        var m = /^([ABC])\.(\d{1,4})\.([a-z0-9-]{1,32})$/.exec(c[name]);
        if (m && m[3] === surface) assignments.push({ exp: name.slice(5), variant: m[1], phase: Number(m[2]) });
    }
    if (!assignments.length) return;

    function rid() {
        var s = '';
        var a = new Uint8Array(9);
        (window.crypto || window.msCrypto).getRandomValues(a);
        for (var i = 0; i < a.length; i++) s += ('0' + a[i].toString(16)).slice(-2);
        return s;
    }
    var pageView = rid();
    var seq = 0;

    function send(a, event, extra) {
        var body = { id: pageView + '-' + event + '-' + (event === 'exposure' ? 'x' : ++seq), exp: a.exp, phase: a.phase, variant: a.variant, vid: vid, event: event, path: location.pathname };
        if (extra) for (var k in extra) body[k] = extra[k];
        var json = JSON.stringify(body);
        try {
            if (navigator.sendBeacon && navigator.sendBeacon('/api/exp/event', new Blob([json], { type: 'application/json' }))) return;
        } catch (e) {}
        try {
            var x = new XMLHttpRequest();
            x.open('POST', '/api/exp/event', true);
            x.setRequestHeader('content-type', 'application/json');
            x.send(json);
        } catch (e) {}
    }

    function each(event, extra) {
        for (var i = 0; i < assignments.length; i++) send(assignments[i], event, extra);
    }

    var exposed = false;
    function expose() {
        if (exposed || document.visibilityState === 'hidden') return;
        exposed = true;
        each('exposure');
    }
    function afterRender() {
        if (window.requestAnimationFrame) window.requestAnimationFrame(function () { setTimeout(expose, 0); });
        else setTimeout(expose, 0);
    }
    if (document.readyState === 'complete') afterRender();
    else window.addEventListener('load', afterRender);
    document.addEventListener('visibilitychange', function () {
        if (!exposed && document.visibilityState === 'visible') afterRender();
    });

    function closest(el, test) {
        while (el && el.nodeType === 1) {
            if (test(el)) return el;
            el = el.parentNode;
        }
        return null;
    }
    function isSignup(href) {
        return /^https:\/\/flow\.viasocket\.com\//.test(href) || /^\/signup(\?|$)/.test(href) || /viasocket\.com\/signup(\?|$)/.test(href);
    }

    document.addEventListener(
        'click',
        function (e) {
            var copy = closest(e.target, function (el) { return el.hasAttribute && el.hasAttribute('data-copy'); });
            if (copy) {
                each('setup_prompt_copy');
                return;
            }
            var a = closest(e.target, function (el) { return el.tagName === 'A' || el.tagName === 'BUTTON'; });
            if (!a) return;
            var href = a.tagName === 'A' ? a.getAttribute('href') || '' : '';
            if (href && isSignup(href)) {
                each('signup_start');
                try {
                    var u = new URL(a.href, location.href);
                    var tags = [];
                    for (var i = 0; i < assignments.length; i++) tags.push(assignments[i].exp + '.' + assignments[i].variant + '.' + assignments[i].phase);
                    u.searchParams.set('vs_exp', tags.join(','));
                    u.searchParams.set('vs_vid', vid);
                    a.href = u.toString();
                } catch (err) {}
            } else {
                each('cta_click');
            }
        },
        true
    );
})();
