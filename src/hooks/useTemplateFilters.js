import { useState, useEffect, useMemo, useCallback } from 'react';

const TEMPLATES_PER_PAGE = 6;

export const useTemplateFilters = (templates = []) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedApps, setSelectedApps] = useState([]);
    const [requireAllApps, setRequireAllApps] = useState(false);
    const [visibleCount, setVisibleCount] = useState(TEMPLATES_PER_PAGE);
    const [customIndustry, setCustomIndustry] = useState('');

    const filteredTemplates = useMemo(() => {
        let filtered = [...templates];
        let filteredChanged = false;

        // Filter by categories (industries and departments included)
        if (selectedCategories.length > 0) {
            filteredChanged = true;
            filtered = filtered.filter((template) => {
                return template.category && template.category.some((cat) => selectedCategories.includes(cat));
            });

            if (customIndustry === '' && filtered.length === 0) {
                filtered = [...templates];
            }
        }

        // Filter by apps
        if (selectedApps.length > 0) {

            let filterFunction = (template) => {
                const pluginSlugs = (template.pluginData || []).map((p) => p.pluginslugname);

                const appMatches = (slug) => {
                    if (slug === 'webhook') return template.triggerType === 'webhook';
                    if (slug === 'cron') return template.triggerType === 'cron';
                    return pluginSlugs.includes(slug);
                };

                return requireAllApps
                    ? selectedApps.every(appMatches) // AND logic
                    : selectedApps.some(appMatches);  // OR logic (default)
            }
            if (filteredChanged) {
                const selectedAppFiltered = templates.filter(filterFunction)
                filtered = [...filtered, ...selectedAppFiltered]
            } else {
                filtered = filtered.filter(filterFunction);
            }
            filteredChanged = true;
        }

        // Filter by search term
        if (searchTerm.trim()) {
            const filterFunction = (template) =>
                template.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.metadata?.description?.toLowerCase().includes(searchTerm.toLowerCase())
            if (filteredChanged) {
                const searchTermFiltered = templates.filter(filterFunction)
                filtered = [...filtered, ...searchTermFiltered]
            } else {
                filtered = filtered.filter(filterFunction);
            }
            filteredChanged = true;
        }

        // Remove templates without image
        filtered = filtered.filter((template) => template.templateUrl && template.templateUrl.trim() !== '');


        // Clean up match scores
        return filtered.map(({ matchScore, ...rest }) => rest);
    }, [templates, searchTerm, selectedCategories, selectedApps, requireAllApps]);

    // Memoized sorted templates
    const sortedTemplates = useMemo(() => {
        return [...filteredTemplates].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }, [filteredTemplates]);

    // Split templates into latest and remaining
    const { latestTemplates, remainingTemplates } = useMemo(() => {
        return {
            latestTemplates: sortedTemplates.slice(0, 6),
            remainingTemplates: sortedTemplates.slice(6),
        };
    }, [sortedTemplates]);

    // Callback handlers
    const handleFilterChange = useCallback(({ searchTerm: newSearchTerm, selectedCategories: newCategories, selectedApps: newApps, requireAllApps: newRequireAllApps, customIndustry: newCustomIndustry }) => {
        setSearchTerm(newSearchTerm || '');
        setSelectedCategories(newCategories || []);
        setSelectedApps(newApps || []);
        setRequireAllApps(!!newRequireAllApps);
        setVisibleCount(TEMPLATES_PER_PAGE); // Reset visible count when filters change
        setCustomIndustry(newCustomIndustry || '');
    }, []);

    const handleLoadMore = useCallback(() => {
        setVisibleCount((prev) => prev + TEMPLATES_PER_PAGE);
    }, []);

    const clearAllFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedCategories([]);
        setSelectedApps([]);
        setVisibleCount(TEMPLATES_PER_PAGE);
    }, []);

    // Reset visible count when filtered results change
    useEffect(() => {
        setVisibleCount(TEMPLATES_PER_PAGE);
    }, [filteredTemplates.length]);

    return {
        // State
        searchTerm,
        selectedCategories,
        selectedApps,
        requireAllApps,
        visibleCount,

        // Computed values
        filteredTemplates,
        sortedTemplates,
        latestTemplates,
        remainingTemplates,
        hasMoreTemplates: visibleCount < remainingTemplates.length,
        totalFilters: selectedCategories.length + selectedApps.length,
        hasResults: filteredTemplates.length > 0,

        // Actions
        handleFilterChange,
        handleLoadMore,
        clearAllFilters,

        // Individual setters (if needed for specific use cases)
        setSearchTerm,
        setSelectedCategories,
        setSelectedApps,
        setRequireAllApps,
    };
};