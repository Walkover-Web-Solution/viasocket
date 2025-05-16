// import FAQSection from '@/components/faqSection/faqSection';
// import { useEffect, useState } from 'react';
// import React from 'react';
// import Navbar from '@/components/navbar/navbar';
// import Footer from '@/components/footer/footer';
// import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
// import {
//     getFaqData,
//     getFooterData,
//     getMetaData,
//     getNavData,
//     getPricingBetterChoice,
//     getPricingFeatureData,
// } from '@/utils/getData';
// // import { getPricingData } from '@/utils/getPricingData';
// import {
//     FAQS_FIELDS,
//     FOOTER_FIELDS,
//     METADATA_FIELDS,
//     NAVIGATION_FIELDS,
//     PRICINGBETTERCHOICE_FIELDS,
//     PRICINGFEATURE_FIELDS,
// } from '@/const/fields';
// import getCountries from '@/utils/getCountries';
// import BlogGrid from '@/components/blogGrid/blogGrid';
// import { getBlogData } from '@/utils/getBlogData';
// import { CustomAutocomplete } from '@/components/CustomAutocomplete/CustomAutocomplete';
// import { getCountryName } from '@/utils/getCountryName';
// import Link from 'next/link';
// import getPricingData from '@/utils/getPricingData';

// export const runtime = 'experimental-edge';

// export default function pricing({
//     navData,
//     footerData,
//     faqData,
//     metaData,
//     countries,
//     blogData,
//     betterChoiceData,
//     features,
//     creditPlan,
// }) {
//     // const [isToggled, setIsToggled] = useState(false);
//     // const [selectedCountry, setSelectedCountry] = useState();
//     // const [inputValue, setInputValue] = useState('');
//     // const [userCountry, setUserCountry] = useState(null);
//     // const [isLoading, setIsLoading] = useState(false);
//     // const [pricingData, setPricingData] = useState({
//     //     isDevelopment: false,
//     //     currencySymbol: '$',
//     //     starterPlan: '30',
//     //     teamPlan: '60',
//     // });
//     // const [selectedIndex, setSelectedIndex] = useState('0');

//     // useEffect(() => {
//     //     const fetchInitialData = async () => {
//     //         setIsLoading(true);
//     //         try {
//     //             const countryResponse = await getCountryName();
//     //             const fullCountryDetails = countries.find(
//     //                 (country) => country?.country?.toLowerCase() === countryResponse?.toLowerCase()
//     //             );
//     //             setUserCountry(fullCountryDetails);
//     //             setSelectedCountry(fullCountryDetails);
//     //         } catch (error) {
//     //             console.error('Error initializing country data:', error);
//     //         } finally {
//     //             setIsLoading(false);
//     //         }
//     //     };

//     //     fetchInitialData();
//     // }, []);

//     // const handleCountrySelect = async (val, item) => {
//     //     setSelectedCountry(item);
//     //     setInputValue(val);
//     //     setIsLoading(true);

//     //     const defaultPricing = {
//     //         isDevelopment: false,
//     //         currencySymbol: '$',
//     //         starterPlan: '30',
//     //         teamPlan: '60',
//     //     };

//     //     if (!item?.codes) {
//     //         setPricingData(defaultPricing);
//     //         setIsLoading(false);
//     //         return;
//     //     }

//     //     try {
//     //         const countryPricingData = await getPricingData(item.codes);
//     //         setPricingData({
//     //             isDevelopment: countryPricingData?.isDevelopment ?? defaultPricing.isDevelopment,
//     //             currencySymbol: countryPricingData?.currencySymbol ?? defaultPricing.currencySymbol,
//     //             starterPlan: countryPricingData?.starterPlan ?? defaultPricing.starterPlan,
//     //             teamPlan: countryPricingData?.teamPlan ?? defaultPricing.teamPlan,
//     //         });
//     //     } catch (error) {
//     //         console.error('Error fetching pricing data for selected country:', error);
//     //         setPricingData(defaultPricing);
//     //     } finally {
//     //         setIsLoading(false);
//     //     }
//     // };

//     // const filterCountries = (query) => {
//     //     if (!query) return countries;

//     //     const lowerQuery = query.toLowerCase();

//     //     return countries
//     //         .filter((country) => country?.country?.toLowerCase().includes(lowerQuery))
//     //         .sort((a, b) => {
//     //             const aStarts = a?.country?.toLowerCase().startsWith(lowerQuery);
//     //             const bStarts = b?.country?.toLowerCase().startsWith(lowerQuery);

//     //             if (aStarts === bStarts) {
//     //                 return a?.country?.localeCompare(b?.country);
//     //             }

//     //             return aStarts ? -1 : 1;
//     //         });
//     // };

//     // const planDetails = [
//     //     {
//     //         name: 'starter',
//     //         slug: 'starter',
//     //         description: 'For Individuals who need higher limits.',
//     //         invocations: '10,000',
//     //         execution_time: 30,
//     //         min_polling_time: 1,
//     //         active_workflows: 'Unlimited',
//     //     },
//     //     {
//     //         name: 'team',
//     //         slug: 'team',
//     //         description: 'For Teams who want to collaborate on work.',
//     //         invocations: '10,000',
//     //         execution_time: 60,
//     //         min_polling_time: 1,
//     //         active_workflows: 'Unlimited',
//     //     },
//     // ];

//     // const getPlanPrice = (planType, isYearly, applyDiscount = false) => {
//     //     let basePrice = planType === 'starter' ? pricingData.starterPlan : pricingData.teamPlan;
//     //     let numericPrice = parseFloat(basePrice);

//     //     if (applyDiscount) {
//     //         numericPrice = numericPrice * 0.1;
//     //     }
//     //     const finalPrice = isYearly ? numericPrice * 10 : numericPrice;

//     //     return Math.floor(finalPrice).toString();
//     // };

//     // return (
//     // <>
//     //     <MetaHeadComp metaData={metaData} page={'/pricing'} />
//     //     {userCountry && (
//     //         <div className="w-full p-2 text-center bg-black">
//     //             <p className="text-sm text-white">
//     //                 <img
//     //                     src={userCountry?.img}
//     //                     alt={`${userCountry?.country} flag`}
//     //                     className="inline-block w-5 h-5 mr-2"
//     //                 />
//     //                 {userCountry?.isdeveloping
//     //                     ? `Hello, it looks like you are from ${userCountry?.country}. As a resident of a developing nation, we're pleased to offer you an exclusive 90% discount.`
//     //                     : `Hello, it looks like you are from the ${userCountry?.country}. We are pleased to offer you an enhanced automation experience with our AI-powered automation solution.`}
//     //             </p>
//     //         </div>
//     //     )}
//     //     <div className="sticky top-0 z-[100] border-b transparent-border-black">
//     //         <Navbar navData={navData} utm={'/pricing'} />
//     //     </div>
//     //     <div className="container cont pb-4 lg:gap-24 gap-6">
//     //         <div className="flex flex-col justify-center gap-6 relative">
//     //             <div className="border border-t-0 transparent-border-black gradient-background">
//     //                 <div className="h-20"></div>
//     //                 <div className="grid grid-cols-1 lg:grid-cols-2">
//     //                     <div className=" flex flex-col gap-6 md:p-12 p-6 justify-center ">
//     //                         <h1 className="h1  ">Simple Pricing for Powerful Automation</h1>
//     //                         <div className="flex flex-row text-xl gap-4">
//     //                             <p>Enjoy a 30-Day Free Trial</p>
//     //                             <p className="border-l transparent-border-black pl-4">No credit card required</p>
//     //                         </div>
//     //                         <div className="border transparent-border-black p-2 w-fit">
//     //                             <p className="text-sm flex flex-wrap items-center gap-2">
//     //                                 <span className="text-3xl text-accent font-bold">Special Offer: 90% off</span>
//     //                                 <span className="inline-block align-middle">for developing countries</span>
//     //                             </p>
//     //                         </div>
//     //                         <div className="flex gap-2 xl:flex-row lg:flex-col md:flex-row flex-col">
//     //                             <CustomAutocomplete
//     //                                 items={filterCountries(inputValue)}
//     //                                 value={inputValue}
//     //                                 onChange={(e) => setInputValue(e.target.value)}
//     //                                 onSelect={handleCountrySelect}
//     //                                 placeholder="Select Country"
//     //                                 defaultCountry={userCountry || selectedCountry}
//     //                             />

//     //                             <label className="border transparent-border-black flex items-center justify-between px-4 py-3 gap-2 w-full max-w-[280px]">
//     //                                 <span className="text-sm  tracking-wider">Billed Yearly</span>
//     //                                 <input
//     //                                     type="checkbox"
//     //                                     className="toggle"
//     //                                     checked={isToggled}
//     //                                     onChange={() => setIsToggled(!isToggled)}
//     //                                 />
//     //                             </label>
//     //                         </div>
//     //                     </div>
//     //                     <div className="grid grid-cols-1 md:grid-cols-2 bg-white ">
//     //                         {isLoading
//     //                             ? [1, 2].map((i) => (
//     //                                   <div
//     //                                       key={i}
//     //                                       className={`flex flex-col justify-between border transparent-border-black border-e-0  border-b-0 border-x-0 ${i == 1 && 'md:border-x'}`}
//     //                                   >
//     //                                       <div className="flex flex-col gap-12 p-8">
//     //                                           <div className="h-8 bg-gray-200 rounded-md w-3/4 skeleton"></div>
//     //                                           <div className="flex flex-col gap-2">
//     //                                               <div className="h-12 bg-gray-200 rounded-md w-1/2 skeleton"></div>
//     //                                               <div className="h-4 bg-gray-200 rounded-md w-1/4 skeleton"></div>
//     //                                           </div>
//     //                                           <ul className="flex flex-col gap-2">
//     //                                               {[1, 2, 3, 4].map((i) => (
//     //                                                   <li
//     //                                                       key={i}
//     //                                                       className="h-4 bg-gray-200 rounded-md skeleton"
//     //                                                   ></li>
//     //                                               ))}
//     //                                           </ul>
//     //                                           <div className="h-4 bg-gray-200 rounded-md w-full skeleton"></div>
//     //                                       </div>
//     //                                       <div className="h-12 bg-gray-200 rounded-none mt-auto skeleton"></div>
//     //                                   </div>
//     //                               ))
//     //                             : planDetails.map((plan, i) => {
//     //                                   return (
//     //                                       <div
//     //                                           key={i}
//     //                                           className={`flex flex-col justify-between border transparent-border-black border-e-0  border-b-0 border-x-0 ${i == 0 && 'md:border-x'}`}
//     //                                       >
//     //                                           <div className="flex flex-col gap-12 p-8">
//     //                                               <h2 className="h2 capitalize ">{plan?.name}</h2>
//     //                                               <div className="flex flex-col gap-2 ">
//     //                                                   <div className="flex flex-wrap items-baseline gap-x-2 min-w-0">
//     //                                                       <h3 className="h1 break-all">
//     //                                                           {pricingData.currencySymbol}
//     //                                                           {getPlanPrice(
//     //                                                               plan.name,
//     //                                                               isToggled,
//     //                                                               pricingData.isDevelopment
//     //                                                           )}
//     //                                                       </h3>
//     //                                                       {pricingData.isDevelopment && (
//     //                                                           <span className="font-base text-2xl text-grey line-through ml-2">
//     //                                                               {pricingData.currencySymbol}
//     //                                                               {getPlanPrice(plan.name, isToggled)}
//     //                                                           </span>
//     //                                                       )}
//     //                                                   </div>
//     //                                                   <span className="text-sm tracking-wider">
//     //                                                       {isToggled ? 'YEAR' : 'MONTH'}/WORKSPACE
//     //                                                   </span>
//     //                                               </div>
//     //                                               <ul className="flex flex-col gap-2">
//     //                                                   <li>
//     //                                                       <span className="text-green-600">✔</span> Invocations:{' '}
//     //                                                       {plan.invocations}/Month
//     //                                                   </li>
//     //                                                   <li>
//     //                                                       <span className="text-green-600">✔</span> Execution Time
//     //                                                       Limit: {plan.execution_time} Seconds
//     //                                                   </li>
//     //                                                   <li>
//     //                                                       <span className="text-green-600">✔</span>Designated
//     //                                                       Technical Support
//     //                                                   </li>
//     //                                                   <li>
//     //                                                       <span className="text-green-600">✔</span>{' '}
//     //                                                       {plan?.active_workflows} Active Workflows
//     //                                                   </li>
//     //                                               </ul>
//     //                                               <h2 className="">{plan?.description}</h2>
//     //                                           </div>
//     //                                           <a
//     //                                               href={`/signup?plan=${plan?.slug}&duration=${isToggled ? 'yearly' : 'monthly'}${selectedCountry?.cca2 ? '&country=' + selectedCountry?.cca2 : ''}&utm_source=/pricing`}
//     //                                           >
//     //                                               <button
//     //                                                   className={`btn btn-primary w-full mt-auto ${i == 0 && 'btn-outline border-0 border-t'}`}
//     //                                               >
//     //                                                   {'Start Free Trial'.toUpperCase()}
//     //                                               </button>
//     //                                           </a>
//     //                                       </div>
//     //                                   );
//     //                               })}
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>

//     //         <div className="border transparent-border-black p-6 md:p-12 flex flex-col gap-6 bg-white">
//     //             <h2 className="h2">Explore Hundreds of Features, Available on Every Plan</h2>
//     //             <p className="sub-h1">Get unrestricted access to all features, no matter your choice of plan.</p>
//     //             <div className="flex justify-start">
//     //                 <Link href={'/features'}>
//     //                     <button className="btn btn-accent">See All Features</button>
//     //                 </Link>
//     //             </div>
//     //         </div>

//     //         <div className=" flex flex-col justify-center">
//     //             <h2 className="h2 p-6">
//     //                 What makes <br /> <span className="text-red-700 italic">viaSocket</span> a better choice ?
//     //             </h2>

//     //             <div className="flex flex-col lg:flex-row border transparent-border-black bg-white">
//     //                 <div className="flex flex-col w-full lg:w-1/2 py-12 md:py-24 px-6 md:px-12 text-base md:text-xl gap-4">
//     //                     {betterChoiceData.length > 0 &&
//     //                         betterChoiceData.map((choice, index) => (
//     //                             <div
//     //                                 key={index}
//     //                                 className={`border-b md:border-b py-3 cursor-pointer ${index === selectedIndex ? 'border-red-300' : ''}`}
//     //                                 onClick={() => setSelectedIndex(index)}
//     //                             >
//     //                                 <div>{choice.name}</div>

//     //                                 {selectedIndex === index && (
//     //                                     <div
//     //                                         className="lg:hidden mt-2 text-base md:text-lg text-gray-700"
//     //                                         style={{
//     //                                             backgroundImage: `url('/assets/img/pricing.png')`,
//     //                                             backgroundSize: 'cover',
//     //                                             backgroundPosition: 'center',
//     //                                         }}
//     //                                     >
//     //                                         <div className=" md:p-8 mx-4 md:mx-24">
//     //                                             <p className="text-base md:text-lg text-white  p-4">
//     //                                                 {choice.description}
//     //                                             </p>
//     //                                         </div>
//     //                                     </div>
//     //                                 )}
//     //                             </div>
//     //                         ))}
//     //                 </div>

//     //                 <div
//     //                     className="lg:flex hidden w-full lg:w-1/2 md:py-12 px-6 md:px-12 bg-opacity-200 "
//     //                     style={{
//     //                         backgroundImage: `url('/assets/img/pricing.png')`,
//     //                         backgroundSize: 'cover',
//     //                         backgroundPosition: 'center',
//     //                     }}
//     //                 >
//     //                     <div className="p-12 h-full flex items-center justify-center">
//     //                         <p className="text-base md:text-lg text-white">
//     //                             {betterChoiceData[selectedIndex]?.description}
//     //                         </p>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>

//     //         <div className=" flex flex-col justify-center py-20">
//     //             <div className=" border border-t-0 transparent-border-black bg-white">
//     //                 <div className="flex items-center justify-center sm:-mt-5 md:-mt-4 lg:-mt-5">
//     //                     <div className="border-t transparent-border-black flex-grow" />
//     //                     <h2 className="h2 ">Free Services for Impactful Organizations</h2>
//     //                     <div className="border-t transparent-border-black flex-grow" />
//     //                 </div>

//     //                 <div className="flex flex-col gap-4 md:gap-8 items-center text-center py-8 transparent-border-black">
//     //                     <div className="sub__h2 text-center">
//     //                         We support organizations driving change with free access to our automation solutions
//     //                     </div>
//     //                     <div className="flex justify-center">
//     //                         <a href="/free-access-programs" target="_blank" className="btn btn-accent">
//     //                             Get Free Access
//     //                         </a>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>

//     //         <div className="cont lg:gap-36 md:gap-24 gap-12">
//     //             <BlogGrid posts={blogData} />
//     //             <div className="cont">
//     //                 {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
//     //                 <Footer footerData={footerData} />
//     //             </div>
//     //         </div>
//     //     </div>
//     // </>
//     // )

//     const pricingPlans = [
//         {
//             name: 'Free',
//             price: '$0/month',
//             subheading: 'For builders who want to explore, experiment, and automate—at no cost, forever',
//             features: ['Perfect for individuals and early-stage users.'],
//             buttonTag: 'Start Free',
//             buttonLink: '/signup?utm_source=pricng/free',
//         },
//         {
//             name: 'Pro',
//             price: '$200/month',
//             subheading: 'Includes $200 in credits to get your workflows built by viaSocket automation experts',
//             features: ['Ideal for teams that want expert guidance and fast setup.'],
//             buttonTag: 'Buy Now',
//             buttonLink: '/signup?utm_source=pricing/pro',
//         },
//         {
//             name: 'Enterprise',
//             price: 'Custom',
//             subheading: 'Tailored onboarding, support, and features for larger teams and mission-critical workflows',
//             features: ['Best for organizations with complex or large-scale automation needs.'],
//             buttonTag: 'Talk to Sales',
//             buttonLink: '/signup?utm_source=pricing/enterprise',
//         },
//     ];

//     return (
//         <>
//             <MetaHeadComp metaData={metaData} page={'/pricing'} />
//             <div className="sticky top-0 z-[100] border-b transparent-border-black">
//                 <Navbar navData={navData} utm={'/pricing'} />
//             </div>

//             <div className="container cont lg:gap-20 md:gap-16 gap-8">
//                 <div className="cont gap-4 mt-20">
//                     <div className="cont gap-1">
//                         <h2 className="h6 text-accent">Start fast. Grow smarter. No credit card required.</h2>
//                         <h1 className="h1">
//                             Build powerful automations for<span className="text-accent"> free</span>
//                         </h1>
//                         <p className="text-base font-medium sm:text-lg md:text-xl ">
//                             viaSocket gives you everything you need to build and run workflows for an entire year -
//                             <br />
//                             completely free. No feature restrictions, no time limits, no hidden fees.
//                         </p>
//                     </div>
//                     <Link href={`/signup?utm_source=pricing`} className="w-fit">
//                         <button className="btn btn-accent">Start Free</button>
//                     </Link>
//                 </div>

//                 <div className="cont gap-4">
//                     <h2 className="h2">Pricing Plans</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3">
//                         {pricingPlans.map((plan, index) => (
//                             <div key={index} className="bg-white cont justify-between h-full">
//                                 <div
//                                     className={`cont gap-4 p-12 border transparent-border-black h-full flex flex-col ${index == 2 ? '' : ' border-r-0'}`}
//                                 >
//                                     <div className="cont gap-1">
//                                         <h2 className="h2">{plan.name}</h2>
//                                         <p className="h3 text-accent font-semibold">{plan.price}</p>
//                                     </div>
//                                     <div className="cont gap-1 flex-grow">
//                                         <p className="text-base font-semibold leading-none">{plan.subheading}</p>
//                                         {/* <ul className="">
//                                             {plan.features.map((feature, idx) => (
//                                                 <li key={idx} className="flex items-center">
//                                                     <span className="leading-none">{feature}</span>
//                                                 </li>
//                                             ))}
//                                         </ul> */}
//                                     </div>
//                                     <Link href={plan.buttonLink}>
//                                         <button className="btn btn-accent">{plan.buttonTag}</button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="cont gap-8 border transparent-border-black p-12 bg-white">
//                     <div className="cont gap-1">
//                         <h2 className="h2">All features. Zero commitment.</h2>
//                         <p className="sub__h2">
//                             viaSocket empowers small businesses to automate repetitive tasks across tools and teams
//                         </p>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                         {features.map((feature, index) => (
//                             <div key={index} className="flex items-start gap-1">
//                                 <p className="text-accent">✔</p>
//                                 <p className="text-lg leading-none">{feature.featurename}</p>
//                             </div>
//                         ))}
//                         <div className="flex items-start gap-1">
//                             <p className="text-accent">+</p>
//                             <Link href="/features" className="text-lg text-accent hover:underline w-fit">
//                                 See all features
//                             </Link>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="cont lg:gap-20 md:gap-16 gap-8 pb-4">
//                     <BlogGrid posts={blogData} />
//                     <div className="cont">
//                         {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
//                         <Footer footerData={footerData} />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export async function getServerSideProps() {
//     const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/pricing'`);
//     const navData = await getNavData(NAVIGATION_FIELDS);
//     const footerData = await getFooterData(FOOTER_FIELDS);
//     const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/pricing'`);
//     const countries = await getCountries();
//     const blogTags = 'pricing';
//     const blogData = await getBlogData({ tag1: blogTags });
//     const betterChoiceData = await getPricingBetterChoice(PRICINGBETTERCHOICE_FIELDS);
//     const features = await getPricingFeatureData(PRICINGFEATURE_FIELDS);

//     const creditPlan = [
//         'One-time payment of $200',
//         'Custom automation built to your exact needs',
//         'Handled entirely by automation experts',
//         'Use credits across multiple workflows',
//         'Includes onboarding and delivery support',
//         'No recurring costs, credits never expire',
//     ];

//     return {
//         props: {
//             metaData: (metaData?.length > 0 && metaData[0]) || {},
//             navData: navData || [],
//             footerData: footerData || [],
//             faqData: faqData || [],
//             countries: countries || [],
//             blogTags: blogTags || [],
//             blogData: blogData || [],
//             betterChoiceData: betterChoiceData || [],
//             features: features || [],
//             creditPlan: creditPlan,
//         },
//     };
// }

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
            <div className="container cont pb-4 lg:gap-24 gap-6">
                <div className="flex flex-col justify-center gap-6 relative">
                    <div className="border border-t-0 transparent-border-black gradient-background">
                        <div className="h-20"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className=" flex flex-col gap-6 md:p-12 p-6 justify-center ">
                                <h1 className="h1  ">Simple Pricing for Powerful Automation</h1>
                                <div className="flex flex-row text-xl gap-4">
                                    <p>Enjoy a 30-Day Free Trial</p>
                                    <p className="border-l transparent-border-black pl-4">No credit card required</p>
                                </div>
                                <div className="border transparent-border-black p-2 w-fit">
                                    <p className="text-sm flex flex-wrap items-center gap-2">
                                        <span className="text-3xl text-accent font-bold">Special Offer: 90% off</span>
                                        <span className="inline-block align-middle">for developing countries</span>
                                    </p>
                                </div>
                                <div className="flex gap-2 xl:flex-row lg:flex-col md:flex-row flex-col">
                                    <CustomAutocomplete
                                        items={filterCountries(inputValue)}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onSelect={handleCountrySelect}
                                        placeholder="Select Country"
                                        defaultCountry={userCountry || selectedCountry}
                                    />

                                    <label className="border transparent-border-black flex items-center justify-between px-4 py-3 gap-2 w-full max-w-[280px]">
                                        <span className="text-sm  tracking-wider">Billed Yearly</span>
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
                                              className={`flex flex-col justify-between border transparent-border-black border-e-0  border-b-0 border-x-0 ${i == 1 && 'md:border-x'}`}
                                          >
                                              <div className="flex flex-col gap-12 p-8">
                                                  <div className="h-8 bg-gray-200 rounded-md w-3/4 skeleton"></div>
                                                  <div className="flex flex-col gap-2">
                                                      <div className="h-12 bg-gray-200 rounded-md w-1/2 skeleton"></div>
                                                      <div className="h-4 bg-gray-200 rounded-md w-1/4 skeleton"></div>
                                                  </div>
                                                  <ul className="flex flex-col gap-2">
                                                      {[1, 2, 3, 4].map((i) => (
                                                          <li
                                                              key={i}
                                                              className="h-4 bg-gray-200 rounded-md skeleton"
                                                          ></li>
                                                      ))}
                                                  </ul>
                                                  <div className="h-4 bg-gray-200 rounded-md w-full skeleton"></div>
                                              </div>
                                              <div className="h-12 bg-gray-200 rounded-none mt-auto skeleton"></div>
                                          </div>
                                      ))
                                    : planDetails.map((plan, i) => {
                                          return (
                                              <div
                                                  key={i}
                                                  className={`flex flex-col justify-between border transparent-border-black border-e-0  border-b-0 border-x-0 ${i == 0 && 'md:border-x'}`}
                                              >
                                                  <div className="flex flex-col gap-12 p-8">
                                                      <h2 className="h2 capitalize ">{plan?.name}</h2>
                                                      <div className="flex flex-col gap-2 ">
                                                          <div className="flex flex-wrap items-baseline gap-x-2 min-w-0">
                                                              <h3 className="h1 break-all">
                                                                  {pricingData.currencySymbol}
                                                                  {getPlanPrice(
                                                                      plan.name,
                                                                      isToggled,
                                                                      pricingData.isDevelopment
                                                                  )}
                                                              </h3>
                                                              {pricingData.isDevelopment && (
                                                                  <span className="font-base text-2xl text-grey line-through ml-2">
                                                                      {pricingData.currencySymbol}
                                                                      {getPlanPrice(plan.name, isToggled)}
                                                                  </span>
                                                              )}
                                                          </div>
                                                          <span className="text-sm tracking-wider">
                                                              {isToggled ? 'YEAR' : 'MONTH'}/WORKSPACE
                                                          </span>
                                                      </div>
                                                      <ul className="flex flex-col gap-2">
                                                          <li>
                                                              <span className="text-green-600">✔</span> Invocations:{' '}
                                                              {plan.invocations}/Month
                                                          </li>
                                                          <li>
                                                              <span className="text-green-600">✔</span> Execution Time
                                                              Limit: {plan.execution_time} Seconds
                                                          </li>
                                                          <li>
                                                              <span className="text-green-600">✔</span>Designated
                                                              Technical Support
                                                          </li>
                                                          <li>
                                                              <span className="text-green-600">✔</span>{' '}
                                                              {plan?.active_workflows} Active Workflows
                                                          </li>
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
