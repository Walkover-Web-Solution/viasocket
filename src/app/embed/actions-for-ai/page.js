import NavbarServer from '../../components/navbar/NavbarServer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getEmbedPageData } from '../../lib/data';
import HeroAurora from './HeroAurora';
import UseCaseSection from './UseCaseSection';
import EmbedPricing from '@/app/components/embed/EmbedPricing';
import EmbedSetupSteps from '@/app/components/embed/EmbedSetupSteps';
import Footer from '@/components/footer/footer';
import EmbedImageSelector from '@/app/components/embed/EmbedImageSelector';
import SecuritySection from '@/app/components/SecuritySection';
import ShowBadges from '@/app/components/home/ShowBadges';
import BlogGrid from '@/app/components/blog/BlogGrid';
import DarkCta from './DarkCta';
import RelatedEmbeds from '@/app/components/embed/RelatedEmbeds';
import HowFlowBecomesAiTool from './HowFlowBecomesAiTool';
import AIComparisonTable from './AIComparisonTable';
import RedditPixel from '@/app/components/RedditPixel/RedditPixel';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getEmbedPageData();

    return {
        title:
            metaData?.title ||
            'The embedded MCP server for AI products. Connect your AI to 2,200+ app actions through one viaSocket Embed. Multi-step workflows your users build, your AI calls as single tools.',
        description:
            metaData?.description ||
            'The embedded MCP server for AI products. Connect your AI to 2,200+ app actions through one viaSocket Embed. Multi-step workflows your users build, your AI calls as single tools.',
        keywords: metaData?.keywords || '',
        openGraph: {
            title:
                metaData?.title ||
                'The embedded MCP server for AI products. Connect your AI to 2,200+ app actions through one viaSocket Embed. Multi-step workflows your users build, your AI calls as single tools.',
            description:
                metaData?.description ||
                'The embedded MCP server for AI products. Connect your AI to 2,200+ app actions through one viaSocket Embed. Multi-step workflows your users build, your AI calls as single tools.',
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

export default async function ActionForAiPage() {
    const { navbarData, footerData, blogData, securityGridData, appCount, metaData } = await getEmbedPageData();

    return (
        <>
            <RedditPixel />
            <MetaHeadComp metaData={metaData} page={'/embed/actions-for-ai'} />
            <NavbarServer navbarData={navbarData} utm={'/embed/actions-for-ai'} />
            <main className="global-top-space mt-8 flex flex-col lg:gap-20 md:gap-16 gap-12 ">
                <HeroAurora appCount={appCount} />
                <EmbedImageSelector appCount={appCount} />
                <UseCaseSection />
                <EmbedSetupSteps />
                <AIComparisonTable />
                <HowFlowBecomesAiTool />
                <EmbedPricing />
                <DarkCta />
                <RelatedEmbeds currentPage="actions-for-ai" />
                <ShowBadges />
                <SecuritySection securityGridData={securityGridData} />

                {blogData?.length > 0 && (
                    <div className="container">
                        <BlogGrid posts={blogData} />
                    </div>
                )}
            </main>

            <Footer footerData={footerData} />
        </>
    );
}
