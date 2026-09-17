import IndexPageContent from './IndexPageContent';
import { getHomePageData } from '../lib/data';

export const runtime = 'edge';

// Canonical and og:url point at /front-page while this redesign is staged
// here rather than at the root route; both move to the bare domain the day
// this page swaps in as the homepage, or the two URLs compete for the same
// query.
const SITE_ORIGIN = 'https://viasocket.com';
const PAGE_URL = `${SITE_ORIGIN}/front-page`;
// PROVISIONAL placeholder, generated to be self-hosted and on-brand while a
// final marketing asset is produced — swap the file at public/assets/index/og.png
// for the real one when it's ready; this path does not need to change.
const OG_IMAGE = `${SITE_ORIGIN}/assets/index/og.png`;

export const metadata = {
    title: 'AI Automation You Can Rely On | viaSocket',
    description:
        'Describe a job in plain words. viaSocket turns it into an automation across 2,300+ apps and uses AI only where a decision is needed.',
    alternates: { canonical: PAGE_URL },
    openGraph: {
        siteName: 'viaSocket',
        title: 'AI Automation You Can Rely On | viaSocket',
        description:
            'Tell viaSocket the work and it gets done. An automation across 2,300+ app integrations, with AI only where a decision is needed.',
        url: PAGE_URL,
        type: 'website',
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: 'viaSocket — AI automation you can rely on',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Automation You Can Rely On | viaSocket',
        description:
            'Tell viaSocket the work and it gets done. An automation across 2,300+ app integrations, with AI only where a decision is needed.',
        images: [OG_IMAGE],
    },
};

export default async function IndexPage() {
    const { appCount, reviewData, initialApps } = await getHomePageData();
    return <IndexPageContent appCount={appCount} reviewData={reviewData} initialApps={initialApps} />;
}
