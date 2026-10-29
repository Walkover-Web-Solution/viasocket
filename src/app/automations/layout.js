import { getAutomationsPageData } from '../lib/automation-data';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export async function generateMetadata() {
    const { metaData } = await getAutomationsPageData();

    return {
        title: metaData?.title || 'Workflow Automation Templates - viaSocket',
        description: metaData?.description || 'Discover and use pre-built workflow automation templates',
        keywords: metaData?.keywords || 'automation, templates, workflow',
        openGraph: {
            title: metaData?.title || 'Workflow Automation Templates - viaSocket',
            description: metaData?.description || 'Discover and use pre-built workflow automation templates',
            images: ogImages('/automations', metaData?.image),
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title,
            description: metaData?.description,
            images: twitterImages('/automations', metaData?.image),
        },
    };
}

export default function AutomationsLayout({ children }) {
    return children;
}
