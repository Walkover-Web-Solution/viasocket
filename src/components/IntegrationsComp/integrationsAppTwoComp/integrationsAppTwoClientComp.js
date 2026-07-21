'use client';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import FAQSection from '@/components/faqSection/faqSection';
import Footer from '@/components/footer/footer';
import ConditionalFooter from '@/components/ConditionalLayout/ConditionalFooter';
import IntegrationsBetaComp from '../IntegrationsBetaComp/IntegrationsBetaComp';
import BlogGrid from '@/app/components/blog/BlogGrid';
import VideoGrid from '@/components/videoGrid/videoGrid';
import generateIntegrationFAQ from './generateIntegrationFAQ';
import TemplateContainer from '../templateContainer/templateContainer';
import Breadcrumb from '@/components/breadcrumb/breadcrumb';
import GetStarted from '@/components/getStarted/getStarted';
import ShowAppsIndexOptimized from '@/app/components/home/ShowAppsIndexOptimized';
import ShowBadges from '@/app/components/home/ShowBadges';
import TriggersAndActions from './TriggersAndActions';
import AIFeatureSection from './AIFeatureSection';
import HeroSection from './HeroSection';
import PopularFlows from './PopularFlows';
import HowItWorks from './HowItWorks';
import FinalCTA from './FinalCTA';
import AboutApps from './AboutApps';

export default function IntegrationsAppTwoClientComp({
    combosData,
    footerData,
    appOneDetails,
    appTwoDetails,
    similarAppsOne,
    similarAppsTwo,
    blogsData,
    videoData,
    getDoFollowUrlStatusArray,
    templateToShow,
    appCount,
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

    const hasAnyEvents = appOneDetails?.events?.length > 0 || appTwoDetails?.events?.length > 0;

    const popularUseCases =
        combosData?.combinations
            ?.filter((c) => c?.description)
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
        <div className="cont -mt-10 global-top-space pt-6 gap-12 md:gap-20">
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
            <HeroSection
                appOneDetails={appOneDetails}
                appTwoDetails={appTwoDetails}
                selectedTrigger={selectedTrigger}
                selectedAction={selectedAction}
                popularUseCases={popularUseCases}
                getComboLink={getComboLink}
                hasToken={hasToken}
                utm={utm}
                appCount={appCount}
            />

            {/* 4. Popular flows */}
            {hasCombinations ? (
                <PopularFlows
                    combosData={combosData}
                    appOneDetails={appOneDetails}
                    appTwoDetails={appTwoDetails}
                    currentAppOne={currentAppOne}
                    currentAppTwo={currentAppTwo}
                    appOneEvents={appOneEvents}
                    appTwoEvents={appTwoEvents}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    selectedTrigger={selectedTrigger}
                    setSelectedTrigger={setSelectedTrigger}
                    selectedAction={selectedAction}
                    setSelectedAction={setSelectedAction}
                    resetTrigger={resetTrigger}
                    visibleCombos={visibleCombos}
                    setVisibleCombos={setVisibleCombos}
                    showMore={showMore}
                    setShowMore={setShowMore}
                    handleSwapApps={handleSwapApps}
                />
            ) : (
                <>
                    {!hasAnyEvents && <IntegrationsBetaComp appOneDetails={appOneDetails} />}
                    {!hasCombinations && hasAnyEvents && (
                        <div className="cont gap-4">
                            <h2 className="h2">
                                Available events for <span className="text-accent">{appOneDetails?.name}</span> and{' '}
                                <span className="text-accent">{appTwoDetails?.name}</span>
                            </h2>
                        </div>
                    )}
                </>
            )}

            {/* 5. Supported Triggers & Actions */}
            {(appOneDetails?.events?.length > 0 || appTwoDetails?.events?.length > 0) && (
                <div className="container">
                    <TriggersAndActions appOneDetails={appOneDetails} appTwoDetails={appTwoDetails} />
                </div>
            )}

            {/* 6b. Pre-built Workflows (Templates) */}
            {hasMatchingTemplates && (
                <div className="container flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">
                            Pre-built Workflows
                        </span>
                        <h2 className="h2">Start with a template</h2>
                        <p className="text-gray-500 text-base whitespace-nowrap">
                            Launch your automation in minutes using professionally built workflow templates. Customize
                            them anytime to fit your needs.
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
            <HowItWorks appOneDetails={appOneDetails} appTwoDetails={appTwoDetails} hasToken={hasToken} utm={utm} />

            {/* Trust & Security */}
            <div className="flex flex-col gap-0">
                <ShowBadges />
                <div className="container">
                    <ShowAppsIndexOptimized isTrustMarquee={true} />
                </div>
            </div>

            {/* AI Workflow Builder */}
            <AIFeatureSection appOneName={appOneDetails?.name} appTwoName={appTwoDetails?.name} />

            {/* 7. Watch & Learn */}
            {videoData?.length > 0 && (
                <VideoGrid videoData={videoData} appOneName={appOneDetails?.name} appTwoName={appTwoDetails?.name} />
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

            {/* 14. Final CTA */}
            <FinalCTA appOneDetails={appOneDetails} appTwoDetails={appTwoDetails} utm={utm} hasToken={hasToken} />

            {/* About App A and About App B */}
            <AboutApps
                appOneDetails={appOneDetails}
                appTwoDetails={appTwoDetails}
                similarAppsOne={similarAppsOne}
                similarAppsTwo={similarAppsTwo}
                getDoFollowUrlStatusArray={getDoFollowUrlStatusArray}
            />

            {/* 10. FAQs */}
            {faqData && <FAQSection faqData={faqData} />}

            <ConditionalFooter>
                <Footer footerData={footerData} />
            </ConditionalFooter>
        </div>
    );
}
