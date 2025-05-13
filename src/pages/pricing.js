import FAQSection from '@/components/faqSection/faqSection';
import { useEffect, useState } from 'react';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFaqData, getFooterData, getMetaData, getNavData, getPricingBetterChoice } from '@/utils/getData';
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
import { getPricingPlan } from '@/utils/getPricingPlan';

export const runtime = 'experimental-edge';

export default function pricing({ navData, footerData, faqData, metaData, countries, blogData, betterChoiceData }) {
    const [selectedCountry, setSelectedCountry] = useState();
    const [inputValue, setInputValue] = useState('');
    const [userCountry, setUserCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState('0');
    const [isYearly, setIsYearly] = useState(true);
    const [isDeveloping, setIsDeveloping] = useState(false);
    const [pricingPlan, setPricingPlan] = useState([]);

    const fetchPricingPlan = async (country_code) => {
        try {
            const pricingPlan = await getPricingPlan(country_code);
            setPricingPlan(pricingPlan);
            setIsDeveloping(pricingPlan[0].isDeveloping);
            console.log(pricingPlan[0].isDeveloping);
        } catch (error) {
            console.error('Error fetching pricing plan:', error);
        }
    };

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
                if (fullCountryDetails?.codes) {
                    await fetchPricingPlan(fullCountryDetails.codes);
                }
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
        if (item?.codes) {
            await fetchPricingPlan(item.codes);
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

    const getDisplayedPrice = (plan) => {
        if (!plan?.pricing) return null;
        let basePrice = Number(plan?.pricing);
        let priceToShow;
        if (isYearly) {
            priceToShow = basePrice * 0.8;
        } else {
            priceToShow = basePrice;
        }
        if (isDeveloping) {
            priceToShow = priceToShow * 0.1;
        }
        return priceToShow % 1 === 0 ? priceToShow.toFixed(0) : priceToShow.toFixed(2);
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
                <div className="flex flex-col lg:flex-row gap-12 items-center justify-between md:gap-20 pt-24 md:pt-24 w-full">
                    <div className="cont gap-1">
                        <h1 className="h1">Launchpad Offer</h1>
                        <h3 className="text-base font-medium sm:text-lg md:text-xl  text-black text-start">
                            Your 6-month head start to Intelligent Automations
                        </h3>
                    </div>
                    <div className="relative xl:w-[26vw] md:w-1/3 flex flex-col items-center mt-8 md:mt-0">
                        {/* Responsive absolute badge */}
                        <div className="flex justify-center w-full">
                            <div className="absolute left-1/2 top-[-12px] -translate-x-1/2 z-10 ">
                                <span className="bg-black text-white px-6 py-2 border transparent-border-black border-white rounded shadow-lg text-nowrap">
                                    FREE for First 6 Months
                                </span>
                            </div>
                        </div>
                        <div className="border transparent-border-black bg-white cont gap-12 w-full p-6 flex justify-center items-center flex-col pt-8 sm:pt-12">
                            <div className="cont gap-4 w-full">
                                <div className="cont gap-3">
                                    <h3 className="h3">{pricingPlan[0]?.name}</h3>
                                    <p className="text-base text-accent">{pricingPlan[0]?.feature_headline}</p>
                                </div>
                                <ul className="flex flex-col gap-2">
                                    {pricingPlan[0]?.features.map((feature, i) => (
                                        <li key={i} className="flex gap-1">
                                            <span className="text-accent text-base">✔</span>
                                            <span className="text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="btn btn-accent">{pricingPlan[0]?.button_tag}</button>
                        </div>
                    </div>
                </div>

                <CustomAutocomplete
                    items={filterCountries(inputValue)}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onSelect={handleCountrySelect}
                    placeholder="Select Country"
                    defaultCountry={userCountry || selectedCountry}
                />

                <h2 className="h2">
                    <span className="text-accent">Loved Launchpad? </span>
                    <p className="text-lg">Stay on Growth at $49/mo. Or switch to Starter for just $29.</p>
                </h2>
                <div>
                    <div className="flex justify-start w-full">
                        <div className="flex items-center">
                            <button
                                className={`px-4 py-2 border transparent-border-black border-b-0 border-r-0 ${!isYearly ? 'bg-accent text-white' : 'text-black'}`}
                                onClick={() => setIsYearly(false)}
                            >
                                Monthly
                            </button>
                            <button
                                className={`px-4 py-2 border transparent-border-black border-b-0 ${isYearly ? 'bg-accent text-white' : 'text-gray-600'}`}
                                onClick={() => setIsYearly(true)}
                            >
                                Yearly (20% off)
                            </button>
                        </div>
                    </div>

                    {/* Pricing Table */}
                    <div className="w-full bg-white overflow-x-auto">
                        {/* Pricing Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xl:grid-cols-5 pricing-grid-card">
                            {pricingPlan.map(
                                (plan, index) =>
                                    index > 0 && (
                                        <div
                                            key={index}
                                            className="p-6 flex flex-col gap-4 border transparent-border-black"
                                        >
                                            <h3 className="h3">{plan?.name}</h3>
                                            <div className="cont gap-1">
                                                <div className="h3 text-accent">
                                                    {plan?.name !== 'Enterprise' ? (
                                                        plan?.pricing ? (
                                                            <>
                                                                {plan?.currencySymbol}
                                                                {getDisplayedPrice(plan)}
                                                                <span className="text-sm text-gray-700">/month</span>
                                                            </>
                                                        ) : (
                                                            <span>{plan?.pricing}</span>
                                                        )
                                                    ) : (
                                                        <p className="h3">Talk to Sales</p>
                                                    )}
                                                </div>
                                                <div className="text-base text-gray-700">{plan?.invocations}</div>
                                            </div>

                                            <div className="cont gap-2">
                                                <p className="h6 !font-semibold">{plan?.feature_headline}</p>
                                                <ul className="">
                                                    {plan?.features.map((feature, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="text-accent">✔</span>
                                                            <span className="text-base">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="mt-auto pt-4">
                                                <button className={`btn w-full btn-primary`}>{plan?.button_tag}</button>
                                            </div>
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </div>

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
                            <h2 className="h2">Free Services for Impactful Organizations</h2>
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
                    <div className="container">
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
