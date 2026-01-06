import Testimonials from './testimonials';
import { IoMdHeart } from 'react-icons/io';
import Image from 'next/image';

const ReviewIframe = ({ reviewData, showless }) => {
    return (
        <div className="iframe-main-wrapper pb-12 pt-8 relative container">
            <div className="flex items-center justify-between gap-2">
                <h2 className="h2 flex items-center gap-1">
                    <span>Reviews</span> <IoMdHeart className="text-red-700" />
                </h2>
                <div className="flex items-center gap-1 md:gap-2">
                    <a
                        href="https://www.capterra.com/p/10020406/viaSocket/reviews/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-28 h-10 md:w-40 md:h-14"
                    >
                        <Image
                            src="https://brand-assets.capterra.com/badge/3b902cef-5889-4a4e-afaa-855d73a3d238.svg"
                            alt="Capterra software reviews badge"
                            fill
                            className="object-contain"
                        />
                    </a>
                    <a
                        href="https://www.g2.com/products/viasocket/reviews?utm_source=rewards-medal"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Users love viaSocket on G2"
                        className="relative w-20 h-20 md:w-40 md:h-28"
                    >
                        <Image
                            src="https://www.g2.com/shared-assets/product-badges/users-love-us.svg"
                            alt="G2 Users Love Us badge"
                            fill
                            className="object-contain"
                        />
                    </a>
                </div>
            </div>
            <Testimonials reviewData={reviewData} showless={showless} />
        </div>
    );
};

export default ReviewIframe;