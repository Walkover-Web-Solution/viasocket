'use client';

import TestimonialsOptimized from './TestimonialsOptimized';
import { Heart, Linkedin, Twitter } from 'lucide-react';
import ReviewFilters from './reviewFilters';
import { useState } from 'react';

const filters = [
    { id: 'linkedin', label: 'Linkedin', Icon: Linkedin, color: '#0A66C2' },
    { id: 'twitter', label: 'Twitter', Icon: Twitter, color: '#1DA1F2' },
    { id: 'g2', label: 'G2', logo: 'https://cdn.simpleicons.org/g2/FF492C' },
    {
        id: 'capterra',
        label: 'Capterra',
        logo: 'https://gdm-localsites-assets-gfprod.imgix.net/images/capterra/og_logo-e5a8c001ed0bd1bb922639230fcea71a.png?auto=format%2Cenhance%2Ccompress',
    },
];

export default function ReviewIframeOptimized({ reviewData }) {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const selectedFilterObj = selectedFilter ? filters.find((f) => f.id === selectedFilter) : null;

    const matchesFilter = (item) => {
        if (!selectedFilter || !selectedFilterObj || selectedFilterObj.id === 'all') return true;

        return selectedFilterObj.id === item.name?.toLowerCase();
    };
    return (
        <div className="iframe-main-wrapper py-12 pt-20 relative container">
            <div className="flex md:flex-row flex-col items-center justify-between gap-8 mb-12">
                <h2 className="h2 flex items-center gap-1">
                    <span>Reviews</span> <Heart className="w-5 h-5 text-red-700" />
                </h2>
                <ReviewFilters filters={filters} onSelect={setSelectedFilter} selectedFilter={selectedFilter} />
            </div>
            <TestimonialsOptimized reviewData={reviewData} matchesFilter={matchesFilter} />
        </div>
    );
}
