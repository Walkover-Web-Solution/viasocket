import Script from 'next/script';
import { getLifetimeDealPageData } from '../lib/lifetime-deal-data';
import LifetimeDealClient from './LifetimeDealClient';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData, appCount } = await getLifetimeDealPageData();
    const fallbackDesc = `MCP-native embedded integration platform. Give your AI agents tool calling, your users workflow automation, and your backend webhook-driven actions across ${appCount + 300}+ apps. SOC2 Type II.`;

    return {
        title: metaData?.title || 'viaSocket | Lifetime Deal | AI Workflow Automation Tools',
        description: metaData?.description || fallbackDesc,
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'viaSocket | Lifetime Deal | AI Workflow Automation Tools',
            description: metaData?.description || fallbackDesc,
            images: metaData?.image ? [{ url: metaData.image }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title || 'viaSocket | Lifetime Deal | AI Workflow Automation Tools',
            description: metaData?.description || fallbackDesc,
            images: metaData?.image ? [metaData.image] : undefined,
        },
    };
}

export default async function LifetimeDealPage() {
    const { faqData, metaData, reviewData, appCount } = await getLifetimeDealPageData();

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
            <LifetimeDealClient faqData={faqData} reviewData={reviewData} appCount={appCount} />
        </>
    );
}
