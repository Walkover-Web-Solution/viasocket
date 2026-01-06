import { notFound } from 'next/navigation';
import ErrorComp from '@/components/404/404Comp';
import { getIntegrationsPageData } from '../../lib/data';
import IntegrationsClient from '@/app/components/integrations/IntegrationsClient';

export const runtime = 'edge';

export async function generateMetadata({ params }) {
    const { slug = [] } = await params;
    
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
    const { slug = [] } = await params;
    
    try {
        const data = await getIntegrationsPageData(slug, searchParams);
        
        if (data.noData) {
            return <ErrorComp footerData={data.footerData} />;
        }

        return <IntegrationsClient data={data} />;
    } catch (error) {
        console.error('Error rendering Integrations page:', error);
        return notFound();
    }
}
