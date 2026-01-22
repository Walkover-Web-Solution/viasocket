import IntegrationsHeadComp from '../integrationsHeadComp/integrationsHeadComp';
import NavbarServer from '@/app/components/navbar/NavbarServer';
import IntegrationsIndexClientComp from './IntegrationsIndexClientComp';

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
    categoryBlogs,
    categoryName,
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
                categoryBlogs={categoryBlogs}
                categoryName={categoryName}
                faqData={faqData}
                appCount={appCount}
            />
        </>
    );
}
