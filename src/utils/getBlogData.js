import { sendErrorMessage } from './SendErrorMessage';

export async function getBlogs(tag, req) {
    try {
        const response = await fetch(
            `https://table-api.viasocket.com/66029bf861a15927654de175/tblngzrs5?filter=tags @> ARRAY['${tag}']`,
            {
                method: 'GET',
                headers: {
                    'auth-key': process.env.NEXT_PUBLIC_BLOG_DB_KEY,
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
        sendErrorMessage({ error, req });
        return [];
    }
}

export async function getBlogData({ tag1, tag2 }, req) {
    const MIN_BLOGS = 3;
    const MAX_BLOGS = 6;
    const DEFAULT_TAG = 'index';

    const tag1Blogs = await getBlogs(tag1, req);
    let blogs = [...tag1Blogs];

    if (tag2) {
        const tag2Blogs = await getBlogs(tag2, req);
        const tag1Ids = new Set(tag1Blogs.map((blog) => blog.rowid));
        const nonDuplicateTag2Blogs = tag2Blogs.filter((blog) => !tag1Ids.has(blog.rowid));
        blogs = blogs.concat(nonDuplicateTag2Blogs);
    }

    if (blogs.length < MIN_BLOGS) {
        const additionalBlogs = await getBlogs(DEFAULT_TAG, req);
        const needed = MIN_BLOGS - blogs.length;
        blogs = blogs.concat(additionalBlogs.slice(0, needed));
    }

    return blogs.slice(0, MAX_BLOGS);
}
