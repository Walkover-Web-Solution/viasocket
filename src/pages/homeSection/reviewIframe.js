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
                    style={{ gridAutoRows: '350px' }}
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
                            src="https://www.linkedin.com/embed/feed/update/urn:li:share:7361377529519075341?collapsed=1"
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
                        <blockquote className="twitter-tweet">
                            <p lang="en" dir="ltr">
                                After 1000s members joined our twitter Product Hunt community we are thrilled to launch
                                a close what's app group for a PH launch related discussions.
                                <br />
                                Join if you are PH fan.
                                <a href="https://t.co/FJlaT2qXF9">https://t.co/FJlaT2qXF9</a>
                            </p>
                            &mdash; Ravi Paliwal (@rpaliwal71)
                            <a href="https://twitter.com/rpaliwal71/status/1813443783415009460?ref_src=twsrc%5Etfw">
                                July 17, 2024
                            </a>
                        </blockquote>
                    </div>
                    <div className="border custom-border p-3">
                        <blockquote className="twitter-tweet">
                            <p lang="en" dir="ltr">
                                After 1000s members joined our twitter Product Hunt community we are thrilled to launch
                                a close what's app group for a PH launch related discussions.
                                <br />
                                Join if you are PH fan.
                                <a href="https://t.co/FJlaT2qXF9">https://t.co/FJlaT2qXF9</a>
                            </p>
                            &mdash; Ravi Paliwal (@rpaliwal71)
                            <a href="https://twitter.com/rpaliwal71/status/1813443783415009460?ref_src=twsrc%5Etfw">
                                July 17, 2024
                            </a>
                        </blockquote>
                    </div>
                    <div className="border custom-border p-3">
                        <img src="review-image/review-5.png" alt="review-5" width="100%" className="h-full" />
                    </div>
                    <div className="border custom-border p-3">
                        <img src="review-image/review-6.png" alt="review-6" width="100%" className="h-full" />
                    </div>
                    <div className="border custom-border p-3">
                        <img src="review-image/review-7.png" alt="review-7" width="100%" className="h-full" />
                    </div>
                    <div className="border custom-border p-3">
                        <img src="review-image/review-8.png" alt="review-8" width="100%" className="h-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewIframe;
