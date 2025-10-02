import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FOOTER_FIELDS } from '@/const/fields';
import { getFooterData } from '@/utils/getData';
import { MdKeyboardArrowDown, MdClose } from 'react-icons/md';
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
import { Webhook, Timer } from 'lucide-react';
import FlowRenderer from '@/components/flowComp/flowRenderer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const runtime = 'experimental-edge';

const TEMPLATES_PER_PAGE = 6;

const Template = ({ footerData, templateToShow, metaData, faqData, blogData, categories, apps }) => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [carouselRef, carouselInView] = useScrollAnimation({ threshold: 0.2 });
    const [chipsRef, chipsInView] = useScrollAnimation({ threshold: 0.2 });
    const [templatesRef, templatesInView] = useScrollAnimation({ threshold: 0.1 });
    const [blogRef, blogInView] = useScrollAnimation({ threshold: 0.1 });
    const [faqRef, faqInView] = useScrollAnimation({ threshold: 0.1 });

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
        setHeroLoaded(true);
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
            router.push(
                `/templates/${currentTemplate?.title
                    ?.trim()
                    .replace(/[^a-zA-Z0-9\s]/g, '') // remove special characters
                    .replace(/\s+/g, '-') // replace spaces with '-'
                    .toLowerCase()}/${currentTemplate?.id}`
            );
        }
    };

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

    // Choose which list to display: if there are items beyond the "latest" slice, use them; otherwise use all filtered
    const displayTemplates = remainingTemplates.length > 0 ? remainingTemplates : filteredTemplates;
    const hasMoreToShow = visibleCount < displayTemplates.length;

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/templates'} />
            <Navbar footerData={footerData} utm={'/template'} />

            <div className="w-full cont gap-12 overflow-x-hidden">
                <div className="container pt-20 pb-10">
                    <div className={`cont ${heroLoaded ? 'animate-fade-in-up' : ''}`}>
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
                    <div
                        ref={carouselRef}
                        className={`h-[400px] relative transition-all duration-1000 ${carouselInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            }`}
                    >
                        <div className="flex lg:flex-row gap-9 h-full items-stretch">
                            {/* Left side - Template Image */}
                            <div className="flex-1 min-h-0 overflow-hidden ">
                                <div className="h-[400px] w-full overflow-hidden flex justify-center bg-white border custom-border relative">
                                    <div className="block m-0 max-h-full max-w-full object-contain pt-4">
                                        <FlowRenderer
                                            flowJson={templateToShow[currentIndex]?.flowJson}
                                            scale={'70'}
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none bg-gradient-to-t from-white to-transparent" />
                                </div>
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

                    <div
                        ref={chipsRef}
                        className={`transition-all duration-700 ${chipsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
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
                            {displayTemplates.length > 0 && (
                                <>
                                    {/* <h2 className="h2 mb-4 mt-3">All Templates</h2> */}
                                    <div
                                        ref={templatesRef}
                                        className={`mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 transition-all duration-700 ${templatesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                            }`}
                                    >
                                        {displayTemplates.slice(0, visibleCount).map((template, index) => (
                                            <TemplateCard key={template.id} index={index} template={template} />
                                        ))}
                                    </div>
                                    {hasMoreToShow && (
                                        <div className="flex justify-end w-full mt-4 animate-fade-in-up animation-delay-200">
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
                            <p className="h3 mt-20">
                                We couldn't find any templates matching your {totalFilters > 0 ? 'filters' : 'search'}.
                                {totalFilters > 0 && ' Try removing some filters or '}
                                Tell us about your use case, and we'll craft a custom template just for you.
                            </p>
                            <AutomationSuggestions />
                        </div>
                    )}
                </div>

                <div className="cont gap-12 md:gap-16 lg:gap-20">
                    <div
                        ref={blogRef}
                        className={`container transition-all duration-700 ${blogInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        <BlogGrid posts={blogData} />
                    </div>
                    <div className="pb-4">
                        {faqData?.length > 0 && (
                            <div
                                ref={faqRef}
                                className={`container transition-all duration-700 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                            >
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
    const templates = await getTemplates(pageUrl);
    const metaData = await getMetaData('/templates', pageUrl);
    const faqData = await getFaqData('/templates', pageUrl);
    const blogTags = 'templates';
    const blogData = await getBlogData({ tag1: blogTags }, pageUrl);

    const validStatuses = ['verified_by_ai', 'verified'];

    const templateData = (templates).filter(
        t => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
    )

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
                keywords: 'automation, templates, workflow',
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
