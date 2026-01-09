import React, { useEffect, useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import { RiSearchLine } from 'react-icons/ri';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { FaBullhorn, FaUserGroup } from 'react-icons/fa6';
import { MdManageAccounts, MdHeadset } from 'react-icons/md';
import FlowRenderer from '../flowComp/flowRenderer';
import ZoomableFlowContainer from '../flowComp/zoomableFlowContainer';

const IndexTemplateComp = ({ categories, templates }) => {
    const [scale, setScale] = useState(1);
    const contentRef = useRef(null);
    const flowContainerRef = useRef(null);
    const [flowRendererHeight, setFlowRendererHeight] = useState('550px');

    const [selected, setSelected] = useState(null);
    const [currentTemplate, setCurrentTemplate] = useState(null);

    // Create a map of templates { [id]: template }
    const templateMap = useMemo(() => {
        const map = {};
        templates.forEach((template) => {
            map[template.id] = template;
        });
        return map;
    }, [templates]);

    // Initialize selected category with first category or Finance if available
    useEffect(() => {
        if (!selected && categories?.length > 0) {
            // Try to find Finance category first, otherwise use first category
            const financeCategory = categories.find((cat) => cat.name === 'Finance');
            const defaultCategory = financeCategory || categories[0];
            setSelected(defaultCategory);
        }
    }, [categories, selected]);

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
            <div className="cont gap-4">
                <div className="hidden md:flex flex-col gap-8 w-full">
                    <div className="flex gap-4 justify-center">
                        {categories?.slice(0, 5)?.map((cat, i) => (
                            <button
                                key={cat?.name}
                                className={`flex text-xs lg:text-sm py-2 px-4 font-medium border custom-border rounded-full ${
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
                            </button>
                        ))}
                    </div>

                    <div
                        className="cont p-6 overflow-hidden m-auto bg-[#faf9f6] xl:w-[60vw] w-full"
                        style={{ height: '80vh' }}
                    >
                        <div className="border dotted-background custom-border h-full flex flex-col justify-between">
                            <div className="cont p-4 max-h-[64vh] overflow-hidden">
                                <div className="cont gap-1 mb-4">
                                    <h1 className="h3">{currentTemplate?.title}</h1>
                                    <h2 className="h6 leading-none">
                                        {currentTemplate?.metadata?.description || currentTemplate?.description}
                                    </h2>
                                </div>
                                <div
                                    ref={flowContainerRef}
                                    className="w-full relative"
                                    style={{ height: flowRendererHeight }}
                                >
                                    <ZoomableFlowContainer
                                        setScale={setScale}
                                        contentRef={contentRef}
                                        flowContainerRef={flowContainerRef}
                                        flowRendererHeight={flowRendererHeight}
                                        setFlowRendererHeight={setFlowRendererHeight}
                                        template={currentTemplate}
                                        positionX="right-2"
                                        positionY="top-2"
                                    />
                                    <FlowRenderer
                                        flowJson={
                                            currentTemplate?.metadata?.flowJson ||
                                            currentTemplate?.flowJson ||
                                            'https://placehold.co/600x400'
                                        }
                                        scale={scale * 100}
                                    />
                                </div>
                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexTemplateComp;
