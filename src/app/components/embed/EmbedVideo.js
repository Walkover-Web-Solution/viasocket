'use client';
import { useEffect, useRef, useState } from 'react';

const VIDEO_ID = '1ofrHGW9I7Q';

export default function EmbedVideo() {
    const containerRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="container border p-6 bg-white">
            <div className="border aspect-video w-full overflow-hidden">
                {inView ? (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&playsinline=1&rel=0`}
                        title="viaSocket Embed"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                ) : (
                    <img
                        src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                        alt="viaSocket Embed"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
        </div>
    );
}
