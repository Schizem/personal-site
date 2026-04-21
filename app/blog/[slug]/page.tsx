import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getBlogSlugs } from "@/lib/mdx";
import { MDXRenderer } from "@/components/MDXRenderer";

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    };
  } catch {
    return {};
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <main className="page-content prose">
      <div className="post-header">
        <Link href="/blog" className="back-link">
          ← Blog
        </Link>
        <h1>{post.frontmatter.title}</h1>
        <div className="post-meta">
          <time>{post.frontmatter.date}</time>
          <span>{post.readingTime} min read</span>
        </div>
        <div className="post-tags">
          {post.frontmatter.tags.map((tag) => (
            <Link key={tag} href={`/blog?tag=${tag}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <MDXRenderer source={post.content} />
    </main>
  );
}
