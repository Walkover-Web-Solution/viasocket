import scriptRunner from './scriptRunner';

export async function getPricingPlan(country_code) {
    try {
        const data = await scriptRunner('GET_PRICING_PLAN', { country_code }, 'GET');
        return data;
    } catch (error) {
        console.error('Error fetching pricing plan:', error);
        return null;
    }
}
