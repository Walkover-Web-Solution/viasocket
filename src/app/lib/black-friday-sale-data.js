import {  getBlackFridaySaleData } from '@/utils/getData';
import {
    FOOTER_FIELDS,
    NAVBAR_FIELDS,
    BLACKFRIDAYSALE_FIELDS,
} from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import { getFooterData, getNavbarData } from '@/utils/getData';
import { getFaqData } from '@/utils/getFaqData';


export async function getBlackFridaySalePageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/black-friday-sale`;

        // Fetch dynamic data in parallel
        const [metaData, footerData, faqData, blackFridaySaleData, navbarData] = await Promise.all([
            getMetaData('/black-friday-sale', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getFaqData('/black-friday-sale', pageUrl),
            getBlackFridaySaleData(BLACKFRIDAYSALE_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            blackFridaySaleData: blackFridaySaleData || [],
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching black friday sale page data:', error);
        return {
            metaData: {},
            footerData: [],
            faqData: [],
            blackFridaySaleData: [],
            navbarData: [],
        };
    }
}