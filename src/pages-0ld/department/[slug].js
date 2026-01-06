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
import { getTemplates } from '@/utils/axiosCalls';
import TemplateContainer from '@/components/IntegrationsComp/templateContainer/templateContainer';
import Breadcrumb from '@/components/breadcrumb/breadcrumb';

export const runtime = 'edge';

const DepartmentDetailPage = ({ metaData, navbarData, footerData, department, blogsData, templateToShow }) => {
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
                    <Breadcrumb parent="Departments" child1={department?.name} parentLink="/departments" />

                    {/* Hero content - centered */}
                    <div className="flex flex-col items-center text-center pt-12">
                        <h1 className="h1 mb-4">{department?.h1_heading || department?.name || 'Department'}</h1>
                        {department?.h1_description && (
                            <p className="sub__h1 mb-6 leading-relaxed" style={{ width: '60vw' }}>
                                {department.h1_description}
                            </p>
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
                    </div>
                </div>
            </div>

            <div className="container py-12 flex flex-col gap-16">
                <div className="relative bg-white p-4 border custom-border">
                    <DepartmentAppsMarquee marque_apps={department?.marque_apps} department={department} />
                </div>
        
                <TemplateContainer selectedApps={department?.marque_apps} templateToShow={templateToShow} requireAllApps={false} department_name={department?.name}/>
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

    const templateData = await getTemplates(pageUrl);
    const validTemplates = templateData.filter(
        t => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
    );
    const templateToShow = validTemplates;

    return {
        props: {
            metaData: metaData || {},
            navbarData: navbarData || {},
            footerData: footerData || {},
            department,
            blogsData: blogsData || [],
            templateToShow: templateToShow || [],
        },
    };
}
