import { getCategoryData, getDoFollowStatus, getFooterData, getUsecasesData, getNavbarData } from '@/utils/getData';
import getPageInfo from '@/utils/getPageInfo';
import getIntegrationsInfo from '@/utils/getInterationsInfo';
import IntegrationsIndexComp from '@/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexComp';
import IntegrationsAppOneComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsAppOneComp';
import getAppDetails from '@/utils/getAppDetail';
import IntegrationsAppTwoComp from '@/components/IntegrationsComp/integrationsAppTwoComp/integrationsAppTwoComp';
import IntegrationsDisconnectedComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsDisconnectedComp/integrationsDisconnectedComp';
import ErrorComp from '@/components/404/404Comp';
import Head from 'next/head';
import { DOFOLLOWLINK_FIELDS, FOOTER_FIELDS, INTECATEGORY_FIELDS, INTECATEGORYlIST_FILED, USECASES_FIELDS, NAVBAR_FIELDS } from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
import { getVideoData } from '@/utils/getVideoData';
import { getCombos, getApps, getAppCount, getTemplates } from '@/utils/axiosCalls';
import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';

export const runtime = 'experimental-edge';

export default function Integrations({
    pageInfo,
    integrationsInfo,
    metadata,
    apps,
    combosData,
    faqData,
    footerData,
    categoryData,
    appOneDetails,
    appTwoDetails,
    noData,
    categories,
    blogData,
    useCaseData,
    videoData,
    appCount,
    getDoFollowUrlStatusArray,
    navbarData,
    templateToShow
}) {
    if (noData) {
        return (
            <>
                <Head>
                    <title>{'404 - Page not found'}</title>
                </Head>
                <ErrorComp footerData={footerData} />
            </>
        );
    } else if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
        return (
            <div className="cont md:gap-20 sm:gap-16 gap-12">
                <Head>{/* <link rel="canonical" href={`https://viasocket.com${pageInfo?.url || '/'}`} /> */}</Head>

                <IntegrationsAppTwoComp
                    pageInfo={pageInfo}
                    integrationsInfo={integrationsInfo}
                    metaData={metadata}
                    apps={apps}
                    blogsData={blogData}
                    appOneDetails={appOneDetails}
                    appTwoDetails={appTwoDetails}
                    combosData={combosData}
                    // faqData={faqData}
                    footerData={footerData}
                    videoData={videoData}
                    getDoFollowUrlStatusArray={getDoFollowUrlStatusArray}
                    navbarData={navbarData}
                    templateToShow={templateToShow}
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
                    getDoFollowUrlStatusArray={getDoFollowUrlStatusArray}
                    navbarData={navbarData}
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
                        useCaseData={useCaseData}
                        videoData={videoData}
                        appCount={appCount}
                        getDoFollowUrlStatusArray={getDoFollowUrlStatusArray}
                        navbarData={navbarData}
                        templateToShow={templateToShow}
                    />
                </div>
            );
        }
    } else {
        return (
            <div className="cont md:gap-18 sm:gap-16 gap-12">
                <IntegrationsIndexComp
                    pageInfo={pageInfo}
                    integrationsInfo={integrationsInfo}
                    footerData={footerData}
                    apps={apps}
                    blogsData={blogData}
                    categoryData={categoryData}
                    categories={categories}
                    faqData={faqData}
                    appCount={appCount}
                    navbarData={navbarData}
                />
            </div>
        );
    }
}

export async function getServerSideProps(context) {
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const pageInfo = getPageInfo(context);
    const integrationsInfo = getIntegrationsInfo(pageInfo?.pathArray);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);
    const appCount = await getAppCount(pageUrl);
    const getDoFollowUrlStatusArray = await getDoFollowStatus(DOFOLLOWLINK_FIELDS, '', pageUrl);
    const navbarData = await getNavbarData(NAVBAR_FIELDS, '', pageUrl);

    if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
        const metadata = await getMetaData('/integrations/AppOne/AppTwo', pageUrl);
        const faqData = await getFaqData('[singleApp]', pageUrl);
        const combosData = await getCombos(integrationsInfo, pageUrl);
        const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
        const appTwoDetails = getAppDetails(combosData, integrationsInfo?.apptwo);
        const blogTags1 = appOneDetails?.appslugname;
        const blogTags2 = appTwoDetails?.appslugname;
        const blogData = await getBlogData({ tag1: blogTags1, tag2: blogTags2 }, pageUrl);
        const videoData = await getVideoData({ tag1: blogTags1, tag2: blogTags2 }, pageUrl);
        const templateData = await getTemplates(pageUrl);
        const validTemplates = templateData.filter(
            t => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
        );
        const templateToShow = validTemplates;
        if (appOneDetails && appTwoDetails) {
            return {
                props: {
                    pageInfo: pageInfo || {},
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
                    videoData: videoData || [],
                    appCount: appCount || 0,
                    getDoFollowUrlStatusArray: getDoFollowUrlStatusArray || [],
                    navbarData: navbarData || {},
                    templateToShow: templateToShow || [],
                },
            };
        } else {
            return {
                props: {
                    noData: true,
                    footerData: footerData || {},
                    navbarData: navbarData || {},
                },
            };
        }
    } else if (integrationsInfo?.appone) {
        const metadata = await getMetaData('/integrations/AppOne', pageUrl);
        const faqData = await getFaqData('[doubleApp]', pageUrl);
        const categoryData = await getCategoryData(
            INTECATEGORY_FIELDS,
            `filter=slug='${integrationsInfo?.category || 'all'}'`,
            pageUrl
        );
        const apps = await getApps({ page: integrationsInfo?.page, categoryData }, pageUrl);
        const combosData = await getCombos(integrationsInfo, pageUrl);
        const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
        const templateData = await getTemplates(pageUrl);
        const validTemplates = templateData.filter(
            t => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
        );
        const templateToShow = validTemplates;

        if (appOneDetails) {
            const blogTags = appOneDetails.appslugname;
            const blogData = await getBlogData({ tag1: blogTags }, pageUrl);
            const useCaseData = await getUsecasesData(
                USECASES_FIELDS,
                `filter=slugname='${appOneDetails?.appslugname}'`,
                pageUrl
            );

            const videoData = await getVideoData({ tag1: blogTags }, pageUrl);
            return {
                props: {
                    pageInfo: pageInfo || {},
                    footerData: footerData || {},
                    apps: apps || [],
                    metadata: metadata || {},
                    faqData: faqData || [],
                    integrationsInfo: integrationsInfo || {},
                    combosData: combosData || {},
                    appOneDetails: appOneDetails || {},
                    appTwoDetails: {},
                    categoryData: {},
                    blogData: blogData || [],
                    useCaseData: useCaseData || [],
                    videoData: videoData || [],
                    appCount: appCount || 0,
                    getDoFollowUrlStatusArray: getDoFollowUrlStatusArray || [],
                    navbarData: navbarData || {},
                    templateToShow: templateToShow || [],
                },
            };
        } else {
            return {
                props: {
                    noData: true,
                    footerData: footerData || {},
                    navbarData: navbarData || {},
                },
            };
        }
    } else {
        const metadata = await getMetaData('/integrations', pageUrl);
        const faqData = await getFaqData('/integrations', pageUrl);
        const categoryData = await getCategoryData(
            INTECATEGORY_FIELDS,
            `filter=slug='${integrationsInfo?.category || 'all'}'`,
            pageUrl
        );
        const apps = await getApps({ page: integrationsInfo?.page, categoryData }, pageUrl);
        const categories = await getCategoryData(INTECATEGORYlIST_FILED, '', pageUrl);
        const blogTags = 'integration';
        const blogData = await getBlogData({ tag1: blogTags }, pageUrl);
        return {
            props: {
                pageInfo: pageInfo || {},
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
                appCount: appCount || 0,
                getDoFollowUrlStatusArray: getDoFollowUrlStatusArray || [],
                navbarData: navbarData || {},
            },
        };
    }
}
