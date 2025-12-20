import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import DepartmentFAQ from '@/components/departmentFAQ/departmentFAQ';
import DepartmentAppsMarquee from '@/components/departmentFAQ/DepartmentAppsMarquee';
import DepartmentUseCase from '@/components/departmentFAQ/DepartmentUseCase';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getBlogData } from '@/utils/getBlogData';
import Link from 'next/link';
import Image from 'next/image';
import { getMetaData } from '@/utils/getMetaData';
import { getFooterData, getNavbarData, getDepartmentData } from '@/utils/getData';
import { FOOTER_FIELDS, NAVBAR_FIELDS, DEPARTMENTDATA_FIELDS } from '@/const/fields';

export const runtime = 'experimental-edge';

const DepartmentDetailPage = ({ metaData, navbarData, footerData, department, blogsData }) => {
    return (
        <div className="square-background">
            <MetaHeadComp
                metaData={metaData}
                page={department?.slug ? `/department/${department.slug}` : '/department'}
            />
            <Navbar navbarData={navbarData} utm={department?.slug ? `/department/${department.slug}` : '/department'} />

            <div className="relative overflow-hidden pt-16 pb-12">
                <div className="container relative z-10">
                    {/* Breadcrumb */}
                    <div className="mb-8 flex flex-col gap-2 text-sm text-gray-600">
                        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1">
                            <Link href="/" className="hover:text-accent transition-colors">
                                Home
                            </Link>
                            <span className="text-gray-400">/</span>
                            <Link href="/departments" className="hover:text-accent transition-colors">
                                Departments
                            </Link>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-900 font-medium">
                                {department?.h1_heading || department?.name || 'Department'}
                            </span>
                        </nav>
                    </div>

                    {/* Hero content - centered */}
                    <div className="flex flex-col items-center text-center">
                        <h1 className="h1 mb-4">{department?.h1_heading || department?.name || 'Department'}</h1>
                        {department?.h1_description && (
                            <p className="text-lg mb-6 leading-relaxed max-w-2xl">{department.h1_description}</p>
                        )}

                        <div className="flex flex-wrap gap-4 justify-center mb-10">
                            <Link
                                href="/signup"
                                className="btn btn-accent px-6 py-3 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                Get Started for free
                            </Link>
                            <Link
                                href="https://cal.id/team/viasocket/workflow-setup-discussion"
                                className="btn btn-outline px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-accent hover:bg-accent/5 transition-all duration-300"
                            >
                                Book a demo
                            </Link>
                        </div>

                        <div className="relative p-1">
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                                ✓
                            </div>
                            <Image
                                src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg?w=1380&t=st=1703069602~exp=1703070202~hmac=1b1f5f8b8b4c2c5b3b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5"
                                alt={department?.name || 'Department'}
                                className="w-full h-auto"
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-12 flex flex-col gap-16">
                <div className="relative bg-white p-4 border custom-border">
                    <DepartmentAppsMarquee marque_apps={department?.marque_apps} />
                </div>
                <DepartmentUseCase use_cases={department?.use_cases} />

                <BlogGrid posts={blogsData} />
                <DepartmentFAQ faqJson={department?.faqs} />
            </div>

            <div className="mt-8 container">
                <Footer footerData={footerData} />
            </div>
        </div>
    );
};

export default DepartmentDetailPage;

export async function getServerSideProps(context) {
    const { req, params } = context;
    const { slug } = params || {};

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const [metaData, navbarData, footerData, departmentData] = await Promise.all([
        getMetaData(`/department/${slug}`, pageUrl),
        getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        getFooterData(FOOTER_FIELDS, '', pageUrl),
        getDepartmentData(DEPARTMENTDATA_FIELDS, '', pageUrl),
    ]);

    const blogTags = 'department';
    const blogsData = await getBlogData({ tag1: blogTags }, pageUrl);

    const departmentList = Array.isArray(departmentData) ? departmentData : [];
    const department = departmentList.find((item) => item?.slug === slug) || null;

    return {
        props: {
            metaData: metaData || {},
            navbarData: navbarData || {},
            footerData: footerData || {},
            department,
            blogsData: blogsData || [],
        },
    };
}
