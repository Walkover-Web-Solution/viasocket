import Testimonials from './testimonials';
const ReviewIframe = () => {
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
                <Testimonials />
            </div>
        </div>
    );
};

export default ReviewIframe;
