import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import AlphabeticalComponent from '@/components/alphabetSort/alphabetSort';
import { getFooterData } from '@/utils/getData';
import { FOOTER_FIELDS } from '@/const/fields';
import Navbar from '@/components/navbar/navbar';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { getAppCount, getTemplates, getIndustries, getDepartments, getBlogs } from '@/utils/axiosCalls';
import { getVideoData } from '@/utils/getVideoData';
import { getBlogData } from '@/utils/getBlogData';
import { IoMdSearch } from 'react-icons/io';
import searchApps from '@/utils/searchApps';
import TemplateCard from '@/components/templateCard/templateCard';
import { useTemplateFilters } from '@/hooks/useTemplateFilters';
import { validateTemplateData } from '@/utils/validateTemplateData';
import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';
import VideoGrid from '@/components/videoGrid/videoGrid';
import BlogGrid from '@/components/blogGrid/blogGrid';
export const runtime = 'experimental-edge';

const Home = ({ metaData, faqData, footerData, securityGridData }) => {
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
    const dropdownRef = useRef(null);
    const [templates, setTemplates] = useState([]);
    const [showTemplates, setShowTemplates] = useState(false);
    const [loadingTemplates, setLoadingTemplates] = useState(false);
    const [videos, setVideos] = useState([]);
    const [showVideos, setShowVideos] = useState(false);
    const [loadingVideos, setLoadingVideos] = useState(false);
    // const [filteredVideos, setFilteredVideos] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [showBlogs, setShowBlogs] = useState(false);
    const [loadingBlogs, setLoadingBlogs] = useState(false);
    // const [filteredBlogs, setFilteredBlogs] = useState([]);

    // Use template filters hook for template functionality
    const {
        filteredTemplates,
        hasResults: hasTemplateResults,
        handleFilterChange: handleTemplateFilterChange,
    } = useTemplateFilters(templates);

    const fetchAppsData = useCallback(async () => await fetchApps(), []);
    const fetchIndustriesData = useCallback(async () => await getIndustries(window?.location?.href), []);
    const fetchDepartmentsData = useCallback(async () => await getDepartments(window?.location?.href), []);

    const filterSelectedApps = useCallback(
        (apps) =>
            apps?.filter((app) => !selectedApps.some((selectedApp) => selectedApp.appslugname === app.appslugname)) ||
            [],
        [selectedApps]
    );

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

    const handleSearch = async (value) => {
        setSearchTerm(value);
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

    const handleSelectApp = (app) => {
        console.log("handleSelectApp", app);
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
            }, 100);

            return newSelectedApps;
        });
        setSearchTerm('');
    };

    const handleSelectIndustry = (industry) => {
        const industryName = industry?.name || industry?.industry_name || industry;
        setSelectedIndustries((prev) => {
            const exists = prev.some((selected) => selected === industryName);
            let newSelectedIndustries;
            if (exists) {
                newSelectedIndustries = prev.filter((item) => item !== industryName);
            } else {
                newSelectedIndustries = [...prev, industryName];
            }

            setTimeout(() => {
                if (selectedApps.length > 0 || newSelectedIndustries.length > 0 || selectedDepartments.length > 0) {
                    handleSearchTemplates();
                    handleSearchVideos();
                    handleSearchBlogs();
                }
            }, 100);

            return newSelectedIndustries;
        });
        setSearchTerm('');
    };

    const handleSelectDepartment = (department) => {
        const departmentName = department?.name || department?.department_name || department;
        setSelectedDepartments((prev) => {
            const exists = prev.some((selected) => selected === departmentName);
            let newSelectedDepartments;
            if (exists) {
                newSelectedDepartments = prev.filter((item) => item !== departmentName);
            } else {
                newSelectedDepartments = [...prev, departmentName];
            }

            setTimeout(() => {
                if (selectedApps.length > 0 || selectedIndustries.length > 0 || newSelectedDepartments.length > 0) {
                    handleSearchTemplates();
                    handleSearchVideos();
                    handleSearchBlogs();
                }
            }, 100);

            return newSelectedDepartments;
        });
        setSearchTerm('');
    };

    const handleSearchTemplates = async () => {
        if (selectedApps.length === 0 && selectedIndustries.length === 0 && selectedDepartments.length === 0) {
            return;
        }

        setLoadingTemplates(true);
        setShowTemplates(true);

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
        } catch (error) {
            console.error('Error fetching templates:', error);
        } finally {
            setLoadingTemplates(false);
        }
    };

    const handleSearchVideos = async () => {
        if (selectedApps.length === 0 && selectedIndustries.length === 0 && selectedDepartments.length === 0) {
            return;
        }

        setLoadingVideos(true);
        setShowVideos(true);

        try {
            const videoData = await getVideoData(selectedApps.map(app => app.appslugname).filter(Boolean), window?.location?.href);
            setVideos(videoData);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoadingVideos(false);
        }
    };

    const handleSearchBlogs = async () => {
        if (selectedApps.length === 0 && selectedIndustries.length === 0 && selectedDepartments.length === 0) {
            return;
        }

        setLoadingBlogs(true);
        setShowBlogs(true);

        try {
            const blogData = await getBlogData(selectedApps.map(app => app.appslugname).filter(Boolean), window?.location?.href);
            setBlogs(blogData);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoadingBlogs(false);
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
                                }, 100);
                            }
                        }
                    }
                }
            } else {
                handleSearchTemplates();
                handleSearchVideos();
                handleSearchBlogs();
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
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <Navbar footerData={footerData} utm={'/index'} />
            <div
                className={`${showTemplates || showVideos || showBlogs ? 'min-h-0 pt-12' : 'min-h-[calc(100vh-128px)] flex flex-col justify-center'} px-4 mx-auto relative`}
            >
                <div className="absolute top-0 right-0 p-12">
                    <p className="text-base">Want professional help?</p>
                    <Link
                        href="https://viasocket.com/experts"
                        target="_blank"
                        className="text-xs flex items-center gap-1 text-accent"
                    >
                        Ask an Expert <GoArrowUpRight />
                    </Link>
                </div>

                <div className="text-center">
                    <h1 className="h1 flex flex-col gap-1">
                        <span>
                            Find <span className="text-accent">automation ideas</span>
                        </span>
                        <span>
                            around{' '}
                            <Link href="https://viasocket.com/integrations" target="_blank" className="underline">
                                1500+ apps
                            </Link>{' '}
                            and AI
                        </span>
                    </h1>

                    <div className="relative max-w-2xl mx-auto mt-8 mb-2 search-bar" ref={dropdownRef}>
                        <div className="relative">
                            <div className="w-full min-h-[56px] px-6 py-4 text-lg bg-[#FAF9F6] border custom-border focus-within:outline-none focus-within:ring-blue-500/20 pr-16 flex flex-wrap items-center gap-2">
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
                                        onFocus={() => setShowDropdown(true)}
                                        onClick={() => setShowDropdown(true)}
                                        onBlur={() => {
                                            setTimeout(() => setShowDropdown(false), 200);
                                        }}
                                        onKeyDown={handleKeyPress}
                                        placeholder={selectedApps.length === 0 && selectedIndustries.length === 0 && selectedDepartments.length === 0 ? "Search apps, industries, or departments..." : ""}
                                    />
                                </div>
                            </div>
                            <button
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer p-1"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowDropdown(false);
                                    handleSearchTemplates();
                                    handleSearchVideos();
                                    handleSearchBlogs();
                                }}
                            >
                                <IoMdSearch size={20} />
                            </button>

                            {showDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border custom-border shadow-lg z-10 max-h-80 overflow-y-auto max-w-[400px]">
                                    <div className="apps-content">
                                        <h3 className="h3 px-4 py-3 border-b custom-border font-medium text-left">
                                            Apps
                                        </h3>
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
                                    <div className="departments-content">
                                        <h3 className="h3 px-4 py-3 border-y custom-border font-medium text-left">
                                            Departments
                                        </h3>
                                        {(searchTerm ? filteredDepartments : departments)?.length > 0 ? (
                                            (searchTerm ? filteredDepartments : departments).map(
                                                (department, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-4 py-3"
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            handleSelectDepartment(department);
                                                        }}
                                                    >
                                                        <span className="text-sm">
                                                            {department?.name ||
                                                                department?.department_name ||
                                                                department}
                                                        </span>
                                                    </div>
                                                )
                                            )
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
                                        <h3 className="h3 px-4 py-3 border-y custom-border font-medium text-left">
                                            Industries
                                        </h3>
                                        {(searchTerm ? filteredIndustries : industries)?.length > 0 ? (
                                            <div className="py-3">
                                                {(searchTerm ? filteredIndustries : industries).map(
                                                    (industry, index) => (
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
                                                    )
                                                )}
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

                    <p className="text-xl mb-12 max-w-2xl mx-auto">
                        or{' '}
                        <Link href="https://viasocket.com/signup" target="_blank" className="underline ">
                            build from scratch
                        </Link>{' '}
                        with AI + human experts
                    </p>
                </div>
            </div>

            {/* Template Results Section */}
            {showTemplates && (
                <div className="container mx-auto px-4 py-12">
                    <h2 className="h2 mb-8 text-center">
                        Templates for{' '}
                        {selectedApps.map((app, index) => (
                            <span key={app.appslugname}>
                                {index > 0 && ', '}
                                <span>{app.name}</span>
                            </span>
                        ))}
                        {(selectedIndustries.length > 0 || selectedDepartments.length > 0) &&
                            selectedApps.length > 0 &&
                            ' in '}
                        {selectedIndustries.map((industry, index) => (
                            <span key={industry}>
                                {index > 0 && ', '}
                                <span className="text-accent">{industry}</span>
                            </span>
                        ))}
                        {selectedDepartments.length > 0 && selectedIndustries.length > 0 && ', '}
                        {selectedDepartments.map((department, index) => (
                            <span key={department}>
                                {index > 0 && ', '}
                                <span className="text-accent">{department}</span>
                            </span>
                        ))}
                    </h2>

                    {loadingTemplates ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[500px] rounded-none"></div>
                            ))}
                        </div>
                    ) : hasTemplateResults ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {filteredTemplates.slice(0, 6).map((template, index) => (
                                <TemplateCard key={template.id} index={index} template={template} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="h3">No templates found for the selected apps.</p>
                            <p className="text-lg">
                                Try selecting different apps or{' '}
                                <Link href="/templates" className="border-b-2 custom-border">
                                    browse all templates
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Video Results Section */}
            {showVideos && (
                <div className="container mx-auto px-4 py-12">
                    <h2 className="h2 mb-8 text-center">
                        Videos for{' '}
                        {selectedApps.map((app, index) => (
                            <span key={app.appslugname}>
                                {index > 0 && ', '}
                                <span>{app.name}</span>
                            </span>
                        ))}
                        {(selectedIndustries.length > 0 || selectedDepartments.length > 0) &&
                            selectedApps.length > 0 &&
                            ' in '}
                        {selectedIndustries.map((industry, index) => (
                            <span key={industry}>
                                {index > 0 && ', '}
                                <span className="text-accent">{industry}</span>
                            </span>
                        ))}
                        {selectedDepartments.length > 0 && selectedIndustries.length > 0 && ', '}
                        {selectedDepartments.map((department, index) => (
                            <span key={department}>
                                {index > 0 && ', '}
                                <span className="text-accent">{department}</span>
                            </span>
                        ))}
                    </h2>

                    {loadingVideos ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[300px] rounded-none"></div>
                            ))}
                        </div>
                    ) : videos.length > 0 ? (
                        <VideoGrid videoData={videos} />
                    ) : (
                        <div className="text-center py-12">
                            <p className="h3">No videos found for the selected criteria.</p>
                            <p className="text-lg">Try selecting different apps or industries.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Blog Results Section */}
            {showBlogs && (
                <div className="container mx-auto px-4 py-12">
                    <h2 className="h2 mb-8 text-center">
                        Blogs for{' '}
                        {selectedApps.map((app, index) => (
                            <span key={app.appslugname}>
                                {index > 0 && ', '}
                                <span>{app.name}</span>
                            </span>
                        ))}
                        {(selectedIndustries.length > 0 || selectedDepartments.length > 0) &&
                            selectedApps.length > 0 &&
                            ' in '}
                        {selectedIndustries.map((industry, index) => (
                            <span key={industry}>
                                {index > 0 && ', '}
                                <span className="text-accent">{industry}</span>
                            </span>
                        ))}
                        {selectedDepartments.length > 0 && selectedIndustries.length > 0 && ', '}
                        {selectedDepartments.map((department, index) => (
                            <span key={department}>
                                {index > 0 && ', '}
                                <span className="text-accent">{department}</span>
                            </span>
                        ))}
                    </h2>

                    {loadingBlogs ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="skeleton bg-gray-100 h-[400px] rounded-none"></div>
                            ))}
                        </div>
                    ) : blogs.length > 0 ? (
                        <BlogGrid posts={blogs} />
                    ) : (
                        <div className="text-center py-12">
                            <p className="h3">No blogs found for the selected criteria.</p>
                            <p className="text-lg">Try selecting different apps or industries.</p>
                        </div>
                    )}
                </div>
            )}

            {/* AI Agents Section - Positioned at bottom of viewport */}
            <div className="text-center pb-8 mt-auto">
                <h2 className="h2">
                    AI agents, Human intervention, IF and{' '}
                    <Link href="/features" target="_blank" className="underline ">
                        100+ Features
                    </Link>
                </h2>
            </div>

            <div className="py-12">
                {faqData?.length > 0 && (
                    <div className="container cont">
                        <FAQSection faqData={faqData} faqName={'/index'} />
                    </div>
                )}
                <div className="container cont">
                    <AlphabeticalComponent />
                </div>
                <SecuritySection securityGridData={securityGridData} />
                <div className="container">
                    <Footer footerData={footerData} />
                </div>
            </div>
        </>
    );
};

const SecuritySection = ({ securityGridData }) => {
    return (
        <div className="container">
            <div className="border custom-border p-20 border-b-0 bg-[#376F5B] cont gap-8 text-white">
                <div className="flex lg:flex-row flex-col justify-between gap-4 lg:gap-20">
                    <div className="cont gap-1">
                        <h2 className="h2">viaSocket is the Trusted Choice for Secure Automation</h2>
                        <h3 className="sub__h1">
                            Your data is safe with us—compliant, secure, and built with privacy in mind at every step,
                            so you can run workflows with confidence.
                        </h3>
                    </div>
                    <div className="flex gap-4 mr-12">
                        <Image src="assets/img/aicpa-soc-badge.webp" alt="aicpa soc badge" width={100} height={100} />
                        <Image src="assets/img/iso-certified.webp" alt="iso certified badge" width={100} height={100} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-white border-t-0 border-r-0">
                    {securityGridData.map((item, index) => (
                        <div key={index} className="cont gap-1 py-12 px-8 border border-white border-b-0 border-l-0 ">
                            <h4 className="h3">{item.title}</h4>
                            <p className="sub__h2 text-gray-300">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const faqData = await getFaqData('/index', pageUrl);
    const metaData = await getMetaData('/', pageUrl);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const appCount = await getAppCount(pageUrl);

    const securityGridData = [
        {
            title: 'SOC 2 (Type II)',
            description:
                "Your workflow's data is handled with the highest level of security, privacy, and confidentiality.",
            iconName: 'shield-alt',
        },
        {
            title: 'ISO Certified',
            description:
                'We consistently meet international standards to deliver reliable and secure solutions for your business.',
            iconName: 'certificate',
        },
        {
            title: 'GDPR & CCPA Compliance',
            description: 'Your data remains private and entirely under your control, at all times.',
            iconName: 'user-shield',
        },
        {
            title: 'End-to-End Observability',
            description:
                "Gain full visibility into your data's journey with detailed audit logs, real-time analytics, and proactive alerts.",
            iconName: 'eye',
        },
        {
            title: '99.99% Uptime & Enterprise SLA',
            description: 'Stay worry-free with 99.99% uptime and fast, reliable support when you need it most.',
            iconName: 'clock',
        },
        {
            title: 'Error Handling & Recovery',
            description:
                'Stay ahead of issues with smart alerts and AI-powered troubleshooting, keeping your workflows running smoothly.',
            iconName: 'bug',
        },
    ];

    return {
        props: {
            metaData: metaData || {},
            faqData: faqData || [],
            footerData: footerData || [],
            securityGridData: securityGridData,
        },
    };
}

async function fetchApps(category) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=50${category && category !== 'All' ? `&category=${category}` : ''}`
    );
    const rawData = await response.json();
    return rawData?.data;
}
