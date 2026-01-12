import AiAgentFeatureOptimized from './AiAgentFeatureOptimized';
import ShowAppsIndexOptimized from './ShowAppsIndexOptimized';
import IntelligentAutomationsSectionOptimized from './IntelligentAutomationsSectionOptimized';
import IndexTemplateComp from '@/components/indexComps/indexTemplateComp';
import ShowDepartmentOptimized from './ShowDepartmentOptimized';
import ReviewIframeOptimized from './ReviewIframeOptimized';
import PanelSectionOptimized from './PanelSectionOptimized';

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
      <div className="my-20 container">
        <div className="flex flex-col border custom-border border-b-0 bg-white">
          <ShowAppsIndexOptimized />
          <IntelligentAutomationsSectionOptimized appCount={appCount} />
        </div>
      </div>

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
      
      {/* Review Section */}
      <div className="bg-[#f9f6f1]">
        <ReviewIframeOptimized reviewData={reviewData} showless={false} />
      </div>

      {/* Panel Section */}
      <div className="py-12 bg-[#f4f3f1] relative">
        <PanelSectionOptimized />
      </div>
    </>
  );
}
