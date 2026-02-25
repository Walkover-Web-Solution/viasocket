import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import IntegrationsAppTwoClientComp from './integrationsAppTwoClientComp';
import NavbarServer from '@/app/components/navbar/NavbarServer';

export default function IntegrationsAppTwoComp({
    combosData,
    pageInfo,
    footerData,
    appOneDetails,
    appTwoDetails,
    blogsData,
    metaData,
    videoData,
    getDoFollowUrlStatusArray,
    navbarData,
    templateToShow,
    skipHeadComp,
    hasToken,
}) {
    return (
        <div className="cont gap-12 md:gap-16 lg:gap-20">
            <NavbarServer navbarData={navbarData} utm={'/integrations/apptwo'} />

            {!skipHeadComp && (
                <IntegrationsHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    plugins={[appOneDetails, appTwoDetails]}
                    type={'appTwo'}
                    pageInfo={pageInfo}
                />
            )}

            <IntegrationsAppTwoClientComp
                blogsData={blogsData}
                appOneDetails={appOneDetails}
                appTwoDetails={appTwoDetails}
                combosData={combosData}
                footerData={footerData}
                videoData={videoData}
                getDoFollowUrlStatusArray={getDoFollowUrlStatusArray}
                templateToShow={templateToShow}
                hasToken={hasToken}
            />
        </div>
    );
}
