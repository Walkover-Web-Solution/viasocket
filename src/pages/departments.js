import { getMetaData } from '@/utils/getMetaData';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFooterData, getNavbarData, getDepartmentData, getReviewSectionData } from '@/utils/getData';
import { FOOTER_FIELDS, NAVBAR_FIELDS, DEPARTMENTDATA_FIELDS, REVIEWSECTION_FIELDS } from '@/const/fields';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import Link from 'next/link';
import FaqSection from '@/components/faqSection/faqSection';
import { getFaqData } from '@/utils/getFaqData';
// import BuildOptionsCTA from '@/pages/homeSection/buildOptionsCTA';
import ShowAppsIndex from '@/pages/homeSection/showAppsIndex';
import ReviewIframe from './homeSection/reviewIframe';

const DepartmentGrid = ({ metaData, navbarData, footerData, departmentData, faqData, reviewData }) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/department'} />

            <Navbar navbarData={navbarData} />
            <div className="container mt-12 flex flex-col gap-12">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="h1 text-center">
                        Automation for every <span className="text-accent">team</span>
                    </h1>
                    <p className="text-center mb-4">
                        Build workflows that run across teams, tools, and systems—without manual handoffs.
                    </p>

                    {/* <BuildOptionsCTA /> */}
                    <Link href="/signup" className="btn btn-accent">
                        Get Started
                    </Link>
                </div>

                <ShowAppsIndex />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {departmentData?.map((item, index) => (
                        <Link
                            href={`/department/${item?.slug}`}
                            key={item?.id || index}
                            className="group relative h-full overflow-hidden border border-gray-200 bg-white/70 backdrop-blur-sm p-8 flex flex-col gap-4 justify-between transition-all duration-200 hover:border-accent/60 hover:bg-white"
                        >
                            <div className="flex flex-col gap-2">
                                <h3 className="h3 text-lg md:text-xl group-hover:text-accent">{item?.name ?? ''}</h3>
                                <p className="text-sm md:text-base">{item?.description ?? ''}</p>
                            </div>

                            <div className="mt-4 flex items-center justify-end text-sm font-medium text-accent">
                                <span className="inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                                    View details
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent/5 text-accent transition-transform duration-200 group-hover:translate-x-1">
                                        ↗
                                    </span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                <ReviewIframe reviewData={reviewData} showless={false} />
                <FaqSection faqData={faqData} />
                <Footer footerData={footerData} />
            </div>
        </>
    );
};

export default DepartmentGrid;

export const runtime = 'experimental-edge';
export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;
    const metaData = await getMetaData('/department', pageUrl);
    const navbarData = await getNavbarData(NAVBAR_FIELDS, '', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const departmentData = await getDepartmentData(DEPARTMENTDATA_FIELDS, '', pageUrl);
    const faqData = await getFaqData('/departments', pageUrl);
    const reviewData = await getReviewSectionData(REVIEWSECTION_FIELDS, '', pageUrl);
    return {
        props: {
            metaData: metaData || {},
            navbarData: navbarData || {},
            footerData: footerData || {},
            departmentData: departmentData || {},
            faqData: faqData || {},
            reviewData: reviewData || {},
        },
    };
}
