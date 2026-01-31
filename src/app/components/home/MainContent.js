import AiAgentFeatureOptimized from './AiAgentFeatureOptimized';
import ShowAppsIndexOptimized from './ShowAppsIndexOptimized';
import IndexTemplateComp from '@/components/indexComps/indexTemplateComp';
import ShowDepartmentOptimized from './ShowDepartmentOptimized';
import ReviewIframeOptimized from './ReviewIframeOptimized';
import ShowBadges from './ShowBadges';
// import PanelSectionOptimized from './PanelSectionOptimized';

export default function MainContent({
  appCount,
  indexTemplateData,
  templateData,
  reviewData
}) {
  return (
    <>
      {/* AI Agents Section */}
      <AiAgentFeatureOptimized />

      {/* Show Apps Section */}
      <ShowAppsIndexOptimized isHomePage={true} />

      {/* Template Section - Only show when user is not searching */}
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

      <div className="bg-white">
        <ShowBadges />
      </div>

      {/* Review Section */}
      <div className="bg-[#f9f6f1]">
        <ReviewIframeOptimized reviewData={reviewData} showless={false} />
      </div>

      {/* Panel Section */}
      {/* <div className="py-12 bg-[#f4f3f1] relative">
        <PanelSectionOptimized />
      </div> */}
    </>
  );
}
