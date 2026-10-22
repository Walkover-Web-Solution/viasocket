import PassPage from '@/components/IntegrationsComp/addToProduct/PassPage';
import { PASS_COPY } from '@/components/IntegrationsComp/addToProduct/copy';

export const runtime = 'edge';

const URL = 'https://viasocket.com/pass';

export const metadata = {
    title: PASS_COPY.metaTitle,
    description: PASS_COPY.metaDesc,
    alternates: { canonical: URL },
    openGraph: {
        title: PASS_COPY.metaTitle,
        description: PASS_COPY.metaDesc,
        url: URL,
        siteName: 'viaSocket',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: PASS_COPY.metaTitle,
        description: PASS_COPY.metaDesc,
    },
};

export default function Pass() {
    return <PassPage />;
}
