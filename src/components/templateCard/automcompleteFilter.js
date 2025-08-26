import Image from 'next/image';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MdSearch, MdClose, MdKeyboardArrowDown } from 'react-icons/md';
import { Webhook, Timer } from 'lucide-react';

const AutocompleteFilter = ({
    categories = [],
    apps = [],
    onFilterChange,
    searchTerm = '',
    selectedCategories = [],
    selectedApps = [],
    totalFilters = 0,
    onClearAll,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(searchTerm);
    const [activeIndex, setActiveIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const activeItemRef = useRef(null);

    // Scroll active item into view
    useEffect(() => {
        if (activeIndex >= 0 && activeItemRef.current) {
            activeItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [activeIndex]);

    // Memoized combined filterable items
    const allItems = useMemo(
        () => [
            ...categories.map((category) => ({
                id: `category-${category}`,
                type: 'category',
                label: category,
                value: category,
                isSelected: selectedCategories.includes(category),
            })),
            ...apps.map((app) => ({
                id: `app-${app.pluginslugname}`,
                type: 'app',
                label: app.pluginname,
                value: app.pluginslugname,
                icon: app.iconurl,
                isSelected: selectedApps.includes(app.pluginslugname),
            })),
        ],
        [categories, apps, selectedCategories, selectedApps]
    );

    // Memoized filtered items based on search input
    const filteredItems = useMemo(() => {
        if (!inputValue.trim()) {
            return allItems;
        }

        const searchWords = inputValue.toLowerCase().split(/\s+/);
        return allItems
            .map((item) => {
                const matchedWords = searchWords.filter((word) => item.label.toLowerCase().includes(word));
                return {
                    ...item,
                    matchScore: matchedWords.length,
                };
            })
            .filter((item) => item.matchScore > 0)
            .sort((a, b) => b.matchScore - a.matchScore);
    }, [inputValue, allItems]);

    // Reset active index when filtered items change
    useEffect(() => {
        setActiveIndex(-1);
    }, [filteredItems]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setActiveIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === 'ArrowDown') {
                setIsOpen(true);
                e.preventDefault();
            }
            return;
        }

        const totalItems = filteredItems.length + (inputValue.trim() ? 1 : 0); // +1 for search action

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex((prev) => {
                    const nextIndex = prev + 1;
                    return nextIndex >= totalItems ? 0 : nextIndex;
                });
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex((prev) => {
                    const prevIndex = prev - 1;
                    return prevIndex < 0 ? totalItems - 1 : prevIndex;
                });
                break;
            case 'Enter':
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < filteredItems.length) {
                    handleItemClick(filteredItems[activeIndex]);
                } else if (activeIndex === filteredItems.length && inputValue.trim()) {
                    // Handle search when search action is selected
                    handleSearch();
                } else if (inputValue.trim() && activeIndex === -1) {
                    // Handle search when no item is selected but there's text
                    handleSearch();
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setActiveIndex(-1);
                inputRef.current?.blur();
                break;
        }
    };

    const handleInputChange = useCallback(
        (e) => {
            const value = e.target.value;
            setInputValue(value);
            setIsOpen(true);

            // Update search term immediately for text search
            onFilterChange({
                searchTerm: value,
                selectedCategories,
                selectedApps,
            });
        },
        [onFilterChange, selectedCategories, selectedApps]
    );

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    const handleItemClick = useCallback(
        (item) => {
            // Clear search text when selecting a category or app
            setInputValue('');

            if (item.type === 'category') {
                const newCategories = item.isSelected
                    ? selectedCategories.filter((c) => c !== item.value)
                    : [...selectedCategories, item.value];

                onFilterChange({
                    searchTerm: '', // Clear search when selecting filter
                    selectedCategories: newCategories,
                    selectedApps,
                });
            } else if (item.type === 'app') {
                const newApps = item.isSelected
                    ? selectedApps.filter((a) => a !== item.value)
                    : [...selectedApps, item.value];

                onFilterChange({
                    searchTerm: '', // Clear search when selecting filter
                    selectedCategories,
                    selectedApps: newApps,
                });
            }
        },
        [selectedCategories, selectedApps, onFilterChange]
    );

    const handleSearch = useCallback(() => {
        setIsOpen(false);
        onFilterChange({
            searchTerm: inputValue,
            selectedCategories,
            selectedApps,
        });
    }, [inputValue, selectedCategories, selectedApps, onFilterChange]);

    const handleClearAll = useCallback(() => {
        setInputValue('');
        if (onClearAll) {
            onClearAll();
        } else {
            onFilterChange({
                searchTerm: '',
                selectedCategories: [],
                selectedApps: [],
            });
        }
    }, [onClearAll, onFilterChange]);

    const removeCategory = useCallback(
        (category) => {
            const newCategories = selectedCategories.filter((c) => c !== category);
            onFilterChange({
                searchTerm: inputValue,
                selectedCategories: newCategories,
                selectedApps,
            });
        },
        [selectedCategories, inputValue, selectedApps, onFilterChange]
    );

    const removeApp = useCallback(
        (app) => {
            const newApps = selectedApps.filter((a) => a !== app);
            onFilterChange({
                searchTerm: inputValue,
                selectedCategories,
                selectedApps: newApps,
            });
        },
        [selectedApps, inputValue, selectedCategories, onFilterChange]
    );

    return (
        <div className="relative w-full max-w-2xl" ref={dropdownRef}>
            {/* Input Field */}
            <div className="relative">
                <div className="input border custom-border flex items-center gap-2 focus-within:outline-none bg-white">
                    <MdSearch fontSize={20} className="text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search templates, categories, or apps..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onKeyDown={handleKeyDown}
                        className="flex-1 outline-none"
                    />

                </div>
            </div>

            {/* Selected Filters Display */}
            {(selectedCategories.length > 0 || selectedApps.length > 0) && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                        <span
                            key={category}
                            className="inline-flex items-center gap-1 px-2 py-1 text-sm border custom-border bg-white hover:bg-gray-100"
                        >
                            {category}
                            <button onClick={() => removeCategory(category)} className="ml-1">
                                <MdClose size={16} />
                            </button>
                        </span>
                    ))}
                    {selectedApps.map((app) => {
                        const appData = apps.find((a) => a.pluginslugname === app);
                        return (
                            <span
                                key={app}
                                className="inline-flex items-center gap-1 px-2 py-1 text-sm border custom-border bg-white hover:bg-gray-100"
                            >
                                {app === 'webhook' ? (
                                    <div className="flex items-center justify-center w-6 h-6 mr-1">
                                        <Webhook size={12} />
                                    </div>
                                ) : app === 'cron' ? (
                                    <div className="flex items-center justify-center w-6 h-6 mr-1">
                                        <Timer size={12} />
                                    </div>
                                ) : appData?.iconurl ? (
                                    <div className="flex items-center justify-center w-6 h-6 mr-1">
                                        <Image src={appData.iconurl} alt={appData.pluginname} width={24} height={24} className="h-4 w-fit" />
                                    </div>
                                ) : null}
                                {app === 'webhook' ? 'Webhook' : app === 'cron' ? 'Cron' : (appData?.pluginname || app)}
                                <button onClick={() => removeApp(app)} className="ml-1">
                                    <MdClose size={16} />
                                </button>
                            </span>
                        );
                    })}
                </div>
            )}

            {/* Categories and Apps Display - Two separate boxes */}
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Categories Box */}
                <div className="border custom-border p-3 bg-white max-h-[300px] templateToShow overflow-y-auto">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">CATEGORIES</h4>
                    <div className="space-y-1">
                        {categories.map((category) => (
                            <div
                                key={category}
                                className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded ${
                                    selectedCategories.includes(category) ? 'bg-blue-50' : ''
                                }`}
                                onClick={() => {
                                    const newCategories = selectedCategories.includes(category)
                                        ? selectedCategories.filter((c) => c !== category)
                                        : [...selectedCategories, category];
                                    onFilterChange({
                                        searchTerm: inputValue,
                                        selectedCategories: newCategories,
                                        selectedApps,
                                    });
                                }}
                            >
                                <div className="relative mr-3">
                                    <div
                                        className={`w-4 h-4 border-2 flex items-center justify-center ${
                                            selectedCategories.includes(category)
                                                ? 'bg-blue-500 border-blue-500'
                                                : 'border-gray-300 bg-white'
                                        }`}
                                    >
                                        {selectedCategories.includes(category) && (
                                            <svg
                                                className="w-3 h-3 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm">{category}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Apps Box */}
                <div className="border custom-border bg-white p-3 max-h-[300px] overflow-y-auto">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">APPS</h4>
                    <div className="space-y-1">
                        {apps.map((app) => (
                            <div
                                key={app.pluginslugname}
                                className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded ${
                                    selectedApps.includes(app.pluginslugname) ? 'bg-blue-50' : ''
                                }`}
                                onClick={() => {
                                    const newApps = selectedApps.includes(app.pluginslugname)
                                        ? selectedApps.filter((a) => a !== app.pluginslugname)
                                        : [...selectedApps, app.pluginslugname];
                                    onFilterChange({
                                        searchTerm: inputValue,
                                        selectedCategories,
                                        selectedApps: newApps,
                                    });
                                }}
                            >
                                <div className="relative mr-3">
                                    <div
                                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                            selectedApps.includes(app.pluginslugname)
                                                ? 'bg-blue-500 border-blue-500'
                                                : 'border-gray-300 bg-white'
                                        }`}
                                    >
                                        {selectedApps.includes(app.pluginslugname) && (
                                            <svg
                                                className="w-3 h-3 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                {app.pluginslugname === 'webhook' ? (
                                    <div className="flex items-center justify-center w-6 h-6 mr-2">
                                        <Webhook size={12} />
                                    </div>
                                ) : app.pluginslugname === 'cron' ? (
                                    <div className="flex items-center justify-center w-6 h-6 mr-2">
                                        <Timer size={12} />
                                    </div>
                                ) : app.iconurl ? (
                                    <div className="flex items-center justify-center w-6 h-6 mr-2">
                                        <Image
                                            src={app.iconurl}
                                            alt={app.pluginname}
                                            width={24}
                                            height={24}
                                            className="h-4 w-fit"
                                        />
                                    </div>
                                ) : null}
                                <span className="text-sm">{app.pluginname}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AutocompleteFilter;
