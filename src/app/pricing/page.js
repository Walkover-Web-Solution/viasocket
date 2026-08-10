import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarServer from '../components/navbar/NavbarServer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import { getPricingPageData } from '../lib/pricing-data';
import { getHasToken } from '../lib/getAuth';
import PricingHeroSection from '@/components/pricing/PricingHeroSection';
import PerkGrid from '@/components/pricing/PerkGrid';
import ExperienceComparison from '@/components/pricing/ExperienceComparison';
import FinalCTA from '@/components/pricing/FinalCTA';
import SecuritySection from '@/app/components/SecuritySection';
import ShowBadges from '@/app/components/home/ShowBadges';
import ReviewIframeOptimized from '../components/home/ReviewIframeOptimized';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getPricingPageData();

    return {
        title: metaData?.title || 'Pricing - viaSocket',
        description: metaData?.description || 'Start free and pay as you go with viaSocket',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'Pricing - viaSocket',
            description: metaData?.description || 'Start free and pay as you go with viaSocket',
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

export default async function PricingPage() {
    const { footerData, faqData, metaData, navbarData, reviewData } = await getPricingPageData();
    const hasToken = await getHasToken();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/pricing'} />
            </ConditionalNavbar>

            <PricingHeroSection hasToken={hasToken} />

            <PerkGrid />

            <ExperienceComparison />

            <ReviewIframeOptimized reviewData={reviewData} variant="pricing" />

            <FinalCTA />
            <div className="my-12">
                {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
            </div>

            <ShowBadges />

            <SecuritySection />

            <ConditionalFooter>
                <Footer footerData={footerData} />
            </ConditionalFooter>
        </>
    );
}
