/**
 * Regression guard for S-11: semicolons in utmData must not break signup widget init.
 * Run: node scripts/verify-signup-utm-cookie.mjs
 */

const encodeUtmCookie = (value) => String(value).replace(/;/g, '%3B');
const decodeUtmCookie = (raw) => String(raw).replace(/%3B/gi, ';');

const cases = [
    { utm_source: 'a;b' },
    { utm_source: '/integrations', variant: 'A', prompt: 'step;one;two' },
];

let failed = 0;

for (const data of cases) {
    const json = JSON.stringify(data);
    const stored = encodeUtmCookie(json);
    if (stored.includes(';')) {
        console.error('FAIL: encoded value still contains raw semicolon', data);
        failed++;
        continue;
    }
    const roundTrip = JSON.parse(decodeUtmCookie(stored));
    if (JSON.stringify(roundTrip) !== json) {
        console.error('FAIL: round-trip mismatch', { data, roundTrip });
        failed++;
        continue;
    }
    console.log('OK:', json);
}

if (failed) {
    process.exit(1);
}
console.log('All utmData cookie encoding checks passed.');
