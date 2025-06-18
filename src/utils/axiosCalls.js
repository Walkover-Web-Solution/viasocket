import { sendErrorMessage } from './SendErrorMessage';
import axios from 'axios';
import { APPERPAGE } from '@/const/integrations';
import { setupCache } from 'axios-cache-interceptor';

const axiosWithCache = setupCache(axios);

export async function getDataFromTable(table, query, pageUrl) {
    const apiUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/65d2ed33fa9d1a94a5224235/${table}${query ? query : ''}`;

    try {
        const response = await axiosWithCache.get(apiUrl, {
            headers: {
                'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
            },
            cache: {
                ttl: 1000 * 60 * 20, // Cache for 20 minutes
                interpretHeader: false,
            },
        });
        return response?.data;
    } catch (error) {
        console.error(error?.response?.data || error.message);
        sendErrorMessage({ error, pageUrl, source: apiUrl });
    }
}

export async function getBlogs(pageUrl) {
    const url = `https://table-api.viasocket.com/66029bf861a15927654de175/tblngzrs5`;
    try {
        const response = await axiosWithCache.get(url, {
            headers: {
                'auth-key': process.env.NEXT_PUBLIC_BLOG_DB_KEY,
                'Content-Type': 'application/json',
            },
            cache: {
                ttl: 1000 * 60 * 60, //cache for 1 hour
                interpretHeader: false,
            },
        });
        return response?.data?.data?.rows || [];
    } catch (error) {
        sendErrorMessage({
            error,
            pageUrl,
            source: url,
        });
        return [];
    }
}

export async function getVideos(pageUrl) {
    const url = `https://table-api.viasocket.com/65d2ed33fa9d1a94a5224235/tblh3g587`;
    try {
        const response = await axiosWithCache.get(url, {
            headers: {
                'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
                'Content-Type': 'application/json',
            },
            cache: {
                ttl: 1000 * 60 * 60, // cache for 1 hour
                interpretHeader: false,
            },
        });
        return response?.data?.data?.rows || [];
    } catch (error) {
        sendErrorMessage({
            error,
            pageUrl,
            source: url,
        });
        return [];
    }
}

export async function getTemplates(pageUrl) {
    const url = 'https://plugservice-api.viasocket.com/templates/all';
    try {
        const response = await axiosWithCache.get(url, {
            cache: {
                ttl: 1000 * 60 * 20, //cache for 20 min
                interpretHeader: false,
            },
        });
        return response.data.data;
    } catch (error) {
        sendErrorMessage({
            error,
            pageUrl,
            source: url,
        });
        return [];
    }
}

export async function getApps(query, pageUrl) {
    const category = query?.categoryData?.length > 0 ? query?.categoryData[0]?.name : 'All';
    const fetchUrl = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all`;
    const params = {
        category: (category !== 'All' && category) || '',
        limit: query?.limit || APPERPAGE,
        offset: query?.page ? query?.page * APPERPAGE : 0,
    };

    try {
        const response = await axiosWithCache.get(fetchUrl, {
            params,
            cache: {
                ttl: 1000 * 60 * 20, //cache for 20 min
                interpretHeader: false,
            },
        });
        const apps = response?.data?.data;
        return apps || [];
    } catch (error) {
        sendErrorMessage({
            error,
            pageUrl,
            source: fetchUrl,
        });
        return [];
    }
}

export async function getCombos(pageInfo, pageUrl) {
    if (pageInfo?.appone) {
        const url = `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pageInfo?.appone}${pageInfo?.apptwo && pageInfo?.apptwo != null ? '&service=' + pageInfo.apptwo : ''}`;
        try {
            const response = await axiosWithCache.get(url, {
                cache: {
                    ttl: 1000 * 60 * 20, // cache for 20 min
                    interpretHeader: false,
                },
            });
            return response?.data;
        } catch (error) {
            sendErrorMessage({
                error,
                pageUrl,
                source: url,
            });
            return null;
        }
    }
}

export async function fetchPluginData(slug, pageUrl) {
    let data = null;
    const url = `https://plugservice-api.viasocket.com/plugins/search?prefix=${slug[0]}`;
    try {
        const response = await axiosWithCache.get(url, {
            cache: {
                ttl: 1000 * 60 * 20, // cache for 20 min
                interpretHeader: false,
            },
        });
        data = response.data;
    } catch (error) {
        sendErrorMessage({
            error,
            pageUrl,
            source: url,
        });
    }
    return data;
}

export async function getMeta(pageUrl) {
    const apiUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/65d2ed33fa9d1a94a5224235/tbl2bk656`;

    try {
        const response = await axiosWithCache.get(apiUrl, {
            headers: {
                'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
            },
            cache: {
                ttl: 1000 * 60 * 20, // Cache for 20 minutes
                interpretHeader: false,
            },
        });
        return response?.data?.data?.rows;
    } catch (error) {
        console.error(error?.response?.data || error.message);
        sendErrorMessage({ error, pageUrl, source: apiUrl });
    }
}
