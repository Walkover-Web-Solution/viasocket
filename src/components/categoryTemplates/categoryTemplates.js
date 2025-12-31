'use client';

import TemplateCard from '@/components/templateCard/templateCard';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';

export default function CategoryTemplates({ categoryName, templates }) {
    const [visibleCount, setVisibleCount] = useState(18);
    const hasMoreTemplates = templates.length > visibleCount;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    return (
        <div className="cont gap-4 pt-20">
            <div className="text-left cont gap-4 mb-4">
                <h1 className="h1">
                    <span className="text-accent italic">{`${templates.length}+`}</span>{' '}
                    {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Templates
                </h1>
            </div>

            {templates?.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                        {templates.slice(0, visibleCount).map((template) => (
                            <TemplateCard key={template.id} template={template} />
                        ))}
                    </div>
                    {hasMoreTemplates && (
                        <div className="flex justify-end w-full mt-4">
                            <button onClick={handleLoadMore} className="btn btn-outline border custom-border">
                                Load More <MdKeyboardArrowDown size={24} />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center cont gap-8 flex items-center">
                    <p className="text-gray-600">No templates found for this category.</p>
                    <a href="/automations" className="btn btn-accent">
                        Browse All Templates
                    </a>
                </div>
            )}
        </div>
    );
}
