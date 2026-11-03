import BlogsPage from '@/components/IntegrationsComp/addToProduct/BlogsPage';
import { BLOGS_COPY } from '@/components/IntegrationsComp/addToProduct/copy';
import { BLOGS_URL, getAllBlogs } from '../lib/blogs';
import { ogImages, twitterImages } from '@/app/lib/share-image';

export const runtime = 'edge';

export const metadata = {
    title: BLOGS_COPY.metaTitle,
    description: BLOGS_COPY.metaDesc,
    alternates: { canonical: BLOGS_URL },
    openGraph: {
        images: ogImages('/blogs'),
        title: BLOGS_COPY.metaTitle,
        description: BLOGS_COPY.metaDesc,
        url: BLOGS_URL,
        siteName: 'viaSocket',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        images: twitterImages('/blogs'),
        title: BLOGS_COPY.metaTitle,
        description: BLOGS_COPY.metaDesc,
    },
};

export default function Blogs() {
    return <BlogsPage posts={getAllBlogs()} />;
}
