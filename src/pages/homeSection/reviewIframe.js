import { useEffect } from 'react';

const ReviewIframe = () => {
    useEffect(() => {
        // Load Twitter widgets script
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
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
                    <h2 className="h2">Our users adore us ❤️</h2>{' '}
                    <div className="flex items-center gap-2">
                        <a href="https://www.capterra.com/p/10020406/viaSocket/reviews/">
                            {' '}
                            <img
                                width="200px"
                                border="0"
                                src="https://brand-assets.capterra.com/badge/3b902cef-5889-4a4e-afaa-855d73a3d238.svg"
                            />{' '}
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
                    className="iframe-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                    style={{ gridAutoRows: '352px' }}
                >
                    <div className="border custom-border p-3" style={{ gridRow: 'span 2' }}>
                        <iframe
                            src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7366483575472304128"
                            height="100%"
                            width="100%"
                            frameborder="0"
                            allowfullscreen=""
                            title="Embedded post"
                        ></iframe>
                    </div>
                    <div className="border custom-border p-3" style={{ gridRow: 'span 2' }}>
                        <iframe
                            src="https://www.linkedin.com/embed/feed/update/urn:li:share:7361377529519075341"
                            height="100%"
                            width="100%"
                            frameborder="0"
                            allowfullscreen=""
                            title="Embedded post"
                        ></iframe>
                    </div>
                    <div className="border custom-border p-3">
                        <iframe
                            id="gdm-vp-snippet-quotations_eb70d7e3-dfc7-4bd8-9e58-3d0749f2def1"
                            src="https://datainsights-cdn.dm.aws.gartner.com/vp/snippet/eb70d7e3-dfc7-4bd8-9e58-3d0749f2def1"
                            frameborder="0"
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                    <div className="border custom-border p-3">
                        <iframe
                            id="gdm-vp-snippet-quotations_f9f3e86b-72fb-4546-b29b-fd24d6d45a0b"
                            src="https://datainsights-cdn.dm.aws.gartner.com/vp/snippet/f9f3e86b-72fb-4546-b29b-fd24d6d45a0b"
                            frameborder="0"
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                    <div className="border custom-border p-3">
                        <blockquote class="twitter-tweet">
                            <p lang="en" dir="ltr">
                                Shoutout to <a href="https://twitter.com/viasocket?ref_src=twsrc%5Etfw">@viaSocket</a>{' '}
                                for making automation feel like magic. One integration at a time, they’re changing the
                                game! 🎩🔮If you haven’t tried the platform yet, you’re missing out on the simplest way
                                to power your apps with realtime events. Go check them out! ⚡️
                            </p>
                            &mdash; Disha Sheth (@Disha6392){' '}
                            <a href="https://twitter.com/Disha6392/status/1939048672664465437?ref_src=twsrc%5Etfw">
                                June 28, 2025
                            </a>
                        </blockquote>{' '}
                        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                    </div>
                    <div className="border custom-border p-3">
                        <blockquote className="twitter-tweet">
                            <p lang="en" dir="ltr">
                                1000+ MCP servers | AI-powered{' '}
                                <a href="https://twitter.com/hashtag/workflowautomation?src=hash&amp;ref_src=twsrc%5Etfw">
                                    #workflowautomation
                                </a>{' '}
                                Automation using{' '}
                                <a href="https://twitter.com/viasocket?ref_src=twsrc%5Etfw">@viasocket</a> cannot beat
                                it
                            </p>
                            &mdash; Jatinder Grewal (@JGrewalB2B){' '}
                            <a href="https://twitter.com/JGrewalB2B/status/1937905322187805095?ref_src=twsrc%5Etfw">
                                June 25, 2025
                            </a>
                        </blockquote>{' '}
                        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                    </div>
                    <div className="border custom-border p-3">
                        <img src="review-image/review-1.svg" alt="review-1" width="100%" className="h-full object-cover" />
                    </div>
                    <div className="border custom-border p-3">
                        <img src="review-image/review-2.svg" alt="review-2" width="100%" className="h-full object-cover" />
                    </div>
                    <div className="border custom-border p-3">
                        <img src="review-image/review-3.svg" alt="review-3" width="100%" className="h-full object-cover" />
                    </div>
                    <div className="border custom-border p-3">
                        <img src="review-image/review-4.svg" alt="review-4" width="100%" className="h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewIframe;
