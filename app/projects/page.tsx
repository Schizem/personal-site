import Link from "next/link";
import { getProjects } from "@/lib/github-api";
import { Pico8Player } from "@/components/Pico8Player";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="page-content">
      <h1>Projects</h1>

      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.repo} className="project-card">
            <div className="project-card-header">
              <h2>
                <a
                  href={project.meta.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.meta.name}
                </a>
              </h2>
              <div className="project-badges">
                {project.meta.language && (
                  <span className="badge badge--lang">
                    {project.meta.language}
                  </span>
                )}
                {project.meta.topics.map((topic) => (
                  <span key={topic} className="badge">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {project.meta.description && (
              <p className="project-description">{project.meta.description}</p>
            )}

            <div className="project-links">
              <a
                href={project.meta.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                GitHub ★ {project.meta.stargazers_count}
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Demo
                </a>
              )}
              {project.blogPost && (
                <Link href={project.blogPost} className="project-link">
                  Blog post
                </Link>
              )}
            </div>

            {project.pico8 && (
              <Pico8Player slug={project.pico8} title={project.meta.name} />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
