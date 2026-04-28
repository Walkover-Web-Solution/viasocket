import Link from 'next/link';
import { Ban, Clock, Rocket, Zap, BarChart3, Mail, UserPlus, FileText, Headphones, Users, CheckCircle, Shield, LayoutDashboard, Plug2, Smartphone, Settings, Repeat, Zap as TriggerIcon, Play, TrendingUp } from 'lucide-react';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import NavbarServer from '../components/navbar/NavbarServer';
import Footer from '@/components/footer/footer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import FAQSection from '@/components/faqSection/faqSection';
import { getWorkflowAutomationsPageData } from '../lib/data';
import DashboardButton from '@/components/dashboardButton/dashboardButton';
import ShowDepartmentOptimized from '@/app/components/home/ShowDepartmentOptimized';
import { getHasToken } from '../lib/getAuth';

export const runtime = 'edge';

const getAutomationWorkIcon = (automationWork) => {
    switch (automationWork) {
        case 'Find repetitive tasks':
            return <Repeat className="w-8 h-8" />;
        case 'Set up triggers':
            return <TriggerIcon className="w-8 h-8" />;
        case 'Define actions':
            return <Play className="w-8 h-8" />;
        case 'Let automation do the work':
            return <Settings className="w-8 h-8" />;
        case 'Track and improve':
            return <TrendingUp className="w-8 h-8" />;
        default:
            return <Clock className="w-8 h-8" />;
    }
};

const getIconComponent = (iconName) => {
    switch (iconName) {
        case 'time':
            return <Clock className="w-8 h-8" />;
        case 'error':
            return <Ban className="w-8 h-8" />;
        case 'team':
            return <Users className="w-8 h-8" />;
        case 'scale':
            return <Rocket className="w-8 h-8" />;
        default:
            return <Clock className="w-8 h-8" />;
    }
};

const getCategoryIcon = (category) => {
    switch (category) {
        case 'Marketing':
            return <Mail className="w-8 h-8 text-black" />;
        case 'Sales & CRM':
            return <BarChart3 className="w-8 h-8 text-black" />;
        case 'HR & Payroll':
            return <UserPlus className="w-8 h-8 text-black" />;
        case 'IT & Support':
            return <Headphones className="w-8 h-8 text-black" />;
        default:
            return <FileText className="w-8 h-8 text-black" />;
    }
};

const getToolsIcon = (tools) => {
    switch (tools) {
        case 'Ease of use':
            return <CheckCircle className="w-8 h-8 text-black" />;
        case 'Role-based controls':
            return <Shield className="w-8 h-8 text-black" />;
        case 'Dashboards & reports':
            return <LayoutDashboard className="w-8 h-8 text-black" />;
        case 'Seamless integrations':
            return <Plug2 className="w-8 h-8 text-black" />;
        case 'Mobile support':
            return <Smartphone className="w-8 h-8 text-black" />;
        case 'Extensibility':
            return <Settings className="w-8 h-8 text-black" />;
        default:
            return <CheckCircle className="w-8 h-8 text-black" />;
    }
};

export async function generateMetadata() {
    const { metaData } = await getWorkflowAutomationsPageData();
    
    return {
        title: metaData?.title || 'Workflow Automations - viaSocket',
        description: metaData?.description || 'Automate your business workflows intelligently with viaSocket',
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

export default async function WorkflowAutomationsPage() {
    // Get all page data from single source following home page pattern
    const {
        metaData,
        faqData,
        footerData,
        navbarData,
        automationSteps,
        importancePoints,
        automationExamples,
        gettingStartedSteps,
        workflowAutomationTools
    } = await getWorkflowAutomationsPageData();
    const hasToken = await getHasToken();

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/workflow-automations'} />
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/workflow-automations'} />
            </ConditionalNavbar>

            <div className="container cont gap-12 global-top-space">
                <section className="py-12">
                    <h1 className="h1">
                        Your Business, Automated
                        <span className="text-accent"> Intelligently</span>
                    </h1>
                    <p className="sub__h1 text-gray-600 leading-relaxed mb-3">
                        Workflow automation is the process of setting up automations for your manual, repetitive
                        business processes or workflows
                    </p>
                    <DashboardButton utm_src={"/workflow-automations"} hasToken={hasToken} />
                </section>

                <section className="bg-black text-white p-6 md:p-12 flex flex-col gap-10">
                    <div className="flex md:flex-row flex-col gap-8">
                        <div className="w-full md:w-3/5 cont gap-8 justify-between">
                            <div className="flex flex-col gap-2">
                                <h2 className="h2 font-bold">What is workflow automation?</h2>
                                <p>
                                    Workflow automation is a way to make tasks happen automatically without needing
                                    people to do them manually. It helps businesses save time, reduce mistakes, and make
                                    sure things run smoothly.
                                </p>
                                <p>
                                    With workflow automation, tasks are completed based on triggers and actions,
                                    following a set of predefined rules that keep operations efficient.{' '}
                                </p>
                                <p>
                                    It follows the simple logic of "When this happens, do this." AI-powered automation
                                    further enhances this by simplifying complex workflows and handling data processing
                                    efficiently.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="border p-8">
                                    <h3 className="h3">What is workflow?</h3>
                                    <p>
                                        A workflow is a series of tasks or steps within the apps that are followed to
                                        complete a particular process.
                                    </p>
                                </div>

                                <div className="border p-8">
                                    <h3 className="h3">What is automation?</h3>
                                    <p>
                                        Automation is just making things happen automatically. At its core, it's a
                                        simple rule: WHEN something happens, DO something else. Even the most complex
                                        automation follows this basic idea.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 flex justify-center items-center py-20 bg-gradient-to-r from-blue-100 to-purple-100">
                            <div className="cont items-center">
                                <div className="border custom-border text-black p-4 w-52 h3 bg-white">
                                    Step 1: Trigger
                                </div>
                                <div className="border-r border-black bg-black h-12"></div>
                                <div className="border custom-border text-black p-4 w-52 h3 bg-white">
                                    Step 2: Actions
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                {/* How it Works - White */}
                <section className="bg-[#FAF9F6] p-6 md:p-12 border custom-border">
                    <div className="text-left mb-10">
                        <h2 className="h2 mb-1">How does workflow automation work?</h2>
                        <p className="text-lg text-gray-600">Automation follows a simple process:</p>
                    </div>

                    <div className="space-y-0 border custom-border border-r-0 border-b-0">
                        {automationSteps.map((step, index) => (
                            <div
                                key={index}
                                className="p-8 w-full border-r border-b custom-border bg-white flex flex-col items-start sm:flex-row sm:items-center gap-8"
                            >
                                <div className="min-w-8 min-h-8 sm:min-w-12 sm:min-h-12 bg-accent border custom-border text-white flex items-center justify-center text-sm sm:text-xl font-bold">
                                    {index + 1}
                                </div>
                                <div className="automation-work-step">
                                    <h3 className="h3 font-bold flex gap-2">
                                        <span>{getAutomationWorkIcon(step.title)}</span>
                                        <span>{step.title}</span>
                                    </h3>
                                    <p className="text-gray-600 text-lg !mt-0">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Important - Black */}
                <section className="bg-white border custom-border text-black p-6 md:p-12">
                    <div className="text-left mb-10">
                        <h2 className="h2 font-bold mb-1">Why is workflow automation important?</h2>
                        <p className="text-lg">
                            Many businesses deal with a lot of tasks every day. If done manually, these tasks take time
                            and effort. Automating workflows helps in many ways:
                        </p>
                    </div>

                    <div className="sm:grid-cols-1 lg:grid-cols-2 grid gap-8">
                        {importancePoints.map((point, index) => (
                            <div key={index} className="bg-[#F2F2F2] text-black p-8 cont gap-1 border custom-border">
                                <div className="flex items-center gap-2">
                                    {getIconComponent(point.iconName)}
                                    <h3 className="h3 font-bold">{point.title}</h3>
                                </div>
                                <p className="text-lg">{point.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Examples - White */}
                <section className="bg-black p-6 md:p-12 border custom-border">
                    <div className="text-left mb-10">
                        <h2 className="h2 font-bold text-white mb-1">Examples of workflow automation</h2>
                        <p className="text-lg text-white">
                            Workflow automation is used in many industries to speed up work. Here are some common
                            examples using the "When this happens, do this" logic:
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {automationExamples.map((example, index) => (
                            <div key={index} className="bg-[#FAF9F6] text-black p-8 cont gap-2 border custom-border">
                                <div className="flex items-center gap-2">
                                    {getCategoryIcon(example.category)}
                                    <h3 className="h3 font-bold">{example.category}</h3>
                                </div>
                                <p className="after:text-gray-300">{example.description}</p>
                                {example.aiNote && (
                                    <div className="flex items-center gap-2 mt-4">
                                        <Zap size={20} className="text-black flex-shrink-0" />
                                        <p className="text-black">{example.aiNote}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="border custom-border p-6 md:p-12 bg-[#F2F2F2] flex flex-col gap-10">
                    <h2 className="h2 font-bold">What are the features to look for in workflow automation tools?</h2>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
                        {workflowAutomationTools.map((tool, index) => (
                            <div key={index} className="p-8 border custom-border bg-white">
                                <div className="flex items-center gap-2">
                                    {getToolsIcon(tool.title)}
                                    <h3 className="h3 font-bold">{tool.title}</h3>
                                </div>
                                <p className="after:text-gray-300">{tool.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Getting Started - Black */}
                <section className="bg-black text-white p-6 md:p-12">
                    <div className="text-left mb-10">
                        <h2 className="h2 font-bold mb-1">How to start with workflow automation</h2>
                        <p className="text-lg text-gray-300">If you are new to automation, follow these steps:</p>
                    </div>

                    <div className="space-y-0">
                        {gettingStartedSteps.map((step, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-8 px-8 py-6 border-l-4 border-accent bg-white text-black"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-accent border custom-border text-white flex items-center justify-center text-xl font-bold">
                                        {index + 1}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="h3 font-bold">{step.title}</h3>
                                    <p className="sub__h2 text-gray-600 !mt-0">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <ShowDepartmentOptimized />

                <div className="border custom-border bg-white cont gap-4 text-black p-6 md:p-12">
                    <div className="cont gap-1">
                        <h2 className="h2">Ready to work smarter, not harder?</h2>
                        <p className="text-lg">
                            Join thousands of businesses leveraging AI-powered automation to increase productivity and
                            drive growth.
                        </p>
                    </div>
                    <Link href="/signup?utm_source=worflow-automations">
                        <button className="btn bg-accent text-white hover:bg-white hover:text-black border custom-border">
                            Get started with viaSocket
                        </button>
                    </Link>
                </div>

                <div className="pb-4">
                    {faqData?.length > 0 && <FAQSection faqData={faqData} faqName={'/workflow-automations'} />}
                    <ConditionalFooter>
                        <Footer footerData={footerData} />
                    </ConditionalFooter>
                </div>
            </div>
        </>
    );
}
