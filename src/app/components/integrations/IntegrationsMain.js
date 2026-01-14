import IntegrationsIndexComp from '@/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexComp';
import IntegrationsAppOneComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsAppOneComp';
import IntegrationsAppTwoComp from '@/components/IntegrationsComp/integrationsAppTwoComp/integrationsAppTwoComp';
import IntegrationsDisconnectedComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsDisconnectedComp/integrationsDisconnectedComp';
import React from 'react'

const IntegrationsMain = (props) => {
    const { data } = props;
    
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
                    combosData={data.combosData}
                    footerData={data.footerData}
                    videoData={data.videoData}
                    getDoFollowUrlStatusArray={data.getDoFollowUrlStatusArray}
                    navbarData={data.navbarData}
                    templateToShow={data.templateToShow}
                    skipHeadComp={true}
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
                        footerData={data.footerData}
                        useCaseData={data.useCaseData}
                        videoData={data.videoData}
                        appCount={data.appCount}
                        getDoFollowUrlStatusArray={data.getDoFollowUrlStatusArray}
                        navbarData={data.navbarData}
                        templateToShow={data.templateToShow}
                        skipHeadComp={true}
                    />
                </div>
            );
        }
    } else {
        // Integrations index page
        return (
            <div className="cont md:gap-18 sm:gap-16 gap-12">
                <IntegrationsIndexComp
                    pageInfo={data.pageInfo}
                    integrationsInfo={data.integrationsInfo}
                    footerData={data.footerData}
                    apps={data.apps}
                    blogsData={data.blogData}
                    categoryData={data.categoryData}
                    categories={data.categories}
                    faqData={data.faqData}
                    appCount={data.appCount}
                    navbarData={data.navbarData}
                    skipHeadComp={true}
                />
            </div>
        );
    }
}

export default IntegrationsMain
