'use client';

import React, { useEffect, useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import FlowRenderer from '../flowComp/flowRenderer';
import ZoomableFlowContainer from '../flowComp/zoomableFlowContainer';
import IconWrapper from '../flowComp/iconWrapper';
import Image from 'next/image';

const IndexTemplateComp = ({ categories, templates }) => {
    const [scale, setScale] = useState(1);
    const contentRef = useRef(null);
    const flowContainerRef = useRef(null);
    const [flowRendererHeight, setFlowRendererHeight] = useState('480px');

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

    const { visibleIcons, extraCount } = useMemo(() => {
        const flowJson = currentTemplate?.metadata?.flowJson || currentTemplate?.flowJson;
        const triggerIcon = flowJson?.trigger?.iconUrl;
        const stepKeys = flowJson?.order?.root || [];
        const stepIcons = stepKeys.map((step) => flowJson?.blocks?.[step]?.iconUrl).filter(Boolean);
        const icons = triggerIcon ? [triggerIcon, ...stepIcons] : stepIcons;
        const uniqueIcons = [...new Set(icons)];
        return {
            visibleIcons: uniqueIcons.slice(0, 4),
            extraCount: Math.max(0, uniqueIcons.length - 4),
        };
    }, [currentTemplate]);

    return (
        <div className="cont gap-8 container relative mt-12 py-8">
            <div className="flex flex-col gap-1 items-center justify-center">
                <h2 className="h2">From generating Leads to Raising Fund</h2>
                <p>Browse templates for Finance, Marketing, Support, HR and more. One click to deploy.</p>
            </div>

            <div className="flex flex-col w-full border custom-border">
                <div className="flex gap-4 p-3 justify-center flex-wrap border-b custom-border bg-[#FFFDF2]">
                    {categories?.slice(0, 5)?.map((cat) => (
                        <button
                            key={cat?.name}
                            className={`flex text-xs py-2 px-4 font-medium border rounded-full ${
                                selected?.name === cat?.name
                                    ? '!border-[#a8200d] text-accent'
                                    : 'custom-border text-black'
                            }`}
                            onClick={() => handleSelectCategory(cat)}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className={`w-2 h-2 rounded-full ${
                                        selected?.name === cat?.name ? 'bg-accent' : 'bg-gray-400'
                                    }`}
                                />
                                <span className="block">{cat?.name}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden">
                    <div className="cont gap-2 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            {visibleIcons.map((iconUrl, index) => (
                                <IconWrapper key={`app-icon-${index}`} iconUrl={iconUrl} size={24} />
                            ))}
                            {extraCount > 0 && <span className="text-sm text-gray-500 ml-1">+{extraCount} more</span>}
                        </div>
                        <h1 className="h3">{currentTemplate?.title}</h1>
                        <h2 className="h6 leading-none">
                            {currentTemplate?.metadata?.description || currentTemplate?.description}
                        </h2>
                        <div className="flex items-center mt-4 flex-wrap gap-2">
                            <Link href={getTemplateLink()} className="btn btn-accent">
                                Use this template
                            </Link>
                            <Link href="/automations" target="_blank" className="btn btn-outline">
                                Explore all templates
                            </Link>
                        </div>
                    </div>
                    <div
                        ref={flowContainerRef}
                        className="w-full relative dotted-background border-t lg:border-t-0 lg:border-l custom-border p-4 overflow-hidden"
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

                <div className="p-3 border-t flex items-center gap-2 bg-[#EFF2FF]">
                    <p className="text-sm text-gray-500 font-semibold">ALSO WORKS WITH</p>
                    <div className="flex items-center">
                        {visibleIcons.map((iconUrl, index) => (
                            <div
                                key={`app-icon-${index}`}
                                className={`w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden ${index > 0 ? '-ml-2' : ''}`}
                            >
                                <Image
                                    src={iconUrl}
                                    alt="App icon"
                                    width={22}
                                    height={22}
                                    className="object-contain p-1"
                                />
                            </div>
                        ))}
                        {extraCount > 0 && <span className="text-sm text-gray-500 ml-3">+{extraCount} more</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexTemplateComp;
