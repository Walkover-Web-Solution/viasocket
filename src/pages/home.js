import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import AlphabeticalComponent from '@/components/alphabetSort/alphabetSort';
import { getFooterData } from '@/utils/getData';
import { FOOTER_FIELDS } from '@/const/fields';
import Navbar from '@/components/navbar/navbar';
import { FaBug, FaCertificate, FaClock, FaEye, FaRegClock, FaUserShield } from 'react-icons/fa6';
import { FaShieldAlt } from 'react-icons/fa';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { getAppCount, getTemplates, getIndustries } from '@/utils/axiosCalls';
import { CiSearch } from 'react-icons/ci';
import searchApps from '@/utils/searchApps';
import TemplateCard from '@/components/templateCard/templateCard';
import { useTemplateFilters } from '@/hooks/useTemplateFilters';
import { validateTemplateData } from '@/utils/validateTemplateData';

import Link from 'next/link';
export const runtime = 'experimental-edge';

const Home = ({ metaData, faqData, footerData, securityGridData }) => {
    const [selectedApps, setSelectedApps] = useState([]);
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [filteredIndustries, setFilteredIndustries] = useState([]);
    const [allIndustries, setAllIndustries] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [showTemplates, setShowTemplates] = useState(false);
    const [loadingTemplates, setLoadingTemplates] = useState(false);

    // Use template filters hook for template functionality
    const {
        filteredTemplates,
        hasResults: hasTemplateResults,
        handleFilterChange: handleTemplateFilterChange,
    } = useTemplateFilters(templates);

    const fetchAppsData = useCallback(async () => await fetchApps(), []);
    const fetchIndustriesData = useCallback(async () => await getIndustries(window?.location?.href), []);

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

        const fetchInitialIndustries = async () => {
            try {
                const industries = await fetchIndustriesData();
                setIndustries(industries);
                setAllIndustries(industries);
                setFilteredIndustries(industries);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInitialApps();
        fetchInitialIndustries();
    }, [fetchAppsData, filterSelectedApps, fetchIndustriesData]);

    const handleSearch = async (value) => {
        setSearchTerm(value);
        if (value) {
            try {
                const result = await searchApps(value);
                setSearchData(filterSelectedApps(result));
                
                // Filter industries based on search term from the full list
                const searchLower = value.toLowerCase();
                const matchingIndustries = allIndustries.filter(industry => {
                    const industryName = industry?.name || industry?.industry_name || industry;
                    return industryName?.toLowerCase().includes(searchLower);
                });
                setFilteredIndustries(matchingIndustries);
            } catch (error) {
                console.error(error);
            }
        } else {
            const apps = await fetchAppsData();
            setSearchData(filterSelectedApps(apps));
            setFilteredIndustries(allIndustries);
        }
    };

    const handleSelectApp = (app) => {
        setSelectedApps((prev) => {
            const exists = prev.some((selected) => selected.appslugname === app.appslugname);
            let newSelectedApps;
            if (exists) {
                newSelectedApps = prev.filter((item) => item.appslugname !== app.appslugname);
            } else {
                newSelectedApps = [...prev, { ...app }];
            }

            // Auto-trigger search when apps are selected
            setTimeout(() => {
                if (newSelectedApps.length > 0 || selectedIndustries.length > 0) {
                    handleSearchTemplates();
                }
            }, 100);

            return newSelectedApps;
        });
        setShowDropdown(false);
        setSearchTerm('');
    };

    const handleSelectIndustry = (industry) => {
        const industryName = industry?.name || industry?.industry_name || industry;
        setSelectedIndustries((prev) => {
            const exists = prev.some((selected) => selected === industryName);
            let newSelectedIndustries;
            if (exists) {
                newSelectedIndustries = prev.filter((item) => item !== industryName);
            } else {
                newSelectedIndustries = [...prev, industryName];
            }

            // Auto-trigger search when industries are selected
            setTimeout(() => {
                if (selectedApps.length > 0 || newSelectedIndustries.length > 0) {
                    handleSearchTemplates();
                }
            }, 100);

            return newSelectedIndustries;
        });
        setShowDropdown(false);
        setSearchTerm('');
    };

    const handleSearchTemplates = async () => {
        if (selectedApps.length === 0 && selectedIndustries.length === 0) {
            return;
        }

        setLoadingTemplates(true);
        setShowTemplates(true);

        try {
            const templateData = await getTemplates();
            const validStatuses = ['verified_by_ai', 'verified'];
            const verifiedTemplates = templateData.filter((t) => validStatuses.includes(t.verified));
            const validTemplateData = validateTemplateData(verifiedTemplates);

            setTemplates(validTemplateData);

            // Filter templates based on selected apps and industries
            const selectedAppSlugs = selectedApps.map((app) => app.appslugname);
            handleTemplateFilterChange({
                searchTerm: '',
                selectedIndustries: selectedIndustries,
                selectedApps: selectedAppSlugs,
            });
        } catch (error) {
            console.error('Error fetching templates:', error);
        } finally {
            setLoadingTemplates(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setShowDropdown(false);
            handleSearchTemplates();
        }
    };
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <Navbar footerData={footerData} utm={'/index'} />
            <div className={`${showTemplates ? 'min-h-0 pt-12' : 'min-h-screen flex items-center justify-center'} flex flex-col px-4 mx-auto`}>
                <div className="text-center">
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
                                {selectedIndustries?.map((industry) => (
                                    <div
                                        key={industry}
                                        className="flex items-center border bg-white custom-border px-2 py-1 text-sm"
                                    >
                                        <span>{industry}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectIndustry(industry);
                                            }}
                                            className="ml-2"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    className="flex-1 min-w-[200px] bg-transparent outline-none text-lg"
                                    placeholder={
                                        selectedApps?.length > 0 || selectedIndustries?.length > 0
                                            ? 'Search more apps or press Enter to search templates...'
                                            : 'Search for apps...'
                                    }
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    onFocus={() => setShowDropdown(true)}
                                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                            <button
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-accent transition-colors cursor-pointer border custom-border p-1"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowDropdown(false);
                                    handleSearchTemplates();
                                }}
                            >
                                <CiSearch size={20} />
                            </button>

                            {showDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border custom-border shadow-lg z-10 max-h-80 overflow-y-auto max-w-[400px]">
                                    {/* Apps Section */}
                                    <h3 className="h3 px-4 py-3 border-b custom-border font-medium text-left">Apps</h3>
                                    {searchData?.map((app, index) => (
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

                                    <div className="industries-section">
                                        <h3 className="h3 px-4 py-3 border-y custom-border font-medium text-left">
                                            Industries
                                        </h3>
                                        <div className="py-3">
                                            {(searchTerm ? filteredIndustries : industries)?.map((industry, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-4"
                                                    onClick={() => handleSelectIndustry(industry)}
                                                >
                                                    <span className="text-sm">
                                                        {industry?.name || industry?.industry_name || industry}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* No results */}
                                    {searchTerm && searchData?.length === 0 && (
                                        <div className="px-4 py-6 text-center text-gray-500">
                                            <p className="text-sm">No apps found for "{searchTerm}"</p>
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
                </div>

                {/* Template Results Section */}
                {showTemplates && (
                    <div className="container mx-auto px-4 py-12">
                        <h2 className="h2 mb-8 text-center">
                            Templates for{' '}
                            {selectedApps.map((app, index) => (
                                <span key={app.appslugname}>
                                    {index > 0 && ', '}
                                    <span className="text-accent">{app.name}</span>
                                </span>
                            ))}
                            {selectedIndustries.length > 0 && selectedApps.length > 0 && ' in '}
                            {selectedIndustries.map((industry, index) => (
                                <span key={industry}>
                                    {index > 0 && ', '}
                                    <span className="text-accent">{industry}</span>
                                </span>
                            ))}
                        </h2>

                        {loadingTemplates ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="skeleton bg-gray-100 h-[500px] rounded-none"></div>
                                ))}
                            </div>
                        ) : hasTemplateResults ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                                {filteredTemplates.slice(0, 6).map((template, index) => (
                                    <TemplateCard key={template.id} index={index} template={template} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="h3 text-gray-600">No templates found for the selected apps.</p>
                                <p className="text-lg mt-4">
                                    Try selecting different apps or{' '}
                                    <Link href="/templates" className="text-accent hover:underline">
                                        browse all templates
                                    </Link>
                                </p>
                            </div>
                        )}

                    </div>
                )}

                <div className="ai-agents">
                    <h2 className="h2">
                        AI agents, Human intervention, IF and{' '}
                        <Link href="/features" target="_blank" className="hover:underline text-accent">
                            100+ Features
                        </Link>
                    </h2>
                </div>
            </div>

            <div className="py-12">
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
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const faqData = await getFaqData('/index', pageUrl);
    const metaData = await getMetaData('/', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const appCount = await getAppCount(pageUrl);

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

