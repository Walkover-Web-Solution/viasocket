import BlogGrid from '../blog/BlogGrid';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import Image from 'next/image';
import Link from 'next/link';
import Cta from '@/components/CTA/Cta';
import EmbedSetupSteps from './EmbedSetupSteps';
import EmbedImageSelector from './EmbedImageSelector';
import EmbedHero from './EmbedHero';
import EmbedFeatureCards from './EmbedFeatureCards';
import GetStarted from '@/components/getStarted/getStarted';
import EmbedPricing from './EmbedPricing';
import EmbedChatbotAction from './EmbedChatbotAction';

export default function EmbedContent({
    blogData,
    footerData,
    faqData,
    embedData,
    tableData,
    howItWorksData,
    appCount,
}) {
    return (
        <div className="cont lg:gap-20 md:gap-16 gap-12 global-top-space">
            <div className="w-full container border mt-12">
                <div className="bg-[#C8EAD2] text-center py-3 text-sm text-gray-800">
                    Pay For Month 1. Get 5 Free.{' '}
                    <Link href="/signup?utm_source=/embed" className="font-bold italic underline underline-offset-2">
                        GET STARTED →
                    </Link>
                </div>
                <EmbedHero appCount={appCount} />
                <EmbedFeatureCards />
            </div>

            <EmbedImageSelector embedData={embedData} />

            <EmbedSetupSteps />
            <EmbedPricing />
            <EmbedChatbotAction appCount={appCount} />

            {blogData?.length > 0 && (
                <div className="container">
                    <BlogGrid posts={blogData} />
                </div>
            )}
            <div className="pb-4">
                {faqData?.length > 0 && <FAQSection faqData={faqData} faqName={'/embed'} />}

                <div className="container mb-8">
                    <GetStarted />
                </div>

                <div className="container">
                    <Footer footerData={footerData} />
                </div>
            </div>
        </div>
    );
}
