import { PostExcerpt } from "@/components/PostExcerpt";
import { Pagination } from "@/components/Pagination";
import type { PostMeta } from "@/lib/posts";

export function PostList({
  title,
  posts,
  currentPage,
  totalPages,
  baseUrl,
}: {
  title: string;
  posts: PostMeta[];
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}) {
  return (
    <div className="max-w-[720px] mx-auto px-[4.5rem] max-md:px-6 py-16 max-md:py-10">
      <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-8">{title}</h1>
      {posts.length === 0 ? (
        <p className="text-[var(--text-muted)]">No posts found.</p>
      ) : (
        <>
          <div>
            {posts.map((post) => (
              <PostExcerpt key={post.slug} post={post} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={baseUrl}
          />
        </>
      )}
    </div>
  );
}
