import { getAutomationSlugPageData } from '../../lib/automation-data';

export async function generateMetadata({ params }) {
    const paramsData = await params;
    const { metaData } = await getAutomationSlugPageData(paramsData.slug || []);

    return {
        title: metaData?.title || 'viaSocket Template',
        description: metaData?.description || 'Discover powerful automation templates on viaSocket',
        keywords: metaData?.keywords || 'automation, integration, workflow',
        openGraph: {
            title: metaData?.title || 'viaSocket Template',
            description: metaData?.description || 'Discover powerful automation templates on viaSocket',
            images: metaData?.image ? [{ url: metaData.image }] : undefined,
            url: metaData?.url,
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title,
            description: metaData?.description,
            images: metaData?.image ? [metaData.image] : undefined,
        },
    };
}

export default function AutomationSlugLayout({ children }) {
    return children;
}
