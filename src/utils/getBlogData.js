export async function getBlogs(tag) {
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
        console.error('Error fetching blog data:', error);
        return [];
    }
}

export async function getBlogData({ tag1, tag2 }) {
    const MIN_BLOGS = 3;
    const MAX_BLOGS = 6;
    const DEFAULT_TAG = 'index';

    async function ensureMinimumBlogs(currentBlogs, minCount) {
        if (currentBlogs.length >= minCount) {
            return currentBlogs;
        }

        const remainingCount = minCount - currentBlogs.length;
        const additionalBlogs = await getBlogs(DEFAULT_TAG);
        return [...currentBlogs, ...additionalBlogs.slice(0, remainingCount)];
    }

    const tag1Blogs = await getBlogs(tag1);
    let blogs = [];

    if (!tag2) {
        blogs = tag1Blogs;
    } else {
        const tag2Blogs = await getBlogs(tag2);
        const tag1BlogIds = new Set(tag1Blogs.map((blog) => blog.rowid));
        const uniqueTag2Blogs = tag2Blogs.filter((blog) => !tag1BlogIds.has(blog.rowid));

        blogs = [...tag1Blogs, ...uniqueTag2Blogs];
    }

    blogs = await ensureMinimumBlogs(blogs, MIN_BLOGS);
    return blogs.slice(0, MAX_BLOGS);
}
