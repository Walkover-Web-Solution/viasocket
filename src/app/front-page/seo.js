import {
    FAQ,
    SHOWCASE_HEADING,
    SHOWCASE_STEPS,
    VIDEO,
    VIDEO_SRC,
    VIDEO_POSTER,
    VIDEO_DURATION,
    WALL_GROUP_TITLES,
    LISTINGS,
    FREE_PLAN_MICRO,
} from './content';

const SITE_ORIGIN = 'https://viasocket.com';
const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;

/**
 * Builds the front-page's JSON-LD graph from ./content, the same module the
 * page's components render from, so the schema can't drift from the visible
 * copy the way the hand-written FAQPage block once did (it shipped with 10
 * of the FAQ's 11 questions).
 */
export function schemaGraph() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                '@id': `${SITE_ORIGIN}/front-page#software`,
                name: 'viaSocket',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                url: `${SITE_ORIGIN}/front-page`,
                provider: { '@id': ORGANIZATION_ID },
                featureList: WALL_GROUP_TITLES,
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                    description: FREE_PLAN_MICRO,
                },
                aggregateRating: LISTINGS.map((listing) => ({
                    '@type': 'AggregateRating',
                    ratingValue: listing.rating,
                    reviewCount: listing.reviewCount,
                    bestRating: 5,
                    url: listing.url,
                })),
            },
            {
                '@type': 'FAQPage',
                '@id': `${SITE_ORIGIN}/front-page#faq`,
                mainEntity: FAQ.items.map((item) => ({
                    '@type': 'Question',
                    name: item.q,
                    acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
            },
            {
                '@type': 'HowTo',
                '@id': `${SITE_ORIGIN}/front-page#howto`,
                name: SHOWCASE_HEADING,
                step: SHOWCASE_STEPS.map((text, i) => ({
                    '@type': 'HowToStep',
                    position: i + 1,
                    text,
                })),
            },
            VIDEO_SRC && {
                '@type': 'VideoObject',
                '@id': `${SITE_ORIGIN}/front-page#video`,
                name: VIDEO.heading,
                description: VIDEO.schemaDescription,
                thumbnailUrl: VIDEO_POSTER ? [`${SITE_ORIGIN}${VIDEO_POSTER}`] : undefined,
                contentUrl: `${SITE_ORIGIN}${VIDEO_SRC}`,
                duration: VIDEO_DURATION,
                publisher: { '@id': ORGANIZATION_ID },
            },
        ].filter(Boolean),
    };
}
