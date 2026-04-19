import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { postsByYear, allYears, paginate } from "@/lib/posts";
import { PostList } from "../../_components/PostList";

export function generateStaticParams() {
  return allYears().map((y) => ({ year: String(y) }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  return { title: `Posts from ${year}` };
}

export default async function YearPosts({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const y = parseInt(year, 10);
  if (isNaN(y)) notFound();

  const posts = postsByYear(y);
  if (posts.length === 0) notFound();

  const result = paginate(posts, 1);

  return (
    <PostList
      title={`Posts from ${year}`}
      posts={result.posts}
      currentPage={1}
      totalPages={1}
      baseUrl={`/posts/year/${year}`}
    />
  );
}
