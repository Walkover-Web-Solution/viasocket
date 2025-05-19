
// ==============================================
import FAQSection from '@/components/faqSection/faqSection';
import { useEffect, useState } from 'react';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFaqData, getFooterData, getMetaData, getNavData, getPricingBetterChoice } from '@/utils/getData';
// import { getPricingData } from '@/utils/getPricingData';
import {
    FAQS_FIELDS,
    FOOTER_FIELDS,
    METADATA_FIELDS,
    NAVIGATION_FIELDS,
    PRICINGBETTERCHOICE_FIELDS,
} from '@/const/fields';
import getCountries from '@/utils/getCountries';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getBlogData } from '@/utils/getBlogData';
import { CustomAutocomplete } from '@/components/CustomAutocomplete/CustomAutocomplete';
import { getCountryName } from '@/utils/getCountryName';
import Link from 'next/link';
import getPricingData from '@/utils/getPricingData';

export const runtime = 'experimental-edge';

export default function pricing({ navData, footerData, faqData, metaData, countries, blogData, betterChoiceData }) {
    const [isLoading, setIsLoading] = useState(false);
    const [pricingData, setPricingData] = useState({
        isDevelopment: false,
        currencySymbol: '$',
        starterPlan: '30',
        teamPlan: '60',
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const countryResponse = await getCountryName();
                const fullCountryDetails = countries.find(
                    (country) => country?.country?.toLowerCase() === countryResponse?.toLowerCase()
                );
            } catch (error) {
                console.error('Error initializing country data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const getPlanPrice = (planType, isYearly, applyDiscount = false) => {
        let basePrice = planType === 'starter' ? pricingData.starterPlan : pricingData.teamPlan;
        let numericPrice = parseFloat(basePrice);

        if (applyDiscount) {
            numericPrice = numericPrice * 0.1;
        }
        const finalPrice = isYearly ? numericPrice * 10 : numericPrice;

        return Math.floor(finalPrice).toString();
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <div className="sticky top-0 z-[100] border-b transparent-border-black">
                <Navbar navData={navData} utm={'/pricing'} />
            </div>
            <div className="container cont pb-4 lg:gap-24 gap-6">
                <div className="container pt-20">
                    <div className="flex flex-col text-left gap-2">
                        <h1 className="h1">
                            Build Powerful Automation for <span className="text-accent">Free</span>
                        </h1>
                        <p className="sub__h1 ">
                            Get full access to all the features you need to build and run workflows for free under Fair Usage Policy.
                        </p>
                    </div>
                </div>
                <div class="px-4 pb-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div class="border transparent-border-black bg-white p-12 flex flex-col gap-4">
                        <h3 class="text-xl font-semibold">Free</h3>
                        <strong class="text-3xl">$0</strong>
                        <p class="text-gray-600">For builders who want to explore, experiment, and automate—at no cost.</p>
                        <Link href='https://flow.viasocket.com/?state={%22utm_source%22:%22/%22}&utm_source=/'>
                            <button className="btn btn-primary">Get Started</button>
                        </Link>
                    </div>
                    <div class="border transparent-border-black bg-white p-12 flex flex-col gap-4">
                        <h3 class="text-xl font-semibold">Premium</h3>
                        <strong class="text-3xl">$200</strong>
                        <p class="text-gray-600">Includes $200 in credits to get your workflows built by viaSocket automation experts.</p>
                        <Link href='https://flow.viasocket.com/?state={%22utm_source%22:%22/%22}&utm_source=/'>
                            <button className="btn btn-primary">Get Started</button>
                        </Link>
                    </div>
                    <div class="border transparent-border-black bg-white p-12 flex flex-col gap-4">
                        <h3 class="text-xl font-semibold">Enterprise</h3>
                        <strong class="text-3xl">Contact for pricing</strong>
                        <p class="text-gray-600">Tailored onboarding, support, and features for larger teams and mission-critical workflows.</p>
                        <Link href='https://flow.viasocket.com/?state={%22utm_source%22:%22/%22}&utm_source=/'>
                            <button className="btn btn-primary">Contact sales</button>
                        </Link>
                    </div>
                </div>

                <div className="container bg-white border transparent-border-black p-12">
                    <h2 className='h2 mb-12'>Explore All Features and Start Automating your Tasks for Free</h2>
                    <table className='border transparent-border-black w-full mb-8'>
                        <tr className='border transparent-border-black'>
                            <td className='p-3 border transparent-border-black'>Connect to 1500+ Apps
                            </td>
                            <td className='p-3 border transparent-border-black'>Conditional Workflows / Multiple Paths</td>
                            <td className='p-3 border transparent-border-black'>Memory</td>
                        </tr>
                        <tr className='border transparent-border-black'>
                            <td className='p-3 border transparent-border-black'>Webhooks</td>
                            <td className='p-3 border transparent-border-black'>Custom JS Functions</td>
                            <td className='p-3 border transparent-border-black'>Add Delay</td>
                        </tr>
                        <tr className='border transparent-border-black'>
                            <td className='p-3 border transparent-border-black'>Build Workflows with AI</td>
                            <td className='p-3 border transparent-border-black'>AI Apps</td>
                            <td className='p-3 border transparent-border-black'>Scheduled Workflows</td>
                        </tr>
                        <tr className='border transparent-border-black'>
                            <td className='p-3 border transparent-border-black'>Custom API</td>
                            <td className='p-3 border transparent-border-black'>Human Intervention</td>
                            <td className='p-3 border transparent-border-black'>Unlimited Workflows</td>
                        </tr>
                    </table>
                    <Link href={'/features'} className=''>
                        <button className='btn btn-primary'>Explore Features</button>
                    </Link>
                </div>

                <div className='container bg-white  border transparent-border-black p-12 flex flex-col gap-8'>
                    <h2 className='h2'>Upgrade from Free to Premium and Get Expert Assistance
                    </h2>
                    <p className='sub__h1'>
                        With the viaSocket Premium Plan, you pay $200 and receive an equal amount in credits to use toward having your workflows designed and built by our automation specialists.
                    </p>
                    <Link href='https://flow.viasocket.com/?state={%22utm_source%22:%22/%22}&utm_source=/'>
                        <button className="btn btn-primary">Upgrade to Premium</button>
                    </Link>

                </div>

                <div className="cont lg:gap-36 md:gap-24 gap-12">
                    <BlogGrid posts={blogData} />
                    <div className="cont">
                        {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/pricing'`);
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/pricing'`);
    const countries = await getCountries();
    const blogTags = 'pricing';
    const blogData = await getBlogData({ tag1: blogTags });
    const betterChoiceData = await getPricingBetterChoice(PRICINGBETTERCHOICE_FIELDS);
    return {
        props: {
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            navData: navData || [],
            footerData: footerData || [],
            faqData: faqData || [],
            countries: countries || [],
            blogTags: blogTags || [],
            blogData: blogData || [],
            betterChoiceData: betterChoiceData || [],
        },
    };
}
