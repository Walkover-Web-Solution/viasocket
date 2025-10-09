import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getTemplates } from "@/utils/axiosCalls";
import { useTemplateFilters } from "@/hooks/useTemplateFilters";
import { validateTemplateData } from "@/utils/validateTemplateData";
const MarqueeComponent = ({ onTemplatesChange, onLoadingChange, onSelectionChange, categories, initialTemplates = [] }) => {
    const [templates, setTemplates] = useState(Array.isArray(initialTemplates) ? initialTemplates : []);
    const [shouldNotify, setShouldNotify] = useState(false);

    const { filteredTemplates, hasResults, handleFilterChange } = useTemplateFilters(templates);

    useEffect(() => {
        // If templates were passed from server, use them and skip client fetch
        if (Array.isArray(initialTemplates) && initialTemplates.length > 0) {
            setTemplates(validateTemplateData(initialTemplates));
            return;
        }
        const loadTemplates = async () => {
            try {
                onLoadingChange && onLoadingChange({ templates: true });
                const templateData = await getTemplates();
                const validStatuses = ['verified_by_ai', 'verified'];
                const verifiedTemplates = (templateData || []).filter((t) => validStatuses.includes(t.verified));
                setTemplates(validateTemplateData(verifiedTemplates));
            } catch (err) {
                console.error('Error loading templates for marquee:', err);
            } finally {
                onLoadingChange && onLoadingChange({ templates: false });
            }
        };
        loadTemplates();
    }, [initialTemplates, onLoadingChange]);

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

    // Always show used apps (from templates) and limit to 20
    const topApps = useMemo(() => {
        const sorted = [...templateApps].sort((a, b) => a.name.localeCompare(b.name));
        if (sorted.length === 0) return [];
        if (sorted.length >= 20) return sorted.slice(0, 20);
        const filled = [...sorted];
        let i = 0;
        while (filled.length < 20) {
            filled.push(sorted[i % sorted.length]);
            i += 1;
        }
        return filled;
    }, [templateApps]);

    const fewCategories = useMemo(() => {
        return categories
            .filter(category => category !== "Server Monitoring") 
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

    const handleClickApp = (app) => {
        updateParentWithFilters({ selectedApps: [app], selectedIndustries: []});
    };

    const handleClickChip = (name) => {
        // Filter via selectedIndustries which maps to template.category in filters
        updateParentWithFilters({ selectedApps: [], selectedIndustries: [name] });
    };

    return (
        <div className="my-12">
            {/* Top row: 20 Apps with logos, scroll left */}
            <div className="overflow-hidden text-gray-900 py-3 group ">
                <div className="flex min-w-[200%] animate-marqueeLeft group-hover:[animation-play-state:paused]">
                    <div className="flex min-w-full shrink-0 items-center whitespace-nowrap">
                        {topApps.map((app, idx) => (
                            <button
                                key={`${app.slug}-${idx}`}
                                onClick={() => handleClickApp(app)}
                                className="mx-4 inline-flex items-center gap-2 px-4 py-2 bg-white border"
                            >
                                {app.icon && (
                                    <Image src={app.icon} alt={app.name} width={22} height={22} />
                                )}
                                <span className="">{app.name}</span>
                            </button>
                        ))}
                    </div>
                    <div className="flex min-w-full shrink-0 items-center whitespace-nowrap" aria-hidden="true">
                        {topApps.map((app, idx) => (
                            <span key={`${app.slug}-dup-${idx}`} className="mx-4 inline-flex items-center gap-2 px-4 py-2 bg-white border">
                                {app.icon && (
                                    <Image src={app.icon} alt={app.name} width={22} height={22} />
                                )}
                                <span className="">{app.name}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom row: 20 Template categories, scroll right */}
            <div className="overflow-hidden text-gray-900 py-3 group">
                <div className="flex min-w-[200%] animate-marqueeRight group-hover:[animation-play-state:paused]">
                    <div className="flex min-w-full shrink-0 items-center whitespace-nowrap">
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
                    <div className="flex min-w-full shrink-0 items-center whitespace-nowrap" aria-hidden="true">
                        {fewCategories.map((name, idx) => (
                            <span key={`${name}-dup-${idx}`} className="mx-4 inline-flex items-center gap-2 px-4 py-2 bg-white border">
                                <span className="">{name}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarqueeComponent;
