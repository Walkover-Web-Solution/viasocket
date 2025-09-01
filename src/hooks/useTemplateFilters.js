import { useState, useEffect, useMemo, useCallback } from 'react';

const TEMPLATES_PER_PAGE = 6;

export const useTemplateFilters = (templates = []) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedApps, setSelectedApps] = useState([]);
    const [visibleCount, setVisibleCount] = useState(TEMPLATES_PER_PAGE);

    // Memoized filtered templates to avoid unnecessary recalculations
    const filteredTemplates = useMemo(() => {
        let filtered = [...templates];

        // Filter by categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((template) => {
                return template.category && template.category.some((cat) => selectedCategories.includes(cat));
            });
        }

        // Filter by apps
        if (selectedApps.length > 0) {
            filtered = filtered.filter((template) => {
                const pluginSlugs = (template.pluginData || []).map((p) => p.pluginslugname);
                const hasPluginApp = pluginSlugs.some((slug) => selectedApps.includes(slug));
                const hasWebhookTrigger = selectedApps.includes('webhook') && template.triggerType === 'webhook';
                const hasCronTrigger = selectedApps.includes('cron') && template.triggerType === 'cron';

                return hasPluginApp || hasWebhookTrigger || hasCronTrigger;
            });
        }

        // Filter by search term
        if (searchTerm.trim()) {
            const searchWords = searchTerm.toLowerCase().split(/\s+/);
            filtered = filtered
                .map((template) => {
                    const title = template.title?.toLowerCase() || '';
                    const matchedWords = searchWords.filter((word) => title.includes(word));
                    return {
                        ...template,
                        matchScore: matchedWords.length,
                    };
                })
                .filter((t) => t.matchScore > 0)
                .sort((a, b) => b.matchScore - a.matchScore);
        }

        // Remove templates without image
        filtered = filtered.filter((template) => template.templateUrl && template.templateUrl.trim() !== '');

        // Clean up match scores
        return filtered.map(({ matchScore, ...rest }) => rest);
    }, [templates, searchTerm, selectedCategories, selectedApps]);

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
    const handleFilterChange = useCallback(({ searchTerm: newSearchTerm, selectedCategories: newCategories, selectedApps: newApps }) => {
        setSearchTerm(newSearchTerm || '');
        setSelectedCategories(newCategories || []);
        setSelectedApps(newApps || []);
        setVisibleCount(TEMPLATES_PER_PAGE); // Reset visible count when filters change
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
    };
};