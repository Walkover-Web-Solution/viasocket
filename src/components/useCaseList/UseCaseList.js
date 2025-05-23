import React, { useState, useEffect } from 'react';

const UseCaseList = ({ useCaseData, appname }) => {
    const allUseCases = useCaseData?.flatMap((usecase) => usecase?.usecase?.usecases) || [];

    const [activeUseCases, setActiveUseCases] = useState(allUseCases?.[0]?.content || []);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (allUseCases.length > 0) {
            setActiveUseCases(allUseCases[0]?.content);
        }
    }, [useCaseData]);

    return (
        <div className="container">
            <div className="cont gap-8 bg-white border custom-border p-12">
                <div className="cont gap-2">
                    <h2 className="h2">{`Real-World Use Cases of ${appname} Integrations`}</h2>
                    <p className="sub__h1">{`See how ${appname} integrates with popular apps to automate tasks and streamline your workflow.`}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 ">
                    {/* Sidebar with hover and active effect */}
                    <div className="w-full h-fit flex flex-col justify-center items-center ">
                        {allUseCases.map((uc, index) => (
                            <div
                                key={index}
                                className={`px-4 py-6 w-full cursor-pointer transition-all  group ${
                                    activeIndex === index ? 'bg-black text-white' : 'hover-bg-grey-100-text-black'
                                }`}
                                onMouseEnter={() => {
                                    setActiveUseCases(uc?.content);
                                    setActiveIndex(index);
                                }}
                            >
                                <div
                                    className={`${
                                        activeIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`font-semibold ${
                                                activeIndex === index
                                                    ? 'text-white'
                                                    : 'text-black group-hover:text-white'
                                            }`}
                                        >
                                            {uc?.heading}
                                        </div>
                                    </div>
                                    {uc?.description}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex justify-center items-center border custom-border p-8 sm:p-16">
                        <ul className="list-disc">
                            {activeUseCases?.map((item, j) => (
                                <li key={j} className="text-xl mb-4">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UseCaseList;
