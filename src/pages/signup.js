import Link from 'next/link';
import CustomLogin from '@/components/customLogin/CustomLogin';
import { getMetaData } from '@/utils/getMetaData';
import Image from 'next/image';
import { getAppCount } from '@/utils/axiosCalls';

export const runtime = 'edge';

const Login = ({ redirect_to, appCount }) => {
    return (
        <>
            <div className="min-h-screen">
                <div className="bg-white w-full grid grid-cols-1 lg:grid-cols-[1.05fr,1.4fr] min-h-screen" style={{ fontFamily: 'Sans-serif' }}>
                    {/* Left column - signup methods */}
                    <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:p-20 bg-white">
                        <div className="space-y-8 flex flex-col">
                            <Link
                                href="/"
                                className="h-10 w-10 bg-[#a32015] text-white flex items-center justify-center shadow-md"
                            >
                                <Image src="/assets/brand/fav_icon.png" alt="viaSocket" width={40} height={40} />
                            </Link>

                            <div className="flex flex-col gap-3">
                                <div className="space-y-3">
                                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                                        Sign up to viaSocket
                                    </h1>
                                    <p className="text-base text-gray-600">Choose your preferred signup method</p>
                                </div>

                                <div className="mt-4">
                                    {/* MSG91 CustomLogin renders the actual Google / Password / Apple / OTP buttons */}
                                    <CustomLogin redirect_to={redirect_to} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 space-y-4 text-xs sm:text-sm text-gray-500 flex flex-col">
                            <p className="flex items-center gap-1.5">
                                <span>Already have an account?</span>
                                <Link href="/login" className="text-[#a32015] font-medium hover:underline text-base">
                                    Log in
                                </Link>
                            </p>
                            <p className="flex flex-wrap items-center text-xs gap-2 !mt-1">
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
                    <div className="relative px-4 sm:px-8 xl:px-16 h-full py-8 flex flex-col items-center justify-center gap-8 bg-[#FAF8F5]">
                        <div className="relative w-full bg-[#8a1a0b] text-white rounded-3xl  flex justify-between flex-col px-6 sm:px-10 py-10 overflow-hidden gap-8 w-full lg:h-[80vh]">
                            <div
                                className="pointer-events-none select-none absolute inset-0 flex justify-center items-center text-nowrap italic text-center text-[52px] md:text-[72px] lg:text-[140px] font-serif text-white/20 leading-none"
                                style={{ fontFamily: 'Georgia, serif' }}
                            >
                                What
                                <br />
                                they say
                            </div>
                            {/* Stars - centered at the top */}
                            <div className="flex justify-center w-full !mt-2">
                                <div className="flex gap-1 text-white text-lg">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-5 h-5 fill-white/90 text-white/90" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg></span>
                                    ))}
                                </div>
                            </div>

                            {/* Top testimonial card - left aligned */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/10 w-full max-w-xs sm:max-w-sm md:max-w-md self-start">
                                <div className="flex items-start gap-4 flex-col">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/review-image/signup-review-1.webp"
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

                            {/* Second testimonial card - next line, right aligned */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/10 w-full max-w-xs sm:max-w-sm md:max-w-md ml-auto">
                                <div className="flex items-start gap-4 flex-col">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/review-image/signup-review-2.webp"
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
                                    <div className="flex -space-x-3">
                                        <Image
                                            src="https://thingsofbrand.com/api/icon/pipedrive.com"
                                            alt="pipedrive"
                                            className="rounded-full h-10 w-10"
                                            style={{ filter: 'grayscale(100%)' }}
                                            width={40}
                                            height={40}
                                        />
                                        <Image
                                            src="https://thingsofbrand.com/api/icon/hubspot.com"
                                            alt="hubspot"
                                            className="rounded-full h-10 w-10"
                                            style={{ filter: 'grayscale(100%)' }}
                                            width={40}
                                            height={40}
                                        />
                                        <Image
                                            src="https://thingsofbrand.com/api/icon/quickbooks.com"
                                            alt="quickbooks"
                                            className="rounded-full h-10 w-10"
                                            style={{ filter: 'grayscale(100%)' }}
                                            width={40}
                                            height={40}
                                        />
                                        <Image
                                            src="https://thingsofbrand.com/api/icon/mailchimp.com"
                                            alt="mailchimp"
                                            className="rounded-full h-10 w-10"
                                            style={{ filter: 'grayscale(100%)' }}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-2xl">{+appCount + 300}+</p>
                                        <p className="text-[#debbb8]">Apps</p>
                                    </div>
                                </div>

                                <div className="flex gap-10 text-right">
                                    <div>
                                        <p className="text-4xl">750+</p>
                                        <p className="text-[#debbb8]">Reviews</p>
                                    </div>
                                    <div>
                                        <p className="text-4xl">10,000+</p>
                                        <p className="text-[#debbb8]">Happy Clients</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trusted by section - centered */}
                        <div className="flex flex-col items-center justify-center w-full">
                            <p className="text-gray-600n text-sm mb-4">Trusted by 4,000+ companies around the world</p>
                            <div className="flex flex-wrap justify-center gap-12 text-[11px] sm:text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl">4.8</span>
                                    <div className="flex items-center flex-col gap-1">
                                        <span className="flex">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <svg key={index} className="w-4 h-4" viewBox="0 0 24 24" fill="#000">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                            ))}
                                        </span>
                                        <span className="text-xs text-gray-600 flex items-center gap-2">
                                            {' '}
                                            <Image src="/review-image/capterra-logo.webp" width={16} height={16} />{' '}
                                            Capterra
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <span className="text-3xl">4.6</span>

                                    <div className="flex items-center flex-col gap-1">
                                        <span className="flex">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <svg key={index} className="w-4 h-4" viewBox="0 0 24 24" fill="#000">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                            ))}
                                        </span>
                                        <span className="text-xs text-gray-600 flex items-center gap-2">
                                            {' '}
                                            <Image src="/review-image/g2-logo.webp" width={16} height={16} /> G2
                                        </span>
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

export async function getServerSideProps(context) {
    const { redirect_to } = context.query;
    const { utm_source } = context?.query;
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const metaData = await getMetaData('/signup', pageUrl);
    const appCount = await getAppCount(pageUrl);
    return {
        props: {
            metaData: metaData || {},
            redirect_to: redirect_to || '',
            utm_source: utm_source || 'website',
            appCount: appCount || 0,
        },
    };
}
