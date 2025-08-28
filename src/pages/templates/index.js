import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FOOTER_FIELDS } from '@/const/fields';
import { getFooterData } from '@/utils/getData';
import { MdKeyboardArrowDown } from 'react-icons/md';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import { getBlogData } from '@/utils/getBlogData';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getTemplates } from '@/utils/axiosCalls';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { useRouter } from 'next/router';
import AutomationSuggestions from '../workflow-automation-ideas';
import TitleWithButtons from '@/components/templateCard/titleWithButtons';
import AutocompleteFilter from '@/components/templateCard/automcompleteFilter';
import { useTemplateFilters } from '@/hooks/useTemplateFilters';
import { validateTemplateData } from '@/utils/validateTemplateData';

export const runtime = 'experimental-edge';

const TEMPLATES_PER_PAGE = 6;

const Template = ({ footerData, templateToShow, metaData, faqData, blogData, categories, apps }) => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    
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
    
    console.log(templateToShow,"templateToShow"); 
    console.log(filteredTemplates,"filteredTemplates"); 
    
    useEffect(() => {
        setLoading(false);
    }, [templateToShow]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? templateToShow.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % templateToShow.length);
    };

    const handleInstall = () => {
        const currentTemplate = templateToShow[currentIndex];
        if (currentTemplate) {
            router.push(`/templates/${currentTemplate.id}`);
        }
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/templates'} />
            <Navbar footerData={footerData} utm={'/template'} />

            <div className="w-full cont gap-12 overflow-x-hidden">
                <div className="container pt-20 pb-10">
                    <div className="cont">
                        {templateToShow.length > 0 ? (
                            <TitleWithButtons
                                title={templateToShow[currentIndex]?.title}
                                onInstall={handleInstall}
                                onPrev={handlePrev}
                                onNext={handleNext}
                            />
                        ) : (
                            <h1 className="h1">
                                Workflow <span className="text-accent">Automation</span> Templates
                            </h1>
                        )}
                    </div>
                </div>
                <div className="container">
                <div className="h-[400px] relative">
                    <div className="flex lg:flex-row gap-9 mb-10 h-full items-stretch">

                        {/* Left side - Template Image */}
                        <div className="flex-1 min-h-0">
                            {templateToShow[currentIndex]?.templateUrl && (
                                <img
                                    src={templateToShow[currentIndex].templateUrl}
                                    alt={templateToShow[currentIndex]?.title}
                                    className="w-full h-[400px] object-contain bg-white border custom-border"
                                />
                            )}
                        </div>
                        
                        {/* Right side - AutocompleteFilter */}
                        <div className="flex-1 min-h-0">
                            <AutocompleteFilter
                                categories={categories}
                                apps={apps}
                                searchTerm={searchTerm}
                                selectedCategories={selectedCategories}
                                selectedApps={selectedApps}
                                totalFilters={totalFilters}
                                onFilterChange={handleFilterChange}
                                onClearAll={clearAllFilters}
                            />
                        </div>
                    </div>
                </div>

                    {loading ? (
                        // Skeleton loader as before
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(TEMPLATES_PER_PAGE)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[500px] rounded-none"></div>
                            ))}
                        </div>
                    ) : hasResults ? (
                        <>
                            {/* Newly Published Section */}
                            {/* {latestTemplates.length > 0 && (
                                <div className="mb-10">
                                    <h2 className="h2 mb-4">Newly Published</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                                        {latestTemplates.map((template, index) => (
                                            <TemplateCard key={template.id} index={index} template={template} />
                                        ))}
                                    </div>
                                </div>
                            )} */}

                            {/* Rest of the Templates */}
                            {remainingTemplates.length > 0 && (
                                <>
                                    <h2 className="h2 mb-4 mt-3">All Templates</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                                        {remainingTemplates.slice(0, visibleCount).map((template, index) => (
                                            <TemplateCard key={template.id} index={index} template={template} />
                                        ))}
                                    </div>
                                    {hasMoreTemplates && (
                                        <div className="flex justify-end w-full mt-4">
                                            <button
                                                onClick={handleLoadMore}
                                                className="btn btn-outline border custom-border bg-white"
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
                            <p className="h5 mt-3">
                                We couldn't find any templates matching your{' '}
                                {totalFilters > 0 ? 'filters' : 'search'}.
                                {totalFilters > 0 && ' Try removing some filters or '}
                                Tell us about your use case, and we'll craft a custom template just for you.
                            </p>
                            <AutomationSuggestions />
                        </div>
                    )}
                </div>

                <div className="cont gap-12 md:gap-16 lg:gap-20">
                    <div className="container">
                        <BlogGrid posts={blogData} />
                    </div>
                    <div className="pb-4">
                        {faqData?.length > 0 && (
                            <div className="container">
                                <FAQSection faqData={faqData} faqName={'/templates'} />
                            </div>
                        )}
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
    const templateData = await getTemplates(pageUrl);
    const metaData = await getMetaData('/templates', pageUrl);
    const faqData = await getFaqData('/templates', pageUrl);
    const blogTags = 'templates';
    const blogData = await getBlogData({ tag1: blogTags }, pageUrl);

    const validStatuses = ['verified_by_ai', 'verified'];

    const verifiedTemplates = templateData.filter((t) => validStatuses.includes(t.verified));

    const validTemplateData = validateTemplateData(verifiedTemplates);
    
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
                keywords: 'automation, templates, workflow'
            },
            templateToShow: validTemplateData || [],
            faqData: faqData || [],
            blogData: blogData || [],
            templateData: templateData || [],
            categories: categories || [],
            apps: apps || [],
        },
    };
}
