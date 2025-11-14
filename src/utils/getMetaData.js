import { getMeta } from './axiosCalls';

export async function getMetaData(name, pageUrl) {
    const allMetaData = (await getMeta(pageUrl)) || [];
    const matchedMeta = Array.isArray(allMetaData)
        ? allMetaData.find((obj) => obj?.name === name)
        : null;
    return matchedMeta || null;
}
