import { getCountriesData } from './getData';
import { COUNTRIES_FIELDS } from '@/const/fields';

export default async function getCountries() {
    try {
        const [response1, response2] = await Promise.all([
            getCountriesData(COUNTRIES_FIELDS),
            getCountriesData(COUNTRIES_FIELDS, `offset=200`),
        ]);
        const combinedResponse = [...response1, ...response2];
        combinedResponse.sort((a, b) => a.country.localeCompare(b.country));
        return combinedResponse;
    } catch (error) {
        console.error('Error fetching countries', error);
    }
}
