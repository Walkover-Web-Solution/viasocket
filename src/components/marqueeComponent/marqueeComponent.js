'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTemplateFilters } from "@/hooks/useTemplateFilters";
import Marquee from "react-fast-marquee";
import { Package } from "lucide-react";

const MarqueeComponent = ({ onTemplatesChange, onSelectionChange, templates = [], marqueeApps = [], marqueeCategories = [] }) => {
    
    const [shouldNotify, setShouldNotify] = useState(false);

    const { filteredTemplates, hasResults, handleFilterChange } = useTemplateFilters(templates);

    const updateParentWithFilters = useCallback(({ selectedApps = [], selectedIndustries = [] }) => {
        handleFilterChange({
            searchTerm: '',
            selectedApps: selectedApps.map((a) => a.slug),
            selectedCategories: selectedIndustries,
        });

        onSelectionChange &&
            onSelectionChange({
                selectedApps: selectedApps.map((a) => ({ name: a.name, appslugname: a.slug, iconurl: a.icon })),
                selectedIndustries,
            });

        // Signal to notify parent once filteredTemplates updates on next render
        setShouldNotify(true);
    }, [handleFilterChange, onSelectionChange]);

    // Notify parent when filteredTemplates are ready (ensures first click shows templates)
    useEffect(() => {
        if (!shouldNotify) return;
        onTemplatesChange &&
            onTemplatesChange({
                templates,
                filteredTemplates,
                showTemplates: true,
                hasResults,
            });
        setShouldNotify(false);
    }, [shouldNotify, filteredTemplates, hasResults, onTemplatesChange, templates]);

    const handleClickApp = (app) => updateParentWithFilters({ selectedApps: [app], selectedIndustries: [] });
    const handleClickChip = (name) => updateParentWithFilters({ selectedApps: [], selectedIndustries: [name] });

    return (
        <div className="my-12">
            {/* Top row: 20 Apps with logos, scroll left */}
            <div className="h-[74px]">
            <Marquee
                speed={40}
                autoFill
                gradient
                gradientColor={[250, 249, 246]}
                gradientWidth={96}
                pauseOnHover={true}
            >
                <div className="inline-flex py-4">
                    {marqueeApps?.map((app, idx) => (
                        <button
                            key={`${app?.slug}-${idx}`}
                            onClick={() => handleClickApp(app)}
                            className="mx-4 inline-flex items-center gap-2 px-4 py-2 bg-white border"
                        >
                            {app?.icon ? (
                                <Image src={app?.icon} alt={app?.name} width={22} height={22} onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'inline-block';
                                }} />
                            ) : (
                                <Package size={22} className="text-gray-400" />
                            )}
                            <Package size={22} className="text-gray-400" style={{ display: 'none' }} />
                            <span>{app?.name}</span>
                        </button>
                    ))}
                </div>
            </Marquee>
            </div>

            {/* Bottom row: 20 Template categories, scroll right */}
            <div className="h-[74px]">
            <Marquee
                direction="right"
                speed={40}
                autoFill
                gradient
                gradientColor={[250, 249, 246]}
                gradientWidth={96}
                pauseOnHover={true}
            >
                <div className="inline-flex py-4">
                    {marqueeCategories?.map((category, idx) => (
                        <button
                            key={`${category?.name}-${idx}`}
                            onClick={() => handleClickChip(category?.name)}
                            className="mx-4 inline-flex items-center gap-2 px-4 py-2 bg-white border"
                        >
                            <span>{category?.name}</span>
                        </button>
                    ))}
                </div>
            </Marquee>
            </div>
        </div>
    );
};

export default MarqueeComponent;
