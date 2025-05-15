import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FAQS_FIELDS, FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS, TEMPLATES_FIELDS } from '@/const/fields';
import { getFaqData, getFooterData, getMetaData, getNavData, getValidTemplatesData } from '@/utils/getData';
import { MdKeyboardArrowDown, MdSearch } from 'react-icons/md';
import getTemplates from '@/utils/getTemplates';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import { getBlogData } from '@/utils/getBlogData';
import BlogGrid from '@/components/blogGrid/blogGrid';

export const runtime = 'experimental-edge';

const TEMPLATES_PER_PAGE = 6;

const backgroundColors = [
    { background: 'linear-gradient(105deg, #2F3C4F 2.92%, #4B5E73 100%)' }, // Deep steel blue
    { background: 'linear-gradient(104deg, #4C3B4D 2.92%, #705775 100%)' }, // Faded royal purple
    { background: 'linear-gradient(105deg, #5A5148 2.92%, #837263 100%)' }, // Muted cocoa
    { background: 'linear-gradient(105deg, #1F232A 2.92%, #3B4048 100%)' }, // Subtle graphite
    { background: 'linear-gradient(105deg, #3C4F57 2.92%, #627D87 100%)' }, // Foggy cyan-gray
    { background: 'linear-gradient(104deg, #4A646C 2.92%, #5F7C84 100%)' }, // Stormy teal
    { background: 'linear-gradient(105deg, #593A56 2.92%, #8C6285 100%)' }, // Mauve dusk
];

const Template = ({ navData, footerData, templateData, validTemplates, metaData, faqData, blogData }) => {
    const [visibleCount, setVisibleCount] = useState(TEMPLATES_PER_PAGE);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + TEMPLATES_PER_PAGE);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setVisibleCount(TEMPLATES_PER_PAGE);
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/templates'} />
            <div className="sticky top-0 z-[100] border-b transparent-border-black">
                <Navbar navData={navData} utm={'/template'} />
            </div>
            <div className="w-full cont gap-12 overflow-x-hidden">
                <div className="container pt-20 pb-10">
                    <div className="flex flex-col text-left gap-2">
                        <h2 className="h6 text-accent">Click. Build. Succeed.</h2>
                        <h1 className="h1">
                            Workflow Automation <span className="text-accent">Templates</span>
                        </h1>
                        <p className="sub__h1 ">
                            Take a look at our awesome collection of Workflow Automation Templates that automate your
                            daily tasks and help you grow.
                        </p>
                    </div>
                </div>

                <div className="cont container">
                    <div className="max-w-[400px] w-full mb-8">
                        <label className="input border-2 transparent-border-black flex items-center gap-1 focus-within:outline-none h-[42px]">
                            <MdSearch size={20} />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="grow py-2 px-3"
                            />
                        </label>
                    </div>

                    {filteredTemplates.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                                {filteredTemplates.slice(0, visibleCount).map((template, index) => (
                                    <TemplateCard
                                        key={template.id}
                                        template={template}
                                        backgroundColor={backgroundColors[index % backgroundColors.length]}
                                    />
                                ))}
                            </div>
                            {visibleCount < filteredTemplates.length && (
                                <div className="flex justify-end w-full container mt-4">
                                    <button
                                        onClick={handleLoadMore}
                                        className="btn btn-outline border-2 transparent-border-black bg-white"
                                    >
                                        Load More <MdKeyboardArrowDown size={24} />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex justify-center w-full py-12">
                            <div className="text-center">
                                <h3 className="text-xl font-medium mb-2">No templates found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="cont gap-20 mt-20">
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

export async function getServerSideProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const templateData = await getTemplates();
    const validTemplates = await getValidTemplatesData(TEMPLATES_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/templates'`);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/templates'`);
    const blogTags = 'templates';
    const blogData = await getBlogData({ tag1: blogTags });
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            templateData: templateData || [],
            validTemplates: validTemplates || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            faqData: faqData || [],
            blogData: blogData || [],
        },
    };
}
