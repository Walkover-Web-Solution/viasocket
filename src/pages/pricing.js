import FAQSection from '@/components/faqSection/faqSection';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFooterData, getPricingFeatureData } from '@/utils/getData';
import { FOOTER_FIELDS, PRICINGFEATURE_FIELDS } from '@/const/fields';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getBlogData } from '@/utils/getBlogData';
import Link from 'next/link';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import Countdown from 'react-countdown';

export const runtime = 'experimental-edge';

const arrowIcon = (
    <svg viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
        <g className="arrow-head">
            <path d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <g className="arrow-body">
            <path d="M3.5 4.5H0" stroke="currentColor" strokeWidth="1.5" />
        </g>
    </svg>
);

export default function pricing({ footerData, faqData, metaData, blogData, features }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <Navbar footerData={footerData} utm={'/pricing'} />

            <div className="container cont pb-4 pt-12 lg:gap-20 md:gap-16 gap-12">
                <div className="flex flex-col text-left gap-2">
                    <h1 className="h1">
                        Lifetime <span className="text-accent">Free</span> Access to Intelligent Automation – Extended
                    </h1>
                    <p className="sub__h1 ">
                        The response has been incredible, so we’re giving you 15 more days to grab Lifetime Free Access!
                        Don’t wait—sign up now.
                    </p>

                    <div className="flex items-center gap-8 mt-5">
                        <Link href="/signup?utm_source=/pricing" className="btn btn-accent">
                            Sign up for free
                        </Link>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Offer expires in</p>
                            <Countdown
                                date={new Date('2025-09-17')}
                                renderer={({ days, hours, minutes, seconds }) => (
                                    <div className="flex space-x-4 flex-wrap">
                                        <div className="flex items-center space-x-2">
                                            <div className="text-2xl font-bold text-gray-800">{days}</div>
                                            <div className="text-sm text-gray-500">DAYS</div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-2xl font-bold text-gray-800">{hours}</div>
                                            <div className="text-sm text-gray-500">HOURS</div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-2xl font-bold text-gray-800">{minutes}</div>
                                            <div className="text-sm text-gray-500">MINUTES</div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-2xl font-bold text-gray-800">{seconds}</div>
                                            <div className="text-sm text-gray-500">SECONDS</div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="cont gap-8 border custom-border p-12 bg-white">
                    <h2 className="h2">Don’t miss the limited time opportunity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div
                            className="p-8 flex flex-col gap-6 border custom-border"
                            style={{ boxShadow: '0 3px 3px -2px #0003, 0 3px 4px #00000024, 0 1px 8px #0000001f' }}
                        >
                            <div className="flex flex-col">
                                <h2 className="h2">Lifetime Free Access</h2>
                                <p className="flex items-center gap-2 text-3xl text-accent">
                                    <strike className="sub__h1">$50/month</strike>
                                    <span>$0</span>
                                </p>
                                <p>
                                    <span>
                                        Sign up before 17th September and keep using the viasocket forever under fair
                                        usage policy.
                                    </span>{' '}
                                    <a
                                        target="_blank"
                                        className="hover:underline text-accent"
                                        href="https://viasocket.com/faq/viasocket-mcp/fair-usage-policy"
                                    >
                                        fair usage policy
                                    </a>
                                </p>
                            </div>
                            <div className="bottom-section">
                                <h3 className="text-lg font-semibold">What's Included:</h3>
                                <ul className="pl-1 flex flex-col gap-2">
                                    <li className="flex items-center gap-2">
                                        <div className="h-3 w-3 bg-accent"></div>
                                        <span>100% Free Support</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-3 w-3 bg-accent"></div>
                                        <span>Access to All Features</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-3 w-3 bg-accent"></div>
                                        <span>Access to All Upcoming Features</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                {' '}
                                <Link
                                    href="/signup?utm_source=/pricing"
                                    className="btn border custom-border btn-accent"
                                >
                                    Sign up now
                                </Link>
                                <Link
                                    target="_blank"
                                    href="https://viasocket.com/faq/pricing/lifetime-free-access-limited-time-offer"
                                    className="btn border custom-border btn-outline"
                                >
                                    Learn more
                                </Link>
                            </div>
                        </div>

                        <div className="p-8 text-gray-500 hover:text-black border custom-border">
                            <h2 className="h2">Paid Plan</h2>
                            <p className="text-3xl text-accent">$50/month</p>
                            <p>
                                For new users starting 17th September, pricing will apply. Existing users who sign up
                                before the deadline will continue with their Lifetime Free Access.
                            </p>
                        </div>
                    </div>
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

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const metaData = await getMetaData('/pricing', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const faqData = await getFaqData('/pricing', pageUrl);
    const blogTags = 'pricing';
    const blogData = await getBlogData({ tag1: blogTags }, pageUrl);
    const features = await getPricingFeatureData(PRICINGFEATURE_FIELDS, '', pageUrl);
    return {
        props: {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            blogData: blogData || [],
            features: features || [],
        },
    };
}
