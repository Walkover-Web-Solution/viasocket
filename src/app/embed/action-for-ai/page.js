import NavbarServer from '../../components/navbar/NavbarServer';
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

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'Action for AI - viaSocket',
        description: 'Action for AI - viaSocket',
    };
}

export default async function ActionForAiPage() {
    const { navbarData, footerData, blogData, securityGridData } = await getEmbedPageData();

    return (
        <>
            <NavbarServer navbarData={navbarData} utm={'/embed/action-for-ai'} />
            <main className="global-top-space mt-8 flex flex-col lg:gap-20 md:gap-16 gap-12 ">
                <HeroAurora />
                <EmbedImageSelector />
                <UseCaseSection />
                <EmbedSetupSteps />
                <HowFlowBecomesAiTool />
                <EmbedPricing />
                <DarkCta />
                <RelatedEmbeds />
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
