import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostExcerpt({ post }: { post: PostMeta }) {
  const date = new Date(post.date + "T12:00");
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-6 border-b border-[var(--border-subtle)] last:border-b-0">
      <div className="flex items-center gap-3 mb-2">
        <time className="text-xs text-[var(--text-muted)] tracking-wide">
          {formatted}
        </time>
        {post.categories[0] && (
          <>
            <span className="text-[var(--text-muted)]">&middot;</span>
            <Link
              href={`/posts/category/${encodeURIComponent(post.categories[0].toLowerCase())}`}
              className="text-xs text-[var(--accent)] tracking-wider uppercase no-underline hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity"
            >
              {post.categories[0]}
            </Link>
          </>
        )}
      </div>
      <Link
        href={`/posts/${post.year}/${post.month}/${post.slug}`}
        className="text-lg font-medium text-[var(--text-primary)] no-underline hover:text-[var(--accent)] transition-colors"
      >
        {post.title}
      </Link>
      {post.excerpt && (
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2 font-light">
          {post.excerpt}
        </p>
      )}
    </article>
  );
}
