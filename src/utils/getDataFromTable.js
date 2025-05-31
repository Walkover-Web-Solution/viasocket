import { sendErrorMessage } from './SendErrorMessage';

export default async function getDataFromTable(table, query) {
    const apiUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/65d2ed33fa9d1a94a5224235/${table}${query ? query : ''}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
            },
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        sendErrorMessage({ error });
    }
}
