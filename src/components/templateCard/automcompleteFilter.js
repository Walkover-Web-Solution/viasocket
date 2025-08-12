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

                    <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-gray-100 rounded">
                        <MdKeyboardArrowDown
                            className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            size={20}
                        />
                    </button>
                </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategories.length > 0 || selectedApps.length > 0) && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                        <span
                            key={category}
                            className="inline-flex items-center gap-1 px-2 py-1 text-sm border custom-border bg-white hover:bg-gray-100"
                        >
                            {category}
                            <button onClick={() => removeCategory(category)} className="ml-1">
                                <MdClose size={20} />
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
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white mr-2">
                                        <Webhook size={16} />
                                    </div>
                                ) : app === 'cron' ? (
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white mr-2">
                                        <Timer size={16} />
                                    </div>
                                ) : appData?.iconurl ? (
                                    <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white mr-2">
                                        <Image src={appData.iconurl} alt={appData.pluginname} width={36} height={36} className="h-5 w-fit" />
                                    </div>
                                ) : null}
                                {app === 'webhook' ? 'Webhook' : app === 'cron' ? 'Cron' : (appData?.pluginname || app)}
                                <button onClick={() => removeApp(app)} className="ml-1">
                                    <MdClose size={20} />
                                </button>
                            </span>
                        );
                    })}
                </div>
            )}

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border custom-border z-50 max-h-80 overflow-y-auto">
                    {filteredItems.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            {inputValue.trim() ? 'No matching items found' : 'Start typing to search...'}
                        </div>
                    ) : (
                        <>
                            {/* Categories Section */}
                            {filteredItems.some((item) => item.type === 'category') && (
                                <div>
                                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                                        Categories
                                    </div>
                                    {filteredItems
                                        .filter((item) => item.type === 'category')
                                        .map((item, index) => {
                                            const globalIndex = filteredItems.findIndex((i) => i.id === item.id);
                                            return (
                                                <div
                                                    key={item.id}
                                                    ref={globalIndex === activeIndex ? activeItemRef : null}
                                                    className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer ${
                                                        globalIndex === activeIndex ? 'bg-gray-50' : ''
                                                    }`}
                                                    onClick={() => handleItemClick(item)}
                                                >
                                                    <div className="relative mr-3">
                                                        <div
                                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                                                item.isSelected
                                                                    ? 'bg-gray-500 border-gray-500'
                                                                    : 'border-gray-300 bg-white'
                                                            }`}
                                                        >
                                                            {item.isSelected && (
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
                                                    <span className="text-sm">{item.label}</span>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}

                            {/* Apps Section */}
                            {filteredItems.some((item) => item.type === 'app') && (
                                <div>
                                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                                        Apps & Integrations
                                    </div>
                                    {filteredItems
                                        .filter((item) => item.type === 'app')
                                        .map((item) => {
                                            const globalIndex = filteredItems.findIndex((i) => i.id === item.id);
                                            return (
                                                <div
                                                    key={item.id}
                                                    ref={globalIndex === activeIndex ? activeItemRef : null}
                                                    className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer ${
                                                        globalIndex === activeIndex ? 'bg-gray-50' : ''
                                                    }`}
                                                    onClick={() => handleItemClick(item)}
                                                >
                                                    <div className="relative mr-3">
                                                        <div
                                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                                                item.isSelected
                                                                    ? 'bg-gray-500 border-gray-500'
                                                                    : 'border-gray-300 bg-white'
                                                            }`}
                                                        >
                                                            {item.isSelected && (
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
                                                    {item.value === 'webhook' ? (
                                                        <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white mr-2">
                                                            <Webhook size={16} />
                                                        </div>
                                                    ) : item.value === 'cron' ? (
                                                        <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white mr-2">
                                                            <Timer size={16} />
                                                        </div>
                                                    ) : item.icon ? (
                                                        <div className="flex items-center justify-center w-8 h-8 border custom-border bg-white mr-2">
                                                            <Image
                                                                src={item.icon}
                                                                alt={item.label}
                                                                width={36}
                                                                height={36}
                                                                className="h-5 w-fit"
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <span className="text-sm">{item.label}</span>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}

                            {/* Search Action */}
                            {inputValue.trim() && (
                                <div className="border-t">
                                    <button
                                        ref={activeIndex === filteredItems.length ? activeItemRef : null}
                                        onClick={handleSearch}
                                        className={`w-full flex items-center p-3 hover:bg-gray-100 text-left ${
                                            activeIndex === filteredItems.length ? 'bg-gray-50' : ''
                                        }`}
                                    >
                                        <MdSearch className="mr-3" size={16} />
                                        <span className="text-sm">Search for "{inputValue}"</span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AutocompleteFilter;
