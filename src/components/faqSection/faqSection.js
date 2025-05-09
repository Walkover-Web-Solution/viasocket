import { LinkButton, LinkText } from '../uiComponents/buttons';
export default function FAQSection({ faqData, faqName, isBlack = false }) {
    return (
        <>
            {' '}
            {faqData?.length > 0 && (
                <div className={`flex flex-col gap-9 ${isBlack ? 'text-white' : ''}`}>
                    <h2 className="h2">Frequently Asked Questions</h2>

                    <div className="flex flex-col gap-1">
                        {faqData.map((faq, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`collapse collapse-arrow border-b border-none rounded-none LinkButtonCard ${isBlack ? '!bg-black' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="my-accordion-3 border-none bg-white"
                                        className="min-h-[28px]"
                                        defaultChecked={index == 0}
                                    />
                                    <div
                                        className={`collapse-title text-lg font-semibold pb-0 min-h-[28px] ${isBlack ? '!text-white' : ''}`}
                                    >
                                        {faq?.que}
                                    </div>
                                    <div
                                        className={`collapse-content flex flex-col gap-2 ${isBlack ? '!bg-black' : ''}`}
                                    >
                                        <div className={`font- ${isBlack ? 'text-white' : ''}`}>{faq?.ans}</div>
                                        {faq?.link && <LinkButton content="Learn More" href={faq?.link} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
