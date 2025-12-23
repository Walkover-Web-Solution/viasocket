import Link from 'next/link';
import Image from 'next/image';

const BuildOptionsCTA = () => {
    return (
        <div className="text-xl gap-4 justify-center flex-wrap flex items-center mb-12 max-w-2xl mx-auto relative z-index-1 pl-6">
            <Link
                href="https://viasocket.com/signup"
                target="_blank"
                className="border-b-2 custom-border border-dotted flex"
            >
                Build from scratch or assign to human experts
            </Link>
            <div className="flex items-center">
                <Image
                    src="/review-image/1.webp"
                    alt="review"
                    className="rounded-[50px] relative"
                    width={35}
                    height={35}
                />
                <Image
                    src="/review-image/2.webp"
                    alt="review"
                    className="rounded-[50px] relative right-[10px]"
                    width={35}
                    height={35}
                />
                <Image
                    src="/review-image/3.webp"
                    alt="review"
                    className="rounded-[50px] relative right-[20px]"
                    width={35}
                    height={35}
                />
                <Image
                    src="/review-image/4.webp"
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