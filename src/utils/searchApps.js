import axios from 'axios';
import { sendErrorMessage } from './SendErrorMessage';

export default async function searchApps(query) {
    const url = `${process.env.NEXT_PUBLIC_SEARCH_API_URL}/search?key=${query}`;

    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        sendErrorMessage({ error });
    } finally {
    }
}
