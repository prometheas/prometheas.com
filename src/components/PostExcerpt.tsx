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
    <article className="py-6 border-b border-slate-100 last:border-b-0">
      <div className="flex items-center gap-3 mb-2">
        <time className="text-xs text-slate-500 tracking-wide">{formatted}</time>
        {post.categories[0] && (
          <>
            <span className="text-slate-300">&middot;</span>
            <Link
              href={`/posts/category/${encodeURIComponent(post.categories[0].toLowerCase())}`}
              className="text-xs text-red tracking-wider uppercase no-underline hover:opacity-70 transition-opacity"
            >
              {post.categories[0]}
            </Link>
          </>
        )}
      </div>
      <Link
        href={`/posts/${post.year}/${post.month}/${post.slug}`}
        className="text-lg font-medium text-slate-900 no-underline hover:text-red transition-colors"
      >
        {post.title}
      </Link>
      {post.excerpt && (
        <p className="text-sm text-slate-600 leading-relaxed mt-2 font-light">
          {post.excerpt}
        </p>
      )}
    </article>
  );
}
