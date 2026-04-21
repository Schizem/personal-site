import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkWikiLink from "remark-wiki-link";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface Props {
  source: string;
}

export function MDXRenderer({ source }: Props) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            [
              remarkWikiLink,
              {
                pageResolver: (name: string) => [
                  name.toLowerCase().replace(/\s+/g, "-"),
                ],
                hrefTemplate: (permalink: string) => `/blog/${permalink}`,
              },
            ],
          ],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: {
                  dark: "github-dark",
                  light: "github-light",
                },
              },
            ],
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ],
        },
      }}
    />
  );
}
