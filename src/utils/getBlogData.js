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
    let blogs = [];

    const tag1Blogs = await getBlogs(tag1);

    if (!tag2) {
        if (tag1Blogs?.length < 3) {
            const remainingBlogs = 3 - tag1Blogs.length;
            const additionalBlogs = await getBlogs('index');
            blogs = [...tag1Blogs, ...additionalBlogs?.slice(0, remainingBlogs)];
        } else {
            blogs = tag1Blogs;
        }
    } else {
        const tag2Blogs = await getBlogs(tag2);

        const uniqueTag1Blogs = tag1Blogs.filter((blog1) => !tag2Blogs.some((blog2) => blog2.rowid === blog1.rowid));
        const uniqueTag2Blogs = tag2Blogs.filter((blog2) => !tag1Blogs.some((blog1) => blog1.rowid === blog2.rowid));

        blogs = [...uniqueTag1Blogs, ...uniqueTag2Blogs];

        if (blogs.length < 3) {
            const remainingBlogs = 6 - blogs.length;
            const additionalBlogs = await getBlogs('index');
            blogs = [...blogs, ...additionalBlogs?.slice(0, remainingBlogs)];
        }
    }

    return blogs?.slice(0, 6);
}
