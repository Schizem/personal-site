import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getAllNotes } from "@/lib/mdx";
import { getProjects } from "@/lib/github-api";
import fs from "fs";
import path from "path";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function HomePage() {
  const posts = getAllPosts().slice(0, 5);
  const notes = getAllNotes().slice(0, 5);
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured).length
    ? projects.filter((p) => p.featured)
    : projects;

  const hasPortrait = fs.existsSync(
    path.join(process.cwd(), "public", "portrait.png"),
  );

  return (
    <main className="page-content">
      <section className="hero">
        <div className="hero-text">
          <h1>Hey, I'm Ty.</h1>
          <p className="hero-tagline">
            I'm a software engineer, amateur vintner, and aspiring wizard. Below
            you'll find my technical writing, personal notes, and open-source
            projects. Settle in and learn something new with me.
          </p>
          <div className="hero-links">
            <Link href="/about">About Me</Link>
            <a
              href="https://github.com/Schizem"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tyler-hay-13446b336/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="/resume">Resume</a>
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
          <h2>Tech Talk</h2>
          <Link href="/blog" className="see-all">
            All posts →
          </Link>
        </div>
        <p className="section-subtitle">
          Technical blogs for guides, references, and tutorials.
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
          <h2>Slice of Life</h2>
          <Link href="/notes" className="see-all">
            All notes →
          </Link>
        </div>
        <p className="section-subtitle">
          Notes on life, hobbies, and everything else.
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

      {featured.length > 0 && (
        <section className="home-section">
          <div className="section-header">
            <h2>Projects</h2>
            <Link href="/projects" className="see-all">
              All projects →
            </Link>
          </div>
          <p className="section-subtitle">Open-source work and experiments.</p>
          <div className="project-grid">
            {featured.map((project) => {
              const year = new Date(project.meta.created_at).getUTCFullYear();
              return (
                <div key={project.repo} className="project-card">
                  <span className="project-card-year">{year}</span>
                  <a
                    href={project.meta.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-name"
                  >
                    {project.meta.name}
                  </a>
                  {project.meta.description && (
                    <p className="project-card-desc">
                      {project.meta.description}
                    </p>
                  )}
                  <div className="project-card-actions">
                    {project.blogPost && (
                      <a href={project.blogPost} className="project-btn">
                        Article
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn"
                      >
                        Demo
                      </a>
                    )}
                    <a
                      href={project.meta.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn"
                    >
                      Source
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
