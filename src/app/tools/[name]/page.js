import { notFound } from 'next/navigation';
import ToolPage, { TOOL_COPY } from '@/app/components/tools/ToolPage';
import { getToolPageData } from '@/app/lib/tools-data';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

// /tools/{page}: a built-in tool's page (page names, plugs and prices are set in the admin, Pages → Built-in
// tools). Its old /integrations/{plug} page 301s here.

export async function generateMetadata({ params }) {
    const { name } = await params;
    const data = await getToolPageData(name);
    if (!data) return { title: '404 - Page not found', description: 'The page you are looking for does not exist.' };
    const tool = data.tool.name;
    const admin = data.adminContent;
    const title = admin?.pageTitle || TOOL_COPY.metaTitle.replace('{name}', tool);
    const description = admin?.metaDescription || TOOL_COPY.metaDesc.replace('{name}', tool);
    const path = `/tools/${name}`;
    const url = `https://viasocket.com${path}`;
    return {
        title,
        description,
        ...(admin?.keywords?.length ? { keywords: admin.keywords } : {}),
        alternates: { canonical: url },
        openGraph: { title, description, url, siteName: 'viaSocket', type: 'website', images: ogImages(path) },
        twitter: { card: 'summary_large_image', title, description, images: twitterImages(path) },
    };
}

export default async function ToolRoute({ params }) {
    const { name } = await params;
    const data = await getToolPageData(name);
    if (!data) notFound();
    return <ToolPage tool={data.tool} others={data.others} appOneDetails={data.appOneDetails} content={data.adminContent} />;
}
