'use client';

import { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const navBtnClass =
    'w-9 h-9 flex items-center justify-center border custom-border rounded-full transition-all duration-200 hover:border-accent hover:text-accent disabled:opacity-25 disabled:cursor-not-allowed';

const PageDot = memo(function PageDot({ active, onClick, index }) {
    return (
        <button
            onClick={onClick}
            aria-label={`Page ${index + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
                height: 6,
                width: active ? 20 : 6,
                background: active ? 'var(--accent, #8B1A1A)' : 'rgba(0,0,0,0.15)',
            }}
        />
    );
});

const StoriesPagination = memo(function StoriesPagination({
    totalPages,
    currentPage,
    onPrev,
    onNext,
    onSelect,
}) {
    if (totalPages <= 1) return null;

    const isFirst = currentPage === 0;
    const isLast = currentPage === totalPages - 1;

    return (
        <div className="flex justify-end items-center gap-3 mt-6">
            <button
                onClick={onPrev}
                disabled={isFirst}
                aria-label="Previous stories"
                className={navBtnClass}
            >
                <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => (
                    <PageDot
                        key={i}
                        index={i}
                        active={currentPage === i}
                        onClick={() => onSelect(i)}
                    />
                ))}
            </div>

            <button
                onClick={onNext}
                disabled={isLast}
                aria-label="Next stories"
                className={navBtnClass}
            >
                <ChevronRight size={14} />
            </button>
        </div>
    );
});

export default StoriesPagination;
