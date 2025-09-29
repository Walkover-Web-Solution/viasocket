import FAQSection from '@/components/faqSection/faqSection';
import React from 'react';
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

export const runtime = 'experimental-edge';

export default function pricing({ footerData, faqData, metaData, features, countries }) {
    const visibleCountries = countries.filter(country => country.isdeveloping === true); 
    
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <Navbar footerData={footerData} utm={'/pricing'} />
            <div className="container cont pb-4 pt-12 lg:gap-20 md:gap-16 gap-12">
                <div className=" cont flex flex-col text-left gap-2">
                    <h1 className="h1 text-center">
                        <span className="text-accent">Pay-As-You-Go </span> Pricing
                    </h1>
                    <h1 className="h1 text-center">
                        for Growing Businesses
                    </h1>
                    <p className="sub__h1 text-center">
                        Build powerful automations with pricing that adapts to your business size and needs.
                    </p>
                </div>
                <PricingTabsClient countries={visibleCountries} />

                <div className="cont gap-8 border custom-border p-12 bg-white">
                    <h2 className="h2">
                        What are Credits?
                    </h2>
                    <p className="sub__h1 ">
                        Credits work like money spend them anywhere across your automations.
                    </p>
                    <ul className="flex flex-col gap-1 pl-5" style={{ listStyleType: 'square' }}>
                        <li className='text-lg'><span className="font-semibold">1 Credit = 2 Tasks</span> – Every credit powers two tasks, giving you extra flexibility.</li>
                        <li className={`text-lg`}><span className="font-semibold">Run Paid Steps</span> – Use credits for advanced features like AI steps without your own OpenAI key.</li>
                        <li className={`text-lg`}><span className="font-semibold">Cover Extra Usage</span> – Never miss a task! Any usage beyond your included plan is automatically covered by your credits.</li>
                        <li className={`text-lg`}><span className="font-semibold">Flexible Top-Ups</span> – $25 = 10,000 credits, available in multiple slabs so you can scale as needed.</li>
                    </ul>
                </div>

                <div className="cont gap-8 border custom-border p-12 bg-white">
                    <h2 className="h2">
                        Explore All Features and Automate Your Tasks for Free—Plus Get Access to Future Features
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="h-3 w-3 bg-accent" />
                                <p className="text-lg leading-tight">{feature.featurename}</p>
                            </div>
                        ))}
                        <div className="flex items-start gap-1">
                            <p className="text-accent">+</p>
                            <Link href="/features" className="text-lg text-accent hover:underline w-fit">
                                See all features
                            </Link>
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
    return {
        props: {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            features: features || [],
            countries: countries || [],
        },
    };
}
