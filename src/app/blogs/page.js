import BlogsPage from '@/components/IntegrationsComp/addToProduct/BlogsPage';
import { BLOGS_COPY } from '@/components/IntegrationsComp/addToProduct/copy';
import { BLOGS_URL, getAllBlogs } from '../lib/blogs';

export const runtime = 'edge';

export const metadata = {
    title: BLOGS_COPY.metaTitle,
    description: BLOGS_COPY.metaDesc,
    alternates: { canonical: BLOGS_URL },
    openGraph: {
        title: BLOGS_COPY.metaTitle,
        description: BLOGS_COPY.metaDesc,
        url: BLOGS_URL,
        siteName: 'viaSocket',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: BLOGS_COPY.metaTitle,
        description: BLOGS_COPY.metaDesc,
    },
};

export default function Blogs() {
    return <BlogsPage posts={getAllBlogs()} />;
}
