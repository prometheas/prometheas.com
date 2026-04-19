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
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-8">
      <time>{formatted}</time>
      {categories.map((c) => (
        <Link
          key={c}
          href={`/posts/category/${encodeURIComponent(c.toLowerCase())}`}
          className="text-red no-underline hover:opacity-70 transition-opacity uppercase tracking-wider"
        >
          {c}
        </Link>
      ))}
      {tags.map((t) => (
        <Link
          key={t}
          href={`/posts/tag/${encodeURIComponent(t.toLowerCase())}`}
          className="text-slate-400 no-underline hover:text-red transition-colors"
        >
          #{t}
        </Link>
      ))}
    </div>
  );
}
