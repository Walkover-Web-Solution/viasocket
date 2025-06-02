export async function sendErrorMessage({ error, req }) {
    const extractedError = error?.response?.data ?? error?.message ?? 'Unknown error';

    let pageUrl = 'unknown';

    if (typeof window !== 'undefined') {
        // Client-side
        pageUrl = window.location.href;
    } else if (req?.url && req?.headers?.host) {
        // Server-side
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        pageUrl = `${protocol}://${req.headers.host}${req.url}`;
    }

    try {
        const queryParams = new URLSearchParams({
            error: JSON.stringify(extractedError),
            url: pageUrl,
        });

        const response = await fetch(`https://flow.sokt.io/func/scrixVwRkMy0?${queryParams.toString()}`);

        if (!response.ok) {
            console.error('Failed to send error message:', response.statusText);
        }
    } catch (err) {
        console.error('Error sending error message:', err);
    }
}
