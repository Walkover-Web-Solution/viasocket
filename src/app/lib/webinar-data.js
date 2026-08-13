import { getFooterData, getNavbarData, getReviewSectionData, getWebinarData } from '@/utils/getData';
import { FOOTER_FIELDS, NAVBAR_FIELDS, REVIEWSECTION_FIELDS, WEBINAR_FIELDS } from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';

// The table keeps blank placeholder rows, so only rows with a name are shown.
// Dates are ISO strings, which sort correctly as plain strings; undated rows go last.
function handleWebinars(rows) {
    return (rows || [])
        .filter((webinar) => webinar?.name)
        .sort((a, b) => (a?.date_in_ist || '9999').localeCompare(b?.date_in_ist || '9999'));
}

export async function getWebinarPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/webinar`;

        const [metaData, footerData, navbarData, webinarData, reviewData] = await Promise.all([
            getMetaData('/webinar', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getWebinarData(WEBINAR_FIELDS, '', pageUrl),
            getReviewSectionData(REVIEWSECTION_FIELDS, '', pageUrl),
        ]);

        return {
            metaData: metaData || {},
            footerData: footerData || [],
            navbarData: navbarData || [],
            webinarData: handleWebinars(webinarData),
            reviewData: reviewData || [],
        };
    } catch (error) {
        console.error('Error fetching webinar page data:', error);
        return {
            metaData: {},
            footerData: [],
            navbarData: [],
            webinarData: [],
            reviewData: [],
        };
    }
}
