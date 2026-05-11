import { notFound } from "next/navigation";
import Link from "next/link";
import { getNoteBySlug, getNoteSlugs } from "@/lib/mdx";
import { MDXRenderer } from "@/components/MDXRenderer";

export async function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const note = getNoteBySlug(slug);
    return { title: note.frontmatter.title };
  } catch {
    return {};
  }
}

export default async function NotePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let note;
  try {
    note = getNoteBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="page-content prose">
      <div className="post-header">
        <Link href="/notes" className="back-link">
          ← Slice of Life
        </Link>
        <h1>{note.frontmatter.title}</h1>
        <div className="post-meta">
          <time>{note.frontmatter.date}</time>
          <span className="tag">{note.frontmatter.category}</span>
        </div>
      </div>
      <MDXRenderer source={note.content} />
    </main>
  );
}
