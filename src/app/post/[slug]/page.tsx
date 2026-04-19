import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { PostMeta } from "@/components/PostMeta";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostBySlug(slug);
  if (!meta) notFound();

  const { default: Content } = await import(`@/content/posts/${meta.filename}.mdx`);

  return (
    <article className="max-w-[720px] mx-auto px-[4.5rem] max-md:px-6 py-16 max-md:py-10">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-slate-900 leading-tight mb-4">
        {meta.title}
      </h1>
      <PostMeta date={meta.date} categories={meta.categories} tags={meta.tags} />
      <div className="prose prose-slate prose-sm max-w-none [&_a]:text-red [&_a]:no-underline hover:[&_a]:opacity-70 [&_blockquote]:border-l-red [&_blockquote]:text-slate-600 [&_code]:text-sm [&_pre]:bg-slate-50 [&_pre]:border [&_pre]:border-slate-200">
        <Content />
      </div>
    </article>
  );
}
