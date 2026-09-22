import Script from 'next/script';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import NavbarServer from './components/navbar/NavbarServer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import HeroContainer from './components/home/HeroContainer';
import MainContent from './components/home/MainContent';
import SecuritySection from './components/SecuritySection';
import IndexPageContent from './front-page/IndexPageContent';
import { getHomePageData } from './lib/data';
import { getHasToken } from './lib/getAuth';
import { getVariant } from '@/utils/getVariant';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getHomePageData();
    const variant = await getVariant();

    const title =
        variant === 'B' ? 'AI Automation You Can Rely On | viaSocket' : metaData?.title || 'viaSocket - Automate Anything';
    const description =
        variant === 'B'
            ? 'Describe a job in plain words. viaSocket turns it into an automation across 2,300+ apps and uses AI only where a decision is needed.'
            : metaData?.description || 'Connect your apps and automate workflows with viaSocket';

    return {
        title,
        description,
        keywords: metaData?.keywords || '',
        openGraph: {
            siteName: 'viaSocket',
            title,
            description,
            url: 'https://viasocket.com',
            type: 'website',
            images: [
                {
                    url: 'https://files.msg91.com/342616/wnitwkyk',
                    width: 1200,
                    height: 630,
                    alt: 'viaSocket',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://files.msg91.com/342616/wnitwkyk'],
        },
    };
}

export default async function HomePage() {
    const {
        metaData,
        faqData,
        footerData,
        securityGridData,
        appCount,
        indexTemplateData,
        reviewData,
        navbarData,
        templateData,
        initialApps,
        clientStories,
    } = await getHomePageData();
    const hasToken = await getHasToken();
    const variant = await getVariant();

    // Variant B serves the front-page redesign at the root route, reusing its
    // components as-is rather than duplicating them for the homepage. Its
    // signups are tagged 'home-B' so they stay attributable separately from
    // the rest of the root route's traffic.
    if (variant === 'B') {
        return (
            <IndexPageContent
                appCount={appCount}
                reviewData={reviewData}
                initialApps={initialApps}
                utmSource="home-B"
            />
        );
    }

    return (
        <>
            <Script src="https://main.d2f49esifpcbwh.amplifyapp.com/tracker.js" />
            <MetaHeadComp metaData={metaData} page={'/'} />
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/index'} />
            </ConditionalNavbar>

            {/* Spacer for fixed navbar */}
            <div className="h-[48px] lg:h-[78px]"></div>

            <HeroContainer
                appCount={appCount}
                initialApps={initialApps}
                templateData={templateData}
                hasToken={hasToken}
                variant={variant}
            />

            <MainContent
                appCount={appCount}
                indexTemplateData={indexTemplateData}
                templateData={templateData}
                reviewData={reviewData}
                clientStories={clientStories}
            />

            {/* FAQ Section */}
            <div className="py-12 bg-[#FAF9F6]">
                {faqData?.length > 0 && <FAQSection faqData={faqData} faqName={'/index'} />}

                <SecuritySection securityGridData={securityGridData} />
                <ConditionalFooter>
                    <Footer footerData={footerData} />
                </ConditionalFooter>
            </div>
        </>
    );
}


