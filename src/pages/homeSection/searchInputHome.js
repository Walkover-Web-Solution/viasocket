import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { IoMdSearch } from 'react-icons/io';
import searchApps from '@/utils/searchApps';
import { getIndustries, getDepartments, getTemplates } from '@/utils/axiosCalls';
import { getVideoData } from '@/utils/getVideoData';
import { getBlogData } from '@/utils/getBlogData';
import { useTemplateFilters } from '@/hooks/useTemplateFilters';
import { validateTemplateData } from '@/utils/validateTemplateData';
import axios from 'axios';

const filterListByName = (list, search) => {
    if (!search) return list;
    const lower = search.trim().toLowerCase();

    return list.filter((item) => {
        const name = (item?.name || '').trim().toLowerCase();
        return name.startsWith(lower);
    });
};

const getFirstSuggestion = (apps, industries, departments, search) => {
    const lower = search.toLowerCase();

    const checkStartsWith = (list, type) => {
        if (!list || list.length === 0) return null;
        const item = list[0];
        const name = item?.name || item?.industry_name || item?.department_name || item;
        return name.toLowerCase().startsWith(lower) ? { suggestion: name, type } : null;
    };

    return checkStartsWith(apps, 'app') ||
        checkStartsWith(industries, 'industry') ||
        checkStartsWith(departments, 'department');
};


const SearchInputHome = ({
    onTemplatesChange,
    onVideosChange,
    onBlogsChange,
    onAiResponseChange,
    onLoadingChange,
    onSelectionChange,
    fetchApps,
    enableVideos = true,
    enableBlogs = true,
    enableAi = true,
}) => {
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const allAppsCache = useRef(null);
    const [selectedApps, setSelectedApps] = useState([]);
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [filteredIndustries, setFilteredIndustries] = useState([]);
    const [allIndustries, setAllIndustries] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentSuggestion, setCurrentSuggestion] = useState('');
    const [suggestionText, setSuggestionText] = useState('');
    const [templates, setTemplates] = useState([]);
    const [videos, setVideos] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [aiResponse, setAiResponse] = useState('');
    const [showTemplates, setShowTemplates] = useState(false);
    const [showVideos, setShowVideos] = useState(false);
    const [showBlogs, setShowBlogs] = useState(false);
    const [showAiResponse, setShowAiResponse] = useState(false);
    const [hasBrowserFocus, setHasBrowserFocus] = useState(false);
    const [shouldShowCaret, setShouldShowCaret] = useState(true);
    const {
        filteredTemplates,
        hasResults: hasTemplateResults,
        handleFilterChange: handleTemplateFilterChange,
    } = useTemplateFilters(templates);

    const resetToInitialState = () => {
        setShowTemplates(false);
        setShowVideos(false);
        setShowBlogs(false);
        setShowAiResponse(false);
        onTemplatesChange?.({ templates: [], filteredTemplates: [], showTemplates: false, hasResults: false });
        onVideosChange?.({ videos: [], showVideos: false });
        onBlogsChange?.({ blogs: [], showBlogs: false });
        onAiResponseChange?.({ aiResponse: '', showAiResponse: false });
    };

    const fetchAppsData = useCallback(async () => await fetchApps(), [fetchApps]);
    const fetchIndustriesData = useCallback(async () => await getIndustries(window?.location?.href), []);
    const fetchDepartmentsData = useCallback(async () => await getDepartments(window?.location?.href), []);

    const filterSelectedApps = useCallback((apps) =>
        apps?.filter((app) => !selectedApps.some((selectedApp) => selectedApp.appslugname === app.appslugname)) || [],
        [selectedApps]
    );
    const handleSelectApp = (app) => {
        setSelectedApps((prev) => {
            const exists = prev.some((selected) => selected.appslugname === app.appslugname);
            let newSelectedApps = exists ? prev.filter((item) => item.appslugname !== app.appslugname) : [...prev, app];

            // setTimeout(() => {
            if (newSelectedApps.length > 0 || selectedIndustries.length > 0 || selectedDepartments.length > 0) {
                handleSearchTemplates(newSelectedApps, selectedIndustries, selectedDepartments);
                if (enableVideos) handleSearchVideos(newSelectedApps, selectedIndustries, selectedDepartments);
                if (enableBlogs) handleSearchBlogs(newSelectedApps, selectedIndustries, selectedDepartments);
            } else {
                resetToInitialState();
            }
            if (enableAi) getAiResponse(newSelectedApps, selectedIndustries, selectedDepartments);
            // }, 100);

            return newSelectedApps;
        });
        setSearchTerm('');
        setCurrentSuggestion('');
        setSuggestionText('');
        setShowDropdown(false);
    };

    const handleSelectIndustry = (industry) => {
        const industryName = industry?.name || industry?.industry_name || industry;
        setSelectedIndustries((prev) => {
            const exists = prev.some((selected) => selected === industryName);
            const newSelectedIndustries = exists ? [] : [industryName];

            setTimeout(() => {
                if (selectedApps.length > 0 || newSelectedIndustries.length > 0 || selectedDepartments.length > 0) {
                    handleSearchTemplates(selectedApps, newSelectedIndustries, selectedDepartments);
                    if (enableVideos) handleSearchVideos(selectedApps, newSelectedIndustries, selectedDepartments);
                    if (enableBlogs) handleSearchBlogs(selectedApps, newSelectedIndustries, selectedDepartments);
                } else {
                    resetToInitialState();
                }
                // Check AI response condition separately
                if (enableAi) getAiResponse(selectedApps, newSelectedIndustries, selectedDepartments);
            }, 100);

            return newSelectedIndustries;
        });
        setSearchTerm('');
        setCurrentSuggestion('');
        setSuggestionText('');
        setShowDropdown(false);
    };

    const handleSelectDepartment = (department) => {
        const departmentName = department?.name || department?.department_name || department;
        setSelectedDepartments((prev) => {
            const exists = prev.some((selected) => selected === departmentName);
            const newSelectedDepartments = exists ? [] : [departmentName];

            setTimeout(() => {
                if (selectedApps.length > 0 || selectedIndustries.length > 0 || newSelectedDepartments.length > 0) {
                    handleSearchTemplates(selectedApps, selectedIndustries, newSelectedDepartments);
                    if (enableVideos) handleSearchVideos(selectedApps, selectedIndustries, newSelectedDepartments);
                    if (enableBlogs) handleSearchBlogs(selectedApps, selectedIndustries, newSelectedDepartments);
                } else {
                    resetToInitialState();
                }
                if (enableAi) {
                    getAiResponse(selectedApps, selectedIndustries, newSelectedDepartments);
                }
            }, 100);

            return newSelectedDepartments;
        });
        setSearchTerm('');
        setCurrentSuggestion('');
        setSuggestionText('');
        setShowDropdown(false);
    };

    const handleSearchTemplates = async (
        apps = selectedApps,
        industries = selectedIndustries,
        departments = selectedDepartments
    ) => {
        if (apps.length === 0 && industries.length === 0 && departments.length === 0) {
            return;
        }

        setShowTemplates(true);
        onLoadingChange && onLoadingChange({ templates: true });

        try {
            const templates = await getTemplates();
            const validStatuses = ['verified_by_ai', 'verified'];
            const templateData = (templates).filter(
                t => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
            )
            const verifiedTemplates = templateData.filter((t) => validStatuses.includes(t.verified));
            const validTemplateData = validateTemplateData(verifiedTemplates);
            setTemplates(validTemplateData);

            // Filter templates based on selected apps, industries and departments
            const selectedAppSlugs = apps.map((app) => app.appslugname);

            handleTemplateFilterChange({
                searchTerm: '',
                selectedIndustries: industries,
                selectedApps: selectedAppSlugs,
                selectedDepartments: departments,
            });

            onTemplatesChange &&
                onTemplatesChange({
                    templates: validTemplateData,
                    filteredTemplates,
                    showTemplates: true,
                    hasResults: hasTemplateResults,
                });
        } catch (error) {
            console.error('Error fetching templates:', error);
        } finally {
            onLoadingChange && onLoadingChange({ templates: false });
        }
    };

    const handleSearchVideos = async (
        apps = selectedApps,
        industries = selectedIndustries,
        departments = selectedDepartments
    ) => {
        if (apps.length === 0 && industries.length === 0 && departments.length === 0) {
            return;
        }

        setShowVideos(true);
        onLoadingChange && onLoadingChange({ videos: true });

        try {
            const videoData = await getVideoData(
                apps.map((app) => app.appslugname).filter(Boolean),
                window?.location?.href
            );
            setVideos(videoData);
            onVideosChange &&
                onVideosChange({
                    videos: videoData,
                    showVideos: true,
                });
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            onLoadingChange && onLoadingChange({ videos: false });
        }
    };

    const handleSearchBlogs = async (
        apps = selectedApps,
        industries = selectedIndustries,
        departments = selectedDepartments
    ) => {
        if (apps.length === 0 && industries.length === 0 && departments.length === 0) {
            return;
        }

        setShowBlogs(true);
        onLoadingChange && onLoadingChange({ blogs: true });

        try {
            const blogData = await getBlogData(
                apps.map((app) => app.appslugname).filter(Boolean),
                window?.location?.href
            );
            setBlogs(blogData);
            onBlogsChange &&
                onBlogsChange({
                    blogs: blogData,
                    showBlogs: true,
                });
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            onLoadingChange && onLoadingChange({ blogs: false });
        }
    };

    const getAiResponse = async (apps = selectedApps, industries = selectedIndustries, departments = selectedDepartments) => {
        const shouldShowAiResponse =
            (apps.length >= 1 && (industries.length >= 1 || departments.length >= 1)) ||
            (apps.length >= 1);

        if (!shouldShowAiResponse) {
            setShowAiResponse(false);
            onAiResponseChange?.({ aiResponse: '', showAiResponse: false });
            return;
        }

        setShowAiResponse(true);
        onLoadingChange?.({ aiResponse: true });

        try {
            const params = new URLSearchParams();
            if (apps.length > 0) params.append('apps', apps.map((app) => app.name).join(','));
            if (departments.length > 0) params.append('departments', departments.join(','));
            if (industries.length > 0) params.append('categories', industries.join(','));

            const response = await axios.post(`https://flow.sokt.io/func/scrifJcjUubA?${params.toString()}`, {});
            const responseData = response?.data;

            setAiResponse(responseData);
            onAiResponseChange?.({ aiResponse: responseData, showAiResponse: true });
            return responseData;
        } catch (error) {
            console.error('Error fetching AI response:', error);
            const errorMessage = 'Sorry, there was an error generating the response. Please try again.';
            setAiResponse(errorMessage);
            onAiResponseChange?.({ aiResponse: errorMessage, showAiResponse: true });
            return null;
        } finally {
            onLoadingChange?.({ aiResponse: false });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Tab' && currentSuggestion) {
            e.preventDefault();
            setSearchTerm(currentSuggestion);
            setCurrentSuggestion('');
            setSuggestionText('');

            // Trigger search with the accepted suggestion
            handleSearch(currentSuggestion);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            setShowDropdown(false);
            setCurrentSuggestion('');
            setSuggestionText('');

            // If there's a search term, try to create a chip from it
            if (searchTerm.trim()) {
                // Check if the search term matches any app
                const matchingApp = searchData.find((app) => app.name.toLowerCase() === searchTerm.toLowerCase());

                if (matchingApp) {
                    handleSelectApp(matchingApp);
                } else {
                    // Check if it matches any industry
                    const matchingIndustry = filteredIndustries.find((industry) => {
                        const industryName = industry?.name || industry?.industry_name || industry;
                        return industryName.toLowerCase() === searchTerm.toLowerCase();
                    });

                    if (matchingIndustry) {
                        handleSelectIndustry(matchingIndustry);
                    } else {
                        // Check if it matches any department
                        const matchingDepartment = filteredDepartments.find((department) => {
                            const departmentName = department?.name || department?.department_name || department;
                            return departmentName.toLowerCase() === searchTerm.toLowerCase();
                        });

                        if (matchingDepartment) {
                            handleSelectDepartment(matchingDepartment);
                        } else {
                            // If no exact match, treat as a custom industry
                            const customIndustry = searchTerm.trim();
                            if (!selectedIndustries.includes(customIndustry)) {
                                setSelectedIndustries((prev) => [...prev, customIndustry]);
                                setSearchTerm('');
                                setTimeout(() => {
                                    if (
                                        selectedApps.length > 0 ||
                                        selectedIndustries.length > 0 ||
                                        selectedDepartments.length > 0
                                    ) {
                                        handleSearchTemplates();
                                        if (enableVideos) handleSearchVideos();
                                        if (enableBlogs) handleSearchBlogs();
                                    }
                                    // Check AI response condition separately
                                    if (enableAi) {
                                        const shouldShowAiResponse =
                                            (selectedApps.length >= 1 &&
                                                (selectedIndustries.length >= 1 || selectedDepartments.length >= 1)) ||
                                            (selectedApps.length >= 1);
                                        if (shouldShowAiResponse) {
                                            getAiResponse();
                                        } else {
                                            setShowAiResponse(false);
                                        }
                                    }
                                }, 100);
                            }
                        }
                    }
                }
            } else {
                handleSearchTemplates();
                if (enableVideos) handleSearchVideos();
                if (enableBlogs) handleSearchBlogs();
                // Check AI response condition
                if (enableAi) {
                    const shouldShowAiResponse =
                        (selectedApps.length >= 1 && (selectedIndustries.length >= 1 || selectedDepartments.length >= 1)) ||
                        (selectedApps.length >= 1);
                    if (shouldShowAiResponse) {
                        getAiResponse();
                    } else {
                        setShowAiResponse(false);
                    }
                }
            }
        } else if (e.key === 'Backspace' && searchTerm === '') {
            // Remove the last selected element when backspace is pressed and input is empty
            e.preventDefault();
            setSuggestionText('');
            setCurrentSuggestion('');
            if (selectedDepartments.length > 0) {
                // Remove last department
                const lastDepartment = selectedDepartments[selectedDepartments.length - 1];
                handleSelectDepartment(lastDepartment);
            } else if (selectedIndustries.length > 0) {
                // Remove last industry
                const lastIndustry = selectedIndustries[selectedIndustries.length - 1];
                handleSelectIndustry(lastIndustry);
            } else if (selectedApps.length > 0) {
                // Remove last app
                const lastApp = selectedApps[selectedApps.length - 1];
                handleSelectApp(lastApp);
            }
        }
    };

    const handleSearch = useCallback(async (value) => {
        setSearchTerm(value);
        setShowDropdown(true);
        setCurrentSuggestion('');
        setSuggestionText('');

        if (!value.trim()) {
            if (!allAppsCache.current) {
                const apps = await fetchAppsData();
                allAppsCache.current = apps;
            }
            setSearchData(filterSelectedApps(allAppsCache.current));
            setFilteredIndustries(allIndustries);
            setFilteredDepartments(allDepartments);
            return;
        }

        try {
            const result = await searchApps(value);
            const filteredApps = filterSelectedApps(result);
            setSearchData(filteredApps);

            const matchingIndustries = filterListByName(allIndustries, value);
            const matchingDepartments = filterListByName(allDepartments, value);

            setFilteredIndustries(matchingIndustries);
            setFilteredDepartments(matchingDepartments);

            const firstSuggestion = getFirstSuggestion(filteredApps, matchingIndustries, matchingDepartments, value);
            if (firstSuggestion && firstSuggestion.suggestion.toLowerCase() !== value.toLowerCase()) {
                setCurrentSuggestion(firstSuggestion.suggestion);
                setSuggestionText(firstSuggestion.suggestion.slice(value.length));
            }
        } catch (error) {
            console.error(error);
        }
    }, [allIndustries, allDepartments, filterSelectedApps, fetchAppsData]);

    useEffect(() => {
        const fetchInitialApps = async () => {
            try {
                const apps = await fetchAppsData();
                setSearchData(filterSelectedApps(apps));
            } catch (error) {
                console.error(error);
            }
        };

        const fetchInitialIndustries = async () => {
            try {
                const industries = await fetchIndustriesData();
                setIndustries(industries);
                setAllIndustries(industries);
                setFilteredIndustries(industries);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchInitialDepartments = async () => {
            try {
                const departments = await fetchDepartmentsData();
                setDepartments(departments);
                setAllDepartments(departments);
                setFilteredDepartments(departments);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInitialApps();
        fetchInitialIndustries();
        fetchInitialDepartments();
    }, [fetchAppsData, filterSelectedApps, fetchIndustriesData, fetchDepartmentsData]);
    // Auto-focus the search input when component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            setHasBrowserFocus(true);
            setShouldShowCaret(true);
        }
    }, []);
    // Notify parent of state changes
    useEffect(() => {
        onTemplatesChange &&
            onTemplatesChange({
                templates,
                filteredTemplates,
                showTemplates,
                hasResults: hasTemplateResults,
            });
    }, [templates, filteredTemplates, showTemplates, hasTemplateResults, onTemplatesChange]);

    useEffect(() => {
        onVideosChange &&
            onVideosChange({
                videos,
                showVideos,
            });
    }, [videos, showVideos, onVideosChange]);

    useEffect(() => {
        onBlogsChange &&
            onBlogsChange({
                blogs,
                showBlogs,
            });
    }, [blogs, showBlogs, onBlogsChange]);

    useEffect(() => {
        onAiResponseChange &&
            onAiResponseChange({
                aiResponse,
                showAiResponse,
            });
    }, [aiResponse, showAiResponse, onAiResponseChange]);

    useEffect(() => {
        onSelectionChange &&
            onSelectionChange({
                selectedApps,
                selectedIndustries,
                selectedDepartments,
            });
    }, [selectedApps, selectedIndustries, selectedDepartments, onSelectionChange]);

    return (
        <div className="relative max-w-2xl mx-auto mt-8 mb-2 search-bar" ref={dropdownRef}>
            <div className="relative">
                <div
                    className="w-full min-h-[56px] px-6 py-4 text-lg bg-white border custom-border focus-within:outline-none focus-within:ring-blue-500/20 pr-16 flex flex-wrap items-center gap-2 z-index-1 relative cursor-text"
                    onClick={() => {
                        if (inputRef.current) {
                            inputRef.current.focus();
                            setHasBrowserFocus(true);
                            setShouldShowCaret(true);
                        }
                    }}
                >
                    <IoMdSearch />

                    {selectedApps?.map((app) => (
                        <div
                            key={app?.appslugname}
                            className="flex items-center bg-white border custom-border px-2 py-1 text-sm"
                        >
                            <Image
                                src={app.iconurl || 'https://placehold.co/16x16'}
                                width={16}
                                height={16}
                                alt={app.name}
                                className="rounded mr-2"
                            />
                            <span>{app?.name}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectApp(app);
                                }}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    {selectedIndustries?.map((industry) => (
                        <div
                            key={industry}
                            className="flex items-center border bg-white custom-border px-2 py-1 text-sm"
                        >
                            <span>{industry}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectIndustry(industry);
                                }}
                                className="ml-2"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    {selectedDepartments?.map((department) => (
                        <div
                            key={department}
                            className="flex items-center border bg-white custom-border px-2 py-1 text-sm"
                        >
                            <span>{department}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectDepartment(department);
                                }}
                                className="ml-2"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <div className="relative flex-1 min-w-[200px]">
                        {suggestionText && (
                            <div className="absolute inset-0 pointer-events-none text-lg text-gray-400 flex items-center whitespace-pre">
                                <span style={{ color: 'transparent' }}>{searchTerm}</span>
                                <span>{suggestionText}</span>
                            </div>
                        )}
                        <input
                            ref={inputRef}
                            type="text"
                            className="w-full bg-transparent outline-none text-lg relative z-10"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            onFocus={() => {
                                setHasBrowserFocus(true);
                                setShouldShowCaret(true);
                                if (searchTerm || selectedApps.length > 0 || selectedIndustries.length > 0 || selectedDepartments.length > 0) {
                                    setShowDropdown(true);
                                }
                            }}
                            onClick={() => {
                                setHasBrowserFocus(true);
                                setShouldShowCaret(true);
                                setShowDropdown(true);
                                if (inputRef.current) {
                                    inputRef.current.focus();
                                }
                            }}
                            onBlur={() => {
                                setHasBrowserFocus(false);
                                setShouldShowCaret(false); // Stop blinking when user clicks outside
                                setTimeout(() => {
                                    setShowDropdown(false);
                                }, 200);
                            }}
                            onKeyDown={handleKeyPress}
                        // placeholder={selectedApps.length === 0 && selectedIndustries.length === 0 && selectedDepartments.length === 0 ? "Search apps, industries, or departments..." : ""}
                        />
                        {/* Custom blinking caret - shows when input doesn't have browser focus and should show caret */}
                        {!hasBrowserFocus && searchTerm === '' && shouldShowCaret && (
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <div className="w-px h-5 bg-gray-800 animate-blink"></div>
                            </div>
                        )}
                    </div>
                </div>

                {showDropdown && (
                    <div className="absolute top-full left-0 right-0 border-t-0 bg-white border custom-border shadow-lg z-10 max-h-90 overflow-y-auto">
                        <div className="apps-section border-b custom-border">
                            {searchData?.length > 0 ? (
                                searchData.slice(0, 3).map((app, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelectApp(app);
                                        }}
                                    >
                                        <Image
                                            src={app?.iconurl || 'https://placehold.co/24x24'}
                                            width={24}
                                            height={24}
                                            alt={app?.name}
                                            className="rounded"
                                        />
                                        <span className="text-sm">{app?.name}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-6 text-center text-gray-500">
                                    <p className="text-sm">
                                        No apps found
                                        {searchTerm ? ` for "${searchTerm}"` : ''}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="departments-section border-b custom-border">
                            <div className="px-4 py-2 border-b custom-border text-left">
                                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Departments
                                </h4>
                            </div>
                            {(searchTerm ? filteredDepartments : departments)?.length > 0 ? (
                                (searchTerm ? filteredDepartments : departments)
                                    .slice(0, 2)
                                    .map((department, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-4"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleSelectDepartment(department);
                                            }}
                                        >
                                            <span className="text-sm">
                                                {department?.name || department?.department_name || department}
                                            </span>
                                        </div>
                                    ))
                            ) : (
                                <div className="px-4 py-6 text-center text-gray-500">
                                    <p className="text-sm">
                                        No departments found
                                        {searchTerm ? ` for "${searchTerm}"` : ''}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="industries-section">
                            <div className="px-4 py-2 border-b custom-border text-left">
                                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Industries
                                </h4>
                            </div>
                            {(searchTerm ? filteredIndustries : industries)?.length > 0 ? (
                                <>
                                    {(searchTerm ? filteredIndustries : industries)
                                        .slice(0, 2)
                                        .map((industry, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-4"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSelectIndustry(industry);
                                                }}
                                            >
                                                <span className="text-sm">
                                                    {industry?.name || industry?.industry_name || industry}
                                                </span>
                                            </div>
                                        ))}
                                </>
                            ) : (
                                <div className="px-4 py-6 text-center text-gray-500">
                                    <p className="text-sm">
                                        No industries found
                                        {searchTerm ? ` for "${searchTerm}"` : ''}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchInputHome;