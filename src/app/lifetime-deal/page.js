import { getLifetimeDealPageData } from '../lib/lifetime-deal-data';
import LifetimeDealClient from './LifetimeDealClient';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getLifetimeDealPageData();

    return {
        title: metaData?.title || 'Lifetime Deal - viaSocket',
        description: metaData?.description || 'Get lifetime access to viaSocket automation platform. Pay once, use forever.',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'Lifetime Deal - viaSocket',
            description: metaData?.description || 'Get lifetime access to viaSocket automation platform. Pay once, use forever.',
            images: metaData?.image ? [{ url: metaData.image }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title || 'Lifetime Deal - viaSocket',
            description: metaData?.description || 'Get lifetime access to viaSocket automation platform. Pay once, use forever.',
            images: metaData?.image ? [metaData.image] : undefined,
        },
    };
}

export default async function LifetimeDealPage() {
    const { faqData, metaData } = await getLifetimeDealPageData();

    return <LifetimeDealClient faqData={faqData} />;
}
