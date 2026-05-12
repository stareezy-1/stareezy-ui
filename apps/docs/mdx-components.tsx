import type { MDXComponents } from "mdx/types";

/**
 * Required by Next.js App Router for MDX support.
 * Provides custom components to all MDX pages without using @mdx-js/react.
 * https://nextjs.org/docs/app/building-your-application/configuring/mdx
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
