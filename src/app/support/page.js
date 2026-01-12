import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarOptimized from '../components/navbar/NavbarOptimized';
import Footer from '@/components/footer/footer';
import { getSupportPageData } from '../lib/data';
import SupportClient from '../components/support/SupportClient';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getSupportPageData();
    
    return {
        title: metaData?.title || 'Support - viaSocket',
        description: metaData?.description || 'Get help with viaSocket workflow automation platform',
        keywords: metaData?.keywords,
        openGraph: {
            title: metaData?.title,
            description: metaData?.description,
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

export default async function SupportPage() {
    const { metaData, footerData, navbarData, testimonials } = await getSupportPageData();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/support'} />
            <NavbarOptimized navbarData={navbarData} utm={'/support'} />
            
            <SupportClient testimonials={testimonials} />
            
            <div className="container py-8">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
