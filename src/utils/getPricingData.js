import axios from 'axios';

export default async function getPricingData(countryCode) {
    try {
        const response = await axios.post(`https://flow.sokt.io/func/scri9yYiEIJq?country_code=${countryCode}`);
        const responseData = await response?.data;
        console.log(responseData, 'responseData');
        return responseData;
    } catch (error) {
        console.error('Error fetching combos:', error);
        return null;
    }
}
