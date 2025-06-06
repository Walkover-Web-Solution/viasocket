import { sendErrorMessage } from './SendErrorMessage';

export const getCountryName = async (pageUrl) => {
    try {
        const response = await fetch('https://ipapi.co/json/', {
            headers: { 'Accept': 'application/json' },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        return data?.country_name || null;
    } catch (error) {
        sendErrorMessage({
            error,
            pageUrl,
            source: 'https://ipapi.co/json/',
        });
    }
};
