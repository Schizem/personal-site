import { Suspense } from "react";
import { getAllPosts } from "@/lib/mdx";
import BlogClient from "./BlogClient";

export const metadata = { title: "Tech Talk" };

export default function BlogPage() {
  const allPosts = getAllPosts();
  return (
    <Suspense>
      <BlogClient allPosts={allPosts} />
    </Suspense>
  );
}
