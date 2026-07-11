'use client';
import { useRef, useState, useEffect } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';

function getYouTubeId(url) {
    if (!url) return null;
    const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
    if (embedMatch) return embedMatch[1];
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return watchMatch[1];
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return shortMatch[1];
    return null;
}

const VideoGrid = ({ videoData, appOneName, appTwoName, showHeading = true }) => {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [imgErrors, setImgErrors] = useState({});

    if (!videoData?.length) return null;

    const scrollToIndex = (idx) => {
        const el = scrollRef.current;
        if (!el) return;
        const child = el.children[idx];
        if (!child) return;
        el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: 'smooth' });
        setActiveIndex(idx);
    };

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const children = Array.from(el.children);
        const scrollLeft = el.scrollLeft;
        let closest = 0;
        let minDist = Infinity;
        children.forEach((child, idx) => {
            const dist = Math.abs(child.offsetLeft - el.offsetLeft - scrollLeft);
            if (dist < minDist) {
                minDist = dist;
                closest = idx;
            }
        });
        setActiveIndex(closest);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="container flex flex-col gap-8">
            {showHeading && (
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">
                            Watch &amp; learn
                        </span>
                        <h2 className="h2">Learn by building automations</h2>
                        <p className="text-gray-500 text-base whitespace-nowrap">
                            Step-by-step video tutorials to help you connect apps, automate workflows, and save time.
                        </p>
                    </div>
                    <a
                        href="https://www.youtube.com/@viasocket"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-accent transition-colors mt-1 whitespace-nowrap"
                    >
                        View all tutorials <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            )}

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {videoData.map((video, index) => {
                        const videoId = getYouTubeId(video.links);
                        const thumbnail = videoId
                            ? imgErrors[index]
                                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                                : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                            : null;
                        const youtubeLink = videoId ? `https://www.youtube.com/watch?v=${videoId}` : video.links;

                        return (
                            <a
                                key={video.rowid || index}
                                href={youtubeLink}
                                rel="noopener noreferrer"
                                className="snap-start shrink-0 flex flex-col rounded-2xl overflow-hidden bg-white border border-[#ECE8E2] hover:shadow-md transition-shadow group"
                                style={{
                                    width: videoData.length === 1 ? '100%' : 'calc(33.333% - 14px)',
                                    minWidth: '260px',
                                }}
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video w-full overflow-hidden">
                                    {thumbnail ? (
                                        <Image
                                            src={thumbnail}
                                            alt={video.title || video.subtitle || `Video ${index + 1}`}
                                            width={480}
                                            height={270}
                                            className="w-full h-full object-cover"
                                            onError={() => setImgErrors((prev) => ({ ...prev, [index]: true }))}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200" />
                                    )}
                                    {/* Play button overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                                            <Play className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" />
                                        </div>
                                    </div>
                                    {/* Duration badge */}
                                    {video.duration && (
                                        <span className="absolute bottom-2 left-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                                            {video.duration}
                                        </span>
                                    )}
                                </div>

                                {/* Card body */}
                                <div className="p-4 flex flex-col gap-1 flex-1 bg-[#FCFCFB]">
                                    {(video.title || video.subtitle) && (
                                        <p
                                            className="font-semibold text-sm line-clamp-2 flex-1"
                                            style={{ color: '#1A1A1A' }}
                                        >
                                            {video.title || video.subtitle}
                                        </p>
                                    )}
                                    <div className="flex items-end justify-between gap-2 mt-2">
                                        <p className="text-xs line-clamp-2">
                                            {video.description ||
                                                `Learn how to automate ${appOneName || ''}${appTwoName ? ` and ${appTwoName}` : ''} workflows.`}
                                        </p>
                                        <ChevronRight className="w-4 h-4 shrink-0" style={{ color: '#C54825' }} />
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {videoData.length > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {videoData.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Go to video ${i + 1}`}
                                onClick={() => scrollToIndex(i)}
                                className={`h-2 rounded-full transition-all duration-200 ${activeIndex === i ? 'w-6 bg-accent' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoGrid;
