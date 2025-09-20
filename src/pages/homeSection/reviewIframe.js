import { useEffect } from 'react';

const ReviewIframe = ({ reviewData = [] }) => {
    const getGridStyle = (item) => {
        const code = (item?.iframe_code || '').toLowerCase();
        // LinkedIn posts get taller (2 rows)
        if (code.includes('linkedin.com')) {
            return { gridRow: 'span 2' };
        }
        // G2 posts get wider (2 columns)
        if (code.includes('g2.com') || code.includes('g2crowd') || code.includes('users-love-us') || code.includes('g2-')) {
            return { gridColumn: 'span 2' };
        }
        return {};
    };
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
                    className="iframe-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                    style={{ gridAutoRows: '365px' }}
                >
                    {(reviewData || []).map((item) => (
                        <div key={item.id} className="border custom-border p-3 cont gap-2" style={getGridStyle(item)}>
                            {item?.iframe_code ? (
                                <div
                                    className="w-full h-full iframe-card-container"
                                    dangerouslySetInnerHTML={{ __html: item.iframe_code }}
                                />
                            ) : (
                                <div className="text-sm text-gray-500">Unknown Platform</div>
                            )}
                            {/* <div className="font-medium">{item.review_type || 'Review'}</div> */}
                        </div>
                    ))}
                    <div>
                        <img src="review-image/G2-review.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewIframe;
