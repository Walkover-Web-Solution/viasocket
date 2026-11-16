export const runtime = 'edge';

const URL = 'https://viasocket.com/welcome';

export const metadata = {
    title: 'Welcome · viaSocket',
    description: 'Welcome',
    alternates: { canonical: URL },
    openGraph: {
        title: 'Welcome · viaSocket',
        description: 'Welcome',
        url: URL,
        siteName: 'viaSocket',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Welcome · viaSocket',
        description: 'Welcome',
    },
};

export default function WelcomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
            <h1 className="text-4xl font-semibold">Welcome</h1>
        </main>
    );
}
