import { getWorkflowAutomationIdeasPageData } from '../lib/data';
import AutomationSuggestionsClient from '../components/workflow-automation-ideas/AutomationSuggestionsClient';

export async function generateMetadata() {
    const { metaData } = await getWorkflowAutomationIdeasPageData();
    
    return {
        title: metaData?.title || 'Workflow Automation Ideas - viaSocket',
        description: metaData?.description || 'Find workflow automation ideas and inspiration for your business processes',
        keywords: metaData?.keywords,
        openGraph: {
            title: metaData?.title,
            description: metaData?.description,
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

export default async function WorkflowAutomationIdeasPage() {
    const { metaData } = await getWorkflowAutomationIdeasPageData();

    return <AutomationSuggestionsClient />;
}
