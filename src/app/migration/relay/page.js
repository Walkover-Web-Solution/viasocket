import Script from 'next/script';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import Footer from '@/components/footer/footer';
import { getFooterData, getReviewSectionData } from '@/utils/getData';
import { FOOTER_FIELDS, REVIEWSECTION_FIELDS } from '@/const/fields';
import RelayHero from './RelayHero';
import RelayOffers from './RelayOffers';
import RelayComparisonTable from './RelayComparisonTable';
import RelayGetStarted from './RelayGetStarted';
import RelayUseCases from './RelayUseCases';
import RelaySecurity from './RelaySecurity';
import RelayExplore from './RelayExplore';
import RelayCTABanner from './RelayCTABanner';
import ReviewIframeOptimized from '@/app/components/home/ReviewIframeOptimized';
import SecuritySection from '@/app/components/SecuritySection';

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'The Relay.app Alternative for Developers and SaaS Builders | viaSocket',
        description:
            'Relay.app has shut down. viaSocket is an Integration Layer for developers and SaaS builders, with 2,300+ integrations, 100,000 free tasks a month, and an embeddable integration layer.',
        keywords:
            'Relay.app alternative, Relay alternative, Relay.app shutdown, workflow automation, embedded iPaaS, viaSocket',
        openGraph: {
            siteName: 'viaSocket',
            title: 'The Relay.app Alternative for Developers and SaaS Builders | viaSocket',
            description:
                'Relay.app has shut down. viaSocket is an Integration Layer for developers and SaaS builders, with 2,300+ integrations and 100,000 free tasks a month.',
            url: 'https://viasocket.com/migration/relay',
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
            title: 'The Relay.app Alternative for Developers and SaaS Builders | viaSocket',
            description:
                'Relay.app has shut down. viaSocket is an Integration Layer for developers and SaaS builders, with 2,300+ integrations and 100,000 free tasks a month.',
            images: ['https://files.msg91.com/342616/wnitwkyk'],
        },
    };
}

export default async function RelayMigrationPage() {
    const pageUrl = 'https://viasocket.com/migration/relay';
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
                <NavbarServer utm="/migration/relay" />
            </ConditionalNavbar>

            <div className="global-top-space dotted-background">
                <RelayHero />
                <RelayOffers />
                <RelayComparisonTable />
                <RelayGetStarted />
                <RelayUseCases />
                <div className="bg-[#F9F6F1]">
                    <ReviewIframeOptimized reviewData={reviewData} showless={false} />
                </div>
                <div className="bg-[#F9F6F1]">
                    <RelaySecurity />
                    <SecuritySection />
                </div>
                <RelayExplore />
                <RelayCTABanner />
            </div>

            <ConditionalFooter>
                <div className="bg-[#F9F6F1]">
                    <Footer footerData={footerData} />
                </div>
            </ConditionalFooter>
        </>
    );
}
