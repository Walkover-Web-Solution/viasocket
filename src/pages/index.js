import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
    MdClose,
    MdSearch,
    MdArrowForward,
    MdOutlineAutoAwesome,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from 'react-icons/md';
import GetStarted from '@/components/getStarted/getStarted';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import BlogGrid from '@/components/blogGrid/blogGrid';
import Industries from '@/assets/data/categories.json';
import { LinkButton, LinkText } from '@/components/uiComponents/buttons';
import Footer from '@/components/footer/footer';
import Autocomplete from 'react-autocomplete';
import AlphabeticalComponent from '@/components/alphabetSort/alphabetSort';
import searchApps from '@/utils/searchApps';
import {
    getCaseStudyData,
    getFaqData,
    getFooterData,
    getMetaData,
    getNavData,
    getTestimonialData,
} from '@/utils/getData';
import {
    CASESTUDY_FIELDS,
    FAQS_FIELDS,
    FOOTER_FIELDS,
    METADATA_FIELDS,
    NAVIGATION_FIELDS,
    TESTIMONIALS_FIELDS,
} from '@/const/fields';
import IntegrateAppsComp from '@/components/indexComps/integrateAppsComp';
import { getBlogData } from '@/utils/getBlogData';
import IndexBannerComp from '@/components/indexComps/indexBannerComp/indexBannerComp';
import CombinationCardComp from '@/components/combinationCardComp/combinationCardComp';
import Navbar from '@/components/navbar/navbar';
import { setUtmInCookies, setUtmSource } from '@/utils/handleUtmSource';
import FeatureGrid from '@/components/featureGrid/featureGrid';
import Link from 'next/link';
import { FaBullhorn, FaChartLine, FaCoins, FaRegClock, FaServer } from 'react-icons/fa6';
import { FaCogs, FaUserFriends } from 'react-icons/fa';
import StepDisplay from '@/components/stepDisplay/StepDisplay';

export const runtime = 'experimental-edge';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

const Index = ({
    testimonials,
    caseStudies,
    metaData,
    faqData,
    navData,
    footerData,
    initialIndus,
    redirect_to,
    utm_source,
    blogData,
    featuresData,
    indexSteps,
    streamlineData,
    signupFeatures,
}) => {
    const formattedIndustries = useMemo(() => Industries.industries.map((name, id) => ({ name, id: id + 1 })), []);
    const formattedDepartments = useMemo(() => Industries.departments.map((name, id) => ({ name, id: id + 1 })), []);

    const [indusSearchTerm, setIndusSearchTerm] = useState('');
    const [selectedIndus, setSelectedIndus] = useState(initialIndus);
    const [showIndusDropdown, setShowIndusDropdown] = useState(false);
    const [deptSearchTerm, setDeptSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [showDeptDropdown, setShowDeptDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedApps, setSelectedApps] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [appLoading, setAppLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [combinationLoading, setCombinationLoading] = useState(true);
    const debounceValue = useDebounce(searchTerm, 300);

    const [renderCombos, setRenderCombos] = useState();
    const [showInput, setShowInput] = useState(false);
    const hasRunFirstEffect = useRef(false);
    const inputRef = useRef(null);
    const fetchAppsData = useCallback(async () => await fetchApps(), []);
    const filterSelectedApps = useCallback(
        (apps) => {
            if (apps?.length > 0) {
                return apps?.filter(
                    (app) => !selectedApps.some((selectedApp) => selectedApp?.appslugname === app?.appslugname)
                );
            } else {
                return [];
            }
        },
        [selectedApps]
    );

    useEffect(() => {
        const fetchInitialApps = async () => {
            setSearchLoading(true);
            try {
                const apps = await fetchAppsData();
                setSearchData(filterSelectedApps(apps));
            } catch (error) {
                setAppLoading(false);
                console.error(error);
            } finally {
                setAppLoading(false);
                setSearchLoading(false);
            }
        };

        fetchInitialApps();
    }, [fetchAppsData, filterSelectedApps]);

    useEffect(() => {
        if (!hasRunFirstEffect.current && searchData.length > 0) {
            const initialApps = searchData.slice(0, 3);
            initialApps.forEach((app) => handleSelectApp(app.appslugname));
            hasRunFirstEffect.current = true;
        }
    }, [searchData]);

    useEffect(() => {
        if (hasRunFirstEffect.current && selectedApps.length === 3) {
            handleGenerate();
        }
    }, [selectedApps]);

    const handleSelectApp = (appName) => {
        const app = searchData.find((app) => app.appslugname === appName);
        if (app) {
            setSearchData((prev) => prev.filter((item) => item?.appslugname !== appName));
            setSelectedApps((prev) => [...prev, app]);
        }
        setSearchTerm('');
    };

    useEffect(() => {
        filterApps();
    }, [debounceValue]);

    const filterApps = async () => {
        if (debounceValue) {
            setSearchLoading(true);
            try {
                const result = await searchApps(debounceValue);
                setSearchData(filterSelectedApps(result));
            } catch (error) {
                console.error(error);
            } finally {
                setSearchLoading(false);
            }
        } else {
            const apps = await fetchAppsData();
            setSearchData(filterSelectedApps(apps));
        }
    };

    const removeAppFromArray = (indexToRemove) => {
        if (indexToRemove >= 0 && indexToRemove < selectedApps.length) {
            const appToRemove = selectedApps[indexToRemove];
            setSelectedApps((prev) => {
                const updatedSelectedApps = prev.filter((_, index) => index !== indexToRemove);
                if (updatedSelectedApps.length > 0 || selectedApps.length === 1) {
                    setSearchData((prevSearchData) => [appToRemove, ...filterSelectedApps(prevSearchData)]);
                }
                return updatedSelectedApps;
            });
        }
    };

    const handleGenerate = async () => {
        setCombinationLoading(true);
        const selectedAppSlugs = selectedApps.map((app) => app.appslugname);
        try {
            const combos = await fetchCombos(selectedAppSlugs, selectedIndus, selectedDept);
            setRenderCombos(combos?.data);
        } catch (error) {
            console.error('Error fetching combos:', error);
        } finally {
            setCombinationLoading(false);
        }
    };

    const handleSelectIndus = (val) => {
        setIndusSearchTerm('');
        setSelectedIndus(val);
        setShowIndusDropdown(false);
    };

    const filterIndustries = (searchTerm) => {
        return formattedIndustries.filter((industry) => industry.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const handleSelectDept = (val) => {
        setDeptSearchTerm('');
        setSelectedDept(val);
        setShowDeptDropdown(false);
    };

    const filterDepts = (searchTerm) => {
        return formattedDepartments.filter((industry) =>
            industry.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) => (prevIndex < searchData?.length - 1 ? prevIndex + 1 : prevIndex));
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && highlightedIndex < searchData?.length) {
                handleSelectApp(searchData[highlightedIndex].appslugname);
            }
        }
    };

    const [defaultUtmSource, setDefaultUtmSource] = useState('');

    useEffect(() => {
        const utmData = setUtmSource({ source: `/makeflow/trigger/combos` });
        setDefaultUtmSource(utmData);
    }, []);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <div className="sticky top-0 z-[100]">
                <Navbar navData={navData} utm={'/index'} />
            </div>
            <div className="w-full  hero_gradint cont md:gap-20 sm:gap-16 gap-12">
                <IndexBannerComp redirect_to={redirect_to} utm_source={utm_source} signupFeatures={signupFeatures} />

                <div className="cont text-center gap-2">
                    <h1 className="text-2xl">Streamline Every Department with AI Workflow Automation</h1>
                    <HorizontalCardScroller items={streamlineData} />
                </div>

                <FeatureGrid featuresData={featuresData} />

                <div className="container cont cont__py gap-20 px-24  h-fit border !border-gray-300">
                    <div className="flex flex-col justify-center items-center w-full text-center">
                        <h2 className="h1">Create Powerful Workflows in Three Simple Steps</h2>
                    </div>
                    <StepDisplay steps={indexSteps} />
                </div>

                <div className="container">
                    <TestimonialsSection testimonials={testimonials} />
                </div>

                <div className="container">
                    <IntegrateAppsComp />
                </div>

                <div className="container cont">
                    <CaseStudiesSection caseStudies={caseStudies} />
                    <div className="flex justify-end">
                        <Link
                            href="https://viasocket.com/blog/tag/client-story"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border !border-gray-300 border-t-0 px-4 py-2 "
                        >
                            <LinkText>Read More</LinkText>
                        </Link>
                    </div>
                </div>

                <div className="container border !border-gray-300 py-20 px-12 ">
                    <div className="cont gap-2 text-center items-center">
                        <h1 className="h1">AI Agents That Work For You</h1>
                        <p className="text-2xl font-semibold text-accent">Build, deploy, and automate with intelligent agents</p>
                        <h3 className="sub__h1 max-w-[900px]">
                            Create intelligent workflows that handle your business processes automatically without coding. Simply describe what you need in plain language, and our platform builds custom AI agents that connect your apps, make smart decisions, and improve over time.
                        </h3>
                    </div>
                </div>
                
                <div className="container cont border !border-gray-300 gap-12 py-20 px-12 justify-center text-center items-center">
                    <div className="cont gap-2 text-center items-center">
                        <h1 className="h1">Be First in Line: Mobile App Early Access</h1>
                        <p className="text-2xl font-semibold text-accent">Edit workflows with AI, anywhere, anytime</p>
                        <h3 className="sub__h1 max-w-[900px]">
                            Create and modify automation workflows from your smartphone with AI assistance. Build new
                            workflows, make quick edits, and stay in control of your business no matter where you are.
                        </h3>
                    </div>
                    <Link href="https://walkover.typeform.com/to/U33OiMgy" target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-accent">Apply For Early Access</button>
                    </Link>
                </div>

                <div className="container">
                    <BlogGrid posts={blogData} />
                </div>

                <div className="pb-4">
                    {faqData?.length > 0 && (
                        <div className="container border !border-gray-300 p-20 border-b-0">
                            <FAQSection faqData={faqData} faqName={'/index'} />
                        </div>
                    )}
                    <div className="container border !border-gray-300 p-20 border-b-0">
                        <AlphabeticalComponent step={0} />
                    </div>
                    <div className="container">
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    );
};

const HorizontalCardScroller = ({ items }) => {
    const containerRef = useRef(null);
    const [displayedItems, setDisplayedItems] = useState([...items, ...items]);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleInfiniteScroll = () => {
        const container = containerRef.current;
        const { scrollWidth, scrollLeft, offsetWidth } = container;
        const scrollRight = scrollWidth - (scrollLeft + offsetWidth);

        if (scrollRight < 100) {
            setDisplayedItems((prev) => [...prev, ...items]);
        }
    };

    const scroll = (direction) => {
        if (isScrolling) return;
        setIsScrolling(true);

        const container = containerRef.current;
        const scrollAmount = 300;
        const newPosition =
            direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newPosition,
            behavior: 'smooth',
        });

        setTimeout(() => {
            handleInfiniteScroll();
            setIsScrolling(false);
        }, 300);
    };
    const getIconComponent = (iconName) => {
        switch (iconName) {
            case 'chart-line':
                return <FaChartLine size={28} />;
            case 'bullhorn':
                return <FaBullhorn size={28} />;
            case 'coins':
                return <FaCoins size={28} />;
            case 'user-friends':
                return <FaUserFriends size={28} />;
            case 'server':
                return <FaServer size={28} />;
            case 'cogs':
                return <FaCogs size={28} />;
            default:
                return <FaRegClock size={28} />;
        }
    };

    return (
        <div className="container relative w-full overflow-hidden group">
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-20 pointer-events-none" />

            <button
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white text-black p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-all backdrop-blur-sm border !border-gray-300"
            >
                ◀
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white text-black p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-all backdrop-blur-sm border !border-gray-300"
            >
                ▶
            </button>

            <div
                ref={containerRef}
                onScroll={handleInfiniteScroll}
                style={{ overflowX: 'hidden' }}
                className="flex overflow-x-auto gap-6 py-6 scroll-smooth"
            >
                {displayedItems.map((item, index) => (
                    <div
                        key={`${index}-${item.title}`}
                        className="w-[300px] shadow-lg p-6 flex-shrink-0 border mx-2 hover:bg-black hover:text-white group"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <h3 className="font-bold text-2xl">{item.title}</h3>
                                <div className="text-accent">{getIconComponent(item.iconName)}</div>
                            </div>
                            <p className="text-base leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const WorkflowStepsSection = ({ indexSteps }) => (
    <div className="container cont cont__py gap-12 px-4 md:px-8 lg:px-24 h-fit border !border-gray-300">
        <div className="flex flex-col justify-center items-center w-full text-center">
            <h2 className="h1">Create Powerful Workflows in Three Simple Steps</h2>
        </div>

        <div className="cont w-full gap-4">
            {indexSteps.map((step, index) => (
                <WorkflowStep key={index} step={step} stepNumber={index + 1} isEven={index % 2 !== 0} />
            ))}
        </div>
    </div>
);

const WorkflowStep = ({ step, stepNumber, isEven }) => {
    return (
        <div className="w-full">
            <div className="md:hidden cont">
                <div className="p-8 cont gap-2">
                    <p className="text-accent font font-semibold">Step {stepNumber}</p>
                    <h3 className="h2 font-bold">{step.title}</h3>
                    <p className="sub__h2">{step.description}</p>
                </div>
            </div>

            <div className={`hidden md:flex ${isEven ? 'flex-row' : 'flex-row-reverse'} justify-center`}>
                <div className={`w-1/3 p-4 flex flex-col gap-4 justify-center ${isEven ? 'text-end' : 'text-start'}`}>
                    <h3 className="h2 font-bold">{step.title}</h3>
                    <p className="sub__h2">{step.description}</p>
                </div>

                <div className="w-1/3 flex items-center justify-center">
                    <div
                        className={`flex items-center ${isEven ? 'justify-start' : 'justify-end'} text-6xl font-bold text-accent p-4 h-full w-full`}
                    >
                        Step {stepNumber}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TestimonialsSection = ({ testimonials }) => (
    <div className="flex flex-col gap-9">
        <h2 className="h1 flex gap-2 flex-wrap">
            What clients says <MdOutlineAutoAwesome />
        </h2>
        <div className="index_client_grid grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full !border !border-gray-300">
            {testimonials.map((testimonial, index) => (
                <div className="flex flex-col sm:p-12 p-6 gap-4 !border !border-gray-300 !border-right-0" key={index}>
                    <div className="flex flex-col  gap-2 ">
                        <Image
                            className="!border !border-gray-300"
                            src={testimonial?.client_img[0] || 'https://placehold.co/40x40'}
                            width={50}
                            height={50}
                            alt={testimonial?.given_by}
                        />
                        <div className="flex flex-col">
                            <p className="text-sm tracking-wider uppercase font-bold ">{testimonial?.given_by}</p>
                            <p className="text-sm  text-grey">{testimonial?.giver_title}</p>
                        </div>
                    </div>
                    <p className="text-[#373737]">{testimonial?.testimonial}</p>
                </div>
            ))}
        </div>
    </div>
);

const CaseStudiesSection = ({ caseStudies }) => (
    <div className="flex flex-col gap-9">
        <h2 className="h1">Trusted by hundreds of businesses like yours</h2>
        <div className="flex flex-col gap-8 w-full border !border-gray-300 p-8">
            {caseStudies.map((caseStudy, index) => (
                <CaseStudyItem key={index} caseStudy={caseStudy} isEven={index % 2 !== 0} />
            ))}
        </div>
    </div>
);

const CaseStudyItem = ({ caseStudy, isEven }) => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:hidden w-full">
                <div className="casestudy_img overflow-hidden w-full px-4">
                    <Image
                        className="h-full w-full object-cover"
                        src={caseStudy?.image_1[0] || 'https://placehold.co/40x40'}
                        width={1080}
                        height={1080}
                        alt={caseStudy?.title}
                    />
                </div>
                <div className="w-full p-6 flex flex-col gap-3 px-4">
                    <h3 className="text-xl font-semibold">{caseStudy?.title}</h3>
                    <LinkButton href={caseStudy?.link} content={'Know More'} />
                </div>
            </div>

            <div className={`hidden md:flex w-full ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-1/2 casestudy_img overflow-hidden px-8">
                    <Image
                        className="h-full w-full object-cover border !border-gray-300"
                        src={caseStudy?.image_1[0] || 'https://placehold.co/40x40'}
                        width={1080}
                        height={1080}
                        alt={caseStudy?.title}
                    />
                </div>

                <div className="w-1/2 p-6 flex flex-col gap-3 justify-center">
                    <h3 className="text-xl font-semibold">{caseStudy?.title}</h3>
                    <LinkButton href={caseStudy?.link} content={'Know More'} />
                </div>
            </div>
        </div>
    );
};

export default Index;

export async function getServerSideProps(context) {
    const { redirect_to } = context.query;
    const { utm_source } = context?.query;

    const randomIndex = Math.floor(Math.random() * Industries.industries.length);
    const initialIndus = Industries.industries[randomIndex];

    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/index'`);
    const testimonials = await getTestimonialData(TESTIMONIALS_FIELDS);
    const caseStudies = await getCaseStudyData(CASESTUDY_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/'`);
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const blogTags = 'index';
    const blogData = await getBlogData(blogTags);
    const featuresData = [
        {
            heading: 'Save Hours Every Day',
            content: 'Let AI handle your repetitive tasks while you focus on growth',
            iconName: 'clock',
        },
        {
            heading: 'No Technical Skills Needed',
            content: 'Run tens of thousands of actions reliably and in real-time without delays or complications',
            iconName: 'mouse',
        },
        {
            heading: 'Built-in Auth and Security',
            content: 'If you can click a mouse, you can build powerful workflows',
            iconName: 'shield',
        },
        {
            heading: 'Error-Free Operations',
            content: 'Eliminate costly mistakes with consistent, reliable processes',
            iconName: 'check',
        },
        {
            heading: 'Start Small, Scale When Ready',
            content: 'Begin with one process and expand at your own pace',
            iconName: 'scale',
        },
        {
            heading: 'Connect All Your Business Tools',
            content: 'Finally get your softwares talking to each other',
            iconName: 'plug',
        },
    ];

    const indexSteps = [
        {
            title: 'Describe Your Needs',
            description: 'Tell our AI what you want to automate in simple language',
            image: '/assets/brand/workflowSteps1.svg',
        },
        {
            title: 'Review Your Workflow ',
            description: 'See a visualization of your automation and make adjustments',
            image: '/assets/brand/workflowSteps2.svg',
        },
        {
            title: 'Activate and Relax',
            description: 'Let viaSocket handle the tedious tasks while you focus on growth',
            image: '/assets/brand/workflowSteps3.svg',
        },
    ];

    const streamlineData = [
        {
            title: 'Sales',
            iconName: 'chart-line',
            description:
                'Automatically qualify leads, schedule follow-ups, and update your CRM. Convert prospects to customers while your team focuses on relationship building instead of data entry.',
        },
        {
            title: 'Marketing',
            iconName: 'bullhorn',
            description:
                'Synchronize campaign data, trigger personalized messaging based on customer actions, and maintain consistent cross-channel communication without manual intervention.',
        },
        {
            title: 'Finance',
            iconName: 'coins',
            description:
                'Automate invoice generation, payment reminders, expense approvals, and financial reporting. Ensure accuracy while reducing the time spent on routine financial processes.',
        },
        {
            title: 'HR',
            iconName: 'user-friends',
            description:
                'Streamline employee onboarding, automate time-off requests, collect feedback, and manage document approvals. Create a seamless experience for your team.',
        },
        {
            title: 'IT',
            iconName: 'server',
            description:
                'Automate ticket routing, system monitoring alerts, access management, and recurring maintenance tasks. Reduce resolution time and prevent system issues.',
        },
        {
            title: 'Operations',
            iconName: 'cogs',
            description:
                'Coordinate inventory updates, manage supply chain communications, automate order processing, and streamline project handoffs across departments.',
        },
    ];

    const signupFeatures = ['Unlimited active workflows', 'No credit card required', 'Connect 5000+ apps'];

    return {
        props: {
            testimonials: testimonials || [],
            caseStudies: caseStudies || [],
            metaData: (metaData?.length > 0 && metaData[0]) || {},
            faqData: faqData || [],
            navData: navData || [],
            footerData: footerData || [],
            blogData: blogData || [],
            initialIndus,
            redirect_to: redirect_to || '',
            utm_source: utm_source || 'website',
            blogTags: blogTags,
            featuresData: featuresData,
            indexSteps: indexSteps,
            streamlineData: streamlineData,
            signupFeatures: signupFeatures,
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

async function fetchCombos(pathArray, industry, department) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/services?${pathArray.map((service) => `service=${service}`).join('&')}&industry=${industry && industry.toLowerCase()}&department=${department && department !== 'All' && department.toLowerCase()}`
    );
    const responseData = await response.json();
    return responseData;
}
