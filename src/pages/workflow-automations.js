import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import { FOOTER_FIELDS } from '@/const/fields';
import { getFooterData } from '@/utils/getData';
import Link from 'next/link';
import React from 'react';
import { Ban, Clock, Rocket, Zap, BarChart3, Mail, UserPlus, FileText, Headphones } from 'lucide-react';
import { MdGroups } from 'react-icons/md';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { handleRedirect } from '@/utils/handleRedirection';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaUserShield } from 'react-icons/fa6';
import { MdDashboardCustomize } from 'react-icons/md';
import { MdIntegrationInstructions } from 'react-icons/md';
import { MdOutlineMobileFriendly } from 'react-icons/md';
import { FaCogs } from 'react-icons/fa';
import { IoRepeatSharp } from 'react-icons/io5';
import { GrTrigger } from 'react-icons/gr';
import { GrAction } from 'react-icons/gr';
import { TbSettingsAutomation } from 'react-icons/tb';
import { FaChartLine } from 'react-icons/fa';

export const runtime = 'experimental-edge';

const getAutomationWorkIcon = (automationWork) => {
    switch (automationWork) {
        case 'Find repetitive tasks':
            return <IoRepeatSharp size={32} />;
        case 'Set up triggers':
            return <GrTrigger size={32} />;
        case 'Define actions':
            return <GrAction size={32} />;
        case 'Let automation do the work':
            return <TbSettingsAutomation size={32} />;
        case 'Track and improve':
            return <FaChartLine size={32} />;
        default:
            return <Clock size={32} />;
    }
};

const getIconComponent = (iconName) => {
    switch (iconName) {
        case 'time':
            return <Clock size={32} />;
        case 'error':
            return <Ban size={32} />;
        case 'team':
            return <MdGroups size={32} />;
        case 'scale':
            return <Rocket size={32} />;
        default:
            return <Clock size={32} />;
    }
};

const getCategoryIcon = (category) => {
    switch (category) {
        case 'Marketing':
            return <Mail size={32} className="text-black" />;
        case 'Sales & CRM':
            return <BarChart3 size={32} className="text-black" />;
        case 'HR & Payroll':
            return <UserPlus size={32} className="text-black" />;
        case 'IT & Support':
            return <Headphones size={32} className="text-black" />;
        default:
            return <FileText size={32} className="text-black" />;
    }
};

const getToolsIcon = (tools) => {
    switch (tools) {
        case 'Ease of use':
            return <AiOutlineCheckCircle size={32} className="text-black" />;
        case 'Role-based controls':
            return <FaUserShield size={32} className="text-black" />;
        case 'Dashboards & reports':
            return <MdDashboardCustomize size={32} className="text-black" />;
        case 'Seamless integrations':
            return <MdIntegrationInstructions size={32} className="text-black" />;
        case 'Mobile support':
            return <MdOutlineMobileFriendly size={32} className="text-black" />;
        case 'Extensibility':
            return <FaCogs size={32} className="text-black" />;
        default:
            return <AiOutlineCheckCircle size={32} className="text-black" />;
    }
};

const automations = ({
    footerData,
    faqData,
    metaData,
    automationSteps,
    importancePoints,
    automationExamples,
    gettingStartedSteps,
    workflowAutomationTools,
}) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/workflow-automations'} />
            <Navbar footerData={footerData} utm={'/workflow-automations'} />

            <div className="container cont gap-12">
                <section className="py-12">
                    <h1 className="h1">
                        Your Business, Automated
                        <span className="text-accent"> Intelligently</span>
                    </h1>
                    <p className="sub__h1 text-gray-600 leading-relaxed">
                        Workflow automation is the process of setting up automations for your manual, repetitive
                        business processes or workflows
                    </p>
                    <Link href="/signup?utm_source=/workflow-automations">
                        <button className="btn btn-accent mt-3">Start for free</button>
                    </Link>
                </section>

                <section className="bg-black text-white p-6 md:p-12 flex flex-col gap-10">
                    <div className="flex md:flex-row flex-col gap-8">
                        <div className="w-full md:w-3/5 cont gap-8 justify-between">
                            {/* <div> */}
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
                                        Automation is just making things happen automatically. At its core, it’s a
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
                                className="p-8 w-full border-r border-b custom-border bg-white flex items-center gap-8"
                            >
                                <div className="min-w-12 min-h-12 bg-accent border custom-border text-white flex items-center justify-center text-xl font-bold">
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
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
    );
};

export default automations;

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const metaData = await getMetaData('/workflow-automations', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const faqData = await getFaqData('/workflow-automations', pageUrl);

    const automationSteps = [
        {
            title: 'Find repetitive tasks',
            description:
                'Identify tasks that are done over and over, like sending emails, approving documents, or updating spreadsheets.',
        },
        {
            title: 'Set up triggers',
            description:
                'A trigger is an event that starts the automation. For example, "When a customer submits a form" can be a trigger to start a workflow.',
        },
        {
            title: 'Define actions',
            description:
                'An action is what happens after the trigger. For example, "Do this: Send an automated confirmation email." AI can assist by analyzing patterns and suggesting optimized triggers and actions.',
        },
        {
            title: 'Let automation do the work',
            description:
                'Once the workflow is set up, it runs on its own, completing tasks based on triggers and actions without manual input.',
        },
        {
            title: 'Track and improve',
            description:
                'Monitor how the automation is working and make changes to improve it over time. AI-driven analytics can help refine workflows for better efficiency.',
        },
    ];

    const importancePoints = [
        {
            title: 'Saves time',
            description: 'Instead of doing the same work again and again, employees can focus on bigger tasks.',
            iconName: 'time',
        },
        {
            title: 'Reduces errors',
            description:
                'Automated tasks follow set rules, reducing human mistakes. AI-powered automation ensures accuracy by handling complex data operations.',
            iconName: 'error',
        },
        {
            title: 'Improves teamwork',
            description: 'Everyone knows what is happening because tasks are completed and shared automatically.',
            iconName: 'team',
        },
        {
            title: 'Makes scaling easy',
            description:
                'Businesses can grow without worrying about handling too many tasks manually. AI enables businesses to scale by automating advanced workflows without additional complexity.',
            iconName: 'scale',
        },
    ];

    const automationExamples = [
        {
            category: 'Marketing',
            description:
                'When a user subscribes, do this: Send a welcome email, add them to the CRM, and schedule a follow-up.',
            aiNote: 'AI can personalize email content based on customer behavior.',
        },
        {
            category: 'Sales & CRM',
            description:
                'When a new lead is added, do this: Assign it to a salesperson, send a follow-up email, and create a task reminder.',
            aiNote: 'AI can prioritize leads based on engagement history.',
        },
        {
            category: 'HR & Payroll',
            description:
                'When a new employee is hired, do this: Send onboarding documents, create an HR profile, and schedule an orientation.',
            aiNote: 'AI can help verify and organize employee records.',
        },
        {
            category: 'IT & Support',
            description:
                'When a support ticket is submitted, do this: Assign it to the right department, notify the user, and track response time.',
            aiNote: 'AI can categorize tickets and suggest responses automatically.',
        },
    ];

    const gettingStartedSteps = [
        {
            title: 'Find tasks that take too much time',
            description: 'Look for tasks that are done often and follow clear steps.',
        },
        {
            title: 'Use a simple automation tool',
            description: 'Pick a tool that works with your existing systems and is easy to use.',
        },
        {
            title: 'Define triggers and actions',
            description: 'Set up the rules that determine how your workflows run.',
        },
        {
            title: 'Start with small workflows',
            description: 'Set up basic automation first, then add more complex ones later.',
        },
        {
            title: 'Monitor and improve',
            description:
                'Keep checking your automation and adjust it to make it better over time. AI-powered insights can help suggest improvements.',
        },
    ];

    const workflowAutomationTools = [
        {
            title: 'Ease of use',
            description:
                'The software you choose for creating automated workflows must be simple to use by people of all technical levels. A tool with a drag-and-drop interface is ideally suited for this.',
        },
        {
            title: 'Role-based controls',
            description:
                'While creating workflow automation for an approval process, having access controls based on organizational hierarchy will help you better secure data.',
        },
        {
            title: 'Dashboards & reports',
            description:
                'You should be able to visualize key performance indicators, and analyze business data with interactive charts, gauges, tables, and more, within a few clicks.',
        },
        {
            title: 'Seamless integrations',
            description:
                'Choose workflow automation tools that have pre built integrations with ERPs, payment gateways, third-party vendors, and authentication services.',
        },
        {
            title: 'Mobile support',
            description:
                'For in-the-field jobs, mobile support is crucial. Look for a workflow automation system that supports easy mobile access.',
        },
        {
            title: 'Extensibility',
            description:
                'In case you want to incorporate more functionalities to your automated workflows, the platform should provide options like APIs and custom functions, to make your process as customizable as possible.',
        },
    ];

    return {
        props: {
            footerData: footerData || [],
            faqData: faqData || [],
            metaData: metaData || {},
            automationSteps: automationSteps,
            importancePoints: importancePoints,
            automationExamples: automationExamples,
            gettingStartedSteps: gettingStartedSteps,
            workflowAutomationTools: workflowAutomationTools,
        },
    };
}
