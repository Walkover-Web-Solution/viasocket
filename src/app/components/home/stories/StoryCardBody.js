import { memo } from 'react';
import { ChevronRight } from 'lucide-react';

const clampedHeadlineStyle = {
    color: 'rgba(0,0,0,0.85)',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
};

const StoryCardBody = memo(function StoryCardBody({ headline, teaser, featured }) {
    return (
        <div className={`flex flex-col flex-1 min-w-0 ${featured ? 'p-8' : 'p-4'}`}>
            <h3
                className={`font-semibold leading-snug ${featured ? 'text-xl mb-3' : 'text-[14px] mb-2'}`}
                style={featured ? { color: 'rgba(0,0,0,0.85)' } : clampedHeadlineStyle}
            >
                {headline}
            </h3>
            {featured && teaser && (
                <p className="text-[14px] leading-[1.75] mb-6" style={{ color: 'rgba(0,0,0,0.50)' }}>
                    {teaser}
                </p>
            )}
            <div className="mt-auto">
                <span
                    className={`font-semibold flex items-center gap-1 ${featured ? 'text-[14px]' : 'text-[12px]'}`}
                    style={{ color: 'var(--accent, #8B1A1A)' }}
                >
                    Read the full story
                    <ChevronRight
                        size={featured ? 16 : 14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </span>
            </div>
        </div>
    );
});

export default StoryCardBody;
