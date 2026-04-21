import Link from "next/link";
import { getAllPosts, Post } from "@/lib/mdx";

export const metadata = { title: "Blog" };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const allPosts = getAllPosts();
  const activeTag = searchParams.tag ?? null;

  const allTags = Array.from(
    new Set(allPosts.flatMap((p) => p.frontmatter.tags))
  ).sort();

  const filtered = activeTag
    ? allPosts.filter((p) => p.frontmatter.tags.includes(activeTag))
    : allPosts;

  const byYear = new Map<string, Post[]>();
  for (const post of filtered) {
    const year = new Date(post.frontmatter.date).getUTCFullYear().toString();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(post);
  }
  const years = [...byYear.keys()].sort((a, b) => Number(b) - Number(a));

  return (
    <main className="page-content">
      <h1 style={{ marginBottom: "2rem" }}>Blog</h1>

      <div className="tag-filter">
        <Link href="/blog" className={`tag ${!activeTag ? "tag--active" : ""}`}>
          All
        </Link>
        {allTags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${tag}`}
            className={`tag ${activeTag === tag ? "tag--active" : ""}`}
          >
            {tag}
          </Link>
        ))}
      </div>

      {years.map((year) => (
        <div key={year} className="year-group">
          <div className="year-label">{year}</div>
          {byYear.get(year)!.map((post) => (
            <div key={post.slug} className="post-row">
              <span className="post-row-date">
                {formatDate(post.frontmatter.date)}
              </span>
              <Link href={`/blog/${post.slug}`} className="post-row-title">
                {post.frontmatter.title}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
