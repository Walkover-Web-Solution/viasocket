import IntegrationsIndexPage from '@/components/IntegrationsComp/addToProduct/IntegrationsIndexPage';
import ErrorComp from '@/components/404/404Comp';
import IntegrationsAppOneComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsAppOneComp';
import IntegrationsAppTwoComp from '@/components/IntegrationsComp/integrationsAppTwoComp/integrationsAppTwoComp';
import IntegrationsDisconnectedComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsDisconnectedComp/integrationsDisconnectedComp';
import AddToProductPage from '@/components/IntegrationsComp/addToProduct/AddToProductPage';
import React from 'react'

const IntegrationsMain = (props) => {
    const { data, hasToken } = props;
    
    if (data.integrationsInfo?.appone && data.integrationsInfo?.apptwo) {
        // App-to-app integration page
        return (
            <div className="cont md:gap-20 sm:gap-16 gap-12">
                <IntegrationsAppTwoComp
                    pageInfo={data.pageInfo}
                    integrationsInfo={data.integrationsInfo}
                    metaData={data.metadata}
                    apps={data.apps}
                    blogsData={data.blogData}
                    appOneDetails={data.appOneDetails}
                    appTwoDetails={data.appTwoDetails}
                    similarAppsOne={data.similarAppsOne}
                    similarAppsTwo={data.similarAppsTwo}
                    combosData={data.combosData}
                    footerData={data.footerData}
                    videoData={data.videoData}
                    getDoFollowUrlStatusArray={data.getDoFollowUrlStatusArray}
                    navbarData={data.navbarData}
                    templateToShow={data.templateToShow}
                    appCount={data.appCount}
                    automationIdeasData={data.automationIdeasData}
                    skipHeadComp={true}
                    hasToken={hasToken}
                />
            </div>
        );
    } else if (data.integrationsInfo?.appone) {
        const isDisconnected = data.pageInfo?.qurey?.status === 'disconnected';
        if (isDisconnected) {
            return (
                <IntegrationsDisconnectedComp
                    pageInfo={data.pageInfo}
                    integrationsInfo={data.integrationsInfo}
                    metadata={data.metadata}
                    blogsData={data.blogData}
                    appOneDetails={data.appOneDetails}
                    faqData={data.faqData}
                    footerData={data.footerData}
                    getDoFollowUrlStatusArray={data.getDoFollowUrlStatusArray}
                    navbarData={data.navbarData}
                />
            );
        } else if (data.actionLayerBlogs) {
            // "Add {app} to Your Product" (see lib/integration-data.js, single-app branch)
            return <AddToProductPage appOneDetails={data.appOneDetails} blogs={data.actionLayerBlogs} doFollowApps={data.getDoFollowUrlStatusArray} />;
        } else {
            return (
                <div className="cont md:gap-20 sm:gap-16 gap-12">
                    <IntegrationsAppOneComp
                        pageInfo={data.pageInfo}
                        integrationsInfo={data.integrationsInfo}
                        metadata={data.metadata}
                        apps={data.apps}
                        blogsData={data.blogData}
                        appOneDetails={data.appOneDetails}
                        combosData={data.combosData}
                        faqData={data.faqData}
                        appData={data.appData}
                        footerData={data.footerData}
                        useCaseData={data.useCaseData}
                        videoData={data.videoData}
                        appCount={data.appCount}
                        getDoFollowUrlStatusArray={data.getDoFollowUrlStatusArray}
                        navbarData={data.navbarData}
                        templateToShow={data.templateToShow}
                        automationIdeasData={data.automationIdeasData}
                        skipHeadComp={true}
                    />
                </div>
            );
        }
    } else {
        // Integrations index page (/integrations, /integrations/category/{name})
        if (!data.categoryData || Object.keys(data.categoryData).length === 0) {
            return <ErrorComp />;
        }
        return <IntegrationsIndexPage data={data} />;
    }
}

export default IntegrationsMain
