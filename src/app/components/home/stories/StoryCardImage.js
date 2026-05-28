import { memo } from 'react';
import Image from 'next/image';

const StoryCardImage = memo(function StoryCardImage({ image, headline, tag, featured }) {
    const height = featured ? 240 : 140;
    const sizes = featured ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 42vw';
    const overlayHeight = featured ? 'h-16' : 'h-12';
    const tagPosition = featured ? 'bottom-5 left-6 text-[11px]' : 'bottom-3 left-4 text-[9px]';
    const overlayOpacity = featured ? 0.55 : 0.5;

    return (
        <div className="relative flex-shrink-0 overflow-hidden" style={{ height }}>
            {image && (
                <Image
                    src={image}
                    alt={headline}
                    fill
                    sizes={sizes}
                    className="object-cover block"
                />
            )}
            <div
                className={`absolute bottom-0 left-0 right-0 pointer-events-none ${overlayHeight}`}
                style={{
                    background: `linear-gradient(to top, rgba(0,0,0,${overlayOpacity}), transparent)`,
                }}
            />
            <span
                className={`absolute z-10 font-semibold uppercase tracking-widest ${tagPosition}`}
                style={{ color: 'rgba(255,255,255,0.90)' }}
            >
                {tag}
            </span>
        </div>
    );
});

export default StoryCardImage;
