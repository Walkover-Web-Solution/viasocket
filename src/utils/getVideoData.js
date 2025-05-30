import { sendErrorMessage } from './SendErrorMessage';

export async function getVideos(tag) {
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
        sendErrorMessage({ error });
        return [];
    }
}

export async function getVideoData({ tag1, tag2 }) {
    const tag1Videos = await getVideos(tag1);
    let videos = [...tag1Videos];

    if (tag2) {
        const tag2Videos = await getVideos(tag2);
        videos = tag1Videos.filter((video) => tag2Videos.some((v) => v.rowid === video.rowid));
    }

    return videos.slice(0, 6);
}
