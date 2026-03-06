import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarServer from '../components/navbar/NavbarServer';
import { getHomePageData } from '../lib/data';
import HeroContainerNew from '../components/new-home/HeroContainerNew';
import { CoreCapabilities } from '../components/new-home/FeaturesBanner';
import VisualShowcase from '../components/new-home/VisualShowcase';
import ReviewsGrid from '../components/new-home/ReviewsGrid';
import FAQs from '../components/new-home/FAQs';
import SecuritySectionNew from '../components/new-home/SecuritySectionNew';
import FooterNew from '../components/new-home/FooterNew';

export const runtime = 'edge';

export async function generateMetadata() {
  const { metaData } = await getHomePageData();
  
  return {
    title: metaData?.title || 'viaSocket - Automate Anything',
    description: metaData?.description || 'Connect your apps and automate workflows with viaSocket',
    keywords: metaData?.keywords || '',
    openGraph: {
      title: metaData?.title || 'viaSocket - Automate Anything',
      description: metaData?.description || 'Connect your apps and automate workflows with viaSocket',
      images: ['https://files.msg91.com/342616/wnitwkyk'],
    },
  };
}

export default async function HomePage() {
  const {
    metaData,
    faqData,
    footerData,
    securityGridData,
    indexTemplateData,
    reviewData,
    navbarData,
    templateData,
  } = await getHomePageData();

  return (
    <div className='new-home-page'>
      <MetaHeadComp metaData={metaData} page={'/'} />
      <NavbarServer navbarData={navbarData} utm={'/index'} isNavbarWhite={true} />

      <HeroContainerNew/>
      <CoreCapabilities/>
      <VisualShowcase categoryData={indexTemplateData} templateData={templateData} />
      <ReviewsGrid reviewData={reviewData}/>
      {faqData?.length > 0 && <FAQs faqData={faqData} />}
      <SecuritySectionNew securityGridData={securityGridData}/>
      <FooterNew footerData={footerData} />
    </div>
  );
}