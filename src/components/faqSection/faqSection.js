import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FAQSection({ faqData, isBlack = false }) {
    const [titleRef, titleInView] = useScrollAnimation({ threshold: 0.2 });
    const [contentRef, contentInView] = useScrollAnimation({ threshold: 0.1 });

    return (
        <div className={`border custom-border border-b-0 p-6 md:p-12 bg-white ${isBlack ? 'text-white' : ''}`}>
            {faqData?.length > 0 && (
                <div className="flex flex-col gap-6">
                    <h2
                        ref={titleRef}
                        className={`h2 scroll-animate ${titleInView ? 'in-view' : ''} ${isBlack ? 'text-white' : ''}`}
                    >
                        Frequently asked questions
                    </h2>

                    <div
                        ref={contentRef}
                        className={`flex flex-col gap-6 scroll-animate ${contentInView ? 'in-view' : ''}`}
                    >
                        {faqData?.map((faq, index) => {
                            return (
                                <ul key={index} className="flex flex-col gap-1 pl-5" style={{ listStyleType: 'square' }}>
                                    <li className={`font-semibold text-lg ${isBlack ? 'text-white' : ''}`}>{faq?.que}</li>
                                    <li className={`list-none ${isBlack ? 'text-white' : ''}`}>{faq?.ans}</li>
                                </ul>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
