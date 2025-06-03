import { sendErrorMessage } from './SendErrorMessage';

export async function getVideos(tag, pageUrl) {
    try {
        const response = await fetch(
            `https://table-api.viasocket.com/65d2ed33fa9d1a94a5224235/tblh3g587?filter=tags @> ARRAY['${tag}']`,
            {
                method: 'GET',
                headers: {
                    'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        return data?.data?.rows || [];
    } catch (error) {
        sendErrorMessage({
            error,
            pageUrl,
            source: `https://table-api.viasocket.com/65d2ed33fa9d1a94a5224235/tblh3g587?filter=tags @> ARRAY['${tag}']`,
        });
        return [];
    }
}

export async function getVideoData({ tag1, tag2 }, pageUrl) {
    const tag1Videos = await getVideos(tag1, pageUrl);
    let videos = [...tag1Videos];

    if (tag2) {
        const tag2Videos = await getVideos(tag2, pageUrl);
        videos = tag1Videos.filter((video) => tag2Videos.some((v) => v.rowid === video.rowid));
    }

    return videos.slice(0, 6);
}
