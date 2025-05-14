const VideoGrid = ({ videoData }) => {
    const getGridClass = () => {
        switch (videoData.length) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-1 sm:grid-cols-2';
            default:
                return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
        }
    };
    return (
        <div className="flex flex-col gap-8">
            <h2 className="h2">Watch Integrations In Action</h2>
            <div className={`grid ${getGridClass()} gap-4`}>
                {videoData.map((video, index) => (
                    <div key={index} className={`w-full ${videoData.length === 1 ? 'col-span-1' : ''}`}>
                        <iframe
                            className="w-full aspect-video"
                            src={video.links}
                            title={`YouTube video player ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoGrid;
