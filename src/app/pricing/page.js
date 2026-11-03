import PricingPage from '@/components/IntegrationsComp/addToProduct/PricingPage';
import { PRICING_COPY } from '@/components/IntegrationsComp/addToProduct/copy';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

const URL = 'https://viasocket.com/pricing';

export const metadata = {
    title: PRICING_COPY.metaTitle,
    description: PRICING_COPY.metaDesc,
    alternates: { canonical: URL },
    openGraph: {
        images: ogImages('/pricing'),
        title: PRICING_COPY.metaTitle,
        description: PRICING_COPY.metaDesc,
        url: URL,
        siteName: 'viaSocket',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        images: twitterImages('/pricing'),
        title: PRICING_COPY.metaTitle,
        description: PRICING_COPY.metaDesc,
    },
};

export default function Pricing() {
    return <PricingPage />;
}
