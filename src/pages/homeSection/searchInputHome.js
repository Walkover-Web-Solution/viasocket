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

const SearchInputHome = ({
    onTemplatesChange,
    onVideosChange,
    onBlogsChange,
    onAiResponseChange,
    onLoadingChange,
    onSelectionChange,
    fetchApps,
}) => {
    const dropdownRef = useRef(null);
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
    const [showTemplates, setShowTemplates] = useState(false);
    const [loadingTemplates, setLoadingTemplates] = useState(false);
    const [videos, setVideos] = useState([]);
    const [showVideos, setShowVideos] = useState(false);
    const [loadingVideos, setLoadingVideos] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [showBlogs, setShowBlogs] = useState(false);
    const [loadingBlogs, setLoadingBlogs] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [showAiResponse, setShowAiResponse] = useState(false);
    const [loadingAiResponse, setLoadingAiResponse] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    // Use template filters hook for template functionality
    const {
        filteredTemplates,
        hasResults: hasTemplateResults,
        handleFilterChange: handleTemplateFilterChange,
    } = useTemplateFilters(templates);

    const fetchAppsData = useCallback(async () => await fetchApps(), [fetchApps]);
    const fetchIndustriesData = useCallback(async () => await getIndustries(window?.location?.href), []);
    const fetchDepartmentsData = useCallback(async () => await getDepartments(window?.location?.href), []);

    const filterSelectedApps = useCallback(
        (apps) =>
            apps?.filter((app) => !selectedApps.some((selectedApp) => selectedApp.appslugname === app.appslugname)) ||
            [],
        [selectedApps]
    );

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
                                        handleSearchVideos();
                                        handleSearchBlogs();
                                    }
                                    // Check AI response condition separately
                                    const shouldShowAiResponse =
                                        (selectedApps.length >= 2 &&
                                            (selectedIndustries.length >= 1 || selectedDepartments.length >= 1)) ||
                                        (selectedIndustries.length >= 1 && selectedApps.length >= 1) ||
                                        (selectedDepartments.length >= 1 && selectedApps.length >= 1);
                                    if (shouldShowAiResponse) {
                                        getAiResponse();
                                    } else {
                                        setShowAiResponse(false);
                                    }
                                }, 100);
                            }
                        }
                    }
                }
            } else {
                handleSearchTemplates();
                handleSearchVideos();
                handleSearchBlogs();
                // Check AI response condition
                const shouldShowAiResponse =
                    (selectedApps.length >= 2 && (selectedIndustries.length >= 1 || selectedDepartments.length >= 1)) ||
                    (selectedIndustries.length >= 1 && selectedApps.length >= 1) ||
                    (selectedDepartments.length >= 1 && selectedApps.length >= 1);
                if (shouldShowAiResponse) {
                    getAiResponse();
                } else {
                    setShowAiResponse(false);
                }
            }
        } else if (e.key === 'Backspace' && searchTerm === '') {
            // Remove the last selected element when backspace is pressed and input is empty
            e.preventDefault();

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

    const handleSearch = async (value) => {
        setSearchTerm(value);
        // Open dropdown when user starts typing
        setShowDropdown(true);
        setIsInputFocused(true);
        
        if (value) {
            try {
                const result = await searchApps(value);
                const filteredApps = filterSelectedApps(result);
                setSearchData(filteredApps);

                // Filter industries based on search term from the full list
                const searchLower = value.toLowerCase();
                const matchingIndustries = allIndustries.filter((industry) => {
                    const industryName = industry?.name || industry?.industry_name || industry;
                    return industryName?.toLowerCase().includes(searchLower);
                });
                setFilteredIndustries(matchingIndustries);

                // Filter departments based on search term from the full list
                const matchingDepartments = allDepartments.filter((department) => {
                    const departmentName = department?.name || department?.department_name || department;
                    return departmentName?.toLowerCase().includes(searchLower);
                });
                setFilteredDepartments(matchingDepartments);

                // Find first matching suggestion for autocomplete
                let suggestion = '';
                let suggestionType = '';

                if (filteredApps.length > 0) {
                    const firstApp = filteredApps[0];
                    if (firstApp.name.toLowerCase().startsWith(searchLower)) {
                        suggestion = firstApp.name;
                        suggestionType = 'app';
                    }
                } else if (matchingIndustries.length > 0) {
                    const firstIndustry = matchingIndustries[0];
                    const industryName = firstIndustry?.name || firstIndustry?.industry_name || firstIndustry;
                    if (industryName.toLowerCase().startsWith(searchLower)) {
                        suggestion = industryName;
                        suggestionType = 'industry';
                    }
                } else if (matchingDepartments.length > 0) {
                    const firstDepartment = matchingDepartments[0];
                    const departmentName = firstDepartment?.name || firstDepartment?.department_name || firstDepartment;
                    if (departmentName.toLowerCase().startsWith(searchLower)) {
                        suggestion = departmentName;
                        suggestionType = 'department';
                    }
                }

                if (suggestion && suggestion.toLowerCase() !== value.toLowerCase()) {
                    setCurrentSuggestion(suggestion);
                    setSuggestionText(suggestion.slice(value.length));
                } else {
                    setCurrentSuggestion('');
                    setSuggestionText('');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            const apps = await fetchAppsData();
            setSearchData(filterSelectedApps(apps));
            setFilteredIndustries(allIndustries);
            setFilteredDepartments(allDepartments);
            setCurrentSuggestion('');
            setSuggestionText('');
        }
    };

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

    const handleSelectApp = (app) => {
        console.log('handleSelectApp', app);
        setSelectedApps((prev) => {
            const exists = prev.some((selected) => selected.appslugname === app.appslugname);
            let newSelectedApps;
            if (exists) {
                newSelectedApps = prev.filter((item) => item.appslugname !== app.appslugname);
            } else {
                newSelectedApps = [...prev, { ...app }];
            }
            setTimeout(() => {
                if (newSelectedApps.length > 0 || selectedIndustries.length > 0 || selectedDepartments.length > 0) {
                    handleSearchTemplates();
                    handleSearchVideos();
                    handleSearchBlogs();
                }
                // Check AI response condition separately
                const shouldShowAiResponse =
                    (newSelectedApps.length >= 2 &&
                        (selectedIndustries.length >= 1 || selectedDepartments.length >= 1)) ||
                    (selectedIndustries.length >= 1 && newSelectedApps.length >= 1) ||
                    (selectedDepartments.length >= 1 && newSelectedApps.length >= 1);
                if (shouldShowAiResponse) {
                    getAiResponse();
                } else {
                    setShowAiResponse(false);
                }
            }, 100);

            return newSelectedApps;
        });
        setSearchTerm('');
        // Close dropdown after selecting an app
        setShowDropdown(false);
        setIsInputFocused(false);
    };

    const handleSelectIndustry = (industry) => {
        const industryName = industry?.name || industry?.industry_name || industry;
        setSelectedIndustries((prev) => {
            const exists = prev.some((selected) => selected === industryName);
            let newSelectedIndustries;
            if (exists) {
                newSelectedIndustries = [];
            } else {
                newSelectedIndustries = [industryName];
            }

            setTimeout(() => {
                if (selectedApps.length > 0 || newSelectedIndustries.length > 0 || selectedDepartments.length > 0) {
                    handleSearchTemplates();
                    handleSearchVideos();
                    handleSearchBlogs();
                }
                // Check AI response condition separately
                const shouldShowAiResponse =
                    (selectedApps.length >= 2 &&
                        (newSelectedIndustries.length >= 1 || selectedDepartments.length >= 1)) ||
                    (newSelectedIndustries.length >= 1 && selectedApps.length >= 1) ||
                    (selectedDepartments.length >= 1 && selectedApps.length >= 1);
                if (shouldShowAiResponse) {
                    getAiResponse();
                } else {
                    setShowAiResponse(false);
                }
            }, 100);

            return newSelectedIndustries;
        });
        setSearchTerm('');
        // Close dropdown after selecting an industry
        setShowDropdown(false);
        setIsInputFocused(false);
    };

    const handleSelectDepartment = (department) => {
        const departmentName = department?.name || department?.department_name || department;
        setSelectedDepartments((prev) => {
            const exists = prev.some((selected) => selected === departmentName);
            let newSelectedDepartments;
            if (exists) {
                newSelectedDepartments = [];
            } else {
                newSelectedDepartments = [departmentName];
            }

            setTimeout(() => {
                if (selectedApps.length > 0 || selectedIndustries.length > 0 || newSelectedDepartments.length > 0) {
                    handleSearchTemplates();
                    handleSearchVideos();
                    handleSearchBlogs();
                }
                // Check AI response condition separately
                const shouldShowAiResponse =
                    (selectedApps.length >= 2 &&
                        (selectedIndustries.length >= 1 || newSelectedDepartments.length >= 1)) ||
                    (selectedIndustries.length >= 1 && selectedApps.length >= 1) ||
                    (newSelectedDepartments.length >= 1 && selectedApps.length >= 1);
                if (shouldShowAiResponse) {
                    getAiResponse();
                } else {
                    setShowAiResponse(false);
                }
            }, 100);

            return newSelectedDepartments;
        });
        setSearchTerm('');
        // Close dropdown after selecting a department
        setShowDropdown(false);
        setIsInputFocused(false);
    };

    const handleSearchTemplates = async () => {
        if (selectedApps.length === 0 && selectedIndustries.length === 0 && selectedDepartments.length === 0) {
            return;
        }

        setLoadingTemplates(true);
        setShowTemplates(true);
        onLoadingChange && onLoadingChange({ templates: true });

        try {
            const templateData = await getTemplates();
            const validStatuses = ['verified_by_ai', 'verified'];
            const verifiedTemplates = templateData.filter((t) => validStatuses.includes(t.verified));
            const validTemplateData = validateTemplateData(verifiedTemplates);

            setTemplates(validTemplateData);

            // Filter templates based on selected apps, industries and departments
            const selectedAppSlugs = selectedApps.map((app) => app.appslugname);
            handleTemplateFilterChange({
                searchTerm: '',
                selectedIndustries: selectedIndustries,
                selectedApps: selectedAppSlugs,
                selectedDepartments: selectedDepartments,
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
            setLoadingTemplates(false);
            onLoadingChange && onLoadingChange({ templates: false });
        }
    };

    const handleSearchVideos = async () => {
        console.log('handleSearchVideos called', { selectedApps, selectedIndustries, selectedDepartments });
        if (selectedApps.length === 0 && selectedIndustries.length === 0 && selectedDepartments.length === 0) {
            console.log('No selections, returning early');
            return;
        }

        console.log('Starting video search...');
        setLoadingVideos(true);
        setShowVideos(true);
        onLoadingChange && onLoadingChange({ videos: true });

        try {
            const videoData = await getVideoData(
                selectedApps.map((app) => app.appslugname).filter(Boolean),
                window?.location?.href
            );
            console.log('Video data received:', videoData);
            setVideos(videoData);
            onVideosChange &&
                onVideosChange({
                    videos: videoData,
                    showVideos: true,
                });
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoadingVideos(false);
            onLoadingChange && onLoadingChange({ videos: false });
        }
    };

    const handleSearchBlogs = async () => {
        console.log('handleSearchBlogs called', { selectedApps, selectedIndustries, selectedDepartments });
        if (selectedApps.length === 0 && selectedIndustries.length === 0 && selectedDepartments.length === 0) {
            console.log('No selections, returning early');
            return;
        }

        console.log('Starting blog search...');
        setLoadingBlogs(true);
        setShowBlogs(true);
        onLoadingChange && onLoadingChange({ blogs: true });

        try {
            const blogData = await getBlogData(
                selectedApps.map((app) => app.appslugname).filter(Boolean),
                window?.location?.href
            );
            console.log('Blog data received:', blogData);
            setBlogs(blogData);
            onBlogsChange &&
                onBlogsChange({
                    blogs: blogData,
                    showBlogs: true,
                });
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoadingBlogs(false);
            onLoadingChange && onLoadingChange({ blogs: false });
        }
    };

    const getAiResponse = async () => {
        const shouldShowAiResponse =
            (selectedApps.length >= 2 && (selectedIndustries.length >= 1 || selectedDepartments.length >= 1)) ||
            (selectedIndustries.length >= 1 && selectedApps.length >= 1) ||
            (selectedDepartments.length >= 1 && selectedApps.length >= 1);

        if (!shouldShowAiResponse) {
            setShowAiResponse(false);
            onAiResponseChange &&
                onAiResponseChange({
                    aiResponse: '',
                    showAiResponse: false,
                });
            return;
        }

        setLoadingAiResponse(true);
        setShowAiResponse(true);
        onLoadingChange && onLoadingChange({ aiResponse: true });

        try {
            // Prepare query parameters
            const params = new URLSearchParams();

            // Add selected apps
            if (selectedApps.length > 0) {
                params.append('apps', selectedApps.map((app) => app.name).join(','));
            }

            // Add selected departments
            if (selectedDepartments.length > 0) {
                params.append('departments', selectedDepartments.join(','));
            }

            // Add selected industries (categories)
            if (selectedIndustries.length > 0) {
                params.append('categories', selectedIndustries.join(','));
            }

            const response = await axios.post(`https://flow.sokt.io/func/scrifJcjUubA?${params.toString()}`, {});
            const responseData = await response?.data;

            if (responseData) {
                setAiResponse(responseData);
                onAiResponseChange &&
                    onAiResponseChange({
                        aiResponse: responseData,
                        showAiResponse: true,
                    });
            }

            return responseData;
        } catch (error) {
            console.error('Error fetching AI response:', error);
            const errorMessage = 'Sorry, there was an error generating the response. Please try again.';
            setAiResponse(errorMessage);
            onAiResponseChange &&
                onAiResponseChange({
                    aiResponse: errorMessage,
                    showAiResponse: true,
                });
            return null;
        } finally {
            setLoadingAiResponse(false);
            onLoadingChange && onLoadingChange({ aiResponse: false });
        }
    };

    return (
        <div className="relative max-w-2xl mx-auto mt-8 mb-2 search-bar" ref={dropdownRef}>
            <div className="relative">
                <div className="w-full min-h-[56px] px-6 py-4 text-lg bg-white border custom-border focus-within:outline-none focus-within:ring-blue-500/20 pr-16 flex flex-wrap items-center gap-2 z-index-1 relative">
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
                        {/* Suggestion overlay */}
                        {suggestionText && (
                            <div className="absolute inset-0 pointer-events-none text-lg text-gray-400 flex items-center whitespace-pre">
                                <span style={{ color: 'transparent' }}>{searchTerm}</span>
                                <span>{suggestionText}</span>
                            </div>
                        )}
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none text-lg relative z-10"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            onFocus={() => {
                                setShowDropdown(true);
                                setIsInputFocused(true);
                            }}
                            onClick={() => {
                                setShowDropdown(true);
                                setIsInputFocused(true);
                            }}
                            onBlur={() => {
                                setTimeout(() => {
                                    setShowDropdown(false);
                                    setIsInputFocused(false);
                                }, 200);
                            }}
                            onKeyDown={handleKeyPress}
                            // placeholder={selectedApps.length === 0 && selectedIndustries.length === 0 && selectedDepartments.length === 0 ? "Search apps, industries, or departments..." : ""}
                        />
                        {/* Custom caret for when input is not focused */}
                        {!isInputFocused && searchTerm === '' && (
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <div className="w-px h-5 bg-gray-800 animate-blink"></div>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer p-1 z-index-1"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowDropdown(false);
                        handleSearchTemplates();
                        handleSearchVideos();
                        handleSearchBlogs();
                        // Check AI response condition
                        const shouldShowAiResponse =
                            (selectedApps.length >= 2 &&
                                (selectedIndustries.length >= 1 || selectedDepartments.length >= 1)) ||
                            (selectedIndustries.length >= 1 && selectedApps.length >= 1) ||
                            (selectedDepartments.length >= 1 && selectedApps.length >= 1);
                        if (shouldShowAiResponse) {
                            getAiResponse();
                        } else {
                            setShowAiResponse(false);
                        }
                    }}
                ></button>

                {showDropdown && (
                    <div className="absolute top-full left-0 right-0 border-t-0 bg-white border custom-border shadow-lg z-10 max-h-80 overflow-y-auto">
                        <div className="apps-section border-b custom-border">
                            {searchData?.length > 0 ? (
                                searchData.map((app, index) => (
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
                            {(searchTerm ? filteredDepartments : departments)?.length > 0 ? (
                                (searchTerm ? filteredDepartments : departments).map((department, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-4 py-3"
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
                            {(searchTerm ? filteredIndustries : industries)?.length > 0 ? (
                                <div className="py-3">
                                    {(searchTerm ? filteredIndustries : industries).map((industry, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-4"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleSelectIndustry(industry);
                                            }}
                                        >
                                            <span className="text-sm">
                                                {industry?.name || industry?.industry_name || industry}
                                            </span>
                                        </div>
                                    ))}
                                </div>
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
