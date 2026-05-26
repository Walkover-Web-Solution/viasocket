import NavbarServer from '../components/navbar/NavbarServer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getEmbedPageData } from '../lib/data';
import EmbedContent from '../components/embed/EmbedContent';

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

export default async function EmbedPage() {
    const { blogData, footerData, navbarData, faqData, embedData, tableData, howItWorksData, metaData, appCount } =
        await getEmbedPageData();

    return (
        <>
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
