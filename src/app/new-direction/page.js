import LetterPage from '@/components/IntegrationsComp/addToProduct/LetterPage';
import { LETTER_COPY } from '@/components/IntegrationsComp/addToProduct/copy';

export const runtime = 'edge';

const URL = 'https://viasocket.com/new-direction';
const [FOUNDER] = LETTER_COPY.authors;

export const metadata = {
    title: LETTER_COPY.metaTitle,
    description: LETTER_COPY.metaDesc,
    alternates: { canonical: URL },
    authors: LETTER_COPY.authors.map((a) => ({ name: a.name })),
    openGraph: {
        title: LETTER_COPY.metaTitle,
        description: LETTER_COPY.metaDesc,
        url: URL,
        siteName: 'viaSocket',
        type: 'article',
        images: [{ url: `https://viasocket.com${FOUNDER.photo}`, width: 800, height: 800, alt: FOUNDER.name }],
    },
    twitter: {
        card: 'summary',
        title: LETTER_COPY.metaTitle,
        description: LETTER_COPY.metaDesc,
        images: [`https://viasocket.com${FOUNDER.photo}`],
    },
};

export default function NewDirectionPage() {
    return <LetterPage />;
}
