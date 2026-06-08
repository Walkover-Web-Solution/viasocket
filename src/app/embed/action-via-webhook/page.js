import NavbarServer from '../../components/navbar/NavbarServer';
import { getEmbedPageData } from '../../lib/data';
import Footer from '@/components/footer/footer';
import ShowBadges from '@/app/components/home/ShowBadges';
import SecuritySection from '@/app/components/SecuritySection';
import BlogGrid from '@/app/components/blog/BlogGrid';
import WebhookHero from './WebhookHero';
import WebhookUseCase from './WebhookUseCase';
import WebhookSetup from './WebhookSetup';
import EmbedPricing from '@/app/components/embed/EmbedPricing';
import DarkCta from '../action-for-ai/DarkCta';
import RelatedEmbeds from '@/app/components/embed/RelatedEmbeds';
import WebhookFeatureHighlights from './WebhookFeatureHighlights';

export default async function ActionViaWebhookPage() {
    const { navbarData, footerData, blogData, securityGridData } = await getEmbedPageData();

    return (
        <>
            <NavbarServer navbarData={navbarData} utm={'/embed/action-via-webhook'} />
            <main className="global-top-space mt-8 flex flex-col lg:gap-20 md:gap-16 gap-12 ">
                <WebhookHero />
                <WebhookFeatureHighlights />
                <WebhookUseCase />
                <WebhookSetup />
                <EmbedPricing />
                <DarkCta />
                <RelatedEmbeds currentPage="action-via-webhook" />

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
