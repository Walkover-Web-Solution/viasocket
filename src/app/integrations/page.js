import { notFound } from 'next/navigation';
import ErrorComp from '@/components/404/404Comp';
import { getIntegrationsPageData } from '../lib/integration-data';
import IntegrationsMain from '@/app/components/integrations/IntegrationsMain';
import { getHasToken } from '../lib/getAuth';

export const runtime = 'edge';

export async function generateMetadata() {
    try {
        const data = await getIntegrationsPageData([]);
        
        if (data.noData) {
            return {
                title: '404 - Page not found',
                description: 'The page you are looking for does not exist.',
            };
        }

        const { metadata } = data;
        
        return {
            title: metadata?.title || 'Integrations - viaSocket',
            description: metadata?.description || 'Connect your favorite apps with viaSocket integrations',
            keywords: metadata?.keywords,
            openGraph: {
                title: metadata?.title || 'Integrations - viaSocket',
                description: metadata?.description || 'Connect your favorite apps with viaSocket integrations',
                images: metadata?.image ? [{ url: metadata.image }] : undefined,
            },
            twitter: {
                card: 'summary_large_image',
                title: metadata?.title || 'Integrations - viaSocket',
                description: metadata?.description || 'Connect your favorite apps with viaSocket integrations',
                images: metadata?.image ? [metadata.image] : undefined,
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Integrations - viaSocket',
            description: 'Connect your favorite apps with viaSocket integrations',
        };
    }
}

export default async function IntegrationsBasePage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const hasToken = await getHasToken();
    
    try {
        // Pass empty array for slug to get base integrations page
        const data = await getIntegrationsPageData([], resolvedSearchParams);
        
        if (data.noData) {
            return <ErrorComp footerData={data.footerData} />;
        }

        return <IntegrationsMain data={data} hasToken={hasToken} />;
    } catch (error) {
        console.error('Error rendering base Integrations page:', error);
        return notFound();
    }
}
