import ToolsIndexPage, { TOOLS_COPY } from '@/app/components/tools/ToolsIndexPage';
import { getToolsIndexData } from '@/app/lib/tools-data';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

// /tools: every built-in tool that has a page (the admin panel's list).

const URL = 'https://viasocket.com/tools';

export const metadata = {
    title: TOOLS_COPY.metaTitle,
    description: TOOLS_COPY.metaDesc,
    alternates: { canonical: URL },
    openGraph: { title: TOOLS_COPY.metaTitle, description: TOOLS_COPY.metaDesc, url: URL, siteName: 'viaSocket', type: 'website', images: ogImages('/tools') },
    twitter: { card: 'summary_large_image', title: TOOLS_COPY.metaTitle, description: TOOLS_COPY.metaDesc, images: twitterImages('/tools') },
};

export default async function ToolsPage() {
    return <ToolsIndexPage tools={await getToolsIndexData()} />;
}
