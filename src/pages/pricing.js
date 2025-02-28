import FAQSection from '@/components/faqSection/faqSection';
import { useEffect, useState } from 'react';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import Link from 'next/link';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFaqData, getFooterData, getMetaData, getNavData, getPricingBetterChoice } from '@/utils/getData';
import {
    FAQS_FIELDS,
    FOOTER_FIELDS,
    METADATA_FIELDS,
    NAVIGATION_FIELDS,
    PRICINGBETTERCHOICE_FIELDS,
} from '@/const/fields';
import Autocomplete from 'react-autocomplete';
import getCountries from '@/utils/getCountries';
import Image from 'next/image';
import checkDevelopingCountry from '@/utils/checkDevelopingCountry';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getBlogData } from '@/utils/getBlogData';

export const runtime = 'experimental-edge';

export default function pricing({ navData, footerData, faqData, betterChoice, metaData, countries, blogData }) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [isToggled, setIsToggled] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();
    const [inputValue, setInputValue] = useState('');
    const [isDeveloping, setIsDeveloping] = useState(false);
    useEffect(() => {
        const fetchCountryData = async () => {
            if (selectedCountry) {
                const country = await checkDevelopingCountry(selectedCountry?.name?.common);
                if (country) {
                    setIsDeveloping(true);
                } else {
                    setIsDeveloping(false);
                }
            } else {
                setIsDeveloping(false);
            }
        };
        fetchCountryData();
    }, [selectedCountry]);

    const filterCountries = (searchTerm) => {
        return countries.filter((country) => country?.name?.common?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    };
    const plans = [
        {
            name: 'starter',
            slug: 'starter',
            pricing: {
                developed: 30,
                developing: 3,
            },
            invocations: 10000,
            execution_time: 30,
            min_polling_time: 1,
            active_workflows: 'Unlimited',
            description: 'For Individuals who need higher limits.',
        },
        {
            name: 'team',
            slug: 'team',
            pricing: {
                developed: 60,
                developing: 6,
            },
            invocations: 10000,
            execution_time: 60,
            min_polling_time: 1,
            active_workflows: 'Unlimited',
            description: 'For Teams who want to collaborate on work.',
        },
    ];

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <div className=" cont pb-4 lg:gap-24 gap-6">
                <div className="cont container ">
                    <Navbar navData={navData} utm={'/pricing'} borderClass={'border-b-0'} />
                    <div className="">
                        <div className=" flex flex-col justify-center gap-6  ">
                            <div className="border border-black gradient-background">
                                <div className="h-28 "></div>
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className=" flex flex-col gap-8 md:p-12 p-6 justify-center ">
                                        <h1 className="h1">Simple Pricing for Powerful Automation</h1>

                                        <ul className="text-lg cont gap-1">
                                            <li>Enjoy a 30-Day Free Trial.</li>
                                            <li>No credit card required.</li>
                                            <li>
                                                <strong>Special Offer:</strong> 90% off for developing countries
                                            </li>
                                        </ul>
                                        <div className="flex gap-2 xl:flex-row lg:flex-col md:flex-row flex-col">
                                            <div
                                                tabIndex={0}
                                                className="dropdown-content flex items-center border border-black menu relative z-[1] w-52 p-2  country-autocomplete"
                                            >
                                                <Autocomplete
                                                    getItemValue={(item) => item?.name?.common}
                                                    items={filterCountries(inputValue)}
                                                    renderItem={(item, isHighlighted) => (
                                                        <div
                                                            className={`px-2 py-1 cursor-pointer flex items-center gap-2 ${
                                                                isHighlighted ? 'bg-secondary' : ''
                                                            }`}
                                                        >
                                                            <Image
                                                                src={item?.flags?.svg || 'http:placehold.co/20x20'}
                                                                width={16}
                                                                height={16}
                                                                alt={item?.flags?.alt}
                                                            />
                                                            {item?.name?.common}
                                                        </div>
                                                    )}
                                                    value={inputValue} // Use the new state variable
                                                    onChange={(e) => setInputValue(e.target.value)} // Update the state on input change
                                                    onSelect={(val, item) => {
                                                        setSelectedCountry(item);
                                                        setInputValue(item?.name?.common); // Update the input value when an item is selected
                                                    }}
                                                    inputProps={{
                                                        placeholder: 'Select Country',
                                                    }}
                                                    menuStyle={{
                                                        position: 'flex',
                                                        overflow: 'auto',
                                                        maxHeight: '400px',
                                                        position: 'absolute',
                                                        background: 'white',
                                                        top: '50px',
                                                        left: '0px',
                                                    }}
                                                />
                                            </div>
                                            <label className=" border border-black flex items-center justify-between px-4 py-3 gap-2 w-full max-w-[280px]">
                                                <span className="text-sm uppercase tracking-wider">Billed Yearly</span>
                                                <input
                                                    type="checkbox"
                                                    className="toggle"
                                                    checked={isToggled}
                                                    onChange={() => setIsToggled(!isToggled)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 bg-white ">
                                        {plans.map((plan, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex flex-col justify-between border border-black border-e-0  border-b-0 border-x-0 ${i == 0 && 'md:border-x'}`}
                                                >
                                                    <div className="flex flex-col gap-12 p-8">
                                                        <h2 className="h2 capitalize ">{plan?.name}</h2>

                                                        <div className="flex flex-col gap-2">
                                                            {!isDeveloping ? (
                                                                <h3 className="h1">
                                                                    $
                                                                    {isToggled
                                                                        ? plan.pricing.developed * 10
                                                                        : plan.pricing.developed}
                                                                </h3>
                                                            ) : (
                                                                <h3 className="h1">
                                                                    $
                                                                    {isToggled
                                                                        ? plan.pricing.developing * 10
                                                                        : plan.pricing.developing}
                                                                    <span className="font-base text-2xl text-grey line-through">
                                                                        $
                                                                        {isToggled
                                                                            ? plan.pricing.developed * 10
                                                                            : plan.pricing.developed}
                                                                    </span>
                                                                </h3>
                                                            )}

                                                            <span className="text-sm tracking-wider">
                                                                {isToggled ? 'YEAR' : 'MONTH'}/WORKSPACE
                                                            </span>
                                                        </div>
                                                        <ul className="flex flex-col gap-2">
                                                            <li>Invocations: {plan.invocations}/Month</li>
                                                            <li>Execution Time Limit: {plan.execution_time} Seconds</li>
                                                            <li>Min. Polling time: {plan?.min_polling_time} Min</li>
                                                            <li>{plan?.active_workflows} Active Workflows</li>
                                                        </ul>
                                                        <h2 className="">{plan?.description}</h2>
                                                    </div>
                                                    <a
                                                        href={`/signup?plan=${plan?.slug}&duration=${isToggled ? 'yearly' : 'monthly'}${selectedCountry?.cca2 ? '&country=' + selectedCountry?.cca2 : ''}&utm_source=/pricing`}
                                                    >
                                                        <button
                                                            className={`btn btn-primary w-full mt-auto ${i == 0 && 'btn-outline border-0 border-t'}`}
                                                        >
                                                            {' '}
                                                            {'Start Free Trial'.toUpperCase()}
                                                        </button>
                                                    </a>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{' '}
                </div>
                <div className="container cont lg:gap-24 gap-6">
                    <div className="border border-black p-6 md:p-12 flex flex-col gap-6">
                        <h2 className="h1 lg:w-1/2">Explore Hundreds of Features, Available on Every Plan</h2>
                        <p className="sub-h1">
                            Get unrestricted access to all features, no matter your choice of plan.
                        </p>
                        <div className="flex justify-start">
                            <Link href={'/features'}>
                                <button className="btn btn-accent">See All Features</button>
                            </Link>
                        </div>
                    </div>
                    {betterChoice?.length > 0 && (
                        <div className=" flex flex-col justify-center">
                            <h2 className="h1 p-6 md:p-12 ">
                                What makes <br /> <span className="text-red-700 italic">viaSocket</span> a better choice
                                ?
                            </h2>

                            <div className="flex flex-col lg:flex-row border border-black">
                                <div className="flex flex-col w-full lg:w-1/2 py-12 md:py-24 px-6 md:px-12 text-base md:text-xl gap-4">
                                    {betterChoice.map((choice, index) => (
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
                                            {betterChoice[selectedIndex]?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className=" flex flex-col justify-center py-48">
                        <div className=" border border-t-0 border-black">
                            <div className="flex items-center justify-center sm:-mt-5 md:-mt-5 lg:-mt-8">
                                <div className="border-t border-black flex-grow" />
                                <h2 className="h1 px-4">Free Services for Impactful Organizations</h2>
                                <div className="border-t border-black flex-grow" />
                            </div>

                            <div className="flex flex-col gap-4 md:gap-8 items-center text-center py-8 border-black">
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
                    <div className="flex flex-col">
                        <div className="container cont pb-36">
                            <BlogGrid posts={blogData} />
                        </div>
                        <div className="flex flex-col border-black border border-b-0 p-6 md:p-12">
                            {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
                        </div>
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
    const betterChoice = await getPricingBetterChoice(PRICINGBETTERCHOICE_FIELDS);
    const countries = await getCountries();
    const blogTags = 'pricing';
    const blogData = await getBlogData(blogTags);
    return {
        props: {
            betterChoice: betterChoice || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            navData: navData || [],
            footerData: footerData || [],
            faqData: faqData || [],
            countries: countries || [],
            blogTags: blogTags || [],
            blogData: blogData || [],
        },
    };
}
