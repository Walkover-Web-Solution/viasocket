import { VARIANT_COOKIE, VARIANTS, VARIANT_MAX_AGE, VISITOR_ID_COOKIE, VISITOR_ID_MAX_AGE } from '@/const/abTest';

/**
 * Writes the tracking cookies from the browser, before the page paints.
 *
 * These used to be set by middleware, but every HTML response passes through
 * Cloudflare, which caches pages and strips their Set-Cookie header — so most
 * visitors never received either cookie and /api/track-variant rejected their
 * events. document.cookie cannot be stripped by anything in front of the origin,
 * and an inline script runs before React, so the cookies exist by the time the
 * first tracking call leaves the page.
 *
 * Shared by the root layout (fills in whatever is missing) and the homepage
 * (records the variant it actually rendered). Kept to ES5 because it ships
 * untranspiled.
 */
const buildScript = (renderedVariant) => `(function () {
    try {
        var variants = ${JSON.stringify(VARIANTS)};
        var rendered = ${JSON.stringify(renderedVariant || '')};
        var host = location.hostname;
        var domain = host === 'viasocket.com' || /\\.viasocket\\.com$/.test(host) ? ';domain=.viasocket.com' : '';
        var secure = location.protocol === 'https:' ? ';secure' : '';
        var uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        var get = function (name) {
            var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
            return match ? match[1] : '';
        };
        var set = function (name, value, maxAge) {
            document.cookie = name + '=' + value + ';path=/;max-age=' + maxAge + ';samesite=lax' + domain + secure;
        };
        var newId = function () {
            if (crypto.randomUUID) return crypto.randomUUID();
            var b = crypto.getRandomValues(new Uint8Array(16));
            b[6] = (b[6] & 15) | 64;
            b[8] = (b[8] & 63) | 128;
            var h = '';
            for (var i = 0; i < 16; i++) h += (b[i] + 256).toString(16).slice(1);
            return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
        };

        // The homepage passes the variant it rendered: that is what this visitor
        // saw, so it is what gets recorded. Anywhere else a missing or unknown
        // variant is assigned here, and the homepage renders it on their next visit.
        var variant = get('${VARIANT_COOKIE}');
        if (variants.indexOf(rendered) !== -1) {
            if (variant !== rendered) set('${VARIANT_COOKIE}', rendered, ${VARIANT_MAX_AGE});
        } else if (variants.indexOf(variant) === -1) {
            set('${VARIANT_COOKIE}', variants[Math.floor(Math.random() * variants.length)], ${VARIANT_MAX_AGE});
        }

        // A lost cookie is restored from the localStorage mirror trackVisitor keeps,
        // so a returning visitor stays the same row; only a genuinely new visitor
        // is issued a fresh id.
        if (!uuid.test(get('${VISITOR_ID_COOKIE}'))) {
            var mirrored = '';
            try {
                mirrored = JSON.parse(localStorage.getItem('vs_visitor') || 'null') || '';
            } catch (e) {}
            set('${VISITOR_ID_COOKIE}', uuid.test(mirrored) ? mirrored : newId(), ${VISITOR_ID_MAX_AGE});
        }
    } catch (e) {
        // Tracking must never break the page.
    }
})();`;

export default function TrackingCookies({ renderedVariant }) {
    return <script dangerouslySetInnerHTML={{ __html: buildScript(renderedVariant) }} />;
}
