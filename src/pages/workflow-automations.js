import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Navbar from '@/components/navbar/navbar';
import { FAQS_FIELDS, FOOTER_FIELDS, METADATA_FIELDS } from '@/const/fields';
import { getFaqData, getFooterData, getMetaData } from '@/utils/getData';
import Link from 'next/link';
import React from 'react';
import { Ban, Clock, Rocket, Zap, BarChart3, Mail, UserPlus, FileText, Headphones } from 'lucide-react';
import { MdGroups } from 'react-icons/md';

export const runtime = 'experimental-edge';

const getIconComponent = (iconName) => {
    switch (iconName) {
        case 'time':
            return <Clock size={32} className="text-white" />;
        case 'error':
            return <Ban size={32} className="text-white" />;
        case 'team':
            return <MdGroups size={32} className="text-white" />;
        case 'scale':
            return <Rocket size={32} className="text-white" />;
        default:
            return <Clock size={32} className="text-white" />;
    }
};

const getCategoryIcon = (category) => {
    switch (category) {
        case 'Marketing':
            return <Mail size={24} className="text-accent" />;
        case 'Sales & CRM':
            return <BarChart3 size={24} className="text-accent" />;
        case 'HR & Payroll':
            return <UserPlus size={24} className="text-accent" />;
        case 'IT & Support':
            return <Headphones size={24} className="text-accent" />;
        default:
            return <FileText size={24} className="text-accent" />;
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
}) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/workflow-automations'} />
            <div className="sticky top-0 z-[100] border-b custom-border">
                <Navbar footerData={footerData} utm={'/workflow-automations'} />
            </div>

            <div className="container cont gap-12 md:gap-16 lg:gap-20">
                {/* Hero Section - White */}
                <section className="py-20">
                    <div className="container  ">
                        <h1 className="h1">
                            Your Business, Automated
                            <span className="text-accent"> Intelligently</span>
                        </h1>
                        <p className="sub__h1 text-gray-600 leading-relaxed">
                            Workflow automation is the process of setting up automations for your manual, repetitive
                            business processes or workflows
                        </p>
                    </div>
                </section>

                {/* What is Workflow Automation - Black */}
                <section className="bg-black text-white py-20 px-12">
                    <div className="flex md:flex-row flex-col gap-8 items-center">
                        <div className="w-full md:w-3/5 cont gap-4">
                            <h2 className="h2 font-bold">What is workflow automation?</h2>
                            <div className="text-lg text-gray-300 cont gap-1">
                                <p>
                                    Workflow automation is a way to make tasks happen automatically without needing
                                    people to do them manually. It helps businesses save time, reduce mistakes, and make
                                    sure things run smoothly.
                                </p>
                                <p>
                                    With workflow automation, tasks are completed based on triggers and actions,
                                    following a set of predefined rules that keep operations efficient. It follows the
                                    simple logic of "When this happens, do this." AI-powered automation further enhances
                                    this by simplifying complex workflows and handling data processing efficiently.
                                </p>
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
                <section className="bg-white py-20 px-12 border custom-border">
                    <div className="text-left mb-16">
                        <h2 className="h2 mb-1">How does workflow automation work?</h2>
                        <p className="text-lg text-gray-600">Automation follows a simple process:</p>
                    </div>

                    <div className="space-y-0">
                        {automationSteps.map((step, index) => (
                            <div key={index} className={`flex items-center justify-start`}>
                                <div
                                    className={`w-full flex flex-col sm:flex-row items-start sm:items-center gap-8 p-8 pl-0 bg-white`}
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-accent text-white flex items-center justify-center text-2xl font-bold">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className={`space-y-3 text-left`}>
                                        <h3 className="h3 font-bold text-black">{step.title}</h3>
                                        <p className="text-gray-600 text-lg">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Important - Black */}
                <section className="bg-black text-white py-20 px-12">
                    <div className="text-left mb-16">
                        <h2 className="h2 font-bold mb-1">Why is workflow automation important?</h2>
                        <p className="text-lg text-gray-300">
                            Many businesses deal with a lot of tasks every day. If done manually, these tasks take time
                            and effort. Automating workflows helps in many ways:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {importancePoints.map((point, index) => (
                            <div key={index} className="bg-white text-black p-8 cont gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-accent flex items-center justify-center">
                                        {getIconComponent(point.iconName)}
                                    </div>
                                    <h3 className="h3 font-bold">{point.title}</h3>
                                </div>
                                <p className="text-gray-600 text-lg">{point.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Examples - White */}
                <section className="bg-white py-20 px-12 border custom-border">
                    <div className="text-left mb-16">
                        <h2 className="h2 font-bold text-black mb-1">Examples of workflow automation</h2>
                        <p className="text-lg text-gray-600">
                            Workflow automation is used in many industries to speed up work. Here are some common
                            examples using the "When this happens, do this" logic:
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {automationExamples.map((example, index) => (
                            <div key={index} className="bg-black text-white p-8 cont gap-2">
                                <div className="flex items-center gap-4">
                                    {getCategoryIcon(example.category)}
                                    <h3 className="h3 font-bold">{example.category}</h3>
                                </div>
                                <p className="sub__h2 after:text-gray-300">{example.description}</p>
                                {example.aiNote && (
                                    <div className="flex items-start gap-3 border p-2 mt-4">
                                        <Zap size={20} className="text-white flex-shrink-0" />
                                        <p className="text-white text-lg">{example.aiNote}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Getting Started - Black */}
                <section className="bg-black text-white py-20 px-12">
                    <div className="text-left mb-16">
                        <h2 className="h2 font-bold mb-1">How to start with workflow automation</h2>
                        <p className="text-lg text-gray-300">If you are new to automation, follow these steps:</p>
                    </div>

                    <div className="space-y-0">
                        {gettingStartedSteps.map((step, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-8 p-8 border-l-4 border-accent bg-white text-black"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-accent text-white flex items-center justify-center text-xl font-bold">
                                        {index + 1}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="h3 font-bold">{step.title}</h3>
                                    <p className="sub__h2 text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className=" cont gap-4 bg-black text-white p-12">
                    <div className="cont gap-1">
                        <h2 className="h2">Ready to work smarter, not harder?</h2>
                        <p className="text-lg text-gray-300">
                            Join thousands of businesses leveraging AI-powered automation to increase productivity and
                            drive growth.
                        </p>
                    </div>
                    <Link href="/signup?utm_source=worflow-automations">
                        <button className="btn bg-accent text-white hover:bg-white hover:text-black border-none">
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

export async function getServerSideProps() {
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/workflow-automations'`);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/workflow-automations'`);

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

    return {
        props: {
            footerData: footerData || [],
            faqData: faqData || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            automationSteps: automationSteps,
            importancePoints: importancePoints,
            automationExamples: automationExamples,
            gettingStartedSteps: gettingStartedSteps,
        },
    };
}
