import NavbarServer from '../../components/navbar/NavbarServer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getEmbedPageData } from '../../lib/data';
import Footer from '@/components/footer/footer';
import ShowBadges from '@/app/components/home/ShowBadges';
import SecuritySection from '@/app/components/SecuritySection';
import BlogGrid from '@/app/components/blog/BlogGrid';
import RelatedEmbeds from '@/app/components/embed/RelatedEmbeds';
import HeroAurora from '@/app/embed/app-integration/HeroAurora';
import RedditPixel from '@/app/components/RedditPixel/RedditPixel';
import WhyFeatures from '@/app/embed/app-integration/WhyFeatures';
import UseCaseSection from '@/app/embed/app-integration/UseCaseSection';
import EmbedSetup from '@/app/embed/app-integration/EmbedSetup';
import ComparisonTable from '@/app/embed/app-integration/ComparisonTable';
import EmbedPricing from '@/app/components/embed/EmbedPricing';
import DarkCta from '@/app/embed/app-integration/DarkCta';
import HowAppIntegrationBecomes from './HowAppIntegrationBecomes';
import FaqSection from '@/components/faqSection/faqSection';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getEmbedPageData();

    return {
        title: metaData?.title || 'App Integrations | Embedded iPaaS for SaaS | viaSocket Embed',
        description:
            metaData?.description ||
            ' Embed a visual workflow builder inside your SaaS. Let your users connect your app with 2,500+ others — HubSpot, Salesforce, Slack, Gmail, Notion. SOC 2 Type II certified, $99/month.',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'App Integrations | Embedded iPaaS for SaaS | viaSocket Embed',
            description:
                metaData?.description ||
                ' Embed a visual workflow builder inside your SaaS. Let your users connect your app with 2,500+ others — HubSpot, Salesforce, Slack, Gmail, Notion. SOC 2 Type II certified, $99/month.',
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

export default async function AppIntegrationsPage() {
    const { navbarData, footerData, blogData, securityGridData, appCount, metaData, faqData } =
        await getEmbedPageData();

    return (
        <>
            <RedditPixel />
            <MetaHeadComp metaData={metaData} page={'/embed/app-integration'} />
            <NavbarServer navbarData={navbarData} utm={'/embed/app-integration'} />
            <main className="global-top-space mt-8 flex flex-col lg:gap-20 md:gap-16 gap-12 ">
                <HeroAurora appCount={appCount} />
                <WhyFeatures appCount={appCount} />
                <UseCaseSection appCount={appCount} />
                <EmbedSetup />
                <ComparisonTable />
                <HowAppIntegrationBecomes />
                <EmbedPricing />
                <DarkCta />
                <RelatedEmbeds currentPage="app-integration" />
                <ShowBadges />
                <SecuritySection securityGridData={securityGridData} />

                {blogData?.length > 0 && (
                    <div className="container">
                        <BlogGrid posts={blogData} />
                    </div>
                )}
                <FaqSection faqData={faqData} faqName="app-integration" />
            </main>
            <Footer footerData={footerData} />
        </>
    );
}
