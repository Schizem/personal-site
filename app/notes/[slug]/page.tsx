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
  params: { slug: string };
}) {
  try {
    const note = getNoteBySlug(params.slug);
    return { title: note.frontmatter.title };
  } catch {
    return {};
  }
}

export default function NotePostPage({ params }: { params: { slug: string } }) {
  let note;
  try {
    note = getNoteBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <main className="page-content prose">
      <div className="post-header">
        <Link href="/notes" className="back-link">
          ← Notes
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
