#!/usr/bin/env node
// `npm run ops:hash-password -- --email you@viasocket.com --role owner`
// Prompts for a password (not echoed) or reads it from stdin when piped, and prints an
// OPS_USERS entry with a PBKDF2-SHA256 hash (100,000 iterations, the Cloudflare Workers cap).
// The password itself is never printed or written anywhere.

import readline from 'node:readline';
import { hashPassword } from '../../src/lib/ops/shared/crypto.mjs';

const arg = (name) => {
    const i = process.argv.indexOf(`--${name}`);
    return i > -1 ? process.argv[i + 1] : undefined;
};

async function readPassword() {
    if (!process.stdin.isTTY) {
        const chunks = [];
        for await (const c of process.stdin) chunks.push(c);
        return Buffer.concat(chunks).toString('utf8').replace(/\r?\n$/, '');
    }
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => {
        if (s.includes('Password')) process.stdout.write(s);
    };
    const pw = await new Promise((resolve) => rl.question('Password: ', resolve));
    rl.close();
    process.stdout.write('\n');
    return pw;
}

const password = await readPassword();
if (!password || password.length < 12) {
    console.error('Use a password of at least 12 characters.');
    process.exit(1);
}
const hash = await hashPassword(password);
const email = arg('email');
const role = arg('role') || 'viewer';
if (!['viewer', 'editor', 'owner'].includes(role)) {
    console.error('--role must be viewer, editor or owner');
    process.exit(1);
}
if (email) console.log(JSON.stringify({ email, role, password_hash: hash }));
else console.log(hash);
