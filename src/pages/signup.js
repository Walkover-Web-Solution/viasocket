import { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFooterData, getMetaData, getNavData, getTestimonialData } from '@/utils/getData';
import { FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS, TESTIMONIALS_FIELDS } from '@/const/fields';
import { MdStar } from 'react-icons/md';
import { setUtmInCookies, setUtmSource } from '@/utils/handleUtmSource';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import CustomLogin from '@/components/customLogin/CustomLogin';

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

const Login = ({ metaData, testimonials, pathArray, redirect_to, navData, footerData }) => {
    const [defaultUtmSource, setDefaultUtmSource] = useState('');

    useEffect(() => {
        const utmData = setUtmSource({ source: `signup` });
        setDefaultUtmSource(utmData);
    }, []);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/signup'} pathArray={pathArray} />
                <Navbar navData={navData} utm={'/signup'} />
            <div className="flex flex-col md:flex-row min-h-dvh">
                <div className="w-full md:min-h-dvh flex">
                    <div className=" w-full h-full flex items-center justify-center">
                        <div className="bg-gray-100 h-fit cont w-full items-center lg:gap-16 gap-10 lg:m-14 m-8 lg:p-12 p-6">
                            <div className="cont gap-2">
                                <h2 className="h1 text-center">Sign Up</h2>
                                <p className="text-center">Start your FREE 30-day trial. No credit card needed.</p>
                            </div>
                            <div className="cont gap-8">
                                <CustomLogin redirect_to={redirect_to} />
                                <p>
                                    Already have an account?{' '}
                                    <Link
                                        className="active-link text-link"
                                        href={`${process.env.NEXT_PUBLIC_FLOW_URL}?state=${defaultUtmSource}`}
                                        onClick={() => setUtmInCookies({ source: `signup` })}
                                        rel="nofollow"
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
                        <h1 className="h1  uppercase">Welcome to viaSocket</h1>
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
                                src={testimonials[0]?.client_img[0] || 'https://placehold.co/40x40'}
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
            <div className="container pb-4 mt-12">
                <Footer footerData={footerData} />
            </div>
        </>
    );
};
export default Login;
