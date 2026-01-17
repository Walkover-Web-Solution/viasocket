'use client';

import TestimonialsOptimized from './TestimonialsOptimized';
import { IoMdHeart } from 'react-icons/io';
import ReviewFilters from './reviewFilters';
import { useState } from 'react';

const filters = [
    { id: 'all', label: 'All' },
    { id: 'linkedin', label: 'Linkedin' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'g2', label: 'G2' },
    { id: 'capterra', label: 'Capterra' },
];

export default function ReviewIframeOptimized({reviewData }) {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const selectedFilterObj = selectedFilter ? filters.find((f) => f.id === selectedFilter) : null;

    const matchesFilter = (item) => {
        if (!selectedFilter || !selectedFilterObj || selectedFilterObj.id === 'all') return true;

        return selectedFilterObj.id === item.name?.toLowerCase();
    };
    return (
        <div className="iframe-main-wrapper pb-12 pt-8 relative container">
            <div className="flex items-center justify-between gap-2">
                <h2 className="h2 flex items-center gap-1">
                    <span>Reviews</span> <IoMdHeart className="text-red-700" />
                </h2>
                <ReviewFilters filters={filters} onSelect={setSelectedFilter} selectedFilter={selectedFilter} />
            </div>
            <TestimonialsOptimized reviewData={reviewData} matchesFilter={matchesFilter} />
        </div>
    );
}
