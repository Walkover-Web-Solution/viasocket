import React from 'react';

const VideoGrid = () => {
    const videoUrls = [
        "https://www.youtube.com/embed/iilzMN13lbI?si=_nWdqjb2sjx7qLmZ",
        "https://www.youtube.com/embed/iilzMN13lbI?si=_nWdqjb2sjx7qLmZ",
        "https://www.youtube.com/embed/iilzMN13lbI?si=_nWdqjb2sjx7qLmZ",
        "https://www.youtube.com/embed/iilzMN13lbI?si=_nWdqjb2sjx7qLmZ",
        "https://www.youtube.com/embed/iilzMN13lbI?si=_nWdqjb2sjx7qLmZ",
        "https://www.youtube.com/embed/iilzMN13lbI?si=_nWdqjb2sjx7qLmZ"
    ];

    return (
        <div className='flex flex-col gap-8'>
            <h2 className='h2'>Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videoUrls.map((url, index) => (
                    <iframe
                        key={index}
                        className='h-[400px]'
                        width="100%"
                        src={url}
                        title={`YouTube video player ${index}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                ))}
            </div>
        </div>
    );
};

export default VideoGrid;
