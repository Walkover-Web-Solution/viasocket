import Link from 'next/link';
import { getFooterData, getReviewSectionData, getTestimonialData } from '@/utils/getData';
import { FOOTER_FIELDS, REVIEWSECTION_FIELDS, TESTIMONIALS_FIELDS } from '@/const/fields';
import CustomLogin from '@/components/customLogin/CustomLogin';
import { handleRedirect } from '@/utils/handleRedirection';
import { getMetaData } from '@/utils/getMetaData';
import ReviewIframe from './homeSection/reviewIframe';

export const runtime = 'experimental-edge';

const Login = ({ reviewData, redirect_to }) => {
    return (
        <>
             <div className="min-h-screen ">
                <div className="flex items-center flex-col md:flex-row h-full">
                    <div id='__next' className="cont md:w-[60vw] h-0 md:h-[100vh] border-left overflow-y-scroll scrollbar-none">
                        <div className="signup-review-section px-12">
                            <ReviewIframe reviewData={reviewData} />
                        </div>
                    </div>
                    <div className="w-full h-screen md:h-auto md:w-[40vw] flex flex-col justify-between">
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex flex-col gap-4 px-8 py-10 items-center text-center">
                                <div className="gap-3 flex flex-col">
                                    <h2 className="h2">Sign up for viaSocket</h2>
                                    <p className="text-sm text-gray-600">
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
                        <p className="md:w-[40vw] text-sm p-3 flex gap-2 justify-center items-center">
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

export async function getServerSideProps(context) {
    const { redirect_to } = context.query;
    const { utm_source } = context?.query;
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const reviewData = await getReviewSectionData(REVIEWSECTION_FIELDS, '', pageUrl);
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
            reviewData: reviewData || [],
        },
    };
}
