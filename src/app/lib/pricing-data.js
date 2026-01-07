import {  getPricingFeatureData } from '@/utils/getData';
import {
    FOOTER_FIELDS,
    NAVBAR_FIELDS,
    PRICINGFEATURE_FIELDS,
    COUNTRIES_FIELDS,
} from '@/const/fields';
import getCountries from '@/utils/getCountries';
import { getMetaData } from '@/utils/getMetaData';
import { getFooterData, getNavbarData } from '@/utils/getData';
import { getAppCount } from '@/utils/axiosCalls';
import { getFaqData } from '@/utils/getFaqData';


export async function getPricingPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/pricing`;

        // Fetch dynamic data in parallel
        const [metaData, footerData, faqData, features, countries, appCount, navbarData] = await Promise.all([
            getMetaData('/pricing', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getFaqData('/pricing', pageUrl),
            getPricingFeatureData(PRICINGFEATURE_FIELDS, '', pageUrl),
            getCountries(COUNTRIES_FIELDS, '', pageUrl),
            getAppCount(pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            faqData: faqData || [],
            features: features || [],
            countries: countries || [],
            appCount: appCount || 0,
            navbarData: navbarData || [],
        };
    } catch (error) {
        console.error('Error fetching pricing page data:', error);
        return {
            metaData: {},
            footerData: [],
            faqData: [],
            features: [],
            countries: [],
            appCount: 0,
            navbarData: [],
        };
    }
}