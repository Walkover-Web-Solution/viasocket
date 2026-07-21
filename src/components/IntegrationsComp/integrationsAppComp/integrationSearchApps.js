'use client';

import { Search, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import categories from '@/data/categories.json';
import searchApps from '@/utils/searchApps';
import style from './IntegrationsAppComp.module.scss';

const IntegrationSearchApps = ({
    searchTerm,
    setSearchTerm,
    onSearchResults,
    onCategoriesResults,
    onDebounceValueChange,
    app,
}) => {
    const [debounceValue, setDebounceValue] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const abortControllerRef = useRef(null);

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Search effect
    useEffect(() => {
        if (!debounceValue) {
            abortControllerRef.current?.abort();
            setSearchLoading(false);
            onSearchResults && onSearchResults([]);
            onCategoriesResults && onCategoriesResults(null);
            onDebounceValueChange && onDebounceValueChange('');
            return;
        }

        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const search = async () => {
            onDebounceValueChange && onDebounceValueChange(debounceValue);

            const searchTermLower = debounceValue.toLowerCase();

            // Filter categories
            const filteredCategories = categories?.categories?.filter((category) =>
                category?.toLowerCase()?.includes(searchTermLower)
            );
            onCategoriesResults && onCategoriesResults(filteredCategories);

            // Search apps
            setSearchLoading(true);
            const fetchedApps = await searchApps(debounceValue, controller.signal);
            if (controller.signal.aborted) return;
            setSearchLoading(false);
            if (!fetchedApps) {
                onSearchResults && onSearchResults([]);
                return;
            }

            // Sort apps by relevance
            const sortedApps = fetchedApps.sort((a, b) => {
                const aName = a?.name?.toLowerCase() || '';
                const bName = b?.name?.toLowerCase() || '';

                const aStarts = aName.startsWith(searchTermLower);
                const bStarts = bName.startsWith(searchTermLower);

                if (aStarts !== bStarts) return aStarts ? -1 : 1;

                const aContains = aName.includes(searchTermLower);
                const bContains = bName.includes(searchTermLower);

                if (aContains !== bContains) return aContains ? -1 : 1;

                return aName.localeCompare(bName);
            });

            onSearchResults && onSearchResults(sortedApps);
        };

        search();
        return () => {
            abortControllerRef.current?.abort();
        };
    }, [debounceValue, onSearchResults, onCategoriesResults, onDebounceValueChange]);

    return (
        <>
            <label className="input border w-full sm:w-auto md:min-w-[460px] custom-border flex items-center gap-2 focus-within:outline-none bg-white">
                <Search className="w-5 h-5" />
                <input
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                    type="text"
                    autoFocus
                    className={`${style.input} grow truncate w-48`}
                    placeholder={`Search any app to connect with ${app?.name || 'apps'}`}
                />
                {searchLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400 shrink-0" aria-hidden="true" />}
            </label>
        </>
    );
};

export default IntegrationSearchApps;
