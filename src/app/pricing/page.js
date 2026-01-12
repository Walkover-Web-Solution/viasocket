import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarOptimized from '../components/navbar/NavbarOptimized';
import PricingTabsClient from '../components/pricing/PricingTabsClient';
import { getPricingPageData } from '../lib/pricing-data';
import Link from 'next/link';
import { GiCheckMark } from 'react-icons/gi';
import DashboardButton from '@/components/dashboardButton/dashboardButton';

export const runtime = 'edge';

export async function generateMetadata() {
  const { metaData } = await getPricingPageData();
  
  return {
    title: metaData?.title || 'Pricing - viaSocket',
    description: metaData?.description || 'Start free and pay as you go with viaSocket',
    keywords: metaData?.keywords || '',
    openGraph: {
      title: metaData?.title || 'Pricing - viaSocket',
      description: metaData?.description || 'Start free and pay as you go with viaSocket',
      images: metaData?.image ? [{ url: metaData.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData?.title,
      description: metaData?.description,
      images: metaData?.image ? [metaData.image] : undefined,
    },
  };
}

export default async function PricingPage() {
    const { footerData, faqData, metaData, features, countries, appCount, navbarData } = await getPricingPageData();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <NavbarOptimized navbarData={navbarData} utm={'/pricing'} />
            <div className="container cont pb-4 pt-12 lg:gap-20 md:gap-16 gap-12 global-top-space">
                <div className="cont flex flex-col items-center text-center gap-6">
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl">
                            Start <span className="text-accent">free</span> and pay as you go
                        </h1>
                        <h2 className="text-2xl max-w-[650px]">
                            Top up with{' '}
                            <Link href="#pricingTabs" className="border-b-2 custom-border border-dotted">
                                <span>credits</span>
                            </Link>{' '}
                            anytime. Use them for paid built-in plugs or extra tasks to keep your automations running.
                        </h2>
                    </div>
                    <div className="cont lg:flex-row items-center gap-2 mt-4">
                        <DashboardButton utm_src={"/pricing/hero"} className="w-full" />
                        <Link
                            href="https://cal.id/team/viasocket/workflow-setup-discussion"
                            className="btn btn-outline"
                            target="_blank"
                        >
                            Free call with automation experts
                        </Link>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="gap-8 border custom-border p-6 md:p-12 bg-[#faf9f6] mt-4 max-w-[1000px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-[max-content_max-content_max-content] gap-4 gap-x-20">
                            {features.map((feature, index) =>
                                index === 0 ? (
                                    <div key={index} className="flex items-center gap-2">
                                        <GiCheckMark className="text-accent" />
                                        <p className="text-lg leading-tight">Connect to {+appCount + 300}+ apps</p>
                                    </div>
                                ) : (
                                    <div key={index} className="flex items-center gap-2">
                                        <GiCheckMark className="text-accent" />
                                        <p className="text-lg leading-tight">{feature.featurename}</p>
                                    </div>
                                )
                            )}
                            <div className="flex items-start gap-1">
                                <p className="text-accent">+</p>
                                <Link
                                    href="/features"
                                    target="_blank"
                                    className="text-lg text-accent hover:underline w-fit"
                                >
                                    See all features
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="pricingTabs">
                    <PricingTabsClient countries={countries} />
                </div>

                <div className="cont flex items-center justify-center w-full">
                    <div className="cont w-full flex flex-col items-center gap-8 justify-center bg-white border custom-border p-6 md:p-12 text-center access-program text-white">
                        <div className="flex items-center justify-center">
                            <h2 className="h2 w-full">We Empower Impactful Organizations</h2>
                        </div>
                        <div className="sub__h2 text-center">
                            We support organizations driving change with 3x more access to our automation solutions
                        </div>
                        <div className="flex justify-center">
                            <a href="/free-access-programs" target="_blank" className="btn btn-accent">
                                Get 3x more
                            </a>
                        </div>
                    </div>
                </div>
                {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
                <div className="container">
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
    );
}