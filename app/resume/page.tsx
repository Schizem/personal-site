import { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRenderer } from "@/components/MDXRenderer";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Tyler Hay — Software Engineer. Full-stack engineer with experience across AWS, React, Angular, Java, and Node.js.",
};

export default function ResumePage() {
  const filePath = path.join(process.cwd(), "content", "resume.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  return (
    <main className="page-content prose">
      <MDXRenderer source={content} />
    </main>
  );
}
