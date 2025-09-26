import Image from 'next/image';
import Link from 'next/link';
import { getFooterData, getTestimonialData } from '@/utils/getData';
import { FOOTER_FIELDS, TESTIMONIALS_FIELDS } from '@/const/fields';
import { MdStar } from 'react-icons/md';
import CustomLogin from '@/components/customLogin/CustomLogin';
import { handleRedirect } from '@/utils/handleRedirection';
import { getMetaData } from '@/utils/getMetaData';
import ReviewIframe from './homeSection/reviewIframe';

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
            metaData: metaData || {},
            redirect_to: redirect_to || '',
            utm_source: utm_source || 'website',
            testimonials: testimonials || [],
        },
    };
}

const Login = ({ testimonials, redirect_to }) => {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <div className="flex items-center flex-col md:flex-row h-full">
                    <div className="cont md:w-[60vw] h-0 md:h-[100vh] overflow-y-scroll bg-white">
                        <div className="signup-review-section">
                            <ReviewIframe />
                        </div>
                    </div>
                    <div className="bg-gray-100 w-full h-screen md:h-auto md:w-[40vw] border-right-color flex flex-col items-center justify-center">
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex flex-col gap-4 p-6 items-center justify-center">
                                <div className="cont gap-2 items-center justify-center">
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
                                <div className="cont gap-8 mt-4">
                                    <CustomLogin redirect_to={redirect_to} />
                                </div>
                            </div>
                        </div>
                        <p className="bg-gray-100 md:w-[40vw] text-sm p-3 flex gap-2 justify-center items-center">
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
                </div>
            </div>
        </>
    );
};

export default Login;
