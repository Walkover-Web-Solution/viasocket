import {
    getFooterData,
    getCategoryData,
    getNavbarData,
    getDoFollowStatus,
    getUsecasesData,
} from '@/utils/getData';
import {
    FOOTER_FIELDS,
    NAVBAR_FIELDS,
    INTECATEGORY_FIELDS,
    INTECATEGORYlIST_FILED,          
    DOFOLLOWLINK_FIELDS,
    USECASES_FIELDS,
} from '@/const/fields';
import { getVideoData } from '@/utils/getVideoData';
import getIntegrationsInfo from '@/utils/getInterationsInfo';
import { getAppCount, getTemplates, getApps, getCombos, getCategoryBlogs } from '@/utils/axiosCalls';
import { getFaqData } from '@/utils/getFaqData';
import { getMetaData } from '@/utils/getMetaData';
import getAppDetails from '@/utils/getAppDetail';
import { getBlogData } from '@/utils/getBlogData';

export async function getIntegrationsPageData(slug = [], searchParams = {}) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/integrations${slug.length > 0 ? '/' + slug.join('/') : ''}`;

        // Create page info from slug
        const pageInfo = { pathArray: ['integrations', ...slug], qurey: searchParams };
        const integrationsInfo = getIntegrationsInfo(pageInfo?.pathArray);

        // Fetch basic data that all pages need
        const [footerData, appCount, getDoFollowUrlStatusArray, navbarData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getAppCount(pageUrl),
            getDoFollowStatus(DOFOLLOWLINK_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        if (integrationsInfo?.appone && integrationsInfo?.apptwo) {
            // App-to-app integration page
            const [metadata, faqData, combosData] = await Promise.all([
                getMetaData('/integrations/AppOne/AppTwo', pageUrl),
                getFaqData('[singleApp]', pageUrl),
                getCombos(integrationsInfo, pageUrl),
            ]);

            const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);
            const appTwoDetails = getAppDetails(combosData, integrationsInfo?.apptwo);

            if (appOneDetails && appTwoDetails) {
                const [blogData, videoData, templateData] = await Promise.all([
                    getBlogData({ tag1: appOneDetails?.appslugname, tag2: appTwoDetails?.appslugname }, pageUrl),
                    getVideoData({ tag1: appOneDetails?.appslugname, tag2: appTwoDetails?.appslugname }, pageUrl),
                    getTemplates(pageUrl),
                ]);

                const validTemplates = templateData.filter(
                    (t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
                );

                return {
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
                    templateToShow: validTemplates || [],
                    noData: false,
                };
            } else {
                return {
                    noData: true,
                    footerData: footerData || {},
                    navbarData: navbarData || {},
                };
            }
        } else if (integrationsInfo?.appone) {
            // Single app integration page
            const [metadata, faqData, categoryData, combosData, useCaseData] = await Promise.all([
                getMetaData('/integrations/AppOne', pageUrl),
                getFaqData('[doubleApp]', pageUrl),
                getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${integrationsInfo?.category || 'all'}'`, pageUrl),
                getCombos(integrationsInfo, pageUrl),
                getUsecasesData(USECASES_FIELDS, `filter=slugname='${integrationsInfo?.appone}'`, pageUrl),
            ]);

            const apps = await getApps({ page: integrationsInfo?.page, categoryData }, pageUrl);
            const appOneDetails = getAppDetails(combosData, integrationsInfo?.appone);

            if (appOneDetails) {
                const [blogData, videoData, templateData] = await Promise.all([
                    getBlogData({ tag1: appOneDetails?.appslugname }, pageUrl),
                    getVideoData({ tag1: appOneDetails?.appslugname }, pageUrl),
                    getTemplates(pageUrl),
                ]);

                const validTemplates = templateData.filter(
                    (t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
                );

                return {
                    pageInfo: pageInfo || {},
                    footerData: footerData || [],
                    apps: apps || [],
                    metadata: metadata || {},
                    faqData: faqData || [],
                    integrationsInfo: integrationsInfo || {},
                    combosData: combosData || {},
                    appOneDetails: appOneDetails || {},
                    appTwoDetails: {},
                    categoryData: (categoryData?.length > 0 && categoryData[0]) || {},
                    blogData: blogData || [],
                    useCaseData: useCaseData || [],
                    videoData: videoData || [],
                    appCount: appCount || 0,
                    getDoFollowUrlStatusArray: getDoFollowUrlStatusArray || [],
                    navbarData: navbarData || {},
                    templateToShow: validTemplates || [],
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
            // Integrations index page
            const [metadata, faqData, categoryData, categories, blogData] = await Promise.all([
                getMetaData('/integrations', pageUrl),
                getFaqData('/integrations', pageUrl),
                getCategoryData(INTECATEGORY_FIELDS, `filter=slug='${integrationsInfo?.category || 'all'}'`, pageUrl),
                getCategoryData(INTECATEGORYlIST_FILED, '', pageUrl),
                getBlogData({ tag1: 'integration' }, pageUrl),
            ]);

            const apps = await getApps({ page: integrationsInfo?.page, categoryData }, pageUrl);
            const categoryBlogs = await getCategoryBlogs({ page: integrationsInfo?.page, categoryData }, pageUrl);
            const categoryName = integrationsInfo?.category || 'all';

            return {
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
                templateToShow: [],
                noData: false,
                categoryBlogs: categoryBlogs || [],
                categoryName: categoryName || 'all',
            };
        }
    } catch (error) {
        console.error('Error fetching Integrations page data:', error);
        return {
            noData: true,
            footerData: {},
            navbarData: {},
            categoryBlogs: [],
        };
    }
}