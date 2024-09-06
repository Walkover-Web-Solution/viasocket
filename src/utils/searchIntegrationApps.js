import axios from 'axios';

const fetchSearchResults = async (query) => {
    const url = `${process.env.NEXT_PUBLIC_SEARCH_API_URL}/search?key=${query}`;

    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.log(error);
    } finally {
    }
};

export default fetchSearchResults;
