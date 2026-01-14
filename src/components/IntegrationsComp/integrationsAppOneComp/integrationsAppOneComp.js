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

    return (
        <div>
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
