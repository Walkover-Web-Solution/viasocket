'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import FAQSection from '@/components/faqSection/faqSection';
import { LinkText } from '@/components/uiComponents/buttons';
import Footer from '@/components/footer/footer';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import SecuritySection from '@/app/components/SecuritySection';
import IntegrationsBetaComp from '../IntegrationsBetaComp/IntegrationsBetaComp';
import BlogGrid from '@/app/components/blog/BlogGrid';
import createURL from '@/utils/createURL';
import VideoGrid from '@/components/videoGrid/videoGrid';
import IntegrationsEventsComp from '../integrationsEventsComp/integrationsEventsComp';
import { handleRedirect } from '@/utils/handleRedirection';
import ExternalLink from '@/utils/ExternalLink';
import { ChevronDown, ChevronUp, ArrowRight, Zap, Sparkles, CheckCircle, RefreshCw, Package, Users, ClipboardList, Code2, Timer, RefreshCcw } from 'lucide-react';
import { ArrowLeftRight, Search, Link2, Settings2, Rocket } from 'lucide-react';
import { RequestIntegrationPopupOpener } from '../IntegrationsIndexComp/IntegrationsIndexClientComp';
import generateIntegrationFAQ from './generateIntegrationFAQ';
import TemplateContainer from '../templateContainer/templateContainer';
import Breadcrumb from '@/components/breadcrumb/breadcrumb';
import DashboardButton from '@/components/dashboardButton/dashboardButton';
import GetStarted from '@/components/getStarted/getStarted';
import ShowAppsIndexOptimized from '@/app/components/home/ShowAppsIndexOptimized';
import ShowBadges from '@/app/components/home/ShowBadges';
import CombinationCardComp from '@/components/combinationCardComp/combinationCardComp';

const POPULAR_APPS = [
    { name: 'Slack', slug: 'slack' },
    { name: 'Gmail', slug: 'gmail' },
    { name: 'HubSpot', slug: 'hubspot' },
    { name: 'Salesforce', slug: 'salesforce' },
    { name: 'Notion', slug: 'notion' },
    { name: 'Trello', slug: 'trello' },
    { name: 'Asana', slug: 'asana' },
    { name: 'Mailchimp', slug: 'mailchimp' },
    { name: 'Airtable', slug: 'airtable' },
    { name: 'Google Sheets', slug: 'google-sheets' },
    { name: 'Shopify', slug: 'shopify' },
    { name: 'Stripe', slug: 'stripe' },
    { name: 'Zoom', slug: 'zoom' },
    { name: 'Dropbox', slug: 'dropbox' },
];

function TriggerOrActionCard({ title, appDetails, placeholder, list, isOpen, onToggle, onSelect, type, resetEvent }) {
    const [search, setSearch] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        if (resetEvent) {
            setSelectedEvent(null);
        }
    }, [resetEvent]);

    const filteredList = list?.filter((item) => item?.name?.toLowerCase().includes(search.toLowerCase()));

    const handleSelect = (event) => {
        setSelectedEvent(event);
        setSearch('');
        onSelect(event);
        if (onToggle) {
            onToggle();
        }
    };

    return (
        <div className="flex flex-col w-full md:w-1/2 gap-2 relative">
            <h2 className="text-sm font-medium text-gray-500 text-left">{title}</h2>

            <div
                className="w-full rounded-xl p-[2px] transition-colors"
                style={{ backgroundColor: appDetails?.brandcolor || '#E5E7EB' }}
            >
                <div
                    className="w-full rounded-[10px] flex items-center bg-white cursor-pointer px-4 py-3 relative"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                >
                    <div className="mr-4 shrink-0 w-9 h-9 border custom-border overflow-hidden bg-white flex items-center justify-center">
                        <Image
                            src={appDetails?.iconurl || 'https://placehold.co/36x36'}
                            width={28}
                            height={28}
                            alt={`${appDetails?.name || 'App'} logo`}
                            className="w-6 h-6 object-contain"
                        />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center pr-8 text-left">
                        <p className="font-bold text-gray-900 text-base truncate">{appDetails?.name || 'Select app'}</p>
                        <p className="text-sm text-gray-500 truncate">
                            {selectedEvent ? selectedEvent.name : (type === 'trigger' ? 'When this happens...' : 'Automatically do this!')}
                        </p>
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                </div>
            </div>
            <div
                className={`absolute top-full left-0 mt-2 w-full border custom-border bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-20
                ${isOpen ? 'opacity-100 visible max-h-72' : 'opacity-0 invisible max-h-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b flex items-center gap-2 p-2 z-30">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={placeholder}
                        className="w-full outline-none text-sm p-1"
                    />
                </div>

                <ul className="divide-y overflow-y-auto max-h-60">
                    {filteredList?.length > 0 ? (
                        filteredList.map((event, index) => (
                            <li
                                key={index}
                                className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleSelect(event)}
                            >
                                <div className="flex flex-row items-center gap-2">
                                    <div className="border flex items-center justify-center p-2">
                                        <Image
                                            src={appDetails?.iconurl || 'https://placehold.co/36x36'}
                                            width={20}
                                            height={20}
                                            alt={`${appDetails?.name || 'App'} logo`}
                                        />
                                    </div>
                                    <p className="text-lg">{event?.name}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-3 text-center">
                            <div className="flex flex-row items-center gap-2">
                                <RequestIntegrationPopupOpener type={type} showType="dotted" appInfo={appDetails} />
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}


function TriggersAndActions({ appOneDetails, appTwoDetails }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <span className="text-accent text-xs font-bold uppercase tracking-widest">Full list</span>
                <h2 className="h2">Supported Triggers &amp; Actions</h2>
                <p className="text-gray-500 text-base">
                    Everything you can automate between {appOneDetails?.name} and {appTwoDetails?.name}.
                </p>
            </div>

            <IntegrationsEventsComp appOneDetails={appOneDetails} appTwoDetails={appTwoDetails} />
        </div>
    );
}

function HowToConnect({ appOneName, appTwoName }) {
    const steps = [
        {
            title: 'Sign up for viaSocket for free',
            desc: 'Create your account at viasocket.com. No credit card required.',
        },
        {
            title: `Connect your ${appOneName} account`,
            desc: `Authorize viaSocket to access your ${appOneName} workspace. It takes about 30 seconds.`,
        },
        {
            title: `Connect your ${appTwoName} account`,
            desc: `Do the same for ${appTwoName}. viaSocket uses secure OAuth so your credentials stay private.`,
        },
        {
            title: 'Pick a trigger and an action',
            desc: `Choose what event in ${appOneName} starts the workflow, then set what viaSocket does in ${appTwoName}.`,
        },
        {
            title: 'Turn on your workflow',
            desc: 'Test it once, activate, and it runs automatically from then on.',
        },
    ];

    return (
        <div className="cont gap-8">
            <div className="cont gap-2">
                <h2 className="h2">
                    How to connect {appOneName} and {appTwoName}
                </h2>
                <p className="sub__h1">Get your first automation running in under five minutes.</p>
            </div>
            <ol className="flex flex-col gap-6">
                {steps.map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 bg-accent text-white flex items-center justify-center shrink-0 font-bold text-sm">
                            {i + 1}
                        </div>
                        <div className="flex flex-col gap-1 pt-1">
                            <p className="font-semibold text-gray-900">{step.title}</p>
                            <p className="text-sm text-gray-600">{step.desc}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function AIFeatureSection({ appOneName, appTwoName }) {
    const features = ['No coding required', 'Review before publishing', 'Works with 2,000+ apps'];

    return (
        <div className="container">
            <div className="flex flex-col md:flex-row items-stretch gap-10 md:gap-16">
                {/* Left: product screenshot (dark app UI image) */}
                <div className="w-full md:w-[38%] shrink-0 rounded-xl overflow-hidden">
                    <Image
                        src="/assets/ai-builder-interface.png"
                        width={500}
                        height={380}
                        alt="viaSocket AI builder interface"
                        className="w-full h-auto object-cover object-top"
                    />
                </div>

                {/* Right: content on light background */}
                <div className="flex flex-col justify-center gap-6 w-full md:w-[45%]">
                    <span className="flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest">
                        <span>&#9670;</span>
                        AI Workflow Builder
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                        From idea to automation.<br />
                        <span className="text-accent">Ai will build it for you</span>
                    </h2>

                    <p className="text-gray-500 text-base leading-relaxed">
                        Just describe the task in plain English. Viasocket AI selects the right apps, builds the workflow, maps the fields, and prepares everything for review before you publish.
                    </p>

                    <div className="flex flex-wrap items-center">
                        {features.map((label, i) => (
                            <span key={i} className="flex items-center gap-1.5 text-gray-600 text-sm">
                                {i > 0 && <span className="mx-3 text-gray-300">|</span>}
                                <CheckCircle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                {label}
                            </span>
                        ))}
                    </div>

                    <a
                        href={`${process.env.NEXT_PUBLIC_FLOW_URL || 'https://app.viasocket.com'}/ai`}
                        className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-accent/90 transition-colors self-start mt-2"
                    >
                        Create with AI
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    );
}

function RelatedIntegrations({ appOneDetails, appTwoDetails }) {
    const appOneSiblings = POPULAR_APPS.filter(
        (a) => a.slug !== appOneDetails?.appslugname && a.slug !== appTwoDetails?.appslugname
    ).slice(0, 5);
    const appTwoSiblings = POPULAR_APPS.filter(
        (a) => a.slug !== appTwoDetails?.appslugname && a.slug !== appOneDetails?.appslugname
    ).slice(0, 5);

    return (
        <div className="cont gap-8">
            <h2 className="h2">Related integrations</h2>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col gap-3 w-full">
                    <p className="font-semibold text-gray-700">
                        Other {appOneDetails?.name} integrations
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {appOneSiblings.map((app, i) => (
                            <Link
                                key={i}
                                href={`/integrations/${appOneDetails?.appslugname}/${app.slug}`}
                                className="btn btn-outline text-sm"
                            >
                                {appOneDetails?.name} + {app.name}
                            </Link>
                        ))}
                        <Link
                            href={`/integrations/${appOneDetails?.appslugname}`}
                            className="btn btn-outline text-sm"
                        >
                            See all {appOneDetails?.name} integrations
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <p className="font-semibold text-gray-700">
                        Other {appTwoDetails?.name} integrations
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {appTwoSiblings.map((app, i) => (
                            <Link
                                key={i}
                                href={`/integrations/${appTwoDetails?.appslugname}/${app.slug}`}
                                className="btn btn-outline text-sm"
                            >
                                {appTwoDetails?.name} + {app.name}
                            </Link>
                        ))}
                        <Link
                            href={`/integrations/${appTwoDetails?.appslugname}`}
                            className="btn btn-outline text-sm"
                        >
                            See all {appTwoDetails?.name} integrations
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function IntegrationsAppTwoClientComp({
    combosData,
    footerData,
    appOneDetails,
    appTwoDetails,
    blogsData,
    videoData,
    getDoFollowUrlStatusArray,
    templateToShow,
    hasToken,
}) {
    const router = useRouter();
    const [visibleCombos, setVisibleCombos] = useState(12);
    const [showMore, setShowMore] = useState(combosData?.combinations?.length >= visibleCombos);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedTrigger, setSelectedTrigger] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [resetTrigger, setResetTrigger] = useState(false);
    const faqData = generateIntegrationFAQ(appOneDetails?.name, appTwoDetails?.name);

    const categorizeEvents = (events = []) => {
        const triggers = [];
        const actions = [];
        events.forEach((event) => {
            if (event?.type === 'trigger') triggers.push(event);
            else if (event?.type === 'action') actions.push(event);
        });
        return { triggers, actions };
    };

    const [currentAppOne, setCurrentAppOne] = useState(appOneDetails);
    const [currentAppTwo, setCurrentAppTwo] = useState(appTwoDetails);

    const [appOneEvents, setAppOneEvents] = useState(categorizeEvents(currentAppOne?.events));
    const [appTwoEvents, setAppTwoEvents] = useState(categorizeEvents(currentAppTwo?.events));

    useEffect(() => {
        const handleClickOutside = () => {
            if (openDropdown) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openDropdown]);

    const handleSwapApps = () => {
        const tempApp = currentAppOne;
        setCurrentAppOne(currentAppTwo);
        setCurrentAppTwo(tempApp);
        setSelectedTrigger(null);
        setSelectedAction(null);
        setResetTrigger(!resetTrigger);
        setAppOneEvents(categorizeEvents(currentAppTwo?.events));
        setAppTwoEvents(categorizeEvents(currentAppOne?.events));
        const newURL = `/integrations/${currentAppTwo?.appslugname}/${currentAppOne?.appslugname}`;
        router.push(newURL);
    };

    const hasAnyEvents =
        appOneDetails?.events?.length > 0 || appTwoDetails?.events?.length > 0;

    const popularUseCases = combosData?.combinations
        ?.filter((c) => c?.description && !/^(List|Get)\b/i.test(c.description.trim()))
        ?.slice(0, 6) || [];

    const getComboLink = (combo) => {
        const integrations =
            combosData?.plugins[combo?.trigger?.name]?.rowid +
            ',' +
            combosData?.plugins[combo?.actions[0]?.name]?.rowid;
        return `${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${combo?.trigger?.id}/action?events=${combo?.actions
            ?.map((action) => action?.id)
            .join(',')}&integrations=${integrations}&action&`;
    };

    const hasCombinations = combosData?.combinations?.length > 0;

    const hasMatchingTemplates = useMemo(() => {
        const appSlugs = [appOneDetails, appTwoDetails]
            .map((app) => app?.appslugname || app?.slugname || app?.slug)
            .filter(Boolean);
        if (!templateToShow?.length || appSlugs.length === 0) return false;

        return templateToShow.some((template) => {
            const pluginSlugs = (template.pluginData || []).map((p) => p.pluginslugname);
            const appMatches = (slug) => {
                if (slug === 'webhook') return template.triggerType === 'webhook';
                if (slug === 'cron') return template.triggerType === 'cron';
                return pluginSlugs.includes(slug);
            };
            return appSlugs.every(appMatches);
        });
    }, [templateToShow, appOneDetails, appTwoDetails]);

    const utm = '/integrations/' + appOneDetails?.appslugname + '/' + appTwoDetails?.appslugname;

    return (
        <div className="cont -mt-10 global-top-space pt-6 gap-20 md:gap-28 lg:gap-32">

            {/* Breadcrumb */}
            <div className="container flex flex-wrap items-center text-base md:text-lg mt-1 text-gray-700">
                <Breadcrumb
                    parent="Integrations"
                    child1={appOneDetails?.name}
                    child2={appTwoDetails?.name}
                    child3={appOneDetails?.name + ' + ' + appTwoDetails?.name}
                    parentLink={`/integrations`}
                    child1Link={`/integrations/${appOneDetails?.appslugname}`}
                    child2Link={`/integrations/${appTwoDetails?.appslugname}`}
                />
            </div>

            {/* Hero */}
            <div className="container">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10 px-4">
                    <div className="cont items-start text-left gap-6 w-full lg:w-1/2">
                        <h1 className="h1">
                            Connect{' '}
                            <span className="text-accent">{appOneDetails?.name}</span>{' '}
                            and{' '}
                            <span className="text-accent">{appTwoDetails?.name}</span>
                        </h1>

                        <p className="text-base text-gray-600">
                            Save hours every week with {appOneDetails?.name} + {appTwoDetails?.name} automations. Stop doing things manually and let viaSocket handle the repetitive tasks between your apps
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-gray-900 text-sm font-bold">
                            <span className="flex items-center gap-1.5"><Code2 className="w-4 h-4 text-accent" /> No Code</span>
                            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-accent" /> AI Powered</span>
                            <span className="flex items-center gap-1.5"><RefreshCcw className="w-4 h-4 text-accent" /> Real-time Sync</span>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                            {selectedTrigger && selectedAction ? (
                                <button
                                    onClick={(e) => {
                                        handleRedirect(
                                            e,
                                            `${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${selectedTrigger.rowid}/action?events=${selectedAction.rowid}&integrations=${selectedTrigger.pluginrecordid},${selectedAction.pluginrecordid}&action&`
                                        );
                                    }}
                                    className="btn btn-accent px-8 py-3"
                                >
                                    Connect these apps for free
                                </button>
                            ) : (
                                <button
                                    className="btn btn-accent px-8 py-3"
                                    onClick={(e) => handleRedirect(e, hasToken ? `https://flow.viasocket.com?` : `/signup?`, null, utm)}
                                >
                                    Create your flow
                                </button>
                            )}
                            <a
                                href="https://cal.id/team/viasocket/workflow-setup-discussion"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline px-8 py-3 flex items-center gap-2"
                            >
                                Book a demo
                            </a>
                        </div>
                    </div>

                    {popularUseCases.length > 0 && (
                        <div className="w-full lg:w-[620px] shrink-0 self-center" style={{ position: 'relative' }}>
                            <div
                                aria-hidden="true"
                                style={{
                                    position: 'absolute',
                                    top: -50,
                                    left: 20,
                                    width: 180,
                                    height: 180,
                                    borderRadius: '50%',
                                    background: '#C41230',
                                    filter: 'blur(90px)',
                                    opacity: 0.12,
                                    zIndex: 0,
                                }}
                            ></div>
                            <div
                                aria-hidden="true"
                                style={{
                                    position: 'absolute',
                                    bottom: -40,
                                    right: 10,
                                    width: 200,
                                    height: 200,
                                    borderRadius: '50%',
                                    background: '#9CA3AF',
                                    filter: 'blur(90px)',
                                    opacity: 0.15,
                                    zIndex: 0,
                                }}
                            ></div>
                            <div
                                aria-hidden="true"
                                style={{
                                    position: 'absolute',
                                    top: 20,
                                    left: -30,
                                    right: -30,
                                    bottom: 0,
                                    background: 'rgba(90,90,90,0.1)',
                                    filter: 'blur(60px)',
                                    zIndex: 0,
                                }}
                            ></div>

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div className="flex items-center gap-3" style={{ marginBottom: 20 }}>
                                    <span className="w-1 bg-accent rounded-full shrink-0" style={{ height: 22, backgroundColor: '#C41230' }} aria-hidden="true"></span>
                                    <h3 className="font-bold text-black" style={{ fontSize: 20 }}>Popular Use Cases</h3>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {popularUseCases.slice(0, 5).map((combo, i) => (
                                        <a
                                            key={i}
                                            href={getComboLink(combo)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 rounded-2xl px-[18px] py-4"
                                            style={{
                                                position: 'relative',
                                                zIndex: 1,
                                                background: 'rgba(255, 255, 255, 0.5)',
                                                border: '1px solid rgba(255, 255, 255, 0.8)',
                                                backdropFilter: 'blur(28px) saturate(180%)',
                                                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                                                boxShadow:
                                                    '0 12px 28px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.85), inset 0 0 10px rgba(120,120,120,0.05)',
                                            }}
                                        >
                                            <Zap className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                                            <p className="text-[15px] text-[#1F2430] truncate">{combo?.description}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 4. Popular flows */}
            {hasCombinations ? (
                <div className="container flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">Ready to use</span>
                        <h2 className="h2">
                            Popular {appOneDetails?.name} + {appTwoDetails?.name} flows
                        </h2>
                        <p className="text-gray-600 max-w-xl">
                            Start from a real workflow other teams are already running.
                        </p>
                    </div>

                    {/* Builder */}
                    <div className="flex flex-col items-start w-full">
                        <div className="flex flex-col md:flex-row justify-start items-center w-full max-w-6xl gap-4">
                            <TriggerOrActionCard
                                title="Choose a trigger"
                                appDetails={currentAppOne}
                                placeholder="Search triggers..."
                                list={appOneEvents.triggers}
                                isOpen={openDropdown === 'trigger'}
                                onToggle={() => setOpenDropdown(openDropdown === 'trigger' ? null : 'trigger')}
                                onSelect={(event) => setSelectedTrigger(event)}
                                type="trigger"
                                resetEvent={resetTrigger}
                            />

                            <div className="flex flex-col items-center justify-center py-4 md:py-0">
                                <button
                                    onClick={handleSwapApps}
                                    className="btn btn-outline px-4 py-2 flex items-center gap-2 md:hidden"
                                >
                                    Swap apps
                                </button>
                                <button
                                    onClick={handleSwapApps}
                                    className="hidden md:flex items-center justify-center mt-8 text-gray-400 hover:text-accent transition-colors"
                                    aria-label="Swap apps"
                                >
                                    <ArrowLeftRight className="w-5 h-5" />
                                </button>
                            </div>

                            <TriggerOrActionCard
                                title="Choose an action"
                                appDetails={currentAppTwo}
                                placeholder="Search actions..."
                                list={appTwoEvents.actions}
                                isOpen={openDropdown === 'action'}
                                onToggle={() => setOpenDropdown(openDropdown === 'action' ? null : 'action')}
                                onSelect={(event) => setSelectedAction(event)}
                                type="action"
                                resetEvent={resetTrigger}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {combosData?.combinations
                            ?.filter(
                                (combo) =>
                                    combo?.description &&
                                    !/^(List|Get)\b/i.test(combo.description.trim())
                            )
                            ?.slice(0, visibleCombos)
                            ?.map((combo, index) => {
                                const integrations =
                                    combosData?.plugins[combo?.trigger?.name]?.rowid +
                                    ',' +
                                    combosData?.plugins[combo?.actions[0]?.name]?.rowid;
                                const triggerIconUrl =
                                    combosData?.plugins[combo?.trigger?.name]?.iconurl ||
                                    'https://placehold.co/36x36';
                                const actionIconUrl =
                                    combosData?.plugins[combo?.actions[0]?.name]?.iconurl ||
                                    'https://placehold.co/36x36';
                                const triggerAppName =
                                    combosData?.plugins[combo?.trigger?.name]?.name || 'App';
                                const actionAppName =
                                    combosData?.plugins[combo?.actions[0]?.name]?.name || 'App';
                                const link = `${process.env.NEXT_PUBLIC_FLOW_URL}/makeflow/trigger/${combo?.trigger?.id}/action?events=${combo?.actions
                                    ?.map((action) => action?.id)
                                    .join(',')}&integrations=${integrations}&action&`;
                                return (
                                    <a
                                        key={index}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white rounded-xl border custom-border p-6 flex flex-col gap-4 hover:shadow-md transition-shadow group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-9 h-9 border custom-border overflow-hidden bg-white flex items-center justify-center shrink-0">
                                                <Image src={triggerIconUrl} width={28} height={28} alt={`${triggerAppName} logo`} className="w-6 h-6 object-contain" />
                                            </div>
                                            <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" aria-hidden="true" />
                                            <div className="w-9 h-9 border custom-border overflow-hidden bg-white flex items-center justify-center shrink-0">
                                                <Image src={actionIconUrl} width={28} height={28} alt={`${actionAppName} logo`} className="w-6 h-6 object-contain" />
                                            </div>
                                        </div>
                                        <p className="font-bold text-gray-900 text-base leading-snug flex-1">{combo.description}</p>
                                        <span className="text-accent font-medium text-sm flex items-center gap-1">
                                            Use this flow <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                                        </span>
                                    </a>
                                );
                            })}
                    </div>
                    {showMore && (
                        <button
                            onClick={() => {
                                setVisibleCombos(visibleCombos + 6);
                                if (combosData?.combinations?.length <= visibleCombos + 6) setShowMore(false);
                            }}
                            className="btn btn-outline self-start"
                        >
                            Load more <ChevronDown className="w-5 h-5" />
                        </button>
                    )}
                </div>
            ) : (
                <>
                    {!hasAnyEvents && <IntegrationsBetaComp appOneDetails={appOneDetails} />}
                    {!hasCombinations && hasAnyEvents && (
                        <div className="cont gap-4">
                            <h2 className="h2">
                                Available events for{' '}
                                <span className="text-accent">{appOneDetails?.name}</span>{' '}
                                and{' '}
                                <span className="text-accent">{appTwoDetails?.name}</span>
                            </h2>
                        </div>
                    )}
                </>
            )}

            {/* 5. Supported Triggers & Actions */}
            {(appOneDetails?.events?.length > 0 || appTwoDetails?.events?.length > 0) && (
                <div className="container">
                    <TriggersAndActions
                        appOneDetails={appOneDetails}
                        appTwoDetails={appTwoDetails}
                    />
                </div>
            )}

            {/* 6b. Pre-built Workflows (Templates) */}
            {hasMatchingTemplates && (
                <div className="container flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">Pre-built Workflows</span>
                        <h2 className="h2">Start with a template</h2>
                        <p className="text-gray-500 text-base whitespace-nowrap">
                            Launch your automation in minutes using professionally built workflow templates. Customize them anytime to fit your needs.
                        </p>
                    </div>
                    <TemplateContainer
                        selectedApps={[currentAppOne, currentAppTwo]}
                        templateToShow={templateToShow}
                        requireAllApps={true}
                    />
                </div>
            )}

            {/* 3. How It Works - Build your first workflow */}
            <div className="container">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    <a
                        href="https://www.youtube.com/watch?v=1KKTY-3WSzk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-[55%] shrink-0 rounded-xl overflow-hidden relative group"
                    >
                        <Image
                            src="https://img.youtube.com/vi/1KKTY-3WSzk/maxresdefault.jpg"
                            width={720}
                            height={405}
                            alt="How to build your first workflow with viaSocket"
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-accent ml-1">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </a>
                    <div className="flex flex-col gap-5 w-full md:w-[45%]">
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">2-Minute Guide</span>
                        <h2 className="h2 leading-tight">Learn how to build your first <span className="text-accent">workflow</span></h2>
                        <p className="text-gray-500 text-base leading-relaxed">
                            Follow a simple walkthrough to create, test, and launch your first automation.
                        </p>
                        <ol className="flex flex-col">
                            {[
                                { title: 'Connect your apps', desc: 'Link the apps you want to automate.' },
                                { title: 'Configure your workflow', desc: 'Set up triggers, actions, and map your data.' },
                                { title: 'Test & publish', desc: 'Test your workflow and publish it.' },
                            ].map((step, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    <div className="pb-5">
                                        <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                                        <p className="text-gray-500 text-sm mt-0.5">{step.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <button
                            className="btn btn-accent self-start"
                            onClick={(e) => handleRedirect(e, hasToken ? `https://flow.viasocket.com?` : `/signup?`, null, utm)}
                        >
                            Create your flow
                        </button>
                    </div>
                </div>
            </div>

            {/* Trust & Security */}
            <div className="flex flex-col gap-0">
                <ShowBadges />
                <div className="container">
                    <ShowAppsIndexOptimized isTrustMarquee={true} />
                </div>
            </div>

            {/* AI Workflow Builder */}
            <AIFeatureSection
                appOneName={appOneDetails?.name}
                appTwoName={appTwoDetails?.name}
            />

            {/* 7. Watch & Learn */}
            {videoData?.length > 0 && (
                <VideoGrid
                    videoData={videoData}
                    appOneName={appOneDetails?.name}
                    appTwoName={appTwoDetails?.name}
                />
            )}

            {/* 7b. Learn More About Automation (Blog) */}
            {blogsData?.length > 0 && (
                <div className="container">
                    <BlogGrid posts={blogsData} />
                </div>
            )}

            {/* 8. Need Help Building Your Workflow? */}
            <div className="container cont">
                <GetStarted />
            </div>

            {/* 10. FAQs */}
            {faqData && <FAQSection faqData={faqData} />}

            {/* 14. Final CTA */}
            <div className="container">
                <div className="bg-black text-white py-5 px-4 text-center w-full">
                    <div className="cont gap-6 items-center">
                        <h2 className="h2 text-white">
                            Start automating {appOneDetails?.name} and {appTwoDetails?.name} free
                        </h2>
                        <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
                            No credit card required. Set up your first workflow in minutes.
                        </p>
                        <DashboardButton utm_src={utm + '#final-cta'} hasToken={hasToken} />
                    </div>
                </div>
            </div>

            {/* About App A and About App B */}
            <div className="container pb-4">
                <div className="cont">
                    <div className="flex flex-col md:flex-row border border-x-0 border-b-0 custom-border bg-white">
                        <div className="cont gap-4 w-full p-6 md:p-12 border border-t-0 md:border-b-0 custom-border">
                            <div className="cont gap-2">
                                <Image className="h-10 w-fit" src={appOneDetails?.iconurl || 'https://placehold.co/36x36'} width={36} height={36} alt={`${appOneDetails?.name} logo`} />
                                <h3 className="h3 font-bold pt-5">About {appOneDetails?.name}</h3>
                            </div>
                            <p className="text-sm sm:text-lg text-black h-full">{appOneDetails?.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {appOneDetails?.category?.slice(0, 2).map((cat, index) => (
                                    <Link key={index} href={createURL(`/integrations/category/${cat.toLowerCase().replace(/\s+/g, '-')}`)} className="mb-2">
                                        <span className="btn btn-outline">{cat}</span>
                                    </Link>
                                ))}
                            </div>
                            <ExternalLink
                                href={(() => {
                                    const baseUrl = appOneDetails?.domain?.startsWith('http') ? appOneDetails?.domain : 'http://' + appOneDetails?.domain;
                                    const separator = baseUrl.includes('?') ? '&' : '?';
                                    return `${baseUrl}${separator}utm_source=viasocket`;
                                })()}
                                appSlugName={appOneDetails?.appslugname}
                                doFollowArray={getDoFollowUrlStatusArray}
                            >
                                <LinkText children={'Learn more'} />
                            </ExternalLink>
                        </div>
                        <div className="cont w-full gap-4 p-12 border-x md:border-l-0 custom-border">
                            <div className="cont gap-2">
                                <Image className="h-10 w-fit" src={appTwoDetails?.iconurl || 'https://placehold.co/36x36'} width={36} height={36} alt={`${appTwoDetails?.name} logo`} />
                                <h3 className="h3 font-bold pt-5">About {appTwoDetails?.name}</h3>
                            </div>
                            <p className="text-sm sm:text-lg text-black h-full">{appTwoDetails?.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {appTwoDetails?.category?.slice(0, 2).map((cat, index) => (
                                    <Link key={index} href={createURL(`/integrations/category/${cat.toLowerCase().replace(/\s+/g, '-')}`)} className="mb-2">
                                        <span className="btn btn-outline">{cat}</span>
                                    </Link>
                                ))}
                            </div>
                            <ExternalLink
                                href={(() => {
                                    const baseUrl = appTwoDetails?.domain?.startsWith('http') ? appTwoDetails?.domain : 'http://' + appTwoDetails?.domain;
                                    const separator = baseUrl.includes('?') ? '&' : '?';
                                    return `${baseUrl}${separator}utm_source=viasocket`;
                                })()}
                                appSlugName={appTwoDetails?.appslugname}
                                doFollowArray={getDoFollowUrlStatusArray}
                            >
                                <LinkText children={'Learn more'} />
                            </ExternalLink>
                        </div>
                    </div>
                </div>
            </div>

            <ConditionalFooter>
                <Footer footerData={footerData} />
            </ConditionalFooter>
        </div>
    );
}
