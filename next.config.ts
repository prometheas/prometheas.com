import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      [remarkFootnotes as any, { inlineNotes: true }],
    ],
    rehypePlugins: [[rehypePrettyCode as any, { theme: "github-light" }]],
  },
});

export default withMDX(nextConfig);
