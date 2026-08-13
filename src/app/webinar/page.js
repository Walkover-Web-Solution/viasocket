import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Footer from '@/components/footer/footer';
import NavbarServer from '../components/navbar/NavbarServer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import WebinarCard from '../components/webinar/WebinarCard';
import { getWebinarPageData } from '../lib/webinar-data';
import SecuritySection from '../components/SecuritySection';
import FAQSection from '@/components/agencyPartner/FAQSection';
import ReviewIframeOptimized from '../components/home/ReviewIframeOptimized';
import ShowBadges from '../components/home/ShowBadges';

export const runtime = 'edge';

export async function generateMetadata() {
    const { metaData } = await getWebinarPageData();


    return {
        title: metaData?.title || 'Webinars - viaSocket',
        description:
            metaData?.description || 'Join live viaSocket webinars and learn to automate your work with your apps',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'Webinars - viaSocket',
            description:
                metaData?.description || 'Join live viaSocket webinars and learn to automate your work with your apps',
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

export default async function WebinarPage() {
    const { metaData, navbarData, footerData, webinarData, reviewData } = await getWebinarPageData();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/webinar'} />
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/webinar'} />
            </ConditionalNavbar>

            <div className="global-top-space my-12">
                <div className="mx-auto flex flex-col gap-12 py-12 lg:p-0 p-6 max-w-4xl">
                    <div className="flex flex-col gap-4" style={{
                        fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif",
                    }}>
                        <h1 className="font-semibold text-[clamp(1.9rem,1.1rem+3vw,2.9rem)] leading-[1.1] tracking-[-0.01em]">
                            Join upcoming <span className="text-accent">free webinars</span> of the apps you use.
                        </h1>
                        <p className="text-lg text-gray-600">
                            Pick the app your team already runs on. We'll show you exactly how to automate it — live, free, one app per session.
                        </p>


                        <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm'>
                            <p className='flex items-center gap-2'><strong>Free</strong> to attend</p>
                            <p className='flex items-center gap-2'><strong>30–45 min</strong> per session</p>
                            <p className='flex items-center gap-2'><strong>IST</strong> — <span>India Standard Time</span>
                            </p>
                        </div>
                    </div >

                    {webinarData?.length > 0 ? (
                        <div className="flex w-full flex-col gap-4">
                            {webinarData.map((webinar, index) => (
                                <WebinarCard key={webinar?.registration_link || index} webinar={webinar} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">
                            No webinars are scheduled right now. Check back soon for upcoming sessions.
                        </p>
                    )
                    }
                </div >
            </div>
            <ShowBadges />

            <ReviewIframeOptimized reviewData={reviewData} />
            <FAQSection />

            <SecuritySection />

            <ConditionalFooter>
                <Footer footerData={footerData} />
            </ConditionalFooter>
        </>
    );
}
