import { useEffect } from 'react';

const tweets = [
    {
        content:
            'Shoutout to @viaSocket for making automation feel like magic. One integration at a time, they’re changing the game! 🎩🔮 If you haven’t tried the platform yet, you’re missing out on the simplest way to power your apps with realtime events. Go check them out! ⚡️',
        author: 'Disha Sheth (@Disha6392)',
        timestamp: 'June 28, 2025',
        tweetLink: 'https://twitter.com/Disha6392/status/1939048672664465437',
    },
    {
        content: '1000+ MCP servers | AI-powered #workflowautomation Automation using @viasocket cannot beat it',
        author: 'Jatinder Grewal (@JGrewalB2B)',
        timestamp: 'June 25, 2025',
        tweetLink: 'https://twitter.com/JGrewalB2B/status/1937905322187805095',
    },
];

const iframes = [
    {
        src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7366483575472304128',
        style: { gridRow: 'span 2' },
        key: 'linkedin-post-1',
    },
    {
        src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7361377529519075341',
        style: { gridRow: 'span 2' },
        key: 'linkedin-post-2',
    },
    {
        src: 'https://datainsights-cdn.dm.aws.gartner.com/vp/snippet/eb70d7e3-dfc7-4bd8-9e58-3d0749f2def1',
        style: {},
        key: 'gartner-snippet-1',
    },
    {
        src: 'https://datainsights-cdn.dm.aws.gartner.com/vp/snippet/f9f3e86b-72fb-4546-b29b-fd24d6d45a0b',
        style: {},
        key: 'gartner-snippet-2',
    },
    {
        src: '/review-image/review-1.svg',
        style: { gridColumn: 'span 2' },
        key: 'review-image-1',
        isImage: true,
    },
    {
        src: '/review-image/review-2.svg',
        style: { gridColumn: 'span 2' },
        key: 'review-image-2',
        isImage: true,
    },
    {
        src: '/review-image/review-3.svg',
        style: { gridColumn: 'span 2' },
        key: 'review-image-3',
        isImage: true,
    },
    {
        src: '/review-image/review-4.svg',
        style: { gridColumn: 'span 2' },
        key: 'review-image-4',
        isImage: true,
    },
];

const ReviewIframe = () => {
    useEffect(() => {
        // Load Twitter widgets script only once
        if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            script.charset = 'utf-8';
            document.body.appendChild(script);
        }

        return () => {
            // Cleanup Twitter script on unmount
            const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    return (
        <div className="container">
            <div className="iframe-main-wrapper bg-white px-12 pb-12 pt-8 border custom-border relative mt-12">
                <div className="flex items-center justify-between gap-2">
                    <h2 className="h2">Our users adore us ❤️</h2>
                    <div className="flex items-center gap-2">
                        <a href="https://www.capterra.com/p/10020406/viaSocket/reviews/">
                            <img
                                width="200px"
                                border="0"
                                src="https://brand-assets.capterra.com/badge/3b902cef-5889-4a4e-afaa-855d73a3d238.svg"
                                alt="Capterra Badge"
                            />
                        </a>
                        <a
                            title="Users love viaSocket on G2"
                            href="https://www.g2.com/products/viasocket/reviews?utm_source=rewards-medal"
                        >
                            <img
                                alt="Users Love Us"
                                className="w-[100px]"
                                src="https://www.g2.com/shared-assets/product-badges/users-love-us.svg"
                            />
                        </a>
                    </div>
                </div>
                <div
                    className="iframe-container grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                    style={{ gridAutoRows: '365px' }}
                >
                    {iframes.map(({ src, style, key, isImage }, index) => (
                        <div key={key} className="border custom-border p-3" style={style}>
                            {isImage ? (
                                <img src={src} alt={`review-${index}`} width="100%" className="h-full object-contain" />
                            ) : (
                                <iframe
                                    src={src}
                                    height="100%"
                                    width="100%"
                                    frameBorder="0"
                                    allowFullScreen=""
                                    title={`Embedded post ${key}`}
                                />
                            )}
                        </div>
                    ))}

                    {tweets.map(({ content, author, timestamp, tweetLink }, index) => (
                        <div key={`tweet-${index}`} className="border custom-border p-3">
                            <blockquote className="twitter-tweet">
                                <p lang="en" dir="ltr">
                                    {content}
                                </p>
                                &mdash; {author}
                                <a href={tweetLink}>{timestamp}</a>
                            </blockquote>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewIframe;
