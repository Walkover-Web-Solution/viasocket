import scriptRunner from './scriptRunner';

export async function sendErrorMessage({ error, pageUrl, source }) {
    const extractedError = error?.response?.data ?? error?.message ?? 'Unknown error';
    const statusCode = error?.response?.status ?? error?.status ?? 'unknown';

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
            source: source || 'unknown',
            statusCode: String(statusCode),
        });

        if (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod') {
            const payload = {
                error: JSON.stringify(extractedError),
                url: pageUrl,
                source: source || 'unknown',
                statusCode: String(statusCode),
            };
            
            try {
                await scriptRunner('SEND_ERROR_MESSAGE', payload, 'GET');
            } catch (err) {
                console.error('Failed to send error message:', err);
            }
        }
        console.error(extractedError);
    } catch (err) {
        console.error('Error sending error message:', err);
    }
}
