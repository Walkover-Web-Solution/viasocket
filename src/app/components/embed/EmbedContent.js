import BlogGrid from '../blog/BlogGrid';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import Link from 'next/link';
import EmbedSetupSteps from './EmbedSetupSteps';
import EmbedImageSelector from './EmbedImageSelector';
import EmbedHero from './EmbedHero';
import EmbedFeatureCards from './EmbedFeatureCards';
import GetStarted from '@/components/getStarted/getStarted';
import EmbedPricing from './EmbedPricing';
import EmbedChatbotAction from './EmbedChatbotAction';
import ShowBadges from '../home/ShowBadges';
import SecuritySection from '../SecuritySection';

export default function EmbedContent({ blogData, footerData, faqData, embedData, appCount, securityGridData }) {
    return (
        <div className="cont lg:gap-20 md:gap-16 gap-12 global-top-space container">
            <div className="w-full border mt-12">
                <EmbedHero appCount={appCount} />
                <EmbedFeatureCards />
            </div>

            <EmbedImageSelector embedData={embedData} />

            <EmbedSetupSteps />
            <EmbedPricing />
            <EmbedChatbotAction appCount={appCount} />

            <ShowBadges />
            <SecuritySection securityGridData={securityGridData} />

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
