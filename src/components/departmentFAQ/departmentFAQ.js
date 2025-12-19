import FaqSection from '../faqSection/faqSection';

const normalizeFaqData = (rawFaqs) => {
    if (!rawFaqs) return [];

    let parsed = rawFaqs;

    if (typeof rawFaqs === 'string') {
        try {
            parsed = JSON.parse(rawFaqs);
        } catch (e) {
            return [];
        }
    }

    // If object with faqs key
    if (!Array.isArray(parsed) && parsed?.faqs) {
        parsed = parsed.faqs;
    }

    if (!Array.isArray(parsed)) return [];

    return parsed
        .map((item) => {
            const que = item.question || item.que || item.q || '';
            const ans = item.answer || item.ans || item.a || '';

            if (!que || !ans) return null;
            // FaqSection expects objects with que/ans keys
            return { que, ans };
        })
        .filter(Boolean);
};

export default function DepartmentFAQ({ faqJson }) {
    const faqData = normalizeFaqData(faqJson);

    if (!faqData.length) return null;
    return <FaqSection faqData={faqData} />;
}
