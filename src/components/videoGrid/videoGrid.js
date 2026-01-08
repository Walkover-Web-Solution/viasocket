import { useRef, useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const VideoGrid = ({ videoData, appOneName, appTwoName, showHeading = true }) => {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const isScrollable = (videoData?.length || 0) > 1;

    const scrollByAmount = (dir = 1) => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = Math.max(el.clientWidth * 0.8, 300) * dir;
        el.scrollBy({ left: amount, behavior: 'smooth' });
    };

    const updateActiveByCenter = () => {
        const el = scrollRef.current;
        if (!el) return;
        const children = Array.from(el.children);
        const center = el.scrollLeft + el.clientWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        children.forEach((child, idx) => {
            const childCenter = child.offsetLeft + child.clientWidth / 2;
            const dist = Math.abs(childCenter - center);
            if (dist < minDist) {
                minDist = dist;
                closest = idx;
            }
        });
        setActiveIndex(closest);
    };

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        updateActiveByCenter();
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        updateActiveByCenter();
    }, [videoData]);

    const scrollToIndex = (idx) => {
        const el = scrollRef.current;
        if (!el) return;
        const child = el.children[idx];
        if (!child) return;
        const left = child.offsetLeft + child.clientWidth / 2 - el.clientWidth / 2;
        el.scrollTo({ left, behavior: 'smooth' });
        setActiveIndex(idx);
    };

    useEffect(() => {
        // Start from index 1 so the first item is partially visible on the left
        if (videoData && videoData.length > 2) {
            requestAnimationFrame(() => {
                scrollToIndex(1);
            });
        }
    }, []);
    return (
        <div className="flex flex-col gap-8">
            <div className='container'>{showHeading && <h2 className="h2">Step by step guides to integrate {appOneName} {appTwoName ? 'and' : ''} {appTwoName}</h2>}</div>
            <div className='px-6 md:px-12 relative'>
                {isScrollable && (
                    <>
                        <button
                            aria-label="Scroll left"
                            onClick={() => scrollByAmount(-1)}
                            className="hidden sm:flex items-center justify-center absolute left-[5%] top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-white rounded-full border"
                        >
                            <IoIosArrowBack size={24} />
                        </button>
                        <button
                            aria-label="Scroll right"
                            onClick={() => scrollByAmount(1)}
                            className="hidden sm:flex items-center justify-center absolute right-[5%] top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-white rounded-full border"
                        >
                            <IoIosArrowForward size={24} />
                        </button>
                    </>
                )}
                <div
                    ref={scrollRef}
                    className={`flex items-stretch gap-0 ${isScrollable ? 'overflow-x-auto scroll-smooth snap-x snap-mandatory pr-2' : ''}`}
                    style={isScrollable ? { scrollbarWidth: 'none' } : undefined}
                >
                    {videoData?.map((video, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={index}
                                className={`snap-center shrink-0 px-1 sm:px-2 transition-transform duration-300 ease-out`}
                                style={{ minWidth: videoData.length === 1 ? '100%' : '75%' }}
                            >
                                <div className={`border overflow-hidden transition-all duration-300 ${isActive ? 'scale-100' : 'scale-90 opacity-80'}`}>
                                    <iframe
                                        className="w-full aspect-video border"
                                        src={video.links}
                                        title={`YouTube video player ${index + 1}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                {isScrollable && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {videoData.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Go to video ${i + 1}`}
                                onClick={() => scrollToIndex(i)}
                                className={`h-2.5 w-2.5 rounded-full transition-colors ${activeIndex === i ? 'bg-accent' : 'bg-gray-300 hover:bg-gray-400'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoGrid;
