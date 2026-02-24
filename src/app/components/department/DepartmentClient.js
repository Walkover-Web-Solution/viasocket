import BlogGrid from '@/app/components/blog/BlogGrid';
import DepartmentFAQ from '@/components/departmentFAQ/departmentFAQ';
import DepartmentAppsMarquee from '@/components/departmentFAQ/DepartmentAppsMarquee';
import DepartmentUseCase from '@/components/departmentFAQ/DepartmentUseCase';
import TemplateContainer from '@/components/IntegrationsComp/templateContainer/templateContainer';
import Breadcrumb from '@/components/breadcrumb/breadcrumb';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import Footer from '@/components/footer/footer';
import Link from 'next/link';
import DashboardButton from '@/components/dashboardButton/dashboardButton';

export default function DepartmentClient({ data }) {
    const { metaData, navbarData, footerData, department, blogsData, templateToShow } = data;
    
    return (
        <div className="square-background">
            <NavbarServer
                navbarData={navbarData}
                utm={department?.slug ? `/departments/${department.slug}` : '/departments'}
            />

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
                            <DashboardButton utm_src={"departments/"+department?.slug}/>
                            <Link
                                href="https://cal.id/team/viasocket/workflow-setup-discussion"
                                className="btn btn-outline px-6 py-3 border-gray-300 hover:border-accent hover:bg-accent/5 transition-all duration-300"
                            >
                                Book a demo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-12 flex flex-col gap-16">
                <div className="relative bg-white p-4 border custom-border h-[250px]">
                    <DepartmentAppsMarquee marque_apps={department?.marque_apps} department={department} />
                </div>

                <TemplateContainer
                    selectedApps={department?.marque_apps}
                    templateToShow={templateToShow}
                    requireAllApps={false}
                    department_name={department?.name}
                />
                <DepartmentUseCase use_cases={department?.use_cases} />

                <BlogGrid posts={blogsData} />
                <DepartmentFAQ faqJson={department?.faqs} />
            </div>

            <div className="mt-8 container">
                <Footer footerData={footerData} />
            </div>
        </div>
    );
}
