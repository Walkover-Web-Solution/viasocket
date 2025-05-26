import { LinkButton, LinkText } from '../uiComponents/buttons';
export default function FAQSection({ faqData, faqName, isBlack = false }) {
    return (
        <div className={`border custom-border border-b-0 p-12 bg-white ${isBlack ? 'text-white' : ''}`}>
            {faqData?.length > 0 && (
                <div className="flex flex-col gap-6">
                    <h2 className={`h2 ${isBlack ? 'text-white' : ''}`}>Frequently asked questions</h2>

                    {faqData?.map((faq, index) => {
                        return (
                            <ul key={index} className="flex flex-col gap-1 pl-5" style={{listStyleType: 'square'}}>
                                <li className={`font-semibold text-lg ${isBlack ? 'text-white' : ''}`}>{faq?.que}</li>
                                <li className={`list-none ${isBlack ? 'text-white' : ''}`}>{faq?.ans}</li>
                            </ul>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
