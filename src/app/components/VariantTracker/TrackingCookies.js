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
const buildScript = (renderedVariant) => `(function(){try{var variants=${JSON.stringify(VARIANTS)};var rendered=${JSON.stringify(renderedVariant||'')};var host=location.hostname;var domain=host==='viasocket.com'||/\\.viasocket\\.com$/.test(host)?';domain=.viasocket.com':'';var secure=location.protocol==='https:'?';secure':'';var uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;var get=function(n){var m=document.cookie.match(new RegExp('(?:^|; )'+n+'=([^;]*)'));return m?m[1]:''};var set=function(n,v,a){document.cookie=n+'='+v+';path=/;max-age='+a+';samesite=lax'+domain+secure};var newId=function(){if(crypto.randomUUID)return crypto.randomUUID();var b=crypto.getRandomValues(new Uint8Array(16));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;var h='';for(var i=0;i<16;i++)h+=(b[i]+256).toString(16).slice(1);return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20)};var variant=get('${VARIANT_COOKIE}');if(variants.indexOf(rendered)!==-1){if(variant!==rendered)set('${VARIANT_COOKIE}',rendered,${VARIANT_MAX_AGE})}else if(variants.indexOf(variant)===-1){var mirroredVariant='';try{mirroredVariant=localStorage.getItem('vs_variant')||''}catch(e){}var next=variants.indexOf(mirroredVariant)!==-1?mirroredVariant:variants[Math.floor(Math.random()*variants.length)];set('${VARIANT_COOKIE}',next,${VARIANT_MAX_AGE});try{localStorage.setItem('vs_variant',next)}catch(e2){}}try{var currentVariant=get('${VARIANT_COOKIE}');if(variants.indexOf(currentVariant)!==-1)localStorage.setItem('vs_variant',currentVariant)}catch(e3){}if(!uuid.test(get('${VISITOR_ID_COOKIE}'))){var mirrored='';try{mirrored=JSON.parse(localStorage.getItem('vs_visitor')||'null')||''}catch(e){}set('${VISITOR_ID_COOKIE}',uuid.test(mirrored)?mirrored:newId(),${VISITOR_ID_MAX_AGE})}}catch(e){}})();`;

export default function TrackingCookies({ renderedVariant }) {
    return <script dangerouslySetInnerHTML={{ __html: buildScript(renderedVariant) }} />;
}
