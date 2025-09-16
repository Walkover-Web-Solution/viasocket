import { getBlogs } from './axiosCalls';

export async function getBlogData(tags, pageUrl) {
    const MIN_BLOGS = 3;
    const MAX_BLOGS = 6;
    const DEFAULT_TAG = 'index';

    const allBlogs = await getBlogs(pageUrl);

    const matchTag = (blog, tag) => Array.isArray(blog?.tags) && blog?.tags?.includes(tag);

    let blogs = [];
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

    // Process each tag and collect blogs without duplicates
    for (const tag of tagArray) {
        if (tag) {
            const tagBlogs = allBlogs?.filter((blog) => 
                matchTag(blog, tag) && !processedIds.has(blog.rowid)
            );
            
            tagBlogs?.forEach(blog => {
                blogs.push(blog);
                processedIds.add(blog.rowid);
            });
        }
    }

    // If we don't have enough blogs, add some from the default tag
    if (blogs.length < MIN_BLOGS) {
        const defaultTagBlogs = allBlogs?.filter((blog) => 
            matchTag(blog, DEFAULT_TAG) && !processedIds.has(blog.rowid)
        );
        blogs = blogs?.concat(defaultTagBlogs?.slice(0, MIN_BLOGS - blogs.length));
    }

    return blogs?.slice(0, MAX_BLOGS);
}
