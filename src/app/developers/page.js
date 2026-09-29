import Header from './Header';
import Hero from './Hero';
import OneAction from './OneAction';
import Trap from './Trap';
import Expertise from './Expertise';
import Turn from './Turn';
import Proof from './Proof';
import Production from './Production';
import UseCases from './UseCases';
import Start from './Start';
import Faq from './Faq';
import Footer from './Footer';

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
            <Header />
            <Hero />
            <OneAction />
            <Trap />
            <Expertise />
            <Turn />
            <Proof />
            <Production />
            <UseCases />
            <Start />
            <Faq />
            <Footer />
        </>
    );
}
