import {
    FOOTER_FIELDS,
    NAVBAR_FIELDS,
    REVIEWSECTION_FIELDS,
} from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import { getFooterData, getNavbarData, getReviewSectionData } from '@/utils/getData';
import { getFaqData } from '@/utils/getFaqData';

export async function getLifetimeDealPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/lifetime-deal`;

        // Fetch dynamic data in parallel
        const [metaData, footerData, faqData, navbarData, reviewData] = await Promise.all([
            getMetaData('/lifetime-deal', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getFaqData('/lifetime-deal', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getReviewSectionData(REVIEWSECTION_FIELDS, '', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            navbarData: navbarData || [],
            reviewData: reviewData || [],
        };
    } catch (error) {
        console.error('Error fetching lifetime deal page data:', error);
        return {
            metaData: {},
            footerData: [],
            faqData: [],
            navbarData: [],
            reviewData: [],
        };
    }
}
