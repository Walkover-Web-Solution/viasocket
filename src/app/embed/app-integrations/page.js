import NavbarServer from '../../components/navbar/NavbarServer';
import { getEmbedPageData } from '../../lib/data';
import Footer from '@/components/footer/footer';
import ShowBadges from '@/app/components/home/ShowBadges';
import SecuritySection from '@/app/components/SecuritySection';
import BlogGrid from '@/app/components/blog/BlogGrid';
import EmbedBreadcrumbs from '../EmbedBreadcrumbs';
import RelatedEmbeds from '@/app/components/embed/RelatedEmbeds';

export default async function AppIntegrationsPage() {
    const { navbarData, footerData, blogData, securityGridData } = await getEmbedPageData();

    return (
        <>
            <NavbarServer navbarData={navbarData} utm={'/embed/app-integrations'} />
            <main className="global-top-space mt-8 flex flex-col lg:gap-20 md:gap-16 gap-12 ">
                <EmbedBreadcrumbs currentPage="App Integrations" />
                <ShowBadges />
                <SecuritySection securityGridData={securityGridData} />
                <RelatedEmbeds currentPage="app-integrations" />

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
