import FAQSection from '@/components/faqSection/faqSection';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFooterData, getPricingFeatureData } from '@/utils/getData';
import { FOOTER_FIELDS, PRICINGFEATURE_FIELDS, COUNTRIES_FIELDS } from '@/const/fields';
import Link from 'next/link';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import PricingTabsClient from '@/components/PricingTabs/PricingTabs';
import getCountries from '@/utils/getCountries';
import { getAppCount } from '@/utils/axiosCalls';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const runtime = 'experimental-edge';

export default function pricing({ footerData, faqData, metaData, features, countries, appCount }) {
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [featuresRef, featuresInView] = useScrollAnimation({ threshold: 0.1 });
    const [pricingRef, pricingInView] = useScrollAnimation({ threshold: 0.1 });

    useEffect(() => {
        setHeroLoaded(true);
    }, []);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <Navbar footerData={footerData} utm={'/pricing'} />
            <div className="container cont pb-4 pt-12 lg:gap-20 md:gap-16 gap-12">
                <div className="cont flex flex-col items-center text-center gap-6">
                    <h1 className={`text-6xl ${heroLoaded ? 'animate-fade-in-up' : ''}`}>
                        Start <span className='text-accent'>free</span> and Pay as you go
                    </h1>
                    <div className={`flex gap-12 justify-center items-center text-2xl mt-2 w-full ${heroLoaded ? 'animate-fade-in-up animation-delay-200' : ''}`}>
                        <div className="flex items-center gap-4">
                            <div className="h-5 w-5 bg-accent" />
                            2,000 tasks/month
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-5 w-5 bg-accent" />
                            500 credits/month
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-5 w-5 bg-accent" />
                            Pay as you go with credit
                        </div>
                    </div>
                    <div className={`cont lg:flex-row items-center gap-2 mt-4 ${heroLoaded ? 'animate-fade-in-scale animation-delay-400' : ''}`}>
                        <Link href="/signup?utm_source=pricing/hero" className="w-full">
                            <button className="btn btn-accent">
                                Start for free
                            </button>
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

                <div ref={featuresRef} className={`scroll-animate ${featuresInView ? 'in-view' : ''}`}>
                    <h2 className="h2">
                        With Access to all our features
                    </h2>
                    <div className="cont gap-8 border custom-border p-6 md:p-12 bg-white mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {features.map((feature, index) => (
                                index === 0 ? (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="h-3 w-3 bg-accent" />
                                        <p className="text-lg leading-tight">Connect to {+appCount + 300}+ apps</p>
                                    </div>
                                ) : (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="h-3 w-3 bg-accent" />
                                        <p className="text-lg leading-tight">{feature.featurename}</p>
                                    </div>
                                )
                            ))}
                            <div className="flex items-start gap-1">
                                <p className="text-accent">+</p>
                                <Link href="/features" className="text-lg text-accent hover:underline w-fit">
                                    See all features
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={pricingRef} className={`scroll-animate-scale ${pricingInView ? 'in-view' : ''}`}>
                    <PricingTabsClient countries={countries} />
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

    return {
        props: {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            features: features || [],
            countries: countries || [],
            appCount: appCount || 0
        },
    };
}
