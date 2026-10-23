// A small YAML-frontmatter reader for the knowledge docs. It handles what the docs use:
// `key: value`, `key: [a, "b"]`, `key:` followed by `- item` lines, quoted strings.
// Anything richer is kept as the raw string. No dependency, edge-safe.

export const KNOWLEDGE_FIELDS = ['status', 'owner', 'sources', 'verified_on', 'verified_at', 'version'];

const unquote = (s) => {
    const t = s.trim();
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return t.slice(1, -1);
    return t;
};

function parseValue(raw) {
    const v = raw.trim();
    if (v.startsWith('[') && v.endsWith(']')) {
        const inner = v.slice(1, -1).trim();
        if (!inner) return [];
        return inner.split(/,(?=(?:[^"']|"[^"]*"|'[^']*')*$)/).map((x) => unquote(x)).filter((x) => x !== '');
    }
    return unquote(v);
}

export function parseFrontmatter(text) {
    const src = String(text || '');
    const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
    if (!m) return { data: {}, body: src, hasFrontmatter: false };
    const data = {};
    let listKey = null;
    for (const line of m[1].split(/\r?\n/)) {
        if (!line.trim() || line.trim().startsWith('#')) continue;
        const item = /^\s+-\s+(.*)$/.exec(line) || /^-\s+(.*)$/.exec(line);
        if (item && listKey) {
            data[listKey].push(unquote(item[1]));
            continue;
        }
        const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
        if (!kv) continue;
        if (kv[2] === '') {
            listKey = kv[1];
            data[listKey] = [];
        } else {
            listKey = null;
            data[kv[1]] = parseValue(kv[2]);
        }
    }
    return { data, body: src.slice(m[0].length), hasFrontmatter: true };
}

export function daysSince(dateStr, now = Date.now()) {
    const t = Date.parse(String(dateStr || ''));
    return Number.isFinite(t) ? Math.floor((now - t) / 86400000) : null;
}
