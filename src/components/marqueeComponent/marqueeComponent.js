import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTemplateFilters } from "@/hooks/useTemplateFilters";
import Marquee from "react-fast-marquee";

const MarqueeComponent = ({ onTemplatesChange, onSelectionChange, categories, templates = [] }) => {
    const [shouldNotify, setShouldNotify] = useState(false);

    const { filteredTemplates, hasResults, handleFilterChange } = useTemplateFilters(templates);

    // Build a unique list of apps used in templates using pluginData
    const templateApps = useMemo(() => {
        const map = new Map(); // slug -> { name, slug, icon }
        (templates || []).forEach((t) => {
            const pluginData = Array.isArray(t?.pluginData) ? t.pluginData : [];
            pluginData.forEach((p) => {
                const slug = p?.pluginslugname;
                const name = p?.pluginname;
                const icon = p?.iconurl;
                if (slug && name && !map.has(slug)) {
                    map.set(slug, { name, slug, icon });
                }
            });
        });
        return Array.from(map.values());
    }, [templates]);

    // Always show 20 apps (from templates): first 20 if enough, otherwise repeat to fill 20
    const topApps = useMemo(() => {
        const sorted = templateApps.slice().sort((a, b) => a.name.localeCompare(b.name));
        if (!sorted.length) return [];
        if (sorted.length >= 20) return sorted.slice(0, 20);
        return Array.from({ length: 20 }, (_, i) => sorted[i % sorted.length]);
    }, [templateApps]);

    const fewCategories = useMemo(() => {
        return (categories || [])
            .filter((category) => category !== "Server Monitoring")
            .slice(0, 20);
    }, [categories]);

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
            <Marquee
                speed={40}
                autoFill
                gradient
                gradientColor={[250, 249, 246]}
                gradientWidth={96}
                pauseOnHover={true}
            >
                <div className="inline-flex py-4">
                    {topApps.map((app, idx) => (
                        <button
                            key={`${app.slug}-${idx}`}
                            onClick={() => handleClickApp(app)}
                            className="mx-4 inline-flex items-center gap-2 px-4 py-2 bg-white border"
                        >
                            {app.icon && <Image src={app.icon} alt={app.name} width={22} height={22} />}
                            <span>{app.name}</span>
                        </button>
                    ))}
                </div>
            </Marquee>

            {/* Bottom row: 20 Template categories, scroll right */}
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
                    {fewCategories.map((name, idx) => (
                        <button
                            key={`${name}-${idx}`}
                            onClick={() => handleClickChip(name)}
                            className="mx-4 inline-flex items-center gap-2 px-4 py-2 bg-white border"
                        >
                            <span>{name}</span>
                        </button>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default MarqueeComponent;
