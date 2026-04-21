import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  description: string;
  draft?: boolean;
}

export interface NoteFrontmatter {
  title: string;
  date: string;
  category: "life" | "music" | "project" | "misc";
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
}

export interface Note {
  slug: string;
  frontmatter: NoteFrontmatter;
  content: string;
  readingTime: number;
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function getSlugs(dir: string): string[] {
  const fullDir = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBlogSlugs(): string[] {
  return getSlugs("blog");
}

export function getNoteSlugs(): string[] {
  return getSlugs("notes");
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(CONTENT_ROOT, "blog", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: estimateReadingTime(content),
  };
}

export function getNoteBySlug(slug: string): Note {
  const filePath = path.join(CONTENT_ROOT, "notes", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as NoteFrontmatter,
    content,
    readingTime: estimateReadingTime(content),
  };
}

export function getAllPosts(): Post[] {
  return getBlogSlugs()
    .map(getPostBySlug)
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getAllNotes(): Note[] {
  return getNoteSlugs()
    .map(getNoteBySlug)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}
