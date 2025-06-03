import { getBlogs } from './axiosCalls';

export async function getBlogData({ tag1, tag2 }, pageUrl) {
    const MIN_BLOGS = 3;
    const MAX_BLOGS = 6;
    const DEFAULT_TAG = 'index';

    const tag1Blogs = await getBlogs(tag1, pageUrl);
    let blogs = [...tag1Blogs];

    if (tag2) {
        const tag2Blogs = await getBlogs(tag2, pageUrl);
        const tag1Ids = new Set(tag1Blogs.map((blog) => blog.rowid));
        const nonDuplicateTag2Blogs = tag2Blogs.filter((blog) => !tag1Ids.has(blog.rowid));
        blogs = blogs.concat(nonDuplicateTag2Blogs);
    }

    if (blogs.length < MIN_BLOGS) {
        const additionalBlogs = await getBlogs(DEFAULT_TAG, pageUrl);
        const needed = MIN_BLOGS - blogs.length;
        blogs = blogs.concat(additionalBlogs.slice(0, needed));
    }

    return blogs.slice(0, MAX_BLOGS);
}
