import React, { useState, useEffect, useRef } from 'react';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import TemplateCard from '@/components/templateCard/templateCard';
import { FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS, TEMPLATES_FIELDS } from '@/const/fields';
import { getFooterData, getMetaData, getNavData, getValidTemplatesData } from '@/utils/getData';
import { MdKeyboardArrowDown, MdSearch } from 'react-icons/md';
import { FiFilter } from 'react-icons/fi';
import getTemplates from '@/utils/getTemplates';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';

export const runtime = 'experimental-edge';

const Template = ({ navData, footerData, templateData, validTemplates, metaData }) => {
    console.log(templateData);
    const [visibleCount, setVisibleCount] = useState(6);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApps, setSelectedApps] = useState([]);
    const [availableApps, setAvailableApps] = useState([]);
    const [showAppFilter, setShowAppFilter] = useState(false);
    const filterRef = useRef(null);

    useEffect(() => {
        const validTemplateNames = validTemplates.map((t) => t.name);
        const filtered = templateData.filter((template) => validTemplateNames.includes(template.id));
        setFilteredTemplates(filtered);

        const apps = new Set();
        filtered.forEach((template) => {
            const serviceNames = template?.published_json_script?.trigger?.serviceName?.split(' ') || [];
            if (serviceNames.length > 0) {
                serviceNames.forEach((app) => {
                    if (app) apps.add(app);
                });
            }

            const blocks = template?.published_json_script?.blocks || {};
            Object.values(blocks).forEach((block) => {
                if (block?.serviceName) {
                    block.serviceName.split(' ').forEach((app) => {
                        if (app) apps.add(app);
                    });
                }
            });
        });

        setAvailableApps(Array.from(apps).sort());
    }, [templateData, validTemplates]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowAppFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

        if (selectedApps.length > 0) {
            filtered = filtered.filter((template) => {
                const triggerService = template?.published_json_script?.trigger?.serviceName || '';
                const triggerApps = triggerService.split(' ');

                const blocks = template?.published_json_script?.blocks || {};
                const blockApps = [];
                Object.values(blocks).forEach((block) => {
                    if (block?.serviceName) {
                        block.serviceName.split(' ').forEach((app) => {
                            if (app) blockApps.push(app);
                        });
                    }
                });

                return selectedApps.some((app) => triggerApps.includes(app) || blockApps.includes(app));
            });
        }

        setFilteredTemplates(filtered);
    }, [searchTerm, selectedApps, templateData, validTemplates]);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAppToggle = (app) => {
        if (selectedApps.includes(app)) {
            setSelectedApps(selectedApps.filter((a) => a !== app));
        } else {
            setSelectedApps([...selectedApps, app]);
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedApps([]);
    };

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/templates'} />
            <div className="container sticky top-0 z-[100]">
                <Navbar navData={navData} utm={'/template'} />
            </div>
            <div className="w-full cont gap-12 overflow-x-hidden">
                <div className="container flex justify-center items-center py-20">
                    <div className="flex flex-col items-center justify-center text-center gap-2 max-w-[1200px]">
                        <h1 className="h1">Ready-Made Workflow Automation Templates</h1>
                        <h2 className="h1 text-accent !font-bold">Click. Build. Succeed.</h2>
                        <h2 className="sub__h1  max-w-[900px]">
                            Take a look at our awesome collection of Workflow Automation Templates that automate your
                            daily tasks and help you grow.
                        </h2>
                    </div>
                </div>

                <div className="container max-w-[1200px]">
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <label className="input border flex-grow border-black flex items-center gap-2 focus-within:outline-none h-[42px]">
                            <MdSearch size={20} />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="grow py-2 px-3"
                            />
                        </label>
                        <div className="relative" ref={filterRef}>
                            <button
                                className={`flex items-center gap-2 px-4 h-[42px] border border-black ${selectedApps.length > 0 ? 'bg-accent text-white' : ''}`}
                                onClick={() => setShowAppFilter(!showAppFilter)}
                            >
                                <FiFilter />
                                Filter by App {selectedApps.length > 0 && `(${selectedApps.length})`}
                            </button>

                            {showAppFilter && (
                                <div className="absolute right-0 mt-2 p-4 bg-white shadow-lg rounded-md z-10 w-64">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium">Filter by App</h3>
                                        <button className="text-sm text-accent" onClick={() => setSelectedApps([])}>
                                            Clear
                                        </button>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto">
                                        {availableApps.map((app) => (
                                            <div key={app} className="flex items-center mb-2">
                                                <input
                                                    type="checkbox"
                                                    id={`app-${app}`}
                                                    checked={selectedApps.includes(app)}
                                                    onChange={() => handleAppToggle(app)}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`app-${app}`}>{app}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="cont gap-8 items-center">
                    {filteredTemplates.length > 0 ? (
                        <>
                            {filteredTemplates.slice(0, visibleCount).map((template) => (
                                <TemplateCard key={template.id} template={template} />
                            ))}
                            {visibleCount < filteredTemplates.length && (
                                <div className="flex max-w-[1200px] w-full justify-end">
                                    <button
                                        onClick={handleLoadMore}
                                        className="btn btn-outline border-2 border-gray-400 w-full"
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
                <div className="pb-4">
                    <div className="container">
                        <Footer footerData={footerData} />
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

    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            templateData: templateData || [],
            validTemplates: validTemplates || [],
            metaData: metaData || [],
        },
    };
}
