import FaqSection from '@/components/faqSection/faqSection';

export default function FeatureContentComp({ featureData }) {
    if (!featureData || featureData.length === 0) return null;

    // Map incoming data ({question, answer}) to FaqSection format ({que, ans})
    const faqData = featureData
        .map((item) => {
            const que = item?.question || '';
            const ans = item?.answer || '';

            if (!que || !ans) return null;
            return { que, ans };
        })
        .filter(Boolean);

    if (!faqData.length) return null;

    return <FaqSection faqData={faqData} />;
}
