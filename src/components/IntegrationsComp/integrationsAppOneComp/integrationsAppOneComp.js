import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import IntegrationsAppOneClientComp from './integrationsAppOneClientComp';
import NavbarServer from '@/app/components/navbar/NavbarServer';

export default function IntegrationsAppOneComp({
    appOneDetails,
    combosData,
    pageInfo,
    integrationsInfo,
    apps,
    faqData,
    footerData,
    blogsData,
    metaData,
    useCaseData,
    videoData,
    appCount,
    getDoFollowUrlStatusArray,
    navbarData,
    templateToShow,
    skipHeadComp,
}) {
    const getTriggersAndActionsCount = (events) => {
        let triggersCount = 0;
        let actionsCount = 0;
        events?.forEach((event) => {
            if (event.type === 'action') {
                actionsCount++;
            } else if (event.type === 'trigger') {
                triggersCount++;
            }
        });
        return { triggersCount, actionsCount };
    };

    const { triggersCount, actionsCount } = getTriggersAndActionsCount(appOneDetails?.events);
    const appName = appOneDetails?.name || 'App';
    const totalApps = appCount || '2000';

    const schemaDescription = `Automate ${appName} with viaSocket. Connect ${triggersCount} triggers and ${actionsCount} actions to ${totalApps}+ apps.`;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "viaSocket Integration & Automation",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "provider": {
            "@type": "Organization",
            "name": "viaSocket",
            "url": "https://viasocket.com"
        },
        "featureList": [
            "2000+ integrations available",
            "Built-in AI agents",
            "MCP (Model Context Protocol) support",
            "Dedicated Automation support",
            "Request your required integration",
            "No-code drag-and-drop interface",
            "AI workflow builder",
            "Realtime execution logs",
            "Complex logic & branching",
            "Human intervention steps (Approval workflows)",
            "Persistent memory & variable storage",
            "Email-to-flow functionality",
            "Custom JavaScript functions",
            "Enterprise-grade security",
            "Mobile app available"
        ],
        "description": schemaDescription
    };

    const faqSchemaData = faqData?.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.slice(0, 5).map((faq) => ({
            "@type": "Question",
            "name": faq.que,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.ans
            }
        }))
    } : null;

    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {faqSchemaData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
                />
            )}

            <NavbarServer navbarData={navbarData} utm={'/integrations/appone'} />

            {!skipHeadComp && (
                <IntegrationsHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    plugins={[appOneDetails]}
                    type={'appOne'}
                    pageInfo={pageInfo}
                    integrationsInfo={integrationsInfo}
                />
            )}

            <IntegrationsAppOneClientComp
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
                metadata={metaData}
                apps={apps}
                blogsData={blogsData}
                appOneDetails={appOneDetails}
                combosData={combosData}
                faqData={faqData}
                footerData={footerData}
                useCaseData={useCaseData}
                videoData={videoData}
                appCount={appCount}
                getDoFollowUrlStatusArray={getDoFollowUrlStatusArray}
                templateToShow={templateToShow}
            />
        </div>
    );
}
