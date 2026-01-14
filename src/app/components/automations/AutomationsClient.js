'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import TemplateCard from '@/components/templateCard/templateCard';
import { MdKeyboardArrowDown, MdClose } from 'react-icons/md';
import AutomationSuggestionsClient from '../workflow-automation-ideas/AutomationSuggestionsClient';
import { useTemplateFilters } from '@/hooks/useTemplateFilters';
import { Webhook, Timer } from 'lucide-react';
import MarqueeComponent from '@/components/marqueeComponent/marqueeComponent';
import BlogGrid from '../blog/BlogGrid';
import FaqSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import DashboardButton from '@/components/dashboardButton/dashboardButton';
import SearchInputHomeOptimized from '../home/SearchInputHomeOptimized';
import BuildOptionsCTAOptimized from '../home/BuildOptionsCTAOptimized';

const TEMPLATES_PER_PAGE = 6;

export default function AutomationsClient({ pageData }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    
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
    } = useTemplateFilters(pageData?.templateToShow || []);

    useEffect(() => {
        if (!pageData?.templateToShow?.length) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % pageData.templateToShow.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [pageData?.templateToShow]);

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
    const templatesFromSearchActive = showSearchTemplates;
    const displayTemplates = templatesFromSearchActive
        ? filteredSearchTemplates
        : remainingTemplates.length > 0
          ? remainingTemplates
          : filteredTemplates;
    const hasMoreToShow = visibleCount < displayTemplates.length;

    return (
        <div className="w-full cont gap-12 pt-12 overflow-x-hidden dotted-background global-top-space">
            <div className="container">
                <h1 className="h1 text-center">
                    <span className="text-accent">Search</span> ready to use automations
                </h1>
                <SearchInputHomeOptimized
                    onTemplatesChange={handleTemplatesChange}
                    onLoadingChange={handleLoadingChange}
                    onSelectionChange={handleSelectionChange}
                    initialApps={pageData.initialApps}
                    enableVideos={false}
                    enableBlogs={false}
                    enableAi={false}
                    templates={pageData.templateToShow}
                />
                <MarqueeComponent
                    onTemplatesChange={handleTemplatesChange}
                    onSelectionChange={handleSelectionChange}
                    categories={pageData.categories}
                    templates={pageData.templateToShow}
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
                                const appData = pageData.apps.find((a) => a.pluginslugname === appSlug);
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
                                        <div className="flex items-center gap-1">
                                            {appSlug === 'webhook' ? (
                                                <Webhook size={14} />
                                            ) : appSlug === 'cron' ? (
                                                <Timer size={14} />
                                            ) : (
                                                appData?.iconurl && (
                                                    <Image
                                                        src={appData.iconurl}
                                                        alt={label}
                                                        width={14}
                                                        height={14}
                                                        className="rounded"
                                                    />
                                                )
                                            )}
                                            {label}
                                        </div>
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
                                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
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
                                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
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
                        <AutomationSuggestionsClient />
                    </div>
                )}

                {/* Clear Filters */}
                {totalFilters > 0 && (
                    <div className="flex justify-center mt-4">
                        <button onClick={clearAllFilters} className="text-accent hover:underline">
                            Clear all filters ({totalFilters})
                        </button>
                    </div>
                )}
            </div>

            <div className="cont gap-12 md:gap-16 lg:gap-20 bg-[#FAF9F6] pt-12">
                <div className="container">
                    <div className="cont bg-[url('/assets/bg-img/shapes-bg.svg')] bg-cover bg-center bg-transparent items-center justify-center p-6 md:p-12 h-[600px] overflow-hidden border mt-12">
                        <div className="border flex flex-col justify-center items-center p-6 md:p-12 gap-4 bg-white lg:min-w-[900px] text-center h-[400px]">
                            <h2 className="h2">Can't find the right template?</h2>
                            <h2 className="h2">Start with AI</h2>
                            <DashboardButton utm_src={"/automations"}/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    {pageData.blogData?.length > 0 && <BlogGrid posts={pageData.blogData} />}
                </div>
                <div className="pb-4">
                    {pageData.faqData?.length > 0 && (
                        <FaqSection faqData={pageData.faqData} faqName={'/automations'} />
                    )}
                    <div className="container">
                        <Footer footerData={pageData.footerData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
