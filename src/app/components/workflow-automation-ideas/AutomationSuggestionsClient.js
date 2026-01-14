'use client'

import { CgArrowTopRight } from 'react-icons/cg';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import searchApps from '@/utils/searchApps';
import { CiSquarePlus } from 'react-icons/ci';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

const DropdownItem = ({ app, isChecked, handleSelect }) => (
    <div
        className={`flex items-center gap-2 px-3 py-2 cursor-pointer w-[300px] hover:bg-gray-100 ${
            isChecked ? 'bg-gray-200' : 'bg-white'
        }`}
        onClick={() => handleSelect(app)}
    >
        <input
            type="checkbox"
            checked={isChecked}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleSelect(app)}
        />
        <Image
            src={app?.iconurl || 'https://placehold.co/36x36'}
            width={16}
            height={16}
            alt={`${app?.name} app icon`}
        />
        <span>{app?.name}</span>
    </div>
);

async function fetchApps(category) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}api/v1/plugins/all?limit=50${category && category !== 'All' ? `&category=${category}` : ''}`
    );
    const rawData = await response.json();
    return rawData?.data;
}

async function fetchCombos(pathArray, industry, domain, useCase) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}api/v1/plugins/recommend/services?${pathArray.map((service) => `service=${service}`).join('&')}&industry=${industry && industry.toLowerCase()}&domain=${domain && domain.toLowerCase()}&usecase=${useCase && encodeURIComponent(useCase)}`,
        {
            cache: 'no-cache',
        }
    );
    const responseData = await response.json();
    return responseData;
}

export default function AutomationSuggestionsClient() {
    const [selectedDomain, setSelectedDomain] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedApps, setSelectedApps] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [combinationLoading, setCombinationLoading] = useState(true);
    const debounceValue = useDebounce(searchTerm, 300);

    const [renderCombos, setRenderCombos] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [useCase, setUseCase] = useState('');
    const modalRef = useRef();

    const utm = '/workflow-automation-ideas';

    const fetchAppsData = useCallback(async () => await fetchApps(), []);

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

        fetchInitialApps();
    }, [fetchAppsData, filterSelectedApps]);

    const handleGenerate = async () => {
        if (selectedApps?.length === 1) {
            modalRef.current?.showModal();
        } else {
            setCombinationLoading(true);
            const selectedAppSlugs = selectedApps.map((app) => app.appslugname);
            const industry = selectedIndustry;
            const domain = selectedDomain;
            const useCaseData = useCase;
            try {
                const combos = await fetchCombos(
                    selectedAppSlugs.length > 0 ? selectedAppSlugs : ['gohighlevel', 'slack', 'airtable'],
                    industry,
                    domain,
                    useCaseData
                );
                setRenderCombos(combos?.data);
            } catch (error) {
                console.error('Error fetching combos:', error);
            } finally {
                setCombinationLoading(false);
            }
        }
    };
    
    useEffect(() => {
        if (debounceValue !== '') {
            filterApps();
        }
    }, [debounceValue]);

    useEffect(() => {
        handleGenerate();
    }, []);

    const filterApps = async () => {
        try {
            if (debounceValue) {
                const result = await searchApps(debounceValue);
                setSearchData(filterSelectedApps(result));
            } else {
                const apps = await fetchAppsData();
                setSearchData(filterSelectedApps(apps));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectApp = (app) => {
        setSelectedApps((prev) => {
            const exists = prev.some((selected) => selected.appslugname === app.appslugname);
            if (exists) {
                return prev.filter((item) => item.appslugname !== app.appslugname);
            }
            return [...prev, { ...app }];
        });
    };

    const [showAppDropdown, setShowAppDropdown] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowAppDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const excludedApps = [
        'zapier',
        'make.com',
        'pabbly connect',
        'workato',
        'relay.app',
        'Integrately',
        'Microsoft Power Automate',
        'IFTTT',
        'n8n',
    ];

    return (
        <>
            <div className="cont">
                <div className="w-full cont min-h-fit h-screen">
                    <div className="container mt-12">
                        <div className="h-full flex flex-col lg:flex-row">
                            <div className="h-full w-full lg:w-1/2 flex flex-col gap-4 p-8 bg-gradient-to-l from-[#def9f0] to-[#def9f0]">
                                <div className="flex flex-col gap-2">
                                    <h1 className="h2">
                                        Need Workflow Automation <span className="text-accent">Ideas?</span>
                                    </h1>
                                    <p className="sub__h1">Find Your Inspiration Here</p>
                                </div>
                                <div className="flex items-center w-full group mt-12">
                                    <h2 className="h2 text-nowrap">I use</h2>

                                    <div className="ml-2 flex items-center gap-3">
                                        {selectedApps?.map((app) => (
                                            <div key={app?.appslugname} className="flex items-center">
                                                {selectedApps?.length === 1 ? (
                                                    <span className="text-red-500 ml-2">{app?.name}</span>
                                                ) : (
                                                    <Image
                                                        src={app.iconurl || 'https://placehold.co/36x36'}
                                                        width={36}
                                                        height={36}
                                                        alt={app.name}
                                                        className="rounded-md"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {selectedApps?.length === 0 || showAppDropdown ? (
                                        <div className="relative overflow-visible" ref={dropdownRef}>
                                            <input
                                                type="text"
                                                className="h2 ml-2 text-gray-400 border-none bg-transparent focus:outline-none w-full"
                                                placeholder="App"
                                                value={searchTerm}
                                                onFocus={() => setShowAppDropdown(true)}
                                                onBlur={() => setTimeout(() => setShowAppDropdown(false), 300)}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            {showAppDropdown && (
                                                <ul className="absolute mt-2 bg-base-100 shadow-xl z-10 max-h-[290px] w-[300px] overflow-scroll p-0 border border-gray-300 rounded-lg">
                                                    {selectedApps?.map((app) => (
                                                        <DropdownItem
                                                            key={app.appslugname}
                                                            app={app}
                                                            isChecked={true}
                                                            handleSelect={handleSelectApp}
                                                        />
                                                    ))}
                                                    {searchData
                                                        ?.filter(
                                                            (app) =>
                                                                !selectedApps.some(
                                                                    (selected) =>
                                                                        selected.appslugname === app.appslugname
                                                                )
                                                        )
                                                        .map((app, index) => (
                                                            <DropdownItem
                                                                key={index}
                                                                app={app}
                                                                isChecked={false}
                                                                handleSelect={handleSelectApp}
                                                            />
                                                        ))}
                                                </ul>
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            className="flex h2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4"
                                            onClick={() => setShowAppDropdown(true)}
                                        >
                                            <CiSquarePlus size={30} />
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <h3 className="h2 text-nowrap ">We're in the </h3>
                                    <input
                                        type="text"
                                        className="h2 ml-2 text-gray-400 border-none bg-transparent focus:outline-none w-full "
                                        placeholder="Industry type"
                                        value={selectedDomain}
                                        onFocus={(e) => {
                                            e.target.classList.remove('text-gray-400');
                                            e.target.classList.add('text-red-500');
                                        }}
                                        onBlur={(e) => {
                                            if (!e.target.value) {
                                                e.target.classList.add('text-gray-400');
                                                e.target.classList.remove('text-red-500');
                                            } else {
                                                e.target.classList.add('text-red-500');
                                            }
                                        }}
                                        onChange={(e) => setSelectedDomain(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center">
                                    <h3 className="h2 text-nowrap">I run </h3>
                                    <input
                                        type="text"
                                        className="h2 ml-2 text-gray-400 border-none bg-transparent focus:outline-none w-full"
                                        placeholder="domain.com"
                                        value={selectedIndustry}
                                        onFocus={(e) => {
                                            e.target.classList.remove('text-gray-400');
                                            e.target.classList.add('text-red-500');
                                        }}
                                        onBlur={(e) => {
                                            if (!e.target.value) {
                                                e.target.classList.add('text-gray-400');
                                                e.target.classList.remove('text-red-500');
                                            } else {
                                                e.target.classList.add('text-red-500');
                                            }
                                        }}
                                        onChange={(e) => setSelectedIndustry(e.target.value)}
                                    />
                                </div>
                                <textarea
                                    className="mt-6 p-4 w-full h-[150px] input input-bordered"
                                    placeholder="eg: I run an eCommerce website and manage sales on Shopify and use Notion for database."
                                    value={useCase}
                                    onChange={(e) => setUseCase(e.target.value)}
                                ></textarea>

                                <div className="flex justify-end items-center p-2 w-full">
                                    <button className="btn btn-accent" onClick={handleGenerate}>
                                        Generate
                                    </button>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 h-full bg-gray-10 custom-border border border-b-0 bg-white">
                                <div className="h-full overflow-y-scroll scrollbar-none">
                                    {combinationLoading ? (
                                        <>
                                            {[...Array(9)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="flex justify-center items-center w-full h-[86px] p-4 skeleton custom-border border-b flex-shrink-0"
                                                ></div>
                                            ))}
                                        </>
                                    ) : (
                                        renderCombos?.combinations
                                            ?.filter((combo) => {
                                                return combo?.trigger?.name !== combo?.actions[0]?.name;
                                            })
                                            ?.map((combo, index) => {
                                                const triggerName = renderCombos?.plugins[
                                                    combo?.trigger?.name
                                                ]?.events?.find((event) => event?.rowid === combo.trigger?.id)?.name;

                                                const actionName = renderCombos?.plugins[
                                                    combo?.actions[0]?.name
                                                ]?.events?.find(
                                                    (event) => event?.rowid === combo?.actions[0]?.id
                                                )?.name;

                                                const triggerIcon =
                                                    renderCombos?.plugins[combo?.trigger?.name]?.iconurl ||
                                                    'https://placehold.co/40x40';
                                                const actionIcon =
                                                    renderCombos?.plugins[combo?.actions[0]?.name]?.iconurl ||
                                                    'https://placehold.co/40x40';

                                                const integrations =
                                                    renderCombos?.plugins[combo?.trigger?.name]?.rowid +
                                                    ',' +
                                                    renderCombos?.plugins[combo?.actions[0]?.name]?.rowid;

                                                const description = combo?.description;

                                                return (
                                                    <a
                                                        key={index}
                                                        target="blank"
                                                        href={`${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${combo?.trigger?.id}/action?events=${combo?.actions
                                                            .map((action) => action.id)
                                                            .join(
                                                                ','
                                                            )}&integrations=${integrations}&action&utm_source=${utm}`}
                                                        className="px-4 py-6 flex items-center gap-4 border-b custom-border hover-bg-grey-100-text-black flex-shrink-0"
                                                    >
                                                        <Image
                                                            src={triggerIcon}
                                                            alt={`${triggerName} Trigger icon`}
                                                            className="w-6 h-6"
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <Image
                                                            src={actionIcon}
                                                            alt={`${actionName} Action icon`}
                                                            className="w-6 h-6"
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <div className="flex gap-4 items-center justify-between w-full">
                                                            <p className="text-lg flex items-center gap-2">
                                                                {description}
                                                            </p>
                                                            <span className="text-gray-500 text-sm flex items-center text-nowrap">
                                                                Try It <CgArrowTopRight />
                                                            </span>
                                                        </div>
                                                    </a>
                                                );
                                            })
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <dialog ref={modalRef} className="modal rounded-md">
                <div className="modal-box  bg-gradient-to-l from-[#def9f0] to-[#def9f0]">
                    <p className="h2 text-accent">Please select at least two Apps!</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
        </>
    );
}
