import { sendErrorMessage } from './SendErrorMessage';

export default async function searchApps(query, signal) {
    const url = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}plugins/search?key=${encodeURIComponent(query)}&integrationOnly=true`;

    try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        if (error?.name === 'AbortError') return;
        sendErrorMessage({ error, source: url });
    }
}
