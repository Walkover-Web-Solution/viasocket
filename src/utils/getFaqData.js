import { getFaq } from './axiosCalls';

export async function getFaqData(name, pageUrl) {
    const allFaqData = await getFaq(pageUrl);

    // getFaq returns undefined when the FAQ table can't be read. Return no FAQs rather than
    // throwing, which would make the page's loader drop every other section too (C-12).
    if (!Array.isArray(allFaqData)) return [];

    const matchedFaqs = allFaqData.filter((obj) => obj.page === name);
    return matchedFaqs;
}
