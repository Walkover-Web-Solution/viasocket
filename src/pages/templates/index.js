import React, { useState, useEffect, useRef } from 'react';
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

const Template = ({ footerData, templateToShow, metaData, faqData, blogData, templateData, categories }) => {
    const router = useRouter();

    const [visibleCount, setVisibleCount] = useState(TEMPLATES_PER_PAGE);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

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

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + TEMPLATES_PER_PAGE);
    };

    const filterTemplates = (search, categories) => {
        let filtered = templateToShow;

        if (categories.length > 0) {
            filtered = filtered.filter((template) => {
                return template.category && template.category.some((cat) => categories.includes(cat));
            });
        }

        if (search.trim()) {
            filtered = filtered.filter((template) => template.title.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredTemplates(filtered);
        setVisibleCount(TEMPLATES_PER_PAGE);
    };

    useEffect(() => {
        filterTemplates(searchTerm, selectedCategories);
    }, [searchTerm, selectedCategories, templateToShow]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const toggleCategory = (category) => {
        setSelectedCategories((prev) => {
            const newCategories = prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category];

            return newCategories;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCategoryDropdown && !event.target.closest('.relative')) {
                setShowCategoryDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showCategoryDropdown]);

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

                <div className="cont container">
                    <div className="flex flex-col lg:flex-row gap-6 mb-8">
                        <div className="flex-1">
                            <div className="input border max-w-[400px] custom-border flex items-center gap-2 focus-within:outline-none bg-white">
                                <MdSearch fontSize={20} />
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        {categories?.length > 0 && (
                            <div className="">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                        className="w-full px-4 py-3 bg-white border custom-border text-left flex items-center justify-between gap-2 focus:outline-none"
                                    >
                                        {selectedCategories.length === 0 ? (
                                            'Filter'
                                        ) : (
                                            <div className="flex gap-1 items-center">
                                                <div className="w-6 h-6 flex items-center justify-center bg-gray-100 border custom-border text-sm font-medium">
                                                    {selectedCategories.length}
                                                </div>
                                                Filter
                                            </div>
                                        )}
                                        <MdKeyboardArrowDown
                                            className={`transform transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`}
                                            size={20}
                                        />
                                    </button>

                                    {showCategoryDropdown && (
                                        <div className="absolute top-full right-0 w-60 mt-1 bg-white border custom-border z-50 max-h-64 overflow-y-auto">
                                            {categories.map((category) => (
                                                <label
                                                    key={category}
                                                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <div className="relative">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCategories.includes(category)}
                                                            onChange={() => toggleCategory(category)}
                                                            className="sr-only"
                                                        />
                                                        <div
                                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                                                selectedCategories.includes(category)
                                                                    ? 'bg-gray-500 border-gray-500'
                                                                    : 'border-gray-300 bg-white'
                                                            }`}
                                                        >
                                                            {selectedCategories.includes(category) && (
                                                                <svg
                                                                    className="w-3 h-3 text-white"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="ml-2 h6">{category}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
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
                                We couldn't find any templates matching your{' '}
                                {selectedCategories.length > 0 ? 'filters' : 'search'}.
                                {selectedCategories.length > 0 && ' Try removing some category filters or '}
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

function TitleWithButtons({ title, onInstall, onPrev, onNext }) {
    const [firstLine, setFirstLine] = useState('');
    const [secondLine, setSecondLine] = useState('');
    const measureRef = useRef(null);

    useEffect(() => {
        if (!title || !measureRef.current) return;

        const cleanTitle = title.replace(/^Automate[d]?\s*/i, '');
        const fullTitle = `Automate ${cleanTitle}`;

        const measurer = document.createElement('div');
        measurer.style.position = 'absolute';
        measurer.style.visibility = 'hidden';
        measurer.style.whiteSpace = 'nowrap';
        measurer.className = measureRef.current.className;
        document.body.appendChild(measurer);

        const containerWidth = measureRef.current.offsetWidth;
        const buttonWidth = 250;
        const availableSecondLineWidth = containerWidth - buttonWidth;

        let firstLineChars = 0;
        for (let i = 1; i <= fullTitle.length; i++) {
            measurer.textContent = fullTitle.substring(0, i);
            if (measurer.offsetWidth > containerWidth) {
                firstLineChars = i - 1;
                break;
            }
        }

        if (firstLineChars === 0 || firstLineChars >= fullTitle.length) {
            setFirstLine(fullTitle);
            setSecondLine('');
        } else {
            let breakPoint = firstLineChars;
            while (breakPoint > 0 && fullTitle[breakPoint] !== ' ') {
                breakPoint--;
            }

            if (breakPoint === 0) breakPoint = firstLineChars;

            const firstPart = fullTitle.substring(0, breakPoint);
            let secondPart = fullTitle.substring(breakPoint).trim();

            measurer.textContent = secondPart;
            if (measurer.offsetWidth > availableSecondLineWidth) {
                while (secondPart.length > 0) {
                    measurer.textContent = secondPart + '...';
                    if (measurer.offsetWidth <= availableSecondLineWidth) {
                        secondPart = secondPart + '...';
                        break;
                    }
                    secondPart = secondPart.slice(0, -1);
                }
            }

            setFirstLine(firstPart);
            setSecondLine(secondPart);
        }

        document.body.removeChild(measurer);
    }, [title]);

    return (
        <div ref={measureRef} className="h1">
            <div>
                <span className="text-accent">Automate</span> {firstLine.replace(/^Automate\s*/i, '')}
            </div>
            {secondLine && (
                <div className="flex justify-between items-center">
                    <span>{secondLine}</span>
                    <div className="flex gap-2">
                        <button onClick={onInstall} className="btn btn-accent">
                            Install
                        </button>
                        <button onClick={onPrev} className="btn btn-outline bg-white">
                            <MdKeyboardArrowLeft size={32} />
                        </button>
                        <button onClick={onNext} className="btn btn-outline bg-white">
                            <MdKeyboardArrowRight size={32} />
                        </button>
                    </div>
                </div>
            )}
            {!secondLine && (
                <div className="flex justify-end gap-2 mt-2">
                    <button onClick={onInstall} className="btn btn-accent">
                        Install
                    </button>
                    <button onClick={onPrev} className="btn btn-outline bg-white">
                        <MdKeyboardArrowLeft size={32} />
                    </button>
                    <button onClick={onNext} className="btn btn-outline bg-white">
                        <MdKeyboardArrowRight size={32} />
                    </button>
                </div>
            )}
        </div>
    );
}

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

    const validTemplateData = templateData.filter((template) => validStatuses.includes(template.verified));
    const categories = [
        ...new Set(templateData.flatMap((template) => template.category ?? []).filter((c) => c != null)),
    ];
    return {
        props: {
            footerData: footerData || [],
            metaData: metaData || {},
            templateToShow: validTemplateData || [],
            faqData: faqData || [],
            blogData: blogData || [],
            templateData: templateData || [],
            categories: categories || [],
        },
    };
}
