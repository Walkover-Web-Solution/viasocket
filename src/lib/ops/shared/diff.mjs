// Line diff (LCS) used for knowledge history views. Inputs are doc-sized (a few hundred
// lines); above MAX_CELLS the diff degrades to "whole file replaced" rather than burning CPU
// on the edge.

const MAX_CELLS = 4_000_000;

export function lineDiff(oldText, newText) {
    const a = String(oldText ?? '').split('\n');
    const b = String(newText ?? '').split('\n');
    let start = 0;
    while (start < a.length && start < b.length && a[start] === b[start]) start += 1;
    let endA = a.length;
    let endB = b.length;
    while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
        endA -= 1;
        endB -= 1;
    }
    const midA = a.slice(start, endA);
    const midB = b.slice(start, endB);
    const ops = [];
    for (let i = 0; i < start; i += 1) ops.push({ op: ' ', line: a[i] });
    if (midA.length * midB.length > MAX_CELLS) {
        midA.forEach((line) => ops.push({ op: '-', line }));
        midB.forEach((line) => ops.push({ op: '+', line }));
    } else {
        const n = midA.length;
        const m = midB.length;
        const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
        for (let i = n - 1; i >= 0; i -= 1) {
            for (let j = m - 1; j >= 0; j -= 1) {
                dp[i][j] = midA[i] === midB[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
            }
        }
        let i = 0;
        let j = 0;
        while (i < n && j < m) {
            if (midA[i] === midB[j]) {
                ops.push({ op: ' ', line: midA[i] });
                i += 1;
                j += 1;
            } else if (dp[i + 1][j] >= dp[i][j + 1]) {
                ops.push({ op: '-', line: midA[i] });
                i += 1;
            } else {
                ops.push({ op: '+', line: midB[j] });
                j += 1;
            }
        }
        while (i < n) ops.push({ op: '-', line: midA[i++] });
        while (j < m) ops.push({ op: '+', line: midB[j++] });
    }
    for (let i = endA; i < a.length; i += 1) ops.push({ op: ' ', line: a[i] });
    return ops;
}

/** Collapses unchanged runs to `context` lines around each change. */
export function hunks(ops, context = 3) {
    const keep = new Array(ops.length).fill(false);
    ops.forEach((o, i) => {
        if (o.op !== ' ') for (let k = Math.max(0, i - context); k <= Math.min(ops.length - 1, i + context); k += 1) keep[k] = true;
    });
    const out = [];
    let gap = false;
    ops.forEach((o, i) => {
        if (keep[i]) {
            out.push(o);
            gap = false;
        } else if (!gap) {
            out.push({ op: '…', line: '' });
            gap = true;
        }
    });
    return out;
}

export const diffStats = (ops) => ({
    added: ops.filter((o) => o.op === '+').length,
    removed: ops.filter((o) => o.op === '-').length,
});
