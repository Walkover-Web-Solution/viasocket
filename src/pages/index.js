import Image from 'next/image';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { LinkButton, LinkText } from '@/components/uiComponents/buttons';
import Footer from '@/components/footer/footer';
import AlphabeticalComponent from '@/components/alphabetSort/alphabetSort';
import {
    getCaseStudyData,
    getFaqData,
    getFooterData,
    getMetaData,
    getNavData,
    getTestimonialData,
} from '@/utils/getData';
import {
    CASESTUDY_FIELDS,
    FAQS_FIELDS,
    FOOTER_FIELDS,
    METADATA_FIELDS,
    NAVIGATION_FIELDS,
    TESTIMONIALS_FIELDS,
} from '@/const/fields';
import IntegrateAppsComp from '@/components/indexComps/integrateAppsComp';
import { getBlogData } from '@/utils/getBlogData';
import IndexBannerComp from '@/components/indexComps/indexBannerComp/indexBannerComp';
import Navbar from '@/components/navbar/navbar';
import FeatureGrid from '@/components/featureGrid/featureGrid';
import Link from 'next/link';
import {
    FaBug,
    FaBullhorn,
    FaCertificate,
    FaChartLine,
    FaClock,
    FaCoins,
    FaEye,
    FaRegClock,
    FaServer,
    FaUserShield,
} from 'react-icons/fa6';
import { FaCogs, FaShieldAlt, FaUserFriends } from 'react-icons/fa';
import StepDisplay from '@/components/stepDisplay/StepDisplay';
import { FiExternalLink } from 'react-icons/fi';

export const runtime = 'experimental-edge';

const Index = ({
    testimonials,
    caseStudies,
    metaData,
    faqData,
    navData,
    footerData,
    redirect_to,
    utm_source,
    blogData,
    featuresData,
    indexSteps,
    streamlineData,
    signupFeatures,
    securityGridData,
}) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <div className="sticky top-0 z-[100] border-b transparent-border-black">
                <Navbar navData={navData} utm={'/index'} />
            </div>
            <div className="add-background-color">
                <div className="w-full hero_gradint cont md:gap-20 sm:gap-16 gap-12">
                    <IndexBannerComp
                        redirect_to={redirect_to}
                        utm_source={utm_source}
                        signupFeatures={signupFeatures}
                    />

                    <StreamlineDataGrid items={streamlineData} />

                    <div className="container cont">
                        <div className="cont__py flex flex-col gap-20 md:p-12 p-4 h-fit border transparent-border-black bg-white">
                            <h2 className="h2">Create Powerful Workflows in Three Simple Steps</h2>
                            <StepDisplay steps={indexSteps} />
                        </div>
                    </div>

                    <FeatureGrid featuresData={featuresData} />

                    <div className="container">
                        <TestimonialsSection testimonials={testimonials} />
                    </div>

                    <div className="container">
                        <IntegrateAppsComp />
                    </div>

                    <div className="container cont">
                        <CaseStudiesSection caseStudies={caseStudies} />
                        <div className="flex justify-end">
                            <Link
                                href="https://viasocket.com/blog/tag/client-story"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border transparent-border-black border-t-0 px-4 py-2 "
                            >
                                <LinkText>Read More</LinkText>
                            </Link>
                        </div>
                    </div>

                    <div className="container cont gap-2 border transparent-border-black py-20 px-12 bg-white">
                        <h2 className="h2 text-left">AI Agents That Work For You</h2>
                        <p className="text-2xl font-semibold text-accent">
                            Build, deploy, and automate with intelligent agents
                        </p>
                        <h3 className="sub__h1 ">
                            Create intelligent workflows that handle your business processes automatically without
                            coding. Simply describe what you need in plain language, and our platform builds custom AI
                            agents that connect your apps, make smart decisions, and improve over time.
                        </h3>
                    </div>

                    <div className="container cont border transparent-border-black gap-2 py-20 px-12 bg-white">
                        <div className="cont gap-1">
                            <h2 className="h2 text-left">Be First in Line: Mobile App Early Access</h2>
                            <p className="text-2xl font-semibold text-accent ">
                                Edit workflows with AI, anywhere, anytime
                            </p>
                            <h3 className="sub__h1">
                                Create and modify automation workflows from your smartphone with AI assistance. Build
                                new workflows, make quick edits, and stay in control of your business no matter where
                                you are.
                            </h3>
                        </div>
                        <Link
                            href="https://walkover.typeform.com/to/U33OiMgy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="btn btn-accent">Apply For Early Access</button>
                        </Link>
                    </div>

                    <div className="container">
                        <BlogGrid posts={blogData} />
                    </div>

                    <div className="pb-4">
                        {faqData?.length > 0 && (
                            <div className="container cont">
                                <FAQSection faqData={faqData} faqName={'/index'} />
                            </div>
                        )}
                        <div className="container cont">
                            <AlphabeticalComponent step={0} />
                        </div>
                        <SecuritySection securityGridData={securityGridData} />
                        <div className="container">
                            <Footer footerData={footerData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const StreamlineDataGrid = ({ items }) => {
    const getIconComponent = (iconName) => {
        switch (iconName) {
            case 'chart-line':
                return <FaChartLine size={28} />;
            case 'bullhorn':
                return <FaBullhorn size={28} />;
            case 'coins':
                return <FaCoins size={28} />;
            case 'user-friends':
                return <FaUserFriends size={28} />;
            case 'server':
                return <FaServer size={28} />;
            case 'cogs':
                return <FaCogs size={28} />;
            default:
                return <FaRegClock size={28} />;
        }
    };

    return (
        <div className="container cont">
            <h2 className="h2 mb-4">Streamline Every Department with AI Workflow Automation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border transparent-border-black border-t-0 border-r-0 bg-white cursor-pointer">
                {items.map((item, index) => (
                    <Link
                        href={item.link}
                        key={index}
                        className="cont gap-1 py-12 px-8 border transparent-border-black border-b-0 border-l-0 hover:bg-gray-100 group relative"
                    >
                        {getIconComponent(item.iconName)}
                        <h4 className="h3">{item.title}</h4>
                        <p className="sub__h2 text-gray-700">{item.description}</p>
                        <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-4 right-4 text-xl" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

const TestimonialsSection = ({ testimonials }) => (
    <div className="flex flex-col gap-9">
        <h2 className="h2 flex gap-2 flex-wrap">
            What clients says <MdOutlineAutoAwesome />
        </h2>
        <div className="index_client_grid grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full bg-white">
            {testimonials.map((testimonial, index) => (
                <div className="block_border flex flex-col sm:p-12 p-6 gap-4" key={index}>
                    <div className="flex flex-col  gap-2 ">
                        <Image
                            className="border transparent-border-black"
                            src={testimonial?.client_img[0] || 'https://placehold.co/40x40'}
                            width={50}
                            height={50}
                            alt={testimonial?.given_by}
                        />
                        <div className="flex flex-col">
                            <p className="text-sm tracking-wider  font-bold ">{testimonial?.given_by}</p>
                            <p className="text-sm  text-grey">{testimonial?.giver_title}</p>
                        </div>
                    </div>
                    <p className="text-[#373737]">{testimonial?.testimonial}</p>
                </div>
            ))}
        </div>
    </div>
);

const CaseStudiesSection = ({ caseStudies }) => (
    <div className="flex flex-col gap-9">
        <h2 className="h2">Trusted by hundreds of businesses like yours</h2>
        <div className="flex flex-col gap-8 w-full border transparent-border-black p-8 bg-white">
            {caseStudies.map((caseStudy, index) => (
                <CaseStudyItem key={index} caseStudy={caseStudy} isEven={index % 2 !== 0} />
            ))}
        </div>
    </div>
);

const CaseStudyItem = ({ caseStudy, isEven }) => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:hidden w-full">
                <div className="casestudy_img overflow-hidden w-full px-4">
                    <Image
                        className="h-full w-full object-cover"
                        src={caseStudy?.image_1[0] || 'https://placehold.co/40x40'}
                        width={1080}
                        height={1080}
                        alt={caseStudy?.title}
                    />
                </div>
                <div className="w-full p-6 flex flex-col gap-3 px-4">
                    <h3 className="text-xl font-semibold">{caseStudy?.title}</h3>
                    <LinkButton href={caseStudy?.link} content={'Know More'} />
                </div>
            </div>

            <div className={`hidden md:flex w-full ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-1/2 casestudy_img overflow-hidden px-8">
                    <Image
                        className="h-full w-full object-cover border transparent-border-black"
                        src={caseStudy?.image_1[0] || 'https://placehold.co/40x40'}
                        width={1080}
                        height={1080}
                        alt={caseStudy?.title}
                    />
                </div>

                <div className="w-1/2 p-6 flex flex-col gap-3 justify-center">
                    <h3 className="text-xl font-semibold">{caseStudy?.title}</h3>
                    <LinkButton href={caseStudy?.link} content={'Know More'} />
                </div>
            </div>
        </div>
    );
};

const SecuritySection = ({ securityGridData }) => {
    const getIconComponent = (iconName) => {
        switch (iconName) {
            case 'shield-alt':
                return <FaShieldAlt size={28} />;
            case 'user-shield':
                return <FaUserShield size={28} />;
            case 'eye':
                return <FaEye size={28} />;
            case 'clock':
                return <FaClock size={28} />;
            case 'bug':
                return <FaBug size={28} />;
            case 'certificate':
                return <FaCertificate size={28} />;
            default:
                return <FaRegClock size={28} />;
        }
    };
    return (
        <div className="container">
            <div className="border transparent-border-black p-20 border-b-0 bg-[#376F5B] cont gap-8 text-white">
                <div className="flex lg:flex-row flex-col justify-between gap-4 lg:gap-20">
                    <div className="cont gap-1">
                        <h2 className="h2">viaSocket is the Trusted Choice for Secure Automation</h2>
                        <h3 className="sub__h1">
                            Your data is safe with us—compliant, secure, and built with privacy in mind at every step,
                            so you can run workflows with confidence.
                        </h3>
                    </div>
                    <div className="flex gap-4 mr-12">
                        <Image src="assets/img/aicpa-soc-badge.webp" width={100} height={100} />
                        <Image src="assets/img/iso-certified.webp" width={100} height={100} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-white border-t-0 border-r-0">
                    {securityGridData.map((item, index) => (
                        <div key={index} className="cont gap-1 py-12 px-8 border border-white border-b-0 border-l-0 ">
                            {getIconComponent(item.iconName)}
                            <h4 className="h3">{item.title}</h4>
                            <p className="sub__h2 text-gray-300">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Index;

export async function getServerSideProps(context) {
    const { redirect_to } = context.query;
    const { utm_source } = context?.query;

    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/index'`);
    const testimonials = await getTestimonialData(TESTIMONIALS_FIELDS);
    const caseStudies = await getCaseStudyData(CASESTUDY_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/'`);
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const blogTags = 'index';
    const blogData = await getBlogData({ tag1: blogTags });
    const featuresData = [
        {
            heading: 'Save Hours Every Day',
            content: 'Let AI handle your repetitive tasks while you focus on growth',
            iconName: 'clock',
        },
        {
            heading: 'No Technical Skills Needed',
            content: 'Run tens of thousands of actions reliably and in real-time without delays or complications',
            iconName: 'mouse',
        },
        {
            heading: 'Built-in Auth and Security',
            content: 'If you can click a mouse, you can build powerful workflows',
            iconName: 'shield',
        },
        {
            heading: 'Error-Free Operations',
            content: 'Eliminate costly mistakes with consistent, reliable processes',
            iconName: 'check',
        },
        {
            heading: 'Start Small, Scale When Ready',
            content: 'Begin with one process and expand at your own pace',
            iconName: 'scale',
        },
        {
            heading: 'Connect All Your Business Tools',
            content: 'Finally get your softwares talking to each other',
            iconName: 'plug',
        },
    ];

    const indexSteps = [
        {
            title: 'Describe Your Needs',
            description: 'Tell our AI what you want to automate in simple language',
            image: '/assets/brand/workflowSteps1.svg',
        },
        {
            title: 'Review Your Workflow ',
            description: 'See a visualization of your automation and make adjustments',
            image: '/assets/brand/workflowSteps2.svg',
        },
        {
            title: 'Activate and Relax',
            description: 'Let viaSocket handle the tedious tasks while you focus on growth',
            image: '/assets/brand/workflowSteps3.svg',
        },
    ];

    const streamlineData = [
        {
            title: 'Sales',
            iconName: 'chart-line',
            description:
                'Automatically qualify leads, schedule follow-ups, and update your CRM. Convert prospects to customers while your team focuses on relationship building instead of data entry.',
            link: 'https://viasocket.com/blog/easy-ways-to-automate-sales/',
        },
        {
            title: 'Marketing',
            iconName: 'bullhorn',
            description:
                'Synchronize campaign data, trigger personalized messaging based on customer actions, and maintain consistent cross-channel communication without manual intervention.',
            link: 'https://viasocket.com/blog/unlock-business-growth-through-marketing-automation/',
        },
        {
            title: 'Finance',
            iconName: 'coins',
            description:
                'Automate invoice generation, payment reminders, expense approvals, and financial reporting. Ensure accuracy while reducing the time spent on routine financial processes.',
            link: 'https://viasocket.com/blog/accounting-automation-guide/',
        },
        {
            title: 'HR',
            iconName: 'user-friends',
            description:
                'Streamline employee onboarding, automate time-off requests, collect feedback, and manage document approvals. Create a seamless experience for your team.',
            link: 'https://viasocket.com/blog/9-important-automations-for-hr-2025/',
        },
        {
            title: 'IT',
            iconName: 'server',
            description:
                'Automate ticket routing, system monitoring alerts, access management, and recurring maintenance tasks. Reduce resolution time and prevent system issues.',
            link: 'https://viasocket.com/blog/boost-team-productivity-and-simplify-it-with-powerful-automation/',
        },
        {
            title: 'Operations',
            iconName: 'cogs',
            description:
                'Coordinate inventory updates, manage supply chain communications, automate order processing, and streamline project handoffs across departments.',
            link: 'https://viasocket.com/blog/ways-to-automate-your-business/',
        },
    ];

    const signupFeatures = ['Unlimited active workflows', 'No credit card required', 'Connect 1500+ apps'];

    const securityGridData = [
        {
            title: 'SOC 2 (Type II)',
            description:
                "Your workflow's data is handled with the highest level of security, privacy, and confidentiality.",
            iconName: 'shield-alt',
        },
        {
            title: 'ISO Certified',
            description:
                'We consistently meet international standards to deliver reliable and secure solutions for your business.',
            iconName: 'certificate',
        },
        {
            title: 'GDPR & CCPA Compliance',
            description: 'Your data remains private and entirely under your control, at all times.',
            iconName: 'user-shield',
        },
        {
            title: 'End-to-End Observability',
            description:
                "Gain full visibility into your data's journey with detailed audit logs, real-time analytics, and proactive alerts.",
            iconName: 'eye',
        },
        {
            title: '99.99% Uptime & Enterprise SLA',
            description: 'Stay worry-free with 99.99% uptime and fast, reliable support when you need it most.',
            iconName: 'clock',
        },
        {
            title: 'Error Handling & Recovery',
            description:
                'Stay ahead of issues with smart alerts and AI-powered troubleshooting, keeping your workflows running smoothly.',
            iconName: 'bug',
        },
    ];

    return {
        props: {
            testimonials: testimonials || [],
            caseStudies: caseStudies || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            faqData: faqData || [],
            navData: navData || [],
            footerData: footerData || [],
            blogData: blogData || [],
            redirect_to: redirect_to || '',
            utm_source: utm_source || 'index',
            blogTags: blogTags,
            featuresData: featuresData,
            indexSteps: indexSteps,
            streamlineData: streamlineData,
            signupFeatures: signupFeatures,
            securityGridData: securityGridData,
        },
    };
}

// async function fetchApps(category) {
//     const response = await fetch(
//         `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=50${category && category !== 'All' ? `&category=${category}` : ''}`
//     );
//     const rawData = await response.json();
//     return rawData?.data;
// }

// async function fetchCombos(pathArray, industry, department) {
//     const response = await fetch(
//         `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/services?${pathArray.map((service) => `service=${service}`).join('&')}&industry=${industry && industry.toLowerCase()}&department=${department && department !== 'All' && department.toLowerCase()}`
//     );
//     const responseData = await response.json();
//     return responseData;
// }
