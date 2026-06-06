import IndexTemplateComp from '@/components/indexComps/indexTemplateComp';
import ShowDepartmentOptimized from './ShowDepartmentOptimized';
import ReviewIframeOptimized from './ReviewIframeOptimized';
import ShowBadges from './ShowBadges';
import EmbedSection from '@/app/components/home/EmbedSection';
import StoriesSection from './StoriesSection';

export default function MainContent({ indexTemplateData, templateData, reviewData, clientStories }) {
    return (
        <>
            <div
                className="py-20 relative overflow-hidden"
                style={{
                    position: 'relative',
                }}
            >
                {/* Blurred background */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('/review-image/nevada.webp')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        filter: 'blur(2px)',
                    }}
                ></div>
                <div className="relative">
                    <IndexTemplateComp categories={indexTemplateData} templates={templateData} />
                </div>
            </div>

            <ShowDepartmentOptimized />

            <EmbedSection />

            <div className="bg-white">
                <ShowBadges />
            </div>

            <StoriesSection stories={clientStories} />

            {/* Review Section */}
            <div className="bg-[#f9f6f1]">
                <ReviewIframeOptimized reviewData={reviewData} showless={false} />
            </div>
        </>
    );
}
