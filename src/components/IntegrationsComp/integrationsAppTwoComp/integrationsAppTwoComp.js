import IntegrationsAppTwoClientComp from './integrationsAppTwoClientComp';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import ConditionalNavbar from '@/components/ConditionalLayout/ConditionalNavbar';

export default function IntegrationsAppTwoComp({
    combosData,
    pageInfo,
    footerData,
    appOneDetails,
    appTwoDetails,
    similarAppsOne,
    similarAppsTwo,
    blogsData,
    metaData,
    videoData,
    getDoFollowUrlStatusArray,
    navbarData,
    templateToShow,
    appCount,
    hasToken,
}) {
    return (
        <div className="cont gap-12 md:gap-16 lg:gap-20">
            <ConditionalNavbar>
                <NavbarServer navbarData={navbarData} utm={'/integrations/apptwo'} />
            </ConditionalNavbar>

            <IntegrationsAppTwoClientComp
                blogsData={blogsData}
                appOneDetails={appOneDetails}
                appTwoDetails={appTwoDetails}
                similarAppsOne={similarAppsOne}
                similarAppsTwo={similarAppsTwo}
                combosData={combosData}
                footerData={footerData}
                videoData={videoData}
                getDoFollowUrlStatusArray={getDoFollowUrlStatusArray}
                templateToShow={templateToShow}
                appCount={appCount}
                hasToken={hasToken}
            />
        </div>
    );
}
