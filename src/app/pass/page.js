import PassPage from '@/components/IntegrationsComp/addToProduct/PassPage';
import { PASS_COPY } from '@/components/IntegrationsComp/addToProduct/copy';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

const URL = 'https://viasocket.com/pass';

export const metadata = {
    title: PASS_COPY.metaTitle,
    description: PASS_COPY.metaDesc,
    alternates: { canonical: URL },
    openGraph: {
        images: ogImages('/pass'),
        title: PASS_COPY.metaTitle,
        description: PASS_COPY.metaDesc,
        url: URL,
        siteName: 'viaSocket',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        images: twitterImages('/pass'),
        title: PASS_COPY.metaTitle,
        description: PASS_COPY.metaDesc,
    },
};

export default function Pass() {
    return <PassPage />;
}
