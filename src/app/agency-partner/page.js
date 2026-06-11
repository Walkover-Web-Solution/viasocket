import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Footer from '@/components/footer/footer';
import NavbarServer from '../components/navbar/NavbarServer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import HeroSection from '@/components/agencyPartner/HeroSection';
import { getAgencyPartnerPageData } from '../lib/data';
import { getAppCount } from '@/utils/axiosCalls';
import WhyAgenciesSection from '@/components/agencyPartner/WhyAgenciesSection';
import HowItWorksSection from '@/components/agencyPartner/HowItWorksSection';
import FAQSection from '@/components/agencyPartner/FAQSection';
import ShowBadges from '../components/home/ShowBadges';
import SecuritySection from '../components/SecuritySection';
import BlogGrid from '../components/blog/BlogGrid';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getAgencyPartnerPageData();

    return {
        title: metaData?.title || 'Agency Partner Program - viaSocket',
        description:
            metaData?.description ||
            'Join the viaSocket Agency Partner Program and grow your automation business with exclusive benefits.',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'Agency Partner Program - viaSocket',
            description:
                metaData?.description ||
                'Join the viaSocket Agency Partner Program and grow your automation business with exclusive benefits.',
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

export default async function AgencyPartnerPage() { 
    const { metaData, footerData, navbarData, blogData = [], securityGridData = [] } = await getAgencyPartnerPageData();
    const appCount = await getAppCount();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/agency-partner'} />
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/agency-partner'} />
            </ConditionalNavbar>

            <HeroSection appCount={appCount} />
            <WhyAgenciesSection />
            <HowItWorksSection />
            <FAQSection />
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
