import { getVideos } from './axiosCalls';

export async function getVideoData({ tag1, tag2 }, pageUrl) {
    const allVideos = await getVideos(pageUrl);

    const matchTag = (video, tag) => Array.isArray(video?.tags) && video?.tags?.includes(tag);

    let videos = [];

    if (tag1 && tag2) {
        const tag1Videos = allVideos?.filter((video) => matchTag(video, tag1));
        const tag1Ids = new Set(tag1Videos?.map((video) => video.rowid));
        const tag2Videos = allVideos?.filter((video) => matchTag(video, tag2) && !tag1Ids?.has(video.rowid));
        videos = [...tag1Videos, ...tag2Videos];
    } else if (tag1 || tag2) {
        const tag = tag1 || tag2;
        videos = allVideos?.filter((video) => matchTag(video, tag));
    }

    return videos?.slice(0, 6);
}
