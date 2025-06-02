import { sendErrorMessage } from './SendErrorMessage';
import axios from 'axios';
export default async function getDataFromTable(table, query, pageUrl) {
    const apiUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/65d2ed33fa9d1a94a5224235/table${query ? query : ''}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
            },
        });
        const responseData = await response?.data;
        return responseData;
    } catch (error) {
        console.error(error?.response?.data || error.message);
        sendErrorMessage({ error, pageUrl });
    }
}
