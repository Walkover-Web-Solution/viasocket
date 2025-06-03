export async function sendErrorMessage({ error, pageUrl }) {
    const extractedError = error?.response?.data ?? error?.message ?? 'Unknown error';

    if (!pageUrl) {
        if (typeof window !== 'undefined') {
            pageUrl = window.location.href;
        } else {
            pageUrl = 'Unknown';
        }
    }

    try {
        const queryParams = new URLSearchParams({
            error: JSON.stringify(extractedError),
            url: pageUrl,
        });

        if (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod') {
            const response = await fetch(`https://flow.sokt.io/func/scrixVwRkMy0?${queryParams.toString()}`);
            if (!response.ok) {
                console.error('Failed to send error message:', response.statusText);
            }
        }
        console.error(extractedError);
    } catch (err) {
        console.error('Error sending error message:', err);
    }
}
