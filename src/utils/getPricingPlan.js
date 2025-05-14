export async function getPricingPlan(country_code) {
    try {
        const response = await fetch(`https://flow.sokt.io/func/scriSlHY6j9j?country_code=${country_code}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching pricing plan:', error);
        return null;
    }
}
