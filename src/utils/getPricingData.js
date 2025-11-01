import scriptRunner from './scriptRunner';

export default async function getPricingData(countryCode) {
    try {
        const responseData = await scriptRunner('GET_PRICING_DATA', { country_code: countryCode }, 'POST');
        return responseData;
    } catch (error) {
        console.error('Error fetching combos:', error);
        return null;
    }
}
