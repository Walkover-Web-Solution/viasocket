import FeaturesPage from '@/components/IntegrationsComp/addToProduct/FeaturesPage';
import { FEATURES_COPY } from '@/components/IntegrationsComp/addToProduct/copy';
import { getActionLayerBlogs } from '@/utils/axiosCalls';

export const runtime = 'edge';

const URL = 'https://viasocket.com/features';

export const metadata = {
    title: FEATURES_COPY.metaTitle,
    description: FEATURES_COPY.metaDesc,
    alternates: { canonical: URL },
    openGraph: {
        title: FEATURES_COPY.metaTitle,
        description: FEATURES_COPY.metaDesc,
        url: URL,
        siteName: 'viaSocket',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: FEATURES_COPY.metaTitle,
        description: FEATURES_COPY.metaDesc,
    },
};

export default async function FeaturesIndexPage() {
    const blogs = await getActionLayerBlogs(URL);
    return <FeaturesPage blogs={blogs} />;
}
