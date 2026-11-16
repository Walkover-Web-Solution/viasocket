/**
 * True when the Accept header prefers text/markdown over text/html for content negotiation.
 */
export function prefersTextMarkdown(acceptHeader) {
    if (!acceptHeader || typeof acceptHeader !== 'string') return false;

    let bestMarkdown = 0;
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
        if (type === 'text/markdown' || type === 'text/x-markdown') {
            bestMarkdown = Math.max(bestMarkdown, q);
        } else if (type === 'text/html') {
            bestHtml = Math.max(bestHtml, q);
        } else if (type === '*/*') {
            bestMarkdown = Math.max(bestMarkdown, q);
            bestHtml = Math.max(bestHtml, q);
        }
    }

    if (bestMarkdown <= 0) return false;
    if (bestHtml <= 0) return true;
    return bestMarkdown >= bestHtml;
}