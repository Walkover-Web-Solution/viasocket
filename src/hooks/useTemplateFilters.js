import { useState, useEffect, useMemo, useCallback } from 'react';

const TEMPLATES_PER_PAGE = 9;
const INITIAL_TEMPLATES_COUNT = 27;

export const useTemplateFilters = (templates = []) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedApps, setSelectedApps] = useState([]);
    const [requireAllApps, setRequireAllApps] = useState(false);
    const [visibleCount, setVisibleCount] = useState(INITIAL_TEMPLATES_COUNT);
    const [customIndustry, setCustomIndustry] = useState('');

    const filteredTemplates = useMemo(() => {
        let filtered = templates;

        // Filter by categories (industries and departments included)
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((template) => {
                return template.category && template.category.some((cat) => selectedCategories.includes(cat));
            });
        }

        // Filter by apps — narrows whatever the category filter above already produced
        if (selectedApps.length > 0) {
            const appMatches = (template, slug) => {
                if (slug === 'webhook') return template.triggerType === 'webhook';
                if (slug === 'cron') return template.triggerType === 'cron';
                const pluginSlugs = (template.pluginData || []).map((p) => p.pluginslugname);
                return pluginSlugs.includes(slug);
            };

            filtered = filtered.filter((template) =>
                requireAllApps
                    ? selectedApps.every((slug) => appMatches(template, slug)) // AND logic
                    : selectedApps.some((slug) => appMatches(template, slug)) // OR logic (default)
            );
        }

        // Filter by search term — narrows whatever category/app filters already produced
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (template) =>
                    template.title?.toLowerCase().includes(term) ||
                    template.metadata?.description?.toLowerCase().includes(term)
            );
        }

        return filtered;
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
        setVisibleCount(INITIAL_TEMPLATES_COUNT); // Reset visible count when filters change
        setCustomIndustry(newCustomIndustry || '');
    }, []);

    const handleLoadMore = useCallback(() => {
        setVisibleCount((prev) => prev + TEMPLATES_PER_PAGE);
    }, []);

    const clearAllFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedCategories([]);
        setSelectedApps([]);
        setVisibleCount(INITIAL_TEMPLATES_COUNT);
    }, []);

    // Reset visible count when filtered results change
    useEffect(() => {
        setVisibleCount(INITIAL_TEMPLATES_COUNT);
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