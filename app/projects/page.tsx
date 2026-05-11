import { getProjects, Project } from "@/lib/github-api";

export const metadata = { title: "Projects" };

function ProjectCard({ project }: { project: Project }) {
  const year = new Date(project.meta.created_at).getUTCFullYear();

  return (
    <div className="project-card">
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
        <p className="project-card-desc">{project.meta.description}</p>
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
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="page-content">
      <h1>Projects</h1>
      <p className="section-subtitle">Public repos from my GitHub.</p>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.repo} project={project} />
        ))}
      </div>
    </main>
  );
}
