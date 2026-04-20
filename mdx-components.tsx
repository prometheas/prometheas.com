import type { MDXComponents } from "mdx/types";
import { Figure } from "@/components/figure";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Figure,
    ...components,
  };
}
