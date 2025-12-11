import Link from 'next/link';
import CustomLogin from '@/components/customLogin/CustomLogin';
import { SiGooglemessages } from 'react-icons/si';
import Image from 'next/image';

export const runtime = 'experimental-edge';

const Login = ({ redirect_to }) => {
    return (
        <>
            <div className="min-h-screen">
                <div className="container">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.05fr,1.4fr] min-h-screen">
                        {/* Left column - signup methods */}
                        <div className="flex flex-col justify-center px-8 sm:px-10 py-10">
                            <div className="space-y-8 flex flex-col items-center">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-[#a32015] text-white flex items-center justify-center shadow-md">
                                        <img src="/assets/brand/fav_icon.png" alt="viaSocket" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-500">viaSocket</span>
                                </div>

                                <div className="flex items-center flex-col gap-3">
                                    <div className="space-y-3">
                                        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                                            Sign up to viaSocket
                                        </h1>
                                        <p className="text-sm text-gray-600">Choose your preferred signup method</p>
                                    </div>

                                    <div className="mt-4">
                                        {/* MSG91 CustomLogin renders the actual Google / Password / Apple / OTP buttons */}
                                        <CustomLogin redirect_to={redirect_to} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 space-y-4 text-xs sm:text-sm text-gray-500 flex flex-col items-center justify-center">
                                <p className="flex items-center gap-1.5">
                                    <span>Already have an account?</span>
                                    <Link href="/login" className="text-[#a32015] font-medium hover:underline">
                                        Log in
                                    </Link>
                                </p>
                                <p className="flex flex-wrap items-center gap-2">
                                    <span>© {new Date().getFullYear()} viaSocket. All rights reserved.</span>
                                    <Link href="/privacy" className="text-[#a32015] hover:underline">
                                        Privacy
                                    </Link>
                                    <span>and</span>
                                    <Link href="/terms" className="text-[#a32015] hover:underline">
                                        Terms
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Right column - testimonial card */}
                        <div className="relative px-6 sm:px-10 h-full py-10 flex flex-col items-center justify-around gap-8">
                            <div className="relative w-full bg-[#8a1a0b] text-white rounded-3xl space-y-8 flex justify-between flex-col px-6 sm:px-10 py-10 overflow-hidden gap-4">
                                <div
                                    className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-center text-[52px] md:text-[72px] lg:text-[140px] font-serif font-semibold text-white/10 leading-none"
                                    style={{ fontFamily: 'cursive' }}
                                >
                                    what
                                    <br />
                                    they say
                                </div>
                                {/* Stars - centered at the top */}
                                <div className="flex justify-center w-full !mt-2">
                                    <div className="flex gap-1 text-white text-lg">
                                        <span>★</span>
                                        <span>★</span>
                                        <span>★</span>
                                        <span>★</span>
                                        <span>★</span>
                                    </div>
                                </div>

                                {/* Top testimonial card - left aligned */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/10 max-w-md self-start">
                                    <div className="flex items-start gap-4 flex-col">
                                        <div className="flex items-center gap-2">
                                            {/* <div className="h-10 w-10 rounded-full bg-white/30" /> */}
                                            <Image
                                                src="/review-image/signup-review-1.jpg"
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                            <div className="flex flex-col">
                                                <p className="mb-0">Shreyans Jain</p>
                                                <p className="text-xs">Founder, Nutrabay</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm leading-relaxed">
                                            <p className="text-white/90">
                                                viaSocket has changed how Nutrabay works, making automations like
                                                notifications and payment confirmations simple and smooth.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom testimonial & stats */}
                                <div className="space-y-8">
                                    {/* Second testimonial card - next line, right aligned */}
                                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/10 max-w-md ml-auto mt-4">
                                        <div className="flex items-start gap-4 flex-col">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src="/review-image/signup-review-2.jpg"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                                <div className="flex flex-col">
                                                    <p className="mb-0">Avinash Raghava</p>
                                                    <p className="text-xs">CEO, SaaSBoomi</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm leading-relaxed">
                                                <p className="text-white/90">
                                                    viaSocket has been a big help for SaaSBoomi by making our workflows
                                                    easier and improving how we deliver services.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-end justify-between gap-6 text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-2">
                                                <img
                                                    src="https://thingsofbrand.com/api/icon/pipedrive.com"
                                                    alt="pipedrive"
                                                    className="rounded-full h-8 w-8"
                                                    style={{ filter: 'grayscale(100%)' }}
                                                />
                                                <img
                                                    src="https://thingsofbrand.com/api/icon/hubspot.com"
                                                    alt="hubspot"
                                                    className="rounded-full h-8 w-8"
                                                    style={{ filter: 'grayscale(100%)' }}
                                                />
                                                <img
                                                    src="https://thingsofbrand.com/api/icon/quickbooks.com"
                                                    alt="quickbooks"
                                                    className="rounded-full h-8 w-8"
                                                    style={{ filter: 'grayscale(100%)' }}
                                                />
                                                <img
                                                    src="https://thingsofbrand.com/api/icon/mailchimp.com"
                                                    alt="mailchimp"
                                                    className="rounded-full h-8 w-8"
                                                    style={{ filter: 'grayscale(100%)' }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-2xl">1000+</p>
                                                <p className="text-base">Apps</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-10 text-right">
                                            <div>
                                                <p className="text-2xl">1200+</p>
                                                <p className="text-base">Reviews</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl">10,000+</p>
                                                <p className="text-base">Happy Clients</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trusted by section - centered */}
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-lg">Trusted by 4,000+ companies around the world</p>
                                <div className="flex flex-wrap justify-center gap-12 text-[11px] sm:text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl">4.9</span>
                                        <div className="flex items-center flex-col gap-1">
                                            <span className="text-base">★★★★★</span>
                                            <span className="text-xs flex items-center gap-2">
                                                {' '}
                                                <Image
                                                    src="/review-image/capterra-logo.png"
                                                    width={16}
                                                    height={16}
                                                />{' '}
                                                Capterra
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span className="text-3xl">4.5</span>

                                        <div className="flex items-center flex-col gap-1">
                                            <span className="text-base">★★★★★</span>
                                            <span className="text-xs flex items-center gap-2">
                                                {' '}
                                                <Image src="/review-image/g2-logo.png" width={16} height={16} /> G2
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

// export async function getServerSideProps(context) {
//     const { redirect_to } = context.query;
//     const { utm_source } = context?.query;
//     const { req } = context;
//     const protocol = req.headers['x-forwarded-proto'] || 'http';
//     const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

//     const reviewData = await getReviewSectionData(REVIEWSECTION_FIELDS, '', pageUrl);
//     const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
//     const metaData = await getMetaData('/signup', pageUrl);
//     const testimonials = await getTestimonialData(TESTIMONIALS_FIELDS, '', pageUrl);
//     return {
//         props: {
//             footerData: footerData || [],
//             metaData: metaData || {},
//             redirect_to: redirect_to || '',
//             utm_source: utm_source || 'website',
//             testimonials: testimonials || [],
//             reviewData: reviewData || [],
//         },
//     };
// }
