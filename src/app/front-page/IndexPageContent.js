import Script from 'next/script';
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
import { schemaGraph } from './seo';
import './index-theme.scss';

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

/**
 * The front-page redesign's full body, shared by the standalone /front-page
 * route and the homepage's variant-B branch so the two never drift apart.
 *
 * `utmSource` is left undefined by default, which lets every signup-carrying
 * section fall back to its own `INDEX_UTM_SOURCE` ('/front-page') — the tag
 * the standalone route has always used. The homepage's variant-B branch is
 * the only caller that passes one explicitly ('home-B'), so /front-page's own
 * attribution is unaffected by that choice.
 */
export default function IndexPageContent({ appCount, reviewData, initialApps, utmSource }) {
    return (
        <div className="index-page">
            <Script src="https://main.d2f49esifpcbwh.amplifyapp.com/tracker.js" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph()) }}
            />
            <ConditionalNavbar>
                <NewHeader utmSource={utmSource} />
            </ConditionalNavbar>

            <IndexHero apps={initialApps} appCount={appCount} utmSource={utmSource} />

            <IndexVideo />

            <IndexSeam from={BG.paper} to={BG.showcase} />
            <IndexShowcase apps={initialApps} utmSource={utmSource} />

            <IndexSeam from={BG.showcase} to={BG.paper} />
            <IndexDecides utmSource={utmSource} />

            <IndexSeam from={BG.paper} to={BG.keeps} />
            <IndexKeeps />

            <IndexSeam from={BG.keeps} to={BG.paper} />
            <IndexRatio />

            <IndexSeam from={BG.paper} to={BG.fills} />
            <IndexFills />

            <IndexSeam from={BG.fills} to={BG.wall} />
            <IndexWall utmSource={utmSource} />

            <IndexSeam from={BG.wall} to={BG.reviews} />
            <IndexReviews reviewData={reviewData} />

            <IndexSeam from={BG.reviews} to={BG.trust} />
            <IndexTrust />

            <IndexSeam from={BG.trust} to={BG.paper} />
            <IndexFaq />

            <IndexClose apps={initialApps} utmSource={utmSource} />

            {/* <IndexSeam from={BG.paper} to={BG.black} /> */}
            <ConditionalFooter>
                <NewFooter />
            </ConditionalFooter>
        </div>
    );
}
