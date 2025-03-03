import React from 'react';

const UseCaseList = ({ useCaseData, appOneSlug, appTwoSlug }) => {
    const filteredData = useCaseData.filter(
        (usecase) => usecase.slugname === appOneSlug || usecase.slugname === appTwoSlug
    );

    return (
        <div className="container cont gap-8">
            <h1 className="h1">USECASES</h1>
            <ul>
                {filteredData.length > 0 &&
                    filteredData.map((usecase, index) => (
                        <li key={index} className="mb-4">
                            <h2 className="text-lg font-bold">{usecase.slugname}</h2>
                            <ul className="ml-4">
                                {usecase.usecase.usecases.map((uc, i) => (
                                    <li key={i} className="mt-2">
                                        <h3 className="text-md font-semibold">{uc.heading}</h3>
                                        <ul className="ml-6 list-disc">
                                            {uc.content.map((item, j) => (
                                                <li key={j}>{item}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default UseCaseList;
