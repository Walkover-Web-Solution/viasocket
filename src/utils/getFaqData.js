import { getFaq } from './axiosCalls';

export async function getFaqData(name, pageUrl) {
    const allFaqData = await getFaq(pageUrl);

    const matchedFaqs = allFaqData.filter((obj) => obj.page === name);
    return matchedFaqs;
}
