import Image from 'next/image';
import { useState, useCallback } from 'react';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import { getFooterData, getIndexTemplateData } from '@/utils/getData';
import { FOOTER_FIELDS, INDEXTEMPLATE_FIELDS } from '@/const/fields';
import Navbar from '@/components/navbar/navbar';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { getAppCount } from '@/utils/axiosCalls';
import Link from 'next/link';
import AiAgentFeature from '@/pages/homeSection/aiAgentFeature';
import SearchInputHome from '@/pages/homeSection/searchInputHome';
import ResultSection from '@/pages/homeSection/resultSection';
import ReviewIframe from './homeSection/reviewIframe';
import IndexTemplateComp from '@/components/indexComps/indexTemplateComp';

export const runtime = 'experimental-edge';

// Move fetchApps function to the top level
async function fetchApps(category) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/api/v1/plugins/all?limit=50${category && category !== 'All' ? `&category=${category}` : ''}`
    );
    const rawData = await response.json();
    return rawData?.data;
}

const Home = ({ metaData, faqData, footerData, securityGridData, appCount, indexTemplateData }) => {
    const [templates, setTemplates] = useState([]);
    const [showTemplates, setShowTemplates] = useState(false);
    const [loadingTemplates, setLoadingTemplates] = useState(false);
    const [videos, setVideos] = useState([]);
    const [showVideos, setShowVideos] = useState(false);
    const [loadingVideos, setLoadingVideos] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [showBlogs, setShowBlogs] = useState(false);
    const [loadingBlogs, setLoadingBlogs] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [showAiResponse, setShowAiResponse] = useState(false);
    const [loadingAiResponse, setLoadingAiResponse] = useState(false);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [hasTemplateResults, setHasTemplateResults] = useState(false);
    const [selectedApps, setSelectedApps] = useState([]);
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);

    // Callback handlers for SearchInputHome
    const handleTemplatesChange = useCallback((data) => {
        setTemplates(data.templates || []);
        setFilteredTemplates(data.filteredTemplates || []);
        setShowTemplates(data.showTemplates || false);
        setHasTemplateResults(data.hasResults || false);
    }, []);

    const handleVideosChange = useCallback((data) => {
        setVideos(data.videos || []);
        setShowVideos(data.showVideos || false);
    }, []);

    const handleBlogsChange = useCallback((data) => {
        setBlogs(data.blogs || []);
        setShowBlogs(data.showBlogs || false);
    }, []);

    const handleAiResponseChange = useCallback((data) => {
        setAiResponse(data.aiResponse || '');
        setShowAiResponse(data.showAiResponse || false);
    }, []);

    const handleLoadingChange = useCallback((loadingStates) => {
        if (loadingStates.templates !== undefined) setLoadingTemplates(loadingStates.templates);
        if (loadingStates.videos !== undefined) setLoadingVideos(loadingStates.videos);
        if (loadingStates.blogs !== undefined) setLoadingBlogs(loadingStates.blogs);
        if (loadingStates.aiResponse !== undefined) setLoadingAiResponse(loadingStates.aiResponse);
    }, []);

    const handleSelectionChange = useCallback((data) => {
        setSelectedApps(data.selectedApps || []);
        setSelectedIndustries(data.selectedIndustries || []);
        setSelectedDepartments(data.selectedDepartments || []);
    }, []);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <Navbar footerData={footerData} utm={'/index'} />
            <div
                className={`${showTemplates || showVideos || showBlogs ? 'min-h-0 pt-12' : 'min-h-[calc(100vh-150px)] flex flex-col justify-center'} px-4 mx-auto relative`}
            >
                <div className="text-center container">
                    <p className="text-3xl text-black mb-12 relative z-index-1">
                        Automate Anything around{' '}
                        <Link
                            href="https://viasocket.com/integrations"
                            target="_blank"
                            className="border-b-2 custom-border border-dotted"
                        >
                            <span>AI + {+appCount + 300}</span> Apps
                        </Link>{' '}
                    </p>

                    <h1 className="h1 flex flex-col gap-1 relative z-index-1">
                        <span>
                            Search ready-made <span className="text-accent">templates</span>
                        </span>
                    </h1>
                    <SearchInputHome
                        onTemplatesChange={handleTemplatesChange}
                        onVideosChange={handleVideosChange}
                        onBlogsChange={handleBlogsChange}
                        onAiResponseChange={handleAiResponseChange}
                        onLoadingChange={handleLoadingChange}
                        onSelectionChange={handleSelectionChange}
                        fetchApps={fetchApps}
                    />

                    <p className="text-xl gap-2 justify-center flex-wrap flex items-center mb-12 max-w-2xl mx-auto relative z-index-1 pl-6">
                        or{' '}
                        <Link
                            href="https://viasocket.com/signup"
                            target="_blank"
                            className="border-b-2 custom-border border-dotted"
                        >
                            build from scratch
                        </Link>
                        or
                        <div className="flex items-center flex-wrap gap-4">
                            {' '}
                            <Link
                                href="https://tally.so/r/wzVdKZ"
                                target="_blank"
                                className="border-b-2 custom-border border-dotted"
                            >
                                take help from human experts
                            </Link>
                            <div className="flex items-center mx-auto">
                                <img
                                    src="/review-image/1.svg"
                                    alt="review"
                                    className="rounded-[50px] relative"
                                    width={40}
                                    height={40}
                                />
                                <img
                                    src="/review-image/2.svg"
                                    alt="review"
                                    className="rounded-[50px] relative right-[10px]"
                                    width={40}
                                    height={40}
                                />
                                <img
                                    src="/review-image/3.svg"
                                    alt="review"
                                    className="rounded-[50px] relative right-[20px]"
                                    width={40}
                                    height={40}
                                />
                                <img
                                    src="/review-image/4.svg"
                                    alt="review"
                                    className="rounded-[50px] relative right-[30px]"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </div>
                    </p>
                </div>
            </div>

            <div className="custom-background-home-page"></div>

            <ResultSection
                // Template props
                showTemplates={showTemplates}
                loadingTemplates={loadingTemplates}
                hasTemplateResults={hasTemplateResults}
                filteredTemplates={filteredTemplates}
                selectedApps={selectedApps}
                selectedDepartments={selectedDepartments}
                selectedIndustries={selectedIndustries}
                // AI Response props
                showAiResponse={showAiResponse}
                loadingAiResponse={loadingAiResponse}
                aiResponse={aiResponse}
                // Video props
                showVideos={showVideos}
                loadingVideos={loadingVideos}
                videos={videos}
                // Blog props
                showBlogs={showBlogs}
                loadingBlogs={loadingBlogs}
                blogs={blogs}
            />

            {/* AI Agents Section - Positioned at bottom of viewport */}
            <AiAgentFeature />

            {/* Template Section - Only show when user is not searching or has no search results */}
            {!showTemplates && !showVideos && !showBlogs && !showAiResponse && (
                <IndexTemplateComp categories={indexTemplateData} />
            )}

            {/* Review Section */}
            <div className="container mt-12" >
                <ReviewIframe />
            </div>

            {/* FAQ Section */}
            <div className="py-12 bg-[#faf9f6]">
                {faqData?.length > 0 && (
                    <div className="container cont">
                        <FAQSection faqData={faqData} faqName={'/index'} />
                    </div>
                )}

                <SecuritySection securityGridData={securityGridData} />
                <div className="container">
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
    );
};

const SecuritySection = ({ securityGridData }) => {
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
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;
    const faqData = await getFaqData('/index', pageUrl);
    const metaData = await getMetaData('/', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const appCount = await getAppCount(pageUrl);
    const indexTemplateData = await getIndexTemplateData(INDEXTEMPLATE_FIELDS, '', pageUrl);

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
            metaData: metaData || {},
            faqData: faqData || [],
            footerData: footerData || [],
            securityGridData: securityGridData,
            appCount: appCount || 0,
            indexTemplateData: indexTemplateData || [],
        },
    };
}
