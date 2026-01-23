import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarServer from '../components/navbar/NavbarServer';
import Footer from '@/components/footer/footer';
import { getSupportPageData } from '../lib/support-data';
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
    const { metaData, footerData, navbarData, testimonials, liveSupport } = await getSupportPageData();

    const isTimeSlotActive = (timeSlot) => {
        if (!timeSlot) return false;

        const now = new Date();
        const currentHour = now.getHours();

        const timeStr = timeSlot.trim();
        const match = timeStr.match(/(\d+)\s*-\s*(\d+)\s*(AM|PM)/i);

        if (!match) return false;

        let startHour = parseInt(match[1]);
        const period = match[3].toUpperCase();

        if (period === 'PM' && startHour !== 12) {
            startHour += 12;
        } else if (period === 'AM' && startHour === 12) {
            startHour = 0;
        }

        return currentHour === startHour;
    };

    const isLiveSupportAvailable = liveSupport?.some((item) => {
        return isTimeSlotActive(item?.time) && item?.availability === true;
    }) || false;

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/support'} />
            <NavbarServer navbarData={navbarData} utm={'/support'} />

            <SupportClient testimonials={testimonials} isLiveSupportAvailable={isLiveSupportAvailable} />

            <div className="container py-8">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
