import NavbarServer from '../components/navbar/NavbarServer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getEmbedPageData } from '../lib/data';
import EmbedContent from '../components/embed/EmbedContent';
import RedditPixel from '@/app/components/RedditPixel/RedditPixel';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getEmbedPageData();

    return {
        title: metaData?.title || 'Embed - viaSocket',
        description: metaData?.description || 'Embed third party apps with your SaaS/AI product - viaSocket',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'Embed - viaSocket',
            description: metaData?.description || 'Embed third party apps with your SaaS/AI product - viaSocket',
            images: ogImages('/embed', metaData?.image),
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title,
            description: metaData?.description,
            images: twitterImages('/embed', metaData?.image),
        },
    };
}

export default async function EmbedPage() {
    const { blogData, footerData, navbarData, faqData, embedData, tableData, howItWorksData, metaData, appCount } =
        await getEmbedPageData();

    return (
        <>
            <RedditPixel />
            <MetaHeadComp metaData={metaData} page={'/embed'} />
            <NavbarServer navbarData={navbarData} utm={'/embed'} />

            <EmbedContent
                blogData={blogData}
                footerData={footerData}
                faqData={faqData}
                embedData={embedData}
                tableData={tableData}
                howItWorksData={howItWorksData}
                appCount={appCount}
            />
        </>
    );
}
