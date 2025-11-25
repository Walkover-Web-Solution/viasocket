import { MdSearch } from 'react-icons/md';
import { useEffect, useState } from 'react';
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
        const search = async () => {
            if (!debounceValue) {
                onSearchResults && onSearchResults([]);
                onCategoriesResults && onCategoriesResults(null);
                onDebounceValueChange && onDebounceValueChange('');
                return;
            }

            onDebounceValueChange && onDebounceValueChange(debounceValue);

            const searchTermLower = debounceValue.toLowerCase();

            // Filter categories
            const filteredCategories = categories?.categories?.filter((category) =>
                category?.toLowerCase()?.includes(searchTermLower)
            );
            onCategoriesResults && onCategoriesResults(filteredCategories);

            // Search apps
            const fetchedApps = await searchApps(debounceValue);
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
    }, [debounceValue, onSearchResults, onCategoriesResults, onDebounceValueChange]);


    return (
        <>
            <label className="input border w-full sm:w-auto md:min-w-[460px] custom-border flex items-center gap-2 focus-within:outline-none bg-white">
                <MdSearch fontSize={20} />
                <input
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                    type="text"
                    autoFocus
                    className={`${style.input} grow truncate w-48`}
                    placeholder={`Search any app to connect with ${app?.name || 'apps'}`} />
            </label>
        </>
    );
};

export default IntegrationSearchApps;
