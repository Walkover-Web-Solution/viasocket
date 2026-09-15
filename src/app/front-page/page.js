import Script from 'next/script';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NewFooter from '@/components/footer/NewFooter';
import NewHeader from '../components/navbar/NewHeader';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import IndexHero from './IndexHero';
import IndexVideo from './IndexVideo';
import IndexShowcase from './IndexShowcase';
import IndexDecides from './IndexDecides';
import IndexKeeps from './IndexKeeps';
import IndexRatio from './IndexRatio';
import IndexFills from './IndexFills';
import IndexWall from './IndexWall';
import IndexReviews from './IndexReviews';
import IndexTrust from './IndexTrust';
import IndexFaq from './IndexFaq';
import IndexClose from './IndexClose';
import { getHomePageData } from '../lib/data';
import './index-theme.scss';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getHomePageData();

    return {
        title: metaData?.title || 'viaSocket - Automate Anything',
        description: metaData?.description || 'Connect your apps and automate workflows with viaSocket',
        keywords: metaData?.keywords || '',
        openGraph: {
            siteName: 'viaSocket',
            title: metaData?.title || 'viaSocket - Automate Anything',
            description: metaData?.description || 'Connect your apps and automate workflows with viaSocket',
            url: 'https://viasocket.com',
            type: 'website',
            images: [
                {
                    url: 'https://files.msg91.com/342616/wnitwkyk',
                    width: 1200,
                    height: 630,
                    alt: 'viaSocket',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title || 'viaSocket - Automate Anything',
            description: metaData?.description || 'Connect your apps and automate workflows with viaSocket',
            images: ['https://files.msg91.com/342616/wnitwkyk'],
        },
    };
}

export default async function IndexPage() {
    const { metaData, appCount, reviewData, initialApps } = await getHomePageData();
    return (
        <div className="index-page">
            <Script src="https://main.d2f49esifpcbwh.amplifyapp.com/tracker.js" />
            <MetaHeadComp metaData={metaData} page={'/front-page'} />
            <ConditionalNavbar>
                <NewHeader />
            </ConditionalNavbar>

            <IndexHero apps={initialApps} appCount={appCount} />

            <IndexVideo />

            <IndexShowcase apps={initialApps} />

            <IndexDecides />

            <IndexKeeps />

            <IndexRatio />

            <IndexFills />

            <IndexWall />

            <IndexReviews reviewData={reviewData} />

            <IndexTrust />

            <IndexFaq />

            <IndexClose apps={initialApps} />

            <ConditionalFooter>
                <NewFooter />
            </ConditionalFooter>
        </div>
    );
}
