import { useState } from "react";
import { LinkButton } from "../uiComponents/buttons";
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function FAQSection({ faqData = [], faqName }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (faqData.length === 0) return null;

    return (
        <section className="flex flex-col gap-8">
            <h2 className="h1">
                Frequently Asked Questions
            </h2>

            <div className="flex flex-col">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className={`collapse border bg-white mb-3 transition-all duration-300 rounded-none linkButtonCard ${openIndex === index ? "custom-border" : "border-gray-200"
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={openIndex === index}
                            onChange={() => toggleAccordion(index)}
                          className="peer"
                        />

                        <div className="collapse-title text-lg sm:text-xl font-semibold flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-semibold text-gray-300 w-10 sm:w-12 text-right">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="text-gray-800">{faq?.que}</span>
                            </div>

                            <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-colors duration-300 `}
                            >
                                {openIndex === index ? (
                                    <FaMinus />
                                ) : (
                                    <FaPlus />
                                )}
                            </div>
                        </div>

                        <div className="collapse-content pl-14 sm:pl-20 pr-10 pb-3">
                            <p className="leading-relaxed">{faq?.ans}</p>
                            {faq?.link && (
                                <div className="mt-3">
                                    <LinkButton content="Learn More" href={faq.link} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}