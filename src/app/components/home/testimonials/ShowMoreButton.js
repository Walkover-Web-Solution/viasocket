'use client';

import { memo } from 'react';
import { ArrowRight, ChevronUp } from 'lucide-react';

const ShowMoreButton = memo(function ShowMoreButton({ showAll, onToggle }) {
    return (
        <div className="flex justify-end mb-8">
            <button onClick={onToggle} className="btn btn-outline">
                {showAll ? (
                    <>
                        Show less <ChevronUp className="w-4 h-4" />
                    </>
                ) : (
                    <>
                        See all reviews <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>
        </div>
    );
});

export default ShowMoreButton;
