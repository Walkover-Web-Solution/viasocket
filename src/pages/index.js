import Image from 'next/image';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { LinkButton, LinkText } from '@/components/uiComponents/buttons';
import Footer from '@/components/footer/footer';
import AlphabeticalComponent from '@/components/alphabetSort/alphabetSort';
import { getCaseStudyData, getFooterData, getIndexTemplateData, getTestimonialData } from '@/utils/getData';
import { CASESTUDY_FIELDS, FOOTER_FIELDS, INDEXTEMPLATE_FIELDS, TESTIMONIALS_FIELDS } from '@/const/fields';
import IntegrateAppsComp from '@/components/indexComps/integrateAppsComp';
import { getBlogData } from '@/utils/getBlogData';
import IndexBannerComp from '@/components/indexComps/indexBannerComp/indexBannerComp';
import Navbar from '@/components/navbar/navbar';
import FeatureGrid from '@/components/featureGrid/featureGrid';
import Link from 'next/link';
import { FaBug, FaCertificate, FaClock, FaEye, FaRegClock, FaUserShield } from 'react-icons/fa6';
import { FaShieldAlt } from 'react-icons/fa';
import Cta from '@/components/CTA/Cta';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import IndexTemplateComp from '@/components/indexComps/indexTemplateComp';
import { getAppCount } from '@/utils/axiosCalls';
export const runtime = 'experimental-edge';

const Index = ({
    testimonials,
    caseStudies,
    metaData,
    faqData,
    footerData,
    redirect_to,
    utm_source,
    blogData,
    featuresData,
    signupFeatures,
    securityGridData,
    indexTemplateData,
}) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <Navbar footerData={footerData} utm={'/index'} />

            <div className="add-background-color">
                <div className="w-full hero_gradint cont md:gap-20 sm:gap-16 gap-12">
                    <IndexBannerComp
                        redirect_to={redirect_to}
                        utm_source={utm_source}
                        signupFeatures={signupFeatures}
                        indexTemplateData={indexTemplateData}
                    />

                    <IndexTemplateComp categories={indexTemplateData} />

                    <IntegrateAppsComp />

                    <FeatureGrid featuresData={featuresData} />

                    <div className="container">
                        <TestimonialsSection testimonials={testimonials} />
                    </div>

                    <Cta
                        title="List your app on the viaSocket marketplace"
                        description="viaSocket’s Free Developer Hub Platform connects your API to the web’s leading apps.
                        Follow a step-by-step walkthrough in the Developer Hub to seamlessly list your app on
                        the viaSocket Marketplace."
                        buttonLabel="Build viaSocket integration"
                        buttonLink="https://viasocket.com/faq/developer-hub"
                        newTab={true}
                    />

                    <div className="container cont">
                        <CaseStudiesSection caseStudies={caseStudies} />
                        <div className="flex justify-end">
                            <Link
                                href="https://viasocket.com/blog/tag/client-story"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border custom-border border-t-0 px-4 py-2 bg-white"
                            ></Link>
                        </div>
                    </div>

                    <Cta
                        title="AI agents that work for you"
                        subDescription="Build, deploy, and automate with intelligent agents"
                        description="Create intelligent workflows that handle your business processes automatically without
                                coding. Simply describe what you need in plain language, and our platform builds custom
                                AI agents that connect your apps, make smart decisions, and improve over time."
                        buttonLabel="Explore AI"
                        buttonLink="/integrations/category/ai-tools"
                    />

                    <Cta
                        title="Be first in line: mobile app early access"
                        subDescription="Edit workflows with AI, anywhere, anytime"
                        description="Create and modify automation workflows from your smartphone with AI assistance.
                                    Build new workflows, make quick edits, and stay in control of your business no
                                    matter where you are."
                        buttonLabel="Apply For Early Access"
                        buttonLink="https://walkover.typeform.com/to/U33OiMgy"
                        newTab={true}
                    />

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
                            <AlphabeticalComponent />
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

const TestimonialsSection = ({ testimonials }) => (
    <div className="flex flex-col gap-9">
        <h2 className="h2 flex gap-2 flex-wrap">
            What clients says <MdOutlineAutoAwesome />
        </h2>
        <div className="border custom-border border-r-0 sm:grid-cols-1 lg:grid-cols-3 grid bg-white sm:border-b-0 lg:border-b">
            {testimonials.map((testimonial, index) => (
                <div
                    className="flex flex-col sm:p-12 p-6 gap-4 border-b lg:border-b-0 border-r custom-border"
                    key={index}
                >
                    <div className="flex flex-col  gap-2 ">
                        <Image
                            className="border custom-border"
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
        <div className="flex flex-col gap-8 w-full border custom-border p-8 bg-white">
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
                        className="h-full w-full object-cover border custom-border"
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
            <div className="border custom-border p-20 border-b-0 bg-[#376F5B] cont gap-8 text-white">
                <div className="flex lg:flex-row flex-col justify-between gap-4 lg:gap-20">
                    <div className="cont gap-1">
                        <h2 className="h2">viaSocket is the Trusted Choice for Secure Automation</h2>
                        <h3 className="sub__h1">
                            Your data is safe with us—compliant, secure, and built with privacy in mind at every step,
                            so you can run workflows with confidence.
                        </h3>
                    </div>
                    <div className="flex gap-4 mr-12">
                        <Image src="assets/img/aicpa-soc-badge.webp" alt="aicpa soc badge" width={100} height={100} />
                        <Image src="assets/img/iso-certified.webp" alt="iso certified badge" width={100} height={100} />
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
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const faqData = await getFaqData('/index', pageUrl);
    const testimonials = await getTestimonialData(TESTIMONIALS_FIELDS, '', pageUrl);
    const caseStudies = await getCaseStudyData(CASESTUDY_FIELDS, '', pageUrl);
    const metaData = await getMetaData('/', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const blogTags = 'index';
    const blogData = await getBlogData({ tag1: blogTags }, pageUrl);
    const appCount = await getAppCount(pageUrl);
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

    const signupFeatures = ['Unlimited active workflows', 'No credit card required', `Connect ${+appCount + 300} apps`];

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

    const indexTemplateData = await getIndexTemplateData(INDEXTEMPLATE_FIELDS, '', pageUrl);

    return {
        props: {
            testimonials: testimonials || [],
            caseStudies: caseStudies || [],
            metaData: metaData || {},
            faqData: faqData || [],
            footerData: footerData || [],
            blogData: blogData || [],
            redirect_to: redirect_to || '',
            utm_source: utm_source || 'index',
            blogTags: blogTags,
            featuresData: featuresData,
            streamlineData: streamlineData,
            signupFeatures: signupFeatures,
            securityGridData: securityGridData,
            indexTemplateData: indexTemplateData || [],
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
