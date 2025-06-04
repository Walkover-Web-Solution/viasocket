import { getBlogs } from './axiosCalls';

export async function getBlogData({ tag1, tag2 }, pageUrl) {
    const MIN_BLOGS = 3;
    const MAX_BLOGS = 6;
    const DEFAULT_TAG = 'index';

    const allBlogs = await getBlogs(pageUrl);

    const matchTag = (blog, tag) => Array.isArray(blog?.tags) && blog?.tags?.includes(tag);

    let blogs = [];

    if (tag1 && tag2) {
        const tag1Blogs = allBlogs?.filter((blog) => matchTag(blog, tag1));
        const tag1Ids = new Set(tag1Blogs?.map((blog) => blog.rowid));
        const tag2Blogs = allBlogs?.filter((blog) => matchTag(blog, tag2) && !tag1Ids?.has(blog.rowid));
        blogs = [...tag1Blogs, ...tag2Blogs];
    } else if (tag1 || tag2) {
        const tag = tag1 || tag2;
        blogs = allBlogs?.filter((blog) => matchTag(blog, tag));
    }

    if (blogs.length < MIN_BLOGS) {
        const blogIds = new Set(blogs?.map((blog) => blog.rowid));
        const defaultTagBlogs = allBlogs?.filter((blog) => matchTag(blog, DEFAULT_TAG) && !blogIds?.has(blog.rowid));
        blogs = blogs?.concat(defaultTagBlogs?.slice(0, MIN_BLOGS - blogs.length));
    }

    return blogs?.slice(0, MAX_BLOGS);
}
