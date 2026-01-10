import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import IntegrationsIndexClientComp from './integrationsIndexClientComp';

export default function IntegrationsIndexComp({
    pageInfo,
    integrationsInfo,
    footerData,
    apps,
    blogsData,
    categoryData,
    categories,
    faqData,
    appCount,
    navbarData,
    skipHeadComp,
}) {
    return (
        <>
            {!skipHeadComp && (
                <IntegrationsHeadComp metaData={categoryData} integrationsInfo={integrationsInfo} pageInfo={pageInfo} />
            )}
            <NavbarServer navbarData={navbarData} utm={'/index'} />
            <IntegrationsIndexClientComp
                pageInfo={pageInfo}
                integrationsInfo={integrationsInfo}
                footerData={footerData}
                apps={apps}
                blogsData={blogsData}
                categoryData={categoryData}
                categories={categories}
                faqData={faqData}
                appCount={appCount}
            />
        </>
    );
}
