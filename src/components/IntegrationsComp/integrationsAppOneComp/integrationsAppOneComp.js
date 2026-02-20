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
    const appSlug = appOneDetails?.slug || '';
    const totalApps = appCount || '2000';

    const filteredCombos = combosData?.combinations?.filter(
        (combo) => combo?.description && !/^(List|Get)\b/i.test(combo.description.trim())
    );
    const selectedCombos = filteredCombos?.length > 0 ? filteredCombos : combosData?.combinations || [];
    const useCaseFeatures = selectedCombos
        .map((combo) => combo?.description?.trim())
        .filter(Boolean)
        .slice(0, 2);

    const featureList = [];
    useCaseFeatures.forEach((useCase) => featureList.push(useCase));
    featureList.push(`Connect ${appName} with ${totalApps}+ business applications`);

    if (triggersCount > 0 && actionsCount > 0) {
        featureList.push(`Includes ${triggersCount} triggers and ${actionsCount} actions`);
    } else if (triggersCount > 0) {
        featureList.push(`Includes ${triggersCount} triggers`);
    } else if (actionsCount > 0) {
        featureList.push(`Includes ${actionsCount} actions`);
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": `viaSocket for ${appName}`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": `https://viasocket.com/integrations/${appSlug}`,
        "image": `https://viasocket.com/images/apps/${appSlug}.png`,
        "description": `Automate ${appName} workflows using AI-powered automation. Connect ${appName} with ${totalApps}+ apps using ${triggersCount} triggers and ${actionsCount} actions.`,
        "featureList": featureList,
        "isRelatedTo": {
            "@type": "SoftwareApplication",
            "name": appName
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://viasocket.com/pricing"
        },
        "provider": {
            "@type": "Organization",
            "name": "viaSocket",
            "url": "https://viasocket.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://viasocket.com/assets/brand/logo.svg"
            }
        }
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
