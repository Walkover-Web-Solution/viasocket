// Web Crypto helpers shared by the edge runtime (middleware, route handlers) and the Node
// scripts in scripts/ops and scripts/analyses. Only Web-standard APIs: no `node:crypto`,
// no Buffer, so the same file runs on Cloudflare Workers and in Node 20+.

const subtle = () => globalThis.crypto.subtle;
const enc = new TextEncoder();

export function bytesToB64url(bytes) {
    let bin = '';
    const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    for (let i = 0; i < arr.length; i += 1) bin += String.fromCharCode(arr[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function b64urlToBytes(str) {
    const s = String(str).replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(s + '='.repeat((4 - (s.length % 4)) % 4));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
    return out;
}

export const textToB64url = (text) => bytesToB64url(enc.encode(text));
export const b64urlToText = (b64) => new TextDecoder().decode(b64urlToBytes(b64));

export function toHex(bytes) {
    const arr = new Uint8Array(bytes);
    let out = '';
    for (let i = 0; i < arr.length; i += 1) out += arr[i].toString(16).padStart(2, '0');
    return out;
}

export async function sha256Hex(input) {
    const data = typeof input === 'string' ? enc.encode(input) : input;
    return toHex(await subtle().digest('SHA-256', data));
}

export async function sha256Bytes(input) {
    const data = typeof input === 'string' ? enc.encode(input) : input;
    return new Uint8Array(await subtle().digest('SHA-256', data));
}

/** The git blob id of a text file: sha1("blob <bytes>\0<content>"), what `git hash-object` prints. */
export async function gitBlobSha(content) {
    const body = enc.encode(content);
    const header = enc.encode(`blob ${body.length}\0`);
    const all = new Uint8Array(header.length + body.length);
    all.set(header, 0);
    all.set(body, header.length);
    return toHex(await subtle().digest('SHA-1', all));
}

export function randomId(bytes = 16) {
    const arr = new Uint8Array(bytes);
    globalThis.crypto.getRandomValues(arr);
    return bytesToB64url(arr);
}

/** Constant-time comparison of two strings (length leak only). */
export function safeEqual(a, b) {
    const x = String(a ?? '');
    const y = String(b ?? '');
    let diff = x.length ^ y.length;
    const n = Math.max(x.length, y.length);
    for (let i = 0; i < n; i += 1) diff |= (x.charCodeAt(i) || 0) ^ (y.charCodeAt(i) || 0);
    return diff === 0;
}

async function hmacKey(secret) {
    return subtle().importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
}

export async function hmacB64url(secret, message) {
    const sig = await subtle().sign('HMAC', await hmacKey(secret), enc.encode(message));
    return bytesToB64url(sig);
}

// PBKDF2-SHA256. Cloudflare Workers refuse more than 100,000 iterations, so that is the
// ceiling and the default. Format: pbkdf2$<iterations>$<salt b64url>$<hash b64url>
export const PBKDF2_ITERATIONS = 100000;

async function pbkdf2(password, saltBytes, iterations) {
    const key = await subtle().importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await subtle().deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: saltBytes, iterations }, key, 256);
    return new Uint8Array(bits);
}

export async function hashPassword(password, iterations = PBKDF2_ITERATIONS) {
    const salt = new Uint8Array(16);
    globalThis.crypto.getRandomValues(salt);
    const hash = await pbkdf2(password, salt, iterations);
    return `pbkdf2$${iterations}$${bytesToB64url(salt)}$${bytesToB64url(hash)}`;
}

export async function verifyPassword(password, stored) {
    const parts = String(stored || '').split('$');
    if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
    const iterations = Number(parts[1]);
    if (!Number.isInteger(iterations) || iterations < 10000 || iterations > PBKDF2_ITERATIONS) return false;
    const hash = await pbkdf2(String(password), b64urlToBytes(parts[2]), iterations);
    return safeEqual(bytesToB64url(hash), parts[3]);
}
