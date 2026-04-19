import Link from "next/link";

export function PostMeta({
  date,
  categories,
  tags,
}: {
  date: string;
  categories: string[];
  tags: string[];
}) {
  const formatted = new Date(date + "T12:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)] mb-8">
      <time>{formatted}</time>
      {categories.map((c) => (
        <Link
          key={c}
          href={`/posts/category/${encodeURIComponent(c.toLowerCase())}`}
          className="text-[var(--accent)] no-underline hover:opacity-70 dark:hover:opacity-100 dark:hover:text-[var(--accent-hover)] transition-opacity uppercase tracking-wider"
        >
          {c}
        </Link>
      ))}
      {tags.map((t) => (
        <Link
          key={t}
          href={`/posts/tag/${encodeURIComponent(t.toLowerCase())}`}
          className="text-[var(--text-muted)] no-underline hover:text-[var(--accent)] transition-colors"
        >
          #{t}
        </Link>
      ))}
    </div>
  );
}
