import data from '@/data/blogs.json';

// The /blogs posts, newest first. Written in _posts/blogs; bundled by build-utilities/generate-blogs.js.

export const BLOGS_URL = 'https://viasocket.com/blogs';

export function getAllBlogs() {
    return data.posts;
}

export function getBlog(slug) {
    return data.posts.find((p) => p.slug === slug) || null;
}

/** Up to `limit` other posts, the same category first. */
export function getRelatedBlogs(post, limit = 3) {
    const others = data.posts.filter((p) => p.slug !== post.slug);
    const same = others.filter((p) => post.category && p.category === post.category);
    return [...same, ...others.filter((p) => !same.includes(p))].slice(0, limit);
}

/** The newest `limit` posts, for the "Learn more" section on other pages. */
export function getLatestBlogs(limit = 3) {
    return data.posts.slice(0, limit);
}

export function formatBlogDate(date) {
    const t = Date.parse(date);
    return Number.isNaN(t) ? '' : new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
