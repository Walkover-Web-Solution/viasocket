import axios from 'axios';

export default async function checkDevelopingCountry(country) {
    try {
        const response = await axios.post(`https://flow.sokt.io/func/scrirIacMyPX?country=${country}`);
        const responseData = await response?.data;
        return responseData;
    } catch (error) {
        console.error('Error fetching combos:', error);
        return null;
    }
}
