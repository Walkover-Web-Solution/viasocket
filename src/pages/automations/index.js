import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FOOTER_FIELDS, NAVBAR_FIELDS } from '@/const/fields';
import { getFooterData, getNavbarData } from '@/utils/getData';
import { MdKeyboardArrowDown, MdClose } from 'react-icons/md';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import { getBlogData } from '@/utils/getBlogData';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getTemplates, getApps } from '@/utils/axiosCalls';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { useRouter } from 'next/router';
import AutomationSuggestions from '../workflow-automation-ideas';
import { useTemplateFilters } from '@/hooks/useTemplateFilters';
import { validateTemplateData } from '@/utils/validateTemplateData';
import { Webhook, Timer } from 'lucide-react';
import SearchInputHome from '@/pages/homeSection/searchInputHome';
import MarqueeComponent from '@/components/marqueeComponent/marqueeComponent';
import BuildOptionsCTA from '@/pages/homeSection/buildOptionsCTA';
import { handleRedirect } from '@/utils/handleRedirection';

export const runtime = 'experimental-edge';

const TEMPLATES_PER_PAGE = 6;

const Template = ({
    footerData,
    templateToShow,
    metaData,
    faqData,
    blogData,
    categories,
    apps,
    navbarData,
    initialApps,
}) => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    // SearchInputHome integration
    const [filteredSearchTemplates, setFilteredSearchTemplates] = useState([]);
    const [showSearchTemplates, setShowSearchTemplates] = useState(false);
    const [hasSearchResults, setHasSearchResults] = useState(false);
    const [selectedAppsFromSearch, setSelectedAppsFromSearch] = useState([]);
    const [selectedDepartmentsFromSearch, setSelectedDepartmentsFromSearch] = useState([]);
    const [selectedIndustriesFromSearch, setSelectedIndustriesFromSearch] = useState([]);

    // Use the custom hook for all filter-related logic
    const {
        searchTerm,
        selectedCategories,
        selectedApps,
        visibleCount,
        filteredTemplates,
        latestTemplates,
        remainingTemplates,
        hasMoreTemplates,
        totalFilters,
        hasResults,
        handleFilterChange,
        handleLoadMore,
        clearAllFilters,
    } = useTemplateFilters(templateToShow);

    useEffect(() => {
        if (templateToShow.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % templateToShow.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [templateToShow]);

    useEffect(() => {
        setLoading(false);
    }, [templateToShow]);

    // Handlers for SearchInputHome (templates only)
    const handleTemplatesChange = useCallback((data) => {
        setFilteredSearchTemplates(data.filteredTemplates || []);
        setShowSearchTemplates(data.showTemplates || false);
        setHasSearchResults(data.hasResults || false);
    }, []);

    const handleLoadingChange = useCallback(() => {
        // templates-only mode: no-op for external loading state
    }, []);

    const handleSelectionChange = useCallback((data) => {
        setSelectedAppsFromSearch(data.selectedApps || []);
        setSelectedDepartmentsFromSearch(data.selectedDepartments || []);
        setSelectedIndustriesFromSearch(data.selectedIndustries || []);
    }, []);

    // helpers to remove a selected category/app from the page-level chips
    const removeCategory = (category) => {
        const newCategories = selectedCategories.filter((c) => c !== category);
        handleFilterChange({
            searchTerm,
            selectedCategories: newCategories,
            selectedApps,
        });
    };

    const removeApp = (appSlug) => {
        const newApps = selectedApps.filter((a) => a !== appSlug);
        handleFilterChange({
            searchTerm,
            selectedCategories,
            selectedApps: newApps,
        });
    };

    // Choose which list to display
    // If search bar is showing template results, prefer those. Otherwise show no templates.
    const templatesFromSearchActive = showSearchTemplates;
    const displayTemplates = templatesFromSearchActive
        ? filteredSearchTemplates
        : remainingTemplates.length > 0
          ? remainingTemplates
          : filteredTemplates;
    const hasMoreToShow = visibleCount < displayTemplates.length;

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/automations'} />
            <Navbar navbarData={navbarData} utm={'/automations'} />

            <div className="w-full cont gap-12 pt-12 overflow-x-hidden dotted-background global-top-space">
                <div className="container">
                    <h1 className="h1 text-center">
                        <span className="text-accent">Search</span> ready to use automations
                    </h1>
                    <SearchInputHome
                        onTemplatesChange={handleTemplatesChange}
                        onLoadingChange={handleLoadingChange}
                        onSelectionChange={handleSelectionChange}
                        initialApps={initialApps}
                        enableVideos={false}
                        enableBlogs={false}
                        enableAi={false}
                        templates={templateToShow}
                    />
                    <BuildOptionsCTA />
                    <MarqueeComponent
                        onTemplatesChange={handleTemplatesChange}
                        onSelectionChange={handleSelectionChange}
                        categories={categories}
                        templates={templateToShow}
                    />
                    <div>
                        {(selectedCategories.length > 0 || selectedApps.length > 0) && (
                            <div className="flex flex-row flex-wrap gap-2 mt-2">
                                {selectedCategories.map((category) => (
                                    <span
                                        key={category}
                                        className="inline-flex items-center gap-1 px-2 py-1 text-sm border custom-border bg-white hover:bg-gray-100"
                                    >
                                        {category}
                                        <button
                                            onClick={() => removeCategory(category)}
                                            className="ml-1"
                                            aria-label={`Remove ${category}`}
                                        >
                                            <MdClose size={16} />
                                        </button>
                                    </span>
                                ))}
                                {selectedApps.map((appSlug) => {
                                    const appData = apps.find((a) => a.pluginslugname === appSlug);
                                    const label =
                                        appSlug === 'webhook'
                                            ? 'Webhook'
                                            : appSlug === 'cron'
                                              ? 'Cron'
                                              : appData?.pluginname || appSlug;
                                    return (
                                        <span
                                            key={appSlug}
                                            className="inline-flex items-center gap-1 px-2 py-1 text-sm border custom-border bg-white hover:bg-gray-100"
                                        >
                                            {appSlug === 'webhook' ? (
                                                <div className="flex items-center justify-center w-6 h-6 mr-1">
                                                    <Webhook size={12} />
                                                </div>
                                            ) : appSlug === 'cron' ? (
                                                <div className="flex items-center justify-center w-6 h-6 mr-1">
                                                    <Timer size={12} />
                                                </div>
                                            ) : appData?.iconurl ? (
                                                <div className="flex items-center justify-center w-6 h-6 mr-1">
                                                    <Image
                                                        src={appData.iconurl}
                                                        alt={label}
                                                        width={24}
                                                        height={24}
                                                        className="h-4 w-fit"
                                                    />
                                                </div>
                                            ) : null}
                                            {label}
                                            <button
                                                onClick={() => removeApp(appSlug)}
                                                className="ml-1"
                                                aria-label={`Remove ${label}`}
                                            >
                                                <MdClose size={16} />
                                            </button>
                                        </span>
                                    );
                                })}
                                <button onClick={clearAllFilters} className="ml-2 text-sm underline text-gray-600">
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        // Skeleton loader as before
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(TEMPLATES_PER_PAGE)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[500px] rounded-none"></div>
                            ))}
                        </div>
                    ) : templatesFromSearchActive ? (
                        displayTemplates.length > 0 ? (
                            (selectedAppsFromSearch.length > 0 ||
                                selectedDepartmentsFromSearch.length > 0 ||
                                selectedIndustriesFromSearch.length > 0) && (
                                <>
                                    <h2 className="h2 my-8 text-left">
                                        Top{' '}
                                        {selectedAppsFromSearch.map((app, index) => (
                                            <span key={app.appslugname}>
                                                {index > 0 && ', '}
                                                <span>{app.name}</span>
                                            </span>
                                        ))}{' '}
                                        ready to use templates {selectedDepartmentsFromSearch.length > 0 && 'for '}
                                        {selectedDepartmentsFromSearch.map((department, index) => (
                                            <span key={department}>
                                                {index > 0 && ', '}
                                                <span>{department}</span>
                                            </span>
                                        ))}{' '}
                                        {selectedIndustriesFromSearch.length > 0 && 'in '}
                                        {selectedIndustriesFromSearch.map((industry, index) => (
                                            <span key={industry}>
                                                {index > 0 && ', '}
                                                <span>{industry}</span>
                                            </span>
                                        ))}
                                    </h2>
                                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                                        {displayTemplates.slice(0, visibleCount).map((template, index) => (
                                            <TemplateCard key={template.id} index={index} template={template} />
                                        ))}
                                    </div>
                                </>
                            )
                        ) : (
                            <h2 className="h2 my-8 text-left">
                                No matching templates found for{' '}
                                {selectedAppsFromSearch.map((app, index) => (
                                    <span key={app.appslugname}>
                                        {index > 0 && ', '}
                                        <span>{app.name}</span>
                                    </span>
                                ))}{' '}
                                {selectedDepartmentsFromSearch.map((department, index) => (
                                    <span key={department}>
                                        {index > 0 && ', '}
                                        <span>{department}</span>
                                    </span>
                                ))}{' '}
                                {selectedIndustriesFromSearch.map((industry, index) => (
                                    <span key={industry}>
                                        {index > 0 && ', '}
                                        <span>{industry}</span>
                                    </span>
                                ))}
                            </h2>
                        )
                    ) : hasResults ? (
                        <>
                            {/* Rest of the Templates */}
                            {displayTemplates.length > 0 && (
                                <>
                                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                                        {displayTemplates.slice(0, visibleCount).map((template, index) => (
                                            <TemplateCard key={template.id} index={index} template={template} />
                                        ))}
                                    </div>
                                    {hasMoreToShow && (
                                        <div className="flex justify-end w-full mt-4">
                                            <button
                                                onClick={handleLoadMore}
                                                className="btn btn-outline border custom-border"
                                            >
                                                Load More <MdKeyboardArrowDown size={24} />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        // No results message and AutomationSuggestions
                        <div className="cont gap-4">
                            <p className="h3 mt-20">
                                We couldn't find any templates matching your {totalFilters > 0 ? 'filters' : 'search'}.
                                {totalFilters > 0 && ' Try removing some filters or '}
                                Tell us about your use case, and we'll craft a custom template just for you.
                            </p>
                            <AutomationSuggestions />
                        </div>
                    )}
                </div>

                <div className="cont gap-12 md:gap-16 lg:gap-20 bg-[#FAF9F6] pt-12">
                    <div className="container">
                        <div className="cont bg-[url('/assets/bg-img/shapes-bg.svg')] bg-cover bg-center bg-transparent items-center justify-center p-6 md:p-12 h-[600px] overflow-hidden border mt-12">
                            <div className="border flex flex-col justify-center items-center p-6 md:p-12 gap-4 bg-white lg:min-w-[900px] text-center h-[400px]">
                                <h2 className="h2">Can't find the right template?</h2>
                                <h2 className="h2">Start with AI</h2>
                                <button
                                    className="btn btn-accent mt-4"
                                    aria-label="sign up"
                                    onClick={(e) => handleRedirect(e, '/signup?', router)}
                                >
                                    Get Started Free
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <BlogGrid posts={blogData} />
                    </div>
                    <div className="pb-4">
                        {faqData?.length > 0 && <FAQSection faqData={faqData} faqName={'/automations'} />}
                        <div className="container">
                            <Footer footerData={footerData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Template;

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const templates = await getTemplates(pageUrl);
    const metaData = await getMetaData('/automations', pageUrl);
    const faqData = await getFaqData('/automations', pageUrl);
    const blogTags = 'templates';
    const blogData = await getBlogData({ tag1: blogTags }, pageUrl);
    const navbarData = await getNavbarData(NAVBAR_FIELDS, '', pageUrl);

    const validStatuses = ['verified_by_ai', 'verified'];

    const templateData = templates.filter((t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0);

    const verifiedTemplates = templateData.filter((t) => validStatuses.includes(t.verified));

    const validTemplateData = validateTemplateData(verifiedTemplates);

    const initialApps = await getApps({ limit: 50 }, pageUrl);

    const categories = [
        ...new Set(templateData.flatMap((template) => template.category ?? []).filter((c) => c != null)),
    ];
    const apps = [
        ...new Map(
            templateData
                .flatMap((template) => {
                    // Base apps from pluginData
                    const baseApps = (template.pluginData ?? []).map((p) => ({
                        iconurl: p.iconurl,
                        pluginname: p.pluginname,
                        pluginslugname: p.pluginslugname,
                    }));

                    // Extra apps for webhook/cron trigger types
                    const extraApps = [];
                    if (template.triggerType === 'webhook') {
                        extraApps.push({
                            pluginname: 'Webhook',
                            pluginslugname: 'webhook',
                        });
                    }
                    if (template.triggerType === 'cron') {
                        extraApps.push({
                            pluginname: 'Cron',
                            pluginslugname: 'cron',
                        });
                    }

                    return [...baseApps, ...extraApps];
                })
                // Filter out invalid entries
                .filter((app) => app && app.pluginname)
                // Map to key-value pairs for uniqueness by slugname
                .map((app) => [app.pluginslugname, app])
        ).values(),
    ].sort((a, b) => a.pluginname.localeCompare(b.pluginname));

    return {
        props: {
            footerData: footerData || [],
            metaData: metaData || {
                title: 'Workflow Automation Templates',
                description: 'Discover and use pre-built workflow automation templates',
                keywords: 'automation, templates, workflow',
            },
            templateToShow: validTemplateData || [],
            faqData: faqData || [],
            blogData: blogData || [],
            categories: categories || [],
            apps: apps || [],
            navbarData: navbarData || [],
            initialApps: initialApps || [],
        },
    };
}
