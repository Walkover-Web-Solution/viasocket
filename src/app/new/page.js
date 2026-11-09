export const runtime = 'edge';

const PAGE_TITLE = 'Welcome · viaSocket';
const PAGE_TEXT = 'Welcome';
const CANONICAL_URL = 'https://viasocket.com/new';

export const metadata = {
    title: PAGE_TITLE,
    alternates: { canonical: CANONICAL_URL },
};

export default function NewPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
            {PAGE_TEXT}
        </main>
    );
}
