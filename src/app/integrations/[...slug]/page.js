import { notFound, redirect } from 'next/navigation';
import { getIntegrationsPageData } from '../../lib/integration-data';
import IntegrationsMain from '@/app/components/integrations/IntegrationsMain';
import { getHasToken } from '../../lib/getAuth';

export const runtime = 'edge';

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug || [];
    
    try {
        const data = await getIntegrationsPageData(slug);
        
        if (data.noData) {
            return {
                title: '404 - Page not found',
                description: 'The page you are looking for does not exist.',
            };
        }

        const { metadata, appOneDetails, appTwoDetails } = data;
        
        let title = metadata?.title || 'Integrations - viaSocket';
        let description = metadata?.description || 'Connect your favorite apps with viaSocket integrations';

        if (appOneDetails?.name) {
            title = title.replace(/\[AppOne\]/g, appOneDetails.name);
            description = description.replace(/\[AppOne\]/g, appOneDetails.name);
        }
        if (appTwoDetails?.name) {
            title = title.replace(/\[AppTwo\]/g, appTwoDetails.name);
            description = description.replace(/\[AppTwo\]/g, appTwoDetails.name);
        }
        
        return {
            title,
            description,
            keywords: metadata?.keywords,
            openGraph: {
                title,
                description,
                images: metadata?.image ? [{ url: metadata.image }] : undefined,
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
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

export default async function IntegrationsPage({ params, searchParams }) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const slug = resolvedParams?.slug || [];
    const hasToken = await getHasToken();
    
    const data = await getIntegrationsPageData(slug, resolvedSearchParams);
    
    // Only redirect if there's a slug (prevents infinite loop on base /integrations page)
    if (data.noData && slug.length > 0) {
        redirect('/integrations');
    }
    
    // If base integrations page has noData, show 404
    if (data.noData) {
        notFound();
    }

    return <IntegrationsMain data={data} hasToken={hasToken} />;
}