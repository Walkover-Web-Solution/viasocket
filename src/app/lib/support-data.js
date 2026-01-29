import {
    getFooterData,
    getNavbarData,
    getTestimonialData,
} from '@/utils/getData';
import {
    FOOTER_FIELDS,
    NAVBAR_FIELDS,
    TESTIMONIALS_FIELDS,
} from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import { getLiveSupportData } from '@/utils/axiosCalls';

export async function getSupportPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/support`;

        // Fetch dynamic data in parallel
        const [footerData, navbarData, metaData, testimonials, liveSupport] = await Promise.all([
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getMetaData('/support', pageUrl),
            getTestimonialData(TESTIMONIALS_FIELDS, '', pageUrl),
            getLiveSupportData(pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            navbarData: navbarData || [],
            testimonials: testimonials || [],
            liveSupport: liveSupport || [],
        };
    } catch (error) {
        console.error('Error fetching support page data:', error);
        return {
            metaData: {},
            footerData: [],
            navbarData: [],
            testimonials: [],
            liveSupport: [],
        };
    }
}