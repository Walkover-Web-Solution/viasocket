import { getFeaturesPageData } from '@/app/lib/data';
import FeaturesClient from '@/app/components/features/FeaturesClient';

export const runtime = 'edge';

export async function generateMetadata({ params }) {
    try {
        const resolvedParams = await params;
        const feature = resolvedParams.feature || [];
        const data = await getFeaturesPageData(feature);
        
        if (data.noData) {
            return {
                title: '404 - Page not found',
                description: 'The page you are looking for does not exist.',
            };
        }

        const { metaData } = data;

        let title = metaData?.title || 'Features | viaSocket';
        let description = metaData?.description || 'Explore powerful features that help you automate workflows and connect your favorite apps.';
        
        return {
            title,
            description,
            keywords: metaData?.keywords,
            openGraph: {
                title,
                description,
                images: metaData?.image ? [{ url: metaData.image }] : undefined,
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: metaData?.image ? [metaData.image] : undefined,
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Features | viaSocket',
            description: 'Explore powerful features that help you automate workflows.',
        };
    }
}

export default async function FeaturesPage({ params }) {
    try {
        const resolvedParams = await params;
        const feature = resolvedParams.feature || [];
        const data = await getFeaturesPageData(feature);
        
        if (data.noData) {
            return (
                <div className="container py-20 text-center">
                    <h1 className="text-2xl font-bold">Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                </div>
            );
        }
        
        return <FeaturesClient data={data} />;
    } catch (error) {
        console.error('Error in FeaturesPage:', error);
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold">Error</h1>
                <p>Something went wrong while loading the page.</p>
            </div>
        );
    }
}
