import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarServer from '../components/navbar/NavbarServer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import PricingPlansClient from '../components/pricing/PricingPlansClient';
import { getPricingPageData } from '../lib/pricing-data';
import Link from 'next/link';
import DashboardButton from '@/components/dashboardButton/dashboardButton';
import { getHasToken } from '../lib/getAuth';

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
    const { footerData, faqData, metaData, navbarData } = await getPricingPageData();
    const hasToken = await getHasToken();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/pricing'} />
            </ConditionalNavbar>
            <div className="container cont pb-4 pt-12 lg:gap-20 md:gap-16 gap-12 global-top-space">
                {/* <div className="flex flex-col items-center gap-12 w-full mt-12">
                    <div className="flex flex-col items-center text-center gap-2 pt-8">
                        <h1 className="text-4xl font-bold">
                            Choose the Plan That Fits <span className="text-accent">Your Needs</span>
                        </h1>
                        <p className="text-lg text-gray-500">
                            Keep your automations running smoothly with flexible credits for plugins and extra usage.
                        </p>
                    </div>
                    <PricingPlansClient />
                </div> */}

                <div className="cont w-full flex flex-col items-center gap-8 bg-white border custom-border p-6 md:p-12 text-center access-program text-white">
                    <h2 className="h2 w-full">We Empower Impactful Organizations</h2>
                    <div className="sub__h2 text-center">
                        We support organizations driving change with 3x more access to our automation solutions
                    </div>
                    <a href="/free-access-programs" target="_blank" className="btn btn-accent">
                        Get 3x more
                    </a>
                </div>
                {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
            </div>
            <ConditionalFooter>
                <Footer footerData={footerData} />
            </ConditionalFooter>
        </>
    );
}