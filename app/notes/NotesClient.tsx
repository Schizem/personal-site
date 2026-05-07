"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Note } from "@/lib/mdx";

const CATEGORIES = ["life", "music", "project", "misc"] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function NotesClient({ allNotes }: { allNotes: Note[] }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const filtered = activeCategory
    ? allNotes.filter((n) => n.frontmatter.category === activeCategory)
    : allNotes;

  const byYear = new Map<string, Note[]>();
  for (const note of filtered) {
    const year = new Date(note.frontmatter.date).getUTCFullYear().toString();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(note);
  }
  const years = [...byYear.keys()].sort((a, b) => Number(b) - Number(a));

  return (
    <main className="page-content">
      <h1 style={{ marginBottom: "2rem" }}>Notes</h1>

      <div className="tag-filter">
        <Link
          href="/notes"
          className={`tag ${!activeCategory ? "tag--active" : ""}`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/notes?category=${cat}`}
            className={`tag ${activeCategory === cat ? "tag--active" : ""}`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {years.map((year) => (
        <div key={year} className="year-group">
          <div className="year-label">{year}</div>
          {byYear.get(year)!.map((note) => (
            <div key={note.slug} className="post-row">
              <span className="post-row-date">
                {formatDate(note.frontmatter.date)}
              </span>
              <Link href={`/notes/${note.slug}`} className="post-row-title">
                {note.frontmatter.title}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
