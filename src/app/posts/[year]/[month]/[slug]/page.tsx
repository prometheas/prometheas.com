import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostByYearMonthSlug, getAllPosts } from "@/lib/posts";
import { PostMeta as PostMetaComponent } from "@/components/PostMeta";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({
    year: p.year,
    month: p.month,
    slug: p.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; month: string; slug: string }>;
}): Promise<Metadata> {
  const { year, month, slug } = await params;
  const post = getPostByYearMonthSlug(year, month, slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ year: string; month: string; slug: string }>;
}) {
  const { year, month, slug } = await params;
  const meta = getPostByYearMonthSlug(year, month, slug);
  if (!meta) notFound();

  const { default: Content } = await import(
    `@/content/posts/${meta.filename}.mdx`
  );

  return (
    <article className="max-w-[720px] mx-auto px-[4.5rem] max-md:px-6 py-16 max-md:py-10">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-[var(--text-primary)] leading-tight mb-4">
        {meta.title}
      </h1>
      <PostMetaComponent
        date={meta.date}
        categories={meta.categories}
        tags={meta.tags}
      />
      <div className="post-content prose max-w-none">
        <Content />
      </div>
    </article>
  );
}
