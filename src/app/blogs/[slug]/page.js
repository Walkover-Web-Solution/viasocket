import { notFound } from 'next/navigation';
import BlogPostPage from '@/components/IntegrationsComp/addToProduct/BlogPostPage';
import { BLOGS_URL, getBlog, getRelatedBlogs } from '../../lib/blogs';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getBlog(slug);
    if (!post) return { title: 'Post not found · viaSocket' };

    const url = `${BLOGS_URL}/${post.slug}`;
    const title = `${post.title} · viaSocket`;
    const image = post.image ? new URL(post.image, 'https://viasocket.com').href : null; // pragma: allowlist secret
    return {
        title,
        description: post.description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description: post.description,
            url,
            siteName: 'viaSocket',
            type: 'article',
            publishedTime: post.date,
            authors: post.author ? [post.author] : undefined,
            images: ogImages(`/blogs/${post.slug}`, image),
        },
        twitter: { card: 'summary_large_image', title, description: post.description, images: twitterImages(`/blogs/${post.slug}`, image) },
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = getBlog(slug);
    if (!post) notFound();
    return <BlogPostPage post={post} related={getRelatedBlogs(post)} />;
}
