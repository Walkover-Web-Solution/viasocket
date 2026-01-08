import {
    getFooterData,
    getNavbarData,
} from '@/utils/getData';
import {
    FOOTER_FIELDS,
    NAVBAR_FIELDS,
    ALLFEATURES_FIELDS,
} from '@/const/fields';
import { getAllFeatures, getFeatureData } from '@/utils/getData';
import { getMetaData } from '@/utils/getMetaData';
import { getBlogData } from '@/utils/getBlogData';

export async function getFeaturesPageData(feature = []) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/features${feature.length > 0 ? '/' + feature.join('/') : ''}`;

        // Create page info from feature slug - match original GetPageInfo structure
        const pageInfo = {
            pathArray: ['features', ...feature],
            url: `/features${feature.length > 0 ? '/' + feature.join('/') : ''}`,
        };

        const [footerData, navbarData, metaData] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getMetaData(pageInfo?.url, pageUrl),
        ]);

        let featureSlug = null;
        let features = [];
        let featureData = {};

        if (feature?.length > 0) {
            featureSlug = feature[0];
        }

        if (!featureSlug) {
            // Features index page - show all features
            features = await getAllFeatures(ALLFEATURES_FIELDS, '', pageUrl);
        } else {
            // Single feature page
            const featureDataArray = await getFeatureData(ALLFEATURES_FIELDS, `filter=slug='${featureSlug}'`, pageUrl);
            featureData = (featureDataArray?.length > 0 && featureDataArray[0]) || {};
        }

        const blogTags = 'feature';
        const blogData = await getBlogData({ tag1: blogTags }, pageUrl);

        return {
            features: features || [],
            featureData: featureData || {},
            footerData: footerData || [],
            metaData: metaData || {},
            pageInfo: pageInfo || {},
            blogData: blogData || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching Features page data:', error);
        return {
            noData: true,
        };
    }
}