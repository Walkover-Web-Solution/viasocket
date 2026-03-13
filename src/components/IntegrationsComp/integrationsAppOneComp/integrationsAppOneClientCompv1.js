import { SectionBand, SectionDivider } from "./shared";
import HeroSection from "./heroSection";
import TemplatesSection from "./templatesSection";
import ConnectAppsSection from "./connectAppsSection";
import TriggersActionsSection from "./triggersActionsSection";
import ReadyToUseSection from "./readyToUseSection";
import SupportSection from "./supportSection";
import TutorialsSection from "./tutorialsSection";
import BlogsSection from "./blogsSection";
import FAQs from "@/app/components/new-home/FAQs";
import AboutCardsSection from "./aboutCardsSection";
import FooterNew from "@/app/components/new-home/FooterNew";

export default function IntegrationsAppOneClientCompv1({
  appOneDetails,
  combosData,
  pageInfo,
  integrationsInfo,
  apps,
  faqData,
  appData,
  footerData,
  blogsData,
  videoData,
  appCount,
  getDoFollowUrlStatusArray,
  templateToShow
}) {
  const appBrandColor = appOneDetails?.brandcolor;
  return (
    <>
      <div
        className="min-h-screen relative overflow-x-hidden bg-white"
      >
        <div className="relative z-10">
          {/* Hero */}
          <div className="relative">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 25% 55%, #2563eb24, transparent 70%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 50% at 55% 70%, #ca7aff14, transparent 70%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 30% 40% at 10% 80%, #10b9810f, #ffffff 60%)" }} />
            <HeroSection appOneDetails={appOneDetails} useCasesCardsData={appData?.useCasesCardsData} headings={appData?.headings} appName={appData?.appName} />
          </div>

          <SectionDivider />
          <SectionBand>
            <TemplatesSection templateToShow={templateToShow} appOneDetails={appOneDetails} />
          </SectionBand>
          <SectionDivider />

          <ConnectAppsSection brandColor={appBrandColor} appOneDetails={appOneDetails} apps={apps} pageInfo={pageInfo} integrationsInfo={integrationsInfo} appCount={appCount} combosData={combosData} />

          <SectionDivider />

          <SectionBand>
            <TriggersActionsSection brandColor={appBrandColor} appOneDetails={appOneDetails} combosData={combosData} />
          </SectionBand>

          <SectionDivider />

          <ReadyToUseSection brandColor={appBrandColor} combosData={combosData} appOneDetails={appOneDetails} />

          <SectionDivider />

          <SectionBand>
            <SupportSection />
          </SectionBand>

          <SectionDivider />

          {videoData?.length > 0 && <TutorialsSection brandColor={appBrandColor} appName={appOneDetails?.name} videoData={videoData} />}

          <SectionDivider />

          <SectionBand>
            <BlogsSection brandColor={appBrandColor} blogsData={blogsData} />
          </SectionBand>

          <SectionDivider />

          <FAQs faqData={faqData} />

          <SectionDivider />

          <SectionBand>
            <AboutCardsSection appOneDetails={appOneDetails} getDoFollowUrlStatusArray={getDoFollowUrlStatusArray} />
          </SectionBand>

          <FooterNew footerData={footerData} />
        </div>
      </div>
    </>
  )
}
