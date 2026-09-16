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
import IndexSeam from './IndexSeam';
import { getHomePageData } from '../lib/data';
import './index-theme.scss';

export const runtime = 'edge';

// Mirrors tailwind.config.js theme.extend.colors.index — if a section's own
// tint moves there, the seam on either side of it has to move here too, or a
// blend starts fading to a colour that section no longer paints.
const BG = {
    paper: '#f7f7f2',
    showcase: '#f1f3ea',
    keeps: '#eaf3f2',
    fills: '#f4f4f1',
    wall: '#eef1e8',
    reviews: '#f2f4ee',
    trust: '#eaf0e8',
    black: '#000000',
};

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

            <IndexSeam from={BG.paper} to={BG.showcase} />
            <IndexShowcase apps={initialApps} />

            <IndexSeam from={BG.showcase} to={BG.paper} />
            <IndexDecides />

            <IndexSeam from={BG.paper} to={BG.keeps} />
            <IndexKeeps />

            <IndexSeam from={BG.keeps} to={BG.paper} />
            <IndexRatio />

            <IndexSeam from={BG.paper} to={BG.fills} />
            <IndexFills />

            <IndexSeam from={BG.fills} to={BG.wall} />
            <IndexWall />

            <IndexSeam from={BG.wall} to={BG.reviews} />
            <IndexReviews reviewData={reviewData} />

            <IndexSeam from={BG.reviews} to={BG.trust} />
            <IndexTrust />

            <IndexSeam from={BG.trust} to={BG.paper} />
            <IndexFaq />

            <IndexClose apps={initialApps} />

            {/* <IndexSeam from={BG.paper} to={BG.black} /> */}
            <ConditionalFooter>
                <NewFooter />
            </ConditionalFooter>
        </div>
    );
}
