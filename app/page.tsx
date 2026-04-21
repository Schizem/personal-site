import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getAllNotes } from "@/lib/mdx";
import fs from "fs";
import path from "path";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);
  const notes = getAllNotes().slice(0, 5);

  const hasPortrait = fs.existsSync(
    path.join(process.cwd(), "public", "portrait.png"),
  );

  return (
    <main className="page-content">
      <section className="hero">
        <div className="hero-text">
          <h1>Hey, I&apos;m Ty.</h1>
          <p className="hero-tagline">
            Software engineer. I write about programming, web development, and
            CS.
          </p>
          <div className="hero-links">
            <Link href="/about">About me</Link>
            <a
              href="https://github.com/Schizem"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a href="/feed.xml">RSS</a>
          </div>
        </div>
        <div className="portrait-wrapper">
          {hasPortrait ? (
            <Image
              src="/portrait.png"
              alt="Ty"
              width={120}
              height={120}
              priority
            />
          ) : (
            <div className="portrait-placeholder">Ty</div>
          )}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Blog</h2>
          <Link href="/blog" className="see-all">
            All posts →
          </Link>
        </div>
        <p className="section-subtitle">
          Guides, references, and tutorials.
        </p>
        {posts.map((post) => (
          <div key={post.slug} className="post-row">
            <span className="post-row-date">
              {formatDate(post.frontmatter.date)}
            </span>
            <Link href={`/blog/${post.slug}`} className="post-row-title">
              {post.frontmatter.title}
            </Link>
          </div>
        ))}
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Notes</h2>
          <Link href="/notes" className="see-all">
            All notes →
          </Link>
        </div>
        <p className="section-subtitle">
          Life, music, projects, and everything else.
        </p>
        {notes.map((note) => (
          <div key={note.slug} className="post-row">
            <span className="post-row-date">
              {formatDate(note.frontmatter.date)}
            </span>
            <Link href={`/notes/${note.slug}`} className="post-row-title">
              {note.frontmatter.title}
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
