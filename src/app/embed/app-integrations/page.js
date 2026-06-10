import NavbarServer from '../../components/navbar/NavbarServer';
import { getEmbedPageData } from '../../lib/data';
import Footer from '@/components/footer/footer';
import ShowBadges from '@/app/components/home/ShowBadges';
import SecuritySection from '@/app/components/SecuritySection';
import BlogGrid from '@/app/components/blog/BlogGrid';
import RelatedEmbeds from '@/app/components/embed/RelatedEmbeds';
import HeroAurora from '@/app/embed/app-integrations/HeroAurora';
import WhyFeatures from '@/app/embed/app-integrations/WhyFeatures';
import UseCaseSection from '@/app/embed/app-integrations/UseCaseSection';
import EmbedSetup from '@/app/embed/app-integrations/EmbedSetup';
import ComparisonTable from '@/app/embed/app-integrations/ComparisonTable';
import EmbedPricing from '@/app/components/embed/EmbedPricing';
import DarkCta from '@/app/embed/app-integrations/DarkCta';

export const runtime = 'edge';

export default async function AppIntegrationsPage() {
    const { navbarData, footerData, blogData, securityGridData, appCount } = await getEmbedPageData();

    return (
        <>
            <NavbarServer navbarData={navbarData} utm={'/embed/app-integrations'} />
            <main className="global-top-space mt-8 flex flex-col lg:gap-20 md:gap-16 gap-12 ">
                <HeroAurora appCount={appCount} />
                <WhyFeatures appCount={appCount} />
                <UseCaseSection appCount={appCount} />
                <EmbedSetup />
                <ComparisonTable />
                <EmbedPricing />
                <DarkCta />
                <RelatedEmbeds currentPage="app-integrations" />
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
