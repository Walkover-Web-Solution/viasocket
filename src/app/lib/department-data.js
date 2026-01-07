import {
    FOOTER_FIELDS,
    NAVBAR_FIELDS,
    DEPARTMENTDATA_FIELDS,
    REVIEWSECTION_FIELDS,
} from '@/const/fields';
import { getMetaData } from '@/utils/getMetaData';
import { getFooterData, getNavbarData } from '@/utils/getData';
import { getAppCount } from '@/utils/axiosCalls';
import { getFaqData } from '@/utils/getFaqData';
import { getDepartmentData, getReviewSectionData } from '@/utils/getData';
import { getBlogData } from '@/utils/getBlogData';
import { getTemplates } from '@/utils/axiosCalls';

export async function getDepartmentsPageData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/department`;

        // Fetch dynamic data in parallel
        const [metaData, navbarData, footerData, departmentData, faqData, reviewData, appCount] = await Promise.all([
            getMetaData('/departments', pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getDepartmentData(DEPARTMENTDATA_FIELDS, '', pageUrl),
            getFaqData('/departments', pageUrl),
            getReviewSectionData(REVIEWSECTION_FIELDS, '', pageUrl),
            getAppCount(pageUrl),
        ]);

        return {
            metaData: metaData || {},
            navbarData: navbarData || {},
            footerData: footerData || {},
            departmentData: departmentData || {},
            faqData: faqData || {},
            reviewData: reviewData || {},
            appCount: appCount || 1764,
        };
    } catch (error) {
        console.error('Error fetching departments page data:', error);
        return {
            metaData: {},
            navbarData: {},
            footerData: {},
            departmentData: {},
            faqData: {},
            reviewData: {},
            appCount: 1764,
        };
    }
}


export async function getDepartmentPageData(slug) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viasocket.com';
        const pageUrl = `${baseUrl}/departments/${slug}`;

        const [metaData, navbarData, footerData, departmentData] = await Promise.all([
            getMetaData(`/department/${slug}`, pageUrl),
            getNavbarData(NAVBAR_FIELDS, '', pageUrl),
            getFooterData(FOOTER_FIELDS, '', pageUrl),
            getDepartmentData(DEPARTMENTDATA_FIELDS, '', pageUrl),
        ]);

        const blogTags = 'department';
        const blogsData = await getBlogData({ tag1: blogTags }, pageUrl);

        const departmentList = Array.isArray(departmentData) ? departmentData : [];
        const department = departmentList.find((item) => item?.slug === slug) || null;

        const templateData = await getTemplates(pageUrl);
        const validTemplates = templateData.filter(
            (t) => t?.flowJson?.order?.root && t?.flowJson?.order?.root?.length > 0
        );
        const templateToShow = validTemplates;

        if (!department) {
            return {
                noData: true,
            };
        }

        return {
            metaData: metaData || {},
            navbarData: navbarData || {},
            footerData: footerData || {},
            department,
            blogsData: blogsData || [],
            templateToShow: templateToShow || [],
        };
    } catch (error) {
        console.error('Error fetching Department page data:', error);
        return {
            noData: true,
        };
    }
}
