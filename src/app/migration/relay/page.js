import Script from 'next/script';
import { CheckCircle, Upload, Wrench, Rocket } from 'lucide-react';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import Footer from '@/components/footer/footer';
import { getFooterData, getReviewSectionData } from '@/utils/getData';
import { FOOTER_FIELDS, REVIEWSECTION_FIELDS } from '@/const/fields';
import RelayHero from './RelayHero';
import RelayWays from './RelayWays';
import RelayComparisonTable from './RelayComparisonTable';
import RelayUseCases from './RelayUseCases';
import RelayCTABanner from './RelayCTABanner';
import ReviewIframeOptimized from '@/app/components/home/ReviewIframeOptimized';
import SecuritySection from '@/app/components/SecuritySection';

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'Migrate from Relay.app to viaSocket | Free Workflow Migration',
        description:
            'Relay.app is shutting down. Migrate your Relay workflows to viaSocket for free. We will rebuild your automations, preserve your data, and get you running on a SOC2 certified platform.',
        keywords:
            'Relay.app shutdown, Relay migration, migrate Relay workflows, Relay alternative, workflow automation migration',
        openGraph: {
            siteName: 'viaSocket',
            title: 'Migrate from Relay.app to viaSocket | Free Workflow Migration',
            description:
                'Relay.app is shutting down. Migrate your Relay workflows to viaSocket for free. We will rebuild your automations and get you running on a SOC2 certified platform.',
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
            title: 'Migrate from Relay.app to viaSocket | Free Workflow Migration',
            description: 'Relay.app is shutting down. Migrate your Relay workflows to viaSocket for free.',
            images: ['https://files.msg91.com/342616/wnitwkyk'],
        },
    };
}

const benefits = [
    {
        icon: <CheckCircle className="w-6 h-6 text-[#3B62FF]" />,
        title: 'Hands-free migration',
        description: 'Share a screenshot or export of your Relay flows and our team recreates them in viaSocket.',
    },
    {
        icon: <CheckCircle className="w-6 h-6 text-[#3B62FF]" />,
        title: 'More apps, more power',
        description: 'Connect 1000+ apps with AI agents, webhooks, scheduled jobs, and advanced conditional logic.',
    },
    {
        icon: <CheckCircle className="w-6 h-6 text-[#3B62FF]" />,
        title: 'Enterprise-grade security',
        description: 'SOC2 Type II certified infrastructure with granular permissions and audit logs.',
    },
    {
        icon: <CheckCircle className="w-6 h-6 text-[#3B62FF]" />,
        title: 'No disruption',
        description: 'We test every migrated flow side-by-side so your business keeps running without interruption.',
    },
];

const steps = [
    {
        number: '01',
        title: 'Share your flows',
        description: 'Send us your Relay app flows, screenshots, or a short Loom video.',
        icon: <Upload className="w-5 h-5" />,
    },
    {
        number: '02',
        title: 'We rebuild them',
        description: 'Our automation experts recreate each workflow in viaSocket using native integrations.',
        icon: <Wrench className="w-5 h-5" />,
    },
    {
        number: '03',
        title: 'Review & launch',
        description: 'You review the rebuilt flows, we fine-tune them, then flip the switch.',
        icon: <Rocket className="w-5 h-5" />,
    },
];

const relayFeatures = [
    'No-code visual builder',
    'AI workflow builder',
    '1000+ app integrations',
    'Custom webhooks & API calls',
    'Team workspaces & permissions',
    'SOC2 Type II security',
];

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
                <RelayWays />
                <RelayComparisonTable />
                <div className="bg-[#F9F6F1]">
                    <ReviewIframeOptimized reviewData={reviewData} showless={false} />
                </div>
                <RelayUseCases />
                <RelayCTABanner />
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
