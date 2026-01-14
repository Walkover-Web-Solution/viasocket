import { getAutomationsPageData } from '../lib/data';

export async function generateMetadata() {
    const { metaData } = await getAutomationsPageData();

    return {
        title: metaData?.title || 'Workflow Automation Templates - viaSocket',
        description: metaData?.description || 'Discover and use pre-built workflow automation templates',
        keywords: metaData?.keywords || 'automation, templates, workflow',
        openGraph: {
            title: metaData?.title || 'Workflow Automation Templates - viaSocket',
            description: metaData?.description || 'Discover and use pre-built workflow automation templates',
            images: metaData?.image ? [{ url: metaData.image }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title,
            description: metaData?.description,
            images: metaData?.image ? [metaData.image] : undefined,
        },
    };
}

export default function AutomationsLayout({ children }) {
    return children;
}
