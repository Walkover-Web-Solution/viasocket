import { sendErrorMessage } from './SendErrorMessage';

export default async function searchApps(query) {
    const url = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/utility/plugins/search?key=${query}&integrationOnly=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        sendErrorMessage({ error, source: url });
    }
}

