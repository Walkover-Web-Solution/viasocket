import React, { useMemo } from 'react';

// Helper function to parse use_cases data
const parseUseCasesData = (data) => {
    if (!data) return [];

    // Handle string data
    if (typeof data === 'string') {
        try {
            // Try parsing as JSON first
            const jsonData = JSON.parse(data);
            return Array.isArray(jsonData) ? jsonData : [jsonData];
        } catch (error) {
            console.error('Failed to parse use_cases string:', error);
            return [];
        }
    }

    // Handle array data
    if (Array.isArray(data)) return data;

    // Handle object data
    if (typeof data === 'object' && data !== null) return [data];

    return [];
};

const DepartmentUseCase = ({ use_cases }) => {
    // Parse the use_cases data
    const useCasesData = useMemo(() => parseUseCasesData(use_cases), [use_cases]);

    // Early return if no use cases to display
    if (!useCasesData.length) return null;

    return (
        <div className="relative bg-white p-6 md:p-12 border custom-border shadow-sm">
            <div className="flex flex-col gap-16">
                {useCasesData.map((useCase, index) => {
                    // Extract data with fallbacks
                    const sectionTitle = useCase?.section_title || '';
                    const sectionDescription = useCase?.section_description || '';
                    const imageUrl = useCase?.image || '';

                    // Skip if no content
                    if (!sectionTitle && !sectionDescription) return null;

                    return (
                        <div
                            key={`use-case-${index}`}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                        >
                            {/* Content Section */}
                            <div className="flex-1 flex flex-col gap-4">
                                {sectionTitle && <h3 className="h2">{sectionTitle}</h3>}
                                {sectionDescription && (
                                    <div className="text-gray-700 text-lg text-justify">
                                        {sectionDescription.split('\n\n').map((paragraph, pIndex) => (
                                            <p
                                                key={`paragraph-${index}-${pIndex}`}
                                                className={pIndex > 0 ? 'mt-4' : ''}
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Image Section */}
                            {imageUrl && (
                                <div className="flex-1 flex justify-center">
                                    <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-md">
                                        <img
                                            src={imageUrl}
                                            alt={sectionTitle || 'Department use case'}
                                            className="object-cover w-full h-auto max-h-[400px]"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    'https://via.placeholder.com/400x300?text=Image+Not+Available';
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DepartmentUseCase;
