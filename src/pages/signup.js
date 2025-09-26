import Image from 'next/image';
import Link from 'next/link';
import { getFooterData, getTestimonialData } from '@/utils/getData';
import { FOOTER_FIELDS, TESTIMONIALS_FIELDS } from '@/const/fields';
import { MdStar } from 'react-icons/md';
import CustomLogin from '@/components/customLogin/CustomLogin';
import { handleRedirect } from '@/utils/handleRedirection';
import { getMetaData } from '@/utils/getMetaData';
import Testimonials from '@/pages/homeSection/testimonials';

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
            <div className="relative min-h-screen overflow-hidden">
                {/* Background Testimonials Layer with Blur and Animation */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="testimonials-background blur-[2px] scale-110 opacity-90 px-12 md:px-24">
                        <div className="animate-slow-scroll">
                            <Testimonials />
                        </div>
                    </div>
                </div>

                {/* Floating Signup Form */}
                <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md mx-4">
                        <div className="flex flex-col gap-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign up for viaSocket</h2>
                                <p className="text-gray-600">
                                    Create a free account or{' '}
                                    <button
                                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        onClick={(e) => handleRedirect(e, 'https://flow.viasocket.com?')}
                                        rel="nofollow"
                                    >
                                        Log in
                                    </button>
                                </p>
                            </div>
                            <div className="w-full">
                                <CustomLogin redirect_to={redirect_to} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles for Animation */}
            <style jsx>{`
                .testimonials-background {
                    height: 120vh;
                    width: 100%;
                }
                
                .animate-slow-scroll {
                    animation: slowScroll 60s linear infinite;
                }
                
                @keyframes slowScroll {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-20%);
                    }
                }
                
                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .testimonials-background {
                        height: 150vh;
                    }
                    
                    .animate-slow-scroll {
                        animation: slowScrollMobile 45s linear infinite;
                    }
                    
                    @keyframes slowScrollMobile {
                        0% {
                            transform: translateY(0);
                        }
                        100% {
                            transform: translateY(-15%);
                        }
                    }
                }
            `}</style>
        </>
    );
};

export default Login;
