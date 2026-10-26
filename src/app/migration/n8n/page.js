import Script from 'next/script';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import Footer from '@/components/footer/footer';
import { getFooterData, getReviewSectionData } from '@/utils/getData';
import { FOOTER_FIELDS, REVIEWSECTION_FIELDS } from '@/const/fields';
import N8nHero from './N8nHero';
import N8nBuiltFor from './N8nBuiltFor';
import N8nShortfalls from './N8nShortfalls';
import N8nDifference from './N8nDifference';
import N8nComparisonTable from './N8nComparisonTable';
import N8nAudience from './N8nAudience';
import N8nGetStarted from './N8nGetStarted';
import N8nCTABanner from './N8nCTABanner';
import ReviewIframeOptimized from '@/app/components/home/ReviewIframeOptimized';
import SecuritySection from '@/app/components/SecuritySection';

export const runtime = 'edge';

export async function generateMetadata() {
    // "2,300+" also appears in N8nHero, N8nDifference and N8nComparisonTable.
    return {
        title: 'n8n Alternative for SaaS Builders | viaSocket',
        description:
            'n8n automates internal workflows. viaSocket is an Integration Layer that lets your SaaS product offer 2,300+ app integrations to your customers, without your team building or maintaining them.',
        keywords:
            'n8n alternative, n8n for SaaS, integration layer, embedded iPaaS, managed OAuth, SaaS integrations, viaSocket',
        openGraph: {
            siteName: 'viaSocket',
            title: 'n8n Alternative for SaaS Builders | viaSocket',
            description:
                'n8n automates internal workflows. viaSocket is an Integration Layer that lets your SaaS product offer 2,300+ app integrations to your customers, without your team building or maintaining them.',
            url: 'https://viasocket.com/migration/n8n',
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
            title: 'n8n Alternative for SaaS Builders | viaSocket',
            description:
                'n8n automates internal workflows. viaSocket is an Integration Layer that lets your SaaS product offer 2,300+ app integrations to your customers.',
            images: ['https://files.msg91.com/342616/wnitwkyk'],
        },
    };
}

export default async function N8nMigrationPage() {
    const pageUrl = 'https://viasocket.com/migration/n8n';
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
                <NavbarServer utm="/migration/n8n" />
            </ConditionalNavbar>

            <div className="global-top-space dotted-background">
                <N8nHero />
                <N8nBuiltFor />
                <N8nShortfalls />
                <N8nDifference />
                <N8nComparisonTable />
                <N8nAudience />
                <N8nGetStarted />
                <N8nCTABanner />
                <div className="bg-[#F9F6F1]">
                    <ReviewIframeOptimized reviewData={reviewData} showless={false} />
                </div>
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
