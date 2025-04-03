import FAQSection from '@/components/faqSection/faqSection';
import { useEffect, useState } from 'react';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFaqData, getFooterData, getMetaData, getNavData } from '@/utils/getData';
import getPricingData from '@/utils/getPricingData';
import { FAQS_FIELDS, FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';
import getCountries from '@/utils/getCountries';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getBlogData } from '@/utils/getBlogData';
import { CustomAutocomplete } from '@/components/CustomAutocomplete/CustomAutocomplete';
import { getCountryName } from '@/utils/getCountryName';

export const runtime = 'experimental-edge';

export default function pricing({ navData, footerData, faqData, metaData, countries, blogData }) {
    const [isToggled, setIsToggled] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();
    const [inputValue, setInputValue] = useState('');
    const [apiCountry, setApiCountry] = useState(null);
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
                setApiCountry(countryResponse);
                setSelectedCountry(countryResponse);

                if (countryResponse?.cca2) {
                    try {
                        const countryPricingData = await getPricingData(countryResponse.cca2);
                        if (countryPricingData && typeof countryPricingData === 'object') {
                            setPricingData({
                                isDevelopment: countryPricingData.isDevelopment || false,
                                currencySymbol: countryPricingData.currencySymbol || '$',
                                starterPlan: countryPricingData.starterPlan || '30',
                                teamPlan: countryPricingData.teamPlan || '60',
                            });
                        } else {
                            console.warn('Invalid pricing data received, using defaults');
                            setPricingData({
                                isDevelopment: false,
                                currencySymbol: '$',
                                starterPlan: '30',
                                teamPlan: '60',
                            });
                        }
                    } catch (pricingError) {
                        console.error('Error fetching pricing data:', pricingError);
                        setPricingData({
                            isDevelopment: false,
                            currencySymbol: '$',
                            starterPlan: '30',
                            teamPlan: '60',
                        });
                    }
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

        if (item?.cca2) {
            try {
                const countryPricingData = await getPricingData(item.cca2);

                if (countryPricingData && typeof countryPricingData === 'object') {
                    setPricingData({
                        isDevelopment: countryPricingData.isDevelopment || false,
                        currencySymbol: countryPricingData.currencySymbol || '$',
                        starterPlan: countryPricingData.starterPlan || '30',
                        teamPlan: countryPricingData.teamPlan || '60',
                    });
                } else {
                    console.warn('Invalid pricing data received for selected country, using defaults');
                    setPricingData({
                        isDevelopment: false,
                        currencySymbol: '$',
                        starterPlan: '30',
                        teamPlan: '60',
                    });
                }
            } catch (error) {
                console.error('Error fetching pricing data for selected country:', error);
                setPricingData({
                    isDevelopment: false,
                    currencySymbol: '$',
                    starterPlan: '30',
                    teamPlan: '60',
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            setPricingData({
                isDevelopment: false,
                currencySymbol: '$',
                starterPlan: '30',
                teamPlan: '60',
            });
            setIsLoading(false);
        }
    };

    const filterCountries = (query) => {
        if (!query) return countries;
        return countries.filter((country) => country?.name?.common?.toLowerCase().includes(query.toLowerCase()));
    };

    const planDetails = [
        {
            name: 'starter',
            slug: 'starter',
            description: 'For Individuals who need higher limits.',
            invocations: 10000,
            execution_time: 30,
            min_polling_time: 1,
            active_workflows: 'Unlimited',
        },
        {
            name: 'team',
            slug: 'team',
            description: 'For Teams who want to collaborate on work.',
            invocations: 10000,
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

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            {selectedCountry?.name?.common && (
                <>
                    <div className="w-full p-2 text-center bg-[#0FA388]">
                        <p className="text-lg">
                            <img
                                src={selectedCountry?.flags?.svg}
                                alt={selectedCountry?.flags?.alt || 'Country flag'}
                                className="inline-block w-5 h-5 mr-2"
                            />
                            {pricingData.isDevelopment
                                ? `Hello, it looks like you are from ${selectedCountry?.name?.common}. As a resident of a developing nation, we're pleased to offer you an exclusive 90% discount.`
                                : `Hello, it looks like you are from the ${selectedCountry?.name?.common}. We are pleased to offer you an enhanced automation experience with our AI-powered automation solution.`}
                        </p>
                    </div>
                </>
            )}
            <div className="container sticky top-0 z-[100]">
                <Navbar navData={navData} utm={'/pricing'} />
            </div>
            <div className="container cont pb-4 lg:gap-24 gap-6">
                <div className="flex flex-col justify-center gap-6 relative">
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
                                    <CustomAutocomplete
                                        items={filterCountries(inputValue)}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onSelect={handleCountrySelect}
                                        placeholder="Select Country"
                                        defaultCountry={apiCountry || selectedCountry}
                                    />

                                    <label className="border border-black flex items-center justify-between px-4 py-3 gap-2 w-full max-w-[280px]">
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
                                {isLoading
                                    ? [1, 2].map((i) => (
                                          <div
                                              key={i}
                                              className={`flex flex-col justify-between border border-black border-e-0  border-b-0 border-x-0 ${i == 1 && 'md:border-x'}`}
                                          >
                                              <div className="flex flex-col gap-12 p-8">
                                                  <div className="h-8 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                                                  <div className="flex flex-col gap-2">
                                                      <div className="h-12 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
                                                      <div className="h-4 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
                                                  </div>
                                                  <ul className="flex flex-col gap-2">
                                                      {[1, 2, 3, 4].map((i) => (
                                                          <li
                                                              key={i}
                                                              className="h-4 bg-gray-200 rounded-md animate-pulse"
                                                          ></li>
                                                      ))}
                                                  </ul>
                                                  <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
                                              </div>
                                              <div className="h-12 bg-gray-200 rounded-none mt-auto animate-pulse"></div>
                                          </div>
                                      ))
                                    : planDetails.map((plan, i) => {
                                          return (
                                              <div
                                                  key={i}
                                                  className={`flex flex-col justify-between border border-black border-e-0  border-b-0 border-x-0 ${i == 0 && 'md:border-x'}`}
                                              >
                                                  <div className="flex flex-col gap-12 p-8">
                                                      <h2 className="h2 capitalize ">{plan?.name}</h2>
                                                      <div className="flex flex-col gap-2">
                                                          <h3 className="h1">
                                                              {pricingData.currencySymbol}
                                                              {getPlanPrice(
                                                                  plan.name,
                                                                  isToggled,
                                                                  pricingData.isDevelopment
                                                              )}
                                                              {pricingData.isDevelopment && (
                                                                  <span className="font-base text-2xl text-grey line-through ml-2">
                                                                      {pricingData.currencySymbol}
                                                                      {getPlanPrice(plan.name, isToggled)}
                                                                  </span>
                                                              )}
                                                          </h3>
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
                <div className="cont lg:gap-36 md:gap-24 gap-12">
                    <BlogGrid posts={blogData} />
                    <div>
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

    const countries = await getCountries();
    const blogTags = 'pricing';
    const blogData = await getBlogData(blogTags);
    return {
        props: {
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
