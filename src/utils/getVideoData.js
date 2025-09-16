import { getVideos } from './axiosCalls';

export async function getVideoData(tags, pageUrl) {
    const allVideos = await getVideos(pageUrl);

    const matchTag = (video, tag) => Array.isArray(video?.tags) && video?.tags?.includes(tag);

    let videos = [];
    const processedIds = new Set();

    // Handle both array and object formats for backward compatibility
    let tagArray = [];
    if (Array.isArray(tags)) {
        tagArray = tags.filter(tag => tag); // Remove falsy values
    } else if (tags && typeof tags === 'object') {
        // Support legacy { tag1, tag2 } format
        const { tag1, tag2 } = tags;
        tagArray = [tag1, tag2].filter(tag => tag);
    } else if (tags) {
        // Single tag as string
        tagArray = [tags];
    }

    // Process each tag and collect videos without duplicates
    for (const tag of tagArray) {
        if (tag) {
            const tagVideos = allVideos?.filter((video) => 
                matchTag(video, tag) && !processedIds.has(video.rowid)
            );
            
            tagVideos?.forEach(video => {
                videos.push(video);
                processedIds.add(video.rowid);
            });
        }
    }

    return videos?.slice(0, 6);
}
