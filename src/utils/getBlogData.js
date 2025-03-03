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

export async function getBlogData(tag) {
    let blogs = [];
    const getBlogsRecursive = async (tag) => {
        const data = await getBlogs(tag);
        if (data?.length < 3) {
            const remainingBlogs = 3 - data.length;
            const additionalBlogs = await getBlogs('index');
            blogs = [...blogs, ...data, ...additionalBlogs?.slice(0, remainingBlogs)];
        } else {
            blogs = data;
        }
    };

    await getBlogsRecursive(tag);
    return blogs?.slice(0, 6);
}
