import React, { useState } from 'react';

export default function UseCase({ usecases }) {
    const [selectedUsecase, setSelectedUsecase] = useState(0);
    const handleUsecaseClick = (index) => {
        setSelectedUsecase(index);
    };

    return (
        <div className="flex flex-col md:flex-row gap-12">
            <div className=" w-full md:w-1/2 flex flex-col gap-9">
                <h2 className="text-3xl font-bold">Use Cases</h2>
                <ul className="list-disc">
                    {usecases?.map((usecase, index) => (
                        <div key={index} className="border-b-2 border-black-400 border-opacity-100 border-color:black;">
                            <li
                                className={`cursor-pointer text-lg flex justify-between items-center p-6  hover:bg-white ${selectedUsecase === index ? 'bg-white font-semibold' : ''}`}
                                onMouseEnter={() => handleUsecaseClick(index)}
                                onMouseLeave={() => handleUsecaseClick(index)}
                            >
                                {usecase?.heading}
                                {selectedUsecase === index && (
                                    <span className="ml-2 w-3 h-3 rounded-full bg-black"></span>
                                )}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
            {selectedUsecase !== null && usecases[selectedUsecase] && (
                <div className="bg-gray  w-full md:w-1/2 ml-5 mx-auto content-center">
                    <h2 className="text-3xl font-bold mb-2">{usecases[selectedUsecase]?.heading}</h2>
                    <ul className="list-disc pl-4 mt-4 flex flex-col gap-2">
                        {usecases[selectedUsecase]?.content?.length &&
                            usecases[selectedUsecase]?.content.map((content, index) => (
                                <li className="text-md font-medium" key={index}>
                                    {content}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
