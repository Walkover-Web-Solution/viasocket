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
        style: {},
        key: 'review-image-1',
        isImage: true,
    },
    {
        src: '/review-image/review-2.svg',
        style: {},
        key: 'review-image-2',
        isImage: true,
    },
    {
        src: '/review-image/review-3.svg',
        style: {},
        key: 'review-image-3',
        isImage: true,
    },
    {
        src: '/review-image/review-4.svg',
        style: {},
        key: 'review-image-4',
        isImage: true,
    },
];

const Testimonials = () => {
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
        <div
            className="iframe-container grid grid-flow-dense grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 border-b-0 mt-8 border custom-border border-r-0"
            style={{ gridAutoRows: '365px' }}
        >
            {iframes.map(({ src, style, key, isImage }, index) => (
                <div
                    key={key}
                    className={`border-r border-b custom-border p-3 ${isImage ? 'lg:col-span-2 xl:col-span-2' : ''}`}
                    style={style}
                >
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
                <div key={`tweet-${index}`} className="border-r border-b custom-border p-3">
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
    );
};

export default Testimonials;
