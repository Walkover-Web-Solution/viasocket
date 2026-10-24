export const runtime = 'edge';

const PAGE_TITLE = 'Welcome';
const URL = 'https://viasocket.com/new-web';

export const metadata = {
    title: PAGE_TITLE,
    alternates: { canonical: URL },
};

export default function NewWebPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
            <h1 className="text-2xl font-medium">{PAGE_TITLE}</h1>
        </main>
    );
}
