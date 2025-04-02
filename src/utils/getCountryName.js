export const getCountryName = async () => {
    try {
        const response = await fetch('http://ip-api.com/json/', {
            headers: { 'Accept': 'application/json' },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        return data?.country || null;
    } catch (error) {
        console.error('Error fetching country from IP:', error);
    }
};
