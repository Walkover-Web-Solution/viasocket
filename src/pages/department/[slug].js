import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import DepartmentFAQ from '@/components/departmentFAQ/departmentFAQ';
import DepartmentAppsMarquee from '@/components/departmentFAQ/DepartmentAppsMarquee';
import DepartmentUseCase from '@/components/departmentFAQ/DepartmentUseCase';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getBlogData } from '@/utils/getBlogData';
import Link from 'next/link';
import { getMetaData } from '@/utils/getMetaData';
import { getFooterData, getNavbarData, getDepartmentData } from '@/utils/getData';
import { FOOTER_FIELDS, NAVBAR_FIELDS, DEPARTMENTDATA_FIELDS } from '@/const/fields';

export const runtime = 'experimental-edge';

const DepartmentDetailPage = ({ metaData, navbarData, footerData, department, blogsData }) => {
    return (
        <>
            <MetaHeadComp
                metaData={metaData}
                page={department?.slug ? `/department/${department.slug}` : '/department'}
            />
            <Navbar navbarData={navbarData} utm={department?.slug ? `/department/${department.slug}` : '/department'} />

            <div className="container mt-12 mb-8 flex flex-col gap-12 global-top-space">
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1">
                        <Link href="/" className="hover:text-accent transition-colors">
                            Home
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link href="/departments" className="hover:text-accent transition-colors">
                            Departments
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900">
                            {department?.h1_heading || department?.name || 'Department'}
                        </span>
                    </nav>
                </div>

                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-6 justify-center items-center">
                        <h1 className="h1">{department?.h1_heading || department?.name || 'Department'}</h1>
                        {department?.h1_description && (
                            <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
                                {department.h1_description}
                            </p>
                        )}

                        <div className="flex gap-4 justify-center">
                            <button className="btn btn-accent">Get Started for free</button>
                            <button className="btn btn-outline">Book a demo</button>
                        </div>
                    </div>

                    <DepartmentAppsMarquee marque_apps={department?.marque_apps} />

                    <DepartmentUseCase use_cases={department?.use_cases} />
                    <BlogGrid posts={blogsData} />

                    {/* Department-specific FAQ coming from departmentData JSON */}
                    <DepartmentFAQ faqJson={department?.faqs} />
                </div>

                <div className="mt-8">
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
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
