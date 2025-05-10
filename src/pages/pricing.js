import FAQSection from '@/components/faqSection/faqSection';
import { useEffect, useState } from 'react';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFaqData, getFooterData, getMetaData, getNavData, getPricingBetterChoice } from '@/utils/getData';
import getPricingData from '@/utils/getPricingData';
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
import PricingTabs from '@/components/pricingTab/PricingTabs';

export const runtime = 'experimental-edge';

export default function pricing({ navData, footerData, faqData, metaData, countries, blogData, betterChoiceData }) {
    const [isToggled, setIsToggled] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();
    const [inputValue, setInputValue] = useState('');
    const [userCountry, setUserCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pricingData, setPricingData] = useState({
        isDevelopment: false,
        currencySymbol: '$',
        starterPlan: '30',
        teamPlan: '60',
    });
    const [selectedIndex, setSelectedIndex] = useState('0');

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const countryResponse = await getCountryName();
                const fullCountryDetails = countries.find(
                    (country) => country?.country?.toLowerCase() === countryResponse?.toLowerCase()
                );
                setUserCountry(fullCountryDetails);
                setSelectedCountry(fullCountryDetails);
            } catch (error) {
                console.error('Error initializing country data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const handleCountrySelect = async (val, item) => {
        setSelectedCountry(item);
        setInputValue(val);
        setIsLoading(true);

        const defaultPricing = {
            isDevelopment: false,
            currencySymbol: '$',
            starterPlan: '30',
            teamPlan: '60',
        };

        if (!item?.codes) {
            setPricingData(defaultPricing);
            setIsLoading(false);
            return;
        }

        try {
            const countryPricingData = await getPricingData(item.codes);
            setPricingData({
                isDevelopment: countryPricingData?.isDevelopment ?? defaultPricing.isDevelopment,
                currencySymbol: countryPricingData?.currencySymbol ?? defaultPricing.currencySymbol,
                starterPlan: countryPricingData?.starterPlan ?? defaultPricing.starterPlan,
                teamPlan: countryPricingData?.teamPlan ?? defaultPricing.teamPlan,
            });
        } catch (error) {
            console.error('Error fetching pricing data for selected country:', error);
            setPricingData(defaultPricing);
        } finally {
            setIsLoading(false);
        }
    };

    const filterCountries = (query) => {
        if (!query) return countries;

        const lowerQuery = query.toLowerCase();

        return countries
            .filter((country) => country?.country?.toLowerCase().includes(lowerQuery))
            .sort((a, b) => {
                const aStarts = a?.country?.toLowerCase().startsWith(lowerQuery);
                const bStarts = b?.country?.toLowerCase().startsWith(lowerQuery);

                if (aStarts === bStarts) {
                    return a?.country?.localeCompare(b?.country);
                }

                return aStarts ? -1 : 1;
            });
    };

    const planDetails = [
        {
            name: 'starter',
            slug: 'starter',
            description: 'For Individuals who need higher limits.',
            invocations: '10,000',
            execution_time: 30,
            min_polling_time: 1,
            active_workflows: 'Unlimited',
        },
        {
            name: 'team',
            slug: 'team',
            description: 'For Teams who want to collaborate on work.',
            invocations: '10,000',
            execution_time: 60,
            min_polling_time: 1,
            active_workflows: 'Unlimited',
        },
    ];

    const getPlanPrice = (planType, isYearly, applyDiscount = false) => {
        let basePrice = planType === 'starter' ? pricingData.starterPlan : pricingData.teamPlan;
        let numericPrice = parseFloat(basePrice);

        if (applyDiscount) {
            numericPrice = numericPrice * 0.1;
        }
        const finalPrice = isYearly ? numericPrice * 10 : numericPrice;

        return Math.floor(finalPrice).toString();
    };

    const LaunchpadPlan = {
        name: 'Launchpad',
        fetureHeading: 'All power of Growth ,plus',
        feature: ['Free for 6 months', 'No Credit Card Required', 'Cancel Anytime'],
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            {userCountry && (
                <div className="w-full p-2 text-center bg-black">
                    <p className="text-sm text-white">
                        <img
                            src={userCountry?.img}
                            alt={`${userCountry?.country} flag`}
                            className="inline-block w-5 h-5 mr-2"
                        />
                        {userCountry?.isdeveloping
                            ? `Hello, it looks like you are from ${userCountry?.country}. As a resident of a developing nation, we're pleased to offer you an exclusive 90% discount.`
                            : `Hello, it looks like you are from the ${userCountry?.country}. We are pleased to offer you an enhanced automation experience with our AI-powered automation solution.`}
                    </p>
                </div>
            )}
            <div className="sticky top-0 z-[100] border-b transparent-border-black">
                <Navbar navData={navData} utm={'/pricing'} />
            </div>
            <div className="container cont pb-4 lg:gap-20 md:gap-12 gap-6">
                <div className="flex items-center gap-4 pt-36">
                    <div className="cont gap-1">
                        <h1 className="h1 !text-accent">Launchpad Offer</h1>
                        <h2 className="sub__h1">
                            Loved Launchpad? Stay on Growth at $49/mo. Or switch to Starter for just $29.
                        </h2>
                    </div>
                    <div className="relative w-full max-w-xl flex flex-col items-center">
                        {/* The absolute badge, now visually cutting off the border */}
                        <div className="absolute left-1/2 -top-5 -translate-x-1/2 z-10">
                            <span className="bg-black text-white px-6 py-2 h6 border-2 border-white rounded shadow-lg">
                                FREE for First 6 Months
                            </span>
                        </div>
                        <div className="border-2 border-accent bg-white cont gap-8 w-full p-6 flex flex-col pt-12">
                            <div className="cont gap-4 w-full">
                                <div className="cont gap-1">
                                    <h2 className="h2">{LaunchpadPlan.name}</h2>
                                    <p className="text-base text-accent">
                                        All the power of our $50/mo Growth Plan — absolutely free for 6 months.
                                    </p>
                                </div>
                                <p className="h6 !font-semibold">{LaunchpadPlan.fetureHeading} :</p>
                                <ul className="flex flex-col gap-2">
                                    {LaunchpadPlan.feature.map((feature, i) => (
                                        <li key={i} className="flex gap-1">
                                            <span className="text-accent text-base">✔</span>
                                            <span className="text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="btn btn-accent ">Get Started Free</button>
                        </div>
                    </div>
                </div>

                <PricingTabs />

                <div className="border transparent-border-black p-6 md:p-12 flex flex-col gap-6 bg-white">
                    <h2 className="h2">Explore Hundreds of Features, Available on Every Plan</h2>
                    <p className="sub-h1">Get unrestricted access to all features, no matter your choice of plan.</p>
                    <div className="flex justify-start">
                        <Link href={'/features'}>
                            <button className="btn btn-accent">See All Features</button>
                        </Link>
                    </div>
                </div>

                <div className=" flex flex-col justify-center">
                    <h2 className="h2 p-6">
                        What makes <br /> <span className="text-red-700 italic">viaSocket</span> a better choice ?
                    </h2>

                    <div className="flex flex-col lg:flex-row border transparent-border-black bg-white">
                        <div className="flex flex-col w-full lg:w-1/2 py-12 md:py-24 px-6 md:px-12 text-base md:text-xl gap-4">
                            {betterChoiceData.length > 0 &&
                                betterChoiceData.map((choice, index) => (
                                    <div
                                        key={index}
                                        className={`border-b md:border-b py-3 cursor-pointer ${index === selectedIndex ? 'border-red-300' : ''}`}
                                        onClick={() => setSelectedIndex(index)}
                                    >
                                        <div>{choice.name}</div>

                                        {selectedIndex === index && (
                                            <div
                                                className="lg:hidden mt-2 text-base md:text-lg text-gray-700"
                                                style={{
                                                    backgroundImage: `url('/assets/img/pricing.png')`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            >
                                                <div className=" md:p-8 mx-4 md:mx-24">
                                                    <p className="text-base md:text-lg text-white  p-4">
                                                        {choice.description}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>

                        <div
                            className="lg:flex hidden w-full lg:w-1/2 md:py-12 px-6 md:px-12 bg-opacity-200 "
                            style={{
                                backgroundImage: `url('/assets/img/pricing.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="p-12 h-full flex items-center justify-center">
                                <p className="text-base md:text-lg text-white">
                                    {betterChoiceData[selectedIndex]?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" flex flex-col justify-center py-20">
                    <div className=" border border-t-0 transparent-border-black bg-white">
                        <div className="flex items-center justify-center sm:-mt-5 md:-mt-4 lg:-mt-5">
                            <div className="border-t transparent-border-black flex-grow" />
                            <h2 className="h2 ">Free Services for Impactful Organizations</h2>
                            <div className="border-t transparent-border-black flex-grow" />
                        </div>

                        <div className="flex flex-col gap-4 md:gap-8 items-center text-center py-8 transparent-border-black">
                            <div className="sub__h2 text-center">
                                We support organizations driving change with free access to our automation solutions
                            </div>
                            <div className="flex justify-center">
                                <a href="/free-access-programs" target="_blank" className="btn btn-accent">
                                    Get Free Access
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cont lg:gap-36 md:gap-24 gap-12">
                    <BlogGrid posts={blogData} />
                    <div className="container">
                        {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
                    </div>
                    <Footer footerData={footerData} />
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
