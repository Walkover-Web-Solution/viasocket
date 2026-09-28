import Header from './Header';
import Hero from './Hero';

export const runtime = 'edge';

export async function generateMetadata() {
    return {
        title: 'viaSocket — The action layer for AI products',
        description: 'Connect your AI to the apps your users already use and let it take real actions across 2,300+ apps.',
        openGraph: {
            siteName: 'viaSocket',
            title: 'viaSocket — The action layer for AI products',
            description: 'Connect your AI to the apps your users already use and let it take real actions across 2,300+ apps.',
            url: 'https://viasocket.com/developers',
            type: 'website',
        },
    };
}

export default function DevelopersPage() {
    return (
        <>
            <div className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)]">
                <Header />
            </div>
            <Hero />
        </>
    );
}
