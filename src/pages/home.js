import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import AlphabeticalComponent from '@/components/alphabetSort/alphabetSort';
import { getCaseStudyData, getFooterData, getIndexTemplateData, getTestimonialData } from '@/utils/getData';
import { CASESTUDY_FIELDS, FOOTER_FIELDS, INDEXTEMPLATE_FIELDS, TESTIMONIALS_FIELDS } from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
import Navbar from '@/components/navbar/navbar';
import { FaBug, FaCertificate, FaClock, FaEye, FaRegClock, FaUserShield } from 'react-icons/fa6';
import { FaShieldAlt } from 'react-icons/fa';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { getAppCount } from '@/utils/axiosCalls';
import { CiSearch } from 'react-icons/ci';
import searchApps from '@/utils/searchApps';

import Link from 'next/link';
export const runtime = 'experimental-edge';

const Home = ({ metaData, faqData, footerData, securityGridData }) => {
    const [selectedApps, setSelectedApps] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [industryData, setIndustryData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Define industries (using category-based approach)
    const industries = [
        'CRM',
        'Marketing',
        'E-commerce',
        'Communication',
        'Project Management',
        'Analytics',
        'Social Media',
        'Email Marketing',
        'Customer Support',
        'Accounting',
        'HR',
        'Sales',
        'Productivity',
        'Design',
        'Development',
        'Storage',
        'Video Conferencing',
        'Payment',
        'Survey',
        'Automation',
    ];

    const fetchAppsData = useCallback(async () => await fetchApps(), []);

    const filterSelectedApps = useCallback(
        (apps) =>
            apps?.filter((app) => !selectedApps.some((selectedApp) => selectedApp.appslugname === app.appslugname)) ||
            [],
        [selectedApps]
    );

    useEffect(() => {
        const fetchInitialApps = async () => {
            try {
                const apps = await fetchAppsData();
                setSearchData(filterSelectedApps(apps));
            } catch (error) {
                console.error(error);
            }
        };

        fetchInitialApps();
        // Always show all industries when dropdown opens
        setIndustryData(industries);
    }, [fetchAppsData, filterSelectedApps]);

    const handleSearch = async (value) => {
        setSearchTerm(value);
        if (value) {
            try {
                const result = await searchApps(value);
                setSearchData(filterSelectedApps(result));

                // Filter industries based on search term
                const filteredIndustries = industries.filter((industry) =>
                    industry.toLowerCase().includes(value.toLowerCase())
                );
                setIndustryData(filteredIndustries);
            } catch (error) {
                console.error(error);
            }
        } else {
            const apps = await fetchAppsData();
            setSearchData(filterSelectedApps(apps));
            setIndustryData(industries);
        }
    };

    const handleSelectIndustry = async (industry) => {
        try {
            const industryApps = await fetchApps(industry);
            setSearchData(filterSelectedApps(industryApps));
            setSearchTerm(industry);
            setShowDropdown(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectApp = (app) => {
        setSelectedApps((prev) => {
            const exists = prev.some((selected) => selected.appslugname === app.appslugname);
            if (exists) {
                return prev.filter((item) => item.appslugname !== app.appslugname);
            }
            return [...prev, { ...app }];
        });
        setShowDropdown(false);
        setSearchTerm('');
    };
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <Navbar footerData={footerData} utm={'/index'} />
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="h1 flex flex-col gap-1">
                        <span>Find automation ideas</span>
                        <span>
                            around{' '}
                            <Link
                                href="https://viasocket.com/integrations"
                                target="_blank"
                                className="hover:underline text-accent"
                            >
                                1500+ apps
                            </Link>{' '}
                            and AI
                        </span>
                    </h1>

                    <div className="relative max-w-2xl mx-auto mt-8 mb-2 search-bar">
                        <div className="relative">
                            <div className="w-full min-h-[56px] px-6 py-4 text-lg bg-[#FAF9F6] border custom-border focus-within:outline-none focus-within:ring-blue-500/20 pr-16 flex flex-wrap items-center gap-2">
                                {selectedApps?.map((app) => (
                                    <div
                                        key={app?.appslugname}
                                        className="flex items-center bg-white border custom-border px-2 py-1 text-sm"
                                    >
                                        <Image
                                            src={app.iconurl || 'https://placehold.co/16x16'}
                                            width={16}
                                            height={16}
                                            alt={app.name}
                                            className="rounded mr-2"
                                        />
                                        <span>{app?.name}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectApp(app);
                                            }}
                                            className="ml-2 text-gray-500 hover:text-gray-700"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    className="flex-1 min-w-[200px] bg-transparent outline-none text-lg"
                                    placeholder={
                                        selectedApps?.length > 0 ? 'Search more apps...' : 'Search for apps...'
                                    }
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    onFocus={() => setShowDropdown(true)}
                                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                                />
                            </div>
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <CiSearch size={20} />
                            </button>

                            {showDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border custom-border shadow-lg z-10 max-h-80 overflow-y-auto max-w-[400px]">
                                    {/* Apps Section */}
                                    <h3 className="h3 px-4 py-3 border-b custom-border font-medium text-left">Apps</h3>
                                    {searchData?.slice(0, 8).map((app, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSelectApp(app)}
                                        >
                                            <Image
                                                src={app?.iconurl || 'https://placehold.co/24x24'}
                                                width={24}
                                                height={24}
                                                alt={app?.name}
                                                className="rounded"
                                            />
                                            <span className="text-sm">{app?.name}</span>
                                        </div>
                                    ))}

                                    {/* Industry Section */}
                                    <h3 className="h3 px-4 py-3 border-b custom-border font-medium text-left border-t custom-border">
                                        Industry
                                    </h3>
                                    {industryData?.slice(0, 8).map((industry, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSelectIndustry(industry)}
                                        >
                                            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                                                <span className="text-green-600 text-xs font-bold">
                                                    {industry.charAt(0)}
                                                </span>
                                            </div>
                                            <span className="text-sm">{industry}</span>
                                        </div>
                                    ))}

                                    {/* No results */}
                                    {searchTerm && searchData?.length === 0 && industryData?.length === 0 && (
                                        <div className="px-4 py-6 text-center text-gray-500">
                                            <p className="text-sm">No apps or industries found for "{searchTerm}"</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-xl mb-12 max-w-2xl mx-auto">
                        or{' '}
                        <Link
                            href="https://viasocket.com/signup"
                            target="_blank"
                            className="hover:underline text-accent"
                        >
                            build from scratch
                        </Link>{' '}
                        with AI + human experts
                    </p>
                    <div className="h2">
                        AI agents, Human intervention, IF and{' '}
                        <Link href="/features" target="_blank" className="hover:underline text-accent">
                            100+ Features
                        </Link>
                    </div>
                </div>
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
        </>
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
                            <h4 className="h3">{item.title}</h4>
                            <p className="sub__h2 text-gray-300">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

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

async function fetchApps(category) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=50${category && category !== 'All' ? `&category=${category}` : ''}`
    );
    const rawData = await response.json();
    return rawData?.data;
}

// Removed fetchIndustryApps - using fetchApps with category parameter instead

// async function fetchCombos(industry, department) {
//     const response = await fetch(
//         `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/services?industry=${industry && industry.toLowerCase()}&department=${department && department !== 'All' && department.toLowerCase()}`
//     );
//     const responseData = await response.json();
//     return responseData;
// }

// async function fetchCombos(industry, department, useCase) {
//     const response = await fetch(
//         `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/services?industry=${industry && industry.toLowerCase()}&department=${department && department !== 'All' && department.toLowerCase()}&usecase=${useCase && encodeURIComponent(useCase)}`
//     );
//     const responseData = await response.json();
//     return responseData;
// }
