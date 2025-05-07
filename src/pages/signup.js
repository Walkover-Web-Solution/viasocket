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
            <div className="flex items-center flex-col md:flex-row gap-10 md:min-h-dvh">
                <div className="bg-gray-100 w-full">
                    <Link href="/">
                        <Image
                            src="/assets/brand/logo.svg"
                            className="h-[48px] w-auto p-3 cursor-pointer"
                            width={60}
                            height={60}
                            alt="viasocket"
                        />
                    </Link>
                    <div className="flex items-center justify-center md:min-h-dvh">
                        <div className="flex flex-col gap-4 p-6">
                            <div className="cont gap-2">
                                <h2 className="h2">Sign up for viaSocket</h2>
                                <p className="text-sm">create a free account or <Link
                                    className="active-link text-link"
                                    href={`${process.env.NEXT_PUBLIC_FLOW_URL}?state=${defaultUtmSource}`}
                                    onClick={() => setUtmInCookies({ source: `signup` })}
                                    rel="nofollow"
                                >
                                    Log in
                                </Link></p>
                            </div>
                            <div className="cont gap-8">
                                <CustomLogin redirect_to={redirect_to} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cont gap-4 bg-white p-6 mr-4 sm:mr-8 md:mr-12 lg:mr-[30px]">
                    <div className="w-[40vw] flex flex-col gap-2">
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
        </>
    );
};
export default Login;
