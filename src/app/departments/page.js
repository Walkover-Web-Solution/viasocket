import { getMetaData } from '@/utils/getMetaData';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarOptimized from '../components/navbar/NavbarOptimized';
import Footer from '@/components/footer/footer';
import Link from 'next/link';
import FaqSection from '@/components/faqSection/faqSection';
import ShowAppsIndex from '@/pages-0ld/homeSection/showAppsIndex';
import ReviewIframeOptimized from '../components/home/ReviewIframeOptimized';
import IntelligentAutomationsSection from '@/pages-0ld/homeSection/IntelligentAutomationsSection';
import { getDepartmentsPageData } from '../lib/department-data';
import DashboardButton from '@/components/dashboardButton/dashboardButton';
import {
    Users,
    Calculator,
    Target,
    TrendingUp,
    Settings,
    Monitor,
    Scale,
    Headphones,
    Code,
    FlaskConical,
    ShoppingCart,
    CircleCheck,
    Briefcase,
    FileCheck,
    Folder,
    Radio,
    TriangleAlert,
} from 'lucide-react';

export const runtime = 'edge';

// Department icon mapping
const departmentIcons = {
    'Human Resources': Users,
    'Finance and Accounting': Calculator,
    'Marketing': Target,
    'Sales': TrendingUp,
    'Operations': Settings,
    'Information Technology': Monitor,
    'Legal': Scale,
    'Customer Service and Support': Headphones,
    'Product Development and Engineering': Code,
    'Research and Development': FlaskConical,
    'Procurement and Purchasing': ShoppingCart,
    'Quality Assurance and Control': CircleCheck,
    'Business Development': Briefcase,
    'Compliance': FileCheck,
    'Administration': Folder,
    'Public Relations': Radio,
    'Risk Management': TriangleAlert,
};

export async function generateMetadata() {
    const { metaData } = await getDepartmentsPageData();

    return {
        title: metaData?.title || 'Departments - viaSocket',
        description: metaData?.description || 'Automation for every team - viaSocket',
        keywords: metaData?.keywords || '',
        openGraph: {
            title: metaData?.title || 'Departments - viaSocket',
            description: metaData?.description || 'Automation for every team - viaSocket',
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

export default async function DepartmentsPage() {
    const { metaData, navbarData, footerData, departmentData, faqData, reviewData, appCount } =
        await getDepartmentsPageData();

    return (
        <>
            <div className="square-background">
                <NavbarOptimized navbarData={navbarData} />
                <MetaHeadComp metaData={metaData} page={'/departments'} />
                <div className="container mt-12 flex flex-col gap-12">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="h1 text-center">
                            Automation for every <span className="text-accent">team</span>
                        </h1>
                        <p className="text-center mb-4">
                            Build workflows that run across teams, tools, and systems—without manual handoffs.
                        </p>
                        <div className="flex gap-4 justify-center mt-5">
                            <DashboardButton utm_src={"/departments/hero"} />
                            <Link
                                href="https://cal.id/team/viasocket/workflow-setup-discussion"
                                className="btn btn-outline"
                            >
                                Book a demo
                            </Link>
                        </div>
                    </div>

                    {/* Show Apps Section */}
                    <div className="bg-white my-20 cont">
                        <div className="flex flex-col border custom-border border-b-0">
                            <ShowAppsIndex />
                            <IntelligentAutomationsSection appCount={appCount} isDepartmentPage={true} />
                        </div>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[180px]">
                        {departmentData?.map((item, index) => {
                            // Determine card style based on position in grid
                            const cardType = index % 4;

                            // Set grid-row-span based on card type - adjust for image height
                            const rowSpan = cardType === 0 ? 2 : cardType === 1 ? 3 : cardType === 2 ? 2 : 3;

                            // Set border style based on card type (only using gray border)
                            const cardStyle = cardType % 2 === 0 ? 'custom-border bg-white' : 'custom-border bg-white';

                            return (
                                <Link
                                    href={`/departments/${item?.slug}`}
                                    key={item?.id || index}
                                    className={`group relative overflow-hidden border ${cardStyle} p-4 flex flex-col gap-2 justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                                    style={{
                                        gridRow: `span ${rowSpan}`,
                                    }}
                                >
                                    {/* Content area */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            {/* Icon based on department name with enhanced styling */}

                                            <div
                                                className={`relative w-12 h-12 flex items-center justify-center group-hover:border-accent/20 transition-all duration-300`}
                                            >
                                                {(() => {
                                                    // Get the appropriate icon component based on department name
                                                    const IconComponent = departmentIcons[item?.name] || Settings;
                                                    // Return the icon with appropriate size and color
                                                    return (
                                                        <IconComponent
                                                            size={22}
                                                            strokeWidth={1.5}
                                                            className="text-gray-700 group-hover:text-accent transition-colors duration-300"
                                                        />
                                                    );
                                                })()}
                                            </div>
                                        </div>

                                        <div className="">
                                            <h3 className="h3 text-lg md:text-xl font-bold group-hover:text-accent transition-colors duration-300">
                                                {item?.name ?? ''}
                                            </h3>
                                            <div className="w-10 h-0.5 bg-accent/20 my-2 group-hover:w-16 transition-all duration-300"></div>
                                            <p
                                                className={`text-sm text-gray-600 ${rowSpan >= 3 ? 'line-clamp-3' : 'line-clamp-2'} leading-relaxed`}
                                            >
                                                {item?.description ?? ''}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Card image with enhanced styling */}
                                    <div
                                        className="overflow-hidden shadow-sm border border-gray-100"
                                        style={{ height: rowSpan >= 3 ? '280px' : '140px' }}
                                    >
                                        {item?.card_image && (
                                            <div className="w-full h-full relative">
                                                <img
                                                    src={item.card_image}
                                                    alt={`${item?.name} automation`}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Enhanced view details button */}
                                    <div className="flex items-center justify-end">
                                        <div className="relative overflow-hidden">
                                            <span className="inline-flex items-center gap-2 py-2 px-4 bg-gray-50 text-sm font-medium text-gray-700 group-hover:text-accent group-hover:bg-accent/5 transition-all duration-300">
                                                View details
                                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white border border-gray-200 text-accent group-hover:translate-x-1 transition-transform duration-300">
                                                    →
                                                </span>
                                            </span>
                                            {/* Animated highlight effect on hover */}
                                            <span className="absolute inset-0 w-full h-full bg-accent/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <ReviewIframeOptimized reviewData={reviewData} showless={false} />
                    <FaqSection faqData={faqData} />
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
    );
}
