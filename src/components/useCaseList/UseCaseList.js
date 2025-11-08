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
        <div className="cont gap-8 bg-white border custom-border">
            <div className="flex flex-col md:flex-row gap-4 ">
                <div className="w-full p-8 h-fit flex flex-col">
                    <div className="cont gap-2">
                        <h2 className="h2">{`Real-world use cases of ${appname} integrations`}</h2>
                        <p className="sub__h1">{`See how ${appname} integrates with popular apps to automate tasks and streamline your workflow.`}</p>
                    </div>
                    <div className="flex flex-col mt-5">
                        {allUseCases.map((uc, index) => (
                            <div
                                key={index}
                                className={`p-4 w-full cursor-pointer transition-all  group ${activeIndex === index ? 'bg-black text-white' : 'hover-bg-grey-100-text-black'
                                    }`}
                                onMouseEnter={() => {
                                    setActiveUseCases(uc?.content);
                                    setActiveIndex(index);
                                }}
                            >
                                <div
                                    className={`${activeIndex === index
                                            ? 'text-white'
                                            : 'text-gray-400 group-hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`font-semibold ${activeIndex === index
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
                </div>

                <div
                    className="px-2 lg:px-8 py-12 md:py-24 lg:py-16  w-full flex justify-center items-center border-l custom-border"
                    style={{
                        backgroundImage: 'url("/review-image/pexels-ironic.svg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <ul className="list-disc bg-white m-4 lg:m-12 h-full p-8 flex flex-col justify-center">
                        {activeUseCases?.map((item, j) => (
                            <li key={j} className="text-xl mb-4">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UseCaseList;
