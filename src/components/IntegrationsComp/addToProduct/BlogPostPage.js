import s from './addToProduct.module.scss';
import b from './blogs.module.scss';
import { BLOGS_COPY as C } from './copy';
import { BlogFrame, PostCard } from './BlogsPage';
import { Chevron } from './icons';
import ShareButtons from './ShareButtons';
import PostToc from './PostToc';
import { BLOGS_URL, formatBlogDate } from '@/app/lib/blogs';

// /blogs/{slug}: one post, then a few more to read.

function PostJsonLd({ post }) {
    const url = `${BLOGS_URL}/${post.slug}`;
    const data = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description || undefined,
        datePublished: post.date,
        author: post.author
            ? { '@type': 'Person', name: post.author, image: post.authorImage ? new URL(post.authorImage, 'https://viasocket.com').href : undefined }
            : { '@type': 'Organization', name: 'viaSocket' },
        publisher: { '@type': 'Organization', name: 'viaSocket', logo: { '@type': 'ImageObject', url: 'https://viasocket.com/assets/brand/logo.svg' } },
        image: post.image ? new URL(post.image, 'https://viasocket.com').href : undefined,
        mainEntityOfPage: url,
        url,
    };
    const crumbs = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://viasocket.com' },
            { '@type': 'ListItem', position: 2, name: C.eyebrow, item: BLOGS_URL },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
    };
    const faq = post.faqs?.length && {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
    return (
        <>
            {[data, crumbs, faq].filter(Boolean).map((d) => (
                <script key={d['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
            ))}
        </>
    );
}

export default function BlogPostPage({ post, related }) {
    const url = `${BLOGS_URL}/${post.slug}`;
    const hasToc = post.toc?.length > 1;
    return (
        <BlogFrame>
            <PostJsonLd post={post} />
            <article className={`${s.wrap} ${b.body}`}>
                {hasToc && (
                    <aside className={b.side}>
                        <PostToc toc={post.toc} title={C.tocTitle} variant="side" />
                    </aside>
                )}
                <div className={b.main}>
                    <header className={b['art-head']}>
                        <nav aria-label="Breadcrumb">
                            <ol className={`${s.crumbs} ${b.crumbs}`}>
                                <li>
                                    <a href="/">Home</a>
                                    <Chevron />
                                </li>
                                <li>
                                    <a href="/blogs">{C.eyebrow}</a>
                                    <Chevron />
                                </li>
                                <li aria-current="page">{post.title}</li>
                            </ol>
                        </nav>
                        <h1>{post.title}</h1>
                        <div className={b['art-bar']}>
                            <p className={b['art-meta']}>
                                {post.author && (
                                    <span className={b.author}>
                                        {post.authorImage && <img src={post.authorImage} alt="" width={28} height={28} />}
                                        By {post.author}
                                    </span>
                                )}
                                {post.category && <span>{post.category}</span>}
                                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                                <span>{post.minutes} min read</span>
                            </p>
                            <ShareButtons url={url} title={post.title} />
                        </div>
                    </header>

                    {post.image && (
                        <div className={b.cover}>
                            <img src={post.image} alt="" />
                        </div>
                    )}

                    {hasToc && <PostToc toc={post.toc} title={C.tocTitle} variant="inline" />}
                    {/* Rendered from the post's Markdown by build-utilities/generate-blogs.js; raw HTML in a post is escaped there. */}
                    <div className={b.prose} dangerouslySetInnerHTML={{ __html: post.html }} />
                    <div className={b['art-end']}>
                        <ShareButtons url={url} title={post.title} label={C.shareLabel} />
                        <a className={s.ulink} href="/blogs">
                            ← {C.backLink}
                        </a>
                    </div>
                </div>
            </article>

            {related.length > 0 && (
                <section className={s.sec}>
                    <div className={s.wrap}>
                        <div className={s.sh}>
                            <h2 className={s.h2}>{C.moreTitle}</h2>
                        </div>
                        <div className={s.posts}>
                            {related.map((p) => (
                                <PostCard key={p.slug} post={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </BlogFrame>
    );
}
