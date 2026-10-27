import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import s from './addToProduct.module.scss';
import b from './blogs.module.scss';
import { BASE_PROMPT, BLOGS_COPY as C } from './copy';
import { CopyPromptProvider } from './CopyPrompt';
import { SiteFooter, SiteHeader } from './SiteChrome';
import { formatBlogDate } from '@/app/lib/blogs';

// /blogs and /blogs/{slug} in the homepage design: the homepage header and footer, its tokens and square cards.

/** The homepage frame every blog page sits in. */
export function BlogFrame({ children }) {
    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            <CopyPromptProvider prompt={BASE_PROMPT}>
                <SiteHeader />
                <main>{children}</main>
                <SiteFooter />
            </CopyPromptProvider>
        </div>
    );
}

function Meta({ post }) {
    return (
        <span className={s['post-meta']}>
            {[post.category, formatBlogDate(post.date), `${post.minutes} min read`].filter(Boolean).join(' · ')}
        </span>
    );
}

function Byline({ post }) {
    return (
        <span className={`${b.by} ${b.author}`}>
            {post.authorImage && <img src={post.authorImage} alt="" width={24} height={24} loading="lazy" />}
            By {post.author}
        </span>
    );
}

/**
 * The post's cover: its image, or when it has none a drawn one (the viaSocket mark, a dot grid and the
 * post's topic) of the same size, so a row of cards lines up however many of them have an image.
 */
function PostCover({ post, className, lazy = true }) {
    if (post.image) return <img className={className} src={post.image} alt="" {...(lazy && { loading: 'lazy' })} />;
    const topic = post.category?.split(' — ').pop() || 'viaSocket Blog';
    return (
        <span className={`${className} ${b.ph}`} aria-hidden="true">
            <img className={b['ph-mark']} src="/new-home/assets/favicon.svg" alt="" width={26} height={26} />
            <span className={b['ph-tag']}>{topic}</span>
        </span>
    );
}

/** A post in a grid: on /blogs, and in "Learn more" on other pages. */
export function PostCard({ post }) {
    return (
        <a className={s.post} href={`/blogs/${post.slug}`}>
            <PostCover post={post} className={s['post-img']} />
            <span className={s['post-body']}>
                <Meta post={post} />
                <h3>{post.title}</h3>
                {post.description && <span className={b.excerpt}>{post.description}</span>}
                {post.author && <Byline post={post} />}
                <span className={s.go}>Read article →</span>
            </span>
        </a>
    );
}

/** The newest post, across the full width: text beside its cover. */
function Featured({ post }) {
    return (
        <a className={b.featured} href={`/blogs/${post.slug}`}>
            <PostCover post={post} className={b['f-cover']} lazy={false} />
            <span className={b['featured-body']}>
                <span className={s.eyebrow}>Latest</span>
                <h2>{post.title}</h2>
                {post.description && <p>{post.description}</p>}
                <span className={b['featured-foot']}>
                    <Meta post={post} />
                    {post.author && <Byline post={post} />}
                </span>
            </span>
        </a>
    );
}

export default function BlogsPage({ posts }) {
    const [first, ...rest] = posts;
    return (
        <BlogFrame>
            <section className={b.list}>
                <div className={s.wrap}>
                    {/* No visible title: the posts start right under the header. Kept for search engines and screen readers. */}
                    <h1 className={b['sr-only']}>{C.eyebrow}</h1>
                    {first ? (
                        <>
                            <Featured post={first} />
                            {rest.length > 0 && (
                                <div className={`${s.posts} ${b.grid}`}>
                                    {rest.map((p) => (
                                        <PostCard key={p.slug} post={p} />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={b.empty}>
                            <h2>{C.emptyTitle}</h2>
                            <p>{C.emptyText}</p>
                            <a className={s.ulink} href="/features">
                                {C.emptyLink}
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </BlogFrame>
    );
}
