import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarServer from '../components/navbar/NavbarServer';
import Footer from '@/components/footer/footer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import { getSupportPageData } from '../lib/support-data';
import SupportClient from '../components/support/SupportClient';
import { ogImages, twitterImages } from '@/app/lib/share-image';

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
            images: ogImages('/support', metaData?.image),
        },
        twitter: {
            card: 'summary_large_image',
            title: metaData?.title,
            description: metaData?.description,
            images: twitterImages('/support', metaData?.image),
        },
    };
}

export default async function SupportPage() {
    const { metaData, footerData, navbarData, testimonials, liveSupport } = await getSupportPageData();

    const getCurrentHourIST = () => {
        const hour = new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "numeric",
            hour12: false,
        }).format(new Date());

        return Number(hour);
    };

    const isTimeSlotActive = (timeSlot) => {
        if (!timeSlot) return false;

        const currentHour = getCurrentHourIST();

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
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/support'} />
            </ConditionalNavbar>

            <SupportClient testimonials={testimonials} isLiveSupportAvailable={isLiveSupportAvailable} />


                <ConditionalFooter>
                    <Footer footerData={footerData} />
                </ConditionalFooter>
    
        </>
    );
}
