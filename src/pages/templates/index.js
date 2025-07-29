import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FOOTER_FIELDS, TEMPLATES_FIELDS } from '@/const/fields';
import { getFooterData, getValidTemplatesData } from '@/utils/getData';
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdSearch } from 'react-icons/md';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import { getBlogData } from '@/utils/getBlogData';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getTemplates } from '@/utils/axiosCalls';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { useRouter } from 'next/router';
import AutomationSuggestions from '../workflow-automation-ideas';

export const runtime = 'experimental-edge';

const TEMPLATES_PER_PAGE = 6;

const Template = ({ footerData, templateToShow, metaData, faqData, blogData }) => {
    const [visibleCount, setVisibleCount] = useState(TEMPLATES_PER_PAGE);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Auto heading carousel
    useEffect(() => {
        if (templateToShow.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % templateToShow.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [templateToShow]);

    useEffect(() => {
        setFilteredTemplates(templateToShow);
        setLoading(false);
    }, []);

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

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + TEMPLATES_PER_PAGE);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setVisibleCount(TEMPLATES_PER_PAGE);
        setIsSearching(value.trim().length > 0);

        const filtered = templateToShow.filter((template) =>
            template.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTemplates(filtered);
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/templates'} />
            <Navbar footerData={footerData} utm={'/template'} />

            <div className="w-full cont gap-12 overflow-x-hidden">
                <div className="container pt-20 pb-10">
                    <div className="cont">
                        <h1 className="h1">
                            {templateToShow.length > 0 ? (
                                <>
                                    <span className="text-accent">Automate</span> {templateToShow[currentIndex]?.title}
                                </>
                            ) : (
                                <>
                                    Workflow <span className="text-accent">Automation</span> Templates
                                </>
                            )}
                        </h1>

                        {templateToShow.length > 0 && (
                            <div className="flex justify-end gap-2 mt-2">
                                <button onClick={handleInstall} className="btn btn-accent">
                                    Install
                                </button>
                                <button onClick={handlePrev} className="btn btn-outline bg-white">
                                    <MdKeyboardArrowLeft size={32} />
                                </button>
                                <button onClick={handleNext} className="btn btn-outline bg-white">
                                    <MdKeyboardArrowRight size={32} />
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

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(TEMPLATES_PER_PAGE)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[500px] rounded-none"></div>
                            ))}
                        </div>
                    ) : filteredTemplates.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                                {filteredTemplates.slice(0, visibleCount).map((template, index) => (
                                    <TemplateCard key={template.id} index={index} template={template} />
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
                    ) : (
                        <div className="cont gap-4">
                            <p className="h3">
                                We couldn't find any templates matching your search. Tell us about your use case, and
                                we'll craft a custom template just for you.
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
    const validTemplate = await getValidTemplatesData(TEMPLATES_FIELDS, '', pageUrl);
    const metaData = await getMetaData('/templates', pageUrl);
    const faqData = await getFaqData('/templates', pageUrl);
    const blogTags = 'templates';
    const blogData = await getBlogData({ tag1: blogTags }, pageUrl);

    const validTemplateIds = validTemplate.map((t) => t.name);
    const validTemplateData = templateData.filter((template) => validTemplateIds.includes(template.id));

    return {
        props: {
            footerData: footerData || [],
            metaData: metaData || {},
            templateToShow: validTemplateData || [],
            faqData: faqData || [],
            blogData: blogData || [],
        },
    };
}
