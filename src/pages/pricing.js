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
import { FaLeaf } from 'react-icons/fa';

export const runtime = 'experimental-edge';

export default function pricing({ footerData, faqData, metaData, features, countries }) {

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <Navbar footerData={footerData} utm={'/pricing'} />
            <div className="container cont pb-4 pt-12 lg:gap-20 md:gap-16 gap-12">
                <div className="cont flex flex-col items-center text-center gap-6">
                    <h1 className="h1">
                        Start <span className='text-accent'>free</span>  and
                        <br />
                        <span className="">Pay As You Go</span>
                    </h1>
                    <p className="sub__h1">
                        Build powerful automations without upfront costs. Upgrade only when you’re ready.
                    </p>
                    <div className="cont lg:flex-row items-center gap-2 mt-4">
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
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="cont gap-4 border custom-border p-6 lg:p-8 bg-white">
                        <div className='flex gap-4'>
                            <div className="text-accent text-3xl mt-1"><FaLeaf /></div>
                            <h3 className="h2">Forever Free</h3>
                        </div>
                        <p className="text-lg">
                            Every user gets a powerful free plan to start building automations immediately.
                        </p>
                        <ul className="flex flex-col gap-2 text-md mt-2">
                            <li className="flex items-center gap-2">
                                <div className="h-3 w-3 bg-accent" />
                                2,000 tasks/month
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-3 w-3 bg-accent" />
                                500 credits/month
                            </li>
                        </ul>
                    </div>
                    <div className="cont gap-4 border custom-border p-6 lg:p-8 bg-white">
                        <h3 className="h3">Pay As You Go with Credits</h3>
                        <p className="text-lg">
                            Top up with credits anytime you need to use advanced features or go beyond your plan's limits.
                        </p>
                        <p><span className="text-lg text-accent">$25 = 10,000 credits</span><br /> Available in multiple slabs so you can scale as needed.</p>
                    </div>
                </div>

                <div>
                    <h2 className="h2">
                        With Access to all our features
                    </h2>
                    <div className="cont gap-8 border custom-border p-6 md:p-12 bg-white mt-4">
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
                </div>

                <PricingTabsClient countries={countries} />
                
                <div className="cont lg:gap-20 md:gap-16 gap-12">
                    <div className="cont">
                        {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div >
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
