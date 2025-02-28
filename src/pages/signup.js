import { useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFooterData, getMetaData, getNavData, getTestimonialData } from '@/utils/getData';
import { FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS, TESTIMONIALS_FIELDS } from '@/const/fields';
import { MdStar } from 'react-icons/md';

export const runtime = 'experimental-edge';

export async function getServerSideProps(context) {
    const { redirect_to } = context.query;
    const { utm_source } = context?.query;
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/signup'`);
    const testimonials = await getTestimonialData(TESTIMONIALS_FIELDS);
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            redirect_to: redirect_to || '',
            utm_source: utm_source || 'website',
            testimonials: testimonials || [],
        },
    };
}

const Login = ({ metaData, testimonials, pathArray, redirect_to, utm_source }) => {
    useLayoutEffect(() => {
        const configuration = {
            referenceId: process.env.NEXT_PUBLIC_REFERENCE_ID,
            success: (data) => {},
            failure: (error) => {
                console.log('failure reason', error);
            },
        };
        if (redirect_to) {
            configuration.addInfo = {};
            configuration.addInfo = {
                redirect_path: redirect_to,
            };
        }
        const utm_source = sessionStorage.getItem('utmData');
        configuration.state = { utm_source: utm_source };

        if (typeof window.initVerification === 'function') {
            window.initVerification(configuration);
        } else {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js';

            const handleLoad = () => {
                if (typeof window.initVerification === 'function') {
                    window.initVerification(configuration);
                } else {
                    console.error('initVerification function not found');
                }
            };

            script.addEventListener('load', handleLoad);

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
                script.removeEventListener('load', handleLoad);
            };
        }
    }, []);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/signup'} pathArray={pathArray} />
            <div className="flex flex-col md:flex-row min-h-dvh">
                <div className="w-full md:min-h-dvh flex">
                    <div className=" w-full h-full flex items-center justify-center">
                        <div className="bg-gray-100 h-fit cont w-full items-center lg:gap-16 gap-10 lg:m-14 m-8 lg:p-12 p-6">
                            <div className="cont gap-2">
                                <h2 className="h1 text-center">Sign Up</h2>
                                <p className="text-center">Start your FREE 30-day trial. No credit card needed.</p>
                            </div>
                            <div className="cont gap-8">
                                <div className="min-h-[222px]">
                                    <div id={process.env.NEXT_PUBLIC_REFERENCE_ID} className="loginBtn_google" />
                                </div>
                                <p>
                                    Already have an account?{' '}
                                    <Link
                                        className="active-link text-link"
                                        href={`${process.env.NEXT_PUBLIC_FLOW_URL}?utm_source=${'website'}`}
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 w-full px-12 py-40 cont justify-between">
                    <div className="max-w-[520px] w-full">
                        <h1 className="h1 ">Welcome to viaSocket</h1>
                        <p className="sub__h1">Connect your favorite apps and start automating your work in no time.</p>
                    </div>
                    <div className="cont gap-8">
                        <div className="cont gap-5">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, index) => (
                                    <MdStar key={index} fontSize={24} color="#FDE047" />
                                ))}
                            </div>
                            <p className="text-lg">{testimonials[0]?.testimonial}</p>
                        </div>
                        <div className="flex gap-3">
                            <Image
                                className="rounded-full h-11 w-fit"
                                src={testimonials[0]?.client_img[0]}
                                width={36}
                                height={36}
                                alt=""
                            />
                            <div className="cont">
                                <p className="font-semibold">{testimonials[0]?.given_by}</p>
                                <p className="text-sm">{testimonials[0]?.giver_title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div id={process.env.NEXT_PUBLIC_REFERENCE_ID} className="loginBtn_google" /> */}
        </>
    );
};
export default Login;
