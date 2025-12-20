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
        <div
            style={{
                backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
                backgroundSize: `20px 20px`,
            }}
        >
            <MetaHeadComp
                metaData={metaData}
                page={department?.slug ? `/department/${department.slug}` : '/department'}
            />
            <Navbar navbarData={navbarData} utm={department?.slug ? `/department/${department.slug}` : '/department'} />

            <div className="relative overflow-hidden pt-16 pb-12">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/5 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/5 blur-3xl"></div>

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

                        {/* Hero image or illustration - centered below text */}
                        <div className="relative p-1 bg-white rounded-2xl shadow-xl border border-gray-100">
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                                ✓
                            </div>
                            <Image
                                src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg?w=1380&t=st=1703069602~exp=1703070202~hmac=1b1f5f8b8b4c2c5b3b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5"
                                alt={department?.name || 'Department'}
                                className="w-full h-auto rounded-xl shadow-sm"
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-12 flex flex-col gap-16">
                {/* Department Apps Section with enhanced styling */}
                <div className="relative rounded-2xl bg-white p-8 shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-300">
                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/10 rounded-full blur-lg group-hover:scale-110 transition-transform duration-500"></div>

                    <div className="relative z-10 mb-8 text-center">
                        <div className="inline-flex items-center px-3 py-1 mb-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                            <span className="mr-1.5 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                            Integrations
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Popular Integrations
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Connect your favorite tools and automate your workflows
                        </p>

                        <div className="flex gap-2 justify-center mt-3">
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></span>
                            <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-200"></span>
                        </div>
                    </div>

                    {/* Apps marquee with enhanced container */}
                    <div className="relative rounded-xl bg-gray-50/50 p-4 border border-gray-100">
                        <DepartmentAppsMarquee marque_apps={department?.marque_apps} />
                    </div>
                </div>

                {/* Use Cases Section with enhanced design */}
                <div className="relative rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent/10 rounded-tr-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent/10 rounded-bl-2xl"></div>

                    <div className="relative z-10 mb-8 text-center">
                        <div className="inline-flex items-center px-3 py-1 mb-2 text-xs font-medium text-accent bg-accent/10 rounded-full">
                            <span className="mr-1.5 inline-block w-2 h-2 bg-accent rounded-full"></span>
                            Solutions
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Use Cases
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover how {department?.name || 'this department'} can transform your workflow
                        </p>

                        <div className="w-24 h-1 bg-accent/20 mx-auto mt-4 rounded-full group-hover:w-32 transition-all duration-500"></div>
                    </div>

                    {/* Use cases with enhanced container */}
                    <div className="relative rounded-xl bg-white/80 p-4 border border-gray-100 shadow-sm">
                        <DepartmentUseCase use_cases={department?.use_cases} />
                    </div>
                </div>

                {/* Blog grid with enhanced container */}
                <div className="relative rounded-xl bg-white p-8 border border-gray-100 shadow-sm">
                    <BlogGrid posts={blogsData} />
                </div>

                {/* FAQ with enhanced container */}
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
