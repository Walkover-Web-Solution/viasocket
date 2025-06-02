import {
    AGENCIES,
    ALLFEATURES,
    CASESTUDY,
    CATEGORY,
    DISCONNECTED,
    EXPERTBLOGS,
    FAQS,
    GETSTARTED,
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
} from '@/const/tables';
import { FOOTER, METADATA } from '@/const/tables';
import getDataFromTable from './getDataFromTable';

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

export async function getFooterData(fields, filter, req) {
    const data = await getDataFromTable(FOOTER, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getMetaData(fields, filter, req) {
    const data = await getDataFromTable(METADATA, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getAllFeatures(fields, filter, req) {
    const data = await getDataFromTable(ALLFEATURES, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getFeatureData(fields, filter, req) {
    const data = await getDataFromTable(ALLFEATURES, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getFaqData(fields, filter, req) {
    const data = await getDataFromTable(FAQS, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getCategoryData(fields, filter, req) {
    const data = await getDataFromTable(CATEGORY, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getTestimonialData(fields, filter, req) {
    const data = await getDataFromTable(TESTIMONIALS, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getCaseStudyData(fields, filter, req) {
    const data = await getDataFromTable(CASESTUDY, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getGetStartedData(fields, filter, req) {
    const data = await getDataFromTable(GETSTARTED, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getIndexFeatures(fields, filter, req) {
    const data = await getDataFromTable(INDEXFEATURES, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getPageData(fields, filter, req) {
    const data = await getDataFromTable(PAGE, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getAgencies(fields, filter, req) {
    const data = await getDataFromTable(AGENCIES, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getExpertBlogs(fields, filter, req) {
    const data = await getDataFromTable(EXPERTBLOGS, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getPricingBetterChoice(fields, filter, req) {
    const data = await getDataFromTable(PRICINGBETTERCHOICE, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getProgramsData(fields, filter, req) {
    const data = await getDataFromTable(PROGRAMS, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getTrustedByData(fields, filter, req) {
    const data = await getDataFromTable(TRUSTEDBY, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getDisconnectedData(fields, filter, req) {
    const data = await getDataFromTable(DISCONNECTED, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getEmbedData(fields, filter, req) {
    const data = await getDataFromTable(EMBED, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getUsecasesData(fields, filter, req) {
    const data = await getDataFromTable(USECASES, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getCountriesData(fields, filter, req) {
    const data = await getDataFromTable(COUNTRIES, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getValidTemplatesData(fields, filter, req) {
    const data = await getDataFromTable(TEMPLATES, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getMCPPromptData(fields, filter, req) {
    const data = await getDataFromTable(MCP, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getPricingFeatureData(fields, filter, req) {
    const data = await getDataFromTable(PRICINGFEATURE, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}

export async function getIndexTemplateData(fields, filter, req) {
    const data = await getDataFromTable(INDEXTEMPLATE, handleFieldsFilter(fields, filter), req);
    return handleData(data);
}
