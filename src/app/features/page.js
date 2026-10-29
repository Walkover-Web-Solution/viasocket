import FeaturesPage from '@/components/IntegrationsComp/addToProduct/FeaturesPage';
import { FEATURES_COPY } from '@/components/IntegrationsComp/addToProduct/copy';
import { getLatestBlogs } from '@/app/lib/blogs';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

const URL = 'https://viasocket.com/features';

export const metadata = {
    title: FEATURES_COPY.metaTitle,
    description: FEATURES_COPY.metaDesc,
    alternates: { canonical: URL },
    openGraph: {
        images: ogImages('/features'),
        title: FEATURES_COPY.metaTitle,
        description: FEATURES_COPY.metaDesc,
        url: URL,
        siteName: 'viaSocket',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        images: twitterImages('/features'),
        title: FEATURES_COPY.metaTitle,
        description: FEATURES_COPY.metaDesc,
    },
};

export default function FeaturesIndexPage() {
    return <FeaturesPage blogs={getLatestBlogs()} />;
}
