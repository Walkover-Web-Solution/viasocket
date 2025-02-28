import getApps from '@/utils/getApps';
import {
    getCategoryData,
    getDisconnectedData,
    getFaqData,
    getFooterData,
    getMetaData,
    getNavData,
} from '@/utils/getData';
import getPageInfo from '@/utils/getPageInfo';
import getIntegrationsInfo from '@/utils/getInterationsInfo';
import IntegrationsIndexComp from '@/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexComp';
import IntegrationsAppOneComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsAppOneComp';
import getAppDetails from '@/utils/getAppDetail';
import getCombos from '@/utils/getCombos';
import IntegrationsAppTwoComp from '@/components/IntegrationsComp/integrationsAppTwoComp/integrationsAppTwoComp';
import IntegrationsDisconnectedComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsDisconnectedComp/integrationsDisconnectedComp';
import ErrorComp from '@/components/404/404Comp';
import Head from 'next/head';
import {
    DISCONNECTEDBY_FIELDS,
    FAQS_FIELDS,
    FOOTER_FIELDS,
    INTECATEGORY_FIELDS,
    INTECATEGORYlIST_FILED,
    METADATA_FIELDS,
    NAVIGATION_FIELDS,
} from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
export const runtime = 'experimental-edge';

export default function Integrations({
    pageInfo,
    integrationsInfo,
    metadata,
    apps,
    combosData,
    faqData,
    footerData,
    navData,
    categoryData,
    appOneDetails,
    appTwoDetails,
    noData,
    categories,
    disconnecteData,
    blogData,
}) {
    if (noData) {
        return (
            <>
                <Head>
                    <title>{'404 - Page not found'}</title>
                </Head>
                <ErrorComp navData={navData} footerData={footerData} />
            </>
        );
    } else if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
        return (
            <div className="cont md:gap-20 sm:gap-16 gap-12">
                <Head>
                    <link rel="canonical" href={`https://viasocket.com${pageInfo?.url || '/'}`} />
                </Head>

                <IntegrationsAppTwoComp
                    pageInfo={pageInfo}
                    integrationsInfo={integrationsInfo}
                    metadata={metadata}
                    apps={apps}
                    blogsData={blogData}
                    appOneDetails={appOneDetails}
                    appTwoDetails={appTwoDetails}
                    combosData={combosData}
                    faqData={faqData}
                    footerData={footerData}
                />
            </div>
        );
    } else if (integrationsInfo?.appone) {
        const isDisconnected = pageInfo?.qurey?.status === 'disconnected';
        if (isDisconnected) {
            return (
                <IntegrationsDisconnectedComp
                    pageInfo={pageInfo}
                    integrationsInfo={integrationsInfo}
                    metadata={metadata}
                    blogsData={blogData}
                    appOneDetails={appOneDetails}
                    faqData={faqData}
                    footerData={footerData}
                    disconnecteData={disconnecteData}
                />
            );
        } else {
            return (
                <div className="cont md:gap-20 sm:gap-16 gap-12">
                    <IntegrationsAppOneComp
                        pageInfo={pageInfo}
                        integrationsInfo={integrationsInfo}
                        metadata={metadata}
                        apps={apps}
                        blogsData={blogData}
                        appOneDetails={appOneDetails}
                        combosData={combosData}
                        faqData={faqData}
                        footerData={footerData}
                    />
                </div>
            );
        }
    } else {
        return (
            <div className="cont md:gap-36 sm:gap-24 gap-12">
                <IntegrationsIndexComp
                    pageInfo={pageInfo}
                    integrationsInfo={integrationsInfo}
                    navData={navData}
                    footerData={footerData}
                    apps={apps}
                    blogsData={blogData}
                    categoryData={categoryData}
                    categories={categories}
                />
            </div>
        );
    }
}
export async function getServerSideProps(context) {
    const pageInfo = getPageInfo(context);
    const integrationsInfo = getIntegrationsInfo(pageInfo?.pathArray);
    const footerData = await getFooterData(FOOTER_FIELDS);

    if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
        const metadata = await getMetaData(METADATA_FIELDS, `filter=name='/integrations/AppOne/AppTwo'`);
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='[singleApp]'`);
        const combosData = await getCombos(integrationsInfo);
        const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
        const appTwoDetails = getAppDetails(combosData, integrationsInfo?.apptwo);
        const blogTags = `${appOneDetails?.appslugname}-${appTwoDetails?.appslugname}`;
        const blogData = await getBlogData(blogTags);
        if (appOneDetails && appTwoDetails) {
            return {
                props: {
                    pageInfo: pageInfo || {},
                    navData: [],
                    footerData: footerData || [],
                    apps: [],
                    metadata: metadata || {},
                    faqData: faqData || [],
                    integrationsInfo: integrationsInfo || {},
                    combosData: combosData || {},
                    appOneDetails: appOneDetails || {},
                    appTwoDetails: appTwoDetails || {},
                    categoryData: {},
                    blogData: blogData || [],
                },
            };
        } else {
            const navData = await getNavData();
            return {
                props: {
                    noData: true,
                    navData: navData || {},
                    footerData: footerData || {},
                },
            };
        }
    } else if (integrationsInfo?.appone) {
        // const navData = await getNavData();
        const metadata = await getMetaData(METADATA_FIELDS, `filter=name='/integrations/AppOne'`);
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='[doubleApp]'`);
        const categoryData = await getCategoryData(
            INTECATEGORY_FIELDS,
            `filter=slug='${integrationsInfo?.category || 'all'}'`
        );
        const apps = await getApps({ page: integrationsInfo?.page, categoryData });
        const combosData = await getCombos(integrationsInfo);
        const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
        const disconnecteData = await getDisconnectedData(
            DISCONNECTEDBY_FIELDS,
            `filter=slugname='${integrationsInfo?.appone}' `
        );
        if (appOneDetails) {
            const blogTags = appOneDetails.appslugname;
            const blogData = await getBlogData(blogTags);
            return {
                props: {
                    pageInfo: pageInfo || {},
                    navData: {},
                    footerData: footerData || {},
                    apps: apps || [],
                    metadata: metadata || {},
                    faqData: faqData || [],
                    integrationsInfo: integrationsInfo || {},
                    combosData: combosData || {},
                    appOneDetails: appOneDetails || {},
                    appTwoDetails: {},
                    categoryData: {},
                    disconnecteData: disconnecteData || [],
                    blogData: blogData || [],
                },
            };
        } else {
            const navData = await getNavData(NAVIGATION_FIELDS);
            return {
                props: {
                    noData: true,
                    navData: navData || {},
                    footerData: footerData || {},
                },
            };
        }
    } else {
        const navData = await getNavData(NAVIGATION_FIELDS);
        const metadata = await getMetaData(METADATA_FIELDS, `filter=name='/integrations'`);
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/integrations'`);
        const categoryData = await getCategoryData(
            INTECATEGORY_FIELDS,
            `filter=slug='${integrationsInfo?.category || 'all'}'`
        );
        const apps = await getApps({ page: integrationsInfo?.page, categoryData });
        const categories = await getCategoryData(INTECATEGORYlIST_FILED);
        const blogTags = 'integration';
        const blogData = await getBlogData(blogTags);
        return {
            props: {
                pageInfo: pageInfo || {},
                navData: navData || {},
                footerData: footerData || {},
                apps: apps || [],
                metadata: metadata || {},
                faqData: faqData || [],
                integrationsInfo: integrationsInfo || {},
                combosData: {},
                appOneDetails: {},
                appTwoDetails: {},
                categoryData: (categoryData?.length > 0 && categoryData[0]) || {},
                categories: categories || [],
                blogData: blogData || [],
            },
        };
    }
}
