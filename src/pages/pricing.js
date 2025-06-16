import FAQSection from '@/components/faqSection/faqSection';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFaqData, getFooterData, getMetaData, getPricingFeatureData } from '@/utils/getData';
import { FAQS_FIELDS, FOOTER_FIELDS, METADATA_FIELDS, PRICINGFEATURE_FIELDS } from '@/const/fields';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getBlogData } from '@/utils/getBlogData';
import Link from 'next/link';
import Cta from '@/components/CTA/Cta';


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

            <div className="container cont pb-4 pt-20 lg:gap-20 md:gap-16 gap-12">
                <div className="flex flex-col text-left gap-2">
                    <h1 className="h1">
                        Build Powerful Automation for <span className="text-accent">Free</span>
                    </h1>
                    <p className="sub__h1 ">
                        Get full access to all the features you need to build and run workflows for free under{' '}
                        <Link
                            href="https://viasocket.com/faq/pricing/fair-usage-policy"
                            className=" underline text-accent hover:cursor-pointer"
                        >
                            Fair Usage Policy
                        </Link>
                        .
                    </p>
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="border border-b-0 md:border-r-0 lg:border-b custom-border bg-white p-12 flex flex-col gap-2">
                        <h3 className="h2">Free</h3>
                        <div className="cont gap-1">
                            <p className="h3 text-accent">$0</p>
                            <p className="h6 text-gray-600">
                                Free Plan includes all workflow tools-webhooks, HTTPS API, Human Intervention, cron and
                                1500+ app integrations
                            </p>
                        </div>
                        <Link href="/signup?utm_source=pricing/free">
                            <button className="btn btn-accent">Get Started</button>
                        </Link>
                    </div>
                    <div className="border border-b-0 md:border-b lg:border-r-0 custom-border bg-white p-12 flex flex-col gap-2">
                        <h3 className="h2">Premium</h3>
                        <div className="cont gap-1">
                            <p className="h3 text-accent">$200</p>
                            <p className="h6 text-gray-600">
                                Includes all features plus automation expert support to design and build custom
                                workflows tailored to your business needs
                            </p>
                        </div>
                        <Link href="/signup?utm_source=pricing/premium">
                            <button className="btn btn-accent">Get Started</button>
                        </Link>

                        <Link
                            href="https://viasocket.com/faq/pricing/200-pemium-plan"
                            className="text-accent hover:underline w-fit flex items-center link-btn"
                        >
                            <span>Read more</span>
                            {arrowIcon}
                        </Link>
                    </div>
                    <div className="border custom-border bg-white p-12 flex flex-col gap-2">
                        <h3 className="h2">Enterprise</h3>
                        <div className="cont gap-1">
                            <p className="h3 text-accent">Contact for pricing</p>
                            <p className="h6 text-gray-600">
                                Tailored onboarding, support, and features for larger teams and mission-critical
                                workflows
                            </p>
                        </div>
                        <Link href="/signup?utm_source=pricing/enterprise">
                            <button className="btn btn-accent">Contact sales</button>
                        </Link>
                    </div>
                </div>

                <div className="cont gap-8 border custom-border p-12 bg-white">
                    <h2 className="h2">Explore All Features and Start Automating your Tasks for Free</h2>

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

                <Cta
                    title="Upgrade from Free to Premium and Get Expert Assistance"
                    description="With the viaSocket Premium Plan, you pay $200 and receive an equal amount in credits to use
                    toward having your workflows designed and built by our automation specialists."
                    buttonLabel="Upgrade to Premium"
                    buttonLink={`https://flow.viasocket.com/?state={"utm_source":"pricing/premium"}&utm_source=pricing/premium`}
                />

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

    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/pricing'`, pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/pricing'`, pageUrl);
    const blogTags = 'pricing';
    const blogData = await getBlogData({ tag1: blogTags }, pageUrl);
    const features = await getPricingFeatureData(PRICINGFEATURE_FIELDS, '', pageUrl);
    return {
        props: {
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            footerData: footerData || [],
            faqData: faqData || [],
            blogData: blogData || [],
            features: features || [],
        },
    };
}
