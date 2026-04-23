import Script from 'next/script';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import NavbarServer from './components/navbar/NavbarServer';
import HeroContainer from './components/home/HeroContainer';
import MainContent from './components/home/MainContent';
import SecuritySection from './components/SecuritySection';
import { getHomePageData } from './lib/data';
import { getHasToken } from './lib/getAuth';

export const runtime = 'edge';

export async function generateMetadata() {
  const { metaData } = await getHomePageData();
  
  return {
    title: metaData?.title || 'viaSocket - Automate Anything',
    description: metaData?.description || 'Connect your apps and automate workflows with viaSocket',
    keywords: metaData?.keywords || '',
    openGraph: {
      siteName: 'viaSocket',
      title: metaData?.title || 'viaSocket - Automate Anything',
      description: metaData?.description || 'Connect your apps and automate workflows with viaSocket',
      url: 'https://viasocket.com',
      type: 'website',
      images: [
        {
          url: 'https://files.msg91.com/342616/wnitwkyk',
          width: 1200,
          height: 630,
          alt: 'viaSocket',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
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
    appCount,
    indexTemplateData,
    reviewData,
    navbarData,
    templateData,
    initialApps,
  } = await getHomePageData();
  const hasToken = await getHasToken();
  return (
    <>
      <Script src="https://main.d2f49esifpcbwh.amplifyapp.com/tracker.js"  />
      <MetaHeadComp metaData={metaData} page={'/'} />
      <NavbarServer navbarData={navbarData} utm={'/index'} />
      
      <HeroContainer 
        appCount={appCount}
        initialApps={initialApps} 
        templateData={templateData}
        hasToken={hasToken}
      />

      <div className="custom-background-home-page"></div>

      <MainContent 
        appCount={appCount}
        indexTemplateData={indexTemplateData}
        templateData={templateData}
        reviewData={reviewData}
      />

      {/* FAQ Section */}
      <div className="py-12 bg-[#FAF9F6]">
        {faqData?.length > 0 && <FAQSection faqData={faqData} faqName={'/index'} />}
        
        <SecuritySection securityGridData={securityGridData} />
        <div className="container">
          <Footer footerData={footerData} />
        </div>
      </div>
    </>
  );
}