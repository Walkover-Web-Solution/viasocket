import NavbarServer from '../../components/navbar/NavbarServer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getEmbedPageData } from '../../lib/data';
import Footer from '@/components/footer/footer';
import ShowBadges from '@/app/components/home/ShowBadges';
import SecuritySection from '@/app/components/SecuritySection';
import BlogGrid from '@/app/components/blog/BlogGrid';
import WebhookHero from './WebhookHero';
import WebhookUseCase from './WebhookUseCase';
import WebhookSetup from './WebhookSetup';
import EmbedPricing from '@/app/components/embed/EmbedPricing';
import DarkCta from '../actions-for-ai/DarkCta';
import RelatedEmbeds from '@/app/components/embed/RelatedEmbeds';
import WebhookFeatureHighlights from './WebhookFeatureHighlights';
import RedditPixel from '@/app/components/RedditPixel/RedditPixel';
import HowWebhookBecomes from './HowWebhookBecomes';
import FaqSection from '@/components/faqSection/faqSection';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getEmbedPageData();

    return {
        title: metaData?.title || 'Actions via Webhook | Webhook Automation Platform | viaSocket Embed',
        description:
            metaData?.description ||
            ' Webhook-triggered workflow automation for SaaS products. POST an event, viaSocket fans it out across 2,500+ apps your users have connected. Per-user isolation, automatic retries, works with any backend.',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'Actions via Webhook | Webhook Automation Platform | viaSocket Embed',
            description:
                metaData?.description ||
                ' Webhook-triggered workflow automation for SaaS products. POST an event, viaSocket fans it out across 2,500+ apps your users have connected. Per-user isolation, automatic retries, works with any backend.',
            images: metaData?.image ? [{ url: metaData.image }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title || 'Actions via Webhook | Webhook Automation Platform | viaSocket Embed',
            description:
                metaData?.description ||
                ' Webhook-triggered workflow automation for SaaS products. POST an event, viaSocket fans it out across 2,500+ apps your users have connected. Per-user isolation, automatic retries, works with any backend.',
            images: metaData?.image ? [metaData.image] : undefined,
        },
    };
}

export default async function ActionViaWebhookPage() {
    const { navbarData, footerData, blogData, securityGridData, appCount, metaData, faqData } = await getEmbedPageData();

    return (
        <>
            <RedditPixel />
            <MetaHeadComp metaData={metaData} page={'/embed/actions-via-webhook'} />
            <NavbarServer navbarData={navbarData} utm={'/embed/actions-via-webhook'} />
            <main className="global-top-space mt-8 flex flex-col lg:gap-20 md:gap-16 gap-12 ">
                <WebhookHero appCount={appCount} />
                <WebhookFeatureHighlights appCount={appCount} />
                <WebhookUseCase />
                <WebhookSetup />
                <HowWebhookBecomes />
                <EmbedPricing />
                <DarkCta />
                <RelatedEmbeds currentPage="actions-via-webhook" />

                <ShowBadges />
                <SecuritySection securityGridData={securityGridData} />

                {blogData?.length > 0 && (
                    <div className="container">
                        <BlogGrid posts={blogData} />
                    </div>
                )}
                <FaqSection faqData={faqData} faqName="actions-via-webhook" />
            </main>
            <Footer footerData={footerData} />
        </>
    );
}
