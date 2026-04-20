import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { postsByTag, allTags } from "@/lib/posts";
import { PostList } from "../../_components/post-list";

export function generateStaticParams() {
  return allTags().map((t) => ({ tag: t.toLowerCase() }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Tag: ${decodeURIComponent(tag)}` };
}

export default async function TagPosts({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = postsByTag(decodeURIComponent(tag));
  if (posts.length === 0) notFound();

  return (
    <PostList
      title={`Tag: #${posts[0].tags.find((t) => t.toLowerCase() === decodeURIComponent(tag)) || tag}`}
      posts={posts}
      currentPage={1}
      totalPages={1}
      baseUrl={`/posts/tag/${tag}`}
    />
  );
}
