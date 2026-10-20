import UseCasesPage from '@/components/IntegrationsComp/addToProduct/UseCasesPage';
import { USECASES_COPY } from '@/components/IntegrationsComp/addToProduct/copy';

export const runtime = 'edge';

const URL = 'https://viasocket.com/use-cases';

export const metadata = {
    title: USECASES_COPY.metaTitle,
    description: USECASES_COPY.metaDesc,
    alternates: { canonical: URL },
    openGraph: {
        title: USECASES_COPY.metaTitle,
        description: USECASES_COPY.metaDesc,
        url: URL,
        siteName: 'viaSocket',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: USECASES_COPY.metaTitle,
        description: USECASES_COPY.metaDesc,
    },
};

export default function UseCasesIndexPage() {
    return <UseCasesPage />;
}
