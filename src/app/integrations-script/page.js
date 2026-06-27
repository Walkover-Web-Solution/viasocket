import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Footer from '@/components/footer/footer';
import NavbarServer from '../components/navbar/NavbarServer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import { securityGridData } from '../lib/securityGridData';
import ShowBadges from '../components/home/ShowBadges';
import HeroSection from '../components/integrations-script/HeroSection';
import SetupBuilder from '../components/integrations-script/SetupBuilder';
import WhyItMatters from '../components/integrations-script/WhyItMatters';
import HowItWorks from '../components/integrations-script/HowItWorks';
import FinalCta from '../components/integrations-script/FinalCta';
import SecuritySection from '../components/SecuritySection';
import BlogGrid from '../components/blog/BlogGrid';
import { getIntegrationsScriptPageData } from '../lib/data';
import { getAppCount } from '@/utils/axiosCalls';

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'Integration Script - viaSocket',
        description:
            "Add one script tag and show your app's integrations right on your site. Ready-made automations between your app and 2,500+ tools.",
        keywords: '',
        openGraph: {
            title: 'Integration Script - viaSocket',
            description:
                "Add one script tag and show your app's integrations right on your site. Ready-made automations between your app and 2,500+ tools.",
            images: [],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Integration Script - viaSocket',
            description:
                "Add one script tag and show your app's integrations right on your site. Ready-made automations between your app and 2,500+ tools.",
            images: [],
        },
    };
}

export default async function IntegrationsScriptPage() {
    const { metaData, footerData, navbarData, blogData, apps } = await getIntegrationsScriptPageData();
    const appCount = await getAppCount();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/integrations-script'} />
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/integrations-script'} />
            </ConditionalNavbar>
            <div className="global-top-space">
                <HeroSection appCount={appCount} />
                <SetupBuilder initialApps={apps} />
                <WhyItMatters />
                <HowItWorks />
                <FinalCta />
            </div>

            <ShowBadges />
            <SecuritySection securityGridData={securityGridData} />
            {blogData?.length > 0 && (
                <div className="container pt-12 mt-12">
                    <BlogGrid posts={blogData} />
                </div>
            )}
            <ConditionalFooter>
                <Footer footerData={footerData} />
            </ConditionalFooter>
        </>
    );
}
