import Script from 'next/script';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import Footer from '@/components/footer/footer';
import { getFooterData, getReviewSectionData } from '@/utils/getData';
import { FOOTER_FIELDS, REVIEWSECTION_FIELDS } from '@/const/fields';
import N8nHero from './N8nHero';
import N8nStatCompare from './N8nStatCompare';
import N8nMaintenanceRelief from './N8nMaintenanceRelief';
import N8nWays from './N8nWays';
import N8nComparisonTable from './N8nComparisonTable';
import N8nUseCases from './N8nUseCases';
import N8nCTABanner from './N8nCTABanner';
import ReviewIframeOptimized from '@/app/components/home/ReviewIframeOptimized';
import SecuritySection from '@/app/components/SecuritySection';

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'n8n Alternative Without the Self-Hosting: Free Migration | viaSocket',
        description:
            "Love n8n but tired of running it? Export your workflow JSON, paste it into viaSocket's AI, and it runs fully managed. Free assisted migration by real engineers.",
        keywords:
            'n8n alternative, n8n migration, migrate n8n workflows, managed n8n, self-hosted automation alternative, workflow automation migration',
        openGraph: {
            siteName: 'viaSocket',
            title: 'n8n Alternative Without the Self-Hosting: Free Migration | viaSocket',
            description:
                "Love n8n but tired of running it? Export your workflow JSON, paste it into viaSocket's AI, and it runs fully managed. Free assisted migration by real engineers.",
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
            title: 'n8n Alternative Without the Self-Hosting: Free Migration | viaSocket',
            description:
                "Love n8n but tired of running it? Export your workflow JSON, paste it into viaSocket's AI, and it runs fully managed.",
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
                <N8nStatCompare />
                <N8nMaintenanceRelief />
                <N8nWays />
                <N8nComparisonTable />
                <div className="bg-[#F9F6F1]">
                    <ReviewIframeOptimized reviewData={reviewData} showless={false} />
                </div>
                <N8nUseCases />
                <N8nCTABanner />
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
