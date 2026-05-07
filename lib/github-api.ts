export interface ProjectConfig {
  repo: string;
  pico8?: string;
  blogPost?: string;
  demo?: string;
  featured?: boolean;
}

export interface RepoMeta {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
}

export interface Project extends ProjectConfig {
  meta: RepoMeta;
}

export async function fetchRepoMeta(repo: string): Promise<RepoMeta> {
  const url = `https://api.github.com/repos/${repo}`;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers, next: { revalidate: false } });
  if (!res.ok) {
    throw new Error(`GitHub API error for ${repo}: ${res.status}`);
  }
  return res.json();
}

export async function getProjects(): Promise<Project[]> {
  const { projects } = (await import("../projects.json")) as {
    projects: ProjectConfig[];
  };

  const results = await Promise.allSettled(
    projects.map(async (p) => {
      const meta = await fetchRepoMeta(p.repo);
      return { ...p, meta };
    }),
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<Project> => r.status === "fulfilled",
    )
    .map((r) => r.value);
}
