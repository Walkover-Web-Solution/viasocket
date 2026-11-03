import { getFeaturesPageData } from '@/app/lib/feature-data';
import FeaturesClient from '@/app/components/features/FeaturesClient';
import { getHasToken } from '@/app/lib/getAuth';
import FeatureDetailPage, { featureBySlug } from '@/components/IntegrationsComp/addToProduct/FeatureDetailPage';
import { featurePage } from '@/components/IntegrationsComp/addToProduct/featurePages';
import { getActionLayerBlogs } from '@/utils/axiosCalls';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

// /features/{slug}: the new feature pages (featurePages.js) first; any other slug still gets the old
// feature page from the database until it is redirected.
const newFeature = (feature) => (feature.length === 1 && featureBySlug(feature[0]) && featurePage(feature[0]) ? feature[0] : null);
const pageUrl = (slug) => `https://viasocket.com/features/${slug}`;

function newFeatureMetadata(slug) {
    const { metaTitle: title, metaDesc: description } = featurePage(slug);
    const url = pageUrl(slug);
    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { title, description, url, siteName: 'viaSocket', type: 'website', images: ogImages(`/features/${slug}`) },
        twitter: { card: 'summary_large_image', title, description, images: twitterImages(`/features/${slug}`) },
    };
}

export async function generateMetadata({ params }) {
    try {
        const resolvedParams = await params;
        const feature = resolvedParams.feature || [];
        const slug = newFeature(feature);
        if (slug) return newFeatureMetadata(slug);
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
                images: ogImages(`/features/${feature.join('/')}`, metaData?.image),
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: twitterImages(`/features/${feature.join('/')}`, metaData?.image),
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
        const slug = newFeature(feature);
        if (slug) {
            const url = pageUrl(slug);
            const blogs = await getActionLayerBlogs(url);
            return <FeatureDetailPage slug={slug} page={featurePage(slug)} url={url} blogs={blogs} />;
        }
        const data = await getFeaturesPageData(feature);
        const hasToken = await getHasToken();
        
        if (data.noData) {
            return (
                <div className="container py-20 text-center">
                    <h1 className="text-2xl font-bold">Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                </div>
            );
        }
        
        return <FeaturesClient data={data} hasToken={hasToken} />;
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
