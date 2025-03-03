import { APPERPAGE } from '@/const/integrations';

export default async function getApps(query) {
    const category = query?.categoryData?.length > 0 ? query?.categoryData[0]?.name : 'All';
    try {
        const fetchUrl = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all`; // Update the API endpoint
        const params = new URLSearchParams({
            category: (category !== 'All' && category) || '',
            limit: APPERPAGE,
            offset: query?.page ? query?.page * APPERPAGE : 0,
        });

        const response = await fetch(`${fetchUrl}?${params.toString()}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const rawData = await response.json();
        const apps = rawData?.data;
        return apps || [];
    } catch (error) {
        console.error('Failed to fetch apps:', error);
        return [];
    }
}
