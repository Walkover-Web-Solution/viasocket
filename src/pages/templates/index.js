import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FOOTER_FIELDS, TEMPLATES_FIELDS } from '@/const/fields';
import { getFooterData, getValidTemplatesData } from '@/utils/getData';
import { MdKeyboardArrowDown, MdSearch } from 'react-icons/md';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import { getBlogData } from '@/utils/getBlogData';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getTemplates } from '@/utils/axiosCalls';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import AutomationSuggestions from '../workflow-automation-ideas';
import { useRouter } from 'next/router';

export const runtime = 'experimental-edge';

const TEMPLATES_PER_PAGE = 6;

const Template = ({
    footerData,
    templateData,
    validTemplates,
    metaData,
    faqData,
    blogData,
    automationSuggestionsData,
}) => {
    const [visibleCount, setVisibleCount] = useState(TEMPLATES_PER_PAGE);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const validTemplateNames = validTemplates.map((t) => t.name);
        let filtered = templateData.filter((template) => validTemplateNames.includes(template.id));

        if (searchTerm) {
            filtered = filtered.filter(
                (template) =>
                    template.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    template.metadata?.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredTemplates(filtered);
    }, [searchTerm, templateData, validTemplates]);

    useEffect(() => {
        if (filteredTemplates.length > 0) {
            setCurrentIndex(0);
        }
    }, [filteredTemplates]);

    useEffect(() => {
        if (filteredTemplates.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % filteredTemplates.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [filteredTemplates]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? filteredTemplates.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredTemplates.length);
    };

    const handleInstall = () => {
        const currentTemplate = filteredTemplates[currentIndex];
        if (currentTemplate) {
            router.push(`/templates/${currentTemplate.id}`);
        }
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + TEMPLATES_PER_PAGE);
    };
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setVisibleCount(TEMPLATES_PER_PAGE);
        setIsSearching(value.trim().length > 0);
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/templates'} />
            <Navbar footerData={footerData} utm={'/template'} />

            <div className="w-full cont gap-12 overflow-x-hidden">
                <div className="container pt-20 pb-10">
                    <div className="cont gap-4">
                        <h1 className="h1">
                            {filteredTemplates.length > 0
                                ? filteredTemplates[currentIndex]?.title
                                : 'Loading Templates...'}
                        </h1>
                        {filteredTemplates.length > 0 && (
                            <div className="flex gap-2 items-center justify-end">
                                <button onClick={handlePrev} className="btn btn-outline bg-white">
                                    Prev
                                </button>
                                <button onClick={handleNext} className="btn btn-outline bg-white">
                                    Next
                                </button>
                                <button onClick={handleInstall} className="btn btn-accent">
                                    Install
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cont container">
                    <div className="max-w-[400px] w-full">
                        <label className="input border custom-border flex items-center gap-1 focus-within:outline-none h-[42px] mb-4">
                            <MdSearch size={20} />
                            <input
                                type="text"
                                placeholder="Search templates"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="grow py-2 px-1"
                            />
                        </label>
                    </div>

                    {filteredTemplates.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                                {filteredTemplates.slice(0, visibleCount).map((template) => (
                                    <TemplateCard key={template.id} template={template} />
                                ))}
                            </div>
                            {visibleCount < filteredTemplates.length && (
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
                    ) : isSearching ? (
                        <h3 className="h3">No templates found</h3>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(TEMPLATES_PER_PAGE)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[500px] rounded-none"></div>
                            ))}
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
    const validTemplates = await getValidTemplatesData(TEMPLATES_FIELDS, '', pageUrl);
    const metaData = await getMetaData('/templates', pageUrl);
    const faqData = await getFaqData('/templates', pageUrl);
    const blogTags = 'templates';
    const blogData = await getBlogData({ tag1: blogTags }, pageUrl);
    return {
        props: {
            footerData: footerData || [],
            templateData: templateData || [],
            validTemplates: validTemplates || [],
            metaData: metaData || {},
            faqData: faqData || [],
            blogData: blogData || [],
        },
    };
}
