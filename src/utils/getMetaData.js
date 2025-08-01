import { getMeta } from './axiosCalls';

export async function getMetaData(name, pageUrl) {
    const allMetaData = await getMeta(pageUrl);

    const matchedMeta = allMetaData.find((obj) => obj.name === name);
    return matchedMeta || null;
}
