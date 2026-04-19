import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { postsByCategory, allCategories, paginate } from "@/lib/posts";
import { PostList } from "../../_components/PostList";

export function generateStaticParams() {
  return allCategories().map((c) => ({ category: c.toLowerCase() }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return { title: `Category: ${decodeURIComponent(category)}` };
}

export default async function CategoryPosts({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = postsByCategory(decodeURIComponent(category));
  if (posts.length === 0) notFound();

  const result = paginate(posts, 1);

  return (
    <PostList
      title={`Category: ${posts[0].categories.find((c) => c.toLowerCase() === decodeURIComponent(category)) || category}`}
      posts={result.posts}
      currentPage={1}
      totalPages={1}
      baseUrl={`/posts/category/${category}`}
    />
  );
}
