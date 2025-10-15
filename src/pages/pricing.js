import FAQSection from '@/components/faqSection/faqSection';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFooterData, getPricingFeatureData, getNavbarData } from '@/utils/getData';
import { FOOTER_FIELDS, PRICINGFEATURE_FIELDS, COUNTRIES_FIELDS, NAVBAR_FIELDS } from '@/const/fields';
import Link from 'next/link';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import PricingTabsClient from '@/components/PricingTabs/PricingTabs';
import getCountries from '@/utils/getCountries';
import { getAppCount } from '@/utils/axiosCalls';
import { GiCheckMark } from 'react-icons/gi';

export const runtime = 'experimental-edge';

export default function pricing({ footerData, faqData, metaData, features, countries, appCount, navbarData }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <Navbar navbarData={navbarData} utm={'/pricing'} />
            <div className="container cont pb-4 pt-12 lg:gap-20 md:gap-16 gap-12 global-top-space">
                <div className="cont flex flex-col items-center text-center gap-6">
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl">
                            Start <span className="text-accent">free</span> and pay as you go
                        </h1>
                        <h2 className="text-2xl max-w-[650px]">
                            Top up with{' '}
                            <Link href="#pricingTabs" className="border-b-2 custom-border border-dotted">
                                <span>credits</span>
                            </Link>{' '}
                            anytime. Use them for paid built-in plugs or extra tasks to keep your automations running.
                        </h2>
                    </div>
                    <div className="cont lg:flex-row items-center gap-2 mt-4">
                        <Link href="/signup?utm_source=pricing/hero" className="w-full">
                            <button className="btn btn-accent">Start for free</button>
                        </Link>
                        <Link
                            href="https://cal.id/team/viasocket/workflow-setup-discussion"
                            className="btn btn-outline"
                            target="_blank"
                        >
                            Free call with automation experts
                        </Link>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="gap-8 border custom-border p-6 md:p-12 bg-[#faf9f6] mt-4 max-w-[1000px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-[max-content_max-content_max-content] gap-4 gap-x-20">
                            {features.map((feature, index) =>
                                index === 0 ? (
                                    <div key={index} className="flex items-center gap-2">
                                        <GiCheckMark className="text-accent"/>
                                        <p className="text-lg leading-tight">Connect to {+appCount + 300}+ apps</p>
                                    </div>
                                ) : (
                                    <div key={index} className="flex items-center gap-2">
                                        <GiCheckMark className="text-accent"/>
                                        <p className="text-lg leading-tight">{feature.featurename}</p>
                                    </div>
                                )
                            )}
                            <div className="flex items-start gap-1">
                                <p className="text-accent">+</p>
                                <Link
                                    href="/features"
                                    target="_blank"
                                    className="text-lg text-accent hover:underline w-fit"
                                >
                                    See all features
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="pricingTabs">
                    <PricingTabsClient countries={countries} />
                </div>

                <div className="cont flex items-center justify-center w-full">
                    <div className="cont w-full flex flex-col items-center gap-8 justify-center bg-white border custom-border p-6 md:p-12 text-center access-program text-white">
                        <div className="flex items-center justify-center">
                            <h2 className="h2 w-full">We Empower Impactful Organizations</h2>
                        </div>
                        <div className="sub__h2 text-center">
                            We support organizations driving change with 3x more access to our automation solutions
                        </div>
                        <div className="flex justify-center">
                            <a href="/free-access-programs" target="_blank" className="btn btn-accent">
                                Get 3x more
                            </a>
                        </div>
                    </div>
                </div>

                <div className="cont lg:gap-20 md:gap-16 gap-12">
                    <div className="cont">
                        {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const metaData = await getMetaData('/pricing', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const faqData = await getFaqData('/pricing', pageUrl);
    const features = await getPricingFeatureData(PRICINGFEATURE_FIELDS, '', pageUrl);
    const countries = await getCountries(COUNTRIES_FIELDS, '', pageUrl);
    const appCount = await getAppCount(pageUrl);
    const navbarData = await getNavbarData(NAVBAR_FIELDS, '', pageUrl);

    return {
        props: {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            features: features || [],
            countries: countries || [],
            appCount: appCount || 0,
            navbarData: navbarData || [],
        },
    };
}
