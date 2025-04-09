import getApps from '@/utils/getApps';
import {
    getCategoryData,
    getFaqData,
    getFooterData,
    getGetStartedData,
    getMetaData,
    getNavData,
    getUsecasesData,
} from '@/utils/getData';
import getPageInfo from '@/utils/getPageInfo';
import getMcpInfo from '@/utils/getMcpInfo';
import getAppDetails from '@/utils/getAppDetail';
import ErrorComp from '@/components/404/404Comp';
import Head from 'next/head';
import {
    FAQS_FIELDS,
    FOOTER_FIELDS,
    GETSTARTED_FIELDS,
    INTECATEGORY_FIELDS,
    INTECATEGORYlIST_FILED,
    METADATA_FIELDS,
    NAVIGATION_FIELDS,
    USECASES_FIELDS,
} from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
import McpAppComp from '@/components/mcpComps/mcpAppComp/McpAppComp';
import McpIndexComp from '@/components/mcpComps/mcpIndexComp/McpIndexComp';
import getCombos from '@/utils/getCombos';
export const runtime = 'experimental-edge';

export default function Mcp({
    pageInfo,
    mcpInfo,
    metadata,
    apps,
    faqData,
    footerData,
    navData,
    categoryData,
    appOneDetails,
    noData,
    categories,
    blogData,
    useCaseData,
    getStartedData,
    combosData,
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
    } else if (mcpInfo?.appone) {
        return (
            <div className="cont md:gap-20 sm:gap-16 gap-12">
                <McpAppComp
                    pageInfo={pageInfo}
                    integrationsInfo={mcpInfo} // Reusing with different prop name
                    metadata={metadata}
                    apps={apps}
                    blogsData={blogData}
                    appOneDetails={appOneDetails}
                    faqData={faqData}
                    footerData={footerData}
                    useCaseData={useCaseData}
                    getStartedData={getStartedData}
                    combosData={combosData}
                />
            </div>
        );
    } else {
        return (
            <div className="cont md:gap-36 sm:gap-24 gap-12">
                <McpIndexComp
                    pageInfo={pageInfo}
                    integrationsInfo={mcpInfo}
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
    const mcpInfo = getMcpInfo(pageInfo?.pathArray);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const navData = await getNavData(NAVIGATION_FIELDS);

    if (mcpInfo?.appone) {
        // For single MCP view
        const metadata = await getMetaData(METADATA_FIELDS, `filter=name='/mcp/AppOne'`);
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='[doubleApp]'`);
        const categoryData = await getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${mcpInfo?.category || 'all'}'`);
        const apps = await getApps({ page: mcpInfo?.page, categoryData });
        const combosData = await getCombos(mcpInfo);
        const appOneDetails = getAppDetails(combosData, mcpInfo?.appone);
        const getStarted = await getGetStartedData(GETSTARTED_FIELDS);

        if (appOneDetails) {
            const blogTags = appOneDetails.appslugname;
            const blogData = await getBlogData(blogTags);
            const useCaseData = await getUsecasesData(
                USECASES_FIELDS,
                `filter=slugname='${appOneDetails?.appslugname}'`
            );
            return {
                props: {
                    pageInfo: pageInfo || {},
                    navData: navData || {},
                    footerData: footerData || {},
                    apps: apps || [],
                    metadata: metadata || {},
                    faqData: faqData || [],
                    mcpInfo: mcpInfo || {},
                    appOneDetails: appOneDetails || {},
                    categoryData: {},
                    blogData: blogData || [],
                    useCaseData: useCaseData || [],
                    getStartedData: getStarted || [],
                    combosData: combosData || [],
                },
            };
        } else {
            return {
                props: {
                    noData: true,
                    navData: navData || {},
                    footerData: footerData || {},
                },
            };
        }
    } else {
        const metadata = await getMetaData(METADATA_FIELDS, `filter=name='/mcp/AppOne'`);
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='[doubleApp]'`);
        const categoryData = await getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${mcpInfo?.category || 'all'}'`);
        const apps = await getApps({ page: mcpInfo?.page, categoryData });
        const categories = await getCategoryData(INTECATEGORYlIST_FILED);
        const blogTags = 'mcp';
        const blogData = await getBlogData(blogTags);
        return {
            props: {
                pageInfo: pageInfo || {},
                navData: navData || {},
                footerData: footerData || {},
                apps: apps || [],
                metadata: metadata || {},
                faqData: faqData || [],
                mcpInfo: mcpInfo || {},
                appOneDetails: {},
                categoryData: (categoryData?.length > 0 && categoryData[0]) || {},
                categories: categories || [],
                blogData: blogData || [],
            },
        };
    }
}
