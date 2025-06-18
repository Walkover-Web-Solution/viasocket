import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FAQS_FIELDS, FOOTER_FIELDS, TEMPLATES_FIELDS } from '@/const/fields';
import { getFaqData, getFooterData, getValidTemplatesData } from '@/utils/getData';
import { MdKeyboardArrowDown, MdSearch } from 'react-icons/md';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import { getBlogData } from '@/utils/getBlogData';
import BlogGrid from '@/components/blogGrid/blogGrid';
import { getTemplates } from '@/utils/axiosCalls';
import { getMetaData } from '@/utils/getMetaData';

export const runtime = 'experimental-edge';

const TEMPLATES_PER_PAGE = 6;

const Template = ({ footerData, templateData, validTemplates, metaData, faqData, blogData }) => {
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
            <Navbar footerData={footerData} utm={'/template'} />

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
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(TEMPLATES_PER_PAGE)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[500px] rounded-none"></div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="cont gap-12 md:gap-16 lg:gap-20 mt-20">
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
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/templates'`, pageUrl);
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
