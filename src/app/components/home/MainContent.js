import IndexTemplateComp from '@/components/indexComps/indexTemplateComp';
import ShowDepartmentOptimized from './ShowDepartmentOptimized';
import ReviewIframeOptimized from './ReviewIframeOptimized';
import ShowBadges from './ShowBadges';
import EmbedSection from '@/app/components/home/EmbedSection';
import StoriesSection from './StoriesSection';

export default function MainContent({ indexTemplateData, templateData, reviewData, clientStories, appCount }) {
    return (
        <>
            <IndexTemplateComp categories={indexTemplateData} templates={templateData} />

            <ShowDepartmentOptimized />

            <EmbedSection appCount={appCount} />

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
