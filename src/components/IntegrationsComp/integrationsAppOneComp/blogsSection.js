'use client';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { shiftColor } from "./shared";

// ─── Blog Grid Card ──────────────────────────────────────────────────
function BlogGridCard({ blog }) {
  return (
    <Link
      href={`https://viasocket.com/blog/${blog?.slug}`}
      target="_blank"
      className="blog-card cursor-pointer relative overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-[180px]">
        <Image
          alt={blog?.title || 'Blog'}
          src={blog?.image || 'https://placehold.co/400x180'}
          width={400}
          height={180}
          className="blog-thumb absolute inset-0 w-full h-full object-cover"
        />
        <div className="blog-thumb-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="blog-card-content">
        <h4 className="card-title-xs blog-card-title">
          {blog?.title}
        </h4>
        <p className="text-xs blog-card-desc">{blog?.description}</p>
        <div className="hover-arrow-cta blog-card-cta">
          Read article
          <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  );
}

// ─── Blogs Section ───────────────────────────────────────────────────
export default function BlogsSection({ brandColor, blogsData }) {
  const barFrom = brandColor || "#2563eb";
  const barTo = brandColor ? shiftColor(brandColor, 60) : "#2563eb";

  const blogs = Array.isArray(blogsData) ? blogsData.slice(0, 4) : [];

  if (blogs.length === 0) return null;

  return (
    <section
      className="section"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div
            className="accent-bar rounded-sm mb-4"
            style={{ background: `linear-gradient(90deg, ${barFrom}, ${barTo})` }}
          />
          <h2 className="heading2">Guides & Resources</h2>
          <p className="sub-heading2 mt-2 max-w-lg">
            Deep dives and tutorials to get the most out of your Google Sheets automations.
          </p>
        </div>
        <Link href="/blog" target="_blank" className="primary-button shrink-0 self-start sm:self-auto no-underline">
          All guides
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {blogs.map((blog) => (
          <BlogGridCard key={blog?.slug || blog?.title} blog={blog} />
        ))}
      </div>
    </section>
  );
}

