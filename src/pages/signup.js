import Image from 'next/image';
import Link from 'next/link';
import { getFooterData, getTestimonialData } from '@/utils/getData';
import { FOOTER_FIELDS, TESTIMONIALS_FIELDS } from '@/const/fields';
import { MdStar } from 'react-icons/md';
import CustomLogin from '@/components/customLogin/CustomLogin';
import { handleRedirect } from '@/utils/handleRedirection';
import { getMetaData } from '@/utils/getMetaData';

export const runtime = 'experimental-edge';

export async function getServerSideProps(context) {
    const { redirect_to } = context.query;
    const { utm_source } = context?.query;
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const metaData = await getMetaData('/signup', pageUrl);
    const testimonials = await getTestimonialData(TESTIMONIALS_FIELDS, '', pageUrl);
    return {
        props: {
            footerData: footerData || [],
            metaData: metaData|| {},
            redirect_to: redirect_to || '',
            utm_source: utm_source || 'website',
            testimonials: testimonials || [],
        },
    };
}

const Login = ({ testimonials, redirect_to }) => {
    return (
        <>
            <div className="min-h-screen">
                <div className="flex items-center flex-col md:flex-row gap-10 h-full">
                    <div className="bg-gray-100 w-full md:w-[40vw] border-right-color flex flex-col h-[calc(100vh-45px)]">
                        <Link href="/">
                            <Image
                                src="/assets/brand/logo.svg"
                                className="h-[48px] w-auto p-3 cursor-pointer"
                                width={60}
                                height={60}
                                alt="viasocket"
                            />
                        </Link>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex flex-col gap-4 p-6">
                                <div className="cont gap-2">
                                    <h2 className="h2">Sign up for viaSocket</h2>
                                    <p className="text-sm">
                                        create a free account or{' '}
                                        <button
                                            className="active-link text-link"
                                            onClick={(e) => handleRedirect(e, 'https://flow.viasocket.com?')}
                                            rel="nofollow"
                                        >
                                            Log in
                                        </button>
                                    </p>
                                </div>
                                <div className="cont gap-8">
                                    <CustomLogin redirect_to={redirect_to} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cont gap-4 bg-white p-6 border custom-border m-auto md:w-[34vw]">
                        <div className="flex flex-col gap-2">
                            <div className="cont gap-2">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <MdStar key={index} fontSize={24} color="#FDE047" />
                                    ))}
                                </div>
                                <p className="text-md">{testimonials[0]?.testimonial}</p>
                            </div>
                            <div className="flex gap-3">
                                <Image
                                    className="rounded-full h-11 w-fit"
                                    src={testimonials[0]?.client_img[0] || 'https://placehold.co/40x40'}
                                    width={36}
                                    height={36}
                                    alt="testimonial image"
                                />
                                <div className="cont">
                                    <p className="font-semibold">{testimonials[0]?.given_by}</p>
                                    <p className="text-sm">{testimonials[0]?.giver_title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="bg-gray-100 md:w-[40vw] border-right-color text-sm p-3 flex gap-2 items-center">
                    <span>© 2025 viaSocket. All rights reserved.</span>
                    <Link href="/privacy" className="active-link text-link">
                        Privacy
                    </Link>
                    <span>and</span>
                    <Link href="/terms" className="active-link text-link">
                        Terms.
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Login;
