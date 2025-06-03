import { getVideos } from './axiosCalls';

export async function getVideoData({ tag1, tag2 }, pageUrl) {
    const tag1Videos = await getVideos(tag1, pageUrl);
    let videos = [...tag1Videos];

    if (tag2) {
        const tag2Videos = await getVideos(tag2, pageUrl);
        videos = tag1Videos.filter((video) => tag2Videos.some((v) => v.rowid === video.rowid));
    }

    return videos.slice(0, 6);
}
