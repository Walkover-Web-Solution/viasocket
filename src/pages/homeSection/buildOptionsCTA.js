import Link from 'next/link';
import { BsStars } from 'react-icons/bs';

const BuildOptionsCTA = () => {
    return (
        <div className="text-xl gap-2 justify-center flex-wrap flex items-center mb-12 max-w-2xl mx-auto relative z-index-1 pl-6">
            or{' '}
            <Link
                href="https://viasocket.com/signup"
                target="_blank"
                className="border-b-2 custom-border border-dotted flex"
            >
                build from scratch
                <BsStars /> - take help from human experts
            </Link>
            <div className="flex items-center mx-auto">
                <img
                    src="/review-image/1.svg"
                    alt="review"
                    className="rounded-[50px] relative"
                    width={35}
                    height={35}
                />
                <img
                    src="/review-image/2.svg"
                    alt="review"
                    className="rounded-[50px] relative right-[10px]"
                    width={35}
                    height={35}
                />
                <img
                    src="/review-image/3.svg"
                    alt="review"
                    className="rounded-[50px] relative right-[20px]"
                    width={35}
                    height={35}
                />
                <img
                    src="/review-image/4.svg"
                    alt="review"
                    className="rounded-[50px] relative right-[30px]"
                    width={35}
                    height={35}
                />
            </div>
        </div>
    );
};

export default BuildOptionsCTA;