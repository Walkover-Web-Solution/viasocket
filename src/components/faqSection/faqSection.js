import { useState, memo } from "react";
import { LinkButton } from "../uiComponents/buttons";

const FAQSection = ({ faqData = [], faqName }) => {
    const [openIndex, setOpenIndex] = useState(null);

    if (!faqData.length) return null;

    const toggleAccordion = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className="cont md:mb-20">
            <section className="flex flex-col gap-8">
                <h2 className="h2 flex items-center justify-center">Frequently Asked Questions</h2>

                <div className="flex flex-col">
                    {faqData.map(({ que, ans, link }, index) => {
                        const isLast = index === faqData.length - 1;
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`collapse collapse-arrow pt-2 transition-all duration-300 rounded-none linkButtonCard border-gray-300 ${!isLast ? "border-b" : ""
                                    }`}
                            >
                                <input
                                    id={`faq-toggle-${index}`}
                                    type="checkbox"
                                    checked={isOpen}
                                    onChange={() => toggleAccordion(index)}
                                    className="peer"
                                />
                                <div className="collapse-title font-semibold text-xl">
                                    {que}
                                </div>
                                <div className="collapse-content pr-10 pb-3">
                                    <p className="leading-relaxed -mt-2 text-gray-800 md:pr-10">{ans}</p>
                                    {link && (
                                        <div className="mt-3">
                                            <LinkButton content="Learn More" href={link} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default memo(FAQSection);