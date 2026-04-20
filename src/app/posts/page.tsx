import type { Metadata } from "next";
import { paginatedIndex } from "@/lib/posts";
import { PostList } from "./_components/post-list";

export const metadata: Metadata = { title: "Blog" };

export default function PostsIndex() {
  const { posts, totalPages, currentPage } = paginatedIndex(1);

  return (
    <PostList
      title="Blog"
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl="/posts"
    />
  );
}
