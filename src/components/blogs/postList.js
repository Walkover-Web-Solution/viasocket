import React from "react";
import PostItem from "./postItem";
// import TagLink from "./tagLink";
import Pagination from "./pagination";
// import TagButton from "./tagButton";

export default function PostList({ posts, tags, pagination }) {
  return (
    <div className="blog">
      <div className={"blog-home-container"}>
        <div className={"posts"}>
          <div className={"post-list"}>
            {posts?.map((it, i) => (
              <PostItem key={i} post={it} />
            ))}
          </div>
          <Pagination
            current={pagination.current}
            pages={pagination.pages}
            link={{
              href: (page) => (page === 1 ? "/blog" : "/blog/page/[page]"),
              as: (page) => (page === 1 ? null : "/blog/page/" + page),
            }}
          />
        </div>
      </div>
    </div>
  );
}
