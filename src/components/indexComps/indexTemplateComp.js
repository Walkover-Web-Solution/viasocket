import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTemplates } from '@/utils/axiosCalls';
import { RiSearchLine } from 'react-icons/ri';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { FaBullhorn, FaUserGroup } from 'react-icons/fa6';
import { MdManageAccounts, MdHeadset } from 'react-icons/md';
import FlowRenderer from '../flowComp/flowRenderer';
import { FaInternetExplorer } from 'react-icons/fa';
import { TbTemplate } from "react-icons/tb";

const IndexTemplateComp = ({ categories }) => {
    const [selected, setSelected] = useState({
        name: 'Finance',
        scriptid: '72077fe9954a5122c1301f4a0dce567ebd54e5d5e6c0e4ff05cfd884361c7e52',
    });
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState(null);

    // Fetch templates once
    useEffect(() => {
        const fetchTemplates = async () => {
            setIsLoading(true);
            try {
                const data = await getTemplates();
                setTemplates(data || []);
            } catch (error) {
                console.error('Error fetching templates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    // Create a map of templates { [id]: template }
    const templateMap = useMemo(() => {
        const map = {};
        templates.forEach((template) => {
            map[template.id] = template;
        });
        return map;
    }, [templates]);

    // Set default template if available
    useEffect(() => {
        if (!currentTemplate && templateMap[selected?.scriptid]) {
            setCurrentTemplate(templateMap[selected?.scriptid]);
        }
    }, [templateMap, selected, currentTemplate]);

    const handleSelectCategory = (cat) => {
        setSelected(cat);
        setCurrentTemplate(templateMap[cat?.scriptid]);
    };

    const getTemplateLink = () => {
        const template = templateMap[selected?.scriptid];
        return template
            ? `/automations/${template?.title
                  ?.trim()
                  .replace(/[^a-zA-Z0-9\s]/g, '') // remove special characters
                  .replace(/\s+/g, '-') // replace spaces with '-'
                  .toLowerCase()}/${template?.id}`
            : '#';
    };

    return (
        <div className="cont gap-8 container relative">
            {/* <div className="flex justify-between items-center gap-1">
                <h2 className="h2 text-white font-bold">Must use template department wise.</h2>
                <Link href="/automations" target="_blank" className="btn btn-outline">
                    <span>Explore all templates</span>
                </Link>
            </div> */}

            <div className="cont gap-4">
                <div className="hidden md:flex flex-col gap-8 w-full">
                    <div className="flex gap-4 justify-center">
                        {categories?.slice(0, 5)?.map((cat, i) => (
                            <button
                                key={cat?.name}
                                className={`flex text-xs lg:text-sm py-2 px-4 font-medium border custom-border ${
                                    selected?.name === cat?.name ? 'bg-accent text-white' : 'bg-white text-black'
                                }`}
                                onClick={() => handleSelectCategory(cat)}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center">
                                        {cat?.name === 'HR' ? (
                                            <FaUserGroup size={24} />
                                        ) : cat?.name === 'Marketing' ? (
                                            <FaBullhorn size={24} />
                                        ) : cat?.name === 'Support' ? (
                                            <MdHeadset size={24} />
                                        ) : cat?.name === 'Finance' ? (
                                            <HiCurrencyRupee size={24} />
                                        ) : cat?.name === 'Project Management' ? (
                                            <MdManageAccounts size={24} />
                                        ) : (
                                            <RiSearchLine size={24} />
                                        )}
                                    </span>
                                    <span className="block">{cat?.name}</span>
                                </div>
                                {/* <div className="flex-1">
                                    <span className="block text-sm">
                                        {cat?.name === 'HR'
                                            ? 'On-board new employees'
                                            : cat?.name === 'Marketing'
                                              ? 'Boost social media engagement'
                                              : cat?.name === 'Support'
                                                ? 'Efficiently manage support tickets'
                                                : cat?.name === 'Finance'
                                                  ? 'Quick and simple expense approval'
                                                  : cat?.name === 'Project Management'
                                                    ? 'Instant bug alerts on slack'
                                                    : 'Discover powerful automation workflows'}
                                    </span>
                                </div> */}
                            </button>
                        ))}
                    </div>

                    <div
                        className="cont p-6 overflow-hidden dotted-background m-auto xl:w-[60vw] w-full"
                        style={{ height: '80vh' }}
                    >
                        <div className="border custom-border h-full flex flex-col justify-between">
                            {isLoading || !currentTemplate ? (
                                <div className="space-y-4">
                                    <div className="skeleton">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                    <div className="skeleton">
                                        <div className="h-[70vh] bg-gray-200 rounded-lg"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="cont p-4 max-h-[64vh] overflow-hidden">
                                    <div className="cont gap-1 mb-4">
                                        <h1 className="h3">{currentTemplate?.title}</h1>
                                        <h2 className="h6 leading-none">
                                            {currentTemplate?.metadata?.description || currentTemplate?.description}
                                        </h2>
                                    </div>
                                    <div className="w-full relative">
                                        <FlowRenderer
                                            flowJson={
                                                currentTemplate?.metadata?.flowJson ||
                                                currentTemplate?.flowJson ||
                                                'https://placehold.co/600x400'
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-end p-4 flex-wrap gap-2">
                                <Link href={getTemplateLink()} className="btn btn-accent">
                                    Use this template
                                </Link>
                                <Link href="/automations" target="_blank" className="btn btn-outline">
                                    Explore all templates
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:hidden flex flex-col gap-4">
                    <div className="flex justify-center gap-4 mb-4 flex-wrap">
                        {categories?.slice(0, 5)?.map((cat, i) => (
                            <button
                                key={cat?.name}
                                className={`flex text-xs w-fit items-center gap-2 py-2 px-4 font-medium border custom-border ${
                                    selected?.name === cat?.name ? 'bg-accent text-white' : 'bg-white text-black'
                                }`}
                                onClick={() => handleSelectCategory(cat)}
                            >
                                <span className="flex items-center">
                                    {cat?.name === 'HR' ? (
                                        <FaUserGroup size={20} />
                                    ) : cat?.name === 'Marketing' ? (
                                        <FaBullhorn size={20} />
                                    ) : cat?.name === 'Support' ? (
                                        <MdHeadset size={20} />
                                    ) : cat?.name === 'Finance' ? (
                                        <HiCurrencyRupee size={20} />
                                    ) : cat?.name === 'Project Management' ? (
                                        <MdManageAccounts size={20} />
                                    ) : (
                                        <RiSearchLine size={20} />
                                    )}
                                </span>
                                <span className="text-xs text-center">{cat?.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="cont dotted-background justify-between w-full" style={{ height: '74vh' }}>
                        <div className="h-full">
                            <div className="p-4 h-[65vh] w-[60vw] sm:w-full overflow-hidden" style={{ width: '100%' }}>
                                <div className="cont gap-1">
                                    <h1 className="h3">{currentTemplate?.title}</h1>
                                    <h2 className="h6 leading-none">
                                        {currentTemplate?.metadata?.description || currentTemplate?.description}
                                    </h2>
                                </div>
                                <div className="w-full relative">
                                    <FlowRenderer
                                        flowJson={
                                            currentTemplate?.metadata?.flowJson ||
                                            currentTemplate?.flowJson ||
                                            'https://placehold.co/600x400'
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end flex-wrap gap-2 p-3 border-t custom-border">
                                <Link href={getTemplateLink()} className="btn btn-accent">
                                    Use this template
                                </Link>
                                <Link href={getTemplateLink()} className="btn btn-outline">
                                    Explore all templates
                                </Link>
                            </div>
                            {/* <div className="hidden sm:flex items-center justify-end flex-wrap gap-2 p-3 border-t custom-border">
                                <Link href={getTemplateLink()} className="btn btn-accent">
                                    <TbTemplate />
                                </Link>
                                <Link href={getTemplateLink()} className="btn btn-outline">
                                    <FaInternetExplorer />
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexTemplateComp;
