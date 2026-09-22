import Script from 'next/script';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import Footer from '@/components/footer/footer';
import { getFooterData, getReviewSectionData } from '@/utils/getData';
import { FOOTER_FIELDS, REVIEWSECTION_FIELDS } from '@/const/fields';
import ZapierHero from './ZapierHero';
import ZapierStatCompare from './ZapierStatCompare';
import ZapierWays from './ZapierWays';
import ZapierComparisonTable from './ZapierComparisonTable';
import ZapierUseCases from './ZapierUseCases';
import ZapierCTABanner from './ZapierCTABanner';
import ReviewIframeOptimized from '@/app/components/home/ReviewIframeOptimized';
import SecuritySection from '@/app/components/SecuritySection';

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'Zapier Alternative: 100x the Free Tasks + Free Migration | viaSocket',
        description:
            "Zapier's free plan gives 100 tasks. viaSocket's gives 10,000, plus 500 AI credits. Export your Zaps as JSON, paste into our AI, and switch with free expert help.",
        keywords:
            'Zapier alternative, Zapier migration, migrate Zaps, cheaper than Zapier, free Zapier alternative, workflow automation migration',
        openGraph: {
            siteName: 'viaSocket',
            title: 'Zapier Alternative: 100x the Free Tasks + Free Migration | viaSocket',
            description:
                "Zapier's free plan gives 100 tasks. viaSocket's gives 10,000, plus 500 AI credits. Export your Zaps as JSON, paste into our AI, and switch with free expert help.",
            url: 'https://viasocket.com/migration/zapier',
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
            title: 'Zapier Alternative: 100x the Free Tasks + Free Migration | viaSocket',
            description: "Zapier's free plan gives 100 tasks. viaSocket's gives 10,000, plus 500 AI credits.",
            images: ['https://files.msg91.com/342616/wnitwkyk'],
        },
    };
}

export default async function ZapierMigrationPage() {
    const pageUrl = 'https://viasocket.com/migration/zapier';
    const [footerData, reviewData] = await Promise.all([
        getFooterData(FOOTER_FIELDS, '', pageUrl),
        getReviewSectionData(REVIEWSECTION_FIELDS, '', pageUrl),
    ]);

    return (
        <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16852796533" strategy="afterInteractive" />
            <Script id="gtag-config" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'AW-16852796533');
                `}
            </Script>
            <Script id="gtag-conversion" strategy="afterInteractive">
                {`
                    function gtag_report_conversion(url) {
                        var callback = function () {
                            if (typeof(url) != 'undefined') {
                                window.location = url;
                            }
                        };
                        gtag('event', 'conversion', {
                            'send_to': 'AW-16852796533/PQ6RCKGzwdQaEPWIheQ-',
                            'event_callback': callback
                        });
                        return false;
                    }
                `}
            </Script>
            <ConditionalNavbar>
                <NavbarServer utm="/migration/zapier" />
            </ConditionalNavbar>

            <div className="global-top-space dotted-background">
                <ZapierHero />
                <ZapierStatCompare />
                <ZapierWays />
                <ZapierComparisonTable />
                <div className="bg-[#F9F6F1]">
                    <ReviewIframeOptimized reviewData={reviewData} showless={false} />
                </div>
                <ZapierUseCases />
                <ZapierCTABanner />
                <div className="bg-[#F9F6F1] pt-12">
                    <SecuritySection />
                </div>
            </div>

            <ConditionalFooter>
                <div className="bg-[#F9F6F1]">
                    <Footer footerData={footerData} />
                </div>
            </ConditionalFooter>
        </>
    );
}
