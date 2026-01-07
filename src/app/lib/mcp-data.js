import {
    getFooterData,
    getCategoryData,
    getNavbarData,
    getMCPPromptData,
} from '@/utils/getData';

import {
    FOOTER_FIELDS,
    NAVBAR_FIELDS,
    INTECATEGORY_FIELDS,
    INTECATEGORYlIST_FILED,
    MCP_FIELDS
} from '@/const/fields';

import { getMetaData } from '@/utils/getMetaData';
import { getFaqData } from '@/utils/getFaqData';
import { getBlogData } from '@/utils/getBlogData';
import { getAppCount, getApps, getCombos } from '@/utils/axiosCalls';
import getMcpInfo from '@/utils/getMcpInfo';
import getAppDetails from '@/utils/getAppDetail';


export async function getMCPSaasPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/mcp/saas`;

        // Fetch data in parallel
        const [metaData, footerData, faqData, blogData, navbarData] = await Promise.all([
            getMetaData('/mcp', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getFaqData('/mcp', pageUrl),
            getBlogData({ tag1: 'mcp', tag2: 'saas' }, pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            blogData: blogData || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching MCP SaaS page data:', error);
        return {
            metaData: {},
            footerData: [],
            faqData: [],
            blogData: [],
            navbarData: [],
        };
    }
}

export async function getMCPPageData(slug = []) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/mcp${slug.length > 0 ? '/' + slug.join('/') : ''}`;

        // Create page info from slug
        const pageInfo = { pathArray: ['mcp', ...slug] };
        const mcpInfo = getMcpInfo(pageInfo?.pathArray);

        // Fetch basic data that all pages need
        const [footerData, navbarData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        if (mcpInfo?.appone) {
            // App-specific MCP page
            const [metaData, faqData, categoryData, combosData] = await Promise.all([
                getMetaData('/mcp/appName', pageUrl),
                getFaqData('[mcpApp]', pageUrl),
                getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${mcpInfo?.category || 'all'}'`, pageUrl),
                getCombos(mcpInfo, pageUrl),
            ]);

            const apps = await getApps({ page: mcpInfo?.page, categoryData, limit: 16 }, pageUrl);

            const appOneDetails = getAppDetails(combosData, mcpInfo?.appone);

            if (appOneDetails) {
                const [blogData, mcpPromptData] = await Promise.all([
                    getBlogData({ tag1: 'mcp' }, pageUrl),
                    getMCPPromptData(MCP_FIELDS, `filter=slug_names='${appOneDetails?.appslugname}'`, pageUrl),
                ]);

                const mcpAppSteps = [
                    {
                        title: 'Get Your MCP Endpoint',
                        description:
                            "Instantly get a unique, secure URL that connects your AI assistant to viaSocket's network of integrations",
                    },
                    {
                        title: 'Choose Your Actions',
                        description: `Choose and configure the actions your AI assistant can perform in ${appOneDetails?.name}`,
                    },
                    {
                        title: 'Connect Your AI Assistant',
                        description:
                            'Connect your AI Assistant easily with the MCP endpoint for instant, secure task execution',
                    },
                ];

                const mcpAIIntegrationData = [
                    "Skip the hassle of building or hosting your own APIs.We've already done the hard work",
                    'Set it up once and instantly tap into 1,000+ apps in simple and seamless fashion',
                    'Enjoy secure, scoped access right out of the box . Your data is in good hands',
                    'Compatible with all your go-to  tools. Just plug and play',
                ];

                return {
                    pageInfo: pageInfo || {},
                    footerData: footerData || {},
                    apps: apps || [],
                    metaData: metaData || {},
                    faqData: faqData || [],
                    mcpInfo: mcpInfo || {},
                    appOneDetails: appOneDetails || {},
                    categoryData: {},
                    blogsData: blogData || [],
                    combosData: combosData || [],
                    mcpAppSteps: mcpAppSteps || [],
                    mcpPromptData: mcpPromptData || [],
                    mcpAIIntegrationData: mcpAIIntegrationData || [],
                    navbarData: navbarData || {},
                    noData: false,
                };
            } else {
                return {
                    noData: true,
                    footerData: footerData || {},
                    navbarData: navbarData || {},
                };
            }
        } else {
            // MCP index page (handles /mcp, /mcp/category, /mcp/category/[category]/page/[pageno])
            const [metaData, faqData, categoryData, appCount, categories, blogData] = await Promise.all([
                getMetaData('/mcp', pageUrl),
                getFaqData('[mcpApp]', pageUrl),
                getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${mcpInfo?.category || 'all'}'`, pageUrl),
                getAppCount(pageUrl),
                getCategoryData(INTECATEGORYlIST_FILED, '', pageUrl),
                getBlogData({ tag1: 'mcp' }, pageUrl),
            ]);

            const apps = await getApps({ page: mcpInfo?.page, categoryData }, pageUrl);

            const mcpSteps = [
                {
                    title: 'Get Your MCP Endpoint',
                    description:
                        "Instantly get a unique, secure URL that connects your AI assistant to viaSocket's network of integrations",
                },
                {
                    title: 'Choose Your Actions',
                    description:
                        'Easily select and define the actions your AI can perform, like sending emails or sending Slack messages, giving you full control',
                },
                {
                    title: 'Connect Your AI Assistant',
                    description:
                        'Connect your AI Assistant easily with the MCP endpoint for instant, secure task execution',
                },
            ];

            const tableData = [
                { aspects: 'Integration Speed', api: 'Takes weeks', mcp: 'Done in minutes' },
                {
                    aspects: 'Learning Curve',
                    api: 'Lots to read',
                    mcp: 'Just type what you need',
                },
                {
                    aspects: 'Maintenance',
                    api: 'Constant updates',
                    mcp: 'We handle it',
                },
                {
                    aspects: 'Security',
                    api: 'Your headache',
                    mcp: 'Built-in & managed',
                },
                {
                    aspects: 'Scalability',
                    api: 'Manual scaling',
                    mcp: 'Auto-scales',
                },
                {
                    aspects: 'Cost',
                    api: 'Dev + hosting costs',
                    mcp: 'Pay-as-you-use',
                },
            ];

            const featuresData = [
                {
                    heading: 'Broad connectivity',
                    content:
                        'Connect your AI to thousands of apps through a single protocol without building individual app integrations',
                    iconName: 'network',
                },
                {
                    heading: 'Massive Scalability',
                    content:
                        'Run tens of thousands of actions reliably and in real-time without delays or complications',
                    iconName: 'scale',
                },
                {
                    heading: 'Built-in Auth and Security',
                    content:
                        'viaSocket MCP endpoints come with robust authentication and encryption, so your data stays safe and secure from misuse',
                    iconName: 'shield',
                },
                {
                    heading: 'Interface flexibility',
                    content:
                        'Access viaSocket MCP in the platform you prefer to build in, like Cursor, ChatGPT, or Claude Desktop',
                    iconName: 'layers',
                },

                {
                    heading: 'Customizable AI Actions',
                    content:
                        'Customize your AI actions to set limits on what it can do, ensuring it stays within your preferred scope and meets your needs',
                    iconName: 'tools',
                },
                {
                    heading: 'Skip the Setup',
                    content:
                        'Forget building MCP servers from scratch—just use the viaSocket MCP server and let your AI connect to a world of apps in no time',
                    iconName: 'plug',
                },
            ];

            const keyPointData = [
                'No coding required',
                'Enterprise-grade security',
                'Pay only for what you use',
                'Compatible with all major AI platforms',
            ];

            return {
                pageInfo: pageInfo || {},
                mcpInfo: mcpInfo || {},
                footerData: footerData || {},
                apps: apps || [],
                blogsData: blogData || [],
                categoryData: categoryData || {},
                categories: categories || [],
                mcpSteps: mcpSteps || [],
                faqData: faqData || [],
                tableData: tableData || [],
                featuresData: featuresData || [],
                keyPointData: keyPointData || [],
                metaData: metaData || {},
                appCount: appCount || 0,
                navbarData: navbarData || {},
                noData: false,
            };
        }
    } catch (error) {
        console.error('Error fetching MCP page data:', error);
        return {
            noData: true,
            footerData: {},
            navbarData: {},
        };
    }
}

export async function getMCPAiAgentPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/mcp/aiagent`;

        // Fetch data in parallel
        const [metaData, footerData, faqData, blogData, navbarData] = await Promise.all([
            getMetaData('/mcp', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getFaqData('/mcp', pageUrl),
            getBlogData({ tag1: 'mcp' }, pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            blogData: blogData || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching MCP AI Agent page data:', error);
        return {
            metaData: {},
            footerData: [],
            faqData: [],
            blogData: [],
            navbarData: [],
        };
    }
}