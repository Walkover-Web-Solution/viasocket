'use client';

import TestimonialsOptimized from './TestimonialsOptimized';
import TestimonialsPricingCarousel from './TestimonialsPricingCarousel';
import { Heart, Linkedin, LayoutGrid } from 'lucide-react';
import ReviewFilters from './reviewFilters';
import { useState } from 'react';

const filters = [
    { id: 'All', label: 'All Reviews', Icon: LayoutGrid, color: '#374151' },
    { id: 'linkedin', label: 'Linkedin', Icon: Linkedin, color: '#0A66C2' },
    {
        id: 'twitter',
        label: 'X',
        logo: 'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/all-icons/twitter-x-1fhy50xzcvkl246hf5ua4.png/twitter-x-jyw81k7vr85ry57c7ym2d.png?_a=DATAiZAAZAA0',
    },
    { id: 'g2', label: 'G2', logo: 'https://cdn.simpleicons.org/g2/FF492C' },
    {
        id: 'capterra',
        label: 'Capterra',
        logo: 'https://gdm-localsites-assets-gfprod.imgix.net/images/capterra/og_logo-e5a8c001ed0bd1bb922639230fcea71a.png?auto=format%2Cenhance%2Ccompress',
    },
];

export default function ReviewIframeOptimized({ reviewData, variant }) {
    const isPricing = variant === 'pricing';
    const [selectedFilter, setSelectedFilter] = useState('All');

    const selectedFilterObj = selectedFilter ? filters.find((f) => f.id === selectedFilter) : null;

    const matchesFilter = (item) => {
        if (!selectedFilter || !selectedFilterObj || selectedFilterObj.id === 'All') return true;

        return selectedFilterObj.id === item.name?.toLowerCase();
    };

    if (isPricing) {
        return (
            <div className="bg-[#f9f6f1]">
                <div className="iframe-main-wrapper py-20 relative container">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
                            Real teams. Real results.
                            <br />
                            Real <span className="text-red-800">automation impact.</span>
                        </h2>
                        <ReviewFilters
                            filters={filters}
                            onSelect={setSelectedFilter}
                            selectedFilter={selectedFilter}
                            variant="pricing"
                        />
                    </div>
                    <TestimonialsPricingCarousel reviewData={reviewData} matchesFilter={matchesFilter} />
                </div>
            </div>
        );
    }

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
