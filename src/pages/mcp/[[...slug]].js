import getApps from '@/utils/getApps';
import {
    getCategoryData,
    getFaqData,
    getFooterData,
    getGetStartedData,
    getMetaData,
    getNavData,
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
} from '@/const/fields';
import { getBlogData } from '@/utils/getBlogData';
import McpAppComp from '@/components/mcpComps/mcpAppComp/McpAppComp';
import McpIndexComp from '@/components/mcpComps/mcpIndexComp/McpIndexComp';
import getCombos from '@/utils/getCombos';
export const runtime = 'experimental-edge';
import { FaNetworkWired, FaBalanceScale, FaShieldAlt, FaLayerGroup } from 'react-icons/fa';

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
    mcpSteps,
    tableData,
    featuresData,
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
            <div className="cont md:gap-20 sm:gap-16 gap-12">
                <McpIndexComp
                    pageInfo={pageInfo}
                    integrationsInfo={mcpInfo}
                    navData={navData}
                    footerData={footerData}
                    apps={apps}
                    blogsData={blogData}
                    categoryData={categoryData}
                    categories={categories}
                    mcpSteps={mcpSteps}
                    faqData={faqData}
                    tableData={tableData}
                    featuresData={featuresData}
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
        const metadata = await getMetaData(METADATA_FIELDS, `filter=name='/mcp/AppOne'`);
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='[mcpApp]'`);
        const categoryData = await getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${mcpInfo?.category || 'all'}'`);
        const apps = await getApps({ page: mcpInfo?.page, categoryData, limit: 9 });
        const combosData = await getCombos(mcpInfo);
        const appOneDetails = getAppDetails(combosData, mcpInfo?.appone);
        const getStarted = await getGetStartedData(GETSTARTED_FIELDS);

        if (appOneDetails) {
            const blogTags = appOneDetails.appslugname;
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
                    appOneDetails: appOneDetails || {},
                    categoryData: {},
                    blogData: blogData || [],
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
        const metadata = await getMetaData(METADATA_FIELDS, `filter=name='/mcp'`);
        const faqData = await getFaqData(FAQS_FIELDS, `filter=page='[mcpApp]'`);
        const categoryData = await getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${mcpInfo?.category || 'all'}'`);
        const apps = await getApps({ page: mcpInfo?.page, categoryData, limit: 9 });
        const categories = await getCategoryData(INTECATEGORYlIST_FILED);
        const blogTags = 'mcp';
        const blogData = await getBlogData(blogTags);
        const mcpSteps = [
            {
                title: 'Get Your MCP Endpoint',
                description:
                    'Instantly get a unique, secure URL that connects your AI assistant to viaSocket’s network of integrations.',
            },
            {
                title: 'Choose Your Actions',
                description:
                    'Easily select and define the actions your AI can perform, like sending emails or sending Slack messages, giving you full control.',
            },
            {
                title: 'Integrate Your AI Assistant',
                description:
                    'Connect your AI Assistant easily with the MCP endpoint for instant, secure task execution.',
            },
        ];

        const tableData = [
            { aspects: 'Integration Speed', api: 'Takes weeks', mcp: 'Done in minutes.' },
            {
                aspects: 'Learning Curve',
                api: 'Lots to read.',
                mcp: 'Just type what you need.',
            },
            {
                aspects: 'Authentication',
                api: 'Lots to read.',
                mcp: 'Simple and secure.',
            },
            { aspects: 'Scalability', api: 'Hard to manage.', mcp: 'Scales with ease.' },
        ];

        const featuresData = [
            {
                heading: 'Broad connectivity',
                content:
                    'Connect your AI to thousands of apps through a single protocol without building individual app integrations.',
                iconName: 'network',
            },
            {
                heading: 'Massive Scalability',
                content: 'Run tens of thousands of actions reliably and in real-time without delays or complications.',
                iconName: 'scale',
            },
            {
                heading: 'Built-in security',
                content:
                    'viaSocket MCP endpoints come with robust authentication and encryption, so your data stays safe and secure from misuse.',
                iconName: 'shield',
            },
            {
                heading: 'Interface flexibility',
                content:
                    'Access viaSocket MCP in the platform you prefer to build in, like Cursor, ChatGPT, or Claude Desktop.',
                iconName: 'layers',
            },
            {
                heading: 'AI-to-App Integrations',
                content:
                    'Take your AI beyond simple text generation. viaSocket MCP easily connects your AI assistant with over 1,000 apps, enabling real-world actions.',
                iconName: 'plug',
            },
            {
                heading: 'Customizable AI Actions',
                content:
                    'Customize your AI actions to set limits on what it can do, ensuring it stays within your preferred scope and meets your needs.',
                iconName: 'tools',
            },
        ];

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
                mcpSteps: mcpSteps || [],
                tableData: tableData || [],
                featuresData: featuresData || [],
            },
        };
    }
}
