import { notFound, redirect } from 'next/navigation';
import { getIntegrationsPageData } from '../../lib/integration-data';
import IntegrationsMain from '@/app/components/integrations/IntegrationsMain';
import { getHasToken } from '../../lib/getAuth';
import { COPY as ADD_TO_PRODUCT_COPY, fill } from '@/components/IntegrationsComp/addToProduct/copy';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

export async function generateMetadata({ params, searchParams }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug || [];

    try {
        const data = await getIntegrationsPageData(slug, (await searchParams) || {});

        if (data.noData) {
            return {
                title: '404 - Page not found',
                description: 'The page you are looking for does not exist.',
            };
        }

        // Single-app page ("Add {app} to Your Product"): its title, description and keywords come from
        // the admin panel's copy for the app when there is some, else from the page's fixed copy.
        if (data.actionLayerBlogs && data.appOneDetails?.name) {
            const name = data.appOneDetails.name;
            const admin = data.adminContent;
            const title = admin?.pageTitle || fill(ADD_TO_PRODUCT_COPY.metaTitle, name);
            const description = admin?.metaDescription || fill(ADD_TO_PRODUCT_COPY.metaDesc, name);
            const url = `https://viasocket.com/integrations/${data.appOneDetails.appslugname}`;
            return {
                title,
                description,
                ...(admin?.keywords?.length ? { keywords: admin.keywords } : {}),
                alternates: { canonical: url },
                openGraph: { title, description, url, siteName: 'viaSocket', type: 'website', images: ogImages(`/integrations/${data.appOneDetails.appslugname}`) },
                twitter: { card: 'summary_large_image', title, description, images: twitterImages(`/integrations/${data.appOneDetails.appslugname}`) },
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
                images: ogImages(`/integrations/${slug.join('/')}`, metadata?.image),
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: twitterImages(`/integrations/${slug.join('/')}`, metadata?.image),
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