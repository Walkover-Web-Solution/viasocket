'use client';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';

const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/embed\/|[?&]v=|youtu\.be\/)([^?&]+)/);
    return match?.[1] || null;
};

const VideoGrid = ({ videoData, appOneName, appTwoName, showHeading = true }) => {
    const scrollRef = useRef(null);
    const [imgErrors, setImgErrors] = useState({});
    const [playingIndex, setPlayingIndex] = useState(null);

    if (!videoData?.length) return null;

    const scrollByAmount = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        const card = el.children[0];
        const cardWidth = card ? card.getBoundingClientRect().width : el.clientWidth;
        const gap = 20; // matches gap-5
        el.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' });
    };

    return (
        <div className="container flex flex-col gap-8">
            {showHeading && (
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">
                            Watch &amp; learn
                        </span>
                        <h2 className="h2">Learn to build automation</h2>
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
                        const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/${imgErrors[index] ? 'hqdefault' : 'maxresdefault'}.jpg` : null;
                        const isPlaying = playingIndex === index;

                        return (
                            <div
                                key={video.rowid || index}
                                className="snap-start shrink-0 flex flex-col rounded-2xl overflow-hidden bg-white border border-[#ECE8E2] hover:shadow-md transition-shadow group"
                                style={{
                                    width: videoData.length === 1 ? '100%' : 'calc(33.333% - 14px)',
                                    minWidth: '260px',
                                }}
                            >
                                {/* Video/Thumbnail */}
                                <div className="relative aspect-video w-full overflow-hidden cursor-pointer" onClick={() => !isPlaying && setPlayingIndex(index)}>
                                    {isPlaying ? (
                                        <iframe
                                            className="w-full h-full"
                                            src={`${video.links}${video.links.includes('?') ? '&' : '?'}autoplay=1`}
                                            title={`YouTube video player ${index + 1}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <>
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
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                                                    <Play className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" />
                                                </div>
                                            </div>
                                            {/* Duration badge */}
                                            {video.duration && (
                                                <span className="absolute bottom-2 left-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded pointer-events-none">
                                                    {video.duration}
                                                </span>
                                            )}
                                        </>
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
                            </div>
                        );
                    })}
                </div>

                {videoData.length > 1 && (
                    <>
                        <button
                            aria-label="Scroll left"
                            onClick={() => scrollByAmount(-1)}
                            className="hidden sm:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-20 h-12 w-12 bg-white rounded-full shadow-xl hover:bg-black hover:scale-110 hover:shadow-2xl transition-all duration-300"
                        >
                            <ChevronLeft className="w-7 h-7 text-black" />
                        </button>
                        <button
                            aria-label="Scroll right"
                            onClick={() => scrollByAmount(1)}
                            className="hidden sm:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-20 h-12 w-12 bg-white rounded-full shadow-xl hover:bg-black hover:scale-110 hover:shadow-2xl transition-all duration-300"
                        >
                            <ChevronRight className="w-7 h-7 text-black" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoGrid;
