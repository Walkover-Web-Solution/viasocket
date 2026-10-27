import { getWorkflowAutomationIdeasPageData } from '../lib/data';
import AutomationSuggestionsClient from '../components/workflow-automation-ideas/AutomationSuggestionsClient';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getWorkflowAutomationIdeasPageData();
    
    return {
        title: metaData?.title || 'Workflow Automation Ideas - viaSocket',
        description: metaData?.description || 'Find workflow automation ideas and inspiration for your business processes',
        keywords: metaData?.keywords,
        openGraph: {
            title: metaData?.title,
            description: metaData?.description,
            images: ogImages('/workflow-automation-ideas', metaData?.image),
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title,
            description: metaData?.description,
            images: twitterImages('/workflow-automation-ideas', metaData?.image),
        },
    };
}

export default async function WorkflowAutomationIdeasPage() {
    const { metaData } = await getWorkflowAutomationIdeasPageData();

    return <AutomationSuggestionsClient />;
}
