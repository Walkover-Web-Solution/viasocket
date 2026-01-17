import {
    AGENCIES,
    ALLFEATURES,
    CASESTUDY,
    CATEGORY,
    DISCONNECTED,
    EXPERTBLOGS,
    INDEXFEATURES,
    PAGE,
    PRICINGBETTERCHOICE,
    PROGRAMS,
    TESTIMONIALS,
    TRUSTEDBY,
    EMBED,
    USECASES,
    COUNTRIES,
    TEMPLATES,
    MCP,
    PRICINGFEATURE,
    INDEXTEMPLATE,
    FOOTER,
    DOFOLLOWLINK,
    NAVBAR,
    BLACKFRIDAYSALE,
    DEPARTMENTDATA,
    SOCIALREVIEWS
} from '@/const/tables';
import { getDataFromTable } from './axiosCalls';

const handleData = (data) => {
    return data?.data?.rows;
};

const handleFieldsFilter = (fields, filter) => {
    let queryString = '';

    if (fields?.length > 0) {
        queryString += '?fields=' + fields.join('&fields=');
    }
    if (filter) {
        queryString += (queryString ? '&' : '?') + filter;
    }
    return queryString || null;
};

export async function getFooterData(fields, filter, pageUrl) {
    const data = await getDataFromTable(FOOTER, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}
export async function getNavbarData(fields, filter, pageUrl) {
    const data = await getDataFromTable(NAVBAR, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getAllFeatures(fields, filter, pageUrl) {
    const data = await getDataFromTable(ALLFEATURES, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getFeatureData(fields, filter, pageUrl) {
    const data = await getDataFromTable(ALLFEATURES, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getCategoryData(fields, filter, pageUrl) {
    const data = await getDataFromTable(CATEGORY, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getTestimonialData(fields, filter, pageUrl) {
    const data = await getDataFromTable(TESTIMONIALS, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getCaseStudyData(fields, filter, pageUrl) {
    const data = await getDataFromTable(CASESTUDY, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getIndexFeatures(fields, filter, pageUrl) {
    const data = await getDataFromTable(INDEXFEATURES, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getPageData(fields, filter, pageUrl) {
    const data = await getDataFromTable(PAGE, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getAgencies(fields, filter, pageUrl) {
    const data = await getDataFromTable(AGENCIES, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getExpertBlogs(fields, filter, pageUrl) {
    const data = await getDataFromTable(EXPERTBLOGS, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getPricingBetterChoice(fields, filter, pageUrl) {
    const data = await getDataFromTable(PRICINGBETTERCHOICE, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getProgramsData(fields, filter, pageUrl) {
    const data = await getDataFromTable(PROGRAMS, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getTrustedByData(fields, filter, pageUrl) {
    const data = await getDataFromTable(TRUSTEDBY, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getDisconnectedData(fields, filter, pageUrl) {
    const data = await getDataFromTable(DISCONNECTED, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getEmbedData(fields, filter, pageUrl) {
    const data = await getDataFromTable(EMBED, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getUsecasesData(fields, filter, pageUrl) {
    const data = await getDataFromTable(USECASES, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getCountriesData(fields, filter, pageUrl) {
    const data = await getDataFromTable(COUNTRIES, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getValidTemplatesData(fields, filter, pageUrl) {
    const data = await getDataFromTable(TEMPLATES, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getMCPPromptData(fields, filter, pageUrl) {
    const data = await getDataFromTable(MCP, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getPricingFeatureData(fields, filter, pageUrl) {
    const data = await getDataFromTable(PRICINGFEATURE, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getIndexTemplateData(fields, filter, pageUrl) {
    const data = await getDataFromTable(INDEXTEMPLATE, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getDoFollowStatus(fields, filter, pageUrl){
    const data = await getDataFromTable(DOFOLLOWLINK, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getReviewSectionData(fields, filter, pageUrl){
    const data = await getDataFromTable(SOCIALREVIEWS, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getBlackFridaySaleData(fields, filter, pageUrl){
    const data = await getDataFromTable(BLACKFRIDAYSALE, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}

export async function getDepartmentData(fields, filter, pageUrl){
    const data = await getDataFromTable(DEPARTMENTDATA, handleFieldsFilter(fields, filter), pageUrl);
    return handleData(data);
}
