import Testimonials from './testimonials';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ReviewIframe = ({reviewData, showless}) => {
    const [titleRef, titleInView] = useScrollAnimation({ threshold: 0.2 });
    const [badgesRef, badgesInView] = useScrollAnimation({ threshold: 0.2 });
    const [testimonialsRef, testimonialsInView] = useScrollAnimation({ threshold: 0.1 });

    return (
        <div className="iframe-main-wrapper pb-12 pt-8 relative">
            <div className="flex items-center justify-between gap-2">
                <h2
                    ref={titleRef}
                    className={`h2 scroll-animate ${titleInView ? 'in-view' : ''}`}
                >
                    Reviews ❤️
                </h2>
                <div
                    ref={badgesRef}
                    className={`flex items-center gap-2 scroll-animate animation-delay-200 ${badgesInView ? 'in-view' : ''}`}
                >
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
                ref={testimonialsRef}
                className={`scroll-animate-scale ${testimonialsInView ? 'in-view' : ''}`}
            >
                <Testimonials reviewData={reviewData} showless={showless} />
            </div>
        </div>
    );
};

export default ReviewIframe;
