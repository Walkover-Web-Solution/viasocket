/**
 * True when the Accept header prefers a JSON family type over text/html.
 */
export function prefersApplicationJson(acceptHeader) {
    if (!acceptHeader || typeof acceptHeader !== 'string') return false;

    let bestJson = 0;
    let bestHtml = 0;

    for (const part of acceptHeader.split(',')) {
        const pieces = part.trim().split(';').map((s) => s.trim());
        const type = (pieces[0] || '').toLowerCase();
        let q = 1;
        for (let i = 1; i < pieces.length; i += 1) {
            if (pieces[i].startsWith('q=')) {
                const parsed = Number.parseFloat(pieces[i].slice(2));
                if (Number.isFinite(parsed)) q = parsed;
            }
        }
        if (type === 'application/json' || type === 'application/problem+json') {
            bestJson = Math.max(bestJson, q);
        } else if (type === 'text/html') {
            bestHtml = Math.max(bestHtml, q);
        } else if (type === '*/*') {
            bestJson = Math.max(bestJson, q);
            bestHtml = Math.max(bestHtml, q);
        }
    }

    if (bestJson <= 0) return false;
    if (bestHtml <= 0) return true;
    return bestJson >= bestHtml;
}