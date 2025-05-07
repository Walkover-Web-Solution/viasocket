import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from 'next/link';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import { getFooterData, getIndexFeatures, getMetaData, getNavData } from '@/utils/getData';
import { setUtmSource } from '@/utils/handleUtmSource';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import CustomLogin from '@/components/customLogin/CustomLogin';

export const runtime = 'experimental-edge';

export async function getServerSideProps(context) {
    const { redirect_to } = context?.query;
    const { utm_source } = context?.query;
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/login'`);
    const features = await getIndexFeatures();
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            metaData: [],
            redirect_to: redirect_to || '',
            utm_source: utm_source || 'website',
            features: features || [],
        },
    };
}

const Login = ({ features, metaData, pathArray, redirect_to, navData, footerData }) => {
    let featuresArrOne = [];
    let featuresArrTwo = [];
    features.map((feature) => {
        if (feature?.block_type !== 'R2C2' && feature?.onlogin) {
            featuresArrOne.push(feature);
        }
        if (feature?.block_type === 'R2C2' && feature?.onlogin) {
            featuresArrTwo.push(feature);
        }
    });

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/login'} pathArray={pathArray} />
            <div className="sticky top-0 z-[100] border-b transparent-border-black">
                <Navbar navData={navData} utm={'/signup'} />
            </div>
            <div className="flex flex-col-reverse md:flex-row md:min-h-[calc(100vh-200px)]">
                <div className="md:w-3/5 w-full py-6 px-3 md:p-10 flex flex-col gap-6 md:max-w-4xl md:mx-auto">
                    <div className="text-2xl font-bold">Features</div>
                    <div className="grid grid-cols-2 gap-6">
                        {featuresArrTwo.length > 0 &&
                            featuresArrTwo.map((feature, index) => (
                                <div
                                    key={index}
                                    className="signup_img md:p-6 p-2 bg-[#D8E2DC] flex flex-col col-span-2 gap-6"
                                >
                                    <Image
                                        className="w-full h-auto"
                                        src={feature?.image[1] ? feature.image[1] : 'https://placehold.co/1200x400'}
                                        width={1000}
                                        height={800}
                                        alt="viasocket"
                                    />
                                    <p className="font-medium text-black text-xl">{feature?.name}</p>
                                </div>
                            ))}
                        {featuresArrOne.length > 0 &&
                            featuresArrOne.map((feature, index) => (
                                <div
                                    key={index}
                                    className="md:p-6 p-2 bg-[#F7F7F8] flex flex-col w-auto md:col-span-1 col-span-2"
                                >
                                    <Image
                                        src={feature?.icon[0] ? feature?.icon[0] : '/assets/img/feature_ico.svg '}
                                        width={36}
                                        height={36}
                                        alt="feature_ico"
                                    />
                                    <div className="text-xl font-semibold my-3">{feature?.name}</div>
                                    <p>{feature?.description}</p>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="md:w-2/5 w-full bg-white py-6 px-3 md:p-10 flex flex-col gap-4 md:mt-10">
                    <Link href="/" className="md:hidden block" aria-label="logo">
                        <Image src="/assets/brand/logo.svg" width={158.6} height={40} alt="viasocket" />
                    </Link>

                    <div className="text-2xl font-bold">Login</div>
                    <div id="googleLogin" className="loginBtn_google" />
                    <CustomLogin redirect_to={redirect_to} />
                    <div className="flex">
                        <span className="text-sm">Create a new Account,</span>
                        <Link href="/signup" className="ms-1 text-sm text-sky-700">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container pb-4 mt-6">
                <Footer footerData={footerData} />
            </div>
        </>
    );
};

export default Login;
