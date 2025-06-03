import {
    getCategoryData,
    getDisconnectedData,
    getFaqData,
    getFooterData,
    getGetStartedData,
    getMetaData,
    getUsecasesData,
} from '@/utils/getData';
import getPageInfo from '@/utils/getPageInfo';
import getIntegrationsInfo from '@/utils/getInterationsInfo';
import IntegrationsIndexComp from '@/components/IntegrationsComp/IntegrationsIndexComp/IntegrationsIndexComp';
import IntegrationsAppOneComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsAppOneComp';
import getAppDetails from '@/utils/getAppDetail';
import IntegrationsAppTwoComp from '@/components/IntegrationsComp/integrationsAppTwoComp/integrationsAppTwoComp';
import IntegrationsDisconnectedComp from '@/components/IntegrationsComp/integrationsAppOneComp/integrationsDisconnectedComp/integrationsDisconnectedComp';
import ErrorComp from '@/components/404/404Comp';
import Head from 'next/head';
import {
    DISCONNECTEDBY_FIELDS,
    FAQS_FIELDS,
    FOOTER_FIELDS,
    GETSTARTED_FIELDS,
    INTECATEGORY_FIELDS,
    INTECATEGORYlIST_FILED,
    METADATA_FIELDS,
    USECASES_FIELDS,
} from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
import { getVideoData } from '@/utils/getVideoData';
import { getCombos, getApps } from '@/utils/axiosCalls';
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
    disconnecteData,
    blogData,
    useCaseData,
    getStartedData,
    videoData,
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
                    metadata={metadata}
                    apps={apps}
                    blogsData={blogData}
                    appOneDetails={appOneDetails}
                    appTwoDetails={appTwoDetails}
                    combosData={combosData}
                    faqData={faqData}
                    footerData={footerData}
                    getStartedData={getStartedData}
                    videoData={videoData}
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
                        useCaseData={useCaseData}
                        getStartedData={getStartedData}
                        videoData={videoData}
                    />
                </div>
            );
        }
    } else {
        return (
            <div className="cont md:gap-20 sm:gap-16 gap-12">
                <IntegrationsIndexComp
                    pageInfo={pageInfo}
                    integrationsInfo={integrationsInfo}
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
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    const pageInfo = getPageInfo(context);
    const integrationsInfo = getIntegrationsInfo(pageInfo?.pathArray);
    const footerData = await getFooterData(FOOTER_FIELDS, '', pageUrl);

    if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
        const metadata = await getMetaData(METADATA_FIELDS, `filter=name='/integrations/AppOne/AppTwo'`, pageUrl);
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='[singleApp]'`, pageUrl);
        const combosData = await getCombos(integrationsInfo, pageUrl);
        const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
        const appTwoDetails = getAppDetails(combosData, integrationsInfo?.apptwo);
        const blogTags1 = appOneDetails?.appslugname;
        const blogTags2 = appTwoDetails?.appslugname;
        const blogData = await getBlogData({ tag1: blogTags1, tag2: blogTags2 }, pageUrl);
        const getStarted = await getGetStartedData(GETSTARTED_FIELDS, '', pageUrl);
        const videoData = await getVideoData({ tag1: blogTags1, tag2: blogTags2 }, pageUrl);
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
                    getStartedData: getStarted || [],
                    videoData: videoData || [],
                },
            };
        } else {
            return {
                props: {
                    noData: true,
                    footerData: footerData || {},
                },
            };
        }
    } else if (integrationsInfo?.appone) {
        const metadata = await getMetaData(METADATA_FIELDS, `filter=name='/integrations/AppOne'`, pageUrl);
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='[doubleApp]'`, pageUrl);
        const categoryData = await getCategoryData(
            INTECATEGORY_FIELDS,
            `filter=slug='${integrationsInfo?.category || 'all'}'`,
            pageUrl
        );
        const apps = await getApps({ page: integrationsInfo?.page, categoryData }, pageUrl);
        const combosData = await getCombos(integrationsInfo, pageUrl);
        const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
        const getStarted = await getGetStartedData(GETSTARTED_FIELDS, '', pageUrl);
        const disconnecteData = await getDisconnectedData(
            DISCONNECTEDBY_FIELDS,
            `filter=slugname='${integrationsInfo?.appone}' `,
            pageUrl
        );

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
                    disconnecteData: disconnecteData || [],
                    blogData: blogData || [],
                    useCaseData: useCaseData || [],
                    getStartedData: getStarted || [],
                    videoData: videoData || [],
                },
            };
        } else {
            return {
                props: {
                    noData: true,
                    footerData: footerData || {},
                },
            };
        }
    } else {
        const metadata = await getMetaData(METADATA_FIELDS, `filter=name='/integrations'`, pageUrl);
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/integrations'`, pageUrl);
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
            },
        };
    }
}
